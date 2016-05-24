Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1FormInput', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.enumerationv1forminput_ext',
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
                        padding: '10 0 0 10',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Especificación',
                                collapsible: true,
                                hidden: false,
                                columnWidth: 1,
                                layout: 'column',
                                defaults: {
                                    anchor: '100%',
                                    columnWidth: .25
                                },
                                items: [
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo',
                                        autoLoadOnValue: true,
                                        emptyText: 'Seleccione ...',
                                        name: 'enumerationEnu',
                                        allowBlank: false,
                                        afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        queryMode: 'local',
                                        editable: false,
                                        minChars: 0,
                                        listeners: {
                                            focus: function(combo) {
                                                combo.getStore().load({
                                                    callback: function() {
                                                        if (combo.readOnly === false) {
                                                            combo.expand();
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        hidden: false,
                                        valueField: 'externalCodeExc',
                                        displayField: 'descriptionExc',
                                        store: new Ext.data.Store({
                                            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
                                                    this.setValue(tf.getValue().trim());
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Descripción',
                                        emptyText: 'Ingrese Descripción',
                                        name: 'descriptionEnu',
                                        allowBlank: true,
                                        hidden: false,
                                        columnWidth: 1,
                                        padding: '0 10 10 0',
                                        regex: nameReg1,
                                        regexText: 'Campo inválido',
                                        maxLength: 255,
                                        enforceMaxLength: true,
                                        listeners: {
                                            blur: function(tf) {
                                                if (tf.getValue != "")
                                                    this.setValue(tf.getValue().trim());
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Lenguaje',
                                        autoLoadOnValue: true,
                                        emptyText: 'Seleccione ...',
                                        name: 'languageExternalCodeEnu',
                                        allowBlank: false,
                                        afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        queryMode: 'local',
                                        editable: false,
                                        minChars: 0,
                                        listeners: {
                                            focus: function(combo) {
                                                combo.getStore().load({
                                                    callback: function() {
                                                        if (combo.readOnly === false) {
                                                            combo.expand();
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        hidden: false,
                                        valueField: 'externalCodeExc',
                                        displayField: 'descriptionExc',
                                        store: new Ext.data.Store({
                                            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
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
                                        fieldLabel: 'Usable',
                                        autoLoadOnValue: true,
                                        emptyText: 'Seleccione ...',
                                        name: 'usableIndicatorEnu',
                                        allowBlank: false,
                                        afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        queryMode: 'local',
                                        editable: false,
                                        minChars: 0,
                                        listeners: {
                                            focus: function(combo) {
                                                combo.getStore().load({
                                                    callback: function() {
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
                                            data: [['Sí', true], ['No', false]]
                                        })
                                    }]
                            }
                        ]
                    }]
            }];
        this.callParent(arguments);
    }
});
