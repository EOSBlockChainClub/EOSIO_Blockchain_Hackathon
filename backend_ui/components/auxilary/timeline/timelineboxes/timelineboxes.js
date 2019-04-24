(function() {
    angular.module('blockchain.components').directive('timelineBoxes', directive);

    function directive() {
        return {
            restrict: "E",
            templateUrl: "../components/auxilary/timeline/timelineboxes/timelineboxes.html",
            controller: controller,
            controllerAs: "vm",
            scope: {
                cirimg: "@",
                cirtext: "@",
                cirtime: "@",
                cirhead: "@",
                cirinv: '@',
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.circleImg = $scope.cirimg;
        vm.circleText = $scope.cirtext;
        vm.circleTime = $scope.cirtime;
        vm.circleHeading = $scope.cirhead;
        vm.invertedClass = $scope.cirinv == 'true'? 'timeline-inverted' : '';
    }
})();