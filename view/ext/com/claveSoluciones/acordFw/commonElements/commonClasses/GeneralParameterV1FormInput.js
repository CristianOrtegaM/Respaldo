Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.generalparameterv1forminput_ext',
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
                    xtype:'fieldset',
                    title: 'Especificación',
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
                        name: 'codeGep',
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
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'nameGep',
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
                        xtype: 'combo',
                        fieldLabel: 'Tipo',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'dataTypeGep',
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
                            focus: function(combo){
                                combo.getStore().load({
                                    callback: function(){
                                    	if(combo.readOnly===false){
                                           combo.expand();
                                        }
                                    }
                                });
                            },
                            change : function(tf){
        						if(tf.getValue()=='Date'){
        							tf.up('window').down('[name="stringValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="numberValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="stringValueGep"]').setValue("");
        							tf.up('window').down('[name="numberValueGep"]').setValue(null);
        							tf.up('window').down('[name="dateValueGep"]').setReadOnly(false);
        							tf.up('window').down('[name="dateValueGep"]').allowBlank = false;
        							tf.up('window').down('[name="numberValueGep"]').allowBlank = true;
        							tf.up('window').down('[name="stringValueGep"]').allowBlank = true;
        						} else if (tf.getValue()=='Number') {
        							tf.up('window').down('[name="stringValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="numberValueGep"]').setReadOnly(false);
        							tf.up('window').down('[name="dateValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="stringValueGep"]').setValue("");
        							tf.up('window').down('[name="dateValueGep"]').setValue("");
        							tf.up('window').down('[name="numberValueGep"]').allowBlank = false;
        							tf.up('window').down('[name="dateValueGep"]').allowBlank = true;
        							tf.up('window').down('[name="stringValueGep"]').allowBlank = true;
        						} else if (tf.getValue()=='Varchar') {
        							tf.up('window').down('[name="stringValueGep"]').setReadOnly(false);
        							tf.up('window').down('[name="numberValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="dateValueGep"]').setReadOnly(true);
        							tf.up('window').down('[name="numberValueGep"]').setValue(null);
        							tf.up('window').down('[name="dateValueGep"]').setValue("");
        							tf.up('window').down('[name="stringValueGep"]').allowBlank = false;
        							tf.up('window').down('[name="dateValueGep"]').allowBlank = true;
        							tf.up('window').down('[name="numberValueGep"]').allowBlank = true;
        						}
                              if(tf.getValue()!="" || tf.getValue()===false){
                                tf.addCls('x-complete-field');
                              } else {
                                    tf.removeCls('x-complete-field');
                                }
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
                                    enumName: 'DataTypeCodeList'
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
                        fieldLabel: 'Valor Texto',
                        emptyText: 'Ingrese Valor Texto',
                        name: 'stringValueGep',
                        allowBlank: true,
                        hidden: false,
                        readOnly: true,
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
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Valor Numérico',
                        emptyText: 'Ingrese Valor Numérico',
                        name: 'numberValueGep',
                        allowBlank: true,
                        hidden: false,
                        readOnly: true,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Valor Fecha',
                        emptyText: 'Ingrese Valor Fecha',
                        name: 'dateValueGep',
                        allowBlank: true,
                        hidden: false,
                        readOnly: true,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
