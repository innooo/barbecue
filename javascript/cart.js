$(document).ready(function(){
	$.ajax({
		type:'GET',
		url:'../../dist/json/goods_detail.json',
		beforeSend:function(){},
		timeout:10000,
		data:{},
		dataType:'json',
		success:function(data){selectGoods(data)},
		error:function(){},
		complete:function(){},
		global:true
	});
	function selectGoods(data){
		var cartInfo;
		if(getCookie('cart')){
			cartInfo = JSON.parse(getCookie('cart'));
			console.log(cartInfo);
			for(var i = 0;i < cartInfo.length;i++){
				for(var j = 0;j < $(data).length;j++){
					if(cartInfo[i].id == $(data)[j].id && cartInfo[i].count != 0){
						var price = $(data)[j].price.slice(1);
						var tbodyHTML = `<tr goodsid='${$(data)[j].id}'>
								<td>
									<input type="checkbox" class='selectThis' checked=checked />
								</td>
								<td>
									<dl class='clear'>
										<dt class='flt'>
											<img src='${$(data)[j].min1ImgURL}'  />
										</dt>
										<dd class='flt'>
											<p>${$(data)[j].tit}*2</p>
											<em>商品编号:${$(data)[j].serial}</em>
										</dd>
									</dl>
								</td>
								<td class='thisPrice'>${$(data)[j].price}</td>
								<td>
									<div class='count'>
										<input type="button" class='minus' value='-' />
										<span class='amount'>${cartInfo[i].count}</span>
										<input type="button" class='add' value='+' />
									</div>
								</td>
								<td class='totalThis'>${'￥' + cartInfo[i].count * price}</td>
								<td><a href='#' class='deleteItem'>&times;删除</a></td>
							</tr>`;
						$('.buying-list tbody').append(tbodyHTML);
						getTotalGoods();
						break;
					}
				}
			}
		}
		
	}
	//添加删除购物信息事件
	$('.buying-list').on('click','.deleteItem',function(){
		//删除对应cookie
		var id = $(this).parents('tr').attr('goodsid');
		var cookie = JSON.parse(getCookie('cart'));
		for(var i = 0;i < cookie.length;i++){
			if(cookie[i].id == id){
				cookie.splice(i,1);
				break;
			}
		}
		setCookie('cart',JSON.stringify(cookie),7,'/');
		
		$(this).parents('tr').remove();
		getTotalGoods();
		cartGoodsCount();
	})
	//添加全选按钮功能
	$('.content').on('click','.selectAll',function(){
		if($(this).is(':checked')){
			$('.selectThis').each(function(){
				$(this)[0].checked = true;
			});
			$('.selectAll').each(function(){
				$(this)[0].checked = true;
			});
			//计算商品个数的价格
			getTotalGoods();
		}else{
			$('.selectThis').removeAttr('checked');
			$('.selectAll').removeAttr('checked');
			getTotalGoods();
		}
	});
	//为每一商品行对应的checkbox按钮添加功能
	$('.buying-list').on('click','.selectThis',function(){
		$('.selectAll').removeAttr('checked');
		getTotalGoods();
	});
	//为每一个'+'/'-'按钮添加功能
	$('.buying-list').on('click','.add',function(){
		var html = Number($(this).siblings('.amount').html());
		html++;
		//修改对应cookie
		var id = $(this).parents('tr').attr('goodsid');
		var cookie = JSON.parse(getCookie('cart'));
		for(var i = 0;i < cookie.length;i++){
			if(cookie[i].id == id){
				cookie[i].count++;
				break;
			}
		}
		setCookie('cart',JSON.stringify(cookie),7,'/');
		
		$(this).siblings('.amount').html(html);
		var totalPrice = $(this).parents('td').siblings('.thisPrice').html().slice(1);
		totalPrice = totalPrice * $(this).siblings('.amount').html();
		$(this).parents('td').siblings('.totalThis').html('￥' + totalPrice);
		getTotalGoods();
		cartGoodsCount();
	});
	$('.buying-list').on('click','.minus',function(){
		var html = Number($(this).siblings('.amount').html());
		html--;
		if(html < 0){
			html = 0;
		}else{
			//删除对应cookie
			var id = $(this).parents('tr').attr('goodsid');
			var cookie = JSON.parse(getCookie('cart'));
			for(var i = 0;i < cookie.length;i++){
				if(cookie[i].id == id){
					cookie[i].count--;
					/*if(cookie[i].count <= 0){
						cookie.splice(i,1);
					}*/
					break;
				}
			}
			setCookie('cart',JSON.stringify(cookie),7,'/');
		}
		$(this).siblings('.amount').html(html);
		var totalPrice = $(this).parents('td').siblings('.thisPrice').html().slice(1);
		totalPrice = totalPrice * $(this).siblings('.amount').html();
		$(this).parents('td').siblings('.totalThis').html('￥' + totalPrice);
		getTotalGoods();
		cartGoodsCount();
	});
	//封装计算现在购物车商品数量和总价的函数
	function getTotalGoods(){
		var amount = 0;
		var totalPrice = 0;
		$('.buying-list tbody tr').each(function(){
			if($(this).find('.selectThis').is(':checked')){
				
				amount += Number($(this).find('.amount').html());
				totalPrice += Number($(this).find('.totalThis').html().slice(1));
			}
		});
		$('#totalAmount').html(amount);
		$('#totalMoney').html('￥' + totalPrice);
	}
	//添加点击清空选中商品功能
	$('#delSelected').click(function(){
		var cookie = JSON.parse(getCookie('cart'));
		$('.buying-list tbody tr').each(function(){
			if($(this).find('.selectThis').is(':checked')){
				$(this).remove();
				//删除对应cookie
				var id = $(this).attr('goodsid');
				for(var i = 0;i < cookie.length;i++){
					if(cookie[i].id == id){
						cookie.splice(i,1);
						break;
					}
				}
			}
		});
		setCookie('cart',JSON.stringify(cookie),7,'/');
		getTotalGoods();
		cartGoodsCount();
	});
	function addCookieInfo(){
		
	}
});
