
(function () {
    angular.module('MetronicApp').controller('views.advertisingrecord.index', ['$scope', 'settings', "dataFactory", '$rootScope',
        function ($scope, settings, dataFactory,$rootScope) {
            // ajax初始化
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
           
            });
            var vm = this;
            vm.filter = {};
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
                pageConfig: {           //分页配置
                    currentPage: 1,//当前页
                    itemsPerPage: 10,//页容量
                    totalItems: 0//总数据
                }
            }
            //获取用户数据集，并且添加配置项
            vm.init = function () {
                vm.filter.pageNum = vm.table.pageConfig.currentPage;
                vm.filter.pageSize = vm.table.pageConfig.itemsPerPage;
                dataFactory.action("api/distribution/selectRecords", "", null, vm.filter)
                    .then(function (res) {
                        if (res.result == "1") {
                            vm.table.pageConfig.totalItems = res.total;
                            vm.table.data = res.list;
                            vm.table.pageConfig.onChange = function () {
                                vm.init();
                            }
                        }
                    });
            };
            vm.init();
            //下线
            vm.offline = function () {
                var id = Object.getOwnPropertyNames(vm.table.checkModel);
                if (id.length <=0) {
                    $rootScope.notify.show("请选择一个操作对象", "warning");
                    return;
                }
                dataFactory.action("api/resource/updateState", "", null, { list: ids, state: 1 }).then(function (res) {
                    $rootScope.notify.show("下线成功", "success");
                    vm.init();
                });
            }
            //重新发放
            vm.distribute = function () {
                var id = Object.getOwnPropertyNames(vm.table.checkModel);
                if (id.length <= 0) {
                    $rootScope.notify.show("请选择一个操作对象", "warning");
                    return;
                }
                dataFactory.action("api/resource/updateState", "", null, { list: ids, state: 1 }).then(function (res) {
                    $rootScope.notify.show("发放成功", "success");
                    vm.init();
                });
            }
        }])
})();