$(document).ready(function() {
	var alreadyLoad = 0;
	var clickCount = 0;
	var productListLength = 16;
	function loading(data,_this) {
		$(_this).empty();
		if($(data)[alreadyLoad]) {
			var html = `<div>
						<img src='${$(data)[alreadyLoad].imgURL}' />
						</div>
						<figcaption>
							${$(data)[alreadyLoad].instruction}
						</figcaption>
						<span>
							${$(data)[alreadyLoad].price}
						</span>`;
			$(_this).html(html).attr('goodsID',$(data)[alreadyLoad].id);
			alreadyLoad++;
		}
	}
	function doAjax(fnSuc){
		$.ajax({
			type: 'GET',
			url: '../../dist/json/list_page.json',
			data: {},
			timeout: 10000,
			beforeSend: function() {},
			dataType: 'JSON',
			success: fnSuc,
			error: function() {
				console.log('request error')
			},
			complete: function() {},
			global: true
		});
	}
	doAjax(loadList);

	function loadList(data) {
		$('.product-list-wrap figure').each(function(index) {
			loading(data,this);
		});
	}
	//为下一页按钮 绑定事件 ----- 开始
	$('#next-page').click(function() {
		clickCount++;
		var length = $('.product-list-links a:not(#next-page)').length;
		if(clickCount > length - 1) {
			clickCount = length - 1;
		}
		$('.product-list-links a:not(#next-page)').eq(clickCount).addClass('now')
			.siblings().removeClass('now');
		doAjax(next);
		function next(data) {
			//点击下一页按钮后判断已经加载的数据是否小于总数据,如果小于则进行下一步动作,如果不 do nothing
			if(alreadyLoad < $(data).length - 1) {
				$('.product-list-wrap figure').each(function() {
					loading(data,this);
				});
			}
		}

	});
	//为下一页按钮 绑定事件 ----- 开始

	//为每一个页码按钮添加点击事件 ------ 开始
	$('.product-list-links a:not(#next-page)').click(function(e) {
		var index = $(this).index();
		$(this).addClass('now').siblings().removeClass('now');
		alreadyLoad = index * productListLength;
		doAjax(jumpToPage);
		function jumpToPage(data) {
			//点击下一页按钮后判断已经加载的数据是否小于总数据,如果小于则进行下一步动作,如果不 do nothing
			if(alreadyLoad < $(data).length - 1) {
				$('.product-list-wrap figure').each(function() {
					loading(data,this);
				});
			}
		}
	});

	//为每一个页码按钮添加点击事件 ------ 结束
	
	//为每一个商品添加点击事件,跳转到对应详情页 ------开始
	$('.product-list-wrap figure').click(function(e) {
		//写入cookie
		var goodsID = $(this).attr('goodsID');
		setCookie('goodsID',goodsID,7,'/');
		window.location.href = '../html/detail_page.html';
	});
	//为每一个商品添加点击事件,跳转到对应详情页 ------结束
});