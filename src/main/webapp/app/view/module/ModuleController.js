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

//        grid.getStore().add(model);
//        console.log(model);
//        grid.getStore().sync();
    },

    // 根据选中的记录复制新增一条记录
    addRecordWithCopy: function() {
        var grid = this.getView().down('modulegrid'),
            sm = grid.getSelectionModel();
        if (sm.getSelection().length != 1) {
            Ext.toast({
                title: '警告',
                html: '请选中一条记录，然后再执行此操作',
                saveDelay: 10,
                align: 'tr',
                closable: true,
                minWidth: 200,
                useYAxis: true,
                slideInDuration: 500
            });
            return;
        }
        var model = Ext.create(grid.getStore().model);
        Ext.Array.each(model.fields, function(field) {
            model.set(field.name, sm.getSelection()[0].get(field.name));
        });
        model.set('tf_id', null);       // 设置为NULL，可自动增加
        grid.getStore().insert(0, model);
        sm.select(model);           // 选中当前新增的记录
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

    // TODO 修改grid数据，目前弹出框中未能载入数据
    editRecord: function(button) {
        var window = Ext.widget('basewindow', {
            viewModel: this.getView().getViewModel()
        });
        window.down('baseform').setData(this.getView().down('modulegrid').getSelectionModel().getSelection()[0]);
        window.show();
    },

    selectionChange: function(model, selected, eOpts) {
        // 设置删除按钮状态
        this.getView().down('toolbar button#deletebutton')[selected.length > 0 ? 'enable' : 'disable']();

        var viewModel = this.getView().getViewModel();
        // 下面将组织选中的记录的name显示在title上，有两种方案可供选中，一种是下面的MVVM特性，第二种是调用refreshTitle()
        var selectedNames = '';
        if (selected.length > 0) {
            if (selected[0].getNameValue()) {
                selectedNames = selectedNames + ' 『<em>' + selected[0].getNameValue() + '</em>'
                    + (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';
            }
        }
        viewModel.set('selectedNames', selectedNames);       // 修改ModuleModel中的数据，修改好后自动更新bind的title
//        this.getView().down('grid').refreshTitle();         // 这是不用MVVM特性的做法
    }
});
