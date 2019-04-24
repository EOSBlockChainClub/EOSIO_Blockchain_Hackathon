(function() {
    angular.module('blockchain.components').directive('floorplan', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/floorplan/floorplan.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {}
        };
    }

    function controller($scope) {
        let vm = this;
    }
})()