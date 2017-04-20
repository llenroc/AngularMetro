var Login = function() {

    var handleLogin = function() {
        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    var url = "http://101.200.238.155:8080/api/efan/login";
                    var username = $("#username").val();
                    var password = $("#password").val();
                    var md5pw = md5(password);
                    var data = { "user_name": username, "pw": md5pw };
                    $.ajax({
                        type: "Post",
                        url: url,
                        data: data,
                        async: false,
                        dataType: "json",
                        success: function (res) {
                            if (res.code == 200) {
                                var val = { username: res.user_name, orgid: res.org_id, orgName: res.org_name };
                                var temp = JSON.stringify(val);
                                $.cookie("metroResult", temp, {
                                    expires: 1,//有效日期
                                    path: "/",//cookie的路 径
                                    secure: false //true,cookie的传输会要求一个安全协议,否则反之
                                });
                                window.location.href = "/views/layout/layout.html";
                            }
                        }
                    });
                }
                return false;
            }
        });
        $("#btn").click(function () {
            //var val = { username: '王中王', orgid: 1, orgName: 'abc' };
            //var temp = JSON.stringify(val);
            //$.cookie("metroResult", temp, {
            //    expires: 1,//有效日期
            //    path: "/",//cookie的路 径
            //    secure: false //true,cookie的传输会要求一个安全协议,否则反之
            //});

            if ($('.login-form').validate().form()) {
                var url = "http://101.200.238.155:8080/api/efan/login";
                var username = $("#username").val();
                var password = $("#password").val();
                var md5pw=md5(password);
                var data = { "userName": username, "pw": md5pw };

                $.ajax({
                    type: "Post",
                    url: url,
                    data: data,
                    async: false,
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            var val = { username: res.user_name, orgid: res.org_id, orgName: res.org_name };
                            var temp = JSON.stringify(val);
                            $.cookie("metroResult", temp, {
                                expires: 1,//有效日期
                                path: "/",//cookie的路 径
                                secure: false //true,cookie的传输会要求一个安全协议,否则反之
                            });
                            window.location.href = "/views/layout/layout.html";
                        }
                    }
                });
            }
        })
    }



    return {
        //main function to initiate the module
        init: function () {
            var cookie = $.cookie("metroResult");
            if (cookie != "" && cookie != undefined) {
                window.location.href = "/views/layout/layout.html";
            }
            handleLogin();
        }
    };
}();

jQuery(document).ready(function() {
    Login.init();
});