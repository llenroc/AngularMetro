angular.module('MetronicApp').controller('views.scale.modal',
    ['$scope', 'settings', '$uibModalInstance', 'model', 'dataFactory',
        function ($scope, settings, $uibModalInstance, model, dataFactory) {
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();

            });
            var vm = this;
            vm.model = model;
            vm.changea = function () {
                if (vm.model.wxthirdScale||vm.model.wxthirdScale>=0) {
                    vm.model.wxScale = 100 - vm.model.wxthirdScale;

                    return; 
                }
              
            }
            vm.changeb = function () {
                if (vm.model.alithirdScale||vm.model.alithirdScale>=0) {
                    vm.model.aliScale = 100 - vm.model.alithirdScale;

                    return;
                }
            }
            vm.save = function () {
                if (!vm.model.list && (!vm.model.wxAccount || !vm.model.aliAccount)) {
                    abp.notify.warn("请输入要绑定的账号");
                    return;
                }
		if(vm.model.wxScale+vm.model.wxthirdScale>100){
  abp.notify.warn("微信比例错误");
                    return;
}
		if(vm.model.aliScale +vm.model.alithirdScale>100){
  abp.notify.warn("支付宝比例错误");
                    return;
}
                dataFactory.action('api/product/setScale', "", null, vm.model).then(function (res) {
                    if (res.result == "1") {
                        $uibModalInstance.close();
                    } else {
                        abp.notify.error("保存失败,请重试");
                    }
                });
            };
            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

        }]);