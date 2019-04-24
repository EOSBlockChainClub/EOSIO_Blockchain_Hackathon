/* author : Ikechukwu Dimobi
 */
#include <string>
#include <vector>
#include <array>
#include <math.h>
#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract("ecologic")]] ecologic : public eosio::contract {
public:
    ecologic(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds) {
        /**PV_split ratios **/
    
    pv_split[0]=3.97*0.01; pv_split[4]=3.97*0.01; pv_split[8] = 3.97*0.01;
    pv_split[1]=7.1*0.01; pv_split[5]=7.1*0.01; pv_split[9] = 7.1*0.01;
    pv_split[2]=10.27*0.01; pv_split[6]=10.27*0.01; pv_split[10] = 10.27*0.01;
    pv_split[3]=11.99*0.01; pv_split[7]=11.99*0.01; pv_split[11] = 11.99*0.01;
    }

    //price tiers
    int P1 = 12; //sell/buy to/from neighbors (S1,B1)
    int P2 = 6; //sell to grid (S2)
    int P3 = 14;  //buy from grid (B2)  
    double pv_split[12]; //pv share array
    

    [[eosio::action]]
    void initresident(int ID, name Name, int token_c) { /** token_c will be the original allocation when initializing the resident **/
        resident_index residents(get_self(), get_first_receiver().value);
        auto iterator = residents.find(ID);
        int size;
        switch (ID){
            case 1:
            case 5:
            case 9: size = 1;
            break;
            case 2:
            case 6:
            case 10: size = 2;
            break;
            case 3:
            case 7:
            case 11: size = 3;
            break;
            case 4:
            case 8:
            case 12: size = 4;
            break;
            default: size = 0;
            break;
        }
        if (iterator == residents.end()) { /** to create a new resident record**/
            residents.emplace(get_self(), [&](auto &row) {
                row.ID = ID;
                row.Name = Name;
                row.tokens = token_c;
                row.SM_state = 0;
                row.PV_state = 0;
                row.token_change = 0;
                row.delta = 0;
                row.tier = "N/A";
                row.PV_share = pv_split[ID-1];
                row.size = size;

            });
            print("Success in adding Unit");
        } else {
            print("Resident record exists");
        }
    }

    [[eosio::action]]
    /** the microgrid operator's name will be ecologic, utility name will be utility **/
    void initadmin(int ID, name Name, int tokens) { /** tokens will be the original allocation when initializing the resident **/
        admin_index admins(get_self(), get_first_receiver().value);
        auto iterator = admins.find(Name.value);
        if (iterator == admins.end()) { /** to create a new resident record**/
            admins.emplace(get_self(), [&](auto &row) {
                row.ID = ID;
                row.Name = Name;
                row.tokens = tokens;
                row.token_sent = 0; //amout of tokens sent
                row.token_received = 0; //amount of tokens sent
                row.tot_token_r = 0; //cumulative amount of tokens received
                row.tot_token_s = 0; //cumulative amount of tokens sent
                row.delta = 0;

            });
            print("Success in adding ", name{Name});
        } else {
            print(name{Name}," record already exists");
        }
    }

   /** erase resident record from table **/
    [[eosio::action]]
    void eraseres(int ID) {
        resident_index residents(get_self(), get_first_receiver().value);
        auto iterator = residents.find(ID);
        check(iterator != residents.end(), "Record does not exist");
        residents.erase(iterator);
    }    
   
    /** erase admin record from table **/
    [[eosio::action]]
    void eraseadmin(name Name) {
        require_auth(Name);
        admin_index admins(get_self(), get_first_receiver().value);
        auto iterator = admins.find(Name.value);
        check(iterator != admins.end(), "Record does not exist");
        admins.erase(iterator);
    } 

    /** Deposit to token wallet **/
    [[eosio::action]] 
    void deposit(int ID, int amount){
        resident_index residents(get_self(), get_first_receiver().value);       
        auto iterator = residents.find(ID);      
        if (iterator == residents.end()) { 
            print("\n resident does not exist, create resident or correct input \n");
        } else {
            residents.modify(iterator, get_self(), [&](auto &row) {               
                row.tokens += amount;                            
            });
            print(int{amount}," ECO tokens successfully deposited to resident ", int{ID});
        }
    }

    /** payrent **/
    [[eosio::action]] 
    void payrent(int ID, int amount){
       resident_index residents(get_self(), get_first_receiver().value);  
       admin_index admins(get_self(), get_first_receiver().value); 
       auto iteratora = admins.find("ecologic"_n.value); 
       auto iterator = residents.find(ID);  

       if (iterator == residents.end()) { /** to create a new resident record**/
            print("\n resident does not exist, create resident or correct input \n");
        } else {
            if (iteratora == admins.end()) { /** to create a new resident record**/
                print("\n admin account wrong or does not exist, create resident or correct input \n");
            } else {          
                residents.modify(iterator, get_self(), [&](auto &row) {               
                    row.tokens -= amount;               
                    print(int{amount}," ECO tokens used to pay rent by resident ", int{ID});
                });
                admins.modify(iteratora, get_self(), [&](auto &row) {               
                    row.tokens += amount;               
                });
                /** add transfer token **/
                print(int{amount}," ECO tokens paid to ", name{"ecologic"_n} , " as rent by resident ", int{ID});
            }                      
        }
    }



    struct Res_state { //struct for instantaneos smd for each resident
        int ID;
        double SM_state; //current smart meter reading (kwh)
        double PV_state; //current share of PV production in kwh (for this it is all shared equally)
        double delta; //difference between SM_state and PV_state (positive for producer, negative for consumer)
        int token_c; //amout of tokens gained or lost
        std::string tier; //price tier, one of the following: S1, S2, B1, B2
        std::string time; //time received
    };    

    struct { //sorting rules
        bool operator()(Res_state a, Res_state b)
        {
            return a.delta > b.delta;
        }
    } comparedelta;

    [[eosio::action]]
    void ecologic2(double pv, std::vector<double> sm_data) {
        std::vector<Res_state> smd; /** started with 12 values for now **/
        double D = 0;
        int tr = 0;
        int ts = 0;
        smd = create_data_struct(pv, sm_data, smd, D, tr, ts); //smd is the output data structure
        print("breakpoint_4");
        int ID = 0;
        for (int i = 0; i < 12; i++) {
            ID = i+1;
            print("breakpoint_5_",i);
            print("1",ID, smd[i].SM_state);
            print("2", smd[i].token_c, smd[i].PV_state);
            print("3", smd[i].delta, smd[i].tier);
            update_resident_data(ID, smd[i].token_c, smd[i].SM_state, smd[i].PV_state, smd[i].delta, smd[i].tier);
            print("resident", int{ID}, "updated");
        }
        update_admin("ecologic"_n, ts, tr, D);
    }

