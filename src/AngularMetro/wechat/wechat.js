﻿$(function () {
    var wxopenid='' , key='' ;
    if (key == '') {
        var access_code = GetQueryString('code');
        if (wxopenid == '') {
            if (access_code == null) {
                var fromurl = location.href;
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae73861a343f7fd6&redirect_uri=http://gaoxq.efanyun.com/wechat/wechat.html&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
              //  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae73861a343f7fd6&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
                location.href = url;
            }
            else {
                $.ajax({
                    type: 'post',
                    url: 'http://101.200.238.155:8080/api/efan/getWxToken',
                    async: false,
                    cache: false,
                    data: { code: access_code },
                    dataType: 'json',
                    success: function (result) {
                        $("#openid").text(result.openid)
                    }
                });
            }
        } 

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    
    }
});