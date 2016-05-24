Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.exchangeratev1formsearch',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'combo',
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Moneda Desde',
            emptyText: 'Seleccione ...',
            name: 'fromCurrencyTypeExternalCodeExr',
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
            valueField: 'externalCodeExc',
            displayField: 'descriptionExc',
            store: new Ext.data.Store({
                model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
                remoteSort: true,
                autoLoad: false,
                pageSize: 9999,
                proxy: {
                    type: 'rest',
                    url: urlService + 'externalCodeService/findByExternalCodeType',
                    actionMethods: {
                        read: 'POST'
                    },
                    extraParams: {
                        code: 'CurrencyCode'
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
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Moneda Hasta',
            emptyText: 'Seleccione ...',
            name: 'toCurrencyTypeExternalCodeExr',
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
            valueField: 'externalCodeExc',
            displayField: 'descriptionExc',
            store: new Ext.data.Store({
                model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
                remoteSort: true,
                autoLoad: false,
                pageSize: 9999,
                proxy: {
                    type: 'rest',
                    url: urlService + 'externalCodeService/findByExternalCodeType',
                    actionMethods: {
                        read: 'POST'
                    },
                    extraParams: {
                        code: 'CurrencyCode'
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
            xtype: 'datefield',
            fieldLabel: 'Fecha de Cambio',
            emptyText: 'Ingrese Fecha de Cambio',
            name: 'asOfDateExr',
            columnWidth: .25,
            padding: '0 10 10 0',
            format: 'd/m/Y',
            submitFormat: 'c',
            editable: true
        }
    ],
    buttons:[{
        text: 'Limpiar',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
