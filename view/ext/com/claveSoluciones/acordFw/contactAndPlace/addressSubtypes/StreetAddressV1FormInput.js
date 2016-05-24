Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.streetaddressv1forminput',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    initComponent: function() {
        this.items = [{
            layout: 'column',
            xtype: 'panel',
            border: false,
            items: [{
                layout: 'column',
                xtype: 'panel',
                height: '100%',
                border: false,
                columnWidth: 1,
                defaults: {
                    anchor: '100%',
                    columnWidth: 1
                },
                padding: '10 10 0 10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Calle',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .333
                    },
                    items:[
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo de Calle',
                        emptyText: 'Seleccione...',
                        name: 'typeExternalCodeSta',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
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
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
                        padding: '0 10 10 0',
                        regex: nameReg1,
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
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
