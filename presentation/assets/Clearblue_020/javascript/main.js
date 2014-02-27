(function() {
	$('#slider').on('ready', '.Clearblue_020', function(e, el) {
		var slide = $('#container', el);

	/*pop16*/	
			if(isAnimation)
		{
			$('.txt_1',slide).delay(600).fadeIn(600); 
			$('.man',slide).delay(700).fadeIn(700); 
			
			$('.box_1',slide).delay(1000).fadeIn(600);
			$('.number_1',slide).delay(1500).fadeIn(function(){
				$('.txt_box1',slide).fadeIn(600);
			});
			
			
			
			
			$('.box_2',slide).delay(2500).fadeIn(600);		
			$('.number_2',slide).delay(2900).fadeIn(function(){
				$('.txt_box2',slide).fadeIn();
			});
			
			
			$('.box_3',slide).delay(4000).fadeIn(600);
			$('.number_3',slide).delay(4400).fadeIn(function(){
				$('.txt_box3',slide).fadeIn();
			});
		}
		else
		{
			$('.title,.title_1,.box_1,.box_1 .num,.box_1 .stt, .box_1 .note, .img_1',slide).show();
			$('.box_2,.box_2 .num,.box_2 .stt, .box_2 .note, .img_2',slide).show();
			$('.box_3,.box_3 .num,.box_3 .stt, .box_3 .note, .img_3',slide).show();
		}


		
/*control ref	*/

			function setUpRef(el){
			$('.next_btn').bind('click',function(){
				if($('#refCo'+el+'_orange').css('display')=="block")
					$(".ref"+el).controller().hide();
			});
			
			$('.pre_btn').bind('click',function(){
				if($('#refCo'+el+'_orange').css('display')=="block")
					$(".ref"+el).controller().hide();
			});
			$(".ref"+el).each(function () {
				if ($(this).attr("rel") != null) {

					$(this).drcom_customizepopup({
						closeInside : false,
						effect : "split",
						duration : 1000,
						effectOptions : {
							row : 3,
							col : 6,
							direction : "leftbottom"
						}
					});
				} else {
					$(this).bind("click", function () {
						$($(this).attr("related")).controller().toggle();
					});
				}
			});
			$("#refCo"+el+"_orange").show().css("visibility", "hidden");

			var number = Math.ceil($(".ref"+el+" .ref_content>div").height() / $(".ref"+el+" .ref_content").height());
			$("#refCo"+el+"_orange").hide().css("visibility", "visible");

			$(".ref"+el+" .ref_prev").addClass("ref_button_disable");
			if (number == 1) {
				$(".ref"+el+" .ref_next").addClass("ref_button_disable");
				return;
			}

			var pageCurrent = 0;
			$(".ref"+el+" .ref_button").click(function (ev) {
				if ($(this).hasClass("ref_button_disable")) {
					ev.stopImmediatePropagation();
					return false;
				}
			});
			$(".ref"+el+" .ref_next").click(function () {
				pageCurrent++;
				$(".ref"+el+" .ref_content>div").animate({
					transform : "translate3d(0px,-" + pageCurrent * $(".ref"+el+" .ref_content").height() + "px,0px)"
				}, 800);

				if (pageCurrent == number - 1)
					$(this).addClass("ref_button_disable");
				$(".ref"+el+" .ref_prev").removeClass("ref_button_disable");

			});
			$(".ref_prev").click(function () {
				pageCurrent--;
				$(".ref"+el+" .ref_content>div").animate({
					transform : "translate3d(0px,-" + pageCurrent * $(".ref"+el+" .ref_content").height() + "px,0px)"
				}, 800);
				if (pageCurrent == 0)
					$(this).addClass("ref_button_disable");
				$(".ref"+el+" .ref_next").removeClass("ref_button_disable");

			});	
			
			$(".refCo"+el+" .close_ref").bind('tapone',function(){
				$(".ref"+el).controller().hide();	
			});
		}
/*control ref	*/				
		
		
	});
})();