$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: '../../dist/json/homepageData.json',
		beforeSend: function() {},
		timeout: 10000,
		data: {},
		dataType: 'JSON',
		success: showContent(),
		error: function(data) {
			alert('error')
		},
		complete: function() {
			productAnimation()
		},
		global: true
	})

	function showContent() {
		return function(data) {
			var $data = $(data);
			$('.exhibition').each(function(index) {
				var data = $data[index];
				var bigImgURL = data.bigImgURL,
					figcaptionHTML = `
					<h3>
					${data.h3}
					</h3>
					<p>
						${data.bannerP}
					</p>
					<span>
						${data.price}
					</span>
					<div class='trigon'></div>`,
					detailHTML = `
					<div class='exhibition-detail'>
						<input type="button" class='exh-detail-close' />
						<div class='exh-detail-img'>
							<img src='${data.bigImgURL}' />
						</div>
						<div class='exh-detail-produce'>
							<h4>${data.h4}</h4>
							<p>${data.detailP}
							</p>
							<div class='clear'>
								<div class='exh-detail-price frt'>
									<span>${data.price}</span>
									<em></em>
									<a href='#'>查看详情&gt;&gt;</a>
								</div>
							</div>
					
						</div>
					
						<div class='exh-detail-minimg'>
							<a href='#'>
								<img src='${data.minImg1URL}' />
								<img src='${data.minImg2URL}' />
							</a>
						</div>
					</div>`;
				if(index < 18) {
					$(this).find('figure>img').attr('src', data.bigImgURL)
						.end().find('figure>figcaption').html(figcaptionHTML)
						.end().append($(detailHTML)).attr('id',data.id);
					
					
				}else{
					$(this).find('figure>img').attr('src', data.bigImgURL)
						.end().find('figure>figcaption').html(figcaptionHTML);	
				}
			});
		}
	}
	//为每一个模块添加'查看详情按钮功能' 和 购物车按钮功能
	$('.beauty-product,.health-product,.life-product').on('click','.exh-detail-price a',function(){
		var id = $(this).parents('.exhibition').attr('id');
		console.log(id);
		setCookie('goodsid',id,1,'/');
		window.location.href = 'html/detail_page.html';
	});
});
