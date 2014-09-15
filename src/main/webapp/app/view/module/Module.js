/**
 * Created by Cai on 2014/9/15 16:15.
 *
 * 一个模块的主控界面的容器，用来安放各个模块控件以及协调他们之间的关系
 */
Ext.define('app.view.module.Module', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modulepanel',

    requires: ['app.view.module.ModuleController', 'app.view.module.ModuleModel'],

    uses: ['app.view.module.region.Navigate', 'app.view.module.region.Grid', 'app.view.module.region.Detail'],

    controller: 'module',

    viewModel: {
        type: 'module'
    },

    bind: {
        // glyph : '{tf_glyph}', // 这一个绑定是无效的，在tabPanel渲染过后，再修改这个值，将不会有任何效果。
        title : '{tf_title}' // 这个绑定是有效的，可以根据ModuleModel中的值来设置title
    },

    layout: 'border',

    initComponent: function() {
        this.glyph = this.getViewModel().get('glyph');  // 由于上面的glyph的bind无效，因此需要在这里加入glyph的设置

        this.items = [{
            xtype: 'navigate',  // 导行区域
            region: 'west',
            width: 250,
            collapsible: true,
            split: true
        }, {
            xtype: 'modulegrid',    // 模块的grid显示区域
            region: 'center'
        }, {
            xtype: 'recorddetail',  // 记录明细
            region: 'east',
            width: 250,
            collapsible: true,
            collapseMode: 'mini',   // 折叠隐藏模式
            split: true
        }];

        this.callParent();
    }
});