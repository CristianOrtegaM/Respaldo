Ext
		.define(
				'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2FormInput',
				{
					extend : 'Ext.form.FormPanel',
					alias : 'widget.xtbmltablev2forminput',
					fieldDefaults : {
						labelAlign : 'top',
						style : 'font-size: 14px'
					},
					border : false,
					initComponent : function() {
						this.items = [
								{
									layout : 'column',
									xtype : 'panel',
									border : false,
									items : [ /**{
							            xtype: 'xtbmltablev1grid',
							            itemId: 'tableXtdGrid',
							            autoScroll: true,
							            height: '',
							            hidden: true,
							            store: new Ext.data.Store({
							                model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
							                data: []
							            })
							            },**/
							            {
										layout : 'column',
										xtype : 'panel',
										height : '100%',
										border : false,
										columnWidth : 0.99,
										defaults : {
											anchor : '100%',
											columnWidth : 1
										},
										padding : '10 10 0 10',
										items : [ {
											xtype : 'fieldset',
											title : 'Especificación',
											collapsible : true,
											hidden : false,
											columnWidth : 1,
											layout : 'column',
											defaults : {
												anchor : '100%',
												columnWidth : .333
											},
											items : [
													{
														xtype : 'textfield',
														fieldLabel : 'Nombre',
														emptyText : 'Ingrese Nombre',
														name : 'tableNameXtt',
														allowBlank : false,
														afterLabelTextTpl : [ '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>' ],
														hidden : false,
														columnWidth : .5,
														padding : '0 10 10 0',
														regex : nameReg1,
														regexText : 'Campo inválido',
														maxLength : 255,
														enforceMaxLength : true,
														listeners : {
															blur : function(tf) {
																if (tf.getValue != "")
																	this
																			.setValue(tf
																					.getValue()
																					.trim());
															}
														}
													},
													{
														xtype : 'numericfield',
														maxLength : 10,
														fieldLabel : 'Cantidad de Dimensiones',
														emptyText : 'Ingrese Cantidad de Dimensiones',
														name : 'dimensionQtyXtt',
														allowBlank : false,
														afterLabelTextTpl : [ '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>' ],
														hidden : false,
														columnWidth : .25,
														padding : '0 10 10 0',
														hideTrigger : true,
														keyNavEnabled : false,
														mouseWheelEnabled : false,
														minValue : 0,
														negativeText : 'El valor no puede ser negativo'
													},
													{
														xtype : 'combo',
														fieldLabel : 'Indicador Completa',
														autoLoadOnValue : true,
														emptyText : 'Seleccione ...',
														name : 'completeIndicatorXtt',
														allowBlank : false,
														afterLabelTextTpl : [ '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>' ],
														columnWidth : .25,
														padding : '0 10 10 0',
														queryMode : 'local',
														typeAhead : true,
														minChars : 0,
														listeners : {
															focus : function(
																	combo) {
																combo
																		.getStore()
																		.load(
																				{
																					callback : function() {
																						combo
																								.expand();
																					}
																				});
															}
														},
														hidden : false,
														valueField : 'valor',
														displayField : 'nombre',
														store : new Ext.data.ArrayStore(
																{
																	fields : [
																			'nombre',
																			'valor' ],
																	data : [
																			[
																					'Sí',
																					true ],
																			[
																					'No',
																					false ] ]
																})
													} ]
										} ],
										buttons : [ {
											text : 'Guardar',
											scope : this,
											bodyPadding : 5,
											margins : '0 17 0 0',
											action : 'create'
										}, {
											text : 'Cancelar',
											scope : this,
											bodyPadding : 5,
											margins : '0 17 0 0',
											handler : function() {
												this.up('window').close();
											}
										} ],
										tbar : {
											cls : 'x-pagingtoolbar-top',
											style : {
												background : 'transparent'
											},
											items : [
													'->',
													{
														text : 'Actualizar Cuestionario',
														width : 200,
														action : 'updateInput'
													},
													'',
													{
														text : 'Crear Valores',
														width : 105,
														action : 'createValues'
													},
													'',
													{
														text : 'Copiar',
														width : 105,
														disabled : true,
														handler : function() {
															var window = Ext
																	.widget('xtbmltablev2copyforminput');
															window
																	.down(
																			'form')
																	.getForm()
																	.loadRecord(
																			this
																					.up(
																							'window')
																					.down(
																							'form')
																					.getForm()
																					.getRecord());
															window
																	.down(
																			'textfield')
																	.setValue(
																			'Copia_'
																					+ window
																							.down(
																									'textfield')
																							.getValue());
															window.show();
														},
													}, ''/**, {
														text : 'Cerrar',
														action : 'closeTable',
														width : 105
													}**/ ]
										}
									},
									{
										layout : 'column',
										xtype : 'panel',
										height : '',
										border : false,
										columnWidth : 0.99,
										defaults : {
											anchor : '100%',
											columnWidth : 1
										},
										padding : '10 10 0 10',
										items : [ {
											xtype : 'fieldset',
											title : 'Dimensión',
											collapsible : true,
											hidden : false,
											columnWidth : 1,
											layout : 'column',
											defaults : {
												anchor : '95%',
												columnWidth : .333
											},
											items : [
													{
														columnWidth : 1,
														hidden : false,
														disabled : true,
														itemId : 'itemDimension',
														border : false,
														padding : '10 10 10 0',
														/**defaults : {
															anchor : '100%',
															columnWidth : .5
														},**/
														width : '100%',
														layout : 'column',
														items : [ {
															border : false,
															columnWidth : 1,
															items : [ {
																xtype : 'xtbmldimensionv1grid',
																itemId : 'dimensionsXttGrid',
																autoScroll : true,
																padding: '10 10 10 0',
																height : '',
																listeners : {
																	afterrender : function() {
																		this.down('toolbar').fireEvent('buttonsAccess', ['c','u','d']);
																	}
																}
															} ]
														} ]
													}]
											}]
									},{
											layout : 'column',
											xtype : 'panel',
											height : '',
											border : false,
											columnWidth : 0.99,
											defaults : {
												anchor : '100%',
												columnWidth : 1
											},
											padding : '10 10 0 10',
											items : [		
										
										
											{
												xtype : 'fieldset',
												title : 'Valores',
												collapsible : true,
												hidden : false,
												columnWidth : 1,
												layout : 'column',
												defaults : {
													anchor : '95%',
													columnWidth : .333
												},
												items : [
													{
														columnWidth : 1,
														hidden : false,
														disabled : true,
														itemId : 'itemValue',
														padding : '10 10 10 0',
														border : false,
														defaults : {
															/**anchor : '100%',
															columnWidth : .5**/
														},
														width : '100%',
														layout : 'column',
														items : [ {
															border : false,
															columnWidth : 1,
															items : [
																	{
																		padding : '10 0 10 0',
																		xtype : 'panel',
																		anchor : '98.5%',
																		cls : 'panelheader',
																		title : 'Búsqueda',
																		collapsible : true,
																		collapsed : true,
																		titleCollapse : true,
																		border : true,
																		listeners : {
																			expand : function(
																					cmp) {
																				var scrollY = this.up('window').getScrollY();
																				cmp.updateLayout();
																				this.up('window').setScrollY(scrollY);
																			}
																		},
																		items : [ {
																			xtype : 'xtbmlvaluev2formsearch',
																			itemId : 'valuesXttSearch'
																		} ]
																	},
																	
																	
																	
																	{
																		xtype : 'xtbmlvaluev2grid',
																		selType: 'checkboxmodel',
															            selModel: {
															                checkOnly: false,
															                injectCheckbox: 0,
															                mode: 'MULTI',
															                allowDeselect: true,
															                showHeaderCheckbox: true
															            },
																		itemId : 'valuesXttGrid',
																		padding : '10 0 10 0',
																		autoScroll : true,
																		height : '',
																		listeners : {
																			afterrender : function() {
																				this
																						.down(
																								'toolbar')
																						.fireEvent(
																								'buttonsAccess',
																								[  ]);
																			}
																		}
																	} ]
														} ]
													}]
											}]
									}
									
									
									
									
									]
								}
								 ];
						this.callParent(arguments);
					}
				});
