Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.CategoryMembershipNew', {
	extend: 'Ext.window.Window',
	alias: 'widget.categorymembershipnew',
	addMode: false,
    width: 610,
    height: 280,
    title: 'Categoría',
    modal: true,
    autoScroll: true,
    layout: 'fit',
    bodyPadding: 10,
    draggable: false,
    resizable: false,
    listeners: {
    	beforerender: function(win){
    		AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1');
    		AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryV1');
    		AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryMembershipV1');
    	}
    },
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	
        	itemId: 'categoryMembershipItem',
        	border: false,
        	fieldDefaults: {
                labelAlign: 'top',
                style: 'font-size: 14px'
            },
            layout: 'column',
            defaults: {
            	columnWidth: .25
            },
            items: [{
            	xtype:'fieldset',
                title: 'Membresía de Categoría',
                collapsible: true,
                hidden: false,
                columnWidth: 1,
                layout: 'column',
                defaults: {
                    anchor: '100%',
                    columnWidth: .25
                },
                items:[{
	            	xtype: 'combo',
	                fieldLabel: 'Esquema de Categoría',
	                autoLoadOnValue: true,
	                emptyText: 'Seleccione ...',
	                name: 'categoryScheme',
	                allowBlank: false,
	                afterLabelTextTpl: [
	                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
	                ],
	                columnWidth: .5,
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
	                    },
	                    select: function(cb,records){
	                    	var categoryCombo = cb.up('window').down('combobox[name="categorizingCategoryCam"]');
	                    	categoryCombo.setDisabled(false);
	                    	var schemeValues = records[0].get('isParentSchemeOfCas');
	                    	categoryCombo.getStore().loadData(schemeValues, false);
	                    }
	                },
	                hidden: false,
	                valueField: 'categorySchemeIdentifierCas',
	                displayField: 'categorySchemeNameCas',
	                forceSelection: true,
	                store: new Ext.data.Store({
	                    model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1',
	                    remoteSort: true,
	                    autoLoad: false,
	                    pageSize: 50,
	                    sorters: [{
	                        property: 'categorySchemeIdentifierCas',
	                        direction: 'DESC'
	                    }],
	                    proxy: {
	                        type: 'rest',
	                        url: urlService + 'categorySchemeService/findByFilter',
	                        actionMethods: {
	                            read: 'POST'
	                        },
	                        extraParams: {
	                            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	                                nombreCampo: 'class',
	                                valor: 'CategoryScheme',
	                                valores: null,
	                                operacion: '=',
	                                tipoValor: 'string'
	                            }).data])
	                        },
	                        reader: {
	                            rootProperty: 'datos',
	                            successProperty: 'valido',
	                            totalProperty: 'totalRegistros'
	                        }
	                    }
	                })
	            }, {
	            	xtype: 'combo',
	                fieldLabel: 'Categoría',
	                autoLoadOnValue: true,
	                emptyText: 'Seleccione ...',
	                name: 'categorizingCategoryCam',
	                allowBlank: false,
	                disabled: true,
	                afterLabelTextTpl: [
	                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
	                ],
	                columnWidth: .5,
	                padding: '0 10 10 0',
	                queryMode: 'local',
	                typeAhead: true,
	                minChars: 0,
//	                listeners: {
//	                    focus: function(combo){
//	                        combo.getStore().load({
//	                            callback: function(){
//	                                combo.expand();
//	                            }
//	                        });
//	                    }
//	                }, 
	                hidden: false,
	                valueField: 'categoryIdentifierCat',
	                displayField: 'categoryNameCat',
	                forceSelection: true,
	                store: new Ext.data.Store({
	                    model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1',
	                    data:[]
	                })
            }, {
            	xtype: 'datefield',
                fieldLabel: 'Inicio de Vigencia',
                emptyText: 'Ingrese Inicio de Vigencia',
                name: 'effectivePeriodStartDateTimeCam',
                allowBlank: false,
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                ],
                hidden: false,
	            value: new Date(),
                columnWidth: .5,
                padding: '0 10 10 0',
                format: 'd/m/Y',
                submitFormat: 'd-m-Y H:i:s',
                editable: false
            }, {
            	xtype: 'datefield',
                fieldLabel: 'Término de Vigencia',
                emptyText: 'Ingrese Término de Vigencia',
                name: 'effectivePeriodEndDateTimeCam',
                hidden: false,
                columnWidth: .5,
                padding: '0 10 10 0',
                format: 'd/m/Y',
                submitFormat: 'd-m-Y H:i:s',
                editable: false
	            }]
            }]
        }];
        this.buttons = [{
        	text: 'Guardar',
        	handler: function(btn){
        		AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryMembershipV1').create(btn);
        	}
        },{
        	text: 'Cancelar',
        	handler: function(){
        		this.up('window').close();
        	}
        }];
        this.callParent(arguments);
    }
});