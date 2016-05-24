Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.externalcodev1principalform_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1FormSearch',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1Grid'],
    addMode: false,
    width: '80%',
    height: '40%',
    title: 'Código Externo',
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
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
            xtype: 'externalcodev1formsearch_ext'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'externalcodev1grid_ext',
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
