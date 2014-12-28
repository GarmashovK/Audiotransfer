// JavaScript source code
var app_id = 4703399;
var user_id;

$(document).ready(function () {
    //$.cookie.json = true;
    var cookie = $.cookie('vk_app_4703399');
    if (cookie != null) {
        $('authBtn').fadeOut();
        alert(cookie.mid);
    }
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
    //$('p').text(response.session.mid).add("body");
    user_id = response.session.mid;
}

function authClick() {
    VK.Auth.login(authInfo, 8);
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
         ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


//VK.Auth.getLoginStatus(authInfo);