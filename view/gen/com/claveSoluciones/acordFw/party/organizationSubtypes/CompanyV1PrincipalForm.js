Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.companyv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Grid'],
    title: 'Empresa',
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
            xtype: 'companyv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'companyv1grid',
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
