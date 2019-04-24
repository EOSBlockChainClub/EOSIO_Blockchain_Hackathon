(function() {
    angular.module('blockchain.components').directive('residentsTableTwo', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/residentsTable2/residentsTable2.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                tableInfo: '@',
                greyBackground: '@',
            }
        };
    }

    function controller($scope) {
        let vm = this;
        vm.energySaved = 0
        vm.moneySaved = 0
        vm.batteryStorage = 0
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""

        $scope.$watch('tableInfo', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.tableInfo = JSON.parse($scope.tableInfo);

            vm.tableHeaderStats = calculateHeaderStats()
        })

        function calculateHeaderStats(){
            vm.energySaved = 0
            vm.moneySaved = 0
            vm.tableInfo.forEach(function(item){
                vm.energySaved += (item.communityEnergy + item.energyTransferredGrid)
                vm.moneySaved += item.moneySaved
            })


        }


    }
})()