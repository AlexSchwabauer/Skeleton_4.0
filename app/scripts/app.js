


angular.module('app', ['ngTouch', 'ngMaterial'])
        .directive('Animation',  function($window) {
            return {
                restrict: 'C',
                link: function(scope, elem, attr) {

                    function isVisible() {
                        return (elem.offset().top + elem.height() <= $window.pageYOffset + $window.innerHeight);
                    }

                    function applyClass() {
                        if(isVisible()) {
                            elem.addClass("in");
                            return true;
                        }
                        return false;
                    }


                    if(applyClass())
                        return;

                    angular.element($window).bind("scroll.Animation", function() {
                        if(applyClass())
                            angular.element($window).unbind("scroll.Animation");
                    });
                }
            }
        });

