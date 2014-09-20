/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('app.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'app',

        // 系统信息
        system: {
            name: '工程项目合同及资金管理系统',
            version: '16.2014.09.13',
            iconUrl: ''
        },

        // 用户单位信息和用户信息
        user: {
            company: '武当太极公司',
            department: '工程部',
            name: '张三丰'
        },

        // 服务单位和服务人员信息
        service: {
            company: '广德长蛇公司',
            name: 'Cai',
            phone: '15221883730',
            qq: '1176773785',
            email: '1176773785@qq.com',
            copyright: '长蛇公司'
        },

        // 系统菜单的定义，这个菜单可以是从后台通过ajax传过来的
        systemMenu: [{
            text: '工程管理',   // 菜单项名称
            icon: '',           // 菜单项图标地址
            glyph: 0,           // 菜单项图标文字的数值
            expended: true,     // 在树形菜单中是否展开
            description: '',    // 菜单项的描述

            items: [{
                text: '工程项目',   // 菜单条的名称
                module: 'Global',   // 对应模块的名称
                icon: '',
                iconCls: 'fa',
                glyph: 0xf0f7
            }, {
                text: '工程标段',
                module: 'Project',
                icon: '',
                iconCls: 'fa',
                glyph: 0xf02e
            }]
        }, {
            text : '合同管理',
            expanded : true,
            items : [{
                text : '项目合同',
                module : 'Agreement',
                iconCls: 'fa',
                glyph : 0xf02d
            }, {
                text : '合同付款计划',
                module : 'AgreementPlan',
                iconCls: 'fa',
                glyph : 0xf03a
            }, {
                text : '合同请款单',
                module : 'Payment',
                iconCls: 'fa',
                glyph : 0xf022
            }, {
                text : '合同付款单',
                module : 'Payout',
                iconCls: 'fa',
                glyph : 0xf0d6
            }, {
                text : '合同发票',
                module : 'Invoice',
                iconCls: 'fa',
                glyph : 0xf0a0
            }]
        }, {
            text : '综合查询',
            iconCls: 'fa',
            glyph : 0xf0ce,
            expanded : true,
            items : [{
                text : '项目合同台帐',
                module : 'Agreement',
                iconCls: 'fa',
                glyph : 0xf02d
            }, {
                text : '合同付款计划台帐',
                module : 'AgreementPlan',
                iconCls: 'fa',
                glyph : 0xf03a
            }, {
                text : '合同请款单台帐',
                module : 'Payment',
                iconCls: 'fa',
                glyph : 0xf022
            }, {
                text : '合同付款单台帐',
                module : 'Payout',
                iconCls: 'fa',
                glyph : 0xf0d6
            }, {
                text : '合同发票台帐',
                module : 'Invoice',
                iconCls: 'fa',
                glyph : 0xf0a0
            }]
        }],

        menuType : {
            value : 'toolbar'
        },

        monetary: {     // 金额单位
            value: 'tenthousand'    // 默认万元，以后可以从后台取得个人偏好设置，或者存放在cookies中
        }
    },

    formulas: {
        isButtonMenu: function(get) {
            return get('menuType.value') == 'button';
        },

        isToolbarMenu: function(get) {
            return get('menuType.value') == 'toolbar';
        },

        isTreeMenu: function(get) {
            return get('menuType.value') == 'tree';
        }
    },

    // 根据data.systemMenu生成菜单条和菜单按钮下面使用的菜单数据
    getMenus: function() {
        var items = [];
        var menuData = this.get('systemMenu');     // 取得定义好的菜单数据
        Ext.Array.each(menuData, function(group) {      // 遍历菜单项数组
            var subMenu = [];
            // 对每个菜单项遍历菜单条的数组
            Ext.Array.each(group.items, function(menuItem) {
                subMenu.push({
                    mainmenu: 'true',
                    moduleName: menuItem.module,
                    text: menuItem.text,
                    icon: menuItem.icon,
                    iconCls: menuItem.iconCls,
                    glyph: menuItem.glyph,

                    handler: 'onMainMenuClick'
                });
            });

            var item = {
                text: group.text,
                menu: subMenu,
                icon: group.icon,
                iconCls: group.iconCls,
                glyph: group.glyph
            };

            items.push(item);
        });

        return items;
    }
});