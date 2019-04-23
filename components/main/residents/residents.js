(function() {
    angular.module('blockchain.components').directive('residents', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/residents/residents.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {}
        };
    }

    function controller($scope) {
        let vm = this;
    }
})()