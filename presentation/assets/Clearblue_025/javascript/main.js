(function() {
	$('#slider').on('ready', '.Clearblue_025', function(e, el) {
		var slide = $('#container', el);

	
		if(isAnimation)
		{
				
			$('.box',slide).delay(200).fadeIn(600); 
			$('.pop_btn1',slide).delay(200).fadeIn(900); 
			$('.pop_btn2',slide).delay(900).fadeIn(1000); 
			$('.pop_btn3',slide).delay(1500).fadeIn(1200); 
		
		/*pop36*/		
			$(".pop_btn1",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('39');	
				},
				onHide: function(){		
				}
			
			});
			
		/*pop36*/
		
		/*pop37*/		
			$(".pop_btn2",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('40');	
				},
				onHide: function(){		
				}
			});
		/*pop37*/
		/*pop39*/		
			$(".pop_btn3",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('41');	
				},
				onHide: function(){		
				}
			});
		/*pop39*/
		}
	else
		{
			/*pop36*/		
			$(".pop_btn1",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('11');	
				},
				onHide: function(){		
				}
			});
		/*pop36*/
		
		/*pop37*/		
			$(".pop_btn2",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('12');	
				},
				onHide: function(){		
				}
			});
		/*pop37*/
		/*pop39*/		
			$(".pop_btn3",slide).drcom_customizepopup({
				closeInside: false,
				closeOutside: false,
				onShow: function(){
					setUpRef('53');	
				},
				onHide: function(){		
				}
			});
		/*pop39*/
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