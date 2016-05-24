Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.StatusV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.statusv1formsearch',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº de Estado',
            emptyText: 'Ingrese Nº de Estado',
            name: 'statusIdentifierSta',
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
            fieldLabel: 'Nombre',
            emptyText: 'Ingrese Nombre',
            name: 'nameSta',
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
            fieldLabel: 'Motivo',
            emptyText: 'Ingrese Motivo',
            name: 'reasonSta',
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
