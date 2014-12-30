var cdata = new ConnectionData(4703399, 149671);

function ConnectionData(vk_id, dz_id)
{
    this.vk = {}; this.dz = {};

    VK.init({
        apiId: vk_id
    });

    DZ.init({
        appId: dz_id,
        channelUrl: 'http://vktodeezer.azurewebsites.net'
    });
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
        $('#DZAuthBtn').fadeOut();
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
        $('#VKAuthBtn').fadeOut();
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