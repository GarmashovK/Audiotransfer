var app = angular.module('vktodeezer', []);


app.controller('AuthController', ['$log', function ($log)
{
    var scope = this;
    scope.tracks = 'Tracks loaded';

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
    }

    this.loadTracks = function ()
    {
        VK.Api('audio.get', {
            owner_id: scope.vkuid,
            need_user: 0,
            count: 5
        },
        function (data)
        {
            scope.tracks = 'Tracks loaded';
            for (var i = 1; i <= data.length; i++)
            {
                scope.tracks += '\n' + data[i].artist + ' ' + data[i].title;
            }
        });
    }

    this.VKAuthClick = function ()
    {
        VK.Auth.getLoginStatus(scope.VKAuthClick, 8);
    }
    
    this.DZAuthClick = function ()
    {
        DZ.login(scope.DZAuthInfo, {
            perms: 'basic_access,manage_library,delete_library'
        });
    }
}]);
