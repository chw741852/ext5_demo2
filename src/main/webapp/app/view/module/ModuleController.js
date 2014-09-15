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
    }
});
