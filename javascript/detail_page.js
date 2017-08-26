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
		var id = getCookie('goodsID');
		for(var i = 0;i < $(data).length;i++){
			if($(data)[i].id == id){
				data = $(data)[i];
			}
		}
		var bigImgHTML = `<ul class='clear'>
							 <li><img src="${data.big1ImgURL}" alt="" /></li>
							 <li><img src="${data.big1ImgURL}" alt="" /></li>
							 <li><img src="${data.big1ImgURL}" alt="" /></li>
						  </ul>`;
		var midImgHTML = `<ul class='clear'>
							 <li><img src="${data.mid1ImgURL}" alt="" /></li>
							 <li><img src="${data.mid1ImgURL}" alt="" /></li>
							 <li><img src="${data.mid1ImgURL}" alt="" /></li>
						  </ul>`;
		var minImgHTML = `<ul class='clear'>
							 <li><img src="${data.min1ImgURL}" alt="" /></li>
							 <li><img src="${data.min1ImgURL}" alt="" /></li>
							 <li><img src="${data.min1ImgURL}" alt="" /></li>
						  </ul>`;
		var buyingInstructionHTML = `<h3>${data.tit} </h3>
									 <h4>${data.label}</h4>
									 <span>商品编号：${data.serial}</span>
									 <em>${data.price}</em>`;
		var infoHTML = '';
		for(var j = 0;j < data.details.length;j++){
			infoHTML += "<img src='" + data.details[j] + "' />";
		}
		$('.snapshot-bigimg').html(bigImgHTML);
		$('.snapshot-midimg').html(midImgHTML);
		$('.snapshot-minimg').html(minImgHTML);
		$('#buying-instruction').html(buyingInstructionHTML);
		$('.product-detail-content').html(infoHTML);
		magnifier();
	}
	function magnifier(){
		//鼠标移上小图相应的中图和大图出现
		$('.snapshot-minimg').mouseenter(function(){
			console.log(11);
		});
	}
});
