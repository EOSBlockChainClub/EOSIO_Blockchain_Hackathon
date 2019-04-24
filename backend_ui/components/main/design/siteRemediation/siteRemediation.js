(function() {
    angular.module('blockchain.components').directive('siteRemediation', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/siteRemediation/siteRemediation.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "The old-growth forest next to our site is currently\n" +
            "experiencing stress due to edge effect, where trees on\n" +
            "the outer perimeter of forests have a higher mortality\n" +
            "rate because of exposure to elements normally lessened\n" +
            "by the surrounding forest. Without this protection,\n" +
            "edge trees suffer from wind damage and heat stress,\n" +
            "which can increase their vulnerability and lead to forest\n" +
            "degradation. In addition to planting edible trees and\n" +
            "shrubs, this effect can be reduced by the proximity of\n" +
            "our attached housing development, which provides\n" +
            "shade and a break from the predominant north westerly\n" +
            "winds."
    }
})()