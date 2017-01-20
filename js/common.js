//数据请求
mytim.factory('httpData',['$http','$q','$timeout',function($http,$q,$timeout){
	return {
		get:function(reqName,params){
			//设置时间戳
			function getNowFormatDate() {
				var datetime = new Date();
				var year = datetime.getFullYear();
				var month = datetime.getMonth()+1; 
				var date = datetime.getDate(); 
				var hour = datetime.getHours(); 
				var minutes = datetime.getMinutes(); 
				var second = datetime.getSeconds();

				if(month<10){
					month = "0" + month;
				}
				if(date<10){
					date = "0" + date;
				}
				if(hour <10){
					hour = "0" + hour;
				}
				if(minutes <10){
					minutes = "0" + minutes;
				}
				if(second <10){
					second = "0" + second ;
				}
				return year.toString()+month.toString()+date.toString()+hour.toString()+minutes.toString()+second.toString(); 
			}
			//设置请求唯一标识
			function getUuid(){
				var len=32;//32长度
				var radix=16;//16进制
				var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
				return uuid.join('');
			}
			var reqParams = params || '';

			var url = 'https://api.mytim.cn/era.agent?i='+getUuid()+'&v=0.0.1&a=4&d=wap&s='+getNowFormatDate()+'&m='+reqName+'&'+reqParams+'';
			//var json = 'http://192.168.0.57:8020/%E5%86%9C%E5%8D%96%E9%80%9A/data/index.json';
			var deferred = $q.defer(),timeclear = true;
			var tests = function(){
				$http.get(url).then(function(res){
					var dataList = res.data;
					if(dataList.code || dataList.code == 0){
						deferred.resolve(dataList.data);
						timeclear = false;
					}else{
						mui.toast(dataList.code+':'+dataList.msg);
					}
				});
				
				if(timeclear){$timeout(function(){tests();},3000);} //3秒自动重连
			}
			tests();
			return deferred.promise;
		}
	}
}]);

//购物车
mytim.factory('shopCar',[function(){
	return {
		add:function(userid,obj){
			var data = JSON.parse(localStorage.getItem('shopCarInfo'));
			
			if(data === null){data={};}
			
			if(data[userid] === undefined){
				data[userid]=[];
			}else{
				for(var i=0;i<data[userid].length;i++){
					if(data[userid][i].id == obj.productId){
						data[userid].count += 1;
						localStorage.setItem('shopCarInfo',JSON.stringify(data));
					}
				}
			}
			
			var product = {
				id : obj.productId,
				productName : obj.productName,
				images : obj.thumbnail,
				price : obj.strikePrice,
				storeName : obj.shopName
			}
			
		}
	}
}]);

mytim.directive('city',function(){
	return {
		restrict:'E',
		templateUrl:'html/directive/city.html',
		replace:false
	}
}).directive('login',function(){
	return {
		restrict:'E',
		templateUrl:'html/directive/login.html',
		replace:false
	}
}).directive('search',function(){
	return {
		restrict:'E',
		templateUrl:'html/directive/search.html',
		replace:false
	}
});