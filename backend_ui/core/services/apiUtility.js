(function() {
    angular.module('blockchain.components').service('apiUtility', function ($http) {

        return {
            getResidentTokenInfo: getResidentTokenInfo,
            getUpdatedTokenInfo: getUpdatedTokenInfo,
            payRent: payRent,
            getAdminInfo: getAdminInfo
        };

        function getResidentTokenInfo(startingMonth){
            // let url = 'http://localhost:8000/getAllResidentsInfo';
            let url = 'http://ec2-52-90-35-35.compute-1.amazonaws.com:8000/getAllResidentsInfo';
            // let url = 'http://www.treeha.us/getAllResidentsInfo';
            payload = {startingMonth: startingMonth}

            return $http({
                method: 'POST',
                url: url,
                data: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // return $http.get(url);
        }

        function getUpdatedTokenInfo(){
            // let url = 'http://localhost:8000/getUpdatedTokenInfo';
            let url = 'http://ec2-52-90-35-35.compute-1.amazonaws.com:8000/getUpdatedTokenInfo';
            // let url = 'http://www.treeha.us/getUpdatedTokenInfo';
            return $http.get(url);
        }

        function register(name,pwd){
            let url = 'http://www.treeha.us:8000/register';
            // let url = 'http://www.treeha.us/register';

            let payload = {name: name, pwd: pwd};
            return $http({
                method: 'POST',
                url: url,
                data: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
              });
        }

        function payRent(id,rentAmount){
            // let url = 'http://localhost:8000/payRent';
            let url = 'http://ec2-52-90-35-35.compute-1.amazonaws.com:8000/payRent';
            // let url = 'http://www.treeha.us/getAllResidentsInfo';
            payload = {houseId: id, rentAmount: rentAmount}

            return $http({
                method: 'POST',
                url: url,
                data: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function getAdminInfo(){
            // let url = 'http://localhost:8000/getUpdatedTokenInfo';
            let url = 'http://ec2-52-90-35-35.compute-1.amazonaws.com:8000/getAdminInfo';
            // let url = 'http://www.treeha.us/getUpdatedTokenInfo';
            return $http.get(url);
        }


    });
})();