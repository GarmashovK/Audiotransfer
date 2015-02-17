var dzserv = angular.module('dzservice', ['opt']);

dzserv.service('DZService',
    ['$rootScope', '$log', 'Options', function ($rootScope, $log, Options)
    {
        var service = this;

        var DZAuthInfo = function (response)
        {
            $log.log(response);
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

        this.SearchTrack = function (track, byartist, bytitle)
        {            
            var artist, title, query = "";
            if (byartist) { artist = track.artist; query += artist; }
            if (bytitle)
            {
                title = track.title;
                if (query.length) query += ' ';
                query += title;
            }
            if (byartist && bytitle) query = artist + ' ' + title;

            DZ.api('/search?q=' + query, function (response)
            {
                $rootScope.$broadcast('dz_tracks_searched', response.data);
            });
        }
        
        this.addTrackToPlaylist = function (track, playlist)
        {
            DZ.api('/playlist/' + playlist.id + '/tracks', 'POST', { songs: track.id },
                function (response)
                {
                    if (!response.error)
                    {
                        $rootScope.$broadcast('success_add_track');
                    } else
                    {
                        switch (response.error.code)
                        {
                            case 500:
                                $rootScope.$broadcast('tracks_already_exists');
                                break;
                        }
                    }
                });
        }

        //login status checking
        this.getLoginStatus = function ()
        {
            DZ.getLoginStatus(DZAuthInfo);
        }
    }]);