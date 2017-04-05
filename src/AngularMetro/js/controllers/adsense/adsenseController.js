/* Setup blank page controller */
angular.module('MetronicApp').controller('adsenseController', ['$rootScope', '$scope', 'settings', function ($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function () {
        var vm = this;
        // initialize core components
        App.initAjax();
    });
}]);
