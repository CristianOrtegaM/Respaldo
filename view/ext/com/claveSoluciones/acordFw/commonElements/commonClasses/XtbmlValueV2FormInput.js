Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.xtbmlvaluev2forminput',
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
//                        text : 'Tabla Asociada',
//                        padding : '0 0 5px 0',
//                        columnWidth : 1
//                    },
//                    {
//                        columnWidth: 1,
//                        padding: '0 10 10 0',
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
//                                xtype: 'xtbmltablev1grid',
//                                itemId: 'tableXtvGrid',
//                                autoScroll: true,
//                                height: '',
//                                store: new Ext.data.Store({
//                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
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
//                                itemId: 'tableXtvPanelGridButton',
//                                style: {
//                                    'float': 'right',
//                                    'margin': '10px'
//                                },
//                                icon: 'extjs/resources/themes/images/default/add.png',
//                                handler: function(){
//                                    this.toggle();
//                                    var grid = this.up('fieldset').down('#tableXtvPanelGrid');
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
//                            itemId: 'tableXtvPanelGrid',
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
//                                items: [{
//                                    xtype: 'xtbmltablev1formsearch'
//                                }]
//                            },{
//                                xtype: 'xtbmltablev1grid',
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
//                                                var screen = Ext.ComponentQuery.query('#tableXtvPanelGrid');
//                                                var win = screen[screen.length-1];
//                                                win.setVisible(false);
//                                                var button = Ext.ComponentQuery.query('button[itemId="tableXtvPanelGridButton"]');
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
//                                                var screen = Ext.ComponentQuery.query('#tableXtvGrid');
//                                                var store = screen[screen.length-1].getStore();
//                                                if(store.findExact('tableIdentifierXtt', rec.get('tableIdentifierXtt'))==-1)
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
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 01',
                        emptyText: 'Ingrese Dim 01',
                        name: 'dim01',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 02',
                        emptyText: 'Ingrese Dim 02',
                        name: 'dim02',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 03',
                        emptyText: 'Ingrese Dim 03',
                        name: 'dim03',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 04',
                        emptyText: 'Ingrese Dim 04',
                        name: 'dim04',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 05',
                        emptyText: 'Ingrese Dim 05',
                        name: 'dim05',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 06',
                        emptyText: 'Ingrese Dim 06',
                        name: 'dim06',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 07',
                        emptyText: 'Ingrese Dim 07',
                        name: 'dim07',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 08',
                        emptyText: 'Ingrese Dim 08',
                        name: 'dim08',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 09',
                        emptyText: 'Ingrese Dim 09',
                        name: 'dim09',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'textfield',
                        fieldLabel: 'Dim 10',
                        emptyText: 'Ingrese Dim 10',
                        name: 'dim10',
                        readOnly: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0'
                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Monto Fijo',
                        emptyText: 'Ingrese Monto Fijo',
                        name: 'fixedAmountXtv',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Porcentaje',
                        emptyText: 'Ingrese Porcentaje',
                        name: 'percentageXtv',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Piso',
                        emptyText: 'Ingrese Piso',
                        name: 'floorAmountXtv',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Tope',
                        emptyText: 'Ingrese Tope',
                        name: 'capAmountXtv',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Descuento',
                        emptyText: 'Ingrese Descuento',
                        name: 'discountAmountXtv',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
