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
							<img src='../res/img/1490296369700099015.jpg' />
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
						.end().append($(detailHTML));
				}else{
					$(this).find('figure>img').attr('src', data.bigImgURL)
						.end().find('figure>figcaption').html(figcaptionHTML);	
				}
			});
		}
	}
});

/*<figure>
	<img src='../res/img/section-beauty-product1.jpg' class='right frt' />
	<figcaption class='left flt'>
		<h3>
			LA CELLER 胶原蛋白精华线球超值分享装
		</h3>
		<p>
			神奇的胶原蛋白线球,具有三重螺旋分子结构,溶于水并被吸收,不受温度影响,使肌肤滋润 光泽 有弹性!
		</p>
		<span>
			$ 3820
		</span>
		<div class='trigon'></div>
	</figcaption>
</figure>
<div class='exhibition-detail'>
	<input type="button" class='exh-detail-close' />
	<div class='exh-detail-img'>
		<img src='../res/img/1490296369700099015.jpg' />
	</div>
	<div class='exh-detail-produce'>
		<h4>秘密花园玫瑰鲜活水</h4>
		<p>优选新鲜玫瑰花瓣，采用特殊工艺，单纯萃取玫瑰花瓣的水分，滴滴精粹，层层沁润肌肤；馥郁的玫瑰芬芳，淡雅自然…
		</p>
		<div class='clear'>
			<div class='exh-detail-price frt'>
				<span>$499</span>
				<em></em>
				<a href='#'>查看详情&gt;&gt;</a>
			</div>
		</div>

	</div>

	<div class='exh-detail-minimg'>
		<a href='#'>
			<img src='../res/img/5428_thumb_P_1468174726509.jpg' />
			<img src='../res/img/5428_thumb_P_1468174727571.jpg' />
		</a>

	</div>
</div>*/