(function() {
    angular.module('blockchain.components').directive('targetMarket', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/targetMarket/targetMarket.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "In an effort to determine our intended\n" +
            "market and understand occupant needs, we\n" +
            "researched current Blacksburg demographics\n" +
            "as well as the available housing options, and\n" +
            "identified a major shortage of affordable\n" +
            "housing for graduate students, especially those\n" +
            "with dependents. To further our research, we\n" +
            "performed oral interviews as well as distributed\n" +
            "a campus-wide questionnaire to all of the current\n" +
            "graduate students at Virginia Tech.\n" +
            "Our research revealed an alarming 54%\n" +
            "of graduate students who are housing insecure\n" +
            "(where housing costs exceed 30% of monthly\n" +
            "income), with average student rent representing\n" +
            "41% of income from a graduate stipend. With the\n" +
            "dramatic growth of Virginia Tech over the past\n" +
            "several years and the plans for future expansion,\n" +
            "the existing affordability crisis in Blacksburg is\n" +
            "only projected to increase.\n" +
            "In our discussions with Dean Karen DePauw\n" +
            "of the Graduate School at VT, we learned that the\n" +
            "two reasons graduate students with families of\n" +
            "their own do not enroll after granted admission is\n" +
            "1.) lack of affordable housing options, and 2.) lack\n" +
            "of affordable daycare. On that note, a 300 bed\n" +
            "development just got approved by town council\n" +
            "for luxury apartments at the Olver property next\n" +
            "to Rainbow Riders day care down the road from\n" +
            "our site. It is the first residential project of its kind\n" +
            "catering to young professionals at the VTCRC. To\n" +
            "remain competitive with our target market of older,\n" +
            "more established grad students, we encouraged\n" +
            "our sister team at Virginia Tech to include space to\n" +
            "lease to a daycare in their office building retrofit at\n" +
            "RackSpace.";

        vm.thumbnailsInfo = [{
            img:"resources/img/graphics/market_1.png",
            heading:"",
            tag:"",
            link:"",
            linkingreq:false
        },{
            img:"resources/img/graphics/market_2.png",
            heading:"",
            tag:"",
            linkingreq:false
        },{
            img:"resources/img/graphics/market_3.png",
            heading:"",
            tag:"",
            linkingreq:false
        }];
    }
})()