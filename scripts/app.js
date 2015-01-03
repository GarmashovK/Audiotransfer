var app = angular.module('vktodeezer', []);

app.controller('AuthController', ['$log', '$window', function ($log, $window)
{
    var scope = this;
    this.tracks = [];

    this.DZAuthInfo = function (response)
    {
        if (response.authResponse)
        {
            scope.dzuid = response.userID | response.authResponse.userID;
            $log.log('Success login DZ!');
        } else
        {
            $log.log('Login is failed DZ!');
        }
    }

    this.VKAuthInfo = function (response)
    {
        if (response.session)
        {
            scope.vkuid = response.session.mid;
            $log.log('Success login VK!');
        } else
        {
            $log.log('Login is failed VK!');
        }
    };
    
    this.loadTracks = function ()
    {
        VK.Api.call('audio.get', {
            owner_id: scope.vkuid,
            need_user: 0,
            count: 10
        },
        function (data)
        {
            $log.log(data);
            scope.tracks = [];
            if (data.response)
            {
                for (var i = 1; i < data.response.length; i++)
                {
                    scope.tracks.push(data.response[i]);
                }
            } else
            {

            }
            scope.$digest();
            $log.log(scope.tracks);
        });
    };

    this.VKAuthClick = function ()
    {
        VK.Auth.login(scope.VKAuthClick, 8);
    };

    this.DZAuthClick = function ()
    {
        DZ.login(scope.DZAuthInfo, {
            perms: 'basic_access,manage_library,delete_library'
        });
    };

    this.VKLogoutClick = function ()
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
        VK.Auth.getLoginStatus(scope.VKAuthInfo);
        DZ.getLoginStatus(scope.DZAuthInfo);
    }
}]);
