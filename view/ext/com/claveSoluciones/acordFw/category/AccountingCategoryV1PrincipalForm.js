Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.accountingcategoryv1principalform_ext',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.AccountingCategoryV1PrincipalWindow',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1PrincipalWindow'],
    title: 'Categoría',
    border: false,
    heigth: '100%',
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 85,
        msgTarget: 'side'
    },
    items: [
        
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'heterogeneoustree'
         
        }]
    },{
    	xtype: 'tabbar',
    	items:[{
                xtype: 'button',
                text: 'Nuevo',
                action: 'nuevo'
            }
    	]
    }
    
    ]
});

