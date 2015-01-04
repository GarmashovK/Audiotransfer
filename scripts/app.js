var app = angular.module('vktodeezer', []);

app.controller('AuthController', ['$log', '$watchCollection', '$digest', '$window',
    function ($log, $window, $watchCollection, $digest)
    {
        var scope = this;
        this.tracks = [];
        this.tracks_offset = 0;
        this.tracks_count = 10;

        this.$watchCollection('tracks', function (newTracks, oldTracks)
        {
            $log.log(oldTracks);
        });

        this.DZAuthInfo = function (response)
        {
            if (response.authResponse)
            {
                scope.dzuid = response.userID | response.authResponse.userID;
                $log.log('Success login DZ!');
            } else
            {
                $log.log('Login is failed DZ!');
            }
        }

        this.VKAuthInfo = function (response)
        {
            if (response.session)
            {
                scope.vkuid = response.session.mid;
                $log.log('Success login VK!');
            } else
            {
                $log.log('Login is failed VK!');
            }
        };

        this.loadTracks = function ()
        {
            VK.Api.call('audio.get', {
                owner_id: scope.vkuid,
                need_user: 0,
                offset: scope.tracks_offset,
                count: scope.tracks_count
            },
            function (data)
            {
                $log.log(data);
                if (data.response)
                {
                    var tracks = [];
                    for (var i = 1; i < data.response.length; i++)
                    {
                        tracks.push(data.response[i]);
                    }
                    scope.tracks_offset += scope.tracks_count;
                    scope.tracks = tracks;
                    scope.$digest();
                } else
                {

                }
                $log.log(scope.tracks);
            });
        };

        this.VKAuthClick = function ()
        {
            VK.Auth.login(scope.VKAuthClick, 8);
        };

        this.DZAuthClick = function ()
        {
            DZ.login(scope.DZAuthInfo, {
                perms: 'basic_access,manage_library,delete_library'
            });
        };

        this.VKLogoutClick = function ()
        {
            VK.Auth.logout(function (data)
            {
                $log.log('success logout!');
                $log.log(data);
            })
        }

        $window.onload = function ()
        {
            $log.log('windowonload');
            VK.Auth.getLoginStatus(scope.VKAuthInfo);
            DZ.getLoginStatus(scope.DZAuthInfo);
        }
    }]);
