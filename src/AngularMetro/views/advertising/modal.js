angular.module('MetronicApp').controller('views.advertising.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'dataFactory','$rootScope',
        function ($scope, settings, $uibModalInstance, model, dataFactory,$rootScope) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.model = model;
            vm.save = function () {
                if (!vm.model.atonce) {
                    if (!vm.model.startTime || !vm.model.endTime) {
                        $rootScope.notify.show("请选择分发时间段", "error");
                        return;
                    }
                }
                dataFactory.action("api/distribution/add", "", null, vm.model).then(function (res) {
                    if (res.result == "1") {
                        $rootScope.notify.show("分发成功", "success");
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
