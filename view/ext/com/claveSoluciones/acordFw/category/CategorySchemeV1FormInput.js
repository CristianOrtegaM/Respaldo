Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.categoryschemev1forminput',
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
                    title: 'Esquema de Categoría',
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
                        fieldLabel: 'Código',
                        emptyText: 'Ingrese Código',
                        name: 'keyImo',
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
                        name: 'categorySchemeNameCas',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .50,
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
                        maxLength: 5000,
                        grow: true,
                        name: 'categoryDescriptionCas',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        fieldLabel: 'Descripción',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Categorías con Superposición',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'overlappingIndicatorCas',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: false,
                        editable: false,
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
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Categorías Exhaustiva',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'exhaustiveIndicatorCas',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: false,
                        editable: false,
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
                    
                    /*{
                        xtype: 'label',
                        text : 'Categorías',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
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
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'categoryv1grid',
                                itemId: 'isParentSchemeOfCasGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                        data: []
                                    }
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
                            },
                            {
		                            xtype: 'toolbar',
		                          	columnWidth: 1,
		                            items: [
		                                { xtype: 'tbfill' },
		                                {
		                                    xtype: 'button',
		                                    itemId: 'isParentSchemeOfCasPanelGridButton',
           									bodyPadding: 5,
           									width: 63,
            								margins: '0 17 0 0',
		                                    text: 'Agregar',
		                                    handler: function(){
			                                    var ventana = Ext.widget('categoryv1selectiontype');
			       								ventana.show();
			                                    //var grid = this.up('fieldset').down('#isParentSchemeOfCasPanelGrid');
			                                    //if(grid.isHidden()){
			                                    //    grid.setVisible(true);
			                                    //    grid.on('afterlayout', function(){
			                                    //        this.center();
			                                    //    });
			                                   // }
			                                   // else
			                                   //     grid.setVisible(false);
			                                }
		                                }
		
		                            ]
		                       }]
                        }]
                    }*/
                    
                    ]
                },
                /**{
	                    xtype:'fieldset',  
	                    title: 'Categorías (Se debe crear al menos una Categoría)',
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
	                            	xtype: 'categoryv1grid_ext',
	                            	padding: '5 5 5 5',
                                	itemId: 'isParentSchemeOfCasGrid',
                                	selType: 'checkboxmodel',
                               		autoScroll: true,
                               	    height: '',
						            selModel: {
						                checkOnly: false,
						                injectCheckbox: 0,
						                mode: 'SINGLE',
						                allowDeselect: true,
						                showHeaderCheckbox: false
						            },
	                            
	                                store: new Ext.data.Store({
	                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
	                                    pageSize: 10,    
	                                    proxy: {
	                                        type: 'pagingmemoryb',
	                                        data: []
	                                    }
                               		}),
	                                
	                            },
	                             
	                            
	                            ]
	                        }
	                        
	                        ]
	                    }
	                   
	                    ]
                	}**/
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
