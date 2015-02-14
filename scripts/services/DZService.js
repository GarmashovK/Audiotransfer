var dzserv = angular.module('dzservice', ['opt']);

dzserv.service('DZService',
    ['$rootScope', '$log', 'Options', function ($rootScope, $log, Options)
    {
        var service = this;

        var DZAuthInfo = function (response)
        {
            if (response.authResponse)
            {
                service.dzuid = response.userID | response.authResponse.userID;
                Options.isAuthorized++;

                $rootScope.$broadcast('dz_success_login');
            } else
            {
                service.isAuthorized = false;
                $rootScope.$broadcast('dz_failed_login');
            }
        }

        this.login = function (permissions)
        {
            DZ.login(DZAuthInfo, {
                perms: permissions
                    //'basic_access,manage_library,delete_library'
            });
        }

        this.loadUserData = function ()
        {
            DZ.api('/user/me', function (response)
            {
                //$log.log(response);
                service.user_data = response;
            });
        }

        var removeNotMine = function (playlists)
        {
            for (var i = 0; i < playlists.length; i++)
            {
                if (playlists[i].creator.id != service.user_data.id)
                    playlists.splice(i, 1);
            }
        }
        //playlists loadng(only user playlists)
        this.loadPlaylists = function ()
        {
            DZ.api('/user/me/playlists', function (response)
            {
                if (!response.error)
                {
                    var playlists = response.data;
                    removeNotMine(playlists);
                    //$log.log(playlists);
                    $rootScope.$broadcast('dz_playlists_loaded', playlists);
                } else
                {
                    $rootScope.$broadcast('dz_playlists_not_loaded');
                }
            });
        }

        this.SearchTrack = function (track)
        {
            var artist = escape(track.artist);
            var title = escape(track.title);
            var query = escape(artist + ' ' + title); //$log.log(query);

            DZ.api('/search/track?q=' + query, function (response)
            {
                $rootScope.$broadcast('dz_tracks_searched', response.data);
            });
        }

        //login status checking
        this.getLoginStatus = function ()
        {
            DZ.getLoginStatus(DZAuthInfo);
        }
    }]);