mytim.controller('homeCtrl',['$rootScope','$scope','$timeout','$http','httpData',function($rootScope,$scope,$timeout,$http,httpData){
	$scope.info.nowPage = 'home';
	$scope.info.showLoading = true;

   	$scope.shortUrl = function(url){
   		return url.indexOf('https') !=-1 ? url.replace(/https/g,'http') : url;
   	}
   	httpData.get('index').then(function(result){
   		if(result){
	   		//console.log(result);
	   		$scope.homeData = result;
	   		
	   		//banner信息
	   		$scope.banner = $scope.homeData.banners;
	   		
	   		//商品类型
			$scope.goodsType = $scope.homeData.categories;
			
			//城市名称
			$scope.cityName = $scope.homeData.cityName;
			
			//实力供应	0才是实力供应  1是基地直供
			$scope.floorsBanner = $scope.homeData.floors[1].banner; 	//楼层banner
			$scope.supply = $scope.homeData.floors[1].items;
			
			//底部数据切换
			$scope.now = 0;		//默认显示第一条
			$scope.baseInfo = $scope.homeData.floors;
			$scope.baseSupply = $scope.baseInfo[$scope.now].items;
			
			$scope.changeSupply = function(index){
				$scope.now = index;
				$scope.baseSupply = $scope.baseInfo[index].items;
			}
			
			$scope.info.showLoading = false;
			
			//轮播图自动播放
			mui('#slider').slider({
				interval: 3000
			});
		
			//设置首页搜索背景渐变
			var oTop = document.querySelector('.changeBg');
			if(document.body.scrollTop>135){oTop.style.opacity=1;}
			document.addEventListener('drag',function(){
				var opNum=document.body.scrollTop/135;
				if(opNum >1){opNum=0.85};
				oTop.style.opacity=opNum;
			});
			document.addEventListener('scroll',function(){		
				var opNum=document.body.scrollTop/135;
				if(opNum >1){opNum=0.85};
				oTop.style.opacity=opNum;
			});
		
			//设置商品类型缩略图高度
			var setTypeImg = function(){
				if($scope.info.nowPage == 'home'){
					var menuList = document.getElementById('menu-list').getElementsByTagName('li'),typeImgHeight = document.getElementById('typeImg').offsetHeight;
					for(var i=0;i<menuList.length-1;i++){
						menuList[i].getElementsByTagName('img')[0].style.height = typeImgHeight+'px';
					}
				}
			}
			setTypeImg();
			window.addEventListener('resize',setTypeImg,false);
		
			//设置城市列表滚定高度
			var list = document.getElementById('list');
			//calc hieght
			list.style.height = document.body.offsetHeight-44 + 'px';
			//create
			window.indexedList = new mui.IndexedList(list);
		
   		}else{
   			mui.toast('请重新刷新页面');
   		}
   	});
}]);