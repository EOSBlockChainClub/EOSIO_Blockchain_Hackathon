(function() {
    angular.module('blockchain.components').directive('residentsInfoo', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/residentsInfo/residentsInfo.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                containerSections: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope,apiUtility,$interval,$timeout) {
        let vm=this;
        // vm.containerSections = JSON.parse($scope.containerSections);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
        vm.tokenInfo = []
        vm.tableInfo = []
        vm.energySaved = 0;
        vm.batteryStorage = 0;
        vm.energyPrice = 0.1271
        vm.allTimeInstantInfo = []
        vm.showGraphInfo = showGraphInfo
        vm.prevTokens = []

        vm.numberOfTableEntries = 0

        vm.houseRents = {
            'Unit Id: 1': 650,
            'Unit Id: 2': 1026,
            'Unit Id: 3': 1500,
            'Unit Id: 4': 1624,
            'Unit Id: 5': 650,
            'Unit Id: 6': 1026,
            'Unit Id: 7': 1500,
            'Unit Id: 8': 1624,
            'Unit Id: 9': 650,
            'Unit Id: 10': 1026,
            'Unit Id: 11': 1500,
            'Unit Id: 12': 1624
        }

        function getResidentInfoSuccess(response){
            houseInfo = []
            currentDate = response.data[0].displayingDate
            response.data.forEach(function(item){
                itemInfo = {}
                tokenInfo = {}

                itemInfo.id = "Unit Id: " + item.houseId
                tokenInfo.id = item.houseId

                itemInfo.tokens = "Tokens Available: " + item.houseTokens
                tokenInfo.tokens = item.houseTokens

                vm.tokenInfo.push(tokenInfo)
                houseInfo.push(itemInfo);
            })

            vm.allTimeInstantInfo.push($.extend({},{timeInfo:currentDate, allUnitsInfo:getDeltas(true,vm.tokenInfo)}))


            vm.containerSections = [{
                heading: "Token Info",
                headingText: "A dashboard showing the tokens available for different houses in the community",
                houseInfo: houseInfo
            }]
        }

        function getUpdatedResidentInfoSuccess(response){

            updatedInfo = response.data;
            currentDate = updatedInfo[0].displayingDate
            tableTokenInfo = []
            updatedInfo.forEach(function(item){
                foundIndex = Object.keys(vm.tokenInfo).filter(function(key) {
                    return vm.tokenInfo[key]["id"] == item.houseId;
                })[0]

                vm.tokenInfo[foundIndex].tokens += item.houseTokens
                vm.containerSections[0].houseInfo[foundIndex].tokens = "Tokens Available:" + vm.tokenInfo[foundIndex].tokens

                tableTokenInfo.push(item.houseTokens)



            })


            //for tableInfo
            tableRecord = {}

            // Change it back after the report
            // tableRecord.timestamp = (new Date()).toLocaleString()

            if(vm.numberOfTableEntries == 0){
                // tableRecord.timestamp = (new Date()).toLocaleString()
                tableRecord.timestamp = currentDate
            } else{
                // tableRecord.timestamp =  new Date(new Date(vm.tableInfo[vm.numberOfTableEntries-1]['timestamp']).getTime() + 3600000).toLocaleString()
                tableRecord.timestamp = currentDate
                vm.allTimeInstantInfo.push($.extend({},{timeInfo:currentDate, allUnitsInfo:getDeltas(false,vm.tokenInfo)}))
                // vm.allTimeInstantInfo.push($.extend({},{timeInfo:new Date(new Date(vm.tableInfo[vm.numberOfTableEntries-1]['timestamp']).getTime() + 3600000).toLocaleString(), allUnitsInfo:getDeltas(false,vm.tokenInfo)}))
            }



            vm.numberOfTableEntries += 1
            // till here


            tableRecord.totalEnergy = -sumArr(tableTokenInfo.filter(function(item){
                return item < 0
            }))
            tableRecord.communityEnergy = sumArr(tableTokenInfo.filter(function(item){
                return item > 0
            }))

            tableRecord.energyGrid = tableRecord.totalEnergy - tableRecord.communityEnergy;

            if(tableRecord.energyGrid < 0){
                vm.batteryStorage += (-tableRecord.energyGrid)
                tableRecord.communityEnergy = tableRecord.totalEnergy

                tableRecord.energyGrid = 0
                tableRecord.batteryEnergy = 0
            }else{
                if(vm.batteryStorage >= tableRecord.energyGrid){
                    tableRecord.batteryEnergy = tableRecord.energyGrid
                    vm.batteryStorage -= tableRecord.energyGrid
                    tableRecord.energyGrid = 0
                } else{
                    tableRecord.energyGrid -= vm.batteryStorage
                    tableRecord.batteryEnergy = vm.batteryStorage
                    vm.batteryStorage = 0
                }
            }

            tableRecord.moneySaved = Math.ceil((tableRecord.communityEnergy + tableRecord.batteryEnergy) * vm.energyPrice*100)/100

            vm.energySaved += (tableRecord.totalEnergy - tableRecord.energyGrid)
            vm.moneySaved = Math.ceil(vm.energySaved * vm.energyPrice * 100) /100
            vm.tableInfo.push(tableRecord)


        }

        function getDeltas(initialFlag,currentTokens){
            deltaTokens = []
            if(initialFlag){
                currentTokens.forEach(function(item){
                    vm.prevTokens.push({id: item.id, tokens:item.tokens})
                    deltaTokens.push({id:item.id, tokens:0})
                })
            }else{
                currentTokens.forEach(function(item,index,arr){
                    deltaTokens.push({id: item.id,tokens:(item.tokens - vm.prevTokens[index].tokens)*vm.energyPrice})
                    vm.prevTokens[0].tokens = item.tokens
                })
            }

            return deltaTokens

        }

        function sumArr(arrayToSum){
            sumVal = 0
            arrayToSum.forEach(function(item){
                sumVal += item
            })

            return sumVal;
        }


        function getResidentInfoFailure(response){
            alert('Failure')
        }

        function getUpdatedResidentInfoFailure(response){
            alert('Failure')
        }

        function showGraphInfo(houseId){
            if(typeof updateIndividualTableInfo != 'undefined'){
                $interval.cancel(updateIndividualTableInfo);
            }

            try{
                vm.showGraph = true;
                $timeout(function(){
                    var incidentCount = {
                        label: 'Total Money Made(in $) by ' + houseId,
                        borderColor: 'blue',
                        data: getTimelineData(houseId)
                    };

                    var ctx = $('#myChart')[0].getContext('2d');
                    // if(vm.chartRef){
                    //     delete (vm.chartRef.ctx)
                    // }

                    var chart = new Chart(ctx, {
                        type: 'line',
                        data: { datasets: [incidentCount] },
                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time'
                                }]
                            }
                        }
                    });
                    // vm.chartRef = chart
                },1000)
            } catch (error){
                console.log(error)
            }

            vm.houseIdResident = houseId.replace('Unit Id:','')
            vm.houseRent = vm.houseRents[houseId]
            updateIndividualTableInfo = $interval(function(){
                vm.individualTableInfo = getTimelineDataModified(houseId)
            },3000)

        }

        function getTimelineData(houseId){
            dataList = []
            vm.allTimeInstantInfo.forEach(function(item){
                dataList.push({x: item.timeInfo, y:item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].tokens})
            })

            return dataList
        }

        function getTimelineDataModified(houseId){
            dataList = []
            vm.allTimeInstantInfo.forEach(function(item){
                dataList.push({timestamp: item.timeInfo, tokensGained: Math.ceil((item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].tokens) * 100)/100 })
            })

            dataList.forEach(function(item,index,array){
                if (item.tokensGained >0){
                    array[index].energySupplied = item.tokensGained/0.1272
                }else{
                    array[index].energySupplied = 0
                }
            })

            return dataList
        }

        function init(){
            apiUtility.getResidentTokenInfo('April').then(getResidentInfoSuccess,getResidentInfoFailure);
            $timeout(function(){
                updateInfoInterval = $interval(function(){
                    apiUtility.getUpdatedTokenInfo().then(getUpdatedResidentInfoSuccess,getUpdatedResidentInfoFailure);
                },3000)
            },1000)

        }

        $scope.$on('$destroy',function(){
            if(updateInfoInterval)
                $interval.cancel(updateInfoInterval);
        });

        init()
    }
})()