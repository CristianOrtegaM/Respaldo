Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.countryv1principalform_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Grid'],
    title: 'País',
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
            xtype: 'countryv1formsearch_ext'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'countryv1grid_ext',
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
