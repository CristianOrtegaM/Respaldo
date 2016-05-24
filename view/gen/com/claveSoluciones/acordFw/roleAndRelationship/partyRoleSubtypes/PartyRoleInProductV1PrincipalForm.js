Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInProductV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.partyroleinproductv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInProductV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInProductV1Grid'],
    title: 'Rol de Parte en Producto',
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
            xtype: 'partyroleinproductv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'partyroleinproductv1grid',
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
