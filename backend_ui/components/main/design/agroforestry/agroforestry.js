(function() {
    angular.module('blockchain.components').directive('agroforestry', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/agroforestry/agroforestry.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "To promote a restorative landscape, our design\n" +
            "incorporates agroforestry: an intensive and intentional\n" +
            "forest management practice that seeks to design a\n" +
            "landscape as a self-sufficient and sustainable food\n" +
            "source for resilience. Our plant palette will draw from\n" +
            "existing well-suited, edible species in Crumpacker\n" +
            "woods (eg. serviceberry) as well as medicinals inspired\n" +
            "by the nearby Historic Smithfield Plantation."
    }
})()