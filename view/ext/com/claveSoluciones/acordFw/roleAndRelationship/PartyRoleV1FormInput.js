Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.partyrolev1forminput',
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
                    title: 'Datos de Rol Usuario',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .333
                    },
                    items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Código de Rol de Usuario',
                        name: 'keyImo',
                        emptyText: 'Ingrese Código de Rol de Usuario',
                        columnWidth: .25,
                        padding: '0 10 10 0',
                     },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        name: 'fullNamePan',
                        emptyText: 'Ingrese Nombre',
                        columnWidth: .75,
                        padding: '0 10 10 0',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ]
                     },
                     {
                        xtype: 'datefield',
                        fieldLabel: 'Inicio de Vigencia',
                        emptyText: 'Ingrese Inicio de Vigencia',
                        name: 'rolePlayerPeriodStartDateTimeRol',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Fin de Vigencia',
                        emptyText: 'Ingrese Fin de Vigencia',
                        name: 'rolePlayerPeriodEndDateTimeRol',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
					{
							xtype: 'panel',
							width: 500,
    						height: 61,
						    //fieldLabel: ' ',
							columnWidth : .5,
							padding : '0 10 10 0',
							bodyStyle: 'border-color: white;'
					},
                    {
                        xtype: 'textareafield',
                        emptyText: 'Ingrese Descripción',
                        grow: false,
                        name: 'descriptionRol',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        fieldLabel: 'Descripción',
                        anchor: '100%'
                    }]
                },{
                    xtype:'fieldset',  
                    title: 'Capacidades',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .333
                    },
                    items:[{
                                xtype: 'capabilityv1grid_ext',
                                columnWidth: 1,
                                padding: '5 5 5 5',
                                selType: 'checkboxmodel',
					            selModel: {
					                checkOnly: false,
					                injectCheckbox: 0,
					                mode: 'SINGLE',
					                allowDeselect: true,
					                showHeaderCheckbox: false
					            },
                                itemId: 'ownedCapabilityParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
                                    pageSize: 10,
                                    remoteSort: false,
                                    fields: [{
								        name: 'capabilityIdentifierCap',
								        
							    }],
                                 	//sorters: [{
									//	     property: 'capabilityIdentifierCap',
									//	     direction: 'DESC' // or 'ASC'
									// }],
                                    proxy: {
							            type: 'memory',
							            enablePaging: true,
							            data: [],
							            
						       		},
                                }),
                                listeners: {
                                    beforerender: function(){
                                        //this.getStore().load();
                                        //var column = Ext.create('Ext.grid.column.Action',{
                                        //    flex: 0.3,
                                        //    sortable: false,
                                        //    align: 'center',
                                        //    iconCls: 'delete-grid',
                                        //    tooltip: 'Borrar',
                                        //    handler: function(grid, rowIndex,colIndex){
                                        //        var store = grid.getStore();
                                        //        store.removeAt(rowIndex);
                                        //    }
                                        //});
                                        //this.headerCt.insert(0,column);
                                        //this.getView().refresh();
                                       //this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },
                             
                            
                            ]
                    /*items:[
                    {
                        columnWidth: 1,
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
                                xtype: 'capabilityv1grid_ext',
                                selType: 'checkboxmodel',
					            selModel: {
					                checkOnly: false,
					                injectCheckbox: 0,
					                mode: 'SINGLE',
					                allowDeselect: true,
					                showHeaderCheckbox: false
					            },
                                itemId: 'ownedCapabilityParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
                                    pageSize: 10,
                                    remoteSort: false,
                                    fields: [{
								        name: 'capabilityIdentifierCap',
								        
							    }],
                                 	//sorters: [{
									//	     property: 'capabilityIdentifierCap',
									//	     direction: 'DESC' // or 'ASC'
									// }],
                                    proxy: {
							            type: 'memory',
							            enablePaging: true,
							            data: [],
							            
						       		},
                                }),
                                listeners: {
                                    beforerender: function(){
                                        //this.getStore().load();
                                        //var column = Ext.create('Ext.grid.column.Action',{
                                        //    flex: 0.3,
                                        //    sortable: false,
                                        //    align: 'center',
                                        //    iconCls: 'delete-grid',
                                        //    tooltip: 'Borrar',
                                        //    handler: function(grid, rowIndex,colIndex){
                                        //        var store = grid.getStore();
                                        //        store.removeAt(rowIndex);
                                        //    }
                                        //});
                                        //this.headerCt.insert(0,column);
                                        //this.getView().refresh();
                                       //this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },
                             
                            
                            ]
                        }
                        
                        ]
                    }
                   
                    ]*/
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
