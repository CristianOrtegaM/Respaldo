Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.ContactPreference', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactpreference',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    itemId: 'contact_preference',
    initComponent: function() {
        this.items = [{
                        xtype: 'fieldset',
				    	title: 'Dirección Postal ',
				    	itemId: 'direccion_postal',
						data: null,
                        collapsible: true,
                        hidden: false,
                        columnWidth: 1,
                        layout: 'column',
                        defaults: {
                            anchor: '100%',
                            columnWidth: .333
                        },
                        listeners: {
                        	
						        beforerender: function(){
						        this.legend.insert(2, Ext.widget('tool', {
				                    padding: '3 5 5 10',
				                    type: 'search',
									border: 'none',
									tooltip: 'Seleccionar otra dirección',
				                    listeners: {
				                    	click : function(cmp){
										     cmp.up ('contactpreference').fireEvent ('load_adress', 'postal', cmp);
				                    		
				                    	}
				                    }
				                }));
				                this.legend.insert(3, Ext.widget('tool', {
				                    padding: '3 0 0 0',
									border: 'none',
				                    type: 'plus',
									tooltip: 'Ingresar una nueva dirección',									
				                    listeners: {
				                    	click : function(cmp){
										    cmp.up ('contactpreference').fireEvent ('add_adress',cmp.up ('contactpreference'), 'postal');
				                    	}
				                    }
				                }));
						        
						        }
						},
                        
                        items: [                                	                         	
                            
                         {
                                xtype: 'combo',
                                fieldLabel: 'País',			
                                readOnly : true,
								displayField: 'namePla',
                                valueField: 'placeIdentifierPla',         
                                emptyText: 'Seleccione País',
                                name: 'placeNameCountry',
                                autoLoadOnValue: true,
                                columnWidth: .25, 
                                padding: '0 10 10 0',
                                listeners : {
									focus : function(combo) {
										combo.getStore().load({
											callback : function() {
												if(!combo.readOnly){
													combo.expand();
												}
											}
										}); 
									},
									change: function(combo, value){										
										combo.up('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'Country', value);
									}
								},
								store : new Ext.data.Store({
									model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1',
									remoteSort: true,
								    remoteFilter: true,
								    simpleSortMode: true,
								    simpleGroupMode: true,
								    pageSize: 15,
								    autoLoad: false,
								    sorters: [{
								        property: 'placeIdentifierPla',
								        direction: 'DESC'
								    }],
									proxy : {
										type : 'rest',
										url : urlService + 'countryService/findByFilter',
										actionMethods : {
											read : 'POST'
										},
										extraParams:{
								            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
								                nombreCampo: 'class',
								                valor: 'Country',
								                valores: null,
								                operacion: '=',
								                tipoValor: 'string'
								            }).data])
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
                                readOnly : true,
                                fieldLabel: 'Región',
                                displayField: 'namePla',
								emptyText: 'Seleccione Región',
                                valueField: 'placeIdentifierPla',                                         
                                name: 'placeNameCountrySubdivision',
                                columnWidth: .25,
                                padding: '0 10 10 0',
								autoLoadOnValue: true,
                                listeners : { 
	                                change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'CountrySubdivision', value);
									}
                                }
                            },
                            {
                                xtype: 'combo',
                                readOnly : true,
                                fieldLabel: 'Ciudad',
								emptyText: 'Seleccione Ciudad',                                
                                displayField: 'namePla',
                                autoLoadOnValue: true,
                                valueField: 'placeIdentifierPla',                                         
                                name: 'placeNameMunicipality1',
                                listeners : { 
	                                change: function(combo, value){
	                                	console.log(value);
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'City', value);
									}
                                },                                
                                columnWidth: .25,
                                padding: '0 10 10 0',
                            },
                            {
                                xtype: 'combo',
                                readOnly : true,
                                fieldLabel: 'Comuna',
								emptyText: 'Seleccione Comuna',                                
                                displayField: 'namePla',
                                autoLoadOnValue: true,
                                valueField: 'placeIdentifierPla',                                         
                                name: 'placeNameMunicipality2',
                                columnWidth: .25,
                                padding: '0 10 10 0',
								listeners : { 
	                                change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'Municipality', value);
									}
                                }
                            },
                            {
                                xtype: 'combo',
                                readOnly : true,
                                fieldLabel: 'Calle',
                                emptyText: 'Seleccione Calle',
                                hideTrigger: true,
                                typeAhead: false,
								minChars: 0,
                                displayField: 'nameSta',
                                valueField: 'addressIdentifierAdd',
                                name: 'streetAdressName',
                                columnWidth: .5,
								regex: nameReg1,
								regexText: 'Campo inválido',
								maxLength: 255,
								enforceMaxLength: true,
								listeners: {
									blur: function(tf){
										if(tf.getValue!="")
											this.setValue(tf.getValue().trim());
									}
								},
                                padding: '0 10 10 0',
                                autoLoadOnValue: true,
                                store: new Ext.data.Store({
									model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1',
								    remoteSort: true,
								    remoteFilter: true,
								    simpleSortMode: true,
								    simpleGroupMode: true,
								    autoLoad: false,
								    sorters: [{
								        property: 'addressIdentifierAdd',
								        direction: 'DESC'
								    }],
								    proxy:  {
								        type: 'rest',
								        url: urlService + 'streetAddressService/findByFilter',
								        actionMethods:  {
								            read: 'POST'
								        },
								        extraParams:{
								            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
								                nombreCampo: 'class',
								                valor: 'StreetAddress',
								                valores: null,
								                operacion: '=',
								                tipoValor: 'string'
								            }).data])
								        },
								        reader: {
								            type: 'json',
								            rootProperty: 'datos',
								            successProperty: 'valido',
								            totalProperty: 'totalRegistros'
								        }
								    }
																	}),
                                  listeners: {
                                            change: function(field,value,oldvalue) {
                                                var filtro = [];
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'nameSta',
                                                    valor: field.rawValue+ '%', //value[0].data.nameSta + '%',
                                                    operacion: 'like',
                                                    tipoValor: 'string'
                                                }).data);
                                                
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: 'StreetAddress',
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                                }).data);
                                                
                                                this.store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                this.store.load();
                                            },
                                   }

                            },
                            {
                                xtype: 'textfield',
                                readOnly : true,
                                fieldLabel: 'Número',
                                name: 'streetAdressNumber',
                                emptyText: 'Ingrese Número',
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
                            },
                            {
                                xtype: 'textfield',
                                readOnly : true,
                                fieldLabel: 'Departamento, Casa o Unidad',
                                emptyText: 'Ingrese Departamento, Casa o Unidad',
                                name: 'postalAdressUnitNumber',
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
                            },
                            {
                                xtype: 'textfield',
                                readOnly : true,                                                                
                                fieldLabel: 'Edificio o Condominio',
                                emptyText: 'Ingrese Edificio o Condominio',
                                name: 'postalAdressBuildingName',
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
                                readOnly : true,
                                fieldLabel: 'Piso',
                                emptyText: 'Ingrese Piso',
                                name: 'postalAdressFloorNumber',
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
                            },
                            {
                                xtype: 'combo',
                                readOnly : true,
                                fieldLabel: 'Código Postal',
                                emptyText: 'Seleccione Código Postal',
                                name: 'postalCodeAssignedCode',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                autoLoadOnValue: true,
								displayField: 'assignedExternalCodePoc',
                                valueField: 'placeIdentifierPla',
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
							
                            
                        ]

                   },
                   {
                        xtype: 'fieldset',
                        title: 'Dirección de Visita',
						itemId: 'direccion_visita',
						data: null,
                        collapsible: true,
                        hidden: false,
                        columnWidth: 1,
                        layout: 'column',
                        defaults: {
                            anchor: '100%',
                            columnWidth: .333
                        },
						 listeners: {
                        	
						        beforerender: function(){
						        this.legend.insert(2, Ext.widget('tool', {
				                    padding: '3 5 5 10',
				                    type: 'search',
									border: 'none',
									tooltip: 'Seleccionar otra dirección',
				                    listeners: {
				                    	click : function(cmp){
										     cmp.up ('contactpreference').fireEvent ('load_adress', 'visit', cmp);
				                    		
				                    	}
				                    }
				                }));
				                this.legend.insert(3, Ext.widget('tool', {
				                    padding: '3 0 0 0',
									type: 'plus',
									border: 'none',
									tooltip: 'Ingresar una nueva dirección',
				                    listeners: {
				                    	click : function(cmp){
										    cmp.up ('contactpreference').fireEvent ('add_adress',cmp.up ('contactpreference'), 'visit'); 				                    		
				                    	}
				                    }
				                }));
						        
						        }
						},
                        items: [                                	                         	
                            
                         {
                                xtype: 'combo',
                                fieldLabel: 'País',
								readOnly : true,								
                                emptyText: 'Seleccione País',
                                name: 'placeNameCountryVisit',
                                displayField: 'namePla',
                                valueField: 'placeIdentifierPla',
                                columnWidth: .25,
                                autoLoadOnValue: true,
    							queryMode: 'local', 
                                padding: '0 10 10 0',
								listeners : {
									change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'Country', value, true);
									}
								},
								store : new Ext.data.Store({
									model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1',
									remoteSort: true,
								    remoteFilter: true,
								    simpleSortMode: true,
								    simpleGroupMode: true,
								    pageSize: 15,
								    autoLoad: false,
								    sorters: [{
								        property: 'placeIdentifierPla',
								        direction: 'DESC'
								    }],
									proxy : {
										type : 'rest',
										url : urlService + 'countryService/findByFilter',
										actionMethods : {
											read : 'POST'
										},
										extraParams:{
								            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
								                nombreCampo: 'class',
								                valor: 'Country',
								                valores: null,
								                operacion: '=',
								                tipoValor: 'string'
								            }).data])
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
                                fieldLabel: 'Región',
								readOnly : true, 
								emptyText: 'Seleccione Región',                                
                                displayField: 'namePla',
                                valueField: 'placeIdentifierPla',                                
                                name: 'placeNameCountrySubdivisionVisit',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                queryMode: 'local',
                                autoLoadOnValue: true,
                                listeners : { 
	                                change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'CountrySubdivision', value, true);
									}
                                }                                
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Ciudad',
								readOnly : true,
								emptyText: 'Seleccione Ciudad',    
								autoLoadOnValue: true,								
                                displayField: 'namePla',
                                valueField: 'placeIdentifierPla',                                   
                                name: 'placeNameMunicipality1Visit',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                listeners : { 
	                                change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'City', value, true);
									}
                                }
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Comuna',
								readOnly : true,
								emptyText: 'Seleccione Comuna',                                
                                displayField: 'namePla',
								autoLoadOnValue: true,
                                valueField: 'placeIdentifierPla',                                   
                                name: 'placeNameMunicipality2Visit',
                                columnWidth: .25,
                                padding: '0 10 10 0',
								listeners : { 
	                                change: function(combo, value){
										combo.up ('contactpreference').fireEvent ('load_combobox', combo.up ('contactpreference'), 'Municipality', value, true);
									}
                                }
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Calle',
								readOnly : true,
                                displayField: 'nameSta',
                                emptyText: 'Ingrese Calle',
                                valueField: 'addressIdentifierAdd',
                                name: 'streetAdressNameVisit',
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
								},	
                                autoLoadOnValue: true,
                                store: new Ext.data.Store({
									model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1',
								    remoteSort: true,
								    remoteFilter: true,
								    simpleSortMode: true,
								    simpleGroupMode: true,
								    autoLoad: false,
								    sorters: [{
								        property: 'addressIdentifierAdd',
								        direction: 'DESC'
								    }],
								    proxy:  {
								        type: 'rest',
								        url: urlService + 'streetAddressService/findByFilter',
								        actionMethods:  {
								            read: 'POST'
								        },
								        extraParams:{
								            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
								                nombreCampo: 'class',
								                valor: 'StreetAddress',
								                valores: null,
								                operacion: '=',
								                tipoValor: 'string'
								            }).data])
								        },
								        reader: {
								            type: 'json',
								            rootProperty: 'datos',
								            successProperty: 'valido',
								            totalProperty: 'totalRegistros'
								        }
								    }
																	}),
                                  listeners: {
                                            change: function(field) {
                                                var filtro = [];
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'nameSta',
                                                    valor: field.rawValue + '%',
                                                    operacion: 'like',
                                                    tipoValor: 'string'
                                                }).data);
                                                
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: 'StreetAddress',
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                                }).data);
                                                
                                                this.store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                this.store.load();
                                            },
                                   }
                            },
                            {
                                xtype: 'textfield',
                                emptyText: 'Ingrese Número',
								readOnly : true,
                                fieldLabel: 'Número',
                                name: 'streetAdressNumberVisit',
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
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Departamento, Casa o Unidad',
								readOnly : true,
                                emptyText: 'Ingrese Departamento, Casa o Unidad',
                                name: 'postalAdressUnitNumberVisit',
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
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Edificio o Condominio',
								readOnly : true,
                                emptyText: 'Ingrese Edificio o Condominio',
                                name: 'postalAdressBuildingNameVisit',
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
                                fieldLabel: 'Piso',
								readOnly : true,
                                emptyText: 'Ingrese Piso',
                                name: 'postalAdressFloorNumberVisit',
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
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Código Postal',
								readOnly : true,
                                emptyText: 'Seleccione Código Postal', 
                                name: 'postalCodeAssignedCodeVisit',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                displayField: 'assignedExternalCodePoc',
								autoLoadOnValue: true,
                                valueField: 'placeIdentifierPla',      
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
							
                            
                        ]

                   },
                   {
                        xtype: 'fieldset',
                        title: 'Contactos Preferentes',
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
                        		xtype: 'fieldcontainer',
                        		fieldLabel: 'Teléfono Fijo',
                        		columnWidth: .25,
                        		layout: 'hbox',
                        		items: [
                        		{
                        			xtype: 'combo',
                        		    padding: '0 10 10 0',
                        		    name: 'areaExternalCodeTnu',
                        		    width: '30%',
									autoLoadOnValue: true,
									regex: nameReg1,
									regexText: 'Campo inválido',
									maxLength: 255,
									enforceMaxLength: true,
									listeners: {
										blur: function(tf){
											if(tf.getValue!="")
												this.setValue(tf.getValue().trim());
										}
									},	
                        		    listeners: {
									focus: function(combo){
										combo.getStore().load({
											callback: function(){
												combo.expand();
											}
										});
									}
									},
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
												code: 'AreaPhoneTypeCode'
											},
											reader: {
											rootProperty: 'datos',
												successProperty: 'valido',
											totalProperty: 'totalRegistros'
											}
										}
									}),
									valueField: 'externalCodeExc',
									displayField: 'externalCodeExc',
									queryMode: 'local',
								    autoLoadOnValue: true,
									
                        		},
                        		{						
                                xtype: 'combo',
                                itemId: 'telephoneNumberFullNumberTelephoneCallContact1',
                                name: 'telephoneNumberFullNumberTelephoneCallContact1',
                                maxLength: 8,
                                emptyText: 'Ingrese Teléfono Fijo',
                                padding: '0 10 10 0',
                                queryMode: 'local',
								displayField: 'fullNumberTnu',
								valueField: 'addressIdentifierAdd',
								typeAhead: true,
								minChars: 0,
								autoLoadOnValue: true,
								//renderTo: Ext.getBody(),
								hideTrigger: true,
								width: '70%'               				 	
                            	}]
                            	},
							   {						
                                xtype: 'combo',
                                itemId: 'telephoneNumberFullNumberTelephoneCallContact2',
                                fieldLabel: 'Teléfono Móvil',
                                emptyText: 'Ingrese Teléfono Móvil',
                                name: 'telephoneNumberFullNumberTelephoneCallContact2',
                                columnWidth: .25,
                                maxLength: 8,
                                padding: '0 10 10 0',
                                queryMode: 'local',
								displayField: 'fullNumberTnu',
								valueField: 'addressIdentifierAdd',
								typeAhead: true,
								minChars: 0,
								autoLoadOnValue: true,
								//renderTo: Ext.getBody(),
								hideTrigger: true               				 	
                            },							                           
                            {
                                xtype: 'combo',
                                vtype: 'email',
                                itemId: 'networkAdressIdentifierEmailContact',
                                fieldLabel: 'Correo Electrónico',
                                emptyText: 'Ingrese Correo Electrónico',
                                name: 'networkAdressIdentifierEmailContact',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                queryMode: 'local',
								displayField: 'identifierNea',
								valueField: 'addressIdentifierAdd',
								typeAhead: true,
								minChars: 0,
								autoLoadOnValue: true,
								//renderTo: Ext.getBody(),
								hideTrigger: true,
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
                                xtype: 'combo',
                                vtype: 'url',
                                itemId: 'networkAdressIdentifierWebPageContact',
                                emptyText: 'Ingrese Sitio Web',
                                fieldLabel: 'Sitio Web',
                                //afterLabelTextTpl: [
				  //                  '<span id="new-email" data-qtip="Crear nuevo correo electrónico" style="background:url(extjs/packages/ext-theme-crisp/resources/images/tools/tool-sprites.png) 0 128px;height:16px;width:16px;position:relative;right:-3.5em">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
				    //            ],
                                name: 'networkAdressIdentifierWebPageContact',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                //disabled: true,
                                queryMode: 'local',
								displayField: 'identifierNea',
								valueField: 'addressIdentifierAdd',
								typeAhead: true,
								minChars: 0,
								autoLoadOnValue: true,
								//renderTo: Ext.getBody(),
								hideTrigger: true,
								maxLength: 255,
								enforceMaxLength: true,
								listeners: {
									blur: function(tf){
										if(tf.getValue!="")
											this.setValue(tf.getValue().trim());
									}
								}									
                            }
                        
                        ]
                    
                   }
                    
                    
                    ];
        this.callParent(arguments);
    }
});
