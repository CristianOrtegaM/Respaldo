Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.registryv1principalform_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1Grid'],
    title: 'Especificación de Libro de Registro',
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
        title: 'Busqueda',
        collapsible: true,
        collapsed: true,
        titleCollapse: true,
        items: [{
            xtype: 'registryv1formsearch_ext'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'registryv1grid_ext',
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
