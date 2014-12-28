// JavaScript source code
var app_id = 4703399;

$(document).ready(function () {
    var cookie = getCookie('vk_app_4703399');
    if(cookie != null)
        $('authBtn').hide();
});

VK.init({
    apiId: app_id
});

function authInfo(response) {
    //if (response.session) {
    //    alert('user: ' + response.session.mid);
    //} else {
    //    alert('not auth');
    //}
    $('p').text(response.session.mid).add("body");
}

function authClick() {
    VK.Auth.login(authInfo, 8);
}

//VK.Auth.getLoginStatus(authInfo);