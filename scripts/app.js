var app = angular.module('vktodeezer', ['vktodeezer-controllers', 'vktodeezer-auth']);
app.

config(function ()
{
    VK.init({
        apiId: 4703399
    });

    DZ.init({
        appId: 149671,
        channelUrl: 'http://vktodeezer.azurewebsites.net'
    });
}).

run(['$scope', '$log', function ($scope, $log)
{
    VK.Auth.getLoginStatus(VKAuthInfo);
    DZ.getLoginStatus(DZAuthInfo);
    
    $scope.DZAuthInfo = function (response)
    {
        if (response.authResponse)
        {
            $scope.dzuid = response.userID | response.authResponse.userID;
            //$('#DZAuthBtn').fadeOut();
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
    }
}]);
