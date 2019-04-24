(function(){
    angular.module('blockchain.components').directive('blockchainEntryPage', directive);

        function directive() {
            return {
                restrict: 'E',
                scope:{
                    firstName:"@"
                },
                templateUrl: 'http://localhost:8000/components/EntryPage/entryPage.html',
              //template: "<h1> abcbc </h1>",
                controller: controller,
                controllerAs: 'vm'
                //link:link
            };
        }

    function controller($scope,$http,apiUtility,$timeout){
        let vm = this;

        function init(){
//             web3Instance = getWeb3Instance();
//             register = getRegister("Choudhry","ABC");
             attachActions();
        }

        function attachActions(){
            $timeout(function(){
                $('#registerBtn').on('click', () => {
                    getRegister.bind(this)();
                    event.stopPropagation();
                });
            },500);
        }

        function getWeb3Instance(){
           apiUtility.getWeb3Instance().then(getWeb3InstanceSuccess, getWeb3InstanceFailure);
        }

        function getWeb3InstanceSuccess(response){
            web3Instance = response;
        }

        function getWeb3InstanceFailure(){

        }

        function getRegister(){
            apiUtility.register(vm.uName,vm.pwd).then(getRegisterSuccess, getRegisterFailure);
        }

        function getRegisterSuccess(response){
            console.log(response);
            vm.uName = "";
            vm.pwd = "";

        }

        function getRegisterFailure(response){
            console.log(response);
        }

        init()
    }
})();




//        $scope.avc = "Abcdefg";
//        $scope.firstName = "Arjun";
//        let vm = this;
//        vm.getResponse = getResponse;
//
//        function init(){
//            $(".nameBox").on('keypress',function(event){
//                if(event.keyCode == 13){
//                    console.log($scope.firstName);
//                }
//            });
//        }
//
//       function getResponse(){
//            $http({
//                   method: "GET",
//                   url: 'http://localhost:8000/check',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Accept':'text/html'
//                   }
//               }).then(function successCallBack(response){
//                                 //$("#checkTest").innerText(response.data);
//                                 document.getElementById("checkTest").innerText = response.data;
//                             }),(function errorCallBack(){
//                                 text = "error";
//                             })
//            console.log("abc");
//       }

//       init();
//    }

//    function link(scope,controller){
//        console.log(scope.headerss);
//    }

//})()