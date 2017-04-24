angular.module('MetronicApp').controller('views.scale.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'dataFactory','$rootScope',
        function ($scope, settings, $uibModalInstance, model, dataFactory, $rootScope) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.model = model;
            vm.save = function () {
                if (!vm.model.list && (!vm.model.wxAccount || !vm.model.aliAccount)) {
                    $rootScope.notify.show("请输入要绑定的账号", "warning");
                    return;
                }
                dataFactory.action('api/orgsetting/bindOrgAccount', "", null, vm.model).then(function (res) {
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

        }]);
