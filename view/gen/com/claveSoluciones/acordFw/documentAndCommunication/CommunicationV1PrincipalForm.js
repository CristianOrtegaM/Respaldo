Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1Grid'],
    title: 'Comunicación',
    border: false,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 85,
        msgTarget: 'side'
    },
    items: [{
        xtype: 'panel',
        anchor: '98.5%',
        x: 10,
        cls: 'panelheader',
        title: 'Búsqueda',
        collapsible: true,
        collapsed: true,
        titleCollapse: true,
        items: [{
            xtype: 'communicationv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'communicationv1grid',
            selType: 'checkboxmodel',
            selModel: {
                checkOnly: false,
                injectCheckbox: 0,
                mode: 'SINGLE',
                allowDeselect: true,
                showHeaderCheckbox: false
            }
        }]
    }]
});
