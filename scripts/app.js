var app = angular.module('vktodeezer', []);
//app.

//config(function ()
//{
//    //VK.init({
//    //    apiId: 4703399
//    //});

//    //DZ.init({
//    //    appId: 149671,
//    //    channelUrl: 'http://vktodeezer.azurewebsites.net'
//    //});
//}).
//run(['$scope', '$log', function ($scope, $log)
//{
//    //VK.Auth.getLoginStatus(VKAuthInfo);
//    //DZ.getLoginStatus(DZAuthInfo);
    
//    //$scope.DZAuthInfo = function (response)
//    //{
//    //    if (response.authResponse)
//    //    {
//    //        $scope.dzuid = response.userID | response.authResponse.userID;
//    //        $log.log('Success login DZ!');
//    //    } else
//    //    {
//    //        $log.log('Login is failed DZ!');
//    //    }
//    //}

//    //$scope.VKAuthInfo = function (response)
//    //{
//    //    if (response.session)
//    //    {
//    //        $scope.vkuid = response.session.mid;
//    //        $log.log('Success login VK!');
//    //    } else
//    //    {
//    //        $log.log('Login is failed VK!');
//    //    }
//    //}

//    $scope.VKAuthClick = function ()
//    {
//        $log.log("VKAuthClick");
//        //VK.Auth.login($scope.VKAuthInfo, 8);
//    }

//    $scope.DZAuthClick = function ()
//    {
//        $log.log("DZAuthClick");
//        //DZ.login($scope.DZAuthInfo, {
//        //    perms: 'basic_access,manage_library,delete_library'
//        //});
//    }
//}]);

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
