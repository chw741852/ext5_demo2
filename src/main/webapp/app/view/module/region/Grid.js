/**
 * Created by Cai on 2014/9/15 16:48.
 *
 * 模块数据的主显示区域，继承自Grid
 */
Ext.define('app.view.module.region.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.modulegrid',

    uses: ['app.view.module.region.GridToolbar', 'app.view.module.factory.ColumnsFactory'],

    bind: {
        title: '{tf_title}'
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

        this.callParent();
    }
});