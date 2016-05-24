Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.attributerangerulev1principalform',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1Grid'],
    title: 'Regla de Atributo de Rango',
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
            xtype: 'attributerangerulev1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'attributerangerulev1grid',
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
