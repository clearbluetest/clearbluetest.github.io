(function () {
    $('#slider').on('ready', '.Clearblue_017', function (e, el) {
        var slide = $('#container', el);

        /*pop16*/
        if (isAnimation) {

            /*pop26_27*/
            $(".btn_pu1", slide).drcom_customizepopup({
                closeInside: false,
                closeOutside: false,
                onShow: function () {

                },
                onHide: function () {
                }
            });

            /*pop26_27*/

            /*pop28_29_30*/
            $(".btn_pu2", slide).drcom_customizepopup({
                closeInside: false,
                closeOutside: false,
                onShow: function () {
                    setUpRef('30');

                },
                onHide: function () {
                }
            });

            /*pop31_32_33*/
            $(".btn_pu3", slide).drcom_customizepopup({
                closeInside: false,
                closeOutside: false,
                onShow: function () {
                    setUpRef('31');
                    setUpRef('33');
                    setUpRef('34');
                    setUpRef('39');
                    setUpRef('36');
                    setUpRef('38');
                    setUpRef('42');
                },
                onHide: function () {
                }
            });
            /*pop31_32_33*/



        }

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

        $.Controller("drcom.circle2", {
            defaults: {
                src: "",
                angle: 0,
                rotation: -90,
                duration: 0,
                change: function (value) { },
                loadCompleted: function () { },
            }
        }, {
            init: function () {
                var instance = this;
                this.render(this.options.loadCompleted);
                this.animating = false;

                var touch = 'ontouchstart' in document.documentElement;
                this.events = {
                    mousedown: touch == true ? "touchstart.circle" : "mousedown.circle",
                    mousemove: touch == true ? "touchmove.circle" : "mousemove.circle",
                    mouseup: touch == true ? "touchend.circle" : "mouseup.circle",
                };
                this.touch = touch;

                this.bind(this.events.mousedown, this.callback("_mousedown"));
            },
            render: function (callback) {
                var stage = new Kinetic.Stage({
                    container: this.element[0],
                    width: this.element.width(),
                    height: this.element.height()
                });
                this.layer = new Kinetic.Layer();
                stage.add(this.layer);
                this.loadImage(this.options.src, callback);
            },
            getDeg: function () {
                return this.circle.getAngle();
            },
            setDeg: function (deg) {
                this.change(deg * 100 / 360);
            },
            loadImage: function (src, callback) {
                var instance = this, layer = this.layer;
                var image = new Image();
                image.onload = function () {
                    var radius = instance.element.width() / 2;
                    instance.circle = new Kinetic.Wedge2({
                        width: instance.element.width(),
                        height: instance.element.height(),
                        radius: radius,
                        rotationDeg: instance.options.rotation,
                        angleDeg: instance.options.angle,
                        fillPatternImage: image,
                        fillPatternOffset: [-radius, -radius],
                        x: radius,
                        y: radius,
                        onSetAngleDeg: function (deg) {
                            var percent = deg * 100 / 360;
                            instance.options.change(percent);
                        }
                    });
                    layer.add(instance.circle);
                    layer.draw();
                    if (callback)
                        callback();


                };
                image.src = src;
            },
            _mousedown: function (e) {
                var ev = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                if (this.animating == true)
                    return;
                $(window).bind(this.events.mousemove, this.callback("_mousemove"));
                $(window).bind(this.events.mouseup, this.callback("_mouseup"));
            },
            _mousemove: function (e) {
                var ev = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                var pos = {
                    x: ev.pageX - this.element.offset().left,
                    y: ev.pageY - this.element.offset().top
                };
                var deg = this.getAngleFromPoint(parseInt(pos.x), parseInt(pos.y));
                this.setDeg(deg);
            },
            _mouseup: function (e) {
                var ev = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                $(window).unbind(this.events.mousemove);
                $(window).unbind(this.events.mouseup);
                this.options.release();
            },

            change: function (percent) {

                var deg = percent * 3.6;
                if (this.options.change(percent) == false)
                    return false;

                this.circle.setAngleDeg(deg);
                this.layer.draw();
            },

            scrollTo: function (percent, callback) {

                var deg = percent * 3.6;
                this.animating = true;
                var value = this.circle.getAngleDeg(), instance = this;

                var tween = new Kinetic.Tween({
                    node: this.circle,
                    duration: 2,
                    angleDeg: deg,
                    easing: Kinetic.Easings.Linear,
                    onFinish: function () {
                        instance.animating = false;
                    }

                });
                tween.play();
            },

            getAngleFromPoint: function (mouseX, mouseY) {
                var cx, cy;
                cx = cy = this.element.width() / 2;
                var radian = Math.atan2(mouseY - cy, mouseX - cx);
                var deg = radian * (180 / Math.PI) + 90;
                if (deg < 0)
                    deg = 360 + deg;
                return deg
            },
            destroy: function () {
                this._super();
                this.unbind("mousedown.circle");
            }
        });
    });
})();

$.Controller("drcom.circle2", {
    defaults: {
        src: "",
        angle: 0,
        rotation: -90,
        duration: 0,
        change: function (value) { },
        loadCompleted: function () { },
        release: function () { }
    }
}, {
    init: function () {
        var instance = this;
        this.render(this.options.loadCompleted);
        this.animating = false;
    },
    render: function (callback) {
        var stage = new Kinetic.Stage({
            container: this.element[0],
            width: this.element.width(),
            height: this.element.height()
        });
        this.layer = new Kinetic.Layer();
        stage.add(this.layer);
        this.loadImage(this.options.src, callback);
    },
    getDeg: function () {
        return this.circle.getAngle();
    },
    setDeg: function (deg) {
        this.change(deg * 100 / 360);
    },
    loadImage: function (src, callback) {
        var instance = this, layer = this.layer;
        var image = new Image();
        image.onload = function () {
            var radius = instance.element.width() / 2;
            instance.circle = new Kinetic.Wedge2({
                width: instance.element.width(),
                height: instance.element.height(),
                radius: radius,
                rotationDeg: instance.options.rotation,
                angleDeg: instance.options.angle,
                fillPatternImage: image,
                fillPatternOffset: [-radius, -radius],
                x: radius,
                y: radius,
                onSetAngleDeg: function (deg) {
                    var percent = deg * 100 / 360;
                    instance.options.change(percent);
                }
            });
            layer.add(instance.circle);
            layer.draw();
            if (callback)
                callback();
        };
        image.src = src;
    },
    change: function (percent) {

        var deg = percent * 3.6;
        if (this.options.change(percent) == false)
            return false;

        this.circle.setAngleDeg(deg);
        this.layer.draw();
    },

    scrollTo: function (percent, callback) {

        var deg = percent * 3.6;
        this.animating = true;
        var value = this.circle.getAngleDeg(), instance = this;

        var tween = new Kinetic.Tween({
            node: this.circle,
            duration: this.options.duration,
            angleDeg: deg,
            easing: Kinetic.Easings.Linear,
            onFinish: function () {
                instance.animating = false;
            }

        });
        tween.play();
    },

    getAngleFromPoint: function (mouseX, mouseY) {
        var cx, cy;
        cx = cy = this.element.width() / 2;
        var radian = Math.atan2(mouseY - cy, mouseX - cx);
        var deg = radian * (180 / Math.PI) + 90;
        if (deg < 0)
            deg = 360 + deg;
        return deg
    },
    destroy: function () {
        this._super();
    }
});