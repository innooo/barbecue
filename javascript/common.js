$(document).ready(function() {
	//****页面滚动 显示 / 隐藏 回到顶端按钮 ----开始 ******
	$(document).scroll(function() {
		var iScrollT = document.documentElement.scrollTop ||
			document.body.scrollTop,
			iClientT = document.documentElement.clientHeight;
		if(iScrollT > iClientT / 2) {
			$('.sidebar').find('input:last').stop().animate({
				opacity: 1
			}, 300);
		} else {
			$('.sidebar').find('input:last').stop().animate({
				opacity: 0
			}, 300);
		}
	});
	//****页面滚动 显示 / 隐藏 回到顶端按钮 ----结束 ******
});