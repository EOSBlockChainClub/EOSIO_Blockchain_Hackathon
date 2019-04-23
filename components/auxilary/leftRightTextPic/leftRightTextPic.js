(function() {
    angular.module('blockchain.components').directive('leftRightTextPic', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/leftRightTextPic/leftRightTextPic.html',
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
                reverseimgholder: '@',
                name: '@',
                textFlex: '@',
                imgFlex: '@',
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
        vm.name = $scope.name;
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""

        function init(){
            $(window).bind("load", function() {
                if($scope.reverseimgholder == 'True'){
                    $('.'+$scope.name).addClass('reverse-flex-container')
                }
            });

        }

        init()
    }
})()