Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataInsuranceProvider', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.datainsuranceprovider',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
                                xtype: 'fieldset',
                                title: 'Datos del Asegurador',
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
									 fieldLabel: 'Compañía de Seguros',
									 name: 'insuranceProviderPrr',
									 itemId: 'insuranceProviderPrr',
									 autoLoadOnValue: true,
									 columnWidth: 1,
									 padding: '0 10 10 0',
									 forceSelection: true,
									 queryMode: 'local',
									 allowBlank: false,
									 //renderTo: Ext.getBody(),
									 afterLabelTextTpl: [
											'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
									 ],
									 valueField: 'playerPartyPar',
									 listConfig: {
											getInnerTpl: function(df) {
												return '<span>{[values.playerPartyPar.keyImo]} - {[values.playerPartyPar.nameOrg[0].fullNamePan]}</span>';
											}
									 },
									 displayField: 'playerPartyPar',
									 displayTpl: Ext.create('Ext.XTemplate',
												'<tpl for=".">',
												'<tpl if="playerPartyPar != \'\'">',
													'{[values.playerPartyPar.keyImo]} - {[values.playerPartyPar.nameOrg[0].fullNamePan]}',
												'<tpl else>',
													'',
												'</tpl>',
											'</tpl>'
									 ),
									 listeners: {
										select: function(cmp){
											//console.log(cmp);
											//console.log(this.getStore());
										},
										afterrender: function(cmp){
											//cmp.fireEvent('loadStoreInsuranceProvider',cmp);
											//this.getStore.load();
										}
									},
								}
                                 ],
                                
                            }];
        this.callParent(arguments);
    }
});