(function(){
    angular.module('blockchain.components').directive('providerInformation', directive);
        function directive() {
            return {
                restrict: 'E',
                templateUrl: 'http://localhost:8000/components/ProviderInformation/providerInformation.html',
                controller: controller,
                controllerAs: 'vm'
            };
        }

        function controller($scope,$http,apiUtility,$timeout,$interval){
            let vm=this,
                transferPollArray = [],
                transferFlag = false;

            vm.transferLog = {
                net: 0,
                log: {},
                logArray: []
            }

            vm.batteryStorage = {};
            vm.houseReceiver = "House-1";
            vm.houseSender = "House-1";
            vm.calculateEther = calculateEther;
            vm.transferEther = transferEther;
            vm.showPopup = showPopup;
            vm.providerList;
            vm.conditionList=[];
            vm.diseaseList = [];
            vm.category;
            vm.providersForCategoryList = [];
            vm.rankList=[];



            $scope.$watch('vm.houseReceiver', function (newValue, oldValue) {
                if(newValue && newValue == oldValue){
                    return;
                }
                getProviderTableRows();
            });

            $scope.$watch('vm.houseSender', function (newValue, oldValue) {
                if(newValue && newValue == oldValue){
                    return;
                }
                getProviderTableRows();
            });

            $scope.$watch('vm.category', function (newValue, oldValue) {
                if(newValue && newValue == oldValue) {
                    return;
                }
                getCategoryTableRows();
            });

            $

            function init(){
                // apiUtility.getProviders().then(getProvidersSuccess,getProvidersFailure);
                // apiUtility.getConditions().then(getConditionsSuccess,getConditionsFailure);
                vm.providerList =["House-4298", "House-9206","House-2472","House-5959"]
            }

            function transferLogEntry(entry){
                return{
                    house: entry[0],
                    etherReceived:entry[1]
                }
            }

            function getProviderTableRows(){
                apiUtility.getIndicatorsForProviders(vm.provider,2016).then(getIndicatorsForProvidersSuccess, getIndicatorsForProvidersFailure);
                vm.showCalculatedEther = false;
            }

            function getIndicatorsForProvidersSuccess(response){
                vm.diseaseList = [];
                for(let i=0;i<response.data.conditionValues[1].length-1;i++){
                    vm.diseaseList.push({
                        name:vm.conditionList[i],
                        successRate:response.data.conditionValues[1][i],
                        rank:getIndicatorRank(vm.conditionList[i],vm.provider)
                    });
                }
                vm.paymentMade = response.data.paymentMade[0];
                vm.paymentJustMade = false;
                vm.paymentJustMadeComplete = false;
                transferPollArray.forEach(function(provider){
                    if(vm.provider === provider){
                        vm.paymentJustMade = true;
                        vm.paymentMade = true;
                    }
                })
                console.log(vm.paymentMade);
            }

            function getIndicatorRank(condition,provider){
                let rank;
               vm.rankList.forEach(function(categoryInfo,index,object){
                    if(categoryInfo.category === condition){
                        object[index].providerInfo.forEach(function(pInfo,index,object){
                            if(pInfo.providerName === provider){
                                rank = pInfo.providerRank;
                            }
                        })
                    }
               })
               return rank;
            }

            function getIndicatorsForProvidersFailure(response){
                console.log(response);
            }

            function getConditionInfo(){
                vm.conditionList.forEach(function(condition,index,object){
                    apiUtility.getProvidersForCategory(index,2016).then(getProvidersForCategorySuccess, getProvidersForCategoryFailure);
                })
            }

            function getCategoryTableRows(){
                vm.providersForCategoryList = [];
                vm.rankList.forEach(function(categoryInfo,index,object){
                    if(categoryInfo.category === vm.category){
                        for(let i=0;i<object[index].providerInfo.length;i++){
                            vm.providersForCategoryList.push({
                                name:object[index].providerInfo[i].providerName,
                                successRate:object[index].providerInfo[i].successRate,
                                rank:object[index].providerInfo[i].providerRank
                            });
                        }
                    }
                })
//                vm.conditionList.forEach(function(condition,index){
//                    if(condition === vm.category){
//                        apiUtility.getProvidersForCategory(index,2016).then(getProvidersForCategorySuccess, getProvidersForCategoryFailure);
//                    }
//                })
            }

            function getProvidersForCategorySuccess(response){
//                vm.providersForCategoryList = [];
                let lastSuccessRate, unsortArr = createSortObject(response.data.providerInfo);
                sortArr = unsortArr.sort(function(a,b){
                    return b.successRate - a.successRate;
                });
                let condition = getConditionNameFromIndex(response.data.category);

                for(let i=0;i<sortArr.length;i++){
                    let rank = getRank(lastSuccessRate,sortArr[i].successRate,i);
//                    vm.providersForCategoryList.push({
//                        name:sortArr[i].name,
//                        successRate:sortArr[i].successRate,
//                        rank:rank
//                    });
                    lastSuccessRate = sortArr[i].successRate;

                    addConditionRank(sortArr[i].name,rank,condition,sortArr[i].successRate);
                }
            }

            function getConditionNameFromIndex(cat_index){
                return vm.conditionList[cat_index];
            }

            function addConditionRank(providerName, rank,condition,successRate){
                let categoryPresentFlag = false;
                vm.rankList.forEach(function(categoryInfo,index,object){
                    if(categoryInfo.category === condition){
                        object[index].providerInfo.push({
                            providerName: providerName,
                            providerRank: rank,
                            successRate: successRate
                        })
                        categoryPresentFlag = true;
                    }
                })
                if(!categoryPresentFlag){
                    vm.rankList[vm.rankList.length] = {category: condition, providerInfo:[]};
                    vm.rankList[vm.rankList.length-1].providerInfo.push({
                        providerName: providerName,
                        providerRank: rank,
                        successRate: successRate
                    })
                }
            }

            function getRank(lastSuccessRate,currentSuccessRate,i){
                if(lastSuccessRate){
                    if(lastSuccessRate === currentSuccessRate){
                        return i;
                    }else {
                        return i+1;
                    }
                } else{
                    return i+1;
                }
            }

            function createSortObject(data){
                let arr = [];
                let obj;
                for(let i=0;i<vm.providerList.length;i++){
                    obj = Object.assign({});
                    obj.name = vm.providerList[data[0][i]-1];
                    obj.successRate = data[1][i];
                    arr.push(obj);
                }
                return arr;
            }

            function mapProvider(index){
                return vm.providerList[index-1];
            }

            function getProvidersForCategoryFailure(response){
                console.log(response);
            }


            function calculateEther(){
                alert('Hold back and enjoy! Show has begun')
                $interval(function(){
                    apiUtility.evaluateEther().then(calculateEtherSuccess,calculateEtherFailure);
                },30000)
            }

            function calculateEtherSuccess(response){
                let netPos, netNeg, posCategory, negCategory;
                let netTransfer = getNetPosNeg(response);

                houseTransferLog = assignEther(netTransfer);
                console.log(vm.batteryStorage)
                transferEtherToCentral(houseTransferLog.receiver);
                transferEtherFromCentral(houseTransferLog.sender);
                archiveTransferLog(houseTransferLog.sender)

            }

            function archiveTransferLog(houseTransferLog){
                Object.entries(houseTransferLog).forEach(function(houseInfo){
                    if(!vm.transferLog.log[houseInfo[0]]){
                        vm.transferLog.log[houseInfo[0]] = houseInfo[1]
                    } else{
                        vm.transferLog.log[houseInfo[0]] += houseInfo[1]
                    }
                })

                vm.transferLog.logArray = []
                Object.entries(vm.transferLog.log).forEach(function(houseInfo){
                    vm.transferLog.logArray.push(new transferLogEntry(houseInfo))
                })
            }

            function assignEther(gridInfo){
                netHouseTransfer = {receiver:{},sender:{}}
                while(gridInfo.netPos > 0 && gridInfo.netNeg < 0){
                    lenPosCategory = gridInfo.posCategory.length;
                    lenNegCategory = gridInfo.negCategory.length;

                    energyReceivedIter = 0.25/lenPosCategory;
                    energySentIter = 0.25/lenNegCategory;

                    gridInfo.posCategory.forEach(function(houseInfo,index,arr){
                        houseInfo.gridAttr -= energyReceivedIter;
                        if(!netHouseTransfer.receiver[houseInfo.houseName]){
                            netHouseTransfer.receiver[houseInfo.houseName] = energyReceivedIter
                        } else{
                            netHouseTransfer.receiver[houseInfo.houseName] += energyReceivedIter
                        }
                    })

                    gridInfo.negCategory.forEach(function(houseInfo,index,arr){
                        houseInfo.gridAttr += energySentIter;
                        if(!netHouseTransfer.sender[houseInfo.houseName]){
                            netHouseTransfer.sender[houseInfo.houseName] = energySentIter
                        } else{
                            netHouseTransfer.sender[houseInfo.houseName] += energySentIter
                        }
                    })

                    spliceHouse(gridInfo.posCategory,'posGrid');
                    spliceHouse(gridInfo.negCategory);

                    gridInfo.netPos -=0.25;
                    gridInfo.netNeg +=0.25;
                }

                if(gridInfo.netPos > 0){
                    vm.transferLog.net = vm.transferLog.net - gridInfo.netPos
                } else if(gridInfo.netNeg < 0){
                    vm.transferLog.net += Math.abs(gridInfo.netNeg)
                    if(transferFlag){
                        gridInfo.negCategory.forEach(function(houseInfo,index,arr) {
                            netHouseTransfer.sender[houseInfo.houseName] += Math.abs(houseInfo.gridAttr)
                        })
                    }else{
                        gridInfo.negCategory.forEach(function(houseInfo,index,arr) {
                            if(!vm.batteryStorage[houseInfo.houseName]){
                                vm.batteryStorage[houseInfo.houseName] = Math.abs(houseInfo.gridAttr)
                            } else{
                                vm.batteryStorage[houseInfo.houseName] += Math.abs(houseInfo.gridAttr)
                            }
                        })
                    }
                }

                spliceBatteryStorage()

                return netHouseTransfer;
            }

            function spliceBatteryStorage(){
                Object.entries(vm.batteryStorage).forEach(function(houseInfo,index,arr){
                    if(houseInfo[1] <= 0){
                        arr.splice(index,1)
                    }
                })
            }

            function spliceHouse(infoArray,compareTag){
                if(compareTag == 'posGrid'){
                    infoArray.forEach(function(houseInfo,index,arr){
                        if(houseInfo.gridAttr <= 0){
                            arr.splice(index,1)
                        }
                    })
                } else{
                    infoArray.forEach(function(houseInfo,index,arr){
                        if(houseInfo.gridAttr >= 0){
                            arr.splice(index,1)
                        }
                    })
                }
            }

            function getNetPosNeg(response){
                let netPos = 0, netNeg = 0, posCategory = [], negCategory = [];
                response.data.forEach(function(item){
                    item.gridAttr = parseFloat(item.gridAttr);
                    if(vm.batteryStorage[item.houseName]){
                        if(vm.batteryStorage[item.houseName] > item.gridAttr){
                            vm.batteryStorage[item.houseName] -= item.gridAttr;
                            item.gridAttr =0
                        }else{
                            item.gridAttr -= vm.batteryStorage[item.houseName];
                            vm.batteryStorage[item.houseName] = 0;
                        }
                    }
                    if(item.gridAttr > 0){
                        netPos += item.gridAttr
                        posCategory.push(item)
                    } else if(item.gridAttr < 0){
                        netNeg += parseFloat(item.gridAttr)
                        negCategory.push(item)
                    }
                })
                return {netPos: netPos, netNeg: netNeg, posCategory:posCategory, negCategory:negCategory}
            }

            function calculateEtherFailure(){

            }

            function transferEtherToCentral(transferArray){
                Object.entries(transferArray).forEach(function(houseInfo){
                    apiUtility.transferAmount(houseInfo[1],houseInfo[0],'send').then(transferEtherSuccess, transferEtherFailure);
                })
            }

            function transferEtherFromCentral(transferArray){
                Object.entries(transferArray).forEach(function(houseInfo){
                    apiUtility.transferAmount(houseInfo[1],houseInfo[0],'receive').then(transferEtherSuccess, transferEtherFailure);
                })
            }

            function transferEther(){

                //apiUtility.transferAmount(vm.calculatedEther,vm.houseSender,vm.houseReceiver).then(transferEtherSuccess, transferEtherFailure);
                //transferPollArray.push(vm.provider);
            }



            function getProvidersSuccess(response){
                vm.providerList = response.data;
            }

            function getProvidersFailure(response){
                console.log(response);
            }

            function getConditionsSuccess(response){
                vm.conditionList = response.data;
                getConditionInfo();
            }

            function getConditionsFailure(response){
                console.log(response);
            }

            function transferEtherSuccess(response){
                console.log(response);
                // vm.paymentJustMade = true;
                // vm.paymentMade = true;
                // $interval(function(){
                //     pollForSuccessfulTransfer();
                // },5000);
            }

            function pollForSuccessfulTransfer(){
                if(transferPollArray.length){
                    transferPollArray.forEach(function(provider){
                        apiUtility.checkTransferSuccess(provider).then(pollTransferStatusSuccess,pollTransferStatusFailure);
                    })
                }
            }

            function pollTransferStatusSuccess(response){
                if(response.data[0]){
                    let ret_provider = response.data[1].split('_')[0];
                    transferPollArray.forEach(function(provider,index,object){
                        if(ret_provider === provider){
                            object.splice(index,1);
                        }
                    })
                    if(vm.provider === ret_provider){
                        vm.paymentJustMade = false;
                        vm.paymentJustMadeComplete = true;
                        vm.paymentMade = true;
                    }
                }
            }

            function pollTransferStatusFailure(response){
                console.log(response);
            }

            function transferEtherFailure(response){
                console.log(response);
            }

            function showPopup(){
                    var popup = document.getElementById("myPopup");
                    popup.classList.toggle("show");
            }

            init();
        }
})();