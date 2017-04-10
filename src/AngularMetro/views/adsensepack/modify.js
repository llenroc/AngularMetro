(function () {
    angular.module('MetronicApp').controller('views.adsensepack.modify',
        ['$scope', 'settings', '$uibModal','$state','$stateParams',
        function ($scope, settings, $uibModal, $state, $stateParams) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });
        var vm = this;
        vm.packId = $stateParams.id;
        vm.date = {
            leftopen: false,
            rightopen: false,

            inlineOptions: {
                showWeeks: false
            },
            dateOptions: {
                //dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date(5000, 1, 1),
                minDate: new Date(1900, 1, 1),
                startingDay: 1
            },
            openleft: function () {
                vm.date.leftopen = !vm.date.leftopen;
            },
            openright: function () {
                vm.date.rightopen = !vm.date.rightopen;
            }
        }
        //页面属性
        vm.table = {
            data: [],               //数据集
            checkModel: {},         //选择的集合
            filter: "",//条件搜索
            pageConfig: {           //分页配置
                currentPage: 1,//当前页
                itemsPerPage: 10,//页容量
                totalItems: 0//总数据
            }
        }
        //获取用户数据集，并且添加配置项
        vm.init = function () {
            var page = vm.table.pageConfig.currentPage;
            var display = vm.table.pageConfig.itemsPerPage;

            vm.table.pageConfig.totalItems = 20;
            //  tite, description, isActive, creationTime
            vm.table.data = [{ title: "标题a", description: "描述", isActive: true, creationTime: new Date() },
            { title: "标题b", description: "描述b", isActive: false, creationTime: new Date() }];
            //activityService.getActivitys({
            //    skipCount: (page - 1) * display,
            //    maxResultCount: display, filter: vm.table.filter
            //}).success(function (result) {
            //    vm.table.pageConfig.totalItems = result.totalCount;
            //    vm.table.data = result.items;
            //    vm.table.pageConfig.onChange = function () {
            //        vm.init();
            //    }
            //}).finally(function () {
            //});
        };
        vm.init();
     
    }]);
})();

