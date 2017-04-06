﻿/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

//懒加载
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//控制器全局设置
MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

//全局工厂设置
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: false, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '/assets',
        globalPath: '/assets/global',
        layoutPath: '/assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

//app控制器
MetronicApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);
/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    var vm = this;

    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
    vm.list = [
    
      //广告资源管理
      { url: "adsense", title: "广告资源管理", icon: "icon-home" },
      { url: "adsensepack", title: "广告资源包", icon: "icon-home" },
      { url: "advertising", title: "广告投放", icon: "icon-home" },
      { url: "advertisingrecord", title: "广告发放记录", icon: "icon-home" },
     
    ];

}]);
/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

//路由设置
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/adsense.html");

    $stateProvider
        //广告资源管理
        .state("adsense", {
            url: "/adsense.html",
            templateUrl: "/views/adsense/adsense.html",
            data: { pageTitle: '广告资源管理' },
            controller: "adsenseController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
                            '/js/controllers/adsense/adsenseController.js'
                        ]
                    });
                }]
            }
        })
         //广告资源包管理
        .state("adsensepack", {
            url: "/adsensepack.html",
            templateUrl: "/views/adsensepack/adsensepack.html",
            data: { pageTitle: '广告资源包管理' },
            controller: "adsensepackController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/adsensepack/adsensepackController.js'
                        ]
                    });
                }]
            }
        })
           //广告投放管理
        .state("advertising", {
            url: "/advertising.html",
            templateUrl: "/views/advertising/advertising.html",
            data: { pageTitle: '广告投放管理' },
            controller: "advertisingController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/advertising/advertisingController.js'
                        ]
                    });
                }]
            }
        })
             //广告投放记录管理
        .state("advertisingrecord", {
            url: "/advertisingrecord.html",
            templateUrl: "/views/advertisingrecord/advertisingrecord.html",
            data: { pageTitle: '广告投放记录管理' },
            controller: "advertisingrecordController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
                            '/js/controllers/advertisingrecord/advertisingrecordController.js'
                        ]
                    });
                }]
            }
        })

}]);

//启动
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);