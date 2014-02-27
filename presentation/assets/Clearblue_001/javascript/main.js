(function() {
	$('#slider').on('ready', '.Clearblue_001', function(e, el) {
		var slide = $('#container', el);
                
		
            if(isAnimation)
		{
			
			$('.click_menu1',slide).bind("tapone",function(){
				$('.box_2',slide).fadeIn();
				$('.click_hide1',slide).show();
			});
			$('.click_menu2',slide).bind("tapone",function(){
				$('.box_1',slide).fadeIn();
				$('.click_hide2',slide).show();
			});
			$('.click_menu3',slide).bind("tapone",function(){
				$('.box_3',slide).fadeIn();
				$('.click_hide3',slide).show();
			});
			
			$('.mask_1',slide).bind("tapone",function(){
				$('.box_2',slide).fadeIn();
				$('.click_hide1',slide).show();
			});
			$('.mask_2',slide).bind("tapone",function(){
				$('.box_1',slide).fadeIn();
				$('.click_hide2',slide).show();
			});
			$('.mask_3',slide).bind("tapone",function(){
				$('.box_3',slide).fadeIn();
				$('.click_hide3',slide).show();
			});
			
			$('.click_hide1',slide).bind("tapone",function(){
				$('.box_2',slide).hide();
				$('.click_hide1',slide).hide();
			});
			$('.click_hide2',slide).bind("tapone",function(){
				$('.box_1',slide).hide();
				$('.click_hide2',slide).hide();
			});
			$('.click_hide3',slide).bind("tapone",function(){
				$('.box_3',slide).hide();
				$('.click_hide3',slide).hide();
			});
			
			$(".text4", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s2");	
	
			});
			$(".text5", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s3");	
			});
			
			$(".text6", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s4");	
			});
			
			$(".text7", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s5");	
			});
			$(".text8", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s9");	
			});
			$(".text81", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s10");	
			});
			
			
			$(".text9", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s11");	
			});
			$(".text10", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s13");	
			});
			$(".text11", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s15");	
			});
			$(".text12", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s17");	
			});
			$(".text13", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s18");	
			});
			$(".text14", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s19");	
			});
			$(".text15", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s21");	
			});
			
			$(".text16", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow3","s201");	
			});
			$(".text17", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow3","s24");	
			});
			$(".text18", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow3","s26");	
			});
			$(".text19", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow3","s31");	
			});
		}
		else
		{
			$('.box_1,.box_2,.box_3',slide).show();
			
			$(".text4", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s2");	
	
			});
			$(".text5", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s3");	
			});
			
			$(".text6", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s4");	
			});
			
			$(".text7", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s5");	
			});
			$(".text8", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s9");	
			});
			$(".text81", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow1","s10");	
			});
			
			
			$(".text9", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s11");	
			});
			$(".text10", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s13");	
			});
			$(".text11", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s15");	
			});
			$(".text12", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s17");	
			});
			$(".text13", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s18");	
			});
			$(".text14", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s19");	
			});
			$(".text15", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s21");	
			});
			
			$(".text16", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow3","s201");	
			});
			$(".text17", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s24");	
			});
			$(".text18", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s26");	
			});
			$(".text19", slide).bind("tapone",function(){
				drcom.navigation.changeFlow("flow2","s31");	
			});
		}
		
	});
})();