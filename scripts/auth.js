// JavaScript source code
$(document).ready(function () {
    VK.Auth.login(authInfo);
});
VK.init({
    apiId: 4703399
});

function authInfo(response) {
    //if (response.session) {
    //    alert('user: ' + response.session.mid);
    //} else {
    //    alert('not auth');
    //}
    $(p).text(response.session.mid).add("body");
}
//VK.Auth.getLoginStatus(authInfo);