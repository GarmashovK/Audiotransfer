var app_auth = angular.module('vktodeezer-auth', []);

app_auth.directive('auth', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'auth.html',
        controller: ['$scope', function($scope) {
            this.VKAuthClick = function ()
            {
                VK.Auth.login($scope.VKAuthInfo, 8);
            }

            this.DZAuthClick = function ()
            {
                DZ.login($scope.DZAuthInfo, {
                    perms: 'basic_access,manage_library,delete_library'
                });
            }
        }],
        controllerAs: 'authCtrl'
    };
});