$(document).ready(function() {
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
		
		if(count == 3) {
			$('.banner .banner-index li').eq(0).addClass('now').siblings().removeClass('now');
		} else {
			$('.banner .banner-index li').eq(count).addClass('now').siblings().removeClass('now');
		}

		var iT = imgH * count + 'px';
		$('.banner .move').stop().animate({
			top: iT
		}, 700);
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
	$('.banner .banner-index li').click(function() {
		var index = $(this).index();
		count = index;
		console.log(count);
		count++;
		move();
	});
	//banner百叶窗轮播----结束
});