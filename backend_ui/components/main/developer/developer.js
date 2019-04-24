(function() {
    angular.module('blockchain.components').directive('developer', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/developer/developer.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {}
        };
    }

    function controller($scope) {
        let vm = this;
        $scope.developerText = "Enter the choices below and press enter to see a detailed explanation of the cost and timeline of development"

        $scope.areaText = "Design your own TreeHAUS"

        $scope.introductoryList = [{
            label: "Location",
            type: "dropdown",
            selectName: "opportunityZone",
            optionList: [{
                name: "Blacksburg"
            },{
                name: "Fort Collins"
            }]
        }]

        $scope.queryList = [{
            label: "Capital Gains",
            type: "input",
            placeholder: "Enter Desired Investment"
        }, {
            label: "Available Lot Size",
            type: "input",
            placeholder: "Enter Desired Lot Size"
        },{
            label: "Unit Type",
            type: "chkbox",
            checkName: "unittype",
            checkList:[{
                name: "4-Bedroom"
            },{
                name: "3-Bedroom"
            },{
                name: "2-Bedroom"
            },{
                name: "1-Bedroom"
            }]
        },{
            label: "Number of Stories",
            type: "dropdown",
            selectName: "numStories",
            optionList: [{
                name: "1"
            },{
                name: "2"
            }]
        },{
            label: "Subscribe to the community-wide energy distribution blockchain contract",
            type: "radio",
            selectName: "contractSubscription",
            radioList: [{
                name: "No"
            },{
                name: "Yes"
            }]
        }]
        // },{
        //     label: "Energy System",
        //     type: "radio",
        //     radioName: "energySystem",
        //     radioList:[{
        //         name: "Solar"
        //     },{
        //         name: "Anaerobic Digestion"
        //     }]
        // }]
    }
})()