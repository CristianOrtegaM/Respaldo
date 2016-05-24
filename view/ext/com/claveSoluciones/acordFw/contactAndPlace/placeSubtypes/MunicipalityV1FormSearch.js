Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.municipalityv1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            decimalPrecision: 0,
            fieldLabel: 'Nº',
            emptyText: 'Ingrese Nº de Lugar',
            name: 'placeIdentifierPla',
            columnWidth: .25,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            hidden: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            emptyText: 'Ingrese Nombre',
            name: 'namePla',
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
            fieldLabel: 'Código Ciudad',
            emptyText: 'Ingrese Código Ciudad',
            name: 'assignedExternalCodeMun',
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
