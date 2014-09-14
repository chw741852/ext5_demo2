/**
 * Created by cai on 2014/9/14 17:30.
 *
 * 树状菜单，显示在主界面的左边
 */
Ext.define('app.view.main.menu.MainMenuTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.mainmenutree',
    title: '系统菜单',
    glyph: 0xf0c9,
    rootVisible: false,
    lines: true,

    initComponent: function() {
        this.store = Ext.create('Ext.data.TreeStore', {
            root: {
                text: '系统菜单',
                leaf: false,
                expanded: true
            }
        });

        var menus = this.up('app-main').getViewModel().get('systemMenu');
        var root = this.store.getRoot();
        for (var i in menus) {
            var menuGroup = menus[i];
            var menuItem = root.appendChild({
                text: menuGroup.text,
                expanded: menuGroup.expanded,
                icon: menuGroup.icon,
                iconCls: menuGroup.iconCls,
                glyph: menuGroup.glyph
            });
            for (var j in menuGroup.items) {
                var menuModule = menuGroup.items[j];
                var childNode = {
                    moduleId: menuModule.text,
                    moduleName: menuModule.module,
                    text: menuModule.text,
                    leaf: true
                };
                menuItem.appendChild(childNode);
            }
        }

        this.callParent(arguments);
    }
});