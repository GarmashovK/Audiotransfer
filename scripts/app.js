var app = angular.module('vktodeezer', []);

app.controller('AuthController', ['$log', function ($log)
{
    var scope = this;
    this.tracks = "some str";
    //VK.Auth.logout(function (response)
    //{
    //    $log.log(response.authResponse);
    //});

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
            //scope.loadTracks();
        } else
        {
            $log.log('Login is failed VK!');
        }
    };

    this.loadTracks = function ()
    {
        VK.Api('audio.get', {
            owner_id: scope.vkuid,
            need_user: 0,
            count: 3
        },
        function (data)
        {
            scope.tracks += '\n' + data[1].artist + ' ' + data[1].title;
            $log.log(data[0]);
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

    VK.Auth.getLoginStatus(this.VKAuthInfo);
    DZ.getLoginStatus(this.DZAuthInfo);
}]);
