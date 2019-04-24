(function() {
    angular.module('blockchain.components').directive('blockchain', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/design/blockchain/blockchain.html',
            controller: controller,
            controllerAs: 'vm'
        };
    }

    function controller($scope) {
        let vm = this;
        vm.abouttext = "Our energy exchange model uses a hybrid of the blockchain network with a traditional database,\n" +
            "allowing units with shared PV to distribute credits for portions of the produced power amongst themselves\n" +
            "in an autonomous, transparent and secure manner. When power is sold back to the grid, those tenants who\n" +
            "consumed the least will get paid the most. The database also logs user actions as part of a behavioral learning\n" +
            "strategy to further decrease energy demand. We are building our decentralized application (DApp) on EOSIO,\n" +
            "a platform developed by a local Blacksburg company called Block.one. EOSIO leverages the delegated Proof\n" +
            "of Stake (dPoS) consensus, a much more energy-efficient protocol than the Proof of Work (PoW) consensus\n" +
            "utilized by most blockchain platforms. This eliminates the need for high end computers with high energy\n" +
            "demands. The EOSIO platform with dPoS can be run on a standard laptop that would consume on the order\n" +
            "of only 100 kWh of energy annually.\n" +
            "Blockchain not only helps\n" +
            "combine peer-to-peer (P2P) energy\n" +
            "exchange with virtual power plant\n" +
            "(VPP) integration on our network, it also\n" +
            "affords new standards of security and\n" +
            "transparency for two-way smart meter\n" +
            "communications that bridge critical\n" +
            "infrastructures with a connected internet\n" +
            "of things (IoT). Our proximity to an office\n" +
            "building and a power laboratory result\n" +
            "in a more diverse, resilient collective\n" +
            "load profile."
    }
})()