(function() {
    angular.module('blockchain.components').directive('residentsInfo', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/residentsInfo/residentsInfo2.html',
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
        vm.allTimeInstantInfo = []
        vm.showGraphInfo = showGraphInfo

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

        function tokenInfo(tokenInformation){
            return{
                id: tokenInformation.houseId,
                tokens: tokenInformation.houseTokens,
                deltaTokens: tokenInformation.deltaTokens || 0,
                deltaEnergy: tokenInformation.deltaEnergy || 0,
                tier: tokenInformation.tier || ""
            }
        }

        function tokenInfoText(tokenInformation){
            return{
                id: "Unit Id: " + tokenInformation.houseId,
                tokens: "Tokens Available: " + tokenInformation.houseTokens
            }
        }

        function getResidentInfoSuccess(response){
            houseInfo = []
            currentDate = response.data[0].displayingDate
            response.data.forEach(function(item){
                vm.tokenInfo.push(new tokenInfo(item))
                houseInfo.push(new tokenInfoText(item));
            })

            vm.allTimeInstantInfo.push($.extend({},{timeInfo:currentDate, allUnitsInfo:vm.tokenInfo}))

            vm.containerSections = [{
                heading: "Token Info",
                headingText: "A dashboard showing the tokens available for different houses in the community",
                houseInfo: houseInfo
            }]
        }

        function getAdminInfoSuccess(response){
            vm.adminTokens = response.data.adminTokens
        }

        function getUpdatedResidentInfoSuccess(response){

            updatedInfo = response.data;
            currentDate = updatedInfo[0].displayingDate
            tableTokenInfo = []
            copyingTokenInfo = Object.assign([],vm.tokenInfo)
            updatedInfo.forEach(function(item){
                foundIndex = Object.keys(vm.tokenInfo).filter(function(key) {
                    return vm.tokenInfo[key]["id"] == item.houseId;
                })[0]

                copyingTokenInfo[foundIndex] = tokenInfo(item)
                vm.containerSections[0].houseInfo[foundIndex] = tokenInfoText(item)

                tableTokenInfo.push(item)

            })

            tableRecord = {}

            if(vm.numberOfTableEntries == 0){
                tableRecord.timestamp = currentDate
            } else{
                tableRecord.timestamp = currentDate
                vm.allTimeInstantInfo.push($.extend({},{timeInfo:currentDate, allUnitsInfo:copyingTokenInfo}))
            }

            vm.numberOfTableEntries += 1

            tableRecord.totalEnergyDemanded = sumArr(tableTokenInfo.filter(function(item){
                return item
            }))
            tableRecord.communityEnergy = sumArr(tableTokenInfo.filter(function(item){
                return (item.tier == 'S1' || item.tier == 'S1 & S2')
            }))
            tableRecord.energyGrid = sumArr(tableTokenInfo.filter(function(item){
                return (item.tier == 'B2' || item.tier == 'B1 & B2')
            }))
            tableRecord.energyTransferredGrid = sumArr(tableTokenInfo.filter(function(item){
                return (item.tier == 'S2' || item.tier == 'S1 & S2')
            }))
            tableRecord.moneySaved = sumArrMoney(tableTokenInfo.filter(function(item){
                return (item.tier == 'S2' || item.tier == 'S1'|| item.tier == 'S1 & S2')
            }))

            vm.tableInfo.push(tableRecord)


        }

        function sumArr(arrayToSum){
            sumVal = 0
            arrayToSum.forEach(function(item){
                sumVal += parseFloat(item.deltaEnergy)
            })

            return Math.ceil(sumVal*100)/100;
        }

        function sumArrMoney(arrayToSum){
            sumVal = 0
            arrayToSum.forEach(function(item){
                sumVal += Math.ceil((parseFloat(item.deltaTokens) * 0.01)*100)/100
            })

            return Math.ceil(sumVal*100)/100;;
        }


        function getResidentInfoFailure(response){
            alert('Failure')
        }

        function getAdminInfoFailure(response){
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
                        label: 'Total Money Made(in $) by ' + houseId + ' at each timestamp',
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
                dataList.push({x: item.timeInfo, y:item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].deltaTokens})
            })

            return dataList
        }

        function getTimelineDataModified(houseId){
            dataList = []
            vm.allTimeInstantInfo.forEach(function(item){
                dataList.push({timestamp: item.timeInfo, tokensGained: Math.ceil((item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].deltaTokens) * 100)/100, totalTokens: Math.ceil((item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].tokens) * 100)/100, energyTransferred: Math.ceil((item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].deltaEnergy) * 100)/100, tier: item.allUnitsInfo[parseInt(houseId.replace('Unit Id:',''))-1].tier})
            })

            return dataList
        }

        function init(){
            apiUtility.getResidentTokenInfo('April').then(getResidentInfoSuccess,getResidentInfoFailure);
            $timeout(function(){
                updateInfoInterval = $interval(function(){
                    apiUtility.getUpdatedTokenInfo().then(getUpdatedResidentInfoSuccess,getUpdatedResidentInfoFailure);
                    apiUtility.getAdminInfo().then(getAdminInfoSuccess,getAdminInfoFailure)
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