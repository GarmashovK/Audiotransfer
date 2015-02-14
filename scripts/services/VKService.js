var app = angular.module('vkservice', ['opt'])

// service module of VKApi
.service('VKService',
    ['$rootScope', '$log', 'Options',
    function ($rootScope, $log, Options)
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
                Options.isAuthorized++;
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
        this.loadUserTracks = function (offset, count, album_id)
        {
            // tracks loading handling
            var h_loadTracks = function (data)
            {
                if (data.response)
                {
                    var tracks = data.response;
                    tracks.shift();  //removing response data and get only tracks

                    //$log.log(tracks);
                    // sending tracks to scope
                    $rootScope.$broadcast('vk_tracks_loaded', tracks);
                } else
                {
                    // something failed
                    $rootScope.$broadcast('vk_tracks_not_loaded');
                }
            };
            var data = {
                // uid
                owner_id: service.vkuid,
                // user data (not necessary)
                need_user: 0,
                // offset for list in tracks
                offset: offset,
                // num of tracks for loading
                count: count
            };

            if (album_id)
                data.album_id = album_id;
            VK.Api.call('audio.get', data, h_loadTracks);
        };

        this.loadAlbums = function ()
        {
            var data = {
                owner_id: service.vkuid
            };

            var h_loadAlbums = function (response)
            {
                if (response)
                {                    
                    var albums = response.response;
                    albums.shift();
                    //$log.log(albums);
                    //$log.log(response);

                    $rootScope.$broadcast('vk_albums_load_success', albums);
                } else
                {
                    $rootScope.$broadcast('vk_albums_load_fail');
                }
            }

            VK.Api.call('audio.getAlbums', data, h_loadAlbums);
        }

        this.getLoginStatus = function ()
        {
            VK.Auth.getLoginStatus(VKAuthInfo);
        }
    }]);