Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.externalcodev1formsearch',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº',
            emptyText: 'Ingrese Nº',
            name: 'externalCodeIdentifierExc',
            columnWidth: .25,
            decimalPrecision: 0,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            maxLength: 10,
            hidden: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'creationUser',
            emptyText: 'Ingrese creationUser',
            name: 'creationUserImo',
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
            fieldLabel: 'key',
            emptyText: 'Ingrese key',
            name: 'keyImo',
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
            fieldLabel: 'typeName',
            emptyText: 'Ingrese typeName',
            name: 'typeNameImo',
            columnWidth: .5,
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
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Tipo',
            emptyText: 'Seleccione ...',
            name: 'externalCodeListExc',
            columnWidth: .5,
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
                        code: 'ExternalCode'
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
            name: 'externalCodeExc',
            columnWidth: .5,
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
            name: 'descriptionExc',
            columnWidth: .75,
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
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Lenguaje',
            emptyText: 'Seleccione ...',
            name: 'languageExternalCodeExc',
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
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Usable',
            emptyText: 'Seleccione ...',
            name: 'usableIndicatorExc',
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
        }
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
