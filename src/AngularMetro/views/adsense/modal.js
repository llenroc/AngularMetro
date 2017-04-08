angular.module('MetronicApp').controller('views.adsense.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'FileUploader','dataFactory',
        function ($scope, settings, $uibModalInstance, model, fileUploader, dataFactory) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.url = "api/resource/add";
            if (model.id&&model.id>0) {
                vm.url = "api/resource/update";
                dataFactory.action("api/resourse/detail", "", null, { id: model.id }).then(function (res) {
                    if (res.result=="1") {
                        vm.model = res.model;
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
                if (vm.uploader.queue.length==0) {
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

        }]);
