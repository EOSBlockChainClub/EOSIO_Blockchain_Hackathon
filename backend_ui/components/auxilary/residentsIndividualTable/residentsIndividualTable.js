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
            let totalEnergySupply = 0
            let totalEnergyDemanded = 0
            let totalMoneyGained = 0
            tableInfo.forEach(function(item){
                switch(item.tier){
                    case 'S1':
                    case 'S2':
                    case 'S1 & S2':
                        totalEnergySupply += item.energyTransferred
                        totalMoneyGained += (item.tokensGained * 0.01)
                        break;
                    case 'B1':
                    case 'B2':
                    case 'B1 & B2':
                        totalEnergyDemanded -= item.energyTransferred
                        break;
                }
            })

            return {
                energySupply: Math.ceil((totalEnergySupply * 100))/100,
                energyDemanded: Math.ceil((totalEnergyDemanded * 100))/100,
                moneyGained: Math.ceil((totalMoneyGained * 100))/100
            }
        }


        function transferToken(){
            apiUtility.payRent($scope.houseId,$scope.rentVal*100).then(payRentSuccess,payRentFailure);
        }

        function payRentSuccess(response){
            alert("Rent paid successfully")
        }
        function payRentFailure(response){
            alert("Failure")
        }

    }
})()