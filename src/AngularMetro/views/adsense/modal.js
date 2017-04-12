angular.module('MetronicApp').controller('views.adsense.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'FileUploader', 'dataFactory', '$qupload','$rootScope',
        function ($scope, settings, $uibModalInstance, model, fileUploader, dataFactory, $qupload, $rootScope) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.type = [{ id: 1, name: '视频' }, { id: 2, name: '图片' }]
            vm.url = "api/resource/add";
            if (model.id && model.id > 0) {
                vm.url = "api/resource/update";
                dataFactory.action("api/resource/detail", "", null, { id: model.id }).then(function (res) {
                    if (res.result == "1") {
                        vm.model = res.data;
                    }
                })
            }
            vm.token = "o_qxXubM6dRAw_VHd5UqDoaRsAZpB0kGeJeg9AQe:liJO7RwlFsS8vRQcoo7q-6yUvGg=:eyJzY29wZSI6InJlc291cmNlIiwiZGVhZGxpbmUiOjE0OTE5NzE4OTh9";
            var url = 'http://up-z1.qiniu.com/';
            vm.uploadresult = false;
            vm.save = function () {
                if (!vm.model.id&&(!vm.model.address||vm.model.address==undefined)) {
                    $rootScope.notify.show("请先上传资源", "warning");
                    return;
                }
                dataFactory.action(vm.url, "", null, vm.model).then(function (res) {
                    if (res.result == "1") {
                        $uibModalInstance.close();
                    } else {
                        $rootScope.notify.show("保存失败,请重试", "error");
                    }
                });
            };
            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
            vm.selectFiles = [];
            var start = function (index) {
                vm.selectFiles[index].progress = {
                    p: 0
                };
                vm.selectFiles[index].upload = $qupload.upload({
                    key: '',
                    file: vm.selectFiles[index].file,
                    token: 'o_qxXubM6dRAw_VHd5UqDoaRsAZpB0kGeJeg9AQe:zEJ20FGJGLaH58fgmsyaaTVsfkc=:eyJzY29wZSI6InJlc291cmNlIiwiZGVhZGxpbmUiOjE0OTE5NzgxNjF9'
                });
                vm.selectFiles[index].upload.then(function (response) {
                    //  vm.model.address = response.address;
                    vm.model.address ="http://oo9wxmbu7.bkt.clouddn.com/"+ response.key;
                    vm.uploadresult = true;
                }, function (response) {
                    alert(JSON.stringify(response));
                }, function (evt) {
                    // progress
                    vm.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
                });
            };

            vm.abort = function (index) {
                vm.selectFiles=[];
            };
            vm.onFileSelect = function ($files) {
                var offsetx = vm.selectFiles.length;
                for (var i = 0; i < $files.length; i++) {
                    vm.selectFiles[i + offsetx] = {
                        file: $files[i]
                    };
                    start(i + offsetx);
                }
            };
        }]);
