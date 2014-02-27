steal("./iscroll2.js");

drcom.Controllers.Menu.Base('drcom.Controllers.Menu.Custom',
        /** @Static */
                {
                    pluginName: 'customMenu',
                    defaults: {
                        submenu: $('<div>').attr('id', 'submenu'),
                        submenutemplate: '//menu/custom/views/subasset.ejs',
                        template: '//menu/custom/views/asset.ejs'
                    }
                },
        /** @Prototype */
        {
            init: function() {
                this._super.apply(this, [$.makeArray(arguments)]);
                this.menutarget.after(this.options.submenu);
                this.submenu = $("#submenu");
            },
            select: function(collection, event, asset) {
                var currentAsset = this.assets.lastSelected;
                var exsit = 0;
                var list = [];
                if (currentAsset.level == 0)
                {
                    list = currentAsset.submenu;
                    if (currentAsset.id == asset.id && drcom.navigation.models.flows.lastSelected.name == asset.flow)
                        exsit = 1;
                }
                if (currentAsset.level == 1)
                {
                    var parentPath = currentAsset.path.split('.')[0] + '.0';
                    var parentAsset = this.assets.findByPath(parentPath);
                    list = parentAsset.submenu;

                    if (parentAsset.id == asset.id && drcom.navigation.models.flows.lastSelected.name == asset.flow)
                        exsit = 1;
                }

                for (var i = 0; i < list.length; i++)
                {
                    if (list[i].id == asset.id)
                        exsit = 1;
                }
                if (exsit == 0 || this.submenu.data("initedSubmenu") == undefined)
                    this.renderSubmenu(asset.level == 0 ? asset : this.assets.findByPath(asset.path.split('.')[0] + '.0'));
                this.submenu.data("initedSubmenu", 1);
                this.submenu.addClass("hide");
                this._super.apply(this, $.makeArray(arguments));
            },
            hideMenu: function() {
                this.element.hide();
                this.isHidden = true;
            },
            renderSubmenu: function(asset) {                
                this.submenu.html(this.view(this.options.submenutemplate, {
                    asset: asset
                }));
                if (asset.submenu.length > 0) {
                    this.setSubmenuPosition();
                }

            },
            '.handle tapone': function(el, ev) {
                $("#submenu").addClass("animation").toggleClass("hide");
            },
            setSubmenuPosition: function() {

                this.scroller = new iScroll2($("#submenu #submenutarget")[0], {
                    scrollbarClass: "scroll",
                    hideScrollbar: true,
                    checkDOMChange: true,
                    checkDOMChanges: true,
                    vScroll: false,
                    hScroll: true
                });
                window.scroller = this.scroller;


            },
            setCurrentStyle: function(asset) {


                $('li.selected', this.element).removeClass('selected');
                asset.elements().addClass('selected');

                if (asset.level == 0) {

                    if (asset.submenu.length > 0)
                    {
                        asset.submenu.first().elements().addClass('selected');
                    }
                }
                if (asset.level == 1) {

                    var parentPath = asset.path.split('.')[0] + '.0';
                    if (typeof parentPath != 'undefined') {
                        var parentAsset = this.assets.findByPath(parentPath);
                        parentAsset.elements().addClass('selected');
                    }
                }

                var selected = $('#submenu li.selected');
                if (selected.length == 0)
                    return;
                var left = selected[0].offsetLeft;
                var scroll = this.scroller.x;
                var width = selected.width();
                var viewWidth = $("#submenu #submenutarget").width();
                var scrollWidth = $("#submenu #scroller").width();
                console.log(left + this.scroller.x, viewWidth);
                if (left + this.scroller.x >= 491)
                {
                    var x = -((left - viewWidth) + width);//-left;
                    this.scroller._pos(x, 0);
                }
                else if (left + this.scroller.x <= 0) {
                    this.scroller._pos(0, 0);
                }
                else
                {
                    if (left + this.scroller.x + width <= 0)
                    {
                        var x = -left;
                        if (x > 0)
                            x = 0;
                        scroller._pos(x, 0);

                    }
                    /*for (var i = 0; i < list.length; i++) {
                     if (li[0] == list[i]) {
                     var left = i * width;
                     var scroll = this.scroller.x;
                     //var view=left-scroll;
                     if (left - scroll + width > 860) {
                     var scrollwidth = $("#scroller").width();
                     var x = -(left - scroll);
                     if (Math.abs(x) > scrollwidth - 860)
                     x = -Math.abs(scrollwidth - 860);
                     
                     scroller._pos(x, 0);
                     }
                     
                     if (Math.abs(scroller.x) > left) {//left
                     scroller._pos(-left, 0);
                     }
                     if (left > Math.abs(scroller.x) + 860) {//right
                     scroller._pos(-(left - 695), 0);
                     }
                     }
                     }
                     */

                }



            }
        });
