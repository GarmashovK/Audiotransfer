angular.module('vk_tracks_table_dir', ['vk_tracks_table_ctrl'])

.directive('vkTracks', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'templates/VKTracksTable.html',
        controller: 'VKTracksTableCtrl'
    };
});
