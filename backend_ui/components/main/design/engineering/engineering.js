(function() {
    angular.module('blockchain.components').directive('engineering', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/engineering/engineering.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "The all-wood section is inspired by the way trees insulate themselves and control moisture flow, using\n" +
            "different wood products for structure, insulation, and sheathing. Initial modeling in Ubakus showed that the\n" +
            "addition of a 2” layer of exterior cork insulation prevents condensation inside the main wall cavity. WUFI analysis\n" +
            "confirmed that relative humidity values in the OSB layer of concern do indeed drop year over year suggesting\n" +
            "a wall cavity free from the risk of mold. Our energy modeling process in RemRate took us from an initial HERS\n" +
            "rating of 85 (assuming similar traditional log home construction and no energy efficiency strategies) to a HERS\n" +
            "rating of 34 without PV. This includes the TreeHAUS construction sets, EnergyStar windows and appliances, a\n" +
            "natural gas water heater, and ground-source heat pumps (GSHPs). The DFHP system we hope to use would\n" +
            "need a 50kW array to exceed DOE’s ZERH requirements. The added expense will be minimal as we continue to\n" +
            "optimize our envelope\n" +
            "and consider the full\n" +
            "embodied energy as\n" +
            "well as the lifecycle\n" +
            "costs of installing a\n" +
            "geothermal\n" +
            "well.";

        vm.thumbnailsInfo = [{
            img:"resources/img/graphics/engg_1.png",
            heading:"MAIN FLOOR",
            tag:"4 of 12 units: Typical repeating group",
            link:"",
            linkingreq:false
        },{
            img:"resources/img/graphics/engg_2.png",
            heading:"UPPER FLOOR",
            tag:"",
            linkingreq:false
        }];

    }
})()