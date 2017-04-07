(function () {
    angular.module('MetronicApp').controller('views.adsense.index', ['$scope', 'settings', '$uibModal',
        function ($scope, settings, $uibModal) {
            // ajax初始化
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });
            var vm = this;
            vm.date = {
                leftopen: false,
                rightopen: false,
                //left: new Date(),
                //right:new date(),
                inlineOptions: {
                    // customClass: getDayClass,
                    // minDate: new Date(),
                    showWeeks: false
                },
                dateOptions: {
                    //dateDisabled: disabled,
                    formatYear: 'yyyy',
                    maxDate: new Date(2020, 1, 1),
                    minDate: new Date(1900, 1, 1),
                    startingDay: 1
                },
                openleft: function () {
                    vm.date.leftopen = !vm.date.leftopen;
                    // $scope.popup2.opened = !$scope.popup2.opened;
                },
                openright: function () {
                    vm.date.rightopen = !vm.date.rightopen;
                    // $scope.popup2.opened = !$scope.popup2.opened;
                }
            }

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
        }])
})();

