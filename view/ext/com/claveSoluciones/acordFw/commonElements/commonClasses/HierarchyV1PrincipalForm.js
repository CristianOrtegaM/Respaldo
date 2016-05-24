Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.HierarchyV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.hierarchyv1principalform',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.HierarchyV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.HierarchyV1Grid'],
    title: 'Jerarquía',
    border: false,
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
            xtype: 'hierarchyv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'hierarchyv1grid',
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
