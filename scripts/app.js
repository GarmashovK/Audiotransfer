var app = angular.module('vktodeezer', []);


app.controller('AuthController', ['$log', function ($log)
{
    var scope = this;

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
