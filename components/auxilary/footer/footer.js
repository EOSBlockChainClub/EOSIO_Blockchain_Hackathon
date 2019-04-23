(function() {
    angular.module('blockchain.components').directive('footerPage', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/footer/footer.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
    }
})()