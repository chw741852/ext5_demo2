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

    viewConfig: {
        stripRows: true,    // 奇偶行不同底色
        enableTextSelect: true
    },

    initComponent: function() {
        var viewModel = this.up('modulepanel').getViewModel();
        // TODO 报错  创建grid列
        this.columns = app.view.module.factory.ColumnsFactory.getColumns(viewModel, 10);
        this.callParent();
    }

//    columns: [{
//        dataIndex: 'tf_name',
//        text: '工程项目名称',
//        width: 250
//    }, {
//        dataIndex: 'tf_budget',
//        text: '投资总额'
//    }],

//    store: new Ext.data.Store({
//        fields: [
//            'tf_name',
//            {
//                name: 'tf_budget',
//                type: 'float'
//            }
//        ],
//
//        data: [{
//            tf_name: '安居房建设工程',
//            tf_budget: 1230000
//        }, {
//            tf_name: '道路建设工程',
//            tf_budget: 45302
//        }]
//    })
});