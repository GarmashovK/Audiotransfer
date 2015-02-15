var app = angular.module('dz_tracks_table_ctrl', ['dzservice']);

app.controller('DZTracksTableCtrl', ['$scope', '$log', 'DZService', function ($scope, $log, DZService)
{
    $scope.dzplay = function (clickEvent, index)
    {
        $scope.Play(clickEvent, $scope.dztracks[index].preview);
    }

    $scope.$on('dz_playlists_loaded', function (event, playlists)
    {
        //$log.log(playlists);
        $scope.dzplaylists = playlists;
        $scope.currentPlaylist = $scope.dzplaylists[0];
        $scope.$digest();
    });

    $scope.$on('on_search', function (event, track)
    {
        $scope.dztracks = [];
        DZService.SearchTrack(track, true, true);
        DZService.SearchTrack(track, true, false);
        DZService.SearchTrack(track, false, true);
    });

    $scope.$on('dz_tracks_searched', function (event, tracks)
    {
        //$log.log(tracks);
        if (tracks.length)
            $scope.dztracks = $scope.dztracks.concat(tracks);
        $scope.$digest();
    });

    $scope.Add = function (index)
    {
        DZService.addTrackToPlaylist($scope.dztracks[index], $scope.currentPlaylist);
    }

    $scope.$on('success_add_track', function ()
    {
        alert('Track was added!');
    });

    $scope.$on('tracks_already_exists', function ()
    {
        alert('Track already exists in the playlist!');
    });
}]);