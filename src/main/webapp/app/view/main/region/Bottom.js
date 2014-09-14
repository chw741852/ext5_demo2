/**
 * Created by cai on 2014/9/13 16:20.
 *
 * 系统主页的底部区域，主要放置用户单位信息，服务单位和服务人员信息
 */
Ext.define('app.view.main.region.Bottom', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.mainbottom',

    uses: ['app.ux.ButtonTransparent'],

    defaults: {
        xtype: 'buttontransparent'
    },

    items: [
        {
            bind: {
                text: '使用单位：{user.company}'
            }
        }, {
            bind: {
                text: '用户：{user.name}'
            }
        }, '->', {
            bind: {
                text: '服务单位：{service.company}'
            }
        }, {
            bind: {
                text: '服务人员：{service.name}'
            }
        }, {
            bind: {
                text: 'tel：{service.phone}'
            }
        }, {
            bind: {
                hidden: '{!service.email}',
                text: 'email：{service.email}'
            }
        }, {
            bind: {
                text: '©{service.copyright}'
//                text: '©{!isToolbarMenu}'
            }
        }
    ]
});
