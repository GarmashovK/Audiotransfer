var app = angular.module('vktodeezer', []);

app.controller('AuthController', ['$scope', '$log', '$window', function ($scope, $log, $window)
{
    $scope.tracks = [];
    $scope.tracks_offset = 0;
    $scope.tracks_count = 10;

    $scope.clearTracks = function () { tracks = []; }

    $scope.addTrack = function (track)
    {
        $scope.tracks.push(track);
        $scope.tracks_offset++;
    }

    $scope.DZAuthInfo = function (response)
    {
        if (response.authResponse)
        {
            $scope.dzuid = response.userID | response.authResponse.userID;
            $log.log('Success login DZ!');
        } else
        {
            $log.log('Login is failed DZ!');
        }
    }

    $scope.VKAuthInfo = function (response)
    {
        if (response.session)
        {
            $scope.vkuid = response.session.mid;
            $log.log('Success login VK!');
        } else
        {
            $log.log('Login is failed VK!');
        }
    };

    $scope.loadTracks = function ()
    {
        VK.Api.call('audio.get', {
            owner_id: $scope.vkuid,
            need_user: 0,
            offset: $scope.tracks_offset,
            count: $scope.tracks_count
        },
        function (data)
        {
            $log.log(data);
            if (data.response)
            {
                for (var i = 1; i < data.response.length; i++)
                {
                    $scope.addTrack(data.response[i]);
                }
                $scope.$digest();
            } else
            {
                $log.log('bad request');
            }
            $log.log($scope.tracks);
        });
    };

    $scope.VKAuthClick = function ()
    {
        VK.Auth.login($scope.VKAuthClick, 8);
    };

    $scope.DZAuthClick = function ()
    {
        DZ.login($scope.DZAuthInfo, {
            perms: 'basic_access,manage_library,delete_library'
        });
    };

    $scope.VKLogoutClick = function ()
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
        VK.Auth.getLoginStatus($scope.VKAuthInfo);
        DZ.getLoginStatus($scope.DZAuthInfo);
    }
}]);
