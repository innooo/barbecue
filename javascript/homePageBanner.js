$(document).ready(function() {
	//banner百叶窗轮播----开始
	var count = 0;
	var imgH = 40;
	$('.banner-btn span').eq(0).click(function() {
		count--;
		move();
	});
	$('.banner-btn span').eq(1).click(function() {
		count++;
		move();
	});

	function move() {
		if(count > 3) {
			count = 1;
			$('.banner .move').css('top', '-120px');
		}
		if(count < 0) {
			count = 2;
			$('.banner .move').css('top', '0');
		}
		
		if(count == 3) {
			$('.banner .banner-index li').eq(0).addClass('now').siblings().removeClass('now');
		} else {
			$('.banner .banner-index li').eq(count).addClass('now').siblings().removeClass('now');
		}

		var iT = imgH * count -120 + 'px';
		$('.banner .move').stop().animate({
			top: iT
		}, 700);
	}
	var timer = setInterval(function() {
		count++;
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
	$('.banner-index li').click(function() {
		var index = $(this).index();
		count = index;
		move();
	});
	//banner百叶窗轮播----结束
});