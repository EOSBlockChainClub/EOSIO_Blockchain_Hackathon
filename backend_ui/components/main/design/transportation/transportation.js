(function() {
    angular.module('blockchain.components').directive('transportation', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/transportation/transportation.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "The location of our building is easily accessed by US\n" +
            "Highway 460 and other roads leading into Virginia Tech’s\n" +
            "Corporate Research Center. This area is served by regular\n" +
            "bus service which runs every 15 minutes Monday through\n" +
            "Saturday. A portion of the Huckleberry Trail, which is a paved\n" +
            "walking, running, and biking trail, is located less than quarter\n" +
            "mile away from the location of our building and continues to\n" +
            "run through Virginia Tech’s campus, the Town of Blacksburg,\n" +
            "and into the nearby Town of Christiansburg. We are\n" +
            "proposing to extend an existing path into a walking trail that\n" +
            "connects the TreeHAUS residents directly to the Huckleberry\n" +
            "trail through Crumpacker woods."
    }
})()