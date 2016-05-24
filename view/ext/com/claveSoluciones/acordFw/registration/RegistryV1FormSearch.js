Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.registryv1formsearch_ext',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
       
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
