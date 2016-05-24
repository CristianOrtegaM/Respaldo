Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.virtualpartynamev1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1Grid'],
    title: 'Nombre de la Parte Virtual',
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
        listeners:{
            expand: function(cmp) {
                cmp.updateLayout();
            }
        },
        items: [{
            xtype: 'virtualpartynamev1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'virtualpartynamev1grid',
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
