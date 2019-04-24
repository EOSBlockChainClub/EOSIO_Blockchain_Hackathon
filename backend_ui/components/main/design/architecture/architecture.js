(function() {
    angular.module('blockchain.components').directive('architecture', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/architecture/architecture.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "To serve Blacksburg’s growing population of\n" +
            "graduate students and address the shortage of affordable\n" +
            "housing, this development is conceptualized as a scalable\n" +
            "network of housing modules which can be arranged to suit\n" +
            "a variety of site conditions and economic constraints. For\n" +
            "this project, a grouping of 12 housing units is proposed on\n" +
            "Virginia Tech campus land, with close proximity to public\n" +
            "transportation and walking and cycling paths. On this southfacing\n" +
            "site, units are arranged to create outdoor courtyards\n" +
            "and rooftop terraces, as well as maximize access to natural\n" +
            "daylight and cross-ventilation for each dwelling.\n" +
            "Multiple unit types are offered to accommodate\n" +
            "the varying needs of our diverse graduate population,\n" +
            "ranging from a single bedroom micro-apartment to a 4 or\n" +
            "5 bedroom unit for those who put down roots and start a\n" +
            "family (such as graduates who become faculty). Due to the\n" +
            "current demand for student housing, the bulk of the units are\n" +
            "designed to be shared, with flexible plan options allowing\n" +
            "even the largest units to support co-living arrangements.\n" +
            "Units are also designed for increased accessibility, with\n" +
            "50% providing all essential functions on the ground floor."
    }
})()