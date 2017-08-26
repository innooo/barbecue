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
			if($(data)[i].id == id){
				data = $(data)[i];
			}
		}
			
		var bigImgHTML = `<div class='snapshot-bigimg'>
							 <ul class='clear'>
								 <li><img src="${data.big1ImgURL}" alt="" /></li>
								 <li><img src="${data.big2ImgURL}" alt="" /></li>
								 <li><img src="${data.big3ImgURL}" alt="" /></li>
						 	 </ul>
						  </div>`;
		var midImgHTML = `<div class='snapshot-midimg'>
							 <ul class='clear'>
								 <li><img src="${data.mid1ImgURL}" alt="" /></li>
								 <li><img src="${data.mid2ImgURL}" alt="" /></li>
								 <li><img src="${data.mid3ImgURL}" alt="" /></li>
						     </ul>
						  	 <div id='cover'></div>
						  </div>`;
		var minImgHTML = `<ul class='clear'>
							 <li><img src="${data.min1ImgURL}" alt="" /></li>
							 <li><img src="${data.min2ImgURL}" alt="" /></li>
							 <li><img src="${data.min3ImgURL}" alt="" /></li>
						  </ul>
						  `;
		var buyingInstructionHTML = `<h3>${data.tit} </h3>
									 <h4>${data.label}</h4>
									 <span>商品编号：${data.serial}</span>
									 <em>${data.price}</em>`;
		var infoHTML = '';
		for(var j = 0;j < data.details.length;j++){
			infoHTML += "<img src='" + data.details[j] + "' />";
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
			var iL =evt.clientX - $('.snapshot-midimg')[0].offsetLeft - 
					$('.snapshot-img')[0].offsetLeft -
					$('#cover')[0].offsetWidth / 2;
			var iT =evt.clientY - $('.snapshot-midimg')[0].offsetTop - 
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
		console.log(amount);
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
		window.location.href = '../html/cart.html';
	});
});
