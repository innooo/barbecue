$(document).ready(function(){
	//保存收货信息按钮功能
	$('.receiveInfo').on('click','#address-btn',function(){
		var isCorrect = true;
		if(isCorrect){
			
			var sUserName = $('#userName').val(),
				sAddress  = $('#address').val(),
				sZipCode  = $('#zipcode').val(),
				sCellPhoneNum = $('#phoneNum').val(),
				sPhoneNum = $('.phone1').val() + '-' + $('.phone2').val() + '-' + $('.phone3').val();
			var oldReceiveHTML = `${sAddress} ${sZipCode} （收货人：${sUserName} 电话：${sCellPhoneNum} / ${sPhoneNum}）`;
			oldReceiveHTML = document.createTextNode(oldReceiveHTML);
			$('.oldReceiveInfo').show().append($(oldReceiveHTML));
			$('.receiveInfo').stop().animate({'height':'76px'});
		}
	});
	$('.oldReceiveInfo').on('click','input',function(){
		$('.receiveInfo').stop().animate({'height':'76px'});
	});
	$('#editInfo').click(function(){
		$('.receiveInfo').stop().animate({'height':'410px'});
	});
	//获取cookie,加载购物车信息
	var cookie = getCookie('cart');
	if(cookie){
		cookie = JSON.parse(cookie);
		$.ajax({
			type:'GET',
			url:'../json/goods_detail.json',
			beforeSend:function(){},
			timeout:10000,
			data:{},
			dataType:'JSON',
			success:function(data){loadCart(data)},
			error:function(){},
			complete:function(){},
			global:true
		});
		function loadCart(data){
			var totalPrice = 0;
			for(var i = 0;i < cookie.length;i++){
				for(var j = 0;j < $(data).length;j++)
				if(cookie[i].id == $(data)[j].id && cookie[i].count != 0){
					var price = $(data)[j].price.slice(1);
					var html = `<div class='thisGoods clear'>
									<dl class='flt clear'>
										<dt><img src='${$(data)[j].min1ImgURL}' /></dt>
										<dd>
											<p>${$(data)[j].tit}</p>
											<span>${$(data)[j].serial}</span>
										</dd>
									</dl>
									<p class='count flt'>${cookie[i].count}</p>
									<p class='price flt'>￥ ${price * cookie[i].count}</p>
								</div>`;
					$('.goodsList').append($(html));
				}
			}
			$('.thisGoods').find('.price').each(function(){
				totalPrice += Number($(this).html().slice(1));
			});
			$('#totalPrice').html('￥' + totalPrice);
			$('#deliveryPay').html('￥' + $('#delivery-sle').val());
			$('#totalPay').html('￥' + (Number($('#totalPrice').html().slice(1)) + Number($('#delivery-sle').val())));
		}
	}
});
