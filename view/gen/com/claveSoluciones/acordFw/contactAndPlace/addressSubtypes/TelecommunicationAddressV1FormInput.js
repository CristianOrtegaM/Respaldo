Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.telecommunicationaddressv1forminput',
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
                    title: 'Información Del Modelo De Objetos',
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
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'basicDataCompleteCode',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'basicDataCompleteCodeImo',
                        allowBlank: true,
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
                                    enumName: 'DataCompleteCodeList'
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
                        fieldLabel: 'Creación Fecha Hora',
                        emptyText: 'Ingrese Creación Fecha Hora',
                        name: 'creationDateTimeImo',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'creationUser',
                        emptyText: 'Ingrese creationUser',
                        name: 'creationUserImo',
                        allowBlank: true,
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
                        fieldLabel: 'typeName',
                        emptyText: 'Ingrese typeName',
                        name: 'typeNameImo',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .5,
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
                        xtype: 'datefield',
                        fieldLabel: 'updateDateTime',
                        emptyText: 'Ingrese updateDateTime',
                        name: 'updateDateTimeImo',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'updateUser',
                        emptyText: 'Ingrese updateUser',
                        name: 'updateUserImo',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
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
                        fieldLabel: 'key',
                        emptyText: 'Ingrese key',
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
                    }]
                },{
                    xtype:'fieldset',  
                    title: 'Dirección de Red',
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
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Direccioón de Red',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'networkAddressKindNea',
                        allowBlank: true,
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
                                    enumName: 'NetworkAddressKTypeCodeList'
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
                        fieldLabel: 'Identificador',
                        emptyText: 'Ingrese Identificador',
                        name: 'identifierNea',
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
                    }]
                },{
                    xtype:'fieldset',  
                    title: 'Dirección de Telecomunicaciones',
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
                        fieldLabel: 'Dirección de Telecomunicación',
                        emptyText: 'Ingrese Dirección de Telecomunicación',
                        name: 'telecommunicationAddressKindTea',
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
                        fieldLabel: 'Número Local',
                        emptyText: 'Ingrese Número Local',
                        name: 'localNumberTea',
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
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
