/**
 * Created by cai on 2014/9/13 16:20.
 *
 * 系统主页的顶部区域，主要放置系统名称，菜单，和一些快捷按钮
 */
Ext.define('app.view.main.region.Top', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintop',

    requires: ['Ext.Img'],
    uses: ['app.ux.ButtonTransparent', 'app.view.main.menu.ButtonMainMenu', 'app.view.main.menu.SettingMenu'],

    defaults: {
        xtype: 'buttontransparent'
    },

    items: [
        {
            xtype: 'image',
            bind: {
                hidden: '{!system.iconUrl}',    // 如果system.iconUrl未设置，则此image不显示
                src: '{system.iconUrl}'         // 根据system.iconUrl的设置来加载图片
            }
        },
        {
            xtype: 'label',
            bind: {
                text: '{system.name}'
            },
            style: 'font-size: 20px; color: blue;'
        },
        {
            xtype: 'label',
            bind: {
                text: '({system.version})'
            }
        }, '->',
        {
            xtype: 'buttonmainmenu',
            hidden: true,
            bind: {
                hidden: '{!isButtonMenu}'
            }
        }, ' ', ' ',
        {
            text: '主页',
            iconCls: 'fa',
            glyph: 0xf015
        },
        {
            text: '帮助',
            iconCls: 'fa',
            glyph: 0xf059
        },
        {
            text: '关于',
            iconCls: 'fa',
            glyph: 0xf06a
        },
        {
            xtype: 'settingmenu'
        }, '->', '->',
        {
            text: '搜索',
            iconCls: 'fa',
            glyph: 0xf002
        },
        {
            text: '注销',
            iconCls: 'fa',
            glyph: 0xf011
        },
        {
            iconCls: 'fa',
            glyph: 0xf102,
            handler: 'hiddenTopBottom',
            tooltip: '隐藏顶部和底部区域'
        }
    ]
});