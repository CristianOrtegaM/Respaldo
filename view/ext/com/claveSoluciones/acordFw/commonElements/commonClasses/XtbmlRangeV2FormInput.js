Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.xtbmlrangev2forminput',
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
                padding: '10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Especificación',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
//                    {
//                        xtype: 'label',
//                        text : 'Dimensión',
//                        padding : '5 5 5 5',
//                        columnWidth : 1
//                    },
//                    {
//                        columnWidth: 1,
//                        padding: '5 5 5 5',
//                        hidden: false,
//                        border: false,
//                        defaults: {
//                            anchor: '100%',
//                            columnWidth : .5
//                        },
//                        width: '100%',
//                        layout: 'column',
//                        items: [{
//                            border: false,
//                            columnWidth: 1,
//                            items:[{
//                                xtype: 'xtbmldimensionv1grid',
//                                itemId: 'dimensionXtrGrid',
//                                autoScroll: true,
//                                height: '',
//                                store: new Ext.data.Store({
//                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1',
//                                    data: []
//                                }),
//                                listeners: {
//                                    beforerender: function(){
//                                        this.getStore().load();
//                                        var column = Ext.create('Ext.grid.column.Action',{
//                                            flex: 0.3,
//                                            sortable: false,
//                                            align: 'center',
//                                            iconCls: 'delete-grid',
//                                            tooltip: 'Borrar',
//                                            handler: function(grid, rowIndex,colIndex){
//                                                var store = grid.getStore();
//                                                store.removeAt(rowIndex);
//                                            }
//                                        });
//                                        this.headerCt.insert(0,column);
//                                        this.getView().refresh();
//                                        this.removeDocked(this.down('pagingtoolbar'));
//                                    }
//                                }
//                            },{
//                                xtype: 'button',
//                                itemId: 'dimensionXtrPanelGridButton',
//                                cls: 'boton-objeto',
//                                style: {
//                                    'float': 'right',
//                                    'margin': '10px'
//                                },
//                                handler: function(){
//                                    this.toggle();
//                                    var grid = this.up('fieldset').down('#dimensionXtrPanelGrid');
//                                    if(grid.isHidden()){
//                                        grid.setVisible(true);
//                                        grid.on('afterlayout', function(){
//                                            this.center();
//                                        });
//                                    }
//                                    else
//                                        grid.setVisible(false);
//                                }
//                            }]
//                        },{
//                            border: false,
//                            padding: 10,
//                            itemId: 'dimensionXtrPanelGrid',
//                            hidden: true,
//                            floating: true,
//                            draggable: true, 
//                            width: '85%',
//                            items: [{
//                                title: 'Búsqueda',
//                                cls: 'panelheader',
//                                title: 'Búsqueda',
//                                collapsible: true,
//                                collapsed: true,
//                                titleCollapse: true,
//                                listeners:{
//                                    collapse: function(){
//                                        this.updateLayout();
//                                    },
//                                    expand: function(){
//                                        this.updateLayout();
//                                    },
//                                },
//                                items: [{
//                                    xtype: 'xtbmldimensionv1formsearch'
//                                }]
//                            },{
//                                xtype: 'xtbmldimensionv1grid',
//                                enableColumnResize: false,
//                                listeners: {
//                                    afterrender: function(){
//                                        this.getStore().load();
//                                        var toolbar = this.down('pagingtoolbar');
//                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
//                                        toolbar.add({
//                                            xtype : 'button',
//                                            text : 'Cerrar',
//                                            handler : function(){
//                                                var screen = Ext.ComponentQuery.query('#dimensionXtrPanelGrid');
//                                                var win = screen[screen.length-1];
//                                                win.setVisible(false);
//                                                var button = Ext.ComponentQuery.query('button[itemId="dimensionXtrPanelGridButton"]');
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
//                                                var screen = Ext.ComponentQuery.query('#dimensionXtrGrid');
//                                                var store = screen[screen.length-1].getStore();
//                                                if(store.findExact('dimensionIdentifierXtd', rec.get('dimensionIdentifierXtd'))==-1)
//                                                store.loadRawData(rec.data,false);
//                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
//                                                this.up('#playerPartyParPanelGrid').setVisible(false);
//                                            }
//                                        });
//                                        this.headerCt.insert(0,column);
//                                        this.getView().refresh();
//                                    }
//                                }
//                            }],
//                            listeners: {
//                                afterRender: function(thisForm, options){
//                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
//                                        esc: function(){
//                                            this.setVisible(false);
//                                            this.up('fieldset').down('button[pressed=true]').toggle();
//                                        },
//                                        scope: this
//                                    });
//                                }
//                            }
//                        }]
//                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Secuencia',
                        emptyText: 'Ingrese Secuencia',
                        name: 'rangeSequenceXtr',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        maxLength: 10,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre Rango',
                        emptyText: 'Ingrese Nombre Rango',
                        name: 'rangeNameXtr',
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
                        fieldLabel: 'Valor Texto',
                        emptyText: 'Ingrese Valor Texto',
                        name: 'varcharValueXtr',
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
                        xtype: 'numericfield',
                        fieldLabel: 'Valor Número Desde',
                        emptyText: 'Ingrese Valor Número Desde',
                        name: 'numberValueFromXtr',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        maxLength: 10,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Valor Número Hasta',
                        emptyText: 'Ingrese Valor Número Hasta',
                        name: 'numberValueToXtr',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        maxLength: 10,
                        negativeText: 'El valor no puede ser negativo'
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
