(function() {
	$('#slider').on('ready', '.Clearblue_007', function(e, el) {
		var slide = $('#container', el);
		

		
		if(isAnimation)
		{
			$('.claim_add',slide).delay(400).fadeIn(400);
			$('.people',slide).delay(600).fadeIn(600);
			$('.ver_col, .txt',slide).delay(800).fadeIn(600);
			$('.circle_1').delay(1000).animate({opacity: 1,left: '109'}, 600);
			$('.circle_1 .note',slide).delay(1400).fadeIn(800);
			$('.circle_2').delay(1200).animate({opacity: 1,left: '255'}, 600);
			$('.circle_2 .note',slide).delay(1600).fadeIn(800);
			$('.circle_3').delay(1400).animate({opacity: 1,left: '410'}, 600);
			$('.circle_3 .note',slide).delay(1800).fadeIn(800);
			$('.circle_4').delay(1600).animate({opacity: 1,left: '575'}, 600);
			$('.circle_4 .note',slide).delay(2000).fadeIn(800);
			$('.circle_5').delay(1800).animate({opacity: 90,left: '764'}, 600);
			$('.circle_5 .note',slide).delay(2200).fadeIn(800);
			$('.claim',slide).delay(2600).fadeIn(1000);
			setUpRef('1');
		}
		else
		{
			$('.people, .ver_col, .txt,.claim, .claim_add',slide).show();
			$('.circle_1,.circle_1 .note',slide).css({opacity: 1,left: '109px'});
			$('.circle_2,.circle_2 .note',slide).css({opacity: 1,left: '255px'});
			$('.circle_3,.circle_3 .note',slide).css({opacity: 1,left: '410px'});
			$('.circle_4,.circle_4 .note',slide).css({opacity: 1,left: '575px'});
			$('.circle_5,.circle_5 .note',slide).css({opacity: 1,left: '764px'});
			setUpRef('1');
		}
		
		

	
	});
})();