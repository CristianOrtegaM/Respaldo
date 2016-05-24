Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.productrulev2forminput',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    initComponent: function() {
        this.items = [{
            layout: 'column',
            xtype: 'panel',
            border: false,
            items: [{
                layout: 'column',
                xtype: 'panel',
                height: '100%',
                border: false,
                columnWidth: 1,
                defaults: {
                    anchor: '100%',
                    columnWidth: 1
                },
                padding: '10 0 0 10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Especificación de Regla de Producto',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Código de la Regla',
                        emptyText: 'Ingrese Código de la Regla',
                        name: 'kindOfElementNameSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Versión',
                        emptyText: 'Ingrese Versión',
                        name: 'versionSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'nameSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Nombre Corto',
                        emptyText: 'Ingrese Nombre Corto',
                        name: 'shortNameSpe',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },
                    {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'descriptionSpe',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        fieldLabel: 'Descripción',
                        maxLength: 5000,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'typeCodePrr',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 0,
                        listeners: {
                            focus: function(combo){
                                combo.getStore().load({
                                    callback: function(){
                                        combo.expand();
                                    }
                                });
                            }
                        },
                        hidden: false,
                        valueField: 'enumerationLiteralEnu',
                        displayField: 'descriptionEnu',
                        forceSelection: true,
                        store: new Ext.data.Store({
                            model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
                            remoteSort: true,
                            autoLoad: false,
                            pageSize: 9999,
                            proxy: {
                                type: 'rest',
                                url: urlService + 'enumerationService/findByEnumerationType',
                                actionMethods: {
                                    read: 'POST'
                                },
                                extraParams: {
                                    enumName: 'RuleKindCodeList'
                                },
                                reader: {
                                    rootProperty: 'datos',
                                    successProperty: 'valido',
                                    totalProperty: 'totalRegistros'
                                }
                            }
                        })
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Logica de Evaluación',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'evaluationLogicCodePrr',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 0,
                        listeners: {
                            focus: function(combo){
                                combo.getStore().load({
                                    callback: function(){
                                        combo.expand();
                                    }
                                });
                            }
                        },
                        hidden: false,
                        valueField: 'enumerationLiteralEnu',
                        displayField: 'descriptionEnu',
                        forceSelection: true,
                        store: new Ext.data.Store({
                            model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
                            remoteSort: true,
                            autoLoad: false,
                            pageSize: 9999,
                            proxy: {
                                type: 'rest',
                                url: urlService + 'enumerationService/findByEnumerationType',
                                actionMethods: {
                                    read: 'POST'
                                },
                                extraParams: {
                                    enumName: 'EvaluationLogicCodeList'
                                },
                                reader: {
                                    rootProperty: 'datos',
                                    successProperty: 'valido',
                                    totalProperty: 'totalRegistros'
                                }
                            }
                        })
                    },
                    {
                        name: 'formalDefinitionPrr',
                        xtype: 'textareafield',
                        fieldLabel: 'Definición Formal',
                        emptyText: 'Ingrese Definición Formal',
                        allowBlank: false,
                        grow: true,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
//                        regex: nameReg1,
//                        regexText: 'Campo inválido',
                        maxLength: 5000,
                        maskRe: /[^ ]/,
                        enforceMaxLength: true,
//                        listeners: {                            
//                            render: function(cmp){
//                            	cmp.inputEl.setMinHeight(5);
//                            
//                            }
//                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Regla Opcional',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'canBeOverwrittenIndicatorPrr',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 0,
                        listeners: {
                            focus: function(combo){
                                combo.getStore().load({
                                    callback: function(){
                                        combo.expand();
                                    }
                                });
                            }
                        },
                        hidden: false,
                        valueField: 'valor',
                        displayField: 'nombre',
                        store: new Ext.data.ArrayStore({
                            fields: ['nombre', 'valor'],
                            data: [['Sí', true], ['No', false] ]
                        })
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Mensaje de Error',
                        emptyText: 'Ingrese Mensaje de Error',
                        name: 'commentOnFailurePrr',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        text : 'Aplica a Componentes',
//                        cls: 'x-label-req',
//                        afterLabelTextTpl: [
//                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
//                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        //width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'ruleapplicabilityv1grid',
                                itemId: 'ruleApplicabilityPrsGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV2',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                        data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        /*var column = Ext.create('Ext.grid.column.Action',{
                                            sortable: false,
                                            width: 30,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();*/
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'ruleApplicabilityPrsPanelGridButton',
                                action: 'ruleApplicabilityPrsPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
//                                handler: function(){
//                                    this.toggle();
//                                    var grid = this.up('fieldset').down('#ruleApplicabilityPrsPanelGrid');
//                                    if(grid.isHidden()){
//                                        grid.setVisible(true);
//                                        grid.on('afterlayout', function(){
//                                        	this.center();
//                                        });
//                                    }
//                                    else
//                                        grid.setVisible(false);
//                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'ruleApplicabilityPrsPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'ruleapplicabilityv1formsearch'
                                }]
//                            },{
//                                xtype: 'ruleapplicabilityv1grid',
//                                enableColumnResize: false,
//                                listeners: {
//                                    afterrender: function(){
//                                        var store = this.getStore();
//                                        store.removeAll();
//                                        store.filters.clear();
//                                        delete store.getProxy().extraParams['filters'];
//                                        store.pageSize = 15;                                        
//                                        var filtro =[Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//                                            nombreCampo: 'p_productCode',
//                                            valor: this.up('window').record.get('kindOfElementNameSpe'),
//                                            operacion: '=',
//                                            tipoValor: 'string'
//                                        }).data,
//                                        Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//                                            nombreCampo: 'p_version',
//                                            valor: this.up('window').record.get('versionSpe'),
//                                            operacion: '=',
//                                            tipoValor: 'string'
//                                        }).data,
//                                        Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//                                            nombreCampo: 'p_componentClass',
//                                            valor: this.up('window').record.get('typeNameImo'),
//                                            operacion: '=',
//                                            tipoValor: 'string'
//                                        }).data];
//                                        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
//                                        store.getProxy().setUrl(urlService + 'ruleApplicabilityService/findRuleApplicabilityByFilter');
//                                        store.currentPage = 1;
//                                        store.load();
//                                        var toolbar = this.down('pagingtoolbar');
//                                        //this.down('toolbar').fireEvent('buttonsAccess', ['c']);
//                                        toolbar.add({
//                                            xtype : 'button',
//                                            text : 'Cerrar',
//                                            handler : function(){
//                                                var screen = Ext.ComponentQuery.query('#ruleApplicabilityPrsPanelGrid');
//                                                var win = screen[screen.length-1];
//                                                win.setVisible(false);
//                                                var button = Ext.ComponentQuery.query('button[itemId="ruleApplicabilityPrsPanelGridButton"]');
//                                                button[button.length-1].toggle();
//                                            }
//                                        });
//                                        var column = Ext.create('Ext.grid.column.Action',{
//                                            flex: 0.3,
//                                            sortable: false,
//                                            align: 'center',
//                                            iconCls: 'add-grid',
//                                            tooltip: 'Agregar',
//                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
//                                                var screen = Ext.ComponentQuery.query('#ruleApplicabilityPrsAerGrid');
//                                                var store = screen[screen.length-1].getStore();
//                                                if(store.findExact('ruleApplicabilityIdentifierRua', rec.get('ruleApplicabilityIdentifierRua'))==-1)
//                                                store.loadRawData(rec.data,true);
//                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
//                                            }
//                                        });
//                                        this.headerCt.insert(0,column);
//                                        this.getView().refresh();
//                                    }
//                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'label',
                        text : 'Diseñadores',
                        cls: 'x-label',
                        padding: '5px 5px 5px 5px',
                        hidden: true,
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5px 5px 5px 5px',
                        hidden: true,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'partyrolev1grid',
                                itemId: 'designerSpeGrid',
                                hidden: true,
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
                                    data: []
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                            	hidden: true,
                                xtype: 'button',
                                itemId: 'designerSpePanelGridButton',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                cls: 'boton-objeto',
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#designerSpePanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'designerSpePanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                items: [{
                                    xtype: 'partyrolev1formsearch'
                                }]
                            },{
                                xtype: 'partyrolev1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#designerSpePanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="designerSpePanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#designerSpeGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('roleIdentifierRol', rec.get('roleIdentifierRol'))==-1)
                                                store.add(rec);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
