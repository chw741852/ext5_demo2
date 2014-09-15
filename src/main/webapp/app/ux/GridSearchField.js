/**
 * Created by Cai on 2014/9/15 18:48.
 *
 * 筛选框
 */
Ext.define('app.ux.GridSearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.gridsearchfield',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    onClearClick: function() {
        var me = this;
        me.setValue('');
        me.getTrigger('clear').hide();
    },

    onSearchClick: function() {
        var me = this;
        me.getTrigger('clear').show();
    }
});
