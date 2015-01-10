var app = angular.module('vktodeezer', []);

app.service('VKService',
    ['$rootScope', '$log',
    function ($rootScope, $log)
    {
        // ref to this
        var service = this;

        // auth handler
        var VKAuthInfo = function (response)
        {
            if (response.session)
            {
                // set user ID
                service.vkuid = response.session.mid;

                // sending success login event
                $rootScope.$broadcast('vk_success_login');
                //$log.log('Success login VK!');
            } else
            {
                //sending failed login event
                $rootScope.$broadcast('vk_failed_login');
                //$log.log('Login is failed VK!');
            }
        }

        // tracks loading handling
        var loadTracksHandler = function (data)
        {
            if (data.response)
            {
                var tracks = data.response;
                tracks.shift();  //removing response data and get only tracks

                // sending tracks to scope
                $rootScope.$broadcast('vk_tracks_loaded', tracks);
            } else
            {
                // something failed
                $rootScope.$broadcast('vk_tracks_not_loaded');
            }
        };

        /* login fun
            permissions for app
        */
        this.login = function (permissions)
        {
            VK.Auth.login(VKAuthInfo, permissions);
        }

        // logout
        this.logout = function ()
        {
            VK.Auth.logout(function (data)
            {
                $rootScope.$broadcast('vk_success_logout');
                //$log.log('success logout!');
                //$log.log(data);
            });
        }

        //load from common tracklist
        this.loadUserTracks = function (offset, count)
        {
            VK.Api.call('audio.get',
                {
                    // uid
                    owner_id: service.vkuid,
                    // user data (not necessary)
                    need_user: 0,
                    // offset for list in tracks
                    offset: offset,
                    // num of tracks for loading
                    count: count
                }, loadTracksHandler);
        };

        this.getLoginStatus = function ()
        {
            VK.Auth.getLoginStatus(VKAuthInfo);
        }
    }])
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
            $scope.on('vk_tracks_loaded', function (tracks)
            {
                $scope.tracks = tracks;
                $scope.$digest();
            })
            VKService.loadUserTracks(offset, count);            
        }

        $scope.VKLogoutClick = function ()
        {
            VK.Auth.logout(function (data)
            {
                $log.log('success logout!');
                $log.log(data);
            })
        }

        $window.onload = function ()
        {
            $scope.$on('vk_success_login', function () { $log.log('success VK login'); });
            $scope.$on('vk_failed_login', function () { $log.log('VK login failed'); });
            $log.log('windowonload');
            VKService.getLoginStatus();
            DZ.getLoginStatus($scope.DZAuthInfo);
        }
    }]);
