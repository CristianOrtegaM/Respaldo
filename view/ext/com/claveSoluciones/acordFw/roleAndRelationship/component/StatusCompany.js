Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusCompany', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.statuscompany',
	require: 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusToolbar',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: '',
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
							name: 'status',
							hidden: false,
							readOnly: true,
							columnWidth: .25,
							padding: '0 10 10 0',
							maxLength: 255,
							enforceMaxLength: true,
							listeners: {
								blur: function(tf){
									if(tf.getValue!="")
										this.setValue(tf.getValue().trim());
								},
								change: function(tf){
								  if(tf.getValue()!=""){
									tf.addCls('x-complete-field');
								  } else {
										tf.removeCls('x-complete-field');
									}
								}
								}
							}, {
								xtype: 'statustoolbar',
								columnWidth: .6666
							}
						],                        
                        }];
        this.callParent(arguments);
    }
});