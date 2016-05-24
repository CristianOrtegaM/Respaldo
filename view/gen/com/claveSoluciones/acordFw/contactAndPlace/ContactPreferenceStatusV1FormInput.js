Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.contactpreferencestatusv1forminput',
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
                    title: 'Estado de Preferencia de Contacto',
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
                        fieldLabel: 'Estado',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'codePst',
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
                                    enumName: 'ContactPreferenceStatusCodeList'
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
                        fieldLabel: 'Fecha y Hora Efectiva',
                        emptyText: 'Ingrese Fecha y Hora Efectiva',
                        name: 'effectiveDateTimeSta',
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
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'nameSta',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
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
                        xtype: 'textfield',
                        fieldLabel: 'Motivo',
                        emptyText: 'Ingrese Motivo',
                        name: 'reasonSta',
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
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
