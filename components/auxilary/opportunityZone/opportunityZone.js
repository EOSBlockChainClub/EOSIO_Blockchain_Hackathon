(function() {
    angular.module('blockchain.components').directive('opportunityZoneMap', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/opportunityZone/opportunityZone.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
    }
})()