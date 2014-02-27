(function() {
	$('#slider').on('ready', '.Clearblue_010', function(e, el) {
		var slide = $('#container', el);

	/*pop16*/	
		if(isAnimation)
		{
			$(".box_click_1", slide).bind("tapone",function(){
				$(".screen2", slide).fadeIn(function(){});
				$(".screen1,.screen3", slide).fadeOut(function(){});
			});
				
			$(".box_click_2", slide).bind("tapone",function(){
				$(".screen3", slide).fadeIn(function(){});
				$(".screen2,.screen1", slide).fadeOut(function(){});
			});
		
		/*pop12*/		
			$(".pop_btn1",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('22');	
				},
				onHide: function(){		
				}
			});
		/*pop12*/
		
		/*pop16*/		
			$(".pop_btn2",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('23');
					setUpRef('24');
				},
				onHide: function(){		
				}
			});
		}
	else
		{
			
			$(".box_click_1", slide).bind("tapone",function(){
				$(".screen2", slide).show(function(){});
				$(".screen1,.screen3", slide).hide(function(){});
			});
				
			$(".box_click_2", slide).bind("tapone",function(){
				$(".screen3", slide).show(function(){});
				$(".screen2,.screen1", slide).hide(function(){});
			});
		
		/*pop12*/		
			$(".pop_btn1",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('22');	
				},
				onHide: function(){		
				}
			});
		/*pop12*/
		
		/*pop16*/		
			$(".pop_btn2",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('23');	
				},
				onHide: function(){		
				}
			});			
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