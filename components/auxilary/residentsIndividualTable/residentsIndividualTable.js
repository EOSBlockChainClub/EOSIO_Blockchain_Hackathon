(function() {
    angular.module('blockchain.components').directive('residentsIndividualTable', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/residentsIndividualTable/residentsIndividualTable.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                tableInfo: '@',
                houseId:'@',
                rentVal:'@'
            }
        };
    }

    function controller($scope,apiUtility) {
        let vm = this;
        vm.energySupplied = 0
        vm.moneyGained= 0
        vm.transferToken = transferToken

        $scope.$watch('tableInfo', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.tableInfo = JSON.parse($scope.tableInfo)
            vm.tableHeaderStats = getTotalEnergySupplied(vm.tableInfo);
        })

        $scope.$watch('rentVal', function(newValue, oldValue) {
            vm.rentVal = 'Pay your rent of $' + $scope.rentVal
        })

        function getTotalEnergySupplied(tableInfo){
            let totalEnergySupplyGrid = 0
            let totalEnergySupplyCommunity = 0
            let totalEnergyDemandGrid = 0
            let totalEnergyDemandCommunity = 0
            let totalMoneyGained = 0
            tableInfo.forEach(function(item){
                switch(item.tier){
                    case 'S1':
                        totalEnergySupplyCommunity += item.energyTransferred
                        totalMoneyGained += (item.tokensGained * 0.01)
                        break;
                    case 'S2':
                        totalEnergySupplyGrid += item.energyTransferred
                        totalMoneyGained += (item.tokensGained * 0.01)
                        break;
                    case 'B1':
                        totalEnergyDemandCommunity -= item.energyTransferred
                        break;
                    case 'B2':
                        totalEnergyDemandGrid -= item.energyTransferred
                        break;
                    case 'S1 & S2':
                        totalEnergySupplyCommunity += item.energyTransferred/2
                        totalEnergySupplyGrid += item.energyTransferred/2
                        totalMoneyGained += (item.tokensGained * 0.01)
                        break;
                    case 'B1 & B2':
                        totalEnergyDemandCommunity -= item.energyTransferred/2
                        totalEnergyDemandGrid -= item.energyTransferred/2
                        break;

                }
            })

            return {
                energySupplyGrid: Math.ceil((totalEnergySupplyGrid * 100))/100,
                energySupplyCommunity: Math.ceil((totalEnergySupplyCommunity * 100))/100,
                energyDemandGrid: Math.ceil((totalEnergyDemandGrid * 100))/100,
                energyDemandCommunity: Math.ceil((totalEnergyDemandCommunity * 100))/100,
                moneyGained: Math.ceil((totalMoneyGained * 100))/100
            }
        }


        function transferToken(){
            apiUtility.payRent($scope.houseId,$scope.rentVal);
        }

    }
})()