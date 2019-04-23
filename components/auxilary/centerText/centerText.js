(function() {
    angular.module('blockchain.components').directive('centerText', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/centerText/centerText.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                text: '@',
                headingreq: '@',
                headingtext: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.text = $scope.text;
        vm.headingreq = $scope.headingreq == 'true';
        vm.headingText = $scope.headingtext;
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
    }
})()