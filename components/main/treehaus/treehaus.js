(function() {
    angular.module('blockchain.components').directive('treehaus', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/treehaus/treehaus.html',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                pagetitle: '@'
            }
        };
    }

    function controller($scope) {
        let vm = this;
        // $scope.abouttext = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.";

        $scope.component1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.";
        $scope.component2 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.";
        $scope.component3 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.";
        $scope.component4 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.";

    }
})()