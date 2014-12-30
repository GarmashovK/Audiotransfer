var cdata = new ConnectionData(4703399, 149671);

function ConnectionData(vk_id, dz_id)
{
    this.vk.aid = vk_id;
    this.dz.aid = dz_id;

    VK.init({
        apiId: this.vk.aid
    });

    DZ.init({
        appId: this.dz.aid,
        channelUrl: 'http://vktodeezer.azurewebsites.net'
    });
}

function authClick()
{    
    VK.Auth.login(VKAuthInfo, 8);
    DZ.Auth.login(DZAuthInfo, {
        perms: 'basic_access,manage_library,delete_library'
    });
}

$(document).ready(function ()
{
    VK.Auth.logout(
        function (response) { console.log(response); });
    VK.UI.button('authBtn');
    //var cookie = $.cookie('vk_app_4703399');
    //if (cookie != null)
    //{
    //    $('#authBtn').fadeOut();
    //    VK.Auth.getLoginStatus(VKAuthInfo);
    //    loadTracks();
    //}
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