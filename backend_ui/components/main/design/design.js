(function() {
    angular.module('blockchain.components').directive('design', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/design.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                heading: '@',
                headingText: '@',
                partnershipInfo: '@'
            }
        };
    }

    function controller($scope) {
        let vm=this;
        $scope.abouttext = "The 2019 Solar Decathlon Design Competition has ten categories on which a jury of industry experts will judge the winner of each division and the Grand Jury winner of the entire competition. We are competing in the Attached Housing (AH) division. Below is more information on how TreeHAUS addresses each of the ten criteria.";

        $scope.textImgInfo = [{
            headingreq: true,
            heading:"RESTORATIVE LANDSCAPE",
            img:"resources/img/graphics/dg_2.png",
            text:[{
                bulletinPoints:"Stewardship of ecosystem"
            },{
                bulletinPoints:"Edible agroforestry for resilience"
            },{
                bulletinPoints:"Remediation of disturbed land"
            },{
                bulletinPoints:"Native plantings for reduced irrigation"
            },{
                bulletinPoints:"Increased canopy cover"
            },{
                bulletinPoints:"Quiet, healthy atmosphere"
            }]
        },{
            headingreq: true,
            heading:"MINDFUL INTELLIGENCE",
            img:"resources/img/graphics/dg_1.png",
            text:[{
                bulletinPoints:"Secure P2P blockchain network"
            },{
                bulletinPoints:"Predictive algorithms to optimize energy"
            },{
                bulletinPoints:"Optimized daylighting and ventilation"
            },{
                bulletinPoints:"Overrides for less screen time"
            },{
                bulletinPoints:"Behavioral learning over time"
            },{
                bulletinPoints:"Seamless biometric interaction"
            }]
        },{
            headingreq: true,
            heading:"REGENERATIVE DESIGN",
            img:"resources/img/graphics/dg_3.png",
            text:[{
                bulletinPoints:"Embodied energy & lifecycle awareness"
            },{
                bulletinPoints:"Renewable, natural materials"
            },{
                bulletinPoints:"Interdisciplinary approach"
            },{
                bulletinPoints:"Occupant health & construction safety"
            },{
                bulletinPoints:"Design for biodegradation"
            },{
                bulletinPoints:"Closed-loop and regional"
            }]
        },{
            headingreq: true,
            heading:"ACCESSIBILITY",
            img:"resources/img/graphics/dg_4.png",
            text:[{
                bulletinPoints:"Multi-tiered affordability"
            },{
                bulletinPoints:"Promotion of social and biological diversity"
            },{
                bulletinPoints:"Connection to local transit and trails"
            },{
                bulletinPoints:"Accomodation for special needs"
            },{
                bulletinPoints:"Adaptation to occupant lifestyle"
            },{
                bulletinPoints:"Local and global appeal"
            }]
        },{
            headingreq: true,
            heading:"SCALABLE MODULARITY",
            img:"resources/img/graphics/dg_5.png",
            text:[{
                bulletinPoints:"Reduction of construction waste"
            },{
                bulletinPoints:"Cost and time savings"
            },{
                bulletinPoints:"Minimized site disturbance"
            },{
                bulletinPoints:"Smart, safe construction"
            },{
                bulletinPoints:"Scalable size of building and units"
            },{
                bulletinPoints:"Adaptable development models"
            }]
        }];

        $scope.thumbnailsInfo = [{
            img:"resources/img/design/biogas.jpg",
            heading:"ENERGY PERFORMANCE",
            tag:"",
            link:"architecture",
            linkingreq:false
        },{
            img:"resources/img/design/engineering.jpg",
            heading:"ENGINEERING",
            tag:"",
            link:"engineering",
            linkingreq:false
        },{
            img:"resources/img/design/transportation.jpg",
            heading:"FINANCIAL FEASIBILITY",
            tag:"",
            link:"agroforestry",
            linkingreq:false
        },{
            img:"resources/img/design/site.jpg",
            heading:"RESILIENCE",
            tag:"",
            link:"siteremediation",
            linkingreq:false
        },{
            img:"resources/img/design/architecture.jpg",
            heading:"ARCHITECTURE",
            tag:"",
            link:"blockchain",
            linkingreq:false
        },{
            img:"resources/img/design/blockchain.png",
            heading:"OPERATIONS",
            tag:"",
            link:"transportation",
            linkingreq:false
        },{
            img:"resources/img/design/location.jpg",
            heading:"MARKET POTENTIAL",
            tag:"",
            link:"locationinformation",
            linkingreq:false
        },{
            img:"resources/img/design/agroforestry.jpg",
            heading:"ENVIRONMENTAL QUALITY",
            tag:"",
            link:"gasgoals",
            linkingreq:false
        },{
            img:"resources/img/design/market.jpg",
            heading:"INNOVATION",
            tag:"",
            link:"targetmarket",
            linkingreq:false
        },{
            img:"resources/img/design/market.jpg",
            heading:"PRESENTATION",
            tag:"",
            link:"targetmarket",
            linkingreq:false
        }];


    }
})()