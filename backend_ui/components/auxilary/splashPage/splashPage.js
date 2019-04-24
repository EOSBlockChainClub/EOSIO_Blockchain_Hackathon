(function(){
    angular.module('blockchain.components').directive('splashPage', directive);
    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/auxilary/splashPage/splashPage.html',
            controller: controller,
            controllerAs: 'vm',
            scope:{
                pagetitle: '@',
                videoreq: '@',
                imgLink: '@',
                imgSecondLink: '@',
                numImages: '@'
            }
        };
    }

    function controller($scope,$timeout){
        let vm=this;
        vm.pageTitle = $scope.pagetitle;
        vm.showTitle = true
        vm.videoReq = $scope.videoreq == 'True'? true: false;

            // Smooth scrolling using jQuery easing
            $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: (target.offset().top - 54)
                        }, 1000, "easeInOutExpo");
                        return false;
                    }
                }
            });

            $(document).ready(function(){
                if($scope.numImages == '1'){
                    vm.showTitle = true
                    $('header.masthead').css("background-image", "url("+ $scope.imgLink + ")");
                } else{
                    vm.showTitle = false
                    $('header.masthead').css("background-image", "url("+ $scope.imgSecondLink + "), url("+ $scope.imgLink + ")");

                }

            })



            // Closes responsive menu when a scroll trigger link is clicked
            $('.js-scroll-trigger').click(function() {
                $('.navbar-collapse').collapse('hide');
            });

            // Collapse Navbar
            // var navbarCollapse = function() {
            //     if ($("#mainNav").offset().top > 100) {
            //         $("#mainNav").addClass("navbar-shrink");
            //     } else {
            //         $("#mainNav").removeClass("navbar-shrink");
            //     }
            // };
            // Collapse now if page is not at top
            // navbarCollapse();
            // Collapse the navbar when page is scrolled
            // $(window).scroll(navbarCollapse);

            // Hide navbar when modals trigger
            $('.portfolio-modal').on('show.bs.modal', function(e) {
                $('.navbar').addClass('d-none');
            })
            $('.portfolio-modal').on('hidden.bs.modal', function(e) {
                $('.navbar').removeClass('d-none');
            })

    }
})()
