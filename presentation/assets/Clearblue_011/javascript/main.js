(function() {
    $('#slider').on('ready', '.Clearblue_011', function(e, el) {
        var slide = $('.Clearblue_011'), action = false;
        var video = $("#video", slide).drcom_video({
            autoplay: true,
            // loop: true,
            srt: {
                callback: function(id, text, during, subtitles) {
                    switch (id) {
                        case 1:
                            $(".s1_t1,.s2_t1,.c1_1,.c1_2,.c1_3", slide).fadeIn();
                            break;
                        case 2:
							
                            break;
                     
                        case 3:
							$(".c1_1,.c1_2,.c1_3", slide).hide();
							$(".c2_1", slide).fadeIn(); 
                            $(".bubble_1", slide).fadeIn();
                            $(".bubble_2", slide).fadeIn();
                            break;
                        
                        case 4:
							$(".c3_1", slide).delay(200).fadeIn();
                            $(".c2_1", slide).hide();
							break;
						case 5:
							$(".c4_1", slide).fadeIn();
							$(".c3_1", slide).hide();
							break;
                       case 5.1:
							
							
							$(".c4_2,#step6", slide).fadeIn();
							break;
                        case 6:
                            $(".c4_1,.c4_2,.bubble_1,.bubble_2", slide).hide();
                            $(".c5_1,", slide).fadeIn();
							
                            break;
                        case 7:
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
            $(".s1_t1,.s2_t1,.c1_1,.c1_2,.c1_3", slide).fadeIn();
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
            $(".s1_t1,.s2_t1,.c1_1,.c1_2,.c1_3,.c2_1,.c3_1,.c4_1,.c4_2,.c5_1,.bubble_1,.bubble_2,#step6", slide).hide();
        }
    });
})();