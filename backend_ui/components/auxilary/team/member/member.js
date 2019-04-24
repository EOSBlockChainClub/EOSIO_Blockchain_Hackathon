(function() {
    angular.module('blockchain.components').directive('member', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/team/member/member.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                img: '@',
                name: '@',
                position: '@'
            }
        };
    }

    function controller($scope) {
        let vm = this;
        vm.name = $scope.name;
        vm.img = $scope.img;
        vm.position = $scope.position;

    }
})()