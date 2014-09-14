/**
 * Created by cai on 2014/9/14 17:26.
 *
 * 显示在顶部的按钮菜单，可以切换至标准菜单，菜单树
 */
Ext.define('app.view.main.menu.ButtonMainMenu', {
    extend: 'app.ux.ButtonTransparent',
    alias: 'widget.buttonmainmenu',
    text: '菜单',
    iconCls: 'fa',
    glyph: 0xf0c9,

    initComponent: function() {
        this.menu = this.up('app-main').getViewModel().getMenus();

        this.callParent();
    }
});