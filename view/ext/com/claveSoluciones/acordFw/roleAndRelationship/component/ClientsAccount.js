Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.ClientsAccount', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clientsaccount',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    
    initComponent: function() {
        this.items = [{
                                xtype: 'fieldset',
                                title: 'Clientes en la Cuenta Comercial',
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
		                                xtype: 'customerv1grid_ext',
		                                columnWidth: 1,
		                                itemId: 'customerv1grid_clientsaccount',
		                                autoScroll: true,
		                                height: '',
		                                store: new Ext.data.Store({
		                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1',
		                                    data: []
		                                }),
		                                listeners: {
		                                    beforerender: function(){
		                                        this.getStore().load();
		                                    }
		                                 }
                            	},
		                        {
		                            xtype: 'toolbar',
		                          	columnWidth: 1,
		                            items: [
		                                { xtype: 'tbfill' },
		                                {
		                                    xtype: 'button',
		                                    action: 'agregarCustomer',
		                                    name: 'AgregarCustomer',
		                                    text: 'Agregar',
		                                },
		                                {
		                                    xtype: 'button',
		                                    action: 'quitarCustomer',
		                                    name: 'QuitarCustomer',
		                                    text: 'Quitar',
		                                    handler: function() {
		                                        this.up('window').close();
		                                    }
		                                }
		
		                            ]
		                        }
                                 ],
                                
                            }];
        this.callParent(arguments);
    }
});