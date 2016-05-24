Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataClient', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataclient',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Datos del Cliente',
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
							xtype: 'datefield',
							fieldLabel: 'Vigencia Inicial',
							name: 'rolePlayerPeriodStartDateTimeRol',
							columnWidth: .25,
							padding: '0 10 10 0',
							format : 'd/m/Y',
							submitFormat : 'd-m-Y H:i:s',
							allowBlank: false,
                        	afterLabelTextTpl: [
                            	'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        	],
                        	editable: false
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Vigencia Final',
							name: 'rolePlayerPeriodEndDateTimeRol',
							columnWidth: .25,
							padding: '0 10 10 0',
							format : 'd/m/Y',
							submitFormat : 'd-m-Y H:i:s',
							editable: true
						},
						{
							xtype      : 'fieldcontainer',
							fieldLabel : 'Principal',
							defaultType: 'radiofield',
							columnWidth: .25,
							defaults: {
								flex: 1
							},
							layout: 'hbox',
							items: [
								{
									boxLabel  : 'Sí',
									name      : 'primaryIndicatorCus',
									inputValue: true,
									id        : 'radio1_dataclient'
								}, {
									boxLabel  : 'No',
									name      : 'primaryIndicatorCus',
									inputValue: false,
									id        : 'radio2_dataclient'
								}
							]
						},
						{
							xtype: 'textarea',
							fieldLabel: 'Descripción',
							maxLength: 255,
							name: 'descriptionRol',
							columnWidth: 1,
							padding: '0 10 10 0',
						}
						],

                    }];
        this.callParent(arguments);
    }
});