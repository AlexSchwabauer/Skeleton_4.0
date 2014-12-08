


angular.module('app', ['ngTouch', 'ngMaterial'])
        .directive('Animation',  function($window) {
            return {
                restrict: 'C',
                link: function(scope, elem, attr) {

                    function isVisible() {
                        return (elem.offset().top + elem.height() <= $window.pageYOffset + $window.innerHeight);
                    }

                    function applyClass() {
                        elem.addClass("in");
                    }


                    if(isVisible()) {
                        applyClass();

                        return;
                    }

                    angular.element($window).bind("scroll.Animation", function() {
                        if(isVisible()) {
                            applyClass();
                            angular.element($window).unbind("scroll.Animation");
                        }
                    });
                }
            }
        });

