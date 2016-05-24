Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.UserRole', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userrole',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Rol de Usuario',
	                   collapsible: true,
	                   hidden: false,
	                   columnWidth: 1,
	                   layout: 'column',
	                   defaults: {
	                      anchor: '100%',
	                      columnWidth: .333
	                    },
                        items: [
						{
							xtype: 'combo',
							fieldLabel: 'Rol de Usuario del Sistema',
							name: 'playerRole',
							columnWidth: .25,
							padding: '0 10 10 0',
							queryMode: 'local',
							hidden: false,
							valueField: 'enumerationLiteralEnu',
							displayField: 'descriptionEnu',
						}],
                        
                    }];
        this.callParent(arguments);
    }
});