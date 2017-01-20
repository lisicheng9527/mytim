mytim.controller('classInfo',['$scope','$http','httpData','$timeout',function($scope,$http,httpData,$timeout){
	//alert($scope.info.categoryId);
	$scope.info.showLoading = true;
	$scope.loadTxt = '加载更多';
	$scope.sortType = {
		'source':['全部','基地直供','市场直供'],
		'sell':['综合排序','销量从低到高','销量从高到低'],
		'price':['综合排序','价格从低到高','价格从高到低']
	};
	$scope.sortCondition = {'r':0,'s':0,'p':0}		//条件筛选
	$scope.sortCheck = {'r':0,'s':0,'p':0}		//条件选中
	
	httpData.get('getProducts','data.filter.categoryId='+$scope.info.categoryId+'').then(function(result){
		if(result){

			$scope.products = result.products;
			$scope.currentPage = result.currentPage;
			$scope.pageNumber = result.pageNumber;
			$scope.pageSize = result.pageSize;
			
			//$scope.pageUrl = 'data.filter.categoryId='+$scope.info.categoryId+'&data.pageSize='+($scope.pageSize+10)+'&data.filter.source='+$scope.sortCondition.r+'&data.sort.strikePrice='+$scope.sortCondition.p+'&data.sort.soldCount='+$scope.sortCondition.s+'';
			
			if($scope.pageNumber == 0){$scope.setMessage('暂无数据，请稍后重试!');}
			
			$scope.sourceType = function(key){
				if(key==1){
					return '基地直供';
				}else if(key==2){
					return '市场直供';
				}else{
					return '其它';
				}
			}
			
			//mui.toast('数据加载完成');
			$scope.info.showLoading = false;
		}else{
			$scope.setMessage('请求超时,请重新刷新页面');
		}
	});

	//加载更多
	$scope.loadMore = function(){
		$scope.loadTxt = '加载中...';
		httpData.get('getProducts','data.filter.categoryId='+$scope.info.categoryId+'&data.pageSize='+($scope.pageSize+10)+'&data.filter.source='+$scope.sortCondition.r+'&data.sort.strikePrice='+$scope.sortCondition.p+'&data.sort.soldCount='+$scope.sortCondition.s+'').then(function(result){
			if(result){
				$scope.products = result.products;
				$scope.currentPage = result.currentPage;
				$scope.pageNumber = result.pageNumber;
				$scope.pageSize = result.pageSize;
				$scope.loadTxt = '加载更多';
			}else{
				$scope.setMessage('请求超时,请重新刷新页面');
			}
		});
	}
	
	//商品筛选排序
	$scope.sort = function(type,params){
		switch(type){
			case 'r':
				$scope.sortCheck.r = params;
				$scope.sortCondition.r = params;
				break;
			case 's':
				$scope.sortCheck.s = params;
				if(params > 1)params = -1;
				$scope.sortCondition.s = params;
				
				$scope.sortCondition.p = $scope.sortCheck.p = 0;		//价格条件还原
				break;
			default :
				$scope.sortCheck.p = params;
				if(params > 1)params = -1;
				$scope.sortCondition.p = params;
				
				$scope.sortCondition.s = $scope.sortCheck.s = 0;		//销量条件还原
		}
		$scope.info.showLoading = true;
		httpData.get('getProducts','data.filter.categoryId='+$scope.info.categoryId+'&data.pageSize='+$scope.pageSize+'&data.filter.source='+$scope.sortCondition.r+'&data.sort.strikePrice='+$scope.sortCondition.p+'&data.sort.soldCount='+$scope.sortCondition.s+'').then(function(result){
			if(result){
				$scope.products = result.products;
				$scope.currentPage = result.currentPage;
				$scope.pageNumber = result.pageNumber;
				$scope.pageSize = result.pageSize;
				
				$scope.info.showLoading = false;
			}else{
				$scope.setMessage('请求超时,请重新刷新页面');
			}
		});
		
		//关闭筛选框
		var backup = document.querySelector('.mui-backdrop');
		mui.trigger(backup,'tap');
	}
	
	$scope.back = function(){
		window.history.back();
	}
	
	
}]);