Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataInsuranceCompany', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.datainsurancecompany',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
                                xtype: 'fieldset',
                                title: 'Datos del Corredor de Seguros',
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
                                        allowBlank: false,
                        				afterLabelTextTpl: [
                            				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        				],
                        				 format: 'd/m/Y',
                        				 submitFormat: 'd-m-Y H:i:s',
                        				 editable: false
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Vigencia Final',
                                        name: 'rolePlayerPeriodEndDateTimeRol',
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        format: 'd/m/Y',
                        				submitFormat: 'd-m-Y H:i:s',
                        				editable: true
                                    },
                                    {
                                        xtype: 'textarea',
                                        fieldLabel: 'Descripción',
                                        name: 'descriptionRol',
                                        columnWidth: 1,
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
                                    }
                                 ],
                                
                            }];
        this.callParent(arguments);
    }
});