/**
 * Created by Cai on 2014/9/15 16:38.
 *
 * 模块的数据模型
 */
Ext.define('app.view.module.ModuleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.module',

    // 在开发过程中我先用设定好的值放于data中，等以后自定义的时候，data里的值都是从后台取得的
    // 所有数据库里的字段，我都以tf_开头，只是为了表示这是从后台读取过来的
    data: {
        tf_moduleId: '1010',            // 模块ID号：一个数字的ID号，可以根据此ID号的顺序将相同分组的模块放在一块。
        tf_moduleGroup: '工程管理',     // 模块分组：模块分到哪个组里，比如说业务模块1、业务模块2、系统设置、系统管理等。
        tf_moduleName: 'Global',        // 模块标识：系统中唯一的模块标识
        tf_title: '工程项目',           // 模块名称：能改描述此模块信息的名称
        tf_glyph: 0xf0f7,               // 图表字符值
        tf_shortName: null,             // 模块简称，名字过长可以简称替代
        tf_englishName: null,           // 模块英文名称
        tf_englishShortName: null,      // 模块英文简称，可以用作生成编码字段
        tf_description: null,           // 模块描述
        tf_remark: null,                 // 备注

        // 下面还有若干字段未加入，以后用到的时候再加入
        tf_primaryKey: 'tf_id',
        tf_nameFields: 'tf_name',

        // 此模块的自定义字段，此处先用手工定义，以后换成数据库自动取得
        tf_fields: [{
            tf_fieldId: 10100010, // 此字段的id值，所有的字段都是保存在一字段表中，这是主键值  
            tf_fieldName: 'tf_id',// 字段名  
            tf_title: '序号',// 字段描述  
            tf_fieldType: 'Integer', // 字段类型  
            tf_isHidden: true, // 是否是隐藏字段  
            tf_fieldGroup: '工程基本信息' // 字段分组  
            // 是否是隐藏字段  
        }, {
            tf_fieldId: 10100020,
            tf_fieldName: 'tf_name',
            tf_title: '工程项目名称',
            tf_fieldType: 'String',
            tf_fieldLen: 50,
            tf_isRequired: true, // 是否是必添项  
            tf_fieldGroup: '工程基本信息'
        }, {
            tf_fieldId: 10100030,
            tf_fieldName: 'tf_code',
            tf_title: '工程项目编码',
            tf_fieldType: 'String',
            tf_fieldLen: 20,
            tf_isRequired: true,
            tf_fieldGroup: '工程基本信息' // 字段分组  
        }, {
            tf_fieldId: 10100040, // 加入一个整型字段  
            tf_fieldName: 'tf_squaremeter',
            tf_title: '建筑面积',
            tf_fieldType: 'Integer',
            tf_unitText: '平米', // 字段单位  
            tf_fieldGroup: '工程附加信息',
            tf_allowSummary: true
            // 可以对此字段进行小计
        }, {
            tf_fieldId: 10100050, // 加入一个金额字段  
            tf_fieldName: 'tf_budget',
            tf_title: '投资总额',
            tf_fieldType: 'Double',
            tf_isCurrency: true, // 此字段是一个金额字段
            tf_fieldGroup: '工程附加信息',
            tf_allowSummary: true
        }, {
            tf_fieldId: 10100060, // 加入一个百分比字段  
            tf_fieldName: 'tf_rjl',
            tf_title: '容积率',
            tf_fieldType: 'Percent',
            tf_fieldGroup: '工程附加信息'
        }, {
            tf_fieldId: 10100070, // 加入一个日期  
            tf_fieldName: 'tf_startDate',
            tf_title: '计划开工时间',
            tf_fieldType: 'Date',
            tf_fieldGroup: '工程附加信息'
        }, {
            tf_fieldId: 10100080, // 加入一个日期  
            tf_fieldName: 'tf_endDate',
            tf_title: '计划竣工时间',
            tf_fieldType: 'Date',
            tf_fieldGroup: '工程附加信息'
        }, {
            tf_fieldId: 10100090, // 加入一个布尔字段  
            tf_fieldName: 'tf_isValid',
            tf_title: '是否通过验收',
            tf_fieldType: 'Boolean',
            tf_fieldGroup: '工程附加信息'
        }, {
            tf_fieldId: 10100100, // 加入一个数值字段  
            tf_fieldName: 'tf_m3',
            tf_title: '工程方量',
            tf_fieldType: 'Double',
            tf_fieldGroup: '工程附加信息'
        }],

        // 模块的grid方案，可以定义多个方案
        tf_gridScheme: [{
            tf_schemeOrder: 10,
            tf_schemeName: 'Grid方案1',   // 第一个grid方案
            // 表头分组
            tf_schemeGroups: [{
                tf_gridGroupId: 1,      // id号
                tf_gridGroupOrder: 10,  // 表头分组序号
                tf_gridGroupName: '工程项目基本信息',
                tf_isShowHeaderSpans: true,     // 是否显示分组
                tf_isLocked: true,      // 是否锁定次分组
                // 每个表头分组下面的字段
                tf_groupFields: [{
                    tf_gridFieldOrder: 10,
                    tf_fieldId: 10100020,       // 工程项目名称字段
                    tf_columnWidth: 200
                }, {
                    tf_gridFieldOrder: 20,
                    tf_fieldId: 10100030,       // 工程项目编码字段
                    tf_columnWidth: 120
                }]
            }, {
                tf_gridGroupOrder: 20,
                tf_gridGroupName: '工程项目附加信息',
                tf_isShowHeaderSpans: true,
                tf_isLocked: false,
                tf_groupFields: [{
                    tf_gridFieldOrder: 10,
                    tf_fieldId: 10100040    // 建筑面积
                }, {
                    tf_gridFieldOrder: 20,
                    tf_fieldId: 10100050    // 投资总额
                }, {
                    tf_gridFieldOrder: 30,
                    tf_fieldId: 10100060    // 容积率
                }, {
                    tf_gridFieldOrder: 40,
                    tf_fieldId: 10100070    // 计划开工时间
                }, {
                    tf_gridFieldOrder: 50,
                    tf_fieldId: 10100080    // 计划竣工时间
                }, {
                    tf_gridFieldOrder: 60,
                    tf_fieldId: 10100090,    // 是否通过验收
                    tf_columnWidth: 80
                }, {
                    tf_gridFieldOrder: 70,
                    tf_fieldId: 10100100    // 工程方量
                }]
            }]
        }, {
            tf_schemeOrder: 20,
            tf_schemeName: 'Grid方案2',
            tf_schemeGroups: [{
                tf_gridGroupId: 1,      // ID号
                tf_gridGroupOrder: 10,  // 表头分组序号
                tf_gridGroupName: '工程项目主要信息',
                tf_isShowHeaderSpans: true,     // 是否显示分钟
                tf_isLocked: false,     // 是否锁定此分组
                tf_groupFields: [{
                    tf_groupFieldOrder: 5,
                    tf_fieldId: 10100010,
                    tf_isLocked: true
                }, {
                    tf_groupFieldOrder: 10,
                    tf_fieldId: 10100020,      // 工程项目名称字段
                    tf_columnWidth: 200,
                    tf_isLocked: true
                }, {
                    tf_groupFieldOrder: 20,
                    tf_fieldId: 10100030,      // 工程项目编码字段
                    tf_columnWidth: 120,
                    tf_isLocked: true
                }, {
                    tf_gridFieldOrder: 10,
                    tf_fieldId: 10100040
                }, {
                    tf_gridFieldOrder: 20,
                    tf_fieldId: 10100050
                }]
            }]
        }, {
            tf_schemeOrder: 30,
            tf_schemeName: 'Grid方案3',
            // 表头分组
            tf_schemeGroups: [{
                tf_gridGroupId: 1,          // id号
                tf_gridGroupOrder: 10,      // 表头分组序号
                tf_gridGroupName: '工程项目基本信息',
                tf_isShowHeaderSpans: true,     // 是否显示分组
                tf_isLocked: true,          // 是否锁定此分组
                tf_groupFields: [{
                    tf_gridFieldOrder: 10,
                    tf_fieldId: 10100020,       // 工程项目字段名称
                    tf_columnWidth: 200
                }, {
                    tf_gridFieldOrder: 20,
                    tf_fieldId: 10100030,       // 工程项目编码字段
                    tf_columnWidth: 120
                }]
            }, {
                tf_gridGroupOrder: 20,         // 表头分组序号
                tf_gridGroupName: '工程项目附加信息',
                tf_isShowHeaderSpans: true,
                tf_isLocked: false,
                tf_groupFields: [{
                    tf_gridFieldOrder : 10,
                    tf_fieldId : 10100040
                }, {
                    tf_gridFieldOrder : 20,
                    tf_fieldId : 10100050
                }, {
                    tf_gridFieldOrder : 30,
                    tf_fieldId : 10100060
                }, {
                    tf_gridFieldOrder : 40,
                    tf_fieldId : 10100070
                }, {
                    tf_gridFieldOrder : 50,
                    tf_fieldId : 10100080
                }]
            }]
        }],

        selectedNames: '',       // 选中的记录名字显示在title上

        // 模块的form方案，可以定义多个方案
        tf_formSchemes: [{
            tf_schemeOrder: 10,
            tf_schemeName: 'form方案1',
            tf_windowWidth: 600,
            tf_windowHeight: -1,            // 高度 -1，即自动适应高度
            // 表头分组
            tf_schemeGroups: [{
                tf_formGroupId: 1,
                tf_formGroupOrder: 10,
                tf_formGroupName: '工程项目基本信息',
                tf_numCols: 1,              // 分栏数
                // 每一个表头分组下面的字段
                tf_groupFields: [{
                    tf_formFieldOrder: 5,
                    tf_fieldId: 10100010,
                    tf_colspan: 1,          // 此字段占用的栏数
                    tf_width: -1,           // 宽度，设置-1为100%
                    tf_isEndRow: true       // 结束本行，下个字段从新的一行开始排列
                }, {
                    tf_formFieldOrder: 10,
                    tf_fieldId: 10100020,   // 工程项目名称字段
                    tf_colspan: 1,
                    tf_width: -1,
                    tf_isEndRow: true
                }, {
                    tf_formFieldOrder: 20,
                    tf_fieldId: 10100030,   // 工程项目编码字段
                    tf_colspan: 1,
                    tf_width: -1,
                    tf_isEndRow: true
                }]
            }, {
                tf_formGroupOrder : 20, // 表头分组序号
                tf_formGroupName : '工程项目附加信息',
                tf_numCols : 2, // 分栏数
                tf_collapsible : true, // 此fieldSet可折叠
                tf_collapsed : false, // 默认不折叠
                // 每一个表头分组下面的字段
                tf_groupFields : [{
                    tf_formFieldOrder : 10,
                    tf_fieldId : 10100040
                    // 建筑面积
                }, {
                    tf_formFieldOrder : 20,
                    tf_fieldId : 10100050
                    // 投资总额
                }, {
                    tf_formFieldOrder : 30,
                    tf_fieldId : 10100060,
                    tf_isEndRow : true
                    // 结束本行，下个字段从新的一行开始排列
                    // 容积率
                }, {
                    tf_formFieldOrder : 40,
                    tf_fieldId : 10100070
                    // 计划开工时间
                }, {
                    tf_formFieldOrder : 50,
                    tf_fieldId : 10100080
                    // 计划竣工时间
                }, {
                    tf_formFieldOrder : 60,
                    tf_fieldId : 10100090
                    // 是否通过验收
                }, {
                    tf_formFieldOrder : 70,
                    tf_fieldId : 10100100
                    // 工程方量
                }]
            }]
        }]
    },

    // 根据字段ID找到相应的定义
    getFieldDefine: function(fieldId) {
        var result = null;
        Ext.Array.each(this.data.tf_fields, function(field) {
            if (field.tf_fieldId == fieldId) {
                result = field;
                return false;
            }
        });

        return result;
    }
});