(function() {
    $('#slider').on('ready', '.Clearblue_002', function(e, el) {
        var slide = $('.Clearblue_002');
        var video = $("#video", slide).drcom_video({
            autoplay: true,
            // loop: true,
            srt: {
                callback: function(id, text, during, subtitles) {
                    switch (id) {
                        case 1:
                            $(".s1_t1,.s2_t1,.s1_t2", slide).fadeIn();
                            break;
                        case 2:
                            
                            
                            break;
                        case 3:
							$(".bubble_1_1", slide).fadeIn();
							$(".s1_t2", slide).hide();
							$(".s2_t2", slide).fadeIn();
                            $(".s2_t2", slide).hide();
                            $(".s3_t1", slide).fadeIn();
                            setTimeout(function() {
                                $(".bubble_1", slide).fadeIn();
                            }, 1500);
                            break;
                        case 4:
                            $(".s3_t1", slide).hide();
                            $(".s3_t2", slide).fadeIn();
							
                            break;
                        case 5:
                            
                            
							$(".s3_t2_1", slide).delay(1000).fadeIn();
							
                            break;
						case 5.2:
							$(".s3_t2, .s3_t2_1", slide).hide();
							$(".s4_t1", slide).fadeIn();
                            $(".bubble_1_1", slide).hide();
							 $(".s3_t3", slide).fadeIn();
                            break;
                        case 5.5:
                            $(".bubble_2", slide).fadeIn();
							
                            break;
                        case 6:
                            $(".s4_t1", slide).hide();
                            $(".s5_t1,.bubble_3", slide).fadeIn();
                            break;
                        case 7:
                            
                            break;
                        case 7.5:
                            
                            
                            $(".bubble_2,.bubble_3", slide).hide();
                            break;
                        case 8:
							$(".s6_t2", slide).fadeIn();
                            $(".s6_t1,.bubble_4", slide).fadeIn();
							$(".s5_t1", slide).hide();
                            $("#btnVideo", slide).hide();
                            break;
                    }
                }
            }

        }).controller();

        $('.replay', slide).on('tapone', function() {
            resetText();
            $("#btnVideo", slide).show();
            if ($("#btnVideo", slide).hasClass('playpause'))
                $("#btnVideo", slide).toggleClass('playpause');
            $(".s1_t1,.s2_t1,.s1_t2", slide).fadeIn();
            video.replay();
        });
        $('#btnVideo', slide).on('tapone', function() {
            if ($("#btnVideo", slide).hasClass('playpause'))
            {
                video.play();
            }
            else
            {
                video.pause();
            }
            $(this).toggleClass('playpause');
        });

        function resetText() {
            $(".s1_t2,.s2_t2,.s3_t1,.s3_t2,.s3_t3,.s4_t1,.s5_t1,.bubble_2,.bubble_3,.bubble_1,.bubble_4,.s6_t1,.s6_t2", slide).hide();
        }
    });
})();