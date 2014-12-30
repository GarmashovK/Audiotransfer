VK.init({
    apiId: 4703399
});

DZ.init({
    appId: 149671,
    channelUrl: 'http://vktodeezer.azurewebsites.net'
});

var cdata = new ConnectionData();
function ConnectionData()
{
    this.vk = {};
    this.dz = {};
}

function VKClick()
{    
    VK.Auth.login(VKAuthInfo, 8);
}

function DZClick()
{
    DZ.login(DZAuthInfo, {
        perms: 'basic_access,manage_library,delete_library'
    });
}

window.onload = function ()
{
    VK.Auth.getLoginStatus(VKAuthInfo);
    DZ.getLoginStatus(DZAuthInfo);
};

function DZAuthInfo(response)
{
    if (response.authResponse)
    {
        cdata.dz.uid = response.userID | response.authResponse.userID;
        //$('#DZAuthBtn').fadeOut();
        console.log('Success login DZ!');
    } else
    {
        console.log('Login is failed DZ!');
    }
}

function VKAuthInfo(response)
{
    if (response.session)
    {
        cdata.vk.uid = response.session.mid;
        //$('#VKAuthBtn').fadeOut();
        console.log('Success login VK!');
        //loadTracks();
    } else
    {
        console.log('Login is failed VK!');
    }
}

//function loadTracks()
//{
//    VK.Api.call('audio.get', { owner_id: cdata.vk.uid, need_user: 0, count: 5 },
//        function (data)
//        {
//            //alert(response.items);
//            var items = data.response;
//            for (var i = 0; i < items.length; i++)
//                $("<p>").text(items[i].artist + ' ' + items[i].title).appendTo('#tracks');
//        });
//}