/* private struct and functions*/
    private:
    void update_resident_data(int ID, int token_c, double sm, double pv, double delta, string tier) { /** token_c will be the original allocation when initializing the resident **/
        print("breakpoint_6a");
        resident_index residents(get_self(), get_first_receiver().value);
        print("breakpoint_6b");
        auto iterator = residents.find(ID);
        print("breakpoint_6c");
        if (iterator == residents.end()) { /** to create a new resident record**/
            print("\n resident does not exist, create resident or correct input \n");
        } else {
            residents.modify(iterator, get_self(), [&](auto &row) {
                row.ID = ID;
                row.tokens += token_c;
                row.SM_state = sm;
                row.PV_state = pv;
                row.token_change = token_c;
                row.delta = delta;
                row.tier = tier;
                
            });
            print("Resident data updated successfully");
        }
        
    }

    void update_admin(name Name, int ts, int tr,double over_delta) { /** token_c will be the original allocation when initializing the resident **/
        admin_index admins(get_self(), get_first_receiver().value);
        auto iterator = admins.find(Name.value);
        
        if (iterator == admins.end()) { /** to create a new resident record**/
            print("\n admin does not exist, create admin or correct input \n");
        } else {
            admins.modify(iterator, get_self(), [&](auto &row) {
                row.Name = Name;
                row.tokens += (tr-ts);
                row.token_sent = ts; //amout of tokens sent
                row.token_received = tr; //amount of tokens sent
                row.tot_token_r += tr; //cumulative amount of tokens received
                row.tot_token_s += ts; //cumulative amount of tokens sent
                row.delta = over_delta;
                
            });
            print(name{Name}, " data updated successfully\n");
        }
        
    }

    std::vector<Res_state> create_data_struct(double pv, std::vector<double> sm_data, std::vector<Res_state> smd, double& over_delta, int& tokr, int& toks) {
        /**function to create struct array of data received from smart meter, receives each consumption as an array and the pv output as a single int and uses it to compute deltas to store in the struct**/
        int nr = 12; /* left at 12, we can make it less */
        //cout << "Number of data point received: " << nr << endl;
        double PV_allocate; //number of residents is 12

        double over_net = 0;
        int nz = 0, np = 0, nn = 0; // intialize number of net zeros, net positives and net negatives respectively
        double nprod = 0, ndem = 0; //total net produced and net demanded
        // create struct
        for (int i = 0; i < nr; i++) {
            smd[i].ID = i + 1;
            smd[i].SM_state = sm_data[i];
            PV_allocate = pv_split[i];
            smd[i].PV_state = PV_allocate;
            smd[i].delta = smd[i].PV_state - smd[i].SM_state;
            print("resident ID ", int{smd[i].ID}, " has net of: ", double{smd[i].delta});

            //Determine how many data points have nn, nz and np

            if (smd[i].delta > 0) {
                np++;
                nprod += smd[i].delta;
            }
            if (smd[i].delta == 0) {
                nz++;
            }
            if (smd[i].delta < 0) {
                nn++;
                ndem += smd[i].delta;
            }

            over_net = over_net + smd[i].delta;
        }
        over_delta = over_net;
        print("tot net production is: ", double{nprod}, " and number of net producers is: ", int{np});
        print("tot net demand is: ", double{ndem}, " and number of net consumers is: ", int{nn});
        print("Overall net is: ", double{over_net});

        Res_state smp[np], smc[nn]; //array of net positve and net negative (consumers) resident data
        Res_state smd_sort[nr];
        //create copy of struct array to be sorted
        for (int i = 0; i < 12; i++) {
            smd_sort[i] = smd[i];
        }

        print("breakpoint1_sorted");
        if (round(over_net) != 0) {
            //sort struct based on deltas
            std::sort(smd_sort, smd_sort + nr, comparedelta);
            //split into two arrays
            //NET PRODUCER ARRAY
            for (int i = 0; i < np; i++) {
                smp[i] = smd_sort[i];
            }
            print("highest producer is resident ID ", int{smp[0].ID});
            //NET CONSUMER ARRAY
            for (int i = nr - nn; i < nr; i++) {
                smc[i - (np + nz)] = smd_sort[i];
            }

            print("breakpoint_2");
            //if (round(over_net)>0){
            // FOR NET CONSUMERS
            double track_bought = 0;  //variable to track how much energy has been bought from neighbors

            for (int i = 0; i < nn; i++) { // charge consumers applicable amount of tokens
                track_bought += smc[i].delta;

                if ((track_bought*-1) >= nprod) {
                    double cons_grid = track_bought*-1 - nprod; //consumtion from grid
                    double cons_n = smc[i].delta*-1 - cons_grid; //consumption from neighboors
                    int energy_cost = round((cons_grid * P3) + (cons_n * P1)) ; // consumer pays respective share to grid and consumer
                    track_bought = nprod;
                    smc[i].token_c = energy_cost*-1;
                    smd[smc[i].ID - 1].token_c = energy_cost*-1;
                    tokr += energy_cost;
                    if (cons_grid == 0){
                        smd[smc[i].ID - 1].tier = "B1";   
                    } else{
                        smd[smc[i].ID - 1].tier = "B1 & B2";
                    }
                    
                    print("resident " , int{smc[i].ID}, " paid ", int{energy_cost}, " for ", double{cons_n}, " and ",  double{cons_grid}," at tier ", smd[smc[i].ID - 1].tier);
                    i++;
                    for (; i < nn; i++) {
                        int energy_cost = round(smc[i].delta * P3) * -1;
                        smc[i].token_c = energy_cost*-1;
                        smd[smc[i].ID - 1].token_c = energy_cost*-1;
                        smd[smc[i].ID - 1].tier = "B2";
                        tokr += energy_cost;
                        print("resident ", int{smc[i].ID}," paid ",int{energy_cost}," for ", double{smc[i].delta}, " at tier ", smd[smc[i].ID - 1].tier);
                    }
                } else {
                    int energy_cost =
                            round(smc[i].delta * P1) * -1; //least consumers pay at lower price to neighbours
                    smc[i].token_c = energy_cost*-1;
                    smd[smc[i].ID - 1].token_c = energy_cost*-1;
                    smd[smc[i].ID - 1].tier = "B1";
                    tokr += energy_cost;
                    print("resident ", int{smc[i].ID} ," paid ", int{energy_cost}," for ", double{smc[i].delta}, " at tier ", smd[smc[i].ID - 1].tier);
                }
            }
            // FOR NET PRODUCERS
            double track_sold = 0; //variable to track how much energy has been sold to neighbors
            print("breakpoint_3");
            for (int i = 0; i < np; i++) { //loop to pay tokens to net producers
                track_sold += smp[i].delta;

                if (track_sold >= (ndem*-1)) { //if all the in-house demand has been satisfied
                    double prod_grid = track_sold + ndem; //share of production that goes to the grid
                    double prod_n = smp[i].delta - prod_grid; //share of production that goes to the neighbour
                    int energy_profit = round((prod_n * P1) + (prod_grid *P2)); //pay the producer at this point the right share of P1 and P2
                    track_sold = ndem*-1;
                    if (prod_grid == 0){
                        smd[smp[i].ID - 1].tier = "S1";   
                    } else{
                        smd[smp[i].ID - 1].tier = "S1 & S2";
                    }
                    smp[i].token_c = energy_profit;
                    smd[smp[i].ID - 1].token_c = energy_profit;
                    toks += energy_profit;
                    print("resident ", int{smp[i].ID}," got paid ",int{energy_profit}, " for ", double{prod_n}, " and ", double{prod_grid}, " at tier ", smd[smp[i].ID - 1].tier);
                    i++;
                    for (; i < np; i++) { //pay the other producers at tier 2 price
                        int energy_profit = round(smp[i].delta * P2);
                        smp[i].token_c = energy_profit;
                        smd[smp[i].ID - 1].token_c = energy_profit;
                        toks += energy_profit;
                        smd[smp[i].ID - 1].tier = "S2";
                        print("resident ", int{smp[i].ID}, " got paid ", int{energy_profit}, " for ",  double{smp[i].delta}, " at tier", smd[smp[i].ID - 1].tier);
                    }
                } else {
                    int energy_profit = round(smp[i].delta * P1); //pay peak producers at tier 1 price
                    smp[i].token_c = energy_profit;
                    smd[smp[i].ID - 1].token_c = energy_profit;
                    toks += energy_profit;
                    smd[smp[i].ID - 1].tier = "S1";
                    print("resident ", int{smp[i].ID}," got paid ", int{energy_profit}, " for ", double{smp[i].delta}," at tier ", smd[smp[i].ID - 1].tier);
                }
            }
            print("breakpoint_7");
            //}
        } else {
            //add code to return number of tokens returned equal to zero
            for (int i = 0; i < nr; i++) {
                smd[i].token_c = 0;
            }
            print("We are net zero at this time");
        }
        print("breakpoint_8");
        return smd;
    }

        /** define multi-index table for resident data **/
    struct [[eosio::table]] resident {
        int ID;
        name Name; //should be same as account name on blockchain
        int tokens; //total number of tokens (initialize at the same value for all residents 10000ECO or $100 )
        double SM_state; //current smart meter reading
        double PV_state; //current share of PV production (for this it is all shared equally)
        double delta; //difference between SM_state and PV_state (positive for producer, negative for consumer)
        int token_change; //amout of tokens gained or lost
        std::string tier; //price tier, one of the following: S1, S2, B1, B2
        std::string last_update; //time of last update
        double PV_share; //fraction of PV alocated at each time stamp
        int size; //number of bedrooms

        uint64_t primary_key() const { return ID; }
        
    };

    struct [[eosio::table]] admin { //for table containing microgrid operator and municipal utility
        int ID;
        name Name; //should be same as account name on blockchain
        int tokens; //total number of tokens (initialize at large value)
        int token_sent; //amout of tokens sent
        int token_received; //amount of tokens sent
        int tot_token_r; //cumulative amount of tokens received
        int tot_token_s; //cumulative amount of tokens sent
        double delta; //overall net

        uint64_t primary_key() const { return Name.value; }
    };

    typedef eosio::multi_index<"residents"_n, resident> resident_index;
    typedef eosio::multi_index<"admins"_n, admin> admin_index;

};
