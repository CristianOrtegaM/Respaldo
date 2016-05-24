Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.GeneralOwnershipNew', {
	extend: 'Ext.window.Window',
	alias: 'widget.generalownershipnew',
	addMode: false,
    width: 600,
    height: 400,
    title: 'Categoría',
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	itemId: 'generalOwnershipItem',
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
            	xtype: 'combo',
                fieldLabel: 'Esquema',
                autoLoadOnValue: true,
                emptyText: 'Seleccione ...',
                name: 'broadLineOfBusinessCodePrs',
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
                            enumName: 'BroadLineOfBusinessCodeList'
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
                fieldLabel: 'Esquema',
                autoLoadOnValue: true,
                emptyText: 'Seleccione ...',
                name: 'broadLineOfBusinessCodePrs',
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
                            enumName: 'BroadLineOfBusinessCodeList'
                        },
                        reader: {
                            rootProperty: 'datos',
                            successProperty: 'valido',
                            totalProperty: 'totalRegistros'
                        }
                    }
                })
            }, {
            	xtype: 'datefield',
                fieldLabel: 'Inicio de Vigencia',
                emptyText: 'Ingrese Inicio de Vigencia',
                name: 'marketablePeriodStartDateTimePrs',
                allowBlank: false,
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                ],
                hidden: false,
                columnWidth: .25,
                padding: '0 10 10 0',
                format: 'd/m/Y',
                submitFormat: 'd-m-Y H:i:s',
                editable: false
            }, {
            	xtype: 'datefield',
                fieldLabel: 'Término de Vigencia',
                emptyText: 'Ingrese Término de Vigencia',
                name: 'marketablePeriodStartDateTimePrs',
                hidden: false,
                columnWidth: .25,
                padding: '0 10 10 0',
                format: 'd/m/Y',
                submitFormat: 'd-m-Y H:i:s',
                editable: true
            }]
        }];
        this.buttons = [{
        	text: 'Guardar',
        	action: 'saveConflictRequisite'
        },{
        	text: 'Cancelar',
        	handler: function(){
        		this.up('window').close();
        	}
        }];
        this.callParent(arguments);
    }
});