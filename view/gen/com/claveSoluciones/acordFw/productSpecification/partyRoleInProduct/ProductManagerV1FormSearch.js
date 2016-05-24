Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.productmanagerv1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº de Rol',
            emptyText: 'Ingrese Nº de Rol',
            name: 'roleIdentifierRol_fs',
            columnWidth: .25,
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
