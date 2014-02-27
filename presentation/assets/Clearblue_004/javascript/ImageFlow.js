function ImageFlow() {
    "use strict";
    this.defaults = {
        animationSpeed: 20, /* Animation speed in ms */
        aspectRatio: 1.964, /* Aspect ratio of the ImageFlow container (width divided by height) */
        captions: true, /* Toggle captions */
        imageFlowID: 'imgFlow', /* Default id of the ImageFlow container */
        imageFlowParent: '',
        imageFocusM: 1.0, /* Multiplicator for the focussed image size in percent */
        imageFocusMax: 4, /* Max number of images on each side of the focussed one */
        imageScaling: true, /* Toggle image scaling */
        imagesHeight: 0.67, /* Height of the images div container in percent */
        imagesM: 1.0, /* Multiplicator for all images in percent */
        onClick: function (index) { },   /* Onclick behaviour */
        onTapone: function (el) { },
        percentLandscape: 118, /* Scale landscape format */
        percentOther: 100, /* Scale portrait and square format */
        scrollbarP: 0.6, /* Width of the scrollbar in percent */
        slider: true, /* Toggle slider */
        sliderCursor: 'e-resize', /* Slider cursor type - default is 'default' */
        sliderWidth: 14, /* Width of the slider in px */
        startID: 1, /* Image ID to begin with */
        glideToStartID: true, /* Toggle glide animation to start ID */
        startAnimation: false, /* Animate images moving in from the right on startup */
        xStep: 150 /* Step width on the x-axis in px */
    };

    /* Closure for this */

    var my = this;

    this.init = function ImageFlow_init(options) {
        /* Evaluate options */
        for (var name in my.defaults) {
            this[name] = (options !== undefined && options[name] !== undefined) ? options[name] : my.defaults[name];
        }

        /* Get ImageFlow Div element */
        var imgFlowDiv = null;
        if (my.imageFlowParent)
            imgFlowDiv = $('#' + my.imageFlowID, my.imageFlowParent)[0];
        else
            imgFlowDiv = document.getElementById(my.imageFlowID);

        if (imgFlowDiv) {
            /* Set it global within the ImageFlow scope */
            imgFlowDiv.style.visibility = 'visible';
            this.imgFlowDiv = imgFlowDiv;
            this.isBlock = false;
            /* Try to create XHTML structure */
            if (this.createStructure()) {
                this.imgsDiv = document.getElementById(my.imageFlowID + '_images');
                this.captionDiv = document.getElementById(my.imageFlowID + '_caption');
                this.navDiv = document.getElementById(my.imageFlowID + '_navigation');
                this.scrollBarDiv = document.getElementById(my.imageFlowID + '_scrollBar');
                this.sliderDiv = document.getElementById(my.imageFlowID + '_slider');

                this.indexArray = [];
                this.current = 0;
                this.imgID = 0;
                this.target = 0;
                this.memTarget = 0;
                this.firstRefresh = true;
                this.firstCheck = true;
                this.busy = false;
                this.imgClick = -1;

                var w = this.imgFlowDiv.offsetWidth;
                var h = Math.round(w / my.aspectRatio);
                imgFlowDiv.style.height = h + 'px';

                my.refresh();
                /* Initialize touch */
                my.MouseDrag.init();
                my.Touch.init();
                /* Toggle scrollbar visibility */
                if (my.slider) my.scrollBarDiv.style.visibility = 'visible';

            }
        }
    };

    this.createStructure = function ImageFlow_createStructure() {
        /* Create image div container */
        var imgsDiv = my.Helper.createDocumentElement('div', 'images');

        /* Shift all images into the images div */
        var node, version, src, imgNode, max = my.imgFlowDiv.childNodes.length;

        for (var index = 0; index < max; index++) {
            node = my.imgFlowDiv.childNodes[index];
            if (node && node.nodeType == 1 && node.nodeName == 'IMG') {
                /* Clone image nodes and append them to the images div */
                imgNode = node.cloneNode(true);
                imgsDiv.appendChild(imgNode);
            }
        }

        /* Create captions div container */
        var captionDiv = my.Helper.createDocumentElement('div', 'caption');

        /* Create slider and button div container inside the scrollbar div */
        var scrollBarDiv = my.Helper.createDocumentElement('div', 'scrollBar');
        var sliderDiv = my.Helper.createDocumentElement('div', 'slider');
        scrollBarDiv.appendChild(sliderDiv);

        /* Create navigation div container beneath images div */
        var navDiv = my.Helper.createDocumentElement('div', 'navigation');
        //navDiv.appendChild(captionDiv);
        my.imgFlowDiv.appendChild(captionDiv);
        navDiv.appendChild(scrollBarDiv);

        /* Update document structure and return true on success */
        var success = false;
        if (my.imgFlowDiv.appendChild(imgsDiv) && my.imgFlowDiv.appendChild(navDiv)) {
            /* Remove image nodes outside the images div */
            max = my.imgFlowDiv.childNodes.length;
            for (var index = 0; index < max; index++) {
                node = my.imgFlowDiv.childNodes[index];
                if (node && node.nodeType == 1 && node.nodeName == 'IMG') {
                    my.imgFlowDiv.removeChild(node);
                }
            }
            success = true;
        }

        return success;
    };

    /* Cache EVERYTHING that only changes on refresh or resize of the window */
    this.refresh = function ImageFlow_refresh() {
        /* Cache global variables */
        this.imgsDivWidth = my.imgsDiv.offsetWidth + my.imgsDiv.offsetLeft;
        this.maxHeight = Math.round(my.imgsDivWidth / my.aspectRatio);
        this.maxFocus = my.imageFocusMax * my.xStep;
        this.size = my.imgsDivWidth * 0.5;
        this.sliderWidth = my.sliderWidth * 0.5;
        this.scrollBarWidth = (my.imgsDivWidth - (Math.round(my.sliderWidth) * 2)) * my.scrollbarP;

        this.imgsDivHeight = Math.round(my.maxHeight * my.imagesHeight);

        /* Change imageflow div properties */
        my.imgFlowDiv.style.height = my.maxHeight + 'px';

        /* Change images div properties */
        my.imgsDiv.style.height = my.imgsDivHeight + 'px';

        /* Change images div properties */
        my.navDiv.style.height = (my.maxHeight - my.imgsDivHeight) + 'px';

        /* Change captions div properties */
        my.captionDiv.style.width = my.imgsDivWidth + 'px';
        my.captionDiv.style.paddingTop = Math.round(my.imgsDivWidth * 0.02) + 'px';

        /* Change scrollbar div properties */
        my.scrollBarDiv.style.width = my.scrollBarWidth + 'px';
        my.scrollBarDiv.style.marginTop = Math.round(my.imgsDivWidth * 0.02) + 'px';
        my.scrollBarDiv.style.marginLeft = Math.round(my.sliderWidth + ((my.imgsDivWidth - my.scrollbarWidth) / 2)) + 'px';

        /* Set slider attributes */
        my.sliderDiv.onmousedown = function () { my.MouseDrag.start(this); return false; };

        /* Set image attributes */
        var max = my.imgsDiv.childNodes.length;
        var i = 0;
        var img = null;
        for (var index = 0; index < max; index++) {
            img = my.imgsDiv.childNodes[index];
            if (img !== null && img.nodeType == 1 && img.nodeName == 'IMG') {
                this.indexArray[i] = index;

                /* Set image attributes to store values */
                img.url = img.getAttribute('src');
                img.xPosition = (-i * my.xStep);
                img.i = i;
                /* Add width and height as attributes only once */

                if (my.firstRefresh) {
                    if (img.getAttribute('width') !== null && img.getAttribute('height') !== null) {
                        img.w = img.getAttribute('width');
                        img.h = img.getAttribute('height');
                    } else {
                        img.w = img.width;
                        img.h = img.height;
                    }
                }

                /* Check source image format. Get image height minus reflection height! */
                if ((img.w) > (img.h)) {
                    /* Landscape format */
                    img.pc = my.percentLandscape;
                    img.pcMem = my.percentLandscape;
                }
                else {
                    /* Portrait and square format */
                    img.pc = my.percentOther;
                    img.pcMem = my.percentOther;
                }

                /* Change image positioning */
                if (my.imageScaling === false) {
                    img.style.position = 'relative';
                    img.style.display = 'inline';
                }

                img.style.webkitTransform = 'translate3d(0, 0, 0)';
                /* Set image cursor type */
                //img.style.cursor = my.imageCursor;
                i++;
            }
        }

        this.max = my.indexArray.length;

        /* Override dynamic sizes based on the first image */
        if (my.imageScaling === false) {
            img = my.imgsDiv.childNodes[my.indexArray[0]];

            /* Set left padding for the first image */
            this.totalImgsWidth = img.w * my.max;
            img.style.paddingLeft = (my.imgsDivWidth / 2) + (img.w / 2) + 'px';

            /* Override images and navigation div height */
            my.imgsDiv.style.height = img.h + 'px';
            my.navDiv.style.height = (my.maxHeight - img.h) + 'px';
        }

        /* Handle startID on the first refresh */
        if (my.firstRefresh) {
            /* Reset variable */
            my.firstRefresh = false;

            /* Set imageID to the startID */
            my.imgID = my.startID - 1 < 0 ? 0 : my.startID - 1;
            if (my.imgID < 0) my.imgID = 0;

            /* Make sure, that the id is smaller than the image count  */
            var maxId = my.max - 1;
            if (my.imgID > maxId) my.imgID = maxId;

            /* Toggle glide animation to start ID */
            if (my.glideToStartID === false) {
                my.moveTo(-my.imgID * my.xStep);
            }

            /* Animate images moving in from the right */
            if (my.startAnimation) {
                my.moveTo(5000);
            }
        }
        /* Only animate if there is more than one image */
        if (my.max > 1) {
            my.glideTo(my.imgID);
        }

        /* Display images in current order */
        my.moveTo(my.current);
    }

    /* Main animation function */
    this.moveTo = function ImageFlow_moveTo(x) {
        this.current = x;
        this.zIndex = my.max;

        /* Main Loop */
        for (var index = 0; index < my.max; index++) {

            var img = my.imgsDiv.childNodes[my.indexArray[index]];
            var currentImg = index * -my.xStep;

            /* Enabled image scaling */
            if (my.imageScaling) {
                /* Don't display images that are not conf_focussed */
                if ((currentImg + my.maxFocus) < my.memTarget || (currentImg - my.maxFocus) > my.memTarget) {
                    img.style.visibility = 'hidden';
                    img.style.display = 'none';
                } else {
                    var z = (Math.sqrt(10000 + x * x) + 100) * my.imagesM;
                    var xs = x / z * my.size + my.size;

                    /* Still hide images until they are processed, but set display style to block */
                    img.style.display = 'block';

                    /* Process new image height and width */
                    var newImgH = (img.h / img.w * img.pc) / z * my.size;
                    var newImgW = 0;
                    switch (newImgH > my.maxHeight) {
                        case false:
                            newImgW = img.pc / z * my.size;
                            break;
                        default:
                            newImgH = my.maxHeight;
                            newImgW = img.w * newImgH / img.h;
                            break;
                    }

                    var newImgTop = (my.imgsDivHeight - newImgH);

                    /* Set new image properties */
                    img.style.left = (xs - (img.pc / 2) / z * my.size).toFixed(2) + 'px';
                    if (newImgH && newImgW) {
                        img.style.height = newImgH.toFixed(2) + 'px';
                        img.style.width = newImgW.toFixed(2) + 'px';
                        newImgTop = newImgTop < 0 ? 0 : newImgTop;
                        img.style.top = newImgTop.toFixed(2) + 'px'
                    }
                    img.style.visibility = 'visible';
                    /* Set image layer through zIndex */
                    switch (x < 0) {
                        case true:
                            this.zIndex++;
                            break;

                        default:
                            this.zIndex = my.zIndex - 1;
                            break;
                    }

                    /* Change zIndex and onclick function of the focussed image */

                    switch (img.i == my.imgID) {
                        case false:
                            //img.onclick = function () { my.glideTo(this.i); };
                            $(img).unbind('tapone mousedown').bind('tapone', function () {
                                my.glideTo(this.i);
                            });
                            break;

                        default:
                            this.zIndex = my.zIndex + 1;
                            if (my.imgClick == -1)
                                $(img).unbind('tapone mousedown').bind('tapone', my.onTapone);
                            break;
                    }
                    img.style.zIndex = my.zIndex;
                }
            } else { // disable scale
                if ((currentImg + my.maxFocus) < my.memTarget || (currentImg - my.maxFocus) > my.memTarget) {
                    img.style.visibility = 'hidden';
                }
                else {
                    img.style.visibility = 'visible';

                    /* Change onclick function of the focussed image */
                    switch (img.i == my.imgID) {
                        case false:
                            img.onclick = function () { my.glideTo(this.i); };
                            break;
                        default:
                            //$(img).unbind('tapone').bind('tapone', my.onTapone);
                            break;
                    }
                }
                my.imgsDiv.style.marginLeft = (x - my.totalImgsWidth) + 'px';
            }
            x += my.xStep;
        }
    }

    /* Initializes image gliding animation */
    this.glideTo = function ImageFlow_glideTo(imgID) {
        /* Check for jump points */
        var jumpTarget, clonedImgID;

        /* Calculate new image position target */
        var x = -imgID * my.xStep;
        this.target = x;
        this.memTarget = x;
        this.imgID = imgID;

        /* Display new caption */
        var caption = '';
        if (my.imgsDiv.childNodes[imgID].nodeType == 1) caption = my.imgsDiv.childNodes[imgID].getAttribute('alt');

       // if (caption.length === 0) caption = '&nbsp;';

        my.captionDiv.innerHTML = caption;

        /* Set scrollbar slider to new position */
        if (my.MouseDrag.busy === false) {
            this.newSliderX = (imgID * my.scrollBarWidth) / (my.max - 1) - my.MouseDrag.newX;
            my.sliderDiv.style.marginLeft = (my.newSliderX - my.sliderWidth) + 'px';
        }

        /* Move the images to the jump target */

        if (jumpTarget) my.moveTo(jumpTarget);

        /* Animate gliding to new x position */
        if (my.busy === false) {
            my.busy = true;
            my.animate();
        }
    }

    /* Animates image gliding */
    this.animate = function ImageFlow_animate() {

        switch (my.target < my.current - 1 || my.target > my.current + 1) {
            case true:
                my.imgClick++;
                my.moveTo(my.current + (my.target - my.current) / 3);
                window.setTimeout(my.animate, my.animationSpeed);
                my.busy = true;
                break;
            default:
                if (my.imgClick == -1) {
                    var current = my.startID - 1;
                    var img = my.imgsDiv.childNodes[my.indexArray[current]];

                    $(my.imgsDiv).data('current', img);
                    $(img).unbind('tapone').bind('tapone', my.onTapone);

                }
                if (my.imgClick == 0) {
                    var current = (my.target < 0 ? -my.target : my.target) + "";
                    current = parseInt(current.substring(0, 1));

                    var img = my.imgsDiv.childNodes[my.indexArray[current]];
                    $(my.imgsDiv).data('current', img);
                    console.log('call', $(img).position().left, $(img).height(), my.imgClick);
                    my.onTapone(img);
                }
                my.busy = false;
                my.imgClick = 0;
                break;
        }
    }

    /* Used by user events to call the glideTo function*/
    this.glideOnEvent = function ImageFlow_glideOnEvent(imgID) {
        my.glideTo(imgID);
    }

    /* Mouse Dragging */
    this.MouseDrag = {
        object: null,
        objectX: 0,
        mouseX: 0,
        newX: 0,
        busy: false,

        /* Init mouse event listener */
        init: function MouseDragInit() {
            my.Helper.addEvent(my.imgFlowDiv, 'mousemove', my.MouseDrag.drag);
            my.Helper.addEvent(my.imgFlowDiv, 'mouseup', my.MouseDrag.stop);
            my.Helper.addEvent(document, 'mouseup', my.MouseDrag.stop);

            /* Avoid text and image selection while dragging */
            my.imgFlowDiv.onselectstart = function imgFlowDiv_selectstart() {
                var selection = true;
                if (my.MouseDrag.busy) selection = false;
                return selection;
            };
        },
        start: function MouseDragStart(o) {
            my.MouseDrag.object = o;
            my.MouseDrag.objectX = my.MouseDrag.mouseX - o.offsetLeft + my.newSliderX;
        },
        stop: function MouseDragStop() {
            my.MouseDrag.object = null;
            my.MouseDrag.busy = false;
        },
        drag: function MouseDrag(e) {
            var posX = 0;
            if (!e) e = window.event;
            if (e.pageX) posX = e.pageX;
            else if (e.clientX) posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            my.MouseDrag.mouseX = posX;

            if (my.MouseDrag.object !== null) {
                var newX = (my.MouseDrag.mouseX - my.MouseDrag.objectX) + my.sliderWidth;

                /* Make sure, that the slider is moved in proper relation to previous movements by the glideTo function */
                if (newX < (-my.newSliderX)) newX = -my.newSliderX;
                if (newX > (my.scrollBarWidth - my.newSliderX)) newX = my.scrollBarWidth - my.newSliderX;

                /* Set new slider position */
                var step, imgID;

                step = (newX + my.newSliderX) / (my.scrollBarWidth / (my.max - 1));
                imgID = Math.round(step);

                my.MouseDrag.newX = newX;
                my.MouseDrag.object.style.left = newX + 'px';
                if (my.imgID !== imgID) my.glideOnEvent(imgID);
                my.MouseDrag.busy = true;
            }
        }
    };

    /* Safari touch events on the iPhone and iPod Touch */
    this.Touch = {
        x: 0,
        startX: 0,
        stopX: 0,
        busy: false,
        first: true,

        /* Init touch event listener */
        init: function () {
            my.Helper.addEvent(my.navDiv, 'touchstart', my.Touch.start);
            my.Helper.addEvent(document, 'touchmove', my.Touch.handle);
            my.Helper.addEvent(document, 'touchend', my.Touch.stop);
        },
        isOnNavigationDiv: function (e) {
            var state = false;
            if (e.touches) {
                var target = e.touches[0].target;
                if (target === my.navDiv || target === my.sliderDiv || target === my.scrollBarDiv) state = true;
            }

            return state;
        },
        getX: function (e) {

            var x = 0, touches = e.touches || e.targetTouches;
            x = touches[0].pageX;
            return x;
        },
        start: function (e) {
            my.Touch.startX = my.Touch.getX(e);
            my.Touch.busy = true;
            my.Helper.suppressBrowserDefault(e);
        },
        isBusy: function () {
            var busy = false;
            if (my.Touch.busy) busy = true;
            return busy;
        },
        /* Handle touch event position within the navigation div */
        handle: function (e) {

            if (my.Touch.isBusy && my.Touch.isOnNavigationDiv(e)) {
                var max = (my.max - 1);
                if (my.Touch.first) {
                    my.Touch.stopX = (max - my.imgID) * (my.imgsDivWidth / max);
                    my.Touch.first = false;
                }
                var newX = -(my.Touch.getX(e) - my.Touch.startX - my.Touch.stopX);

                /* Map x-axis touch coordinates in range of the ImageFlow width */
                if (newX < 0) newX = 0;
                if (newX > my.imgsDivWidth) newX = my.imgsDivWidth;

                my.Touch.x = newX;

                var imgID = Math.round(newX / (my.imgsDivWidth / max));

                imgID = max - imgID;

                if (my.imgID !== imgID) {
                    my.glideOnEvent(imgID);
                }
                my.Helper.suppressBrowserDefault(e);
            }
        },
        stop: function Touch_stop() {
            my.Touch.stopX = my.Touch.x;
            my.Touch.busy = false;
        }
    };

    this.Helper = {
        addEvent: function Helper_addEvent(obj, type, fn) {
            if (obj.addEventListener) obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () { obj["e" + type + fn](window.event); };
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        removeEvent: function Helper_removeEvent(obj, type, fn) {
            if (obj.removeEventListener) obj.removeEventListener(type, fn, false);
            else if (obj.detachEvent) {
                /* The IE breaks if you're trying to detach an unattached event http://msdn.microsoft.com/en-us/library/ms536411(VS.85).aspx */
                if (obj[type + fn] === undefined) {
                    alert('Helper.removeEvent » Pointer to detach event is undefined - perhaps you are trying to detach an unattached event?');
                }
                obj.detachEvent('on' + type, obj[type + fn]);
                obj[type + fn] = null;
                obj['e' + type + fn] = null;
            }
        },
        createDocumentElement: function Helper_createDocumentElement(type, id, optionClass) {
            var el = document.createElement(type);
            el.setAttribute('id', my.imageFlowID + '_' + id);
            if (optionClass !== undefined) id += '' + optionClass;
            my.Helper.setClassName(el, id);
            return el;
        },
        setClassName: function Helper_setClassName(el, className) {
            if (el) {
                el.setAttribute('class', className);
                el.setAttribute('className', className);
            }
        },
        /* Suppress default browser behaviour to avoid image/text selection while dragging */
        suppressBrowserDefault: function Helper_suppressBrowserDefault(e) {
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
    };

}