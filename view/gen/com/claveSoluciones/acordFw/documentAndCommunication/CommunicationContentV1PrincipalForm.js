Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationcontentv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Grid'],
    title: 'Contenido de la Comunicación',
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
            xtype: 'communicationcontentv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'communicationcontentv1grid',
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
