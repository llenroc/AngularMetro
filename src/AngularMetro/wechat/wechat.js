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
                    url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxae73861a343f7fd6&secret=8b2fbb7b931ab6830626e65b2586b74a&code=' + access_code +
                        '&grant_type=authorization_code',
                    async: false,
                    cache: false,
                  //  data: { code: access_code },
                    dataType: 'json',
                    success: function (result) {
                        $("#openId").text(result.openid)
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