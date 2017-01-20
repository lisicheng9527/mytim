//轮播图自动播放
var slider = mui("#slider");
slider.slider({
	interval: 3000
});

//搜索栏背景渐变
(function(doc){
	var oTop = document.querySelector('.changeBg');
	if(doc.body.scrollTop>135){oTop.style.opacity=1;}
	doc.addEventListener('drag',function(){
		var opNum=document.body.scrollTop/135;
		if(opNum >1){opNum=0.85};
		oTop.style.opacity=opNum;
	});
	doc.addEventListener('scroll',function(){		
		var opNum=document.body.scrollTop/135;
		if(opNum >1){opNum=0.85};
		oTop.style.opacity=opNum;
	});
})(document);

//商品列表滑动加载
(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});
	var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="images/product.png"><div class="mui-media-body"><h4 class="product-name">吐鲁番 无核紫葡萄 80斤/件</h4><p class="mui-ellipsis">￥24.80元/斤</p><span class="old-price">￥24.80元/斤</span><p><img src="images/protected-icon.png" class="protect-icon" /></p></div><div class="arrival-date"><span class="mui-ellipsis">7月22号到货</span><p class="sell-out">已售<span class="mui-ellipsis">500</span>件</p></div></a></li></ul>';
	var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="images/product.png"><div class="mui-media-body"><h4 class="product-name">吐鲁番 无核紫葡萄 80斤/件</h4><p class="mui-ellipsis">￥24.80元/斤</p><span class="old-price">￥24.80元/斤</span><p><img src="images/protected-icon.png" class="protect-icon" /></p></div><div class="arrival-date"><span class="mui-ellipsis">7月22号到货</span><p class="sell-out">已售<span class="mui-ellipsis">500</span>件</p></div></a></li></ul>';
	var item2 = document.getElementById('item2mobile');
	var item3 = document.getElementById('item3mobile');
	document.getElementById('slider').addEventListener('slide', function(e) {
		if (e.detail.slideNumber === 1) {
			if (item2.querySelector('.mui-loading')) {
				setTimeout(function() {
					item2.querySelector('.mui-scroll').innerHTML = html2;
				}, 500);
			}
		} else if (e.detail.slideNumber === 2) {
			if (item3.querySelector('.mui-loading')) {
				setTimeout(function() {
					item3.querySelector('.mui-scroll').innerHTML = html3;
				}, 500);
			}
		}
	});
	var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
	$('.mui-input-group').on('change', 'input', function() {
		if (this.checked) {
			sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
			//force repaint
			sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
		}
	});
})(mui);