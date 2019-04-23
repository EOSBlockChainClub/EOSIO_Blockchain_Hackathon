(function() {
    angular.module('blockchain.components').directive('team', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/team/team.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                pageTitle: '@',
                teamInfo: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm = this;
        vm.pageTitle = $scope.pageTitle;
        vm.teamInfo = JSON.parse($scope.teamInfo);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
    }
})()