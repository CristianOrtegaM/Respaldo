Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataGovernmentAgency', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.datagovernmentagency',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Datos del Organismo de Gobierno',
	                   collapsible: true,
	                   hidden: false,
	                   columnWidth: 1,
	                   layout: 'column',
	                   defaults: {
	                      anchor: '100%',
	                      columnWidth: .333
	                    },
                        items: []

                    }];
        this.callParent(arguments);
    }
});