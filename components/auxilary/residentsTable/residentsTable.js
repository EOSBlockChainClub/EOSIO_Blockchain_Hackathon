(function() {
    angular.module('blockchain.components').directive('residentsTablee', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/residentsTable/residentsTable.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                tableInfo: '@',
                greyBackground: '@',
                energySaved: '@',
                batteryStorage: '@',
                moneySaved: '@'
            }
        };
    }

    function controller($scope) {
        let vm = this;
        vm.energySaved = 0
        vm.moneySaved = 0
        vm.batteryStorage = 0

        $scope.$watch('tableInfo', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.tableInfo = JSON.parse($scope.tableInfo)
        })

        $scope.$watch('energySaved', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.energySaved = $scope.energySaved
        })

        $scope.$watch('moneySaved', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.moneySaved = $scope.moneySaved
        })

        $scope.$watch('batteryStorage', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.batteryStorage = $scope.batteryStorage
        })

    }
})()