var app = angular.module('dz_tracks_table_dir', ['dz_tracks_table_ctrl']);

app.directive('dzTracks', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'templates/DZTracksTable.html',
        controller: 'DZTracksTableCtrl'
    };
});