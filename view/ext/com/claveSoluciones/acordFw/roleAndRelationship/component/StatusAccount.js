Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusAccount', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.statusaccount',
	require: 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusToolbarAccount',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Estado de la Cuenta Comercial',
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
							xtype: 'textfield',
							fieldLabel: 'Estado',
							emptyText: 'Ingrese Estado',
							name: 'statusCur',
							hidden: false,
							readOnly: true,
							columnWidth: .25,
							padding: '0 10 10 0',
							maxLength: 255,
							enforceMaxLength: true,							
							}, 
							{
								xtype: 'statustoolbaraccount',
								columnWidth: .6666
							}
						],                        
                        }];
        this.callParent(arguments);
    }
});