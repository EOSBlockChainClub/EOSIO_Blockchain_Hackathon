(function() {
    angular.module('blockchain.components').directive('textPicDescription', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/textPicDescription/textPicDescription.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                textImgInfo: '@',
                heading:'@',
                headingtext:'@',
                headingreq: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.textImgInfo = JSON.parse($scope.textImgInfo);
        vm.heading=$scope.heading;
        vm.headingText = $scope.headingtext;
        vm.headingreq = $scope.headingreq == 'true';
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
    }
})()