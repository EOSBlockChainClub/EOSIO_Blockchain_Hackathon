(function() {
    angular.module('blockchain.components').directive('locationInformation', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/locationInformation/locationInformation.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "The proposed site, as well as the majority of the Town of Blacksburg, Virginia, is in USDA Plant Hardiness\n" +
            "Zone 6B and has an average annual extreme mean temperature range of -5 to 0 degrees Fahrenheit. The lot is\n" +
            "very well situated in terms of good soil and ample sun, and the majority of the site is well drained. These factors\n" +
            "bode well for the ability to grow plants and crops, as well as to support construction. Situated on the edge\n" +
            "of Virginia Tech campus land and the Virginia Tech Corporate Research Center, our proposed development\n" +
            "falls just within the boundary of an existing R&D zone, allowing a great deal of flexibility regarding zoning.\n" +
            "To accommodate this residential development, the town of Blacksburg has advised us to pursue a Planned\n" +
            "Residential Development (PRD) zoning agreement. Under such an arrangement, custom setback and Floor\n" +
            "Area Ratio (FAR) determinations are made, but our proposal has been designed to fall within the general\n" +
            "range for these limits, with 20’ setbacks and a FAR of .42. Our sister team at Virginia Tech is retro-fitting the\n" +
            "existing RackSpace office building that will become the Work in our Live/Work/Learn village."
    }
})()