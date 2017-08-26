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
	//购物车按钮
	$('#cart').click(function(){
		window.location.href = '../html/cart.html';
	});
	//登录注册按钮
	$('#search-btn~a').eq(0).click(function(){
		window.location.href = '../html/login.html';
	})
	$('#search-btn~a').eq(1).click(function(){
		window.location.href = '../html/register.html';
	})
	//logo 按钮
	$('#header-logo').click(function(){
		window.location.href = '../index.html';
	});
});

function getCookie(name){
	var cookie = document.cookie;
	cookie = cookie.split('; ');
	for(var i = 0;i < cookie.length;i++){
		var temp = cookie[i].split('=');
		if(temp[0] == name){
			return decodeURIComponent(temp[1]);
		}
	}
}
function setCookie(name,value,day,path){
	var date = new Date();
	date = date.setDate(date.getDate() + day);
	document.cookie = `${name}=${encodeURIComponent(value)};expires=${date};path=${path}`;
}
function removeCookie(name){
	document.cookie = name + ';expires=-1;path=/';
}
