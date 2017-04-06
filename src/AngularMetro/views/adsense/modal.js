angular.module('MetronicApp').controller('views.adsense.modal',
    ['$scope', 'settings', '$uibModalInstance', function ($scope, settings, $uibModalInstance) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax();

    });
    var vm = this;
        // initialize core components
    vm.title = "我是要保存的内容";
        //保存
    vm.save = function (model) {
        $uibModalInstance.close(model);
    }
        //关闭
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}]);
