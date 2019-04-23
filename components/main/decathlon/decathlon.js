(function() {
    angular.module('blockchain.components').directive('decathlon', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/decathlon/decathlon.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
            }
        };
    }

    function controller($scope) {
        let vm=this;
        $scope.abouttext = "Teams competing in the Solar Decathlon Design Challenge work for one or two academic semesters. Participants prepare creative solutions for real-world issues in the building industry. See the participating teams for the 2019 Design Challenge.\n" +
            "\n" +
            "Qualifying teams complete a design project and attend the Solar Decathlon Design Challenge Weekend, where they present their designs to a panel of industry expert jurors, compare their projects to those of other teams, learn from presentations by thought leaders and collegiate peers, and engage with a variety of organizations about energy careers. Winning teams are recognized at an Awards Banquet, and winning project presentations are published on the website. The competition and winners are promoted through a variety of media outreach efforts, which provide participants and their collegiate institutions an opportunity for national exposure.\n" +
            "\n" +
            "Collegiate institutions that participate in the challenge are recognized as leaders who are producing career-ready professionals with cutting-edge skills. Industry partners who collaborate with teams gain national and local recognition and have the opportunity to interact with knowledgeable future design and construction professionals."

        $scope.projectHighlightInfo = [{
            headingreq: true,
            heading:"BLOCKCHAIN ENERGY EXCHANGE",
            img:"resources/img/graphics/ph_1.png",
            text:[{
                bulletinPoints:"TreeHAUS is designed as one node in a proposed Live/Work/Learn network"
            },{
                bulletinPoints:"Smart contracts execute energy transactions and incentive less consumption"
            },{
                bulletinPoints:"System interfaces with nearby utility sub-station as a virtual power plant (VPP)"
            }]
        },{
            headingreq: true,
            heading:"MODULAR DESIGN AND CONSTRUCTION",
            img:"resources/img/graphics/ph_2.png",
            text:[{
                bulletinPoints:"One, two, and four-bedroom modules will be pre-fabricated off-site"
            },{
                bulletinPoints:"Cost reduced significantly with decreased construction waste and assembly time"
            }]
        },{
            headingreq: true,
            heading:"Agroforestry landscaping for smart shading and food production".toUpperCase(),
            img:"resources/img/graphics/ph_3.png",
            text:[{
                bulletinPoints:"Edible landscape provides food for occupants in case of supply chain disruption"
            },{
                bulletinPoints:"Collected rainwater, graywater, and HVAC condensate irrigates plants"
            },{
                bulletinPoints:"Deciduous agroforests provide shading in the summer and direct light/heat in the winter"
            }]
        },{
            headingreq: true,
            heading:"Integrated application for building control and behavioral learning".toUpperCase(),
            img:"resources/img/graphics/ph_4.png",
            text:[{
                bulletinPoints:"Artificially intelligent back-end monitors conditions and learns user behavior"
            },{
                bulletinPoints:"Blockchain provides cyber-security for home control and energy transactions"
            },{
                bulletinPoints:"Automated building controls with manual overrides"
            }]
        },{
            headingreq: true,
            heading:"All-wood Envelope and Stomatal Windows".toUpperCase(),
            img:"resources/img/graphics/ph_5.png",
            text:[{
                bulletinPoints:"Wooden wall section naturally modulates moisture flow"
            },{
                bulletinPoints:"Wood fiber insulation and OSB help reclaim post-production waste"
            },{
                bulletinPoints:"Dowel Laminated Timber (DLT) and wooden Ligno-lock nails replace metal & adhesives"
            },{
                bulletinPoints:"Operable screens insulate the windows, increasing nocturnal thermal performance"
            }]
        },{
            headingreq: true,
            heading:"Innovative Acoustics".toUpperCase(),
            img:"resources/img/graphics/ph_6.png",
            text:[{
                bulletinPoints:"Helmholtz cavities in DLT wall panels attenuate target auditory frequencies"
            },{
                bulletinPoints:"Mass timber walls & ceilings, and cork insulation offer additional acoustic control"
            }]
        }];
    }
})()