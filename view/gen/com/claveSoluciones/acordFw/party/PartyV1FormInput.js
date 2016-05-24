Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PartyV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.partyv1forminput',
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
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
