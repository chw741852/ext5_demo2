/**
 * Created by cai on 2014/9/16 23:44.
 *
 * 用于生成Grid的Columns的类
 */
Ext.define('app.view.module.factory.ColumnsFactory', {
    statics: {
        getColumns: function(moduleModel, schemeOrderId) {
            var scheme = moduleModel.get('tf_gridScheme')[0];       // 取得第一个grid的方案
            var columns = [];
            for (var i in scheme.tf_schemeGroups) {
                var sg = scheme.tf_schemeGroups[i];
                // 是否需要显示分组
                var isGroup = sg.tf_isShowHeaderSpans;
                var group = {
                    gridGroupId: sg.tf_gridGroupId,
                    text: sg.tf_gridGroupName,
                    locked: sg.tf_isLocked,
                    // flex: 1,
                    columns: []
                };

                for (var j in sg.tf_groupFields) {
                    var gf = sg.tf_groupFields[j];
                    var fd = moduleModel.getFieldDefine(gf.tf_fieldId);
                    var field;
                    if (fd.tf_isHidden)
                        continue;
                    field = this.getColumn(gf, fd, moduleModel);
                    field.locked = sg.tf_isLocked;
                    if (isGroup) {
                        this.canReduceTitle(group, field);
                        group.columns.push(field);
                    } else {
                        columns.push(field);
                    }
                }

                if (isGroup) {
                    this.canReduceTitle(group, field);
                    columns.push(group);
                }
            }

            console.log(columns);
            return columns;
        },

        // 看看分组名称是不是下面column 的开头，如果是开头的话，并且columntitle 后面有内容，就把相同的部分截掉
        canReduceTitle: function(group, field) {
            if (field.text.indexOf(group.text) == 0) {
                field.text = field.text.slice(group.text.length).replace('(', '').replace(')', '').replace('（', '').replace('）', '');
                if (field.text.indexOf('<br/>') == 0) {
                    field.text = field.text.splice(5);
                }
            }
        },

        /**
         * 根据groupField, fieldDefine的定义，生成一个column的定义
         */
        getColumn: function(gf, fd, module) {
//            console.log(fd);
            var ft = fd.tf_title.replace(new RegExp('--', 'gm'), '<br/>');
            if (fd.behindText) {
                ft += '<br/>(' + fd.behindText + ')';
            }

            var field = {
                filter: {},
                maxWidth: 800,
                gridFieldId: gf.tf_gridFieldId,     // 加上这个属性，用于在列改变了宽度过后，传到后台
                sortable: true,
                text: ft,
                dataIndex: fd.tf_fieldName,
                editor: {},
                gridField: gf,
                fieldDefine: fd
            };

            switch (fd.tf_fieldType) {
                case 'Date':
                    Ext.apply(field, {
                        xtype: 'datecolumn',
                        align: 'center',
                        width: 100,
                        formatter: 'dateRenderer',      // 定义在Ext.util.Format中的渲染函数可以用这种方法调用
                        editor: {       // 如果需要行内修改，需要加入此属性
                            xtype: 'datefiled',
                            format: 'Y-m-d',
                            editable: false
                        }
                    });
                    break;
                case 'Datetime':
                    Ext.apply(field, {
                        xtype: 'datecolumn',
                        align: 'center',
                        width: 130,
                        formatter: 'dateRenderer'
                    });
                    break;
                case 'Boolean':
                    field.xtype = 'checkcolumn';
                    field.stopSelection = false;
                    field.processEvent = function(type) {
                        if (type == 'click') {
                            return false;
                        }
                    };
                    break;
                case 'Integer':
                    Ext.apply(field, {
                        xtype: 'numbercolumn',
                        align: 'center',
                        tdCls: 'intcolor',
//                        formatter: 'intRenderer',
                        renderer: Ext.util.Format.intRenderer,
                        editor: {
                            xtype: 'numberfiled'
                        }
                    });
                    break;
                case 'Double' :
                    Ext.apply(field, {
                        align : 'center',
                        xtype : 'numbercolumn',
                        width : 110,
//                        formatter: fd.tf_isMoney ? 'monetaryRenderer' : 'floatRenderer',
                        format: '#',
                        renderer: fd.tf_isCurrency ? Ext.util.Format.monetaryRenderer : Ext.util.Format.monetaryRenderer.floatRenderer,
                        editor: {
                            xtype: 'numberfiled'
                        }
                    });
                    break;
                case 'Float' :
                    Ext.apply(field, {
                        align : 'center',
                        xtype : 'numbercolumn',
                        width : 110,
//                        formatter: 'floatRenderer'
                        renderer: Ext.util.Format.floatRenderer
                    });
                    break;
                case 'Percent' :
                    Ext.apply(field, {
                        align : 'center',
                        formatter : 'percentRenderer',
                        // xtype : 'widgetcolumn', // 这里注释掉的是extjs5自带的百分比类型的显示方法
                        // widget : {
                        // xtype : 'progressbarwidget',
                        // textTpl : ['{percent:number("0.00")}%']
                        // },
                        editor: {
                            xtype: 'numberfield',
                            step: 0.01
                        },
                        width: 110
                    });
                    break;
                case 'String' :
                    // 如果这个字段是此模块的nameFields，则加粗显示
                    if (module.get('tf_nameFields') == fd.tf_fieldName) {
                        Ext.apply(field, {
                            text: '<strong>' + fd.tf_title + '</strong>',
                            formatter: 'nameFieldRenderer'
                        });
                    } else {
                        Ext.apply(field, {});
                    }
                    break;
                default :
                    break;
            }

            if (fd.tf_allowSummary) {
                Ext.apply(field, {
                    hasSummary: true,
                    summaryType: 'sum'
                });
            }

            if (gf.tf_columnWidth > 0) {
                field.width = gf.tf_columnWidth;
            } else if (gf.tf_columnWidth == -1) {
                field.flex = 1;
                field.minWidth = 120;
            }

            return field;
        },

        /**
         * 对于当前模块的name字段，加粗显示
         */
        nameFieldRenderer: function(val, rd, model, row, col, store, gridview) {
            return filterTextSetBk(store, '<strong>' + val + '</strong>');
        }
    }
});