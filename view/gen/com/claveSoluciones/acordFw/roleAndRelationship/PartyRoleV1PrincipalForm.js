Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.partyrolev1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Grid'],
    title: 'Rol de Usuario',
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
            xtype: 'partyrolev1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'partyrolev1grid',
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
