var app = angular.module('vktodeezer', ['vkservice'])
//authCtrl
.controller('AuthController',
    ['$scope', '$log', '$window', 'VKService',
    function ($scope, $log, $window, VKService)
    {
        $scope.tracks = [];

        $scope.DZAuthInfo = function (response)
        {
            if (response.authResponse)
            {
                $scope.dzuid = response.userID | response.authResponse.userID;
                $log.log('Success login DZ!');
            } else
            {
                $log.log('Login is failed DZ!');
            }
        }

        $scope.VKAuthClick = function ()
        {
            VK.Auth.login($scope.VKAuthInfo, 8);
        };

        $scope.DZAuthClick = function ()
        {
            DZ.login($scope.DZAuthInfo, {
                perms: 'basic_access,manage_library,delete_library'
            });
        };

        var count = 10;
        var offset = 0;

        $scope.loadTracks = function ()
        {            
            VKService.loadUserTracks(offset, count);
        }

        $scope.VKLogoutClick = function ()
        {
            VKService.logout();
        }

        //registering events
        $scope.registerEvents = function ()
        {
            $scope.$on('vk_success_login', function () { $log.log('success VK login'); });
            $scope.$on('vk_failed_login', function () { $log.log('VK login failed'); });
            $scope.$on('vk_tracks_loaded', function (e, tracks)
            {
                $log.log(tracks);
                $scope.tracks = tracks;
                $scope.$digest();

                offset += 10;
            });
            $scope.$on('vk_tracks_not_loaded', function ()
            {
                $log.log('tracks no loaded!');
            });
        }

        //
        $window.onload = function ()
        {
            $log.log('windowonload');

            $scope.registerEvents();
            VKService.getLoginStatus();
            DZ.getLoginStatus($scope.DZAuthInfo);
        }
    }]);
