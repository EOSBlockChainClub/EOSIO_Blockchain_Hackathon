(function() {
    angular.module('blockchain.components').directive('timeline', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/timeline/timeline.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                headtext: '@',
                headnarrative: '@',
                timelineobj: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.headText = $scope.headtext;
        vm.headNarrative = $scope.headnarrative;
        vm.timelineObj = JSON.parse($scope.timelineobj);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""

    }
})()