Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.productassociationv1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº de Asociación de Producto',
            emptyText: 'Ingrese Nº de Asociación de Producto',
            name: 'productAssociationIdentifierPra_fs',
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
