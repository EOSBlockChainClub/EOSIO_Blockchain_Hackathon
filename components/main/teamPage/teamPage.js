(function() {
    angular.module('blockchain.components').directive('teamPage', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/teamPage/teamPage.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                pagetitle: '@'
            }
        };
    }

    function controller($scope) {
        let vm = this;
        $scope.teamInfo = [{
            teamName:"",
            members:[{
                img:"resources/img/team/ikechuckwu_dimobi.jpg",
                name: "Ikechukwu Dimobi",
                position: "Graduate Student"
            },{
                img:"resources/img/team/me.jpg",
                name: "Arjun Choudhry",
                position: "Graduate Student"
            },{
                img:"resources/img/team/zachary_gould.jpg",
                name: "Zachary Gould",
                position: "Graduate Student"
            }]
        }]

    }
})()