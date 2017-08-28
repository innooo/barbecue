function productAnimation() {
	$('section .clickshow').click(function() {
		$(this).find('.exhibition-detail').stop()
			.animate({
				height: '227px',
				width: '380px'
			}, function() {
				$(this).animate({
					height: '693px'
				});
			}).end().css('z-index','100');
		$('.section-cover').show();
	});
	$('section .clickshow .exhibition-detail').find('.exh-detail-close')
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
			}).parent().css('z-index','auto');
			$('.section-cover').hide();
		});
}