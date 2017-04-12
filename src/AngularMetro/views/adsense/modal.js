angular.module('MetronicApp').controller('views.adsense.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'FileUploader','dataFactory',
        function ($scope, settings, $uibModalInstance, model, fileUploader, dataFactory) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.type = [{ id: 1, name: '视频' }, {id:2,name:'图片'}]
            vm.url = "api/resource/add";
            if (model.id&&model.id>0) {
                vm.url = "api/resource/update";
                dataFactory.action("api/resource/detail", "", null, { id: model.id }).then(function (res) {
                    if (res.result == "1") {
                        vm.model = res.data;
                    }
                })

            }
            var url = 'http://101.200.238.155:8080/Profile/UploadProfilePicture';

            vm.uploader = new fileUploader({
                url: url,
                queueLimit: 1,
                filters: [{
                    name: 'imageFilter',
                    fn: function (item, options) {
                        //File type check
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        if ('|jpg|jpeg|png|'.indexOf(type) === -1) {
                            alert("上传仅支持图片或视频格式");
                            return false;
                        }
                        //File size check
                        if (item.size > 30720000) //30m
                        {
                            vm.error = true;
                            alert("请上传300k以下大小的图像");
                            return false;
                        }
                        return true;
                    }
                }]
            });

            vm.save = function () {
                if (vm.uploader.queue.length == 0) {
                      vm.model.address = "http://www.baidu.com/movie.avi";
                vm.model.state = vm.model.state ? 1 : 0;
                    dataFactory.action(vm.url, "", null, vm.model).then(function (res) {
                        if (res.result == "1") {
                            $uibModalInstance.close();
                        }
                    });
                } else {
                    vm.uploader.uploadAll();

                }
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
              //  vm.model.address = response.address;
                vm.model.address = "http://www.baidu.com/movie.avi";
                vm.model.state = vm.model.state ? 1 : 0;
                dataFactory.action(url, "", null, vm.model).then(function (res) {
                    if (res.result == "1") {
                        $uibModalInstance.close();
                    }
                });
                //if (response.result==1) {
                   
                //} else {
                //    return;
                //}
            };



            vm.up = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                uptoken_url: 'http://101.200.238.155:8080/api/qiniu/token',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
                //    // do something
                //    return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: 'ohr1coqtq.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
                container: 'con',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '100mb',             // 最大文件体积限制
                flash_swf_url: 'Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
             //   drop_element: 'con',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '0mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传

                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {
                        // 每个文件上传成功后，处理相关的事情
                        // 其中info是文件上传成功后，服务端返回的json，形式如：
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 查看简单反馈
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后，处理相关的事情
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在unique_names: false，save_key: false时才生效
                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            });
            // domain为七牛空间对应的域名，选择某个空间后，可通过 空间设置->基本设置->域名设置 查看获取
            // uploader为一个plupload对象，继承了所有plupload的方法

        }]);
