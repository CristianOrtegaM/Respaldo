Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.enumerationv1formsearch_ext',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
        	xtype: 'numericfield',
	        maxLength: 10,
            fieldLabel: 'Nº',
            emptyText: 'Ingrese Nº',
            name: 'enumerationIdentifierEnu',
            columnWidth: .25,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            hidden: false
        },
        {
            xtype: 'combo',
            autoLoadOnValue: true,
            fieldLabel: 'Tipo',
            emptyText: 'Seleccione ...',
            name: 'enumerationEnu',
            columnWidth: .25,
            padding: '0 10 10 0',
            queryMode: 'local',
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
                        code: 'EnumerationCode'
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
            xtype: 'textfield',
            fieldLabel: 'Código',
            emptyText: 'Ingrese Código',
            name: 'enumerationLiteralEnu',
            columnWidth: .25,
            padding: '0 10 10 0',
            regex: searchReg1,
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
            fieldLabel: 'Descripción',
            emptyText: 'Ingrese Descripción',
            name: 'descriptionEnu',
            columnWidth: 1,
            padding: '0 10 10 0',
            regex: searchReg1,
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
            xtype: 'combo',
            autoLoadOnValue: true,
            fieldLabel: 'Lenguaje',
            emptyText: 'Seleccione ...',
            name: 'languageExternalCodeEnu',
            columnWidth: .25,
            padding: '0 10 10 0',
            queryMode: 'local',
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
                        code: 'LanguageCode'
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
            autoLoadOnValue: true,
            fieldLabel: 'Usable',
            emptyText: 'Seleccione ...',
            name: 'usableIndicatorEnu',
            columnWidth: .25,
            padding: '0 10 10 0',
            queryMode: 'local',
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
            valueField: 'valor',
            displayField: 'nombre',
            store: new Ext.data.ArrayStore({
                fields: ['nombre', 'valor'],
                data: [['Sí', true], ['No', false] ]
            })
        }
    ],
    buttons:[{
        text: 'Limpiar',
        handler: function() {
            this.up('form').getForm().reset();
        },
       
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
