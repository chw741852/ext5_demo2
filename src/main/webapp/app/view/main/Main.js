/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',

    uses: ['app.view.main.region.Top', 'app.view.main.region.Bottom', 'app.view.main.region.Left',
    'app.view.main.region.Center', 'app.view.main.menu.MainMenuToolbar'],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    initComponent: function() {
        Ext.setGlyphFontFamily('FontAwesome');
        this.callParent();
    },

    items: [{
        xtype: 'maintop',
        region: 'north'
    },{
        xtype: 'mainmenutoolbar',
        region: 'north',
        hidden: true,
        bind: {
            hidden: '{!isToolbarMenu}'
        }
    }, {
        xtype: 'mainbottom',
        region: 'south'
    }, {
        xtype: 'mainleft',
        region: 'west',
        title: '导航菜单',
        // hidden : Cookies.get('menutoolbar', 'true') == 'true',
        width: 160,
        collapsible: true,
        split: true,
        hidden: true,
        bind: {
            hidden: '{!isTreeMenu}'
        }
    }, {
        xtype: 'maincenter',
        region: 'center'
    }]
});
