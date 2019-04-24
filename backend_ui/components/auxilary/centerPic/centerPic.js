(function() {
    angular.module('blockchain.components').directive('centerPic', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/centerPic/centerPic.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                heading: '@',
                img: '@',
                imgcaption: '@',
                headingreq: '@',
                headingcaption: '@',
                linkingPage: '@',
                linkingreq: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.heading = $scope.heading;
        vm.headingreq = $scope.headingreq == 'true';
        vm.imgcaption = $scope.imgcaption;
        vm.img = $scope.img;
        vm.headingcaption = $scope.headingcaption;
        vm.linkingPage = $scope.linkingPage;
        vm.linkingreq = $scope.linkingreq == 'true';
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""

        $scope.$watch('img', function(newValue, oldValue) {
            if(newValue===oldValue) return;
            vm.img = $scope.img
        })

    }
})()