(function() {
    angular.module('blockchain.components').directive('gasgoals', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/gasgoals/gasgoals.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "According to the Campus Master Plan,\n" +
            "Virginia Tech’s desire to transition from coal to natural\n" +
            "gas power is much more compelling than its desire\n" +
            "to transition to renewables or to cut off their waste\n" +
            "stream. That is part of what motivated us to explore\n" +
            "biogas compatible HWHs that can supplement our\n" +
            "mini-splits and back-up CHP generators. It turns\n" +
            "out that manipulating the Wobbe Index can result\n" +
            "in systems that can accommodate both pipeline\n" +
            "quality methane and biogas right out of a digester.\n" +
            "We agreed to sell any extra gas we produce to APPL!";
    }
})()