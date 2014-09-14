/**
 * Created by cai on 2014/9/14 17:46.
 *
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */
Ext.define('app.view.main.menu.AccordionMainMenu', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accordionmainmenu',
    title: '系统菜单',
    iconCls: 'fa',
    glyph: 0xf0c9,

    layout: {
        type: 'accordion',
        animate: true
    },

    initComponent: function() {
        this.items = [];
        var menus = this.up('app-main').getViewModel().get('systemMenu');
        for (var i in menus) {
            var menuGroup = menus[i];
            var accpanel = {
                menuAccordion: true,
                xtype: 'panel',
                title: menuGroup.text,
                bodyStyle: {
                    padding: '10px'
                },
                layout: 'fit',
                dockedItems: [{
                    dock: 'left',
                    xtype: 'toolbar',
                    items: []
                }],
                iconCls: menuGroup.iconCls,
                glyph: menuGroup.glyph
            };

            for (var j in menuGroup.items) {
                var menuModule = menuGroup.items[j];
                accpanel.dockedItems[0].items.push({
                    xtype: 'buttontransparent',
                    text: this.addSpace(menuModule.text, 12),
                    iconCls: menuModule.iconCls,
                    glyph: menuModule.glyph,
                    handler: 'onMainMenuClick'
                });
            }

            this.items.push(accpanel);
        }

        this.callParent(arguments);
    },

    addSpace: function(text, len) {
//        console.log(text.length);
        var result = text;
        for (var i = text.length; i < len; i++) {
            result += '　';
        }

        return result;
    }
});