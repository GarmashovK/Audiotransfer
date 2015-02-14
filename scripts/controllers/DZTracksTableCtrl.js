var app = angular.module('dz_tracks_table_ctrl', ['dzservice']);

app.controller('DZTracksTableCtrl', ['$scope', '$log', 'DZService', function ($scope, $log, DZService)
{
    $scope.dztracks = [];

    $scope.dzplay = function (clickEvent, index)
    {
        $scope.Play(clickEvent, $scope.dztracks[index].preview);
    }

    $scope.$on('dz_playlists_loaded', function (event, playlists)
    {
        $scope.dzplaylists = playlists;
        $scope.currentPlaylist = $scope.dzplaylists[0];
        $scope.$digest();
    });

    $scope.$on('on_search', function (event, track)
    {
        DZService.SearchTrack(track);
    });
    
    $scope.$on('dz_tracks_searched', function (event, tracks)
    {
        $scope.dztracks = tracks;
        $scope.$digest();
    });

    $scope.Add = function ()
    {

    }
}]);