Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataCompany', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.datacompany',
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
									fieldLabel: 'Rut',
									name: 'partyKey',
									columnWidth: .25,
									padding: '0 10 10 0',
									disabled: true,
									allowBlank: false,
                        		    afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        			],
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
									fieldLabel: 'Razón Social',
									name: 'organizationNamefullName',
									columnWidth: .5,
									padding: '0 10 10 0',
									allowBlank: false,
                        			afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        		    ],
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
									xtype: 'datefield',
									fieldLabel: 'Fecha de Creación',
									name: 'foundationDate',
									columnWidth: .25,
									padding: '0 10 10 0',
									format: 'd/m/Y',
                        			submitFormat: 'd-m-Y H:i:s',
                        			editable: true
								},                                    	                                    	
								{
									xtype: 'numericfield',
						            maxLength: 10,
									fieldLabel: 'Cantidad de miembros',
									name: 'memberCount',
									columnWidth: .25,
									padding: '0 10 10 0',
									minValue: 0,
									maxValue: 999999999,
									allowDecimals: false
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Nombre Comercial',
									name: 'organizationNamefullName2',
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
									xtype: 'datefield',
									fieldLabel: 'Fecha de Disolución',
									name: 'disolutionDate',
									columnWidth: .25,
									padding: '0 10 10 0',
									format: 'd/m/Y',
                        			submitFormat: 'd-m-Y H:i:s',
                        			editable: true
								}                                    	
                        ]

                    }];
        this.callParent(arguments);
    }
});