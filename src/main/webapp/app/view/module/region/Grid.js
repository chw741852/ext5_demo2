/**
 * Created by Cai on 2014/9/15 16:48.
 *
 * 模块数据的主显示区域，继承自Grid
 */
Ext.define('app.view.module.region.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.modulegrid',

    requires: ['Ext.grid.plugin.DragDrop', 'Ext.grid.plugin.CellEditing'],
    uses: ['app.view.module.region.GridToolbar', 'app.view.module.factory.ColumnsFactory'],

    bind: {
        title: '{tf_title} {selectedNames}'     // 数据绑定到ModuleModel中tf_title和选中记录的名称
    },

    dockedItems: [{
        xtype: 'gridtoolbar',
        dock: 'top'
    }],

    columnLines: true,      // 加上表格线
    multiSelect : true,

    viewConfig: {
        stripRows: true,    // 奇偶行不同底色
        enableTextSelect: true
    },

    listeners: {
        selectionchange: 'selectionChange'
    },

    initComponent: function() {
        var viewModel = this.up('modulepanel').getViewModel();
        // 创建grid列
        this.columns = app.view.module.factory.ColumnsFactory.getColumns(viewModel, 10);

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });
        this.plugins = [this.cellEditing];

        this.viewConfig = {
            stripeRows: true,       // 奇偶行不同底色
            enableTextSelection: false,
            // 加入拖动功能
            plugins: [{
                ptype: 'gridviewdragdrop',
                // 分组最好是设置成唯一的
                ddGroup: 'DD_grid_' + viewModel.get('tf_moduleName'),   // 拖动分组必须设置，这个分组名称DD_grid_Global
                enableDrop: false       // 不允许在本grid中拖动
            }]
        };

        this.callParent();
    }
});