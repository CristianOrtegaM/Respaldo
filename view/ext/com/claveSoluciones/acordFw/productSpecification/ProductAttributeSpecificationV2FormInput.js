Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.productattributespecificationv2forminput',
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
                padding: '10 10 0 10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Estado',
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
	                       fieldLabel: 'Estado',
	                       name: 'status',
	                       hidden: false,
	                       readOnly: true,
	                       columnWidth: .25,
	                       padding: '0 10 10 0',
	                       maxLength: 255,
	                       enforceMaxLength: true,
	                       listeners: {
	                           blur: function(tf){
	                               if(tf.getValue!="")
	                                   this.setValue(tf.getValue().trim());
	                           }
	                       }
	                   }, {
	                   	xtype: 'statustoolbar',
	                   	columnWidth: .6666
	                   }]
                },{
                    xtype:'fieldset',  
                    title: 'Especificación de Atributo de Producto',
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
                        fieldLabel: 'Código de Atributo de Producto',
                        emptyText: 'Ingrese Código de Atributo de Producto',
                        name: 'kindOfElementNameSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
                        padding: '0 10 10 0',
                        regex: nameReg1withoutSpace,
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
                        fieldLabel: 'Código Externo',
                        emptyText: 'Ingrese Código Externo',
                        name: 'productExternalCodePrs',
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
                        columnWidth: .75,
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
                        fieldLabel: 'Nombre Corto',
                        emptyText: 'Ingrese Nombre Corto',
                        name: 'shortNameSpe',
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
                        xtype: 'label',
                        text : 'Diseñadores',
                        cls: 'x-label',
                        padding: '5px 5px 5px 5px',
                        columnWidth : 1,
                        hidden: true
                    },
                    {
                        columnWidth: 1,
                        padding: '5px 5px 5px 5px',
                        hidden: false,
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
                                autoScroll: true,
                                hidden: true,
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
                                xtype: 'button',
                                hidden: true,
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
                                afterrender: function(thisForm, options){
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
//                    },
//                    {
//                        xtype: 'combo',
//                        fieldLabel: 'Comercializable',
//                        autoLoadOnValue: true,
//                        emptyText: 'Seleccione ...',
//                        name: 'marketableIndicatorPrs',
//                        allowBlank: false,
//                        columnWidth: .25,
//                        padding: '0 10 10 0',
//                        queryMode: 'local',
//                        typeAhead: true,
//                        minChars: 0,
//                        listeners: {
//                            focus: function(combo){
//                                combo.getStore().load({
//                                    callback: function(){
//                                        combo.expand();
//                                    }
//                                });
//                            },
//                            change: function(tf){
//                              if(tf.getValue()!=""){
//                                tf.addCls('x-complete-field');
//                              } else {
//                                    tf.removeCls('x-complete-field');
//                                }
//                            }
//                        },
//                        hidden: false,
//                        valueField: 'valor',
//                        displayField: 'nombre',
//                        store: new Ext.data.ArrayStore({
//                            fields: ['nombre', 'valor'],
//                            data: [['Sí', true], ['No', false] ]
//                        })
//                    },
//                    {
//                        xtype: 'datefield',
//                        fieldLabel: 'Inicio de Comercialización',
//                        emptyText: 'Ingrese Inicio de Comercialización',
//                        name: 'marketablePeriodStartDateTimePrs',
//                        allowBlank: true,
//                        hidden: false,
//                        columnWidth: .25,
//                        padding: '0 10 10 0',
//                        format: 'd/m/Y',
//                        submitFormat: 'c',
//                        editable: false
                    }]
                }
                ],
                buttons: [{
                	text: 'Guardar',
		            scope: this,
		            bodyPadding: 5,
		            margins: '0 17 0 0',
		            action: 'create'
                },{ 
                	text: 'Cancelar',
		            scope: this,
		            bodyPadding: 5,
		            margins: '0 17 0 0',
		            handler: function(){
		            	this.up('window').close();
		            }
                }]
            }]
        }, 
        {
        	xtype: 'fieldset',
        	margin: '10 10',
        	title: 'Reglas',
        	collapsible: true,
            hidden: false,
        	items: [{
        		xtype: 'attributerulesgrid'
        	}]
        }];
        this.callParent(arguments);
    }
});
