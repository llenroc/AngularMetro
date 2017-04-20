(function () {
    angular.module('MetronicApp').controller('views.scale.index',
        ['$scope', 'settings', "$stateParams", '$state', '$rootScope', 'dataFactory', '$uibModal',
        function ($scope, settings, $stateParams, $state, $rootScope, dataFactory, $uibModal) {
            // ajax初始化
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });
            var vm = this;
            vm.option = false;
            vm.model = { name: "xxxx商贸有限责任公司", wechat: "123xxx789", pay: "123xxx789" };
            vm.show = function () {
                vm.option = !vm.option;
            }

            ///机构树
            vm.organizationTree = {
                $tree: null,
                unitCount: 0,
                setUnitCount: function (unitCount) {
                    $scope.safeApply(function () {
                        vm.organizationTree.unitCount = unitCount;
                    });
                },
                refreshUnitCount: function () {
                    vm.organizationTree.setUnitCount(vm.organizationTree.$tree.jstree('get_json').length);
                },
                selectedOu: {
                    id: null,
                    displayName: null,
                    code: null,
                    set: function (ouInTree) {
                        if (!ouInTree) {
                            vm.organizationTree.selectedOu.id = null;
                            vm.organizationTree.selectedOu.displayName = null;
                            vm.organizationTree.selectedOu.code = null;
                            vm.organizationTree.selectedOu.type = 1;
                        } else {
                            vm.organizationTree.selectedOu.id = ouInTree.id;
                            vm.organizationTree.selectedOu.displayName = ouInTree.original.displayName;
                            vm.organizationTree.selectedOu.code = ouInTree.original.code;
                            vm.organizationTree.selectedOu.type = ouInTree.original.type;
                        }
                        if (vm.organizationTree.selectedOu.id == null) {
                            return;
                        }
                        // vm.init();
                        $("a.list-group-item:first-child").css("background-color", "transparent");
                    }
                },


                generateTextOnTree: function (ou) {
                    var displayName = ou.name;
                    displayName = displayName.length > 10 ? (displayName.substring(0, 10) + "...") : displayName;
                    var itemClass = ' ou-text-no-members';
                    return '<span  class="ou-text' + itemClass + '" data-ou-id="' + ou.id + '">' + displayName + '  <i class="fa fa-caret-down text-muted"></i></span>';
                },
                incrementMemberCount: function (ouId, incrementAmount) {
                    var treeNode = vm.organizationTree.$tree.jstree('get_node', ouId);
                    treeNode.original.memberCount = treeNode.original.memberCount + incrementAmount;
                    vm.organizationTree.$tree.jstree('rename_node',
                        treeNode,
                        vm.organizationTree.generateTextOnTree(treeNode.original));
                },
                getTreeDataFromServer: function (callback, type) {
                    var list = [];
                    dataFactory.action("api/efan/getOrgList?orgId=1", "", null, {}).then(function (res) {
                        list = res.respBody;
                        list.push({ id: 1, name: "易饭科技", parent_id: 0 });
                        var treeData = _.map(list, function (item) {
                            return {
                                id: item.id,
                                parent: item.parent_id ? item.parent_id : '#',
                                displayName: item.name,
                                text: vm.organizationTree.generateTextOnTree(item),
                                state: {
                                    opened: item.parent_id <= 0 ? true : false
                                }
                            };
                        });
                        callback(treeData);
                    });
                    //var list = [
                    //    { id: 1, parentId: 0, displayName: "A机构" },
                    //    { id: 2, parentId: 1, displayName: "A子机构" },
                    //    { id: 3, parentId: 0, displayName: "B机构" },
                    //    { id: 4, parentId: 3, displayName: "B子机构" },
                    //];



                },
                init: function (type) {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);
                        vm.organizationTree.$tree = $('#OrganizationUnitEditTree');
                        var jsTreePlugins = [
                            'types',
                          //  'contextmenu',
                            'wholerow',
                            'sort'
                        ];

                        vm.organizationTree.$tree
                            .on('changed.jstree', function (e, data) {
                                $scope.safeApply(function () {
                                    if (data.selected.length != 1) {
                                        vm.organizationTree.selectedOu.set(null);
                                    } else {
                                        var selectedNode = data.instance.get_node(data.selected[0]);
                                        vm.organizationTree.selectedOu.set(selectedNode);
                                    }
                                });

                            })
                            .on('move_node.jstree', function (e, data) {

                                if (!vm.permissions.manageOrganizationTree) {
                                    vm.organizationTree.$tree.jstree('refresh'); //rollback
                                    return;
                                }

                                var parentNodeName = (!data.parent || data.parent == '#')
                                    ? app.localize('Root')
                                    : vm.organizationTree.$tree.jstree('get_node', data.parent).original.displayName;

                                abp.message.confirm(
                                    app.localize('OrganizationUnitMoveConfirmMessage', data.node.original.displayName, parentNodeName),
                                    function (isConfirmed) {
                                        if (isConfirmed) {
                                            organizationUnitService.moveOrganizationUnit({
                                                id: data.node.id,
                                                newParentId: data.parent
                                            }).success(function () {
                                                abp.notify.success('机构调整成功');
                                                vm.organizationTree.reload();
                                            }).catch(function (err) {
                                                vm.organizationTree.$tree.jstree('refresh'); //rollback
                                                setTimeout(function () { abp.message.error(err.data.message); }, 500);
                                            });
                                        } else {
                                            vm.organizationTree.$tree.jstree('refresh'); //rollback
                                        }
                                    }
                                );
                            })

                            .jstree({
                                'core': {
                                    data: treeData,
                                    multiple: false,
                                    check_callback: function (operation, node, node_parent, node_position, more) {
                                        return true;
                                    }
                                },
                                types: {
                                    "default": {
                                        "icon": "fa"
                                    },
                                    "file": {
                                        "icon": "fa"
                                    }
                                },
                                contextmenu: {
                                    items: vm.organizationTree.contextMenu
                                },
                                sort: function (node1, node2) {
                                    var left = this.get_node(node2).original.displayName;
                                    var right = this.get_node(node1).original.displayName;
                                    if (!left.localeCompare(right)) {
                                        return 1;
                                    }
                                    return -1;
                                },
                                plugins: jsTreePlugins
                            });

                        vm.organizationTree.$tree.on('click', '.ou-text .fa-caret-down', function (e) {
                            e.preventDefault();

                            var ouId = $(this).closest('.ou-text').attr('data-ou-id');
                            setTimeout(function () {
                                vm.organizationTree.$tree.jstree('show_contextmenu', ouId);
                            }, 100);
                        });
                    }, type);
                },
                reload: function () {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);
                        vm.organizationTree.$tree.jstree(true).settings.core.data = treeData;
                        vm.organizationTree.$tree.jstree('refresh');
                    }, 1);
                }
            };
            vm.organizationTree.init();
        }])
})();