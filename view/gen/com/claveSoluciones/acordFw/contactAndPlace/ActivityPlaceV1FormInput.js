Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ActivityPlaceV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.activityplacev1forminput',
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
                    title: 'Lugar de la Actividad',
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
                        xtype: 'numericfield',
                        fieldLabel: 'Activity Place Identifier',
                        emptyText: 'Ingrese Activity Place Identifier',
                        name: 'activityPlaceIdentifierAcp',
                        allowBlank: true,
                        decimalPrecision: 0,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        fieldStyle: 'text-align: right;',
                        mouseWheelEnabled: false,
                        minValue: 0,
                        maxLength: 10,
                        negativeText: 'El valor no puede ser negativo'
                    }]
                },{
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
                        xtype: 'textfield',
                        fieldLabel: 'basicDataCompleteCode',
                        emptyText: 'Ingrese basicDataCompleteCode',
                        name: 'basicDataCompleteCodeImo',
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
                        fieldLabel: 'creationDateTime',
                        emptyText: 'Ingrese creationDateTime',
                        name: 'creationDateTimeImo',
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
                        xtype: 'textfield',
                        fieldLabel: 'creationUser',
                        emptyText: 'Ingrese creationUser',
                        name: 'creationUserImo',
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
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
