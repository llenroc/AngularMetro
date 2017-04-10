(function () {
    angular.module('MetronicApp').controller('views.adsensepack.modify',
        ['$scope', 'settings', '$uibModal','$state','$stateParams','dataFactory',
        function ($scope, settings, $uibModal, $state, $stateParams, dataFactory) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });
        var vm = this;
        vm.filter = {};
        vm.pack = {};
        vm.packId = $stateParams.id;
        if (vm.packId) {
            dataFactory.action("api/package/detail", "", null, vm.packId)
              .then(function (res) {
                  if (res.result == "1") {
                      vm.pack = res.model;
                  }
              });
        }
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
            vm.filter.pageNum = vm.table.pageConfig.currentPage;
            vm.filter.pageSize = vm.table.pageConfig.itemsPerPage;
            dataFactory.action("api/resource/selectPublish", "", null, vm.filter)
                .then(function (res) {
                    if (res.result == "1") {
                        vm.table.pageConfig.totalItems = res.total;
                        vm.table.data = res.list;
                        angular.forEach(vm.table.data,function (row, index) {
                            if ($.inArray(row.id, vm.pack.resourceIds)!=-1) {
                                row.checked = true;
                            }
                        });
                        vm.table.pageConfig.onChange = function () {
                            vm.init();
                        }
                    }
                });
        };
        vm.init();
        vm.cancel = function () {
            $state.go("adsensepack");
        }
            //保存
        vm.save = function () {
            var ids = Object.getOwnPropertyNames(vm.table.checkModel);
            if (ids.length <=0) {
                alert("请选择资源");
                return;
            }
            dataFactory.action("api/package/add", "", null, vm.pack).then(function (res) {
                if (res.result=="1") {
                    $state.go("adsensepack");
                } else {
                    alert(res.errorMsg);
                }
            })
        }
            //添加广告
        vm.addadsense = function () {
            var modal = $uibModal.open({
                templateUrl: '/views/adsensepack/modal.html',
                controller: 'views.adsensepack.modal as vm',
                backdrop: 'static',
                size: 'lg',//模态框的大小尺寸
                //resolve: {
                //    model: function () { return { id: id[0] } },
                //}
            });
            modal.result.then(function (response) {
                vm.init();
            })
        }
    }]);
})();

