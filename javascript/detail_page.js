$(document).ready(function(){
	$.ajax({
		type:'GET',
		url:'../../dist/json/goods_detail.json',
		data:{},
		beforeSend:function(){},
		timeout:10000,
		dataType:'json',
		success:function(data){loadInfo(data)},
		error:function(){},
		complete:function(){},
		global:true
	});
	function loadInfo(data){
		var data;
		var id = getCookie('goodsid');
		$('.product-snapshot').attr('goodsid',id);
		for(var i = 0;i < $(data).length;i++){

			//历史记录显示
			var historyCookie = getCookie('thisHis');
			if(historyCookie){
				historyCookie = JSON.parse(historyCookie);
				console.log(historyCookie);
				for(var j = 0;j < historyCookie.length;j++){
					if($(data)[i].id == historyCookie[j]){
						var historyHTML = `
						<li>
							<a href='#'>
								<img src='${$(data)[i].mid1ImgURL}'  />
							</a>
							<p>${$(data)[i].tit}</p>
							<span>${$(data)[i].price}</span>
						</li>`;
						$('.product-history ul').append($(historyHTML));
					}
				}
			}
			if($(data)[i].id == id){
				oData = $(data)[i];
			}	
		}
		
		var bigImgHTML = `<div class='snapshot-bigimg'>
							 <ul class='clear'>
								 <li><img src="${oData.big1ImgURL}" alt="" /></li>
								 <li><img src="${oData.big2ImgURL}" alt="" /></li>
								 <li><img src="${oData.big3ImgURL}" alt="" /></li>
						 	 </ul>
						  </div>`;
		var midImgHTML = `<div class='snapshot-midimg'>
							 <ul class='clear'>
								 <li><img src="${oData.mid1ImgURL}" alt="" /></li>
								 <li><img src="${oData.mid2ImgURL}" alt="" /></li>
								 <li><img src="${oData.mid3ImgURL}" alt="" /></li>
						     </ul>
						  	 <div id='cover'></div>
						  </div>`;
		var minImgHTML = `<ul class='clear'>
							 <li><img src="${oData.min1ImgURL}" alt="" /></li>
							 <li><img src="${oData.min2ImgURL}" alt="" /></li>
							 <li><img src="${oData.min3ImgURL}" alt="" /></li>
						  </ul>
						  `;
		var buyingInstructionHTML = `<h3>${oData.tit} </h3>
									 <h4>${oData.label}</h4>
									 <span>商品编号：${oData.serial}</span>
									 <em>${oData.price}</em>`;
		var infoHTML = '';
		for(var j = 0;j < oData.details.length;j++){
			infoHTML += "<img src='" + oData.details[j] + "' />";
		}
		$('.snapshot-show').html(bigImgHTML + midImgHTML);
		$('.snapshot-minimg').html(minImgHTML);
		$('#buying-instruction').html(buyingInstructionHTML);
		$('.product-detail-content').html(infoHTML);
		magnifier();
	}
	function magnifier(){
		//鼠标移上小图相应的中图和大图出现
		$('.snapshot-minimg ul li').mouseenter(function(e){
			var index = $(this).index();
			$('.snapshot-midimg ul').css('left',-414 * index + 'px');
			$('.snapshot-bigimg ul li').eq(index).css('display','block').siblings().css('display','none');
		});
		//鼠标滑进中图出现遮罩,滑出遮罩消失
		function moveCover(e){
			var evt = e || window.event;
			var iScrollL = document.documentElement.scrollLeft ? 
						   document.documentElement.scrollLeft : document.body.scrollLeft;
			var iScrollT = document.documentElement.scrollTop ? 
						   document.documentElement.scrollTop : document.body.scrollTop;
			var iL = evt.clientX + iScrollL - $('.snapshot-midimg')[0].offsetLeft - 
					 $('.snapshot-img')[0].offsetLeft -
					 $('#cover')[0].offsetWidth / 2;
			var iT = evt.clientY + iScrollT - $('.snapshot-midimg')[0].offsetTop - 
					 $('.snapshot-img')[0].offsetTop -
					 $('#cover')[0].offsetHeight / 2;
			if(iL < 70){
				iL = 70;
			}
			if(iL > 240){
				iL = 240;
			}
			if(iT < 0){
				iT = 0;
			}
			if(iT > $('.snapshot-midimg')[0].offsetHeight - $('#cover')[0].offsetHeight){
				iT = $('.snapshot-midimg')[0].offsetHeight - $('#cover')[0].offsetHeight;
			}
			$('#cover').css({'left':iL + 'px','top':iT + 'px'});
			$('.snapshot-bigimg ul').css({'left':-iL * 1.5 + 105 + 'px','top':-iT * 1.67 + 'px'});
		}
		$('.snapshot-show').hover(function(e){
			e.stopPropagation();
			$('#cover').show();
			$('.snapshot-bigimg').show().stop().animate({'width':'300px','height':'300px','right':'-310px','top':'0'});
			$(document).on('mousemove','.snapshot-midimg',moveCover);
		},function(e){
			e.stopPropagation();
			$(document).off('mousemove','.snapshot-midimg',moveCover);
			$('#cover').hide();
			$('.snapshot-bigimg').stop().animate({'width':'10px','height':'10px','right':'200px','top':'160px'},function(){
				$(this).hide();
			});
		});
	}
	
	
	//评论选项卡划过效果
	$('.product-detail-tit li').mouseenter(function(){
		var index = $(this).index();
		$(this).addClass('now').siblings().removeClass('now');
		if(index !=0){
			$('.product-detail-inner>div').eq(index).show().siblings().hide();
		}else{
			$('.product-detail-inner>div').show();
		}
	});
	
	//为每一个'+'/'-'按钮添加功能
	$('#add').on('click',function(){
		var html = Number($(this).siblings('#amount').html());
		html++;
		$(this).siblings('#amount').html(html);
	});
	$('#minus').on('click',function(){
		var html = Number($(this).siblings('#amount').html());
		html--;
		if(html < 1){
			html = 1;
		}
		$(this).siblings('#amount').html(html);
	});
	//添加加入购物车功能
	$('#addInCart').click(function(){
		var amount = Number($('#amount').html());

		var cart = getCookie('cart');
		var goodInfo;
		var isTheGoodIn = true;
		if(cart){
			var oGoodInfo = JSON.parse(getCookie('cart'));
			for(var i = 0;i < oGoodInfo.length;i++){
				if(oGoodInfo[i].id == $('.product-snapshot').attr('goodsid')){
					oGoodInfo[i].count = Number(oGoodInfo[i].count) + amount;
					isTheGoodIn = true;
					break;
				}else{
					isTheGoodIn = false;
				}
			}
			if(!isTheGoodIn){
				goodInfo = {"id":$('.product-snapshot').attr('goodsid'),"count":amount};
				oGoodInfo.push(goodInfo);
			}
			var sGoodInfo = JSON.stringify(oGoodInfo);
			setCookie('cart',sGoodInfo,7,'/');
		}else{
			goodInfo = `[{"id":"${$('.product-snapshot').attr('goodsid')}","count":${amount}}]`;
			setCookie('cart',goodInfo,7,'/');
		}
//		window.location.href = '../html/cart.html';
		$(this).clone(false,false).appendTo($('#buying-btn'))
		.css({'position':'absolute','left':'10px','top':'-10px'})
		.stop().animate({'left':'380px','top':'-237px','width':'5px','height':'5px'},function(){
			$(this).hide();
			cartGoodsCount();
		});
	});
	//实现添加评论功能
	$('#com-submit').click(function(){
		var value = $(this).siblings('textarea').val();
		var html = ``;
	});
});
