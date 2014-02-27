(function() {
	$('#slider').on('ready', '.Clearblue_031', function(e, el) {
		var slide = $('#container', el);
	
		if(isAnimation)
		{
			$(".doctor",slide).fadeIn(function(){
				$('.maz', slide).animate({opacity: 1,left: '680px'}, 400,function(){
					$(".main_para1",slide).fadeIn(function(){
						$(".main_para2",slide).fadeIn(function(){
							$(".main_para3",slide).fadeIn();
						});	
					});
				});
			});
			
		}
		else
		{
			$(".doctor,main_para1,main_para2,main_para3",slide).show();
			$('.maz', slide).css({opacity: 1,left: '680px'});
		}

		
	});
})();