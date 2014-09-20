/**
 * Created by Cai on 2014/9/15 16:30.
 *
 * 模块的控制器
 */
Ext.define('app.view.module.ModuleController', {
    extend: 'Ext.app.ViewController',

    requires: ['Ext.MessageBox', 'Ext.window.Toast'],

    alias: 'controller.module',

    init: function() {
        console.log('module controller init');
    },

    // 新增一条记录
    addRecord: function() {
        var grid = this.getView().down('modulegrid');
        var model = Ext.create(grid.getStore().model);
        model.set('tf_id', 0);
        grid.getStore().insert(0, model);
//        model.set('tf_id',1);
//        model.set('tf_name', '太湖花园小区建设');
//        model.set('tf_code','2004-01');
//        model.set('tf_squaremeter',12000);
//        model.set('tf_budget',-3800000000000);
//        model.set('tf_rjl',0.67);
//        model.set('tf_startDate',new Date());
//        model.set('tf_endDate',new Date());
//        model.set('tf_isValid',false);
//        model.set('tf_m3',1239.24);
//
//        grid.getStore().add(model);
//        console.log(model);
//        grid.getStore().sync();
    },

    deleteRecords: function(button) {
        var grid = this.getView().down('modulegrid'),
            selection = grid.getSelectionModel().getSelection(),
            message = '';
        if (selection.length == 1) {        // 如果只选择了一条记录
            message = '『' + selection[0].getNameValue() + '』吗？';
        } else {        // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(selection, function(record) {
                message += '<li>' + record.getNameValue() + '</li>';
            });
            message += '</ol>';
            message = '以下 ' + selection.length + ' 条记录吗？' + message;
        }

        Ext.MessageBox.confirm('确定删除', '确定要删除 <strong>' + this.getView().getViewModel().get('tf_title')
            + '</strong> 中的' + message, function(btn) {
            if (btn == 'yes') {
                grid.getStore().remove(grid.getSelectionModel().getSelection());
                grid.getStore().sync();
            }
        });
    },

    selectionChange: function(model, selected, opts) {
        // 设置删除按钮状态
        this.getView().down('toolbar button#deletebutton')[selected.length > 0 ? 'enable' : 'disable']();
    }
});
