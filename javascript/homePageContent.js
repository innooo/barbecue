function productAnimation() {
	$('section .clickshow').click(function() {
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
			});
		});
}