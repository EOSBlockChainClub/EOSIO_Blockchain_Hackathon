(function(){
    angular.module("blockchain.components").config(configureRoutes);

    function configureRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.when('/', '/about')
            .otherwise('/about');

        $stateProvider.state('about', {
            url: '/about',
            template: '<about></about>'
        }).state('design', {
            url: '/design',
            template: '<design></design>'
        }).state('developer', {
            url: '/developer',
            template: '<developer></developer>'
        }).state('residents', {
            url: '/residents',
            template: '<residents></residents>'
        }).state('floorplans', {
            url: '/floorplans',
            template: '<floorplan></floorplan>'
        }).state('team', {
            url: '/team',
            template: '<team-page></team-page>'
        }).state('treehaus', {
            url: '/treehaus',
            template: '<treehaus></treehaus>'
        }).state('contact', {
            url: '/contact',
            template: '<contact></contact>'
        }).state('decathlon', {
            url: '/decathlon',
            template: '<decathlon></decathlon>'
        }).state('agroforestry', {
            url: '/agroforestry',
            template: '<agroforestry></agroforestry>'
        }).state('architecture', {
            url: '/architecture',
            template: '<architecture></architecture>'
        }).state('blockchain', {
            url: '/blockchain',
            template: '<blockchain></blockchain>'
        }).state('engineering', {
            url: '/engineering',
            template: '<engineering></engineering>'
        }).state('gasgoals', {
            url: '/gasgoals',
            template: '<gasgoals></gasgoals>'
        }).state('locationinformation', {
            url: '/locationinformation',
            template: '<location-information></location-information>'
        }).state('siteremediation', {
            url: '/siteremediation',
            template: '<site-remediation></site-remediation>'
        }).state('targetmarket', {
            url: '/targetmarket',
            template: '<target-market></target-market>'
        }).state('transportation', {
            url: '/transportation',
            template: '<transportation></transportation>'
        });
    };

})();