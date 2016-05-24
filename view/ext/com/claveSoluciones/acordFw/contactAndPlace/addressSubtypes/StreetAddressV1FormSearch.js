Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.streetaddressv1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
		{
            xtype: 'combo',
            fieldLabel: 'Tipo',
            emptyText: 'Ingrese Tipo',
            name: 'typeExternalCodeSta',
            columnWidth: .25,
            padding: '0 10 10 10',
            queryMode: 'local',
			typeAhead: true,
			minChars: 0,
			listeners: {
			focus: function(combo){
				combo.getStore().load({
					callback: function(){
						combo.expand();
					}
				});
			}
			},
			hidden: false,
			valueField: 'externalCodeExc',
			displayField: 'descriptionExc',
			forceSelection: true,
			store: new Ext.data.Store({
				model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
				remoteSort: true,
				autoLoad: false,
				pageSize: 9999,
				proxy: {
					type: 'rest',
					url: urlService + 'externalCodeService/findByExternalCodeType',
					actionMethods: {
						read: 'POST'
					},
					extraParams: {
						code: 'AddressTypeCode'
					},
					reader: {
						rootProperty: 'datos',
						successProperty: 'valido',
						totalProperty: 'totalRegistros'
					}
				}
			})
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            emptyText: 'Ingrese Nombre',
            name: 'nameSta',
            columnWidth: .25,
            padding: '0 10 10 0',
            regex: searchReg1,
            regexText: 'Campo inválido',
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                blur: function(tf){
                    if(tf.getValue!="")
                        this.setValue(tf.getValue().trim());
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Número',
            emptyText: 'Ingrese Número',
            name: 'numberSta',
            columnWidth: .25,
            padding: '0 10 10 0',
            regex: searchReg1,
            regexText: 'Campo inválido',
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                blur: function(tf){
                    if(tf.getValue!="")
                        this.setValue(tf.getValue().trim());
                }
            }
        }
    ],
    buttons:[{
        text: 'Limpiar',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
