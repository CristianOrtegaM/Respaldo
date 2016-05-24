Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.UtilContactPreference', {
    extend: 'Ext.app.Controller'
	, views: [
				  'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.ContactPreference'
				, 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Grid'
				, 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.physicalObject.PhysicalObjectLocation'
			]
	, models: [	
				  'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.EmailContactV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.TelephoneCallContactV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.PostalMailContactV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2'			
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1'
				, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1'
			]
    , stores: [
			  'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1'
    		, 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1'			 
			, 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1'
			, 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1'
			, 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'
			, 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV2'
			, 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1'
	] 

    , init: function() {
        this.control({        	
			'contactpreference': {
				load_combobox : this._loadPlaceCombobox,
				load_adress : this._loadControllerAdress,
				add_adress: this._addAdress 
			},
			'#direccion button[action=seleccionarDireccion]': {
                click: this._setAdressPostal
			},
			//'physicalobjectlocation': {
			//	load_combobox : this._loadPlaceCombobox,
			//},
		}); 
	},
	
	_addAdress: function(btn, type){		
	    var component = '#direccion_postal';
		if (type === 'visit') {
			component = '#direccion_visita';
		}
		btn.up('window').down('contactpreference').down(component)._addAdress=true;
                btn.up('window').down('contactpreference').down(component)._setAdressPostal=false;
		var fieldset_dirpos_items=btn.up('window').down('contactpreference').down(component).items;
		if(fieldset_dirpos_items!==null && fieldset_dirpos_items!==undefined){
	    for(var i=0; i<fieldset_dirpos_items.items.length; ++i){
	    	fieldset_dirpos_items.items[i].setValue(null);
	    }
	    for(var i=0; i<4; ++i){
	    	fieldset_dirpos_items.items[i].setReadOnly(false);
	    	fieldset_dirpos_items.items[i].setHideTrigger(false);
	    }
		btn.up('window').down('contactpreference').down(component)._addAdress=true;
		btn.up('window').down('contactpreference').down(component).data=null;
//			var defaultValue=null;
//			
//	 		externalcodeRenderStore.filters.clear();
//			delete externalcodeRenderStore.getProxy().extraParams['filters'];
//			var filtro = filterCreation('ExternalCode');
//			var externalCodeListExc= Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//		        nombreCampo: 'externalCodeListExc',
//		        valor: 'DefaultValueCountryCode',
//		    	operacion: 'like',
//	            tipoValor: 'string'
//		    });
		var store;
		if(component==='#direccion_postal'){
			store = btn.up('window').down ('combo[name="placeNameCountry"]').getStore();
		}else if(component==='#direccion_visita'){
			store = btn.up('window').down ('combo[name="placeNameCountryVisit"]').getStore();	
		}
		store.removeAll();
		store.filters.clear();
		delete store.getProxy().extraParams['filters'];
		var filtro = [Ext.create('AFW_FND_Xjs.model.util.Filtro',
					{
						nombreCampo : 'class',
						valor : 'Country',
						valores : null,
						operacion : '=',
						tipoValor : 'string'
					}).data,
						Ext.create('AFW_FND_Xjs.model.util.Filtro',
					{
						nombreCampo : 'namePla',
						valor : country+'%',
						valores : null,
						operacion : 'like',
						tipoValor : 'string'
					}).data];
		store.getProxy().setExtraParam('filters',Ext.encode(filtro));
		store.currentPage = 1;
		store.load({
			callback : function(records) {
					if (records.length > 0) {
					if(component==='#direccion_postal'){
    					btn.up('window').down ('combo[name="placeNameCountry"]').setValue(records[0].get('placeIdentifierPla'));
					}else if(component==='#direccion_visita'){
    					btn.up('window').down ('combo[name="placeNameCountryVisit"]').setValue(records[0].get('placeIdentifierPla'));	
					}
				}
			}
		});
			
//			filtro.push(externalCodeListExc.data);
//			externalcodeRenderStore.getProxy().setExtraParam('filters', Ext.encode(filtro));
//		    externalcodeRenderStore.currentPage=1;
//		    externalcodeRenderStore.load({
//		    	callback : function(records, operation, success) {
//    			if (success && records.length>0) {
//    				if(records[0].data.descriptionExc!==null){
//    					defaultValue=parseInt(records[0].data.descriptionExc);
//    					if(component==='#direccion_postal'){
//    					btn.up('window').down ('combo[name="placeNameCountry"]').setValue(defaultValue);
//    					}else if(component==='#direccion_visita'){
//    					btn.up('window').down ('combo[name="placeNameCountryVisit"]').setValue(defaultValue);	
//    					}
//    				}
//    			}
//    		}
//		    });
		
		
	   }
	    
	},
	
	_setAdressPostal: function(btn) {		
		var me = this;
		var window = Ext.ComponentQuery.query ('#contact_preference')[0];
		var components = [];
		if (btn.atype === 'visit') {
			components = [	  'combo[name="placeNameCountryVisit"]'
							, 'combo[name="placeNameCountrySubdivisionVisit"]'
							, 'combo[name="placeNameMunicipality1Visit"]'
							, 'combo[name="placeNameMunicipality2Visit"]'
							, '#direccion_visita'
							, 'textfield[name="streetAdressNameVisit"]'
							, 'textfield[name="streetAdressNumberVisit"]'
							, 'textfield[name="postalAdressUnitNumberVisit"]'
							, 'textfield[name="postalAdressBuildingNameVisit"]'
							, 'textfield[name="postalAdressFloorNumberVisit"]'
							, 'combo[name="postalCodeAssignedCodeVisit"]'
							
							];	
		} else {
			components = [	  'combo[name="placeNameCountry"]'
							, 'combo[name="placeNameCountrySubdivision"]'
							, 'combo[name="placeNameMunicipality1"]'
							, 'combo[name="placeNameMunicipality2"]'
							, '#direccion_postal'
							, 'textfield[name="streetAdressName"]'
							, 'textfield[name="streetAdressNumber"]'
							, 'textfield[name="postalAdressUnitNumber"]'
							, 'textfield[name="postalAdressBuildingName"]'
							, 'textfield[name="postalAdressFloorNumber"]'
							, 'combo[name="postalCodeAssignedCode"]'
							];
		}
		
		var fieldset_dirpos_items = window.down(components[4]).items;
		if(fieldset_dirpos_items!==null && fieldset_dirpos_items!==undefined){
	    for(var i=0; i<fieldset_dirpos_items.items.length; ++i){
	    	fieldset_dirpos_items.items[i].setReadOnly(true);
	    	fieldset_dirpos_items.items[i].setHideTrigger(true);
	    	fieldset_dirpos_items.items[i].setEditable(true);
	    }
	   }
        var seleccion = btn.up('window').down('grid').getSelectionModel().getSelection();
        
        if(seleccion) {		
        	if(btn.atype=='visit'){
            	window.down('#visitFieldsetForm').getForm().loadRecord(seleccion[0]);
            } else {
            	window.down('#postalFieldsetForm').getForm().loadRecord(seleccion[0]);
            }
			var panel = window.down (components[4]);
			panel.data = seleccion[0].data;
                        panel._setAdressPostal=true;
                        panel._addAdress=false;
			if (seleccion[0].data.postalPostCodePoa)
				window.down(components[10]).setRawValue(seleccion[0].data.postalPostCodePoa.assignedExternalCodePoc);
	        window.down(components[0]).setRawValue(seleccion[0].data.postalCountryPoa.namePla);
	        window.down(components[1]).setRawValue(seleccion[0].data.postalCountrySubdivisionPoa.namePla);
	        for(var j=0; j<seleccion[0].data.postalMunicipalityPoa.length; ++j){
	        	if(seleccion[0].data.postalMunicipalityPoa[j].typeCodeMun=='City'){
					var storeMunicipalityV2 = Ext.create('Ext.data.Store', {
						model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1'
					});
					window.down(components[2]).setStore (storeMunicipalityV2);
					window.down(components[2]).getStore (). add (seleccion[0].data.postalMunicipalityPoa[j]);
					window.down(components[2]).setRawValue (seleccion[0].data.postalMunicipalityPoa[j].namePla);					
	        	} else if(seleccion[0].data.postalMunicipalityPoa[j].typeCodeMun=='Township'){
					var storeMunicipalityV2 = Ext.create('Ext.data.Store', {
						model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2'
					});
					window.down(components[3]).setStore (storeMunicipalityV2);
					window.down(components[3]).getStore (). add (seleccion[0].data.postalMunicipalityPoa[j]);
					window.down(components[3]).setRawValue (seleccion[0].data.postalMunicipalityPoa[j].namePla);
	        	}
	        }
	        
	        var adress=seleccion[0].data.unstructuredAddressPla;
			var resAdress = adress.split("::");
			console.log(resAdress);
			if(resAdress!=null && resAdress.length>0){
			window.down(components[5]).setValue(resAdress[0]);
			}
			if(resAdress!=null && resAdress.length>1){
			if(resAdress[1]!=='undefined'){
			window.down(components[6]).setValue(resAdress[1]);
			}
			}
	        window.down(components[7]).setValue(seleccion[0].data.unitNumberPoa);
			window.down(components[8]).setValue(seleccion[0].data.buildingNamePoa);
			window.down(components[9]).setValue(seleccion[0].data.floorNumberPoa);
			//window.down(components[10]).setValue(seleccion[0].data.postalPostCodePoa.placeIdentifierPla);
			
			btn.up('window').close();
	     } else {
	       	
	     }
	},
	
	_loadControllerAdress: function(type, component){
		var record = component.up ('window').down ('form').getForm ().getRecord ();
		console.log (record);
		var store = Ext.create('Ext.data.Store', {
			model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',
			storeId: 'storePostalAddresses'
		});
		var tempAddress = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',{});
		if(type=='visit'){
			var fieldsTemp = component.up('window').down('#direccion_postal');
			if(fieldsTemp.data==null && fieldsTemp.data==undefined && fieldsTemp.down('[name="placeNameCountry"]').getValue()!=null && fieldsTemp.down('[name="placeNameCountry"]').getValue()!=undefined){
				var country = fieldsTemp.down('[name="placeNameCountry"]').findRecordByValue(fieldsTemp.down('[name="placeNameCountry"]').getValue());
				var subdivision = fieldsTemp.down('[name="placeNameCountrySubdivision"]').findRecordByValue(fieldsTemp.down('[name="placeNameCountrySubdivision"]').getValue());
				var municipality = fieldsTemp.down('[name="placeNameMunicipality1"]').findRecordByValue(fieldsTemp.down('[name="placeNameMunicipality1"]').getValue());
				var city = fieldsTemp.down('[name="placeNameMunicipality2"]').findRecordByValue(fieldsTemp.down('[name="placeNameMunicipality2"]').getValue());
				var postalcode = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', {
					assignedExternalCodePoc: fieldsTemp.down('[name="postalCodeAssignedCode"]').getValue(),
					creationUserImo: usuario.get('userName'),
					creationDateTimeImo: new Date(),
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				tempAddress.set({
					postalCountryPoa: country.data,
					postalCountrySubdivisionPoa: subdivision.data,
					postalMunicipalityPoa: [municipality.data,city.data],
					unstructuredAddressPla: fieldsTemp.down('[name="streetAdressName"]').getValue()+'::'+fieldsTemp.down('[name="streetAdressNumber"]').getValue(),
					unitNumberPoa: fieldsTemp.down('[name="postalAdressUnitNumber"]').getValue(),
					buildingNamePoa: fieldsTemp.down('[name="postalAdressBuildingName"]').getValue(),
					floorNumberPoa: fieldsTemp.down('[name="postalAdressFloorNumber"]').getValue(),
					postalPostCodePoa: postalcode.data,
					creationUserImo: usuario.get('userName'),
					creationDateTimeImo: new Date(),
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				store.loadRawData (tempAddress, true);
			}
		} else if (type=='postal'){
			var fieldsTemp = component.up('window').down('#direccion_visita');
			if(fieldsTemp.data==null && fieldsTemp.data==undefined && fieldsTemp.down('[name="placeNameCountryVisit"]').getValue()!=null && fieldsTemp.down('[name="placeNameCountryVisit"]').getValue()!=undefined){
				
				var country = fieldsTemp.down('[name="placeNameCountryVisit"]').findRecordByValue(fieldsTemp.down('[name="placeNameCountryVisit"]').getValue());
				var subdivision = fieldsTemp.down('[name="placeNameCountrySubdivisionVisit"]').findRecordByValue(fieldsTemp.down('[name="placeNameCountrySubdivisionVisit"]').getValue());
				var municipality = fieldsTemp.down('[name="placeNameMunicipality1Visit"]').findRecordByValue(fieldsTemp.down('[name="placeNameMunicipality1Visit"]').getValue());
				var city = fieldsTemp.down('[name="placeNameMunicipality2Visit"]').findRecordByValue(fieldsTemp.down('[name="placeNameMunicipality2Visit"]').getValue());
				var postalcode = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', {
					assignedExternalCodePoc: fieldsTemp.down('[name="postalCodeAssignedCodeVisit"]').getValue(),
					creationUserImo: usuario.get('userName'),
					creationDateTimeImo: new Date(),
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				tempAddress.set({
					postalCountryPoa: country.data,
					postalCountrySubdivisionPoa: subdivision.data,
					postalMunicipalityPoa: [municipality.data,city.data],
					unstructuredAddressPla: fieldsTemp.down('[name="streetAdressNameVisit"]').getValue()+'::'+fieldsTemp.down('[name="streetAdressNumberVisit"]').getValue(),
					unitNumberPoa: fieldsTemp.down('[name="postalAdressUnitNumberVisit"]').getValue(),
					buildingNamePoa: fieldsTemp.down('[name="postalAdressBuildingNameVisit"]').getValue(),
					floorNumberPoa: fieldsTemp.down('[name="postalAdressFloorNumberVisit"]').getValue(),
					postalPostCodePoa: postalcode.data,
					creationUserImo: usuario.get('userName'),
					creationDateTimeImo: new Date(),
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				store.loadRawData (tempAddress, true);		
			}
			
		}
		
//		tempAddress.save({
//			callback: function(record,
//					operation){
//				 Ext.data.StoreManager.lookup('storePostalAddresses').loadRawData(record,true);
//			}
//		});
		
		if(record.data.playerPartyPar!==null && record.data.playerPartyPar!==undefined){
			if (record.data.playerPartyPar.preferredContactPar !== undefined &&
			record.data.playerPartyPar.preferredContactPar.length>0) {
			for (var i=0; i<record.data.playerPartyPar.preferredContactPar.length; i++) {
				if (record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc !== undefined && store.find('addressIdentifierAdd',record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc.addressIdentifierAdd)==-1) {
					store.loadRawData (record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc, true);
				} else if (record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc !== undefined  && store.find('addressIdentifierAdd',record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc.addressIdentifierAdd)==-1) {	
					store.loadRawData (record.data.playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc, true); 
				}
			}
		}
		} else if(record.data.administeringAuthorityReg!==null && record.data.administeringAuthorityReg!==undefined && record.data.administeringAuthorityReg.length>0){
			if(record.data.administeringAuthorityReg[0].playerPartyPar!==null && record.data.administeringAuthorityReg[0].playerPartyPar!==undefined){
				if (record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar !== undefined &&
					record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar.length>0) {
					for (var i=0; i<record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar.length; i++) {
						if (record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc !== undefined && store.find('addressIdentifierAdd',record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc.addressIdentifierAdd)==-1) {
							store.loadRawData (record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.deliveryAddressPmc, true);
						} else if (record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc !== undefined && store.find('addressIdentifierAdd',record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc.addressIdentifierAdd)==-1) {	
							store.loadRawData (record.data.administeringAuthorityReg[0].playerPartyPar.preferredContactPar[i].preferredContactPointCop.meetingAddressIpc, true); 
						}
					}
				}
			}
		}	
		 var window = Ext.create('Ext.window.Window', {
		 	         itemId: 'direccion',
                                 title: 'Direcciones Disponibles',
		 	         width: '80%',
                                 resizable: false,
                                 draggable: false,
		 	         modal:true,
					 items: [
					 {
					   xtype: 'postaladdressv1grid',
					   store: store,
					   listeners: {
                                afterrender: function(grid) {
									
                                }
                            }
			         },
	                 {
	                    xtype: 'toolbar',
	                    layout: {pack: 'center'},
	                    items: [
	                        {
	                            xtype: 'button',
	                            action: 'seleccionarDireccion',
	                            name: 'SeleccionarDireccion',
	                            text: 'Seleccionar',
								atype: type
	                        },
	                        {
	                            xtype: 'button',
	                            action: 'cancelarDireccion',
	                            name: 'CancelarDireccion',
	                            text: 'Cancelar',
	                            handler: function() {
	                                this.up('window').close();
	                            }
	                        }
	
	                   		]
	                  }
		         ]
		         });
     window.show();
	},
	
	_loadPlaceCombobox: function (window, type, value, isVisit) {
		var components = [];
		if(value!==null){
		if (isVisit) {
			components = ['combo[name="placeNameCountrySubdivisionVisit"]',
							'combo[name="placeNameMunicipality1Visit"]',
							'combo[name="placeNameMunicipality2Visit"]',
							'combo[name="postalCodeAssignedCodeVisit"]',
							'textfield[name="streetAdressNameVisit"]',
							'textfield[name="streetAdressNumberVisit"]',
							'textfield[name="postalAdressUnitNumberVisit"]',
							'textfield[name="postalAdressBuildingNameVisit"]',
							'textfield[name="postalAdressFloorNumberVisit"]'
							];	
		} else {
			components = ['combo[name="placeNameCountrySubdivision"]',
							'combo[name="placeNameMunicipality1"]',
							'combo[name="placeNameMunicipality2"]',
							'combo[name="postalCodeAssignedCode"]',
							'textfield[name="streetAdressName"]',
							'textfield[name="streetAdressNumber"]',
							'textfield[name="postalAdressUnitNumber"]',
							'textfield[name="postalAdressBuildingName"]',
							'textfield[name="postalAdressFloorNumber"]'
							];
		}
		
		
		var store = Ext.getStore ('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV2');
	   	var filtro = filterCreation('PlaceProximity');
	   	var filtro = [];
		filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
			nombreCampo: 'fromPlacePlp.placeIdentifierPla',
			valor: value,
			operacion: '=',
			tipoValor: 'long'
		}).data);
		filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
			nombreCampo: 'class',
			valor: 'PlaceProximity',
			valores: null,
			operacion: '=',
			tipoValor: 'string'
		}).data);
		
       	store.getProxy().setExtraParam('filters', Ext.encode(filtro));	
       	
       	if (type == 'Country') {
				window.down (components[0]).getStore ().removeAll ();
				window.down (components[1]).getStore ().removeAll ();
				window.down (components[2]).getStore ().removeAll ();
				window.down (components[3]).getStore ().removeAll ();
				window.down (components[0]).setValue (null);
				window.down (components[1]).setValue (null);
				window.down (components[2]).setValue (null);
				window.down (components[3]).setValue (null);
		} else if (type == 'CountrySubdivision') {
				window.down (components[1]).getStore ().removeAll ();
				window.down (components[2]).getStore ().removeAll ();
				window.down (components[3]).getStore ().removeAll ();
				window.down (components[1]).setValue (null);
				window.down (components[2]).setValue (null);
				window.down (components[3]).setValue (null);
       	} else if (type == 'City') {
			    window.down (components[2]).getStore ().removeAll ();
			    window.down (components[3]).getStore ().removeAll ();
				window.down (components[2]).setValue (null);
				window.down (components[3]).setValue (null);
		} else if (type == 'Municipality') {
			    window.down (components[3]).getStore ().removeAll ();
				window.down (components[3]).setValue (null);
				window.down (components[4]).setReadOnly(false);
				window.down (components[4]).setHideTrigger(false);
				window.down (components[5]).setReadOnly(false);
				window.down (components[5]).setHideTrigger(false);
				window.down (components[6]).setReadOnly(false);
				window.down (components[6]).setHideTrigger(false);
				window.down (components[7]).setReadOnly(false);
				window.down (components[7]).setHideTrigger(false);
				window.down (components[8]).setReadOnly(false);
				window.down (components[8]).setHideTrigger(false);
		}
		
       	store.load ({
			callback : function(records, operation, success) {				
       			if (success && records.length>0) {
       				if (type == 'Country') {
						var storeCountruSubdivisionV1 = Ext.create('Ext.data.Store', {
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1',
							sorters: [{
								        property: 'namePla',
								        direction: 'ASC'
							}]
						});
						
						for (var i=0; i<records.length; i++) {
							if (records[i].data.toPlacePlp.typeCodeCos == 'State') {
								storeCountruSubdivisionV1.loadRawData (records[i].data.toPlacePlp, true);
							}
						}
						window.down (components[0]).setStore (storeCountruSubdivisionV1);   
						window.down (components[0]).oldData=storeCountruSubdivisionV1.getRange();
       				} else if (type == 'CountrySubdivision') {										
       					var storeMunicipalityV1 = Ext.create('Ext.data.Store', {
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1',
							sorters: [{
								        property: 'namePla',
								        direction: 'ASC'
							}]
						});
       					for (var i=0; i<records.length; i++) {
       						if (records[i].data.toPlacePlp.typeCodeMun == 'City') {
								storeMunicipalityV1.loadRawData (records[i].data.toPlacePlp, true);
							} 
						}
						window.down (components[1]).setStore (storeMunicipalityV1);				
       				} else if (type == 'City') {		       					   					       					
						var storeMunicipalityV2 = Ext.create('Ext.data.Store', {
						model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2',
						sorters: [{
								        property: 'namePla',
								        direction: 'ASC'
							}]
						});
       			
       					for (var i=0; i<records.length; i++) {
       						if (records[i].data.toPlacePlp.typeCodeMun == 'Township') {
								storeMunicipalityV2.loadRawData (records[i].data.toPlacePlp, true);
							} 
						}
						window.down (components[2]).setStore (storeMunicipalityV2);
       				} else if (type == 'Municipality') {		       					   					       					
						var storePostCodeV1 = Ext.create('Ext.data.Store', {
						model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1',
						sorters: [{
								        property: 'namePla',
								        direction: 'ASC'
							}]
						});
       			
       					for (var i=0; i<records.length; i++) {
							storePostCodeV1.loadRawData (records[i].data.toPlacePlp, true);
						}


						
						
						window.down (components[3]).setStore (storePostCodeV1);
						window.down (components[3]).setReadOnly(false);
						window.down (components[3]).setHideTrigger(false);
						
       				}
       			}	
			}
		});
		}
	},

	setDataContactPreference: function (window, playerPartyPar) {
		if (playerPartyPar.preferredContactPar === undefined || playerPartyPar.preferredContactPar === null) {
			playerPartyPar.preferredContactPar = [];
		}
		if (this.exists (window.down ('#networkAdressIdentifierEmailContact'), 'identifierNea') === -1) {			
		    var contactPreference = this._createEmailContact (window.down('combo[name="networkAdressIdentifierEmailContact"]').rawValue);
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}

		if (this.exists (window.down ('combo[name="networkAdressIdentifierWebPageContact"]'), 'identifierNea') === -1) {			
		    var contactPreference = this._createWebPageContact (window.down('combo[name="networkAdressIdentifierWebPageContact"]').rawValue);
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}
		
		if (this.exists (window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]'), 'fullNumberTnu') === -1) {	
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').rawValue, 'Land_Line');
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}		
		
		if (this.exists (window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]'), 'fullNumberTnu') === -1) {	
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').rawValue, 'Cell');
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}
		
		 var contactPreference = this._createAddress (window, true);
		 if (contactPreference !== null) {
			playerPartyPar.preferredContactPar.push (contactPreference.data);
		 }
		 
		var contactPreference = this._createAddress (window, false);
		 if (contactPreference !== null) { 
			playerPartyPar.preferredContactPar.push (contactPreference.data);
		 }		 
		
	},
	
	exists : function (component, value) {
		var store = component.getStore ();
		var index = store.findBy(function(rec, id) {
			if (rec.get (value) === component.rawValue){
				return true;  
			}
			return false;  
		});
		return index;	
	},
	
	_createAddress: function (window, isVisit) {
		if (isVisit) {
			components = [	'combo[name="placeNameCountryVisit"]',
							'combo[name="placeNameCountrySubdivisionVisit"]',
							'combo[name="placeNameMunicipality1Visit"]',
							'combo[name="placeNameMunicipality2Visit"]',
							'textfield[name="streetAdressNameVisit"]',
							'streetAdressNumberVisit',
							'postalAdressUnitNumberVisit',
							'postalAdressBuildingNameVisit',
							'postalAdressFloorNumberVisit'
							];	
		} else {
			components = [	'combo[name="placeNameCountry"]',
							'combo[name="placeNameCountrySubdivision"]',
							'combo[name="placeNameMunicipality1"]',
							'combo[name="placeNameMunicipality2"]',
							'textfield[name="streetAdressName"]',
							'streetAdressNumber',
							'postalAdressUnitNumber',
							'postalAdressBuildingName',
							'postalAdressFloorNumber'
							];
		}
		 
		if (window.down ('#direccion_postal').data !== null) {
			console.log (window.down ('#direccion_postal').data);
			return null;
		}
		
		var objeto = window.down('form').getForm().getValues(false, true, false);
		if (window.down (components[0]).value && 
			window.down (components[1]).value &&
			window.down (components[2]).value &&
			window.down (components[3]).value) {	
			var record = window.down('form').getForm().getRecord ();
			var address = record.get ('playerPartyPar').preferredContactPar[0].preferredContactPointCop.deliveryAddressPmc;
			
			var postalMunicipalityPoa = [];
			var postalCountryPoa = null;
			var postalCountrySubdivisionPoa = null;
			
			if (components[0].valueModels === undefined) {
				if (address.postalCountryPoa.descriptionPla === window.down (components[0]).value) {
					postalCountryPoa = address.postalCountryPoa;
					postalCountrySubdivisionPoa = address.postalCountrySubdivisionPoa;
					postalMunicipalityPoa = address.postalMunicipalityPoa;
				}
			} else {
				postalCountryPoa = window.down (components[0]).valueModels[0].data;
				postalCountrySubdivisionPoa = window.down (components[1]).valueModels[0].data;
				postalMunicipalityPoa.push (window.down (components[2]).valueModels[0].data);
				postalMunicipalityPoa.push (window.down (components[3]).valueModels[0].data);
			}
			
			var uniformResourceLocation=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',{
				'unstructuredAddressPla': objeto[components[4]]+'::'+objeto[components[5]],
				'includedStreetAddressPoa': null,
				'unitNumberPoa': objeto[components[6]],
				'buildingNamePoa': objeto[components[7]],
				'floorNumberPoa': objeto[components[8]],
				'postalCountryPoa': postalCountryPoa,
				'postalCountrySubdivisionPoa': postalCountrySubdivisionPoa,
				'postalMunicipalityPoa': postalMunicipalityPoa,
				'postalPostCodePoa': null,
				'identifiedPlacePla': null,
				'creationUserImo': usuario.get('userName'),
				'creationDateTimeImo': new Date(),
				'updateUserImo': usuario.get('userName'),
				'updateDateTimeImo': new Date()
				
			});
			
			var postalEmailContact=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.PostalMailContactV1',{
				creationUserImo: usuario.get('userName'),
				creationDateTimeImo: new Date(),
				updateUserImo: usuario.get('userName'),
				updateDateTimeImo: new Date()
			});
			
			postalEmailContact.data.deliveryAddressPmc=uniformResourceLocation.data;	
		   
			var contactPreference = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',{
					creationUserImo: usuario.get('userName'),
					creationDateTimeImo: new Date(),
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date(),
					priorityLevelCop: 1,
					usageCodeCop: 'Business',
				});
				
			contactPreference.data.preferredContactPointCop=postalEmailContact.data;
		   
			return contactPreference;
		}
		return null;
	},
				
	_createEmailContact: function (value) {
		if (value === null || value === '') {
			return null;
		}
		
        var uniformResourceLocation=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',{
        	identifierNea: value,
        	creationUserImo: usuario.get('userName'),
            creationDateTimeImo: new Date(),
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        	
        });
        
        var emailContact=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.EmailContactV1',{
        	creationUserImo: usuario.get('userName'),
            creationDateTimeImo: new Date(),
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        
        emailContact.data.uniformResourceLocationMec=uniformResourceLocation.data;	
       
        var contactPreference = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',{
            	creationUserImo: usuario.get('userName'),
                creationDateTimeImo: new Date(),
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date(),
				priorityLevelCop: 1,
				usageCodeCop: 'Business'
            });
            
        contactPreference.data.preferredContactPointCop=emailContact.data;
        
        return contactPreference;
	},
	
	_createTelephoneContact : function (value, type) {
		if (value === null || value === '') {
			return null;
		}
		var telephoneNumberFijo=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',{
            	fullNumberTnu: value, 
            	creationUserImo: usuario.get('userName'),
                creationDateTimeImo: new Date(),
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date()
            });
           
		var telephoneCallContactFijo=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.TelephoneCallContactV1',{
			creationUserImo: usuario.get('userName'),
			creationDateTimeImo: new Date(),
			updateUserImo: usuario.get('userName'),
			updateDateTimeImo: new Date(),
			networkTypeCodeTcc: type
		});
	   
		telephoneCallContactFijo.data.telephoneNumberTcc=telephoneNumberFijo.data;
	   
		contactPreference=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',{
			creationUserImo: usuario.get('userName'),
			creationDateTimeImo: new Date(),
			updateUserImo: usuario.get('userName'),
			updateDateTimeImo: new Date(),
			priorityLevelCop: 1,
			usageCodeCop: 'Business'
		});
		
		contactPreference.data.preferredContactPointCop = telephoneCallContactFijo.data;
		
		return 	contactPreference;
	}, 		
			
	_createWebPageContact: function (value) {
		if (value === null || value === '') {
			return null;
		}
		
        var uniformResourceLocation=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',{
        	identifierNea: value,
        	creationUserImo: usuario.get('userName'),
            creationDateTimeImo: new Date(),
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        	
        });
        
        var webPageContact=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1',{
        	creationUserImo: usuario.get('userName'),
            creationDateTimeImo: new Date(),
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        
        webPageContact.data.uniformResourceLocationWpc=uniformResourceLocation.data;	
       
        var contactPreference = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',{
            	creationUserImo: usuario.get('userName'),
                creationDateTimeImo: new Date(),
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date(),
				priorityLevelCop: 1,
				usageCodeCop: 'Business'
            });
            
        contactPreference.data.preferredContactPointCop=webPageContact.data;
        
        return contactPreference;
	},				
	
	_loadContactPreferenceData: function(window, seleccion){
		var storeEmail = Ext.create('Ext.data.Store', {
			model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1'
		});
	    
	    var storeTelephoneNumber = Ext.create('Ext.data.Store', {
			model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1'
		});
		
		var storeTelephoneNumber2 = Ext.create('Ext.data.Store', {
			model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1'
		});
		
		var storeWebPage = Ext.create('Ext.data.Store', {
			model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1'
		});
		
		if(seleccion.data.playerPartyPar.preferredContactPar){
			window.down ('combo[name="networkAdressIdentifierEmailContact"]').setStore (storeEmail);
			window.down ('combo[name="networkAdressIdentifierWebPageContact"]').setStore (storeWebPage);
			window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').setStore (storeTelephoneNumber);
			window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').setStore (storeTelephoneNumber2);
			
			var prefer=seleccion.data.playerPartyPar.preferredContactPar;
			for(var i=0;i<prefer.length;i++){
				var contactPoint=prefer[i].preferredContactPointCop;
				if(contactPoint!== null && contactPoint.typeNameImo=='EmailContact' && contactPoint.uniformResourceLocationMec){
					var url=contactPoint.uniformResourceLocationMec;
					var uniformResourceLocation = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',contactPoint.uniformResourceLocationMec);
					window.down ('combo[name="networkAdressIdentifierEmailContact"]').getStore ().loadRawData (uniformResourceLocation, true);
					if (prefer[i].priorityLevelCop === 1) {
						window.down ('combo[name="networkAdressIdentifierEmailContact"]').setValue(contactPoint.uniformResourceLocationMec.addressIdentifierAdd);				   		
					}
				} else if(contactPoint.typeNameImo=='TelephoneCallContact' && contactPoint.telephoneNumberTcc && contactPoint.networkTypeCodeTcc=='Land_Line'){
					var telephoneNumber = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',contactPoint.telephoneNumberTcc);
					window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').getStore ().loadRawData (telephoneNumber, true);
					if (prefer[i].priorityLevelCop === 1) {
						window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').setValue(contactPoint.telephoneNumberTcc.addressIdentifierAdd);
					}
				} else if (contactPoint.typeNameImo=='TelephoneCallContact' && contactPoint.telephoneNumberTcc && contactPoint.networkTypeCodeTcc=='Cell'){
					var telephoneNumber = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',contactPoint.telephoneNumberTcc);
					window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').getStore ().loadRawData (telephoneNumber, true);
					if (prefer[i].priorityLevelCop === 1) {
						window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').setValue(contactPoint.telephoneNumberTcc.addressIdentifierAdd);
					}
				} else if (contactPoint!== null && contactPoint.typeNameImo=='WebPageContact' && contactPoint.uniformResourceLocationWpc) {
					var url=contactPoint.uniformResourceLocationWpc;
					var uniformResourceLocation = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',contactPoint.uniformResourceLocationWpc);
					window.down ('combo[name="networkAdressIdentifierWebPageContact"]').getStore ().loadRawData (uniformResourceLocation, true);
					if (prefer[i].priorityLevelCop === 1) { 
						window.down ('combo[name="networkAdressIdentifierWebPageContact"]').setValue(contactPoint.uniformResourceLocationWpc.addressIdentifierAdd);				   		
					}
					//PostalMailContact
					} else if(contactPoint!== null && contactPoint!== undefined && contactPoint.typeNameImo=='PostalMailContact' && prefer[i].priorityLevelCop===1 &&  prefer[i].usageCodeCop==='Business'){
						  window.down ('#direccion_postal').data = contactPoint.deliveryAddressPmc;
						  window.down('combo[name="placeNameCountry"]').setRawValue(contactPoint.deliveryAddressPmc.postalCountryPoa.namePla);
						  window.down('combo[name="placeNameCountrySubdivision"]').setRawValue(contactPoint.deliveryAddressPmc.postalCountrySubdivisionPoa.namePla);
						  if (contactPoint.deliveryAddressPmc.postalPostCodePoa)
							window.down('combo[name="postalCodeAssignedCode"]').setRawValue(contactPoint.deliveryAddressPmc.postalPostCodePoa.namePla);
						  	for(var j=0; j<contactPoint.deliveryAddressPmc.postalMunicipalityPoa.length; ++j){
						  		if(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].typeCodeMun=='City')
						  		window.down('combo[name="placeNameMunicipality1"]').setRawValue(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].namePla);
						  		else if(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].typeCodeMun=='Township')
						  	    window.down('combo[name="placeNameMunicipality2"]').setRawValue(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].namePla);
						  	}
						  var adress=contactPoint.deliveryAddressPmc.unstructuredAddressPla;
						  var resAdress = adress.split("::");
						  if(resAdress!=null && resAdress.length>0){
							window.down('textfield[name="streetAdressName"]').setValue(resAdress[0]);
						  }
						  if(resAdress!=null && resAdress.length>1){
							window.down('textfield[name="streetAdressNumber"]').setValue(resAdress[1]);
						  }

						  window.down('textfield[name="postalAdressUnitNumber"]').setValue(contactPoint.deliveryAddressPmc.unitNumberPoa);
						  window.down('textfield[name="postalAdressBuildingName"]').setValue(contactPoint.deliveryAddressPmc.buildingNamePoa);
						  window.down('textfield[name="postalAdressFloorNumber"]').setValue(contactPoint.deliveryAddressPmc.floorNumberPoa);
						  //window.down('textfield[name="postalCodeAssignedCode"]').setValue(contactPoint.deliveryAddressPmc.postalPostCodePoa);
						  
				} else if(contactPoint!== null && contactPoint!== undefined && contactPoint.typeNameImo=='InPersonContact' && prefer[i].priorityLevelCop===1 &&  prefer[i].usageCodeCop==='Business'){
						  window.down ('#direccion_visita').data = contactPoint.meetingAddressIpc;
						  window.down('combo[name="placeNameCountryVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalCountryPoa.namePla);
						  window.down('combo[name="placeNameCountrySubdivisionVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalCountrySubdivisionPoa.namePla);
						  if (contactPoint.meetingAddressIpc.postalPostCodePoa)
							window.down('combo[name="postalCodeAssignedCodeVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalPostCodePoa.namePla);
						  	for(var j=0; j<contactPoint.meetingAddressIpc.postalMunicipalityPoa.length; ++j){
						  		if(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].typeCodeMun=='City')
						  		window.down('combo[name="placeNameMunicipality1Visit"]').setRawValue(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].namePla);
						  		else if(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].typeCodeMun=='Township')
						  	    window.down('combo[name="placeNameMunicipality2Visit"]').setRawValue(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].namePla);
						  	}
						  var adress=contactPoint.meetingAddressIpc.unstructuredAddressPla;
						  var resAdress = adress.split("::");
						  if(resAdress!=null && resAdress.length>0){
							window.down('textfield[name="streetAdressNameVisit"]').setValue(resAdress[0]);
						  }
						  if(resAdress!=null && resAdress.length>1){
							window.down('textfield[name="streetAdressNumberVisit"]').setValue(resAdress[1]);
						  }

						  window.down('textfield[name="postalAdressUnitNumberVisit"]').setValue(contactPoint.meetingAddressIpc.unitNumberPoa);
						  window.down('textfield[name="postalAdressBuildingNameVisit"]').setValue(contactPoint.meetingAddressIpc.buildingNamePoa);
						  window.down('textfield[name="postalAdressFloorNumberVisit"]').setValue(contactPoint.meetingAddressIpc.floorNumberPoa);
						  //window.down('textfield[name="postalCodeAssignedCodeVisit"]').setValue(contactPoint.meetingAddressIpc.postalPostCodePoa);
						  
				}					
			}
		};
	
	},

	
	/***************************************/
	doIt: function (object) {
		if (object === null)
			return null;
		
		var task = null;
		if (object.doIt === undefined) {
			task = object;
		} else {
			task = object.tasks[object.doIt];  
		}
		
		switch(task['function']) {
			case 'loadObjectFromStore':
				return this.loadObjectFromStore (task);
				break;
			case '_newEmpyObject':
				return this._newEmpyObject (task);
				break;
			case 'loadWindow':
				return this.loadWindow (task);
				break;				
			default:
				throw 'Empty function';
		}

	},																															
		
	loadWindow: function (task) {
		return Ext.widget(task.param.windowName);
	},
		
	loadObjectFromStore: function (task) {															
		var me = this;
		//begin
		var store = Ext.getStore (task.param.storeName);
		store.load({
			callback: function(records, operation, success) {
				//success
				if (success) {
					if (records !== null && records.length>0) {
						var pointTask = me._getTask (task, 'loadObjectFromStore_load_records');
						var vobj = me.doIt (pointTask);
						me._loadData (windowInsurance, records[0], 'InsuranceBrokerageV1');
					} else {
						//empty records
					}
				//failure
				} else {
					
				}
				//end
			}
		});
	},
	
	
	_getTask: function (task, taskName) {
		if (task.points && task.points.length>0) {
			for (var i=0; i<task.points.length; i++) {
				if (task.points[i].name === taskName) {
				return task.points[i].task;
			}
		}
		return null;
		}
	},
	/***************************************************************************/
	
	
});

