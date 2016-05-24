Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataPerson', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.dataperson',
	fieldDefaults : {
		labelAlign : 'top',
		style : 'font-size: 14px'
	},
	border : false,
	layout : 'column',
	initComponent : function() {
		this.items = [{
			xtype : 'fieldset',
			title : 'Datos de la Persona',
			collapsible : true,
			hidden : false,
			columnWidth : 1,
			layout : 'column',
			defaults : {
				anchor : '100%',
				columnWidth : .333
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : 'Rut',
				name : 'partyKey',
				columnWidth : .25,
				padding : '0 10 10 0',
				allowBlank : false,
				afterLabelTextTpl : ['<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'],
				disabled : true,
				maxLength: 255,
				enforceMaxLength: true,
				listeners: {
					blur: function(tf){
						if(tf.getValue!="")
							this.setValue(tf.getValue().trim());
					}
				}
			}, {
				xtype : 'datefield',
				fieldLabel : 'Fecha de Nacimiento',
				name : 'birthDate',
				columnWidth : .25,
				padding : '0 10 10 0',
				format : 'd/m/Y',
				submitFormat : 'd-m-Y H:i:s',
				editable: true
			}, {
				xtype : 'combo',
				fieldLabel : 'Género',
				name : 'genderCode',
				columnWidth : .25,
				padding : '0 10 10 0',
				queryMode : 'local',
				hidden : false,
				valueField : 'enumerationLiteralEnu',
				displayField : 'descriptionEnu',
				forceSelection : true,
				listeners : {
					focus : function(combo) {
						combo.getStore().load({
							callback : function() {
								combo.expand();
							}
						});
					}
				},
				store : new Ext.data.Store({
					model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
					remoteSort : true,
					autoLoad : true,
					pageSize : 9999,
					proxy : {
						type : 'rest',
						url : urlService + 'enumerationService/findByEnumerationType',
						actionMethods : {
							read : 'POST'
						},
						extraParams : {
							enumName : 'GenderCodeList'
						},
						reader : {
							rootProperty : 'datos',
							successProperty : 'valido',
							totalProperty : 'totalRegistros'
						}
					}
				})
			}, {
				xtype : 'combo',
				fieldLabel : 'Estado Civil',
				name : 'maritalStatusCode',
				columnWidth : .25,
				padding : '0 10 10 0',
				queryMode : 'local',
				hidden : false,
				valueField : 'enumerationLiteralEnu',
				displayField : 'descriptionEnu',
				forceSelection : true,
				listeners : {
					focus : function(combo) {
						combo.getStore().load({
							callback : function() {
								combo.expand();
							}
						});
					},
					change : function(tf) {
						if (tf.getValue() != "") {
							tf.addCls('x-complete-field');
						} else {
							tf.removeCls('x-complete-field');
						}
					}
				},
				store : new Ext.data.Store({
					model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
					remoteSort : true,
					autoLoad : true,
					pageSize : 9999,
					proxy : {
						type : 'rest',
						url : urlService + 'enumerationService/findByEnumerationType',
						actionMethods : {
							read : 'POST'
						},
						extraParams : {
							enumName : 'MaritalStatusCodeList'
						},
						reader : {
							rootProperty : 'datos',
							successProperty : 'valido',
							totalProperty : 'totalRegistros'
						}
					}
				})
			}, {
				xtype : 'textfield',
				fieldLabel : 'Primer Nombre',
				name : 'personNameGivenName',
				columnWidth : .25,
				padding : '0 10 10 0',
				allowBlank : false,
				afterLabelTextTpl : ['<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'],
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
			}, {
				xtype : 'textfield',
				fieldLabel : 'Segundo Nombre',
				name : 'personNameMiddleName',
				columnWidth : .25,
				padding : '0 10 10 0',
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
			}, {
				xtype : 'textfield',
				fieldLabel : 'Apellido Paterno',
				name : 'personNameSurname',
				columnWidth : .25,
				padding : '0 10 10 0',
				allowBlank : false,
				afterLabelTextTpl : ['<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'],
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
			}, {
				xtype : 'textfield',
				fieldLabel : 'Apellido Materno',
				name : 'personNameLastName',
				columnWidth : .25,
				padding : '0 10 10 0',
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
			}, {
				xtype : 'combo',
				fieldLabel : 'Grupo Etnico',
				autoLoadOnValue: true,
				name : 'ethnicityCode',
				columnWidth : .25,
				padding : '0 10 10 0',
				queryMode : 'local',
				hidden : false,
				valueField : 'enumerationLiteralEnu',
				displayField : 'descriptionEnu',
				forceSelection : true,
				listeners : {
					focus : function(combo) {
						combo.getStore().load({
							callback : function() {
								combo.expand();
							}
						});
					},
					change : function(tf) {
						if (tf.getValue() != "") {
							tf.addCls('x-complete-field');
						} else {
							tf.removeCls('x-complete-field');
						}
					}
				},
				store : new Ext.data.Store({
					model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
					remoteSort : true,
					autoLoad : false,
					pageSize : 9999,
					proxy : {
						type : 'rest',
						url : urlService + 'enumerationService/findByEnumerationType',
						actionMethods : {
							read : 'POST'
						},
						extraParams : {
							enumName : 'EthnicityCodeList'
						},
						reader : {
							rootProperty : 'datos',
							successProperty : 'valido',
							totalProperty : 'totalRegistros'
						}
					}
				})
			}, 
			{
				xtype: 'combo',
				fieldLabel: 'Idioma Primario',
				autoLoadOnValue: true,
				emptyText: 'Seleccione ...',
				name: 'primaryLanguageCode',
				allowBlank: true,
				columnWidth: .25,
				padding: '0 10 10 0',
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
						code: 'LanguageCode'
					},
					reader: {
						rootProperty: 'datos',
						successProperty: 'valido',
						totalProperty: 'totalRegistros'
					}
				}
				})
			},
			/*{
				xtype : 'textfield',
				fieldLabel : 'Idioma Primario',
				name : 'primaryLanguageCode',
				columnWidth : .25,
				padding : '0 10 10 0',
				listeners : {
					blur : function(tf) {
						if (tf.getValue != "")
							this.setValue(tf.getValue().trim());
					}
				}
			}, */			
			{
				xtype : 'fieldcontainer',
				fieldLabel : 'Fallecido',
				defaultType : 'radiofield',
				columnWidth : .25,
				defaults : {
					flex : 1
				},
				layout : 'hbox',
				items : [{
					boxLabel : 'Sí',
					name : 'personNameDeathIndicator',
					inputValue : true,
					id : 'radio_deathindicator_true'
				}, {
					boxLabel : 'No',
					name : 'personNameDeathIndicator',
					inputValue : false,
					id : 'radio_deathindicator_false'
				}]
			}, {
				xtype : 'datefield',
				fieldLabel : 'Fecha de Fallecimiento',
				name : 'personNameDeathDate',
				columnWidth : .25,
				padding : '0 10 10 0',
				format : 'd/m/Y',
				submitFormat : 'd-m-Y H:i:s',
				editable: true
			}, {
				columnWidth : .5,
				bodyStyle : 'border-color: white;'

			}, {
				xtype : 'fieldcontainer',
				fieldLabel : 'Desaparecido',
				defaultType : 'radiofield',
				columnWidth : .25,
				defaults : {
					flex : 1
				},
				layout : 'hbox',
				items : [{
					boxLabel : 'Sí',
					name : 'personNameMissingIndicator',
					inputValue : true,
					id : 'radio_missingindicator_true'
				}, {
					boxLabel : 'No',
					name : 'personNameMissingIndicator',
					inputValue : false,
					id : 'radio_missingindicator_false'
				}]
			}, {
				xtype : 'datefield',
				fieldLabel : 'Fecha de Desaparición',
				name : 'personNameMissingDate',
				columnWidth : .25,
				padding : '0 10 10 0',
				format : 'd/m/Y',
				submitFormat : 'd-m-Y H:i:s',
				editable: true
			}]

		}];
		this.callParent(arguments);
	}
});
