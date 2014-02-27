(function() {
	$('#slider').on('ready', '.Clearblue_009', function(e, el) {
		var slide = $('#container', el);
		var checked = false;
		
		var myScroll = null;
		
		myScroll = new iScroll("scroller",{
			vScroll: true,
			vScrollbar: true,
			hideScrollbar:false,
			scrollbarClass:"",
			checkDOMChanges : true
		});
		

	if(isAnimation)
		{
						$(".screen1", slide).delay(500).hide();
							
						$(".title_2", slide).delay(100).fadeIn();
						$('.board1', slide).delay(1000).animate({opacity: 1,left: '65'}, 300,function(){
							$(".num_1, .b_t_1", slide).fadeIn();
						});
						$('.board2', slide).delay(2000).animate({opacity: 1,left: '65'}, 300,function(){
							$(".num_2, .b_t_2", slide).fadeIn();
						});
						$('.board3', slide).delay(3000).animate({opacity: 1,left: '65'}, 300,function(){
							$(".num_3, .b_t_3", slide).fadeIn();
						});
						$('.board4', slide).delay(4000).animate({opacity: 1,left: '65'}, 300,function(){
							$(".num_4, .b_t_4", slide).fadeIn();
						});
						$('.board5', slide).delay(5000).animate({opacity: 1,left: '65'}, 300,function(){
							$(".num_5, .b_t_5", slide).fadeIn();
						});
						$(".arrow", slide).delay(6000).fadeIn(function(){
							$('.board_pink', slide).animate({opacity: 1,left: '703'}, 300,function(){
								$(".txt1_pk", slide).fadeIn();
							});							
						});

				

				
						
			/*pop01*/		
				$(".pop_btn1",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('2');
						setUpRef('3');
						setUpRef('26');
						
						
					},
					onHide: function(){		
					}
				});
			/*pop01*/
			
			/*pop07*/		
				$(".pop_btn2",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('4');
						setUpRef('5');
						setUpRef('51');
					},
					onHide: function(){		
					}
				});
			/*pop07*/
			
			/*pop08*/		
				$(".pop_btn3",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('6');
						setUpRef('61');
						setUpRef('612');

					},
					onHide: function(){		
					}
				});
			/*pop08*/
			/*pop08*/		
				$(".pop_btn4",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('7');
						setUpRef('8');
						setUpRef('20');
						setUpRef('24');
						setUpRef('21');
						setUpRef('22');
						setUpRef('23');
						setUpRef('25');
						
					},
					onHide: function(){		
					}
				});
			/*pop08*/
			
		}
	else
		{
		
			$(".screen1,.no_c", slide).show();
			
			$('.Clearblue_005 #container').bind("swipeleft",function(){
				
					$(".screen1", slide).hide();
					$(".title_2", slide).show();
					$('.board1',slide).css({opacity: 1,left:'66px'});
					$(".num_1, .b_t_1", slide).show();
					
					$(".board2", slide).css({opacity: 1, left:'66px'});
					$(".num_2, .b_t_2", slide).show();
					
					$(".board3", slide).css({opacity: 1, left:'66px'});
					$(".num_3, .b_t_3", slide).show();
					
					$(".board4", slide).css({opacity: 1, left:'66px'});
					$(".num_4, .b_t_4", slide).show();
					
					$('.board_pink', slide).css({opacity: 1,left: '66'});
					$(".pop_btn1, .pop_btn2, .pop_btn3, .pop_btn4, .txt1_pk", slide).show();
					
			});
			
						/*pop01*/		
				$(".pop_btn1",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('2');
						setUpRef('3');
						setUpRef('26');
						
					},
					onHide: function(){		
					}
				});
			/*pop01*/
			
			/*pop07*/		
				$(".pop_btn2",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('5');
						setUpRef('4');
					},
					onHide: function(){		
					}
				});
			/*pop07*/
			
			/*pop08*/		
				$(".pop_btn3",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('6');
						setUpRef('61');

					},
					onHide: function(){		
					}
				});
			/*pop08*/
			/*pop08*/		
				$(".pop_btn4",slide).drcom_customizepopup({
					closeInside: false,
					closeOutside: false,
					onShow: function(){
						setUpRef('7');
						setUpRef('8');
						setUpRef('20');
						setUpRef('24');
						setUpRef('21');
						setUpRef('22');
						setUpRef('23');
						setUpRef('25');
					},
					onHide: function(){		
					}
				});
			/*pop08*/
			
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