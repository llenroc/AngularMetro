﻿(function () {
    angular.module('MetronicApp').factory('dataFactory', function ($http, $q){  
        var factory = {};  
        factory.getresults = function (url, method, headers, params) {
            var u = "http://www.baidu.com";
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
        return factory;  
    }); 
})();

