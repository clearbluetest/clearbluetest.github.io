(function () {
    $('#slider').on('ready', '.Clearblue_018', function (e, el) {
        var slide = $('#container', el);
        $('.sheft', slide).delay(900).fadeIn(900);
        $('.sheft', slide).delay(1000).fadeOut(600);
        $('.sheft_hide', slide).delay(1600).fadeIn(600);
        $('.screen1', slide).delay(2200).fadeIn(600);
        $('.line_arrow', slide).delay(2200).fadeIn(600);
        $('.btn_play_1,.btn_play_2,.btn_play_3', slide).delay(2200).fadeIn(600);
        $('.btn_play_1_act', slide).delay(2200).fadeIn(600, function () {
            setSwipe();
        });

        /*$('.screen1').fadeIn(600);
		$('.btn_play_1_act').fadeIn();*/
        /*$('.btn_play_1').bind('click',function(){
            $('.screen1,.btn_play_1_act').show();
            $('.screen2, .screen3,.btn_play_2_act,.btn_play_3_act').hide();
            });
            $('.btn_play_2').bind('click',function(){
            $('.screen2,.btn_play_2_act').show();
            $('.screen1, .screen3,.btn_play_1_act,.btn_play_3_act').hide();
            });
        
        $('.btn_play_3').bind('click',function(){
            $('.screen3,.btn_play_3_act').show();
            $('.screen1,.screen2,.btn_play_1_act,.btn_play_2_act').hide();
            });*/



        var screen = 1;

        function setSwipe() {

            drcom.navigation.disableSwipe();

            slide.unbind('swipeleft swiperight');

            slide.bind('swipeleft', function () {
                screen++;
                if (screen > 3)
                    drcom.navigation.goToAsset("s19");
                else
                    showScreen(screen);
            });

            slide.bind('swiperight', function () {
                screen--;
                if (screen < 1)
                    drcom.navigation.goToAsset("s17");
                else
                    showScreen(screen);
            });

        }

        function showScreen(index) {
            switch (index) {
                case 1:
                    $('.screen1,.btn_play_1_act').show();
                    $('.screen2, .screen3,.btn_play_2_act,.btn_play_3_act').hide();
                    break;
                case 2:
                    $('.screen2,.btn_play_2_act').show();
                    $('.screen1, .screen3,.btn_play_1_act,.btn_play_3_act').hide();
                    break;
                default:
                    $('.screen3,.btn_play_3_act').show();
                    $('.screen1,.screen2,.btn_play_1_act,.btn_play_2_act').hide();
                    break;
            }
        };
        /*pop16*/
        /*	if(isAnimation)
            {
            $('.screen1').delegate('.btn_play_1','click',function(){
                    $('.btn_play_2').removeClass('active');
                    $('.btn_play_3').removeClass('active');
                    $(this).addClass('active');
                    $('.screen2').hide();
                    $('.screen3').hide();
                    $('.screen1').show();
                    
                });
                $('.screen1').delegate('.btn_play_2','click',function(){
                    $('.btn_play_1').removeClass('active');
                    $('.btn_play_3').removeClass('active');
                    $(this).addClass('active');
                    $('.screen1').hide();
                    $('.screen3').hide();
                    $('.screen2').show();
                    
                });
                $('.screen1').delegate('.btn_play_3','click',function(){
                    $('.btn_play_2').removeClass('active');
                    $('.btn_play_1').removeClass('active');
                    $(this).addClass('active');
                    $('.screen1').hide();
                    $('.screen2').hide();
                    $('.screen3').show();
                    
                });
                        
            }*/

        /*control ref	*/

        function setUpRef(el) {
            $('.next_btn').bind('click', function () {
                if ($('#refCo' + el + '_orange').css('display') == "block")
                    $(".ref" + el).controller().hide();
            });

            $('.pre_btn').bind('click', function () {
                if ($('#refCo' + el + '_orange').css('display') == "block")
                    $(".ref" + el).controller().hide();
            });
            $(".ref" + el).each(function () {
                if ($(this).attr("rel") != null) {

                    $(this).drcom_customizepopup({
                        closeInside: false,
                        effect: "split",
                        duration: 1000,
                        effectOptions: {
                            row: 3,
                            col: 6,
                            direction: "leftbottom"
                        }
                    });
                } else {
                    $(this).bind("click", function () {
                        $($(this).attr("related")).controller().toggle();
                    });
                }
            });
            $("#refCo" + el + "_orange").show().css("visibility", "hidden");

            var number = Math.ceil($(".ref" + el + " .ref_content>div").height() / $(".ref" + el + " .ref_content").height());
            $("#refCo" + el + "_orange").hide().css("visibility", "visible");

            $(".ref" + el + " .ref_prev").addClass("ref_button_disable");
            if (number == 1) {
                $(".ref" + el + " .ref_next").addClass("ref_button_disable");
                return;
            }

            var pageCurrent = 0;
            $(".ref" + el + " .ref_button").click(function (ev) {
                if ($(this).hasClass("ref_button_disable")) {
                    ev.stopImmediatePropagation();
                    return false;
                }
            });
            $(".ref" + el + " .ref_next").click(function () {
                pageCurrent++;
                $(".ref" + el + " .ref_content>div").animate({
                    transform: "translate3d(0px,-" + pageCurrent * $(".ref" + el + " .ref_content").height() + "px,0px)"
                }, 800);

                if (pageCurrent == number - 1)
                    $(this).addClass("ref_button_disable");
                $(".ref" + el + " .ref_prev").removeClass("ref_button_disable");

            });
            $(".ref_prev").click(function () {
                pageCurrent--;
                $(".ref" + el + " .ref_content>div").animate({
                    transform: "translate3d(0px,-" + pageCurrent * $(".ref" + el + " .ref_content").height() + "px,0px)"
                }, 800);
                if (pageCurrent == 0)
                    $(this).addClass("ref_button_disable");
                $(".ref" + el + " .ref_next").removeClass("ref_button_disable");

            });

            $(".refCo" + el + " .close_ref").bind('tapone', function () {
                $(".ref" + el).controller().hide();
            });
        }
        /*control ref	*/


    });
})();