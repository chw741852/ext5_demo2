/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox', 'Ext.window.Toast'
    ],

    alias: 'controller.main',

    uses: ['app.view.module.Module'],

    init: function() {
        var vm = this.getView().getViewModel();
        // 绑定金额单位修改后需要去执行的程序
//        vm.bind('{monetary.value}', function(value) {
//            this.onMonetaryChange(value);
//        }, this);
        vm.bind('{monetary.value}', 'onMonetaryChange', this);
    },

    // 金额单位修改后执行
    onMonetaryChange: function(value) {
        console.log('金额单位：' + value);
        var m = app.view.main.menu.Monetary.getMonetary(value);
        Ext.monetaryText = m.monetaryText;
        Ext.monetaryUnit = m.monetaryUnit;
        Ext.each(this.getView().query('modulegrid'), function(grid) {
            if (grid.rendered) {
                grid.getView().refresh();
                Ext.Array.forEach(grid.columnManager.getColumns(), function(column) {
                    // 如果可以改变大小，并且是金额字段，则在改变了金额单位以后，自动调整一下列宽
                    if (!column.resizeDisabled && column.fieldDefine && column.fieldDefine.tf_isCurrency) {
                        column.autoSize();
                    }
                });
            }
        });
    },

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
            this.getView().getViewModel().set('name', '修改后的title');
        }
    },

    // 隐藏顶部和底部的按钮事件
    hiddenTopBottom: function() {
        // 如果要操纵控件，最好的办法是根据相对路径来找到该控件，用down或up最好，尽量少用getCmp()函数。
        this.getView().down('maintop').hide();
        this.getView().down('mainbottom').hide();
        if (!this.showButton) { // 显示顶部和底部的一个控件，在顶部和底部隐藏了以后，显示在页面的最右上角
            this.showButton = Ext.widget('component', {
                iconCls: 'fa',
                glyph: 0xf013,
                view: this.getView(),
                floating: true,
                x: document.body.clientWidth - 32,
                y: 0,
                height: 4,
                width: 26,
                style: 'background-color: #cde6c7',
                listeners: {
                    el: {
                        click: function(el) {
                            var c = Ext.getCmp(el.target.id);   // 取得component的id值
                            c.view.down('maintop').show();
                            c.view.down('mainbottom').show();
                            c.hide();
                        }
                    }
                }
            });
        }

        this.showButton.show();
    },

    // 如果窗口的大小改变了，并且顶部和底部都隐藏了，就要调整显示顶和底的那个控件的位置
    onMainResize: function() {
        if (this.showButton && !this.showButton.hide()) {
            this.showButton.setX(document.body.clientWidth - 32);
        }
    },

    onMainMenuClick: function(menuitem) {
        console.log(menuitem);
        Ext.toast({
            html: 'Data Saved , hello  this is a meessage',
            title: menuitem.text,
            saveDelay: 10,
            align: 'tr',
            closable: true,
            width: 200,
            useYAxis: true,
            slideInDuration: 500
        });

        var maincenter = this.getView().down('maincenter');

        maincenter.setActiveTab(
            maincenter.add({
                xtype: 'modulepanel',
                closable: true,
                reorderable: true
            })
        );
    },

    showLeftMenuRegion: function(button) {
        this.getView().getViewModel().set('menuType.value', 'tree');
    },

    showButtonMenu: function(button) {
        this.getView().getViewModel().set('menuType.value', 'button');
    },

    showMainMenuToolbar: function() {
        this.getView().getViewModel().set('menuType.value', 'toolbar');
    }
});
