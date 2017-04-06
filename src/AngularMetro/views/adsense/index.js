
/* Setup blank page controller */
angular.module('MetronicApp').controller('views.adsense.index', ['$rootScope', '$scope', 'settings','$uibModal',

    function ($rootScope, $scope, settings, $uibModal) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax();
    });
    var vm = this;
    vm.add = function () {
        var modal = $uibModal.open({
            templateUrl: '/views/adsense/modal.html',
            controller: 'views.adsense.modal as vm',
            backdrop: 'static',
            //resolve: {
            //    activity: function () { return activityid; },
            //}
        });
        modal.result.then(function (response) {
          //  vm.getactivitys();
        })
    }
}]);
