Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataReinsuranceCompany', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.datareinsurancecompany',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Datos de la Compañía de Reaseguros',
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
								fieldLabel: 'Vigencial Inicial',
								name: 'rolePlayerPeriodStartDateTimeRol',
								columnWidth: .25,
								padding: '0 10 10 0',
								allowBlank: false,
								format : 'd/m/Y',
								submitFormat : 'd-m-Y H:i:s',
                        		afterLabelTextTpl: [
                            		'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        		],
                        		editable: false
							},  
							{
								xtype: 'datefield',
								fieldLabel: 'Vigencial Final',
								name: 'rolePlayerPeriodEndDateTimeRol',
								format : 'd/m/Y',
								submitFormat : 'd-m-Y H:i:s',
								columnWidth: .25,
								padding: '0 10 10 0',
								editable: true
							}, 
							{
								columnWidth: .5,
								bodyStyle: 'border-color: white;'
							},
	                        {
								xtype: 'textarea',
								fieldLabel: 'Descripción',
								maxLength: 255,
								name: 'descriptionRol',
								columnWidth: 1,
								padding: '0 10 10 0',
							},	
							{
								xtype: 'textfield',
								fieldLabel: 'Alias Lloyds',
								name: 'lloydsAliasRec',
								columnWidth: .25,
								padding: '0 10 10 0',
								allowBlank: false,
                        		afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        		],
							},
							{
								xtype: 'textfield',
								fieldLabel: 'Alias Secundario',
								name: 'secondaryAliasRec',
								columnWidth: .25,
								padding: '0 10 10 0',
							},
							{
								xtype: 'textfield',
								fieldLabel: 'Nombre Alias Lloyds Sindicado',
								name: 'lloydsSyndicateNameRec',
								columnWidth: .25,
								padding: '0 10 10 0',
								allowBlank: false,
                        		afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        		]
							},
							{
								xtype: 'textfield',
								fieldLabel: 'Nombre Alias Lloyds Sub Sindicado',
								name: 'lloydsSubSyndicateNameRec',
								columnWidth: .25,
								padding: '0 10 10 0',
							},
                            {
								xtype: 'textfield',
								fieldLabel: 'Nombre de Grupo Lloyds',
								name: 'lloydsGroupNameRec',
								columnWidth: .5,
								padding: '0 10 10 0',
								allowBlank: false,
                        		afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        		]
							},	
							{
								xtype      : 'fieldcontainer',
								fieldLabel : 'En Liquidación',
								defaultType: 'radiofield',
								columnWidth: .25,
								defaults: {
									flex: 1
								},
								layout: 'hbox',
								items: [
									{
										boxLabel  : 'Sí',
										name      : 'marketInLiquidationIndicatorRec',
										inputValue: 'Sí',
										id        : 'radio1'
									}, {
										boxLabel  : 'No',
										name      : 'marketInLiquidationIndicatorRec',
										inputValue: 'No',
										id        : 'radio2'
									}
								]
							},							
							
						],
                        
                        }];
        this.callParent(arguments);
    }
});