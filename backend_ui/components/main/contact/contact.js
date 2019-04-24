(function() {
    angular.module('blockchain.components').directive('contact', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/contact/contact.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {}
        };
    }

    function controller($scope) {
        let vm = this;
    }
})()