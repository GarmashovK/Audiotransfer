var app = angular.module('audio_transfer',
    [   'ngAnimate',
        'vk_tracks_table_dir', 'dz_tracks_table_dir', 'opt',
        , 'vkservice', 'dzservice'
    ])

.animation('.table-row-animation', function ()
{
    return {
        enter: function (element, done)
        {
            element.css({
                position: 'relative',
                left: -50,
                display: 'block'
            });
            
            $(element).animate({ left: "+=50" }, function ()
            {
                element.css({ display: '' }); done();
            });

            return function (cancelled)
            {
                if (cancelled)
                    element.stop();
            }
        }
    };
})

.controller('AuthCtrl', ['$log', '$scope', '$window', '$rootScope', 'Options', 'VKService', 'DZService',
    function ($log, $scope, $window, $rootScope, Options, VKService, DZService)
    {
        var isAuthorized = false;
        var hCounter = 0;

        var sendAuth = function ()
        {
            hCounter++;
            //$log.log(hCounter);
            //$log.log(Options.isAuthorized);
            if (Options.isAuthorized == 2 && hCounter == 2)
            {
                isAuthorized = true;
                $rootScope.$broadcast('authorized');
            }
        }

        var sendNotAuth = function ()
        {
            hCounter++;
            if (Options.isAuthorized < 2 && hCounter == 2)
            {
                isAuthorized = false;
                $rootScope.$broadcast('not_authorized');
            }
        }

        $scope.VKAuthClick = function ()
        {
            VKService.login(8);
        }

        $scope.DZAuthClick = function ()
        {
            var perms = 'basic_access,manage_library,delete_library';
            DZService.login(perms);
        }

        $scope.$on('vk_success_login', function ()
        {
            //$log.log('VK success login!');
            $('.fa-vk').hide();
            sendAuth();
        });
        $scope.$on('vk_failed_login', function ()
        {
            //$log.log('VK login is failed!');
            sendNotAuth();
        });
        $scope.$on('dz_success_login', function ()
        {
            //$log.log('DZ success login!');
            $('.login-bar-btn').hide();
            sendAuth();
        });
        $scope.$on('dz_failed_login', function ()
        {
            //$log.log('DZ login is failed!');
            sendNotAuth();
        });

        $window.onload = function ()
        {
            VKService.getLoginStatus();
            DZService.getLoginStatus();
        }
    }])

.controller('SwitchCtrl', ['$log', '$scope', 'VKService', 'DZService', function ($log, $scope, VKService, DZService)
{
    $scope.isAuthorized = false;

    $scope.$on('authorized', function ()
    {
        //$log.log('authorized');
        $scope.isAuthorized = true;
        $scope.$digest();

        // it's prepaired for app starting
        VKService.loadAlbums();
        DZService.loadUserData();
        DZService.loadPlaylists();
    });


    $scope.tooglePlayPause = function (btn)
    {
        if ($(btn).hasClass('fa-play'))
            $(btn).removeClass('fa-play').addClass('fa-pause');
        else
            $(btn).removeClass('fa-pause').addClass('fa-play');
    }

    $scope.Play = function (clickEvent, url)
    {
        var btn = clickEvent.target;
        var createAudio = function ()
        {
            var audio = new Audio(url);
            audio.play();
            audio.onended = function ()
            {
                $scope.tooglePlayPause($scope.currentTrack.btn);
                $scope.currentTrack = null;
            }
            $scope.currentTrack = {
                audio: audio,
                btn: btn
            }
        }

        $scope.tooglePlayPause(btn);

        if ($scope.currentTrack)
        {
            $scope.currentTrack.audio.pause();
            delete $scope.currentTrack.audio;

            if ($scope.currentTrack.btn != btn)
            {
                $scope.tooglePlayPause($scope.currentTrack.btn);
            } else
            {
                $scope.currentTrack = null;
                return;
            }
        }
        createAudio();
    }
}]);