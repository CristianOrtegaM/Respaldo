Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.ProductGroupV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.productgroupv1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.ProductGroupV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.ProductGroupV1Grid'],
    title: 'Grupos de Productos',
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
            xtype: 'productgroupv1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'productgroupv1grid',
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
