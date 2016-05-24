Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.periodv1principalform_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1Grid'],
    title: 'Período',
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
	    		cmp.updateLayout();
	    	}
		},
        items: [{
            xtype: 'periodv1formsearch_ext'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'periodv1grid_ext',
            selType: 'checkboxmodel',
            selModel: {
                checkOnly: false,
                injectCheckbox: 0,
                mode: 'SIMPLE',
                allowDeselect: true,
                showHeaderCheckbox: false
            },
        }]
    }]
});
