(function (drcom) {
	window.isAnimation=drcom.config.animation;
	drcom.ready(function ($) {
		
/*control ref	*/
                //$('#logo').addClass(drcom.navigation.currentAsset().flow);
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

		$(".home_btn").bind('tapone',function(){
			drcom.navigation.changeFlow("main","s1");
		});
		$(".closde_btn").bind('tapone',function(){
			drcom.navigation.changeFlow("flow2","s7");
		});
		$("#animationBG").drcom_slideshow({
			delay:5000,
			duration:1000,
			effectOptions:{
				changeParallel:1
			}
		}).controller().play();
		
		$('body').on('ready', '.slide', function (ev, el) {
			if (drcom.navigation.controllers.menu.isHidden == true && drcom.helpers.storage.get("isForcedHideMenu") == "1") {
				drcom.helpers.storage.remove("isForcedHideMenu");
				drcom.navigation.showMenu();
			}
			drcom.helpers.storage.set("prevAsset", drcom.navigation.currentAsset().name);
		});
		
		$('#slider').on('ready', '.slide', function (ev, el) {
                        setTimeout(function() {
                            $('.menumask').hide();
                        }, 500);
			$(".drcom_video").each(function () {
				$(this).controller().destroy();
			});
			
		});
		
		$('#slider').on('reset', '.slide', function () {
			drcom.navigation.enableSwipe();
		});
		$.effects.show = function (o) {
			return this.queue(function () {
				var el = $(this);
				var mode = $.effects.setMode(el, o.options.mode || 'hide');
				if (mode == "show")
					el.show();
				else
					el.hide();
				(o.callback && o.callback.apply(this, arguments));
				el.dequeue();
			});
		};
		$.fn.drcom_disableswipe = function () {
			if (drcom.navigation == null)
				return;
			$(this).bind("swipeleft swiperight", function (ev) {
				if (drcom.navigation.swipable() == false)
					return;
				drcom.navigation.disableSwipe();
				setTimeout(function () {
					drcom.navigation.enableSwipe();
				}, 300);
			});
		};
		function Measure() {
			var ul = $("<ul style='position:absolute;z-index:100;background:#000;color:red'></ul>").appendTo("body");
			var startTime = 0;
			$([drcom]).on('beforeSelect', function (e, el) {
				//console.log('beforeSelect', el);
				startTime = new Date().getTime();
			});
			$('#slider').on('ready', '.slide', function (ev, el) {
				var duration = new Date().getTime() - startTime;
				$("<li></li>").appendTo(ul).html(duration);
			});
		}
		
		var drcom_navigation_changeFlow=drcom.navigation.changeFlow;
		drcom.navigation.changeFlow=function(flowName){
			if(drcom.config.navigation.menu.autoHide[flowName]==true)
			{
				$("#logo,#menu").hide();
			}
			else
			{
                                $(".menumask").hide();
				$("#logo,#menu").show();
			}
                        $('#animationBG').attr('class',flowName);
			drcom_navigation_changeFlow.apply(this,arguments);
		}
		//Measure();
	});
})(drcom || {});
(function (drcom) {
	drcom.ready(function ($) {
		$.extend($.effects, {
			splitElement : function (element, row, col, show, type, container) {
				if (show == null)
					show = 1;
				var offset = element.show().css('visibility', 'hidden').offset();
				var width = Math.ceil(element.outerWidth() / row);
				var height = Math.ceil(element.outerHeight() / col);
				element.css({
					visibility : "visible"
				});
				element.hide();
				var matrix = [];
				if (container == null) {
					container = element.parent();
				}
				var offset_left = 0,
				offset_top = 0;
				for (i = 0; i < col; i++) {
					var top = offset_top + i * height;
					var erow = [];
					for (j = 0; j < row; j++) {
						var left = offset_left + j * width;
						var el = $("<div></div>");
						el.css({
							left : left,
							top : top,
							width : width,
							height : height,
							overflow : "hidden",
							position : "absolute",
							"z-index" : 10
						});
						if (show == false)
							el.css({
								display : "none"
							});
						var temp = element.clone();
						temp.css({
							left : -j * width,
							top : -i * height,
							display : "block",
							position : "absolute"
						});
						el.append(temp);
						erow.push(el);
					}
					matrix.push(erow);
				}
				if (type == null)
					type = 0;
				if (type == 0) {
					for (var i = 0; i < matrix.length; i++)
						for (var j = 0; j < matrix[i].length; j++)
							container.append(matrix[i][j]);
				}
				if (type == 1) {
					for (var i = 0; i < matrix.length; i++) {
						var row = $("<div></div>");
						for (var j = 0; j < matrix[i].length; j++) {
							row.append(matrix[i][j]);
						}
						container.append(row);
					}
				}
				if (type == 2) {
					for (var i = 0; i < matrix[0].length; i++) {
						var row = $("<div></div>");
						for (var j = 0; j < matrix.length; j++) {
							row.append(matrix[j][i]);
						}
						container.append(row);
					}
				}
				return matrix;
			}
		});
		$.effects.split = function (o) {
			return this.queue(function () {
				var args = arguments;
				var el = $(this),
				mode = $.effects.setMode(el, o.options.mode || 'hide');
				var options = $.extend({
						row : 1,
						col : 1,
						duration : 500,
						direction : "up",
						parallel : false,
						delay : 0
					}, o.options);
				var el2 = el.clone().empty().removeAttr("id").css("background", "none").appendTo(el.parent()).show();
				var matrix = $.effects.splitElement(el, options.col, options.row, 0, 0, el2);
				$(">div>div", el2).removeAttr("id");
				if (mode == "show")
					$(">div", el2).hide();
				else
					$(">div", el2).show();
				var aEl = [];
				for (var i = 0; i < matrix.length; i++) {
					for (var j = 0; j < matrix[i].length; j++) {
						aEl.push(matrix[i][j]);
					}
				}
				var row = options.row,
				col = options.col,
				duration = options.duration,
				direction = options.direction,
				timeStamp = duration / (row * col),
				parallel = options.parallel,
				delay = options.delay;
				function draw(line, callback) {
					if (line == null)
						return;
					var t = 0;
					for (var j = 0; j < line.length; j++) {
						t = t + duration - Math.random() * (duration + 300);
						$(line[j])[mode]("fade", t);
					}
					setTimeout(function () {
						callback();
					}, delay);
				}
				function drawAnimation(matrix, i, callback) {
					if (i < 0)
						callback();
					draw(matrix[i], function () {
						drawAnimation(matrix, i - 1, callback);
					});
				}
				var endAnimationCounter = 0;
				function randomAnimation(aEl, length, callback) {
					if (aEl.length == 0)
						return;
					var rand = Math.floor(Math.random() * aEl.length);
					var el = $(aEl[rand]);
					aEl.splice(rand, 1);
					if (parallel == false) {
						el[mode]("fade", timeStamp, function () {
							if (aEl.length > 0)
								randomAnimation(aEl, length, callback);
							else
								callback();
						});
					} else {
						el[mode]("fade", duration, function () {
							endAnimationCounter++;
							if (endAnimationCounter == length)
								callback();
						});
						setTimeout(function () {
							randomAnimation(aEl, length, callback);
						}, delay);
					}
				}
				function end() {
					el2.remove();
					if (mode == "show")
						el.show();
					(o.callback && o.callback.apply(el[0], args));
					el.dequeue();
				}
				if (direction == "up" || direction == "down")
					drawAnimation(matrix, row - 1, end);
				if (direction == "random")
					randomAnimation(aEl, aEl.length, end);
				function getList_BottomRight() {
					var lines = [];
					for (var i = row - 1; i >= 0; i--) {
						for (var j = col - 1; j >= 0; j--) {
							var line = [];
							if (i < row - 1 && j == col - 1)
								j = 0;
							var l = i,
							m = j;
							for (var k = 0; k < row + col; k++) {
								line.push(matrix[l][m]);
								l = l - 1;
								m = m + 1;
								if (l < 0 || m >= col)
									break;
							}
							lines.push(line);
						}
					}
					return lines;
				}
				function getList_TopLeft() {
					var lines = getList_BottomRight();
					var lines2 = [];
					for (var i = lines.length - 1; i >= 0; i--) {
						var line = [];
						for (var j = lines[i].length - 1; j >= 0; j--) {
							line.push(lines[i][j]);
						}
						lines2.push(line);
					}
					return lines2;
				}
				function getList_BottomLeft() {
					var lines = [];
					for (var i = row - 1; i >= 0; i--) {
						for (var j = 0; j < col; j++) {
							var line = [];
							if (i < row - 1 && j == 0)
								j = col - 1;
							var l = i,
							m = j;
							for (var k = 0; k < row + col; k++) {
								line.push(matrix[l][m]);
								l = l - 1;
								m = m - 1;
								if (l < 0 || m < 0)
									break;
							}
							lines.push(line);
						}
					}
					return lines;
				}
				function getList_Up() {
					var lines = [];
					for (var i = row - 1; i >= 0; i--) {
						var line = [];
						for (var j = 0; j < col; j++) {
							line.push(matrix[i][j]);
						}
						lines.push(line);
					}
					return lines;
				}
				function getList_RightTop() {
					var lines = getList_BottomLeft();
					var lines2 = [];
					for (var i = lines.length - 1; i >= 0; i--) {
						var line = [];
						for (var j = lines[i].length - 1; j >= 0; j--) {
							line.push(lines[i][j]);
						}
						lines2.push(line);
					}
					return lines2;
				}
				if (direction == "bottomright" || direction == "bottomleft" || direction == "leftbottom") {
					var lines = null;
					if (direction == "bottomright") {
						if (mode == "show")
							lines = getList_BottomLeft();
						else
							lines = getList_RightTop();
					}
					if (direction == "bottomleft") {
						if (mode == "show")
							lines = getList_BottomRight();
						else
							lines = getList_TopLeft();
					}
					if (direction == "leftbottom") {
						if (mode == "show")
							lines = getList_TopLeft();
						else
							lines = getList_BottomRight();
					}
					drawAnimation(lines, lines.length - 1, end);
				}
			});
		};
		$.effects.split2 = function (o) {
			return this.queue(function () {
				var args = arguments;
				var el = $(this),
				mode = $.effects.setMode(el, o.options.mode || 'hide');
				var options = $.extend({
					row : 1,
					col : 1,
					duration : 500,
					direction : "up",
					parallel : false,
					delay : 100
				}, o.options);
				var el2 = el.clone().empty().removeAttr("id").css("background", "none").appendTo(el.parent()).show();
				var matrix = $.effects.splitElement(el, 2, 1, 0, 0, el2);
				$(">div>div", el2).removeAttr("id");
				if (mode == "show")
					$(">div", el2).hide();
				else {
					$(">div", el2).show();
				}
				var row = options.row,
				col = options.col,
				duration = options.duration,
				delay = options.delay;
				var counter = 0;
				$(matrix[0][0])[mode]("split", {
					row : row,
					col : col,
					direction : "bottomleft",
					duration : duration,
					delay : delay,
					complete : function () {
						counter++;
						if (counter == 2)
							end();
					}
				});
				$(matrix[0][1])[mode]("split", {
					row : row,
					col : col,
					direction : "bottomright",
					duration : duration,
					delay : delay,
					complete : function () {
						counter++;
						if (counter == 2)
							end();
					}
				});
				function end() {
					el2.remove();
					if (mode == "show")
						el.show();
					$.isFunction(options.complete) && options.complete.apply(el[0], args);
					el.dequeue();
				}
			});
		};
		Drcom.Popup("Drcom.customizepopup", {
			defaults : {
				effectOptions : null
			}
		}, {
			show : function () {
				function showPopup() {
					this.options.onBeforeShow.apply();
					this.triggerInside = true;
					if (this.options.oneInstance == true)
						this.closeAllPopup([this.element[0]]);
					this.setPosition();
					var instance = this;
					this.container.show(this.options.effect, this.options.effectOptions, this.options.duration, function () {
						instance.onAfterShow();
					})
					if (this.mask != null) {
						this.mask.show();
					}
				}
				if (this.element.attr("rel").indexOf(".html") != -1) {
					var instance = this;
					var reload = 0;
					var arel = this.element.attr("rel").split("#");
					var file = arel[0];
					if (arel.length >= 2)
						reload = arel[1];
					if (this.container.attr("loadeddata") == "0" || reload == 1) {
						this.container.empty();
						this.container.load(this.element.attr("rel"), function () {
							instance.bindEvents();
							showPopup.apply(instance);
						})
						this.container.attr("loadeddata", 1);
					} else {
						showPopup.apply(this);
					}
				} else
					showPopup.apply(this);
			},
			hide : function () {
				this.options.onBeforeHide.apply(this);
				if (this.preventDefault == true)
					return;
				this.triggerInside = false;
				var instance = this;
				this.container.hide(this.options.effect, this.options.effectOptions, this.options.duration, function () {
					instance.onAfterHide();
					$.effects.restore(instance.container, ['top', 'bottom', 'left', 'right']);
					if (instance.mask != null) {
						instance.mask.hide();
					}
				})
			},
		});
	});
})(drcom || {});