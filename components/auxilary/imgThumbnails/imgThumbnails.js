(function() {
    angular.module('blockchain.components').directive('imgThumbnails', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/imgThumbnails/imgThumbnails.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                heading: '@',
                headingText: '@',
                thumbnailsInfo: '@',
                greyBackground:'@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        vm.heading = $scope.heading;
        vm.headingText = $scope.headingText;
        vm.thumbnailsInfo = JSON.parse($scope.thumbnailsInfo);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
        vm.activateModal = activateModal;

        function activateModal(){
            console.log("abc")
        }
    }
})()