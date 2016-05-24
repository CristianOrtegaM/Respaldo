Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInRegistrationV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.partyroleinregistrationv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInRegistrationV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInRegistrationV1Grid'],
    title: 'Rol de Parte en Registro',
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
            xtype: 'partyroleinregistrationv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'partyroleinregistrationv1grid',
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
