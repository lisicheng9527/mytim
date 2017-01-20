var mytim = angular.module('mytim', ['ui.router']);

mytim.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when('','/html/tabbar/home');
	
	$stateProvider
	.state('tabbar',{
		url:'/html/tabbar',
		templateUrl:'html/tabbar.html',
	})
	.state('tabbar.home',{
		url:'/home',
		templateUrl:'html/home.html',
		controller:'homeCtrl'
	})
	.state('tabbar.shopping-cart',{
		url:'/shopping-cart',
		templateUrl:'html/shopping-cart.html',
		controller:'shoppingCtrl'
	})
	.state('tabbar.my-store',{
		url:'/my-store',
		templateUrl:'html/my-store.html',
		controller:'mineCtrl'
	})
	
	$stateProvider
	.state('classinfo',{
		url:'/classinfo',
		templateUrl:'html/classinfo.html',
		controller:'classInfo'
	});
}]);

mytim.controller('mainCtrl',['$rootScope','$scope','$location','$timeout',function($rootScope,$scope,$location,$timeout){
	$scope.info = {
		nowPage:'home',		//当前页
		selectCity:false,	//城市选择
		showLogin:false,	//登录
		closeApp:false,		//关闭打开APP工具栏
		showLoading:false,	//数据加载中
		categoryId:100129000,	//商品分类id
		showSearch:false	//显示搜索页面
	}
	
	
	$scope.message = {
		show:false,
		text:''
	}
	var timer = null;
	$scope.setMessage = function(txt){
		$timeout.cancel(timer);
		$scope.message.show = true;
		$scope.message.text = txt;
		timer = $timeout(function(){$scope.message.show = false;},2000);
	}
	
}]);