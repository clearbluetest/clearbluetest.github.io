(function () {
    $('#slider').on('ready', '.Clearblue_013', function (e, el) {
        var slide = $('#container', el);

        var myScroll = null;

        myScroll = new iScroll("scroller", {
            vScroll: true,
            vScrollbar: true,
            hideScrollbar: false,
            scrollbarClass: "",
            checkDOMChanges: true
        });

        var current = 1;

        drcom.navigation.disableSwipe();
        slide.unbind('swipeleft swiperight');

        slide.bind('swipeleft', function () {
            current++;
            if (current > 3)
                drcom.navigation.goToAsset("s14");
            else
                showScreen(current);
        });

        slide.bind('swiperight', function () {
            current--;
            if (current < 1)
                drcom.navigation.goToAsset("s12");
            else
                showScreen(current);
        });

        function showScreen(index) {
            switch (index) {
                case 1:
                    console.log('show screen 1');
                    showScreen1();
                    break;
                case 2:
                    console.log('show screen 2');
                    showScreen2();
                    break;
                default:
                    console.log('show screen 3');
                    showScreen3();
                    break;
            }
        }

        function showScreen1() {
            $(".step2,.step2 .chart").stop().hide();
            $(".screen1 .step2", slide).delay(500).fadeIn(800, function () {
                $(".screen1 .chart").show("blind", {
                    direction: "horizon"
                }, 1000);
            });

            $(".screen1", slide).show();
            $(".screen2, .screen3", slide).hide();
            /*$(".point1", slide).show();
            $(".point2, .point3", slide).hide();
            $(".point1_inv", slide).hide();
            $(".point2_inv, .point3_inv", slide).show();*/
            $(".page_1", slide).show();
            $("page_2,.page_3,.page_4", slide).hide();

            $('.ref26', slide).show();
            $('.ref261', slide).hide();
            $('.ref262', slide).hide();
            $('.ref263', slide).hide();

        }
        function showScreen2() {
            $(".step2,.step2 .chart").stop().hide();
            $(".screen2 .step2", slide).delay(500).fadeIn(800, function () {
                $(".screen2 .chart").show("blind", {
                    direction: "horizon"
                }, 1000);
            });

            $(".screen2", slide).show();
            $(".screen1, .screen3", slide).hide();
            /*$(".point2", slide).show();
            $(".point1, .point3", slide).hide();
            $(".point1_inv, .point3_inv", slide).show();
            $(".point2_inv", slide).hide();*/
            $(".page_2", slide).show();
            $("page_1,.page_3,.page_4", slide).hide();

            $('.ref26', slide).hide();
            $('.ref261', slide).show();
            $('.ref262', slide).hide();
            $('.ref263', slide).hide();
        }
        function showScreen3() {
            $(".step2,.step2 .chart").stop().hide();
            $(".screen3 .step2", slide).delay(500).fadeIn(800, function () {
                $(".screen3 .chart").show("slide", {
                    direction: "down"
                }, 1000);
            });

            $(".screen1, .screen2", slide).hide();
            $(".screen3", slide).show();
            /*$(".point1, .point2", slide).hide();
            $(".point3", slide).show();
            $(".point1_inv, .point2_inv", slide).show();
            $(".point3_inv", slide).hide();*/
            $(".page_3,.page_4", slide).show();
            $("page_2,.page_1", slide).hide();

            $('.ref26', slide).hide();
            $('.ref261', slide).hide();
            $('.ref262', slide).show();
            $('.ref263', slide).show();
        }
        /*pop16*/
        if (isAnimation) {
            showScreen1();

            //$(".point2_inv", slide).bind("tapone", function () {
            //    $(".screen1", slide).hide();
            //    $(".screen2", slide).show();
            //    $(".screen3", slide).hide();
            //    $(".point1", slide).hide();
            //    $(".point2", slide).show();
            //    $(".point3", slide).hide();
            //    $(".point1_inv", slide).show();
            //    $(".point2_inv", slide).hide();
            //    $(".point3_inv", slide).show();
            //    $(".page_2", slide).show();
            //    $("page_1,.page_3,.page_4", slide).hide();


            //    showScreen2();

            //});
            //$(".point1_inv", slide).bind("tapone", function () {
            //    $(".screen1", slide).show();
            //    $(".screen2", slide).hide();
            //    $(".screen3", slide).hide();
            //    $(".point1", slide).show();
            //    $(".point2", slide).hide();
            //    $(".point3", slide).hide();
            //    $(".point1_inv", slide).hide();
            //    $(".point2_inv", slide).show();
            //    $(".point3_inv", slide).show();
            //    $(".page_1", slide).show();
            //    $("page_2,.page_3,.page_4", slide).hide();

            //    showScreen1();

            //});
            //$(".point3_inv", slide).bind("tapone", function () {
            //    $(".screen1", slide).hide();
            //    $(".screen2", slide).hide();
            //    $(".screen3", slide).show();
            //    $(".point1", slide).hide();
            //    $(".point2", slide).hide();
            //    $(".point3", slide).show();
            //    $(".point1_inv", slide).show();
            //    $(".point2_inv", slide).show();
            //    $(".point3_inv", slide).hide();
            //    $(".page_3,.page_4", slide).show();
            //    $("page_2,.page_1", slide).hide();

            //    showScreen3();

            //});
        }
        else {

        }

        setUpRef('261');
        setUpRef('262');
        setUpRef('263');

        //$(".point1_inv", slide).bind("tapone", function () {
        //    $('.ref26', slide).show();
        //    $('.ref261', slide).hide();
        //    $('.ref262', slide).hide();
        //    $('.ref263', slide).hide();
        //});
        //$(".point2_inv", slide).bind("tapone", function () {
        //    $('.ref26', slide).hide();
        //    $('.ref261', slide).show();
        //    $('.ref262', slide).hide();
        //    $('.ref263', slide).hide();
        //});
        //$(".point3_inv", slide).bind("tapone", function () {
        //    $('.ref26', slide).hide();
        //    $('.ref261', slide).hide();
        //    $('.ref262', slide).show();
        //    $('.ref263', slide).show();
        //});
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