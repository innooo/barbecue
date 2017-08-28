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
	cartGoodsCount();
	//左侧边栏鼠标划过出现二级菜单
	$('nav li').eq(1).hover(function(e){
		e.stopPropagation();
		$('.hidenav').show(300);
	},function(e){
		e.stopPropagation();
		$('.hidenav').hide(300);
	});
	$('.sidebar a').eq(1).hover(function(){
		$('.sidebar-panel').show().stop().animate({'left':'-245px','opacity':'1'})
		.find('div').show();
		
	},function(){
		$('.sidebar-panel').stop().animate({'left':'-350px','opacity':'0'},function(){
			$(this).hide();
		});
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
function setCookie
(name/*cookie名称*/,value/*cookie值*/,day/*cookie失效期限*/,path/*cookie作用路径*/)
{
    //获取当前日期用于后面cookie的过期时间
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
//  console.log(oDate);
    document.cookie
        = name + '=' + encodeURIComponent(value) +
          ';expires=' + oDate +
          ';path=' + path;
}

function removeCookie(name){
	document.cookie = name + ';expires=-1;path=/';
}
function cartGoodsCount(){
	//购物车图标显示购物车商品数量
	var cookie = getCookie('cart');
	var goodsCount = 0;
	if(cookie){
		cookie = JSON.parse(cookie);
		for(var i = 0;i < cookie.length;i++){
			goodsCount += cookie[i].count;
		}
		$('#cart em').html(goodsCount);
	}
}
