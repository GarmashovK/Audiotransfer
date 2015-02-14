angular.module('vk_tracks_table_ctrl', ['vkservice'])

    .controller('VKTracksTableCtrl',
    ['$rootScope', '$scope', '$log', 'VKService', function ($rootScope, $scope, $log, VKService)
    {
        $scope.vktracks = [];
        $scope.vkalbums = [{ album_id: 0, title: 'My music' }];

        var count = 10;
        var offset = 0;

        //tracks loadded event
        $scope.$on('vk_tracks_loaded', function (event, tracks)
        {
            $scope.vktracks = tracks;
            $scope.$digest();
        });

        // success album loading
        $scope.$on('vk_albums_load_success', function (event, albums)
        {
            if (albums.length)
            {
                $scope.vkalbums = $scope.vkalbums.concat(albums);
                $scope.currentAlbum = $scope.vkalbums[0];
            }

            VKService.loadUserTracks(offset, count, 0);
        });

        $scope.SelectAlbum = function ()
        {
            offset = 0;
            VKService.loadUserTracks(offset, count, $scope.currentAlbum.album_id);
        }
        
        //prev tracks btn handler
        $scope.backward = function ()
        {
            if (offset >= 10)
            {
                offset -= 10;
                VKService.loadUserTracks(offset, count, $scope.currentAlbum.album_id);
            } else
            {
                alert("You're in the top of list already!");
            }
        }

        //next tracks btn handler
        $scope.upward = function ()
        {
            offset += 10;
            VKService.loadUserTracks(offset, count, $scope.currentAlbum.album_id);
        }

        $scope.Search = function (index)
        {
            $rootScope.$broadcast('on_search', $scope.vktracks[index]);
        }

        $scope.vkplay = function (event, index)
        {
            $scope.Play(event, $scope.vktracks[index].url);
        }
    }]);