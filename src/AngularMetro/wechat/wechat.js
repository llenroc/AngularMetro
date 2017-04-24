$(function () {
    var wxopenid='' , key='' ;
    if (key == '') {
        var access_code = GetQueryString('code');
        if (wxopenid == '') {
            if (access_code == null) {
                var fromurl = location.href;
          //      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae73861a343f7fd6&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae73861a343f7fd6&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
                location.href = url;
            }
            else {
                $.ajax({
                    type: 'get',
                    url: ApiUrl + '/index.php?act=payment&op=getopenid',
                    async: false,
                    cache: false,
                    data: { code: access_code },
                    dataType: 'json',
                    success: function (result) {
                        if (result != null && result.hasOwnProperty('openid') && result.openid != "") {
                            addcookie('wxopenid', result.openid, 360000);
                            getlogininfo(result.openid);
                        }
                        else {
                            alert('微信身份识别失败 \n ' + result);
                            location.href = fromurl;
                        }
                    }
                });
            }
        } else {
            if (key == '' && wxopenid != '')
                getlogininfo(wxopenid);
        }

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        function getlogininfo(wxopenid) {
            $.ajax({
                type: 'get',
                url: ApiUrl + '/index.php?act=login&op=autologininfo',
                data: { wxopenid: wxopenid },
                dataType: 'json',
                async: false,
                cache: false,
                success: function (result) {
                    if (result.return_code == 'OK') {
                        addcookie('key', result.memberinfo.key);
                        addcookie('username', result.memberinfo.username);
                    } else {
                        alert(result.return_msg);
                        location.href = WapSiteUrl + '/tmpl/member/login.html';
                    }
                }
            });
        }
    }
});