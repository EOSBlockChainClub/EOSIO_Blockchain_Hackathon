(function() {
    angular.module('blockchain.components').directive('devForm', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/devForm/devForm.html',
            controller: controller,
            controllerAs: 'vm',
            scope:{
                heading: '@',
                headingText: '@',
                headingreq: '@',
                queryList: '@',
                greyBackground:'@',
                sectionVisibility: '@',
                className: '@',
                buttonHit:'@'
            }
        };
    }

    function controller($scope,$timeout) {
        let vm = this;
        vm.headingreq = $scope.headingreq == 'True'? true:false;
        vm.queryList = JSON.parse($scope.queryList);
        vm.greyBackground = $scope.greyBackground == 'true'? "bg-light" : ""
        // vm.heading = $scope.heading

        vm.functionCall = function(){
            if($scope.buttonHit == 'showAreaInfo'){
                vm.showAreaInfo()
            }else{
                vm.showBuildInfo()
            }
        }

        vm.showBuildInfo = showBuildInfo

        vm.showAreaInfo = showAreaInfo

        function showAreaInfo(){
            $('.roomReq').css("visibility","visible");


                if($('.opportunityZone').val() == 'Blacksburg'){
                    vm.opportunityImg = "resources/img/graphics/bb_opportunity.png"
                }else{
                    vm.opportunityImg = "resources/img/graphics/fc_opportunity.png"
                }

            vm.showOpportunity = true;

        }

        function showBuildInfo(){
            vm.showTimeline = true;
            vm.timelineNarrative = "Build Timeline";
            vm.timelineObjects = [{
                img: "resources/img/developers/1_Identify_OZ.png",
                heading: "Identify Opportunity Zone & Perform Feasibility Study",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: false
            },{
                img: "resources/img/developers/2_Acquire_Property.png",
                heading: "Acquire Property & Select TreeHAUS Configuration",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: true
            },{
                img: "resources/img/developers/3_Permit_Submission.png",
                heading: "Permit Submission and Processing",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: false
            },{
                img: "resources/img/developers/4_Sitework.png",
                heading: "Sitework  & Prefabrication",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: true
            },{
                img: "resources/img/developers/5_Transport.png",
                heading: "Transport & On-site Installation",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: false
            },{
                img: "resources/img/developers/6_Tenant_Move-in.png",
                heading: "Tenant Move-in",
                time: "",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
                inverted: true
            }];

            vm.infoHeading = "Additional Cost Information"
            vm.infoText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

        }
    }
})()