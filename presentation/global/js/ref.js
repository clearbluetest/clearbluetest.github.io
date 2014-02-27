(function (drcom) {
	drcom.ready(function ($) {

		$('#slider').on('ready', '.slide', function (ev, el) {

			var slide = $("#container",el);
			var currEl = null;
			
			currEl = $("#container",el).find('.ref').attr('class');

			if(currEl != null){
				currEl = currEl.substr(7,2);
				console.log(currEl);
				setUpRef(currEl);
			}
			
			function setUpRef(el){
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
			/*$(".ref", slide).each(function () {
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
						$($(this).attr("related"), slide).controller().toggle();
					});
				}
			});
			$("#refCo_orange", slide).show().css("visibility", "hidden");

			var number = Math.ceil($(".ref_content>div", slide).height() / $(".ref_content", slide).height());
			$("#refCo_orange", slide).hide().css("visibility", "visible");

			$(".ref_prev", slide).addClass("ref_button_disable");
			if (number == 1) {
				$(".ref_next", slide).addClass("ref_button_disable");
				return;
			}

			var pageCurrent = 0;
			$(".ref_button").click(function (ev) {
				if ($(this).hasClass("ref_button_disable")) {
					ev.stopImmediatePropagation();
					return false;
				}
			});
			$(".ref_next", slide).click(function () {
				pageCurrent++;
				$(".ref_content>div", slide).animate({
					transform : "translate3d(0px,-" + pageCurrent * $(".ref_content", slide).height() + "px,0px)"
				}, 800);

				if (pageCurrent == number - 1)
					$(this).addClass("ref_button_disable");
				$(".ref_prev", slide).removeClass("ref_button_disable");

			});
			$(".ref_prev", slide).click(function () {
				pageCurrent--;
				$(".ref_content>div", slide).animate({
					transform : "translate3d(0px,-" + pageCurrent * $(".ref_content", slide).height() + "px,0px)"
				}, 800);
				if (pageCurrent == 0)
					$(this).addClass("ref_button_disable");
				$(".ref_next", slide).removeClass("ref_button_disable");

			});
			alert('123');
			$("#container").delegate('.ref','tapone',function(){
				var currEl = $(this).attr('class');
console.log($(".ref"+currEl.substr(7,2)));
				$(".ref15",slide).controller().show();	
				
			});*/

		});

	});
})(drcom || {});
