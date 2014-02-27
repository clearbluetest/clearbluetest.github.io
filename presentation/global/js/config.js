var drcom = drcom || {};
drcom.config = {
    animation: true
};
drcom.config.include = {
    core: ['../../../presentation/global/css/font.css'],
    navigation: ['menu/custom'],
    content: ["plugins/plugins.js", "../../../presentation/global/js/js.js"]
};
drcom.config.debug = {
    host: 'int-dev.drcom.asia',
    enabled: false
};

drcom.config.navigation = {
    name: 'Clearblue_DDA_CN',
    slides: {
        data: 'presentation/slides.json',
        folder: 'presentation/assets/%slide.name%/',
        index: '%slide.name%.html'
    },
    flows: {
        list: {
            main: "presentation/flows/menu.json",
            flow1: "presentation/flows/menu1.json",
            flow2: "presentation/flows/menu2.json",
            flow3: "presentation/flows/menu3.json"
        }
    },
    stage: {
        layout: {width: 1024, height: 768}
    },
    slider: {
        layout: {width: 1024, height: 768},
        duration: 700
    },
    menu: {
        slideSorterPath: "presentation/captures/%slide.name%.jpg",
        layout: {width: 1024, height: 70, bottom: 0, left: 0},
        thumbPath: "presentation/thumbnails/%slide.name%.png",
        showTitle: true,
        autoHide: {
            main: true,
            flow1: false,
            flow2: false,
            flow3: false
        },
        autoShowSubmenu: true,
        plugin: 'customMenu',
        type: 'custom' //add this if using custom menu,        
    }
};