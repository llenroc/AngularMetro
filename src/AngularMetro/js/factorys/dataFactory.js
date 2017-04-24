(function () {
    angular.module('MetronicApp').factory('dataFactory', function ($http, $q) {
        var factory = {};  
        factory.action = function (url, method, headers, params) {
            if (method=="") {
                method = "POST";
            }
            var u = "http://101.200.238.155:8080/";
            url = u + url;
            if (!headers) {
                headers = { 'Content-Type': 'application/json' };
            }
            var defer = $q.defer();  
            if (method == 'GET') {  
                $http({  
                    url: url,
                    method: "GET",  
                    headers: headers,  
                    params: params,  
                }).success(function (data) {  
                    defer.resolve(data);  
                }).  
                error(function (data, status, headers, config) {  
                    // defer.resolve(data);  
                    defer.reject(data);  
                });  
            } else {  
                $http({  
                    url: url,
                    method: method,  
                    headers: headers,  
                    data: params,  
                }).success(function (data) {  
                    defer.resolve(data);  
                }).  
                error(function (data, status, headers, config) {  
                    // defer.resolve(data);  
                    defer.reject(data);  
                });  
            }  
            return defer.promise;  
        };

        //factory.confirm = function (title, content, modalInstance) {
        //    var deferred = $q.defer();
        //    /*
        //    * modalInstance是在弹窗的基础上再弹出confirm确认框时从第一个弹窗中传进的$modalInstance,
        //    * 若是直接在页面上弹出confirm确认框，则不能传$modalInstance,否则会报错
        //    */
        //    var confirmModal = $modal.open({
        //        backdrop: 'static',
        //        templateUrl : 'template/modal/confirm.html',  // 指向确认框模板
        //        controller : 'ConfirmCtrl',// 初始化模态控制器
        //        windowClass: "confirmModal",// 自定义modal上级div的class
        //        size : 'sm', //大小配置
        //        resolve : {
        //            data : function(){
        //                return { modalTitle: title, modalContent: content };//surgeonSug: $scope.surgeonSug,
        //            }
        //        }
        //    });
        //    // 处理modal关闭后返回的数据
        //    confirmModal.result.then(function() {
        //        if(!!modalInstance) {
        //            modalInstance.dismiss('cancel');
        //        }
        //        deferred.resolve();
        //    },function(){
        //    });
        //    return deferred.promise;
        //}

        return factory;  
    }); 
})();

