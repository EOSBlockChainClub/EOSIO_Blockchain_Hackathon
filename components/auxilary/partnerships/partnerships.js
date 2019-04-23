(function() {
    angular.module('blockchain.components').directive('partnerships', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/partnerships/partnerships.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                containerSections: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.containerSections = JSON.parse($scope.containerSections);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
    }
})()