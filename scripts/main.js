var cdata = new ConnectionData(4703399, 149671);

function ConnectionData(vk_id, dz_id)
{
    this.vk = {}; this.dz = {};
    this.vk.appid = vk_id;
    this.dz.appid = dz_id;

    VK.init({
        apiId: this.vk.appid
    });

    DZ.init({
        appId: this.dz.appid,
        channelUrl: 'http://vktodeezer.azurewebsites.net/index.html'
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
    VK.Auth.logout(
        function (response) { console.log(response); });
});

function DZAuthInfo(response)
{
    if (response.authResponse)
    {
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