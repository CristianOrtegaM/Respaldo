Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.personnamev1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº de Parte',
            emptyText: 'Ingrese Nº de Parte',
            name: 'partyNameIdentifierPan_fs',
            columnWidth: .5,
            decimalPrecision: 0,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            maxLength: 10,
            hidden: false,
            listeners: {
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tipo Nombre',
            emptyText: 'Ingrese Tipo Nombre',
            name: 'typeNameImo_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre Completo',
            emptyText: 'Ingrese Nombre Completo',
            name: 'fullNamePan_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Idioma',
            emptyText: 'Ingrese Idioma',
            name: 'languageExternalCodePan_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'combo',
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Título',
            emptyText: 'Seleccione ...',
            name: 'prefixTitleCodePen_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            },
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
                        enumName: 'PrefixTitleCodeList'
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
            fieldLabel: 'Primer Nombre',
            emptyText: 'Ingrese Primer Nombre',
            name: 'givenNamePen_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Segundo Nombre',
            emptyText: 'Ingrese Segundo Nombre',
            name: 'middleNamePen_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'combo',
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Uso',
            emptyText: 'Seleccione ...',
            name: 'usageCodePen_fs',
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
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            },
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
                        enumName: 'PersonNameUsageCodeList'
                    },
                    reader: {
                        rootProperty: 'datos',
                        successProperty: 'valido',
                        totalProperty: 'totalRegistros'
                    }
                }
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
