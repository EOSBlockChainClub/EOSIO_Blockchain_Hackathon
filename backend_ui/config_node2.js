//additional libraries to setup the server and web3-instance
var express = require("express");
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var csv = require('csv-parser');
var fs = require('fs');

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
const defaultPrivateKey = "5JSPb2XuKB2L6dmYv8cVdZrzEDmHXW1KxqLokZwS52LRz1dBcAq"; // user shlee
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc(' http://localhost:8888', { fetch });
const api = new Api({ rpc: rpc, signatureProvider:signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

var app = express();

app.use( bodyParser.json() );
app.use ( express.static(".") );
app.use ( express.static("/components/EntryPage") );
app.use (express.static("/core"));
app.use(express.static(path.join(__dirname + '/pics', 'assets/pics')));
app.use(express.static("/node_modules/angular-ui-router/release"));

// app.use(redirectToHTTPS([/localhost:(\d{4})/], 301));
var highConsumer = {}
var medConsumer = {}
var lowConsumer = {}
let currentDate = ''
var energyProdDict = {}

let houseTokens = [0,0,0,0,0,0,0,0,0,0,0,0]
let updatedEnergyInfo = []
let unitNumber = {
    1:"unitone",
    2:"unittwo",
    3:"unitthree",
    4:"unitfour",
    5:"unitfive",
    6:"unitsix",
    7:"unitseven",
    8:"uniteight",
    9:"unitnine",
    10:"unitten",
    11:"uniteleven",
    12:"unittwelve",
}
let adminToken = 0

app.post('/getAllResidentsInfo',function(req,res){
    currentDate = getStartingDate(req.body.startingMonth)
    var displayDate = getDisplayDate(currentDate)

    // readUnitData().then((response)=>{
    //     houseTokens = getCurrentHouseToken(response)
    // })
    console.log(updatedEnergyInfo)
    let res_body = [{
        houseId: '1',
        displayingDate: displayDate,
        houseTokens: houseTokens[0]
    },{
        houseId: '2',
        displayingDate: displayDate,
        houseTokens: houseTokens[1]
    },{
        houseId: '3',
        displayingDate: displayDate,
        houseTokens: houseTokens[2]
    },{
        houseId: '4',
        displayingDate: displayDate,
        houseTokens: houseTokens[3]
    },{
        houseId: '5',
        displayingDate: displayDate,
        houseTokens: houseTokens[4]
    },{
        houseId: '6',
        displayingDate: displayDate,
        houseTokens: houseTokens[5]
    },{
        houseId: '7',
        displayingDate: displayDate,
        houseTokens: houseTokens[6]
    },{
        houseId: '8',
        displayingDate: displayDate,
        houseTokens: houseTokens[7]
    },{
        houseId: '9',
        displayingDate: displayDate,
        houseTokens: houseTokens[8]
    },{
        houseId: '10',
        displayingDate: displayDate,
        houseTokens: houseTokens[9]
    },{
        houseId: '11',
        displayingDate: displayDate,
        houseTokens: houseTokens[10]
    },{
        houseId: '12',
        displayingDate: displayDate,
        houseTokens: houseTokens[11]
    }]

    console.log(houseTokens)
    res.send(res_body)

})

app.get('/getUpdatedTokenInfo',function(req,res){
    // console.log(currentDate)
    var formattedDate = removeYearFromDate(currentDate);

    var prodEnergy = energyProdDict[(currentDate.getMonth()+1)+'' + currentDate.getDate()+'99'+(currentDate.getHours())]

    var highHouses = getHouseEnergy(highConsumer, formattedDate,prodEnergy,'high')
    var medHouses = getHouseEnergy(medConsumer, formattedDate,prodEnergy,'medium')
    var lowHouses = getHouseEnergy(lowConsumer, formattedDate,prodEnergy,'low')

    let totalConsumptionArray = highHouses.concat(medHouses.concat(lowHouses));

    updateResidents(prodEnergy,totalConsumptionArray)
    readUnitData().then((response)=>{
        updatedEnergyInfo = getCurrentUnitInfo(response)
    })

    var displayDate = getDisplayDate(currentDate)


    res_body = [{
        houseId: '1',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[0].tokens,
        deltaTokens: updatedEnergyInfo[0].deltaTokens,
        deltaEnergy: updatedEnergyInfo[0].deltaEnergy,
        tier: updatedEnergyInfo[0].tier

    },{
        houseId: '2',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[1].tokens,
        deltaTokens: updatedEnergyInfo[1].deltaTokens,
        deltaEnergy: updatedEnergyInfo[1].deltaEnergy,
        tier: updatedEnergyInfo[1].tier

    },{
        houseId: '3',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[2].tokens,
        deltaTokens: updatedEnergyInfo[2].deltaTokens,
        deltaEnergy: updatedEnergyInfo[2].deltaEnergy,
        tier: updatedEnergyInfo[2].tier

    },{
        houseId: '4',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[3].tokens,
        deltaTokens: updatedEnergyInfo[3].deltaTokens,
        deltaEnergy: updatedEnergyInfo[3].deltaEnergy,
        tier: updatedEnergyInfo[3].tier

    },{
        houseId: '5',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[4].tokens,
        deltaTokens: updatedEnergyInfo[4].deltaTokens,
        deltaEnergy: updatedEnergyInfo[4].deltaEnergy,
        tier: updatedEnergyInfo[4].tier

    },{
        houseId: '6',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[5].tokens,
        deltaTokens: updatedEnergyInfo[5].deltaTokens,
        deltaEnergy: updatedEnergyInfo[5].deltaEnergy,
        tier: updatedEnergyInfo[5].tier

    },{
        houseId: '7',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[6].tokens,
        deltaTokens: updatedEnergyInfo[6].deltaTokens,
        deltaEnergy: updatedEnergyInfo[6].deltaEnergy,
        tier: updatedEnergyInfo[6].tier

    },{
        houseId: '8',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[7].tokens,
        deltaTokens: updatedEnergyInfo[7].deltaTokens,
        deltaEnergy: updatedEnergyInfo[7].deltaEnergy,
        tier: updatedEnergyInfo[7].tier

    },{
        houseId: '9',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[8].tokens,
        deltaTokens: updatedEnergyInfo[8].deltaTokens,
        deltaEnergy: updatedEnergyInfo[8].deltaEnergy,
        tier: updatedEnergyInfo[8].tier

    },{
        houseId: '10',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[9].tokens,
        deltaTokens: updatedEnergyInfo[9].deltaTokens,
        deltaEnergy: updatedEnergyInfo[9].deltaEnergy,
        tier: updatedEnergyInfo[9].tier

    },{
        houseId: '11',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[10].tokens,
        deltaTokens: updatedEnergyInfo[10].deltaTokens,
        deltaEnergy: updatedEnergyInfo[10].deltaEnergy,
        tier: updatedEnergyInfo[10].tier
    },{
        houseId: '12',
        displayingDate: displayDate,
        houseTokens: updatedEnergyInfo[11].tokens,
        deltaTokens: updatedEnergyInfo[11].deltaTokens,
        deltaEnergy: updatedEnergyInfo[11].deltaEnergy,
        tier: updatedEnergyInfo[11].tier

    }]

    currentDate = updateTime(currentDate)
    res.send(res_body)
})

app.get('/getAdminInfo',function(req,res){
    readAdminData().then((response)=>{
        adminToken = response[0].tokens
    })

    let res_body = {
        houseId: '13',
        adminTokens: adminToken
    }

    res.send(res_body)
})

app.post('/payRent',function(req,res){
    houseId = req.body.houseId
    rent = req.body.rentAmount

    transferRent(houseId,rent)
})

app.post('/deposit',function(req,res){
    houseId = req.body.houseId
    rent = req.body.depositAmount

    deposit(houseId,rent)
})

async function readUnitData(){
    const resp = await rpc.get_table_rows({
        json: true,              // Get the response as json
        code: 'ecoseventeen',     // Contract that we target
        scope: 'ecoseventeen',         // Account that owns the data
        table: 'residents',        // Table name
        limit: 15,               // Maximum number of rows that we want to get
    })
    return resp.rows
}

async function readAdminData(){
    const resp = await rpc.get_table_rows({
        json: true,              // Get the response as json
        code: 'ecoseventeen',     // Contract that we target
        scope: 'ecoseventeen',         // Account that owns the data
        table: 'admins',        // Table name
        limit: 15,               // Maximum number of rows that we want to get
    })
    return resp.rows
}

async function initResidents(id,name,tokens){
    const result = await api.transact({
        actions: [{
            account: 'ecoseventeen',
            name: 'initresident',
            authorization: [{
                actor: 'ecoseventeen',
                permission: 'active',
            }],
            data: {
                ID: id,
                Name: name,
                token_c: tokens,
            },
        }],
    }, {
        broadcast: true,
        sign:true,
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

async function initAdmins(id,name,tokens){
    const result = await api.transact({
        actions: [{
            account: 'ecoseventeen',
            name: 'initadmin',
            authorization: [{
                actor: 'ecoseventeen',
                permission: 'active',
            }],
            data: {
                ID: id,
                Name: name,
                tokens: tokens,
            },
        }],
    }, {
        broadcast: true,
        sign:true,
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

async function updateResidents(pv_data,sm_data){
    const result = await api.transact({
        actions: [{
            account: 'ecoseventeen',
            name: 'ecologic2',
            authorization: [{
                actor: 'ecoseventeen',
                permission: 'active',
            }],
            data: {
                pv: pv_data,
                sm_data: sm_data
            },
        }],
    }, {
        broadcast: true,
        sign:true,
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

async function transferRent(id,amount){
    const result = await api.transact({
        actions: [{
            account: 'ecoseventeen',
            name: 'payrent',
            authorization: [{
                actor: 'ecoseventeen',
                permission: 'active',
            }],
            data: {
                ID: id,
                amount: amount
            },
        }],
    }, {
        broadcast: true,
        sign:true,
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

async function deposit(id,amount){
    const result = await api.transact({
        actions: [{
            account: 'ecoseventeen',
            name: 'deposit',
            authorization: [{
                actor: 'ecoseventeen',
                permission: 'active',
            }],
            data: {
                ID: id,
                amount: amount
            },
        }],
    }, {
        broadcast: true,
        sign:true,
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

function getCurrentHouseToken(tableData){
    let houseTokens = []
    tableData.forEach(function(row){
        houseTokens.push(row.tokens)
    })
    return houseTokens;
}

function getCurrentUnitInfo(tableData){
    let houseTokens = []
    tableData.forEach(function(row){
        houseTokens.push({
            id: row.ID,
            tokens: row.tokens,
            deltaTokens: row.token_change,
            deltaEnergy: row.delta,
            tier: row.tier
        })
    })
    return houseTokens;
}

function getStartingDate(month){
    switch(month){
        case 'January':
            return new Date('01/01/2018')
        case 'February':
            return new Date('02/01/2018')
        case 'March':
            return new Date('03/01/2018')
        case 'April':
            return new Date('04/01/2018')
        case 'May':
            return new Date('05/01/2018')
        case 'June':
            return new Date('06/01/2018')
        case 'July':
            return new Date('07/01/2018')
        case 'August':
            return new Date('08/01/2018')
        case 'September':
            return new Date('09/01/2018')
        case 'October':
            return new Date('10/01/2018')
        case 'November':
            return new Date('11/01/2018')
        case 'December':
            return new Date('12/01/2018')
    }

}

function removeYearFromDate(currentDateTime){
    var dateOptions = { day: '2-digit' , month: '2-digit'}
    var dateMonth = currentDateTime.toLocaleDateString("en-US",dateOptions)

    var timeOptions = {hour12: false}
    var timeMonth = currentDateTime.toLocaleTimeString("en-US",timeOptions)
    if(timeMonth == '00:00:00'){
        // console.log('yeah')
        timeMonth = '24:00:00'
        console.log(highConsumer[dateMonth + "  " + timeMonth])
    }
    return dateMonth + "  " + timeMonth


}

function updateTime(currentDateTime){
    var updatedDate = new Date(currentDateTime.getTime() + 3600000)
    var timeOptions = {hour12: false}
    var timeMonth = currentDateTime.toLocaleTimeString("en-US",timeOptions)

    return updatedDate
}

function getHouseEnergy(energyDict,time,prodEnergy,tag){
    houseEnergy = []

    for(i=0;i<4;i++){
        consumptionEnergy = parseFloat(energyDict[time])
        productionEnergy = parseFloat(prodEnergy)
        productionEnergy = productionEnergy/4451
        switch(tag){
            case 'high':
                consumptionEnergy = consumptionEnergy/3819
                break;
            case 'medium':
                consumptionEnergy = consumptionEnergy/2546
                break;
            case 'low':
                consumptionEnergy = consumptionEnergy/1273
                break;
        }
        switch(i){
            case 0:
                consumptionEnergy = consumptionEnergy * 532
                productionEnergy = productionEnergy*531
                break;
            case 1:
                consumptionEnergy = consumptionEnergy * 937
                productionEnergy = productionEnergy*937
                break;
            case 2:
                consumptionEnergy = consumptionEnergy * 1372
                productionEnergy = productionEnergy*1372
                break;
            case 3:
                consumptionEnergy = consumptionEnergy * 1610
                productionEnergy = productionEnergy*1610
                break;
        }

        // houseEnergy.push(Math.floor(productionEnergy - (consumptionEnergy) + (Math.random() * 2) -1))
        houseEnergy.push(consumptionEnergy + (Math.random() * 2) -1)
    }

    return houseEnergy.slice(0)

}

function getDisplayDate(currentDate){
    var dateOptions = { day: '2-digit' , month: '2-digit', year: 'numeric'}
    var dateMonth = currentDate.toLocaleDateString("en-US",dateOptions)

    var timeOptions = {hour12: false}
    var timeMonth = currentDate.toLocaleTimeString("en-US",timeOptions)

    return dateMonth + " " + timeMonth

}

function getCsvData(fileName,tempDict){
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (row) => {
            tempDict[(row['Date/Time']).trim()] = row['Net']
        })
        .on('end', () => {
        });
}

function getProdCsvData(fileName,tempDict){
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (row) => {
            tempDict[(row['DateTime']).trim()] = row['EnergyProd']
        })
        .on('end', () => {
        });
}

function initializeDataStruct(){
    let i =0
    for(i=0;i<12;i++){
        updatedEnergyInfo.push({
            id:i,
            tokens:0,
            deltaTokens:0,
            deltaEnergy:0,
            tier:""
        })
    }
}

function initializeResidents(){
    let i=0;
    for(i=0;i<12;i++){
        initResidents(i+1,unitNumber[i+1],100000)
    }
}

function initializeAdmin(){
    initAdmins(13,"ecologic",10000000)
}

app.listen(8000, function() {
    console.log ("Server running (8000)... yayyy");

    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_HIGH.csv', highConsumer)
    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_BASE.csv',medConsumer)
    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_LOW.csv', lowConsumer)
    getProdCsvData('data/pvwatts_hourly.csv', energyProdDict)

    initializeDataStruct()
    initializeResidents()
    initializeAdmin()

    // updateResidents(12,[8.0,9.0,10.0,11.0,12.0,8.0,9.0,10.0,11.0,12.0,8.0,9.0])
});