(function() {
	$('#slider').on('ready', '.Clearblue_006', function(e, el) {
		var slide = $('#container', el);
		
		if(isAnimation)
		{	
		
			setTimeout(function(){ 
				$('.sheft',slide).show();
				$('.txt_right_1',slide).fadeIn(600);
				$('.txt_right_2',slide).fadeIn(600);	
					setTimeout(function(){
						$('.sheft',slide).fadeOut(600);						
						$('.sheft_hide',slide).fadeIn(600);	
						$('.box, .flag, .txt_box',slide).fadeIn(600);				
					},2000);
			},500);
			
		}
		else
		{
			$('.sheft,.sheft_hide,.txt_right_1,.txt_right_2,.box, .flag, .txt_box',slide).show();
		}
		
		
	});
	
})();