(function() {
    $('#slider').on('ready', '.Clearblue_002', function(e, el) {
        var slide = $('.Clearblue_002'), action = false;
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
                            $(".s1_t2", slide).hide();
                            $(".s2_t2", slide).fadeIn();
                            break;
                        case 3:
							$(".s3_t1", slide).fadeIn();
                            $(".s2_t2", slide).hide();
                            $(".s3_t1", slide).fadeIn();
                            setTimeout(function() {
                                $(".bubble_1", slide).show();
                            }, 1500);
                            break;
                        case 4:
                            $(".s3_t1", slide).hide();
                            $(".s3_t2,.bubble_1", slide).fadeIn();
                            break;
                        case 5:
                            $(".s3_t2", slide).hide();
                            $(".s4_t1,.s3_t3", slide).fadeIn();
                            break;
                        case 6:
                            $(".s4_t1", slide).hide();
                            $(".s5_t1", slide).fadeIn();
                            $('.bubble_2', slide).show();
                            $('.bubble_3', slide).delay(700).fadeIn(1);
                            break;
                        case 7:
                            $(".s5_t1,.bubble_2,.bubble_3", slide).hide();
                            $(".s6_t1,.s6_t2", slide).fadeIn();
                            $('.bubble_4', slide).fadeIn(1);
                            break;
                    }
                }
            }

        }).controller();
        
        $('.replay').on('tapone', function() {
            resetText();
            $(".s1_t1,.s2_t1,.s1_t2", slide).fadeIn();
            video.replay();
        });
        $('#btnVideo').on('tapone', function() {
            $(this).toggleClass('playpause');
            if (action)
            {
                action = false;
                video.play();
            }
            else
            {
                action = true;
                video.pause();
            }
        });
        
        function resetText(){
            $(".s1_t2,.s2_t2,.s3_t1,.s3_t2,.s4_t1,.s5_t1,.bubble_2,.bubble_3", slide).hide();
        }
    });
})();