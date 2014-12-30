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

$(document).ready(function ()
{
    VK.Auth.getLoginStatus(VKAuthInfo);
    DZ.getLoginStatus(DZAuthInfo);
});

function DZAuthInfo(response)
{
    if (response.authResponse)
    {
        cdata.dz.uid = response.userID | resonse.authResponse.userID;
        $('DZAuthBtn').hide();
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function (response)
        {
            console.log('Good to see you, ' + response.name + '.');
        });
    } else
    {
        console.log('User cancelled login or did not fully authorize.');
    }
}

function VKAuthInfo(response)
{
    if (response.session)
    {
        cdata.vk.uid = response.session.mid;
        $('#VKAuthBtn').hide();
        loadTracks();
    } else
    {
        console.log('Login is failed!');
    }
}

function loadTracks()
{
    VK.Api.call('audio.get', { owner_id: cdata.vk.uid, need_user: 0, count: 5 },
        function (data)
        {
            //alert(response.items);
            var items = data.response;
            for (var i = 0; i < items.length; i++)
                $("<p>").text(items[i].artist + ' ' + items[i].title).appendTo('#tracks');
        });
}