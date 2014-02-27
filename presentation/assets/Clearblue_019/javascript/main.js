(function() {
	$('#slider').on('ready', '.Clearblue_019', function(e, el) {
		var slide = $('#container', el);
		
		if(isAnimation)
		{
			$('.txt_1',slide).delay(600).fadeIn(600); 
			
			$('.box_1',slide).delay(1000).fadeIn(600);
			$('.number_1',slide).delay(1500).fadeIn(function(){
				$('.txt_box1',slide).fadeIn(600);
				$('.img_1',slide).delay(600).fadeIn(600);
			});
			
			
			
			
			$('.box_2',slide).delay(2500).fadeIn(600);		
			$('.number_2',slide).delay(2900).fadeIn(function(){
				$('.txt_box2',slide).fadeIn();
				$('.img_2',slide).delay(600).fadeIn(600);
			});
			
			
			$('.box_3',slide).delay(4000).fadeIn(600);
			$('.number_3',slide).delay(4400).fadeIn(function(){
				$('.txt_box3',slide).fadeIn();
				$('.img_3',slide).delay(600).fadeIn(600);
			});
		}
		else
		{
			$('.title,.title_1,.box_1,.box_1 .num,.box_1 .stt, .box_1 .note, .img_1',slide).show();
			$('.box_2,.box_2 .num,.box_2 .stt, .box_2 .note, .img_2',slide).show();
			$('.box_3,.box_3 .num,.box_3 .stt, .box_3 .note, .img_3',slide).show();
		}
		
	});
})();