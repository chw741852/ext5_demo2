/**
 * Created by cai on 2014/9/21 10:36.
 *
 * 如果一个模块有多个Grid方案，那么在padding上增加一个可以选择切换方案的Combo
 */
Ext.define('app.view.module.widget.GridSchemeCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.gridschemecombo',
    fieldLabel: '方案',
    editable: false,
    labelWidth: 40,
    labelAlign: 'right',
    width: 200,
    queryModel: 'local',
    displayField: 'tf_schemeName',      // data中列表主案的名称
    valueField: 'tf_schemeOrder',       // data中列表主案的序号
    hidden: true,               // 默认不显示，如果GridScheme的个数大于1，则显示
    bind: {
        hidden: '{gridSchemeHidden}',       // 这是data中的一个计算字段，根据gridscheme个数来判断此控件是否显示
        value: '{gridSchemeId}'         // 绑定gridSchemeId的值，在grid中，也绑定此值，这里改变以后，会去执行grid中的绑定事件
    },

    initComponent: function() {
        // 取得最顶层的viewModel
        var viewModel = this.up('modulepanel').getViewModel();
        this.store = Ext.create('Ext.data.Store', {
            fields: ['tf_schemeOrder', 'tf_schemeName'],
            data: viewModel.get('tf_gridSchemes')
        });
        this.value = viewModel.get('tf_gridScheme')[0].tf_schemeOrder;      // 默认的方案为第一个

        this.callParent(arguments);
    }
});