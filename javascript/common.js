$(document).ready(function() {
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
	$('section .section-beauty .clickshow').click(function() {
		console.log(1);
		$(this).find('.exhibition-detail').stop()
			.animate({
				height: '227px',
				width: '380px'
			}, function() {
				$(this).animate({
					height: '693px'
				});
			});
	});
	$('section .section-beauty .clickshow .exhibition-detail').find('.exh-detail-close')
		.click(function(e) {
			var evt = e || window.event;
			evt.stopPropagation();
			$(this).parent().stop().animate({
				height: '227px'
			}, function() {
				$(this).animate({
					height: '0px',
					width: '0px'
				});
			});
		});

	//banner百叶窗轮播----开始
	var count = 0;
	var imgH = -40;
	$('.banner').click(function() {
		count++;
		move();
	});
	$('#btn').click(function() {
		count--;
		move();
	});

	function move() {
		if(count > 3) {
			count = 1;
			$('.banner .move').css('top', '0');
		}
		if(count < 0) {
			count = 2;
			$('.banner .move').css('top', '-120px');
		}
		console.log($('.banner .banner-index li').eq(0));
		if(count == 3){
			$('.banner .banner-index li').eq(0).addClass('now').siblings().removeClass('now');
		}else{
			$('.banner .banner-index li').eq(count).addClass('now').siblings().removeClass('now');
		}
		
		var iT = imgH * count + 'px';
		$('.banner .move').stop().animate({top: iT}, 700);
	}
	var timer = setInterval(function() {
		count--;
		move();
	}, 5000);
	$('.banner').hover(function() {
		$('.banner .banner-btn').show();
		clearInterval(timer);
	}, function() {
		$('.banner .banner-btn').hide();
		clearInterval(timer);
		timer = setInterval(function() {
			count--;
			move();
		}, 5000);
	});
	$('.banner .banner-index li').click(function(){
		
	});
	//banner百叶窗轮播----结束
});