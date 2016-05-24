Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.UtilControllerV1', {
    extend: 'Ext.app.Controller',
	views: [
//	        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1SelectionTypeWindow',
//			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1SelectionTypeWindow',
			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusCompany',
			'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.ContactPreference'
			],
    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1',
			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1',
			 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1',
			 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1',
			 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1',
			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1'//,
//    		 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1',
//    		 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',
//             'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.EmailContactV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.TelephoneCallContactV1',			
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.PostalMailContactV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2',			
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',
//			 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.InPersonContactV1'
			 ],
    stores: [ 
             'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1'
    		 , 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1'
//			 , 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1'
			 , 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1'
//			 , 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1'				 
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsurancePoolV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1'
//			 , 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1'
//			 
			 
	], 
//    controllers: ['AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1',
//				  'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsurancePoolV1',
				  //'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1',
//				  'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1',
//				  'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1',
//				  'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1',
//				  'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.UtilContactPreference'
    			  //'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',
				  //'AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1',
    			  //'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1'
//				  ],
    init: function() {
        this.control({        	
        	'insurancecompanyv1selectiontypewindow button[action=aceptar]': {
                click: this.initInsuranceCompany
            },
			'employeev1selectiontypewindow button[action=aceptar]' : {
				click : this.initEmployee
			},
			'employerv1selectiontypewindow button[action=aceptar]' : {
				click : this.initEmployer
			},
            'inspectorv1selectiontypewindow button[action=aceptar]': {
                click: this.initInspector
            },
            'reinsurancecompanyv1selectiontypewindow button[action=aceptar]': {
                click: this.initReinsuranceCompany
            },               
            'insurancebrokeragev1selectiontypewindow_ext button[action=aceptar]': {
                click: this.initInsuranceBrokerage
            },        
            'reinsurancebrokeragev1selectiontypewindow button[action=aceptar]': {
                click: this.initReinsuranceBrokerage
            },        
        	'insurancebrokeragev1principalwindow_ext button[action=create]': {
                click: this.createInsuranceBrokerage
            },        	
        	'insurancebrokeragev2principalwindow_ext button[action=create]': {
                click: this.createInsuranceBrokerage
            },
            'insurancecompanyv1principalwindow_ext button[action=create]': {
                click: this.createInsuranceCompany
			},
			'reinsurancecompanyv1principalwindow_ext button[action=create]' : {
				click : this.createReinsuranceCompany
			},
			'inspectorv1principalwindow_ext button[action=create]' : {
				click : this.createInspector
			},			
			'inspectorv2principalwindow_ext button[action=create]' : {
				click : this.createInspector
			},
			'customerv1selectiontypewindow button[action=aceptar]' : {
				click : this.initCustomer
			},
			'customerv1principalwindow_ext button[action=create]' : {
				click : this.createCustomer
			},
			'customerv2principalwindow_ext button[action=create]' : {
				click : this.createCustomer
			},
			'customerv3principalwindow_ext button[action=create]' : {
				click : this.createCustomer
			},
			'employerv1principalwindow_ext button[action=create]' : {
				click : this.createEmployer
			},
			'employerv2principalwindow_ext button[action=create]' : {
				click : this.createEmployer
			},
			'employeev1principalwindow_ext button[action=create]' : {
				click : this.createEmployee
			},
			'insurancecompanyv1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsInsuranceCompany
			},					
			'insurancecompanyv1grid_ext button[action=edit]': {
                click: this.editInsuranceCompany
            },
			'reinsurancecompanyv1grid_ext button[action=edit]': {
                click: this.editReinsuranceCompany
            },			
			'insurancebrokeragev1grid_ext button[action=edit]': {
                click: this.editInsuranceBrokerage
            },		
			'reinsurancebrokeragev1grid_ext button[action=edit]' : {
				click: this.editReinsuranceBrokerage
			},			
			'inspectorv1grid_ext button[action=edit]' : {
				click: this.editInspector
			},						
			'customerv1grid_ext button[action=edit]' : {
				click: this.editCustomer
			},									
			'reinsurancecompanyv1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsReinsuranceCompany
			},
			'insurancebrokeragev1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsInsuranceBrokerage
			},
			'reinsurancebrokeragev1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsReinsuranceBrokerage
			},
			'reinsurancebrokeragev1principalwindow button[action=create]': {
                click: this.createReinsuranceBrokerage
            },			
			'inspectorv1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsInspector
			},
			'customerv1grid_ext button[action=mostrarWindows]' : {
				click: this.mostrarWindowsCustomer
			},
			'insurancecompanyv1principalform_ext button[action=buscar]': {
                click: this.buscar
            },
			'statustoolbar button[action=cerrar]': {
				click: this.cerrarCompany
			},
			'statustoolbar button[action=abrir]': {
				click: this.abrirCompany
			},
			'statustoolbar button[action=liquidar]': {
				click: this.liquidarCompany
			}
			//'contactpreference': {
			//	load_combobox : this._loadPlaceCombobox,
			//	load_adress : this._loadControllerAdress,
			//	add_adress: this._addAdress 
			//},
			//'#direccion button[action=seleccionarDireccion]': {
            //    click: this._setAdressPostal
			//}
		}); 
	},
	
	abrirCompany: function (btn) {
		btn.setDisabled (true);
		var record = btn.up('window').down('form').getForm().getRecord();		
		record.data.playerPartyPar.statusCom.codeCos = 'Active';
		record.data.playerPartyPar.statusCom.nameSta = 'Activa';		
		this.saveCompany (btn, record);				
	},
	
	liquidarCompany: function (btn) {
		btn.setDisabled (true);
		var record = btn.up('window').down('form').getForm().getRecord();		
		record.data.playerPartyPar.statusCom.codeCos = 'ForcedLiquidation';
		record.data.playerPartyPar.statusCom.nameSta = 'En Liquidación';
		this.saveCompany (btn, record);				
	},
	
	cerrarCompany: function (btn) {
		btn.setDisabled (true);
		var record = btn.up('window').down('form').getForm().getRecord();		
		record.data.playerPartyPar.statusCom.codeCos = 'VoluntaryClosing';
		record.data.playerPartyPar.statusCom.nameSta = 'Cierre Voluntario';		
		this.saveCompany (btn, record);				
	},

	_refreshCompanyStatus:function (btn, rec) {
		if(rec==null || rec.data.playerPartyPar.statusCom==null){
			btn.up('window').down('button[action=abrir]').setDisabled(true);
			btn.up('window').down('button[action=cerrar]').setDisabled(true);
			btn.up('window').down('button[action=liquidar]').setDisabled(true);
			btn.up('window').down('textfield[name="status"]').setValue (null);
		} else if (rec.data.playerPartyPar.statusCom.codeCos=='Active') {
			btn.up('window').down('button[action=abrir]').setDisabled(true);
			btn.up('window').down('button[action=cerrar]').setDisabled(false);
			btn.up('window').down('button[action=liquidar]').setDisabled(false);
			btn.up('window').down('textfield[name="status"]').setValue ('Activa');
		} else if (rec.data.playerPartyPar.statusCom.codeCos=='VoluntaryClosing') {
			btn.up('window').down('button[action=abrir]').setDisabled(false);
			btn.up('window').down('button[action=cerrar]').setDisabled(true);
			btn.up('window').down('button[action=liquidar]').setDisabled(true);
			btn.up('window').down('textfield[name="status"]').setValue ('Cierre Voluntario');
		} else if (rec.data.playerPartyPar.statusCom.codeCos=='ForcedLiquidation') {
			btn.up('window').down('button[action=abrir]').setDisabled(false);
			btn.up('window').down('button[action=cerrar]').setDisabled(true);
			btn.up('window').down('button[action=liquidar]').setDisabled(true);
			btn.up('window').down('textfield[name="status"]').setValue ('En Liquidación');
		}
	},
	
	saveCompany: function (btn, record) {
		var me = this;
		btn.up('window').mask("Cambiando estado.", "x-mask-loading");
		record.save ({
			callback: function (record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						//Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1').reload();
						me._refreshCompanyStatus (btn, record);
						crearVentana(respuesta.codigo, 'El estado de la Compañía ha sido modificado.');
					} else {
						crearVentana(respuesta.codigo, 'El estado de la Compañía no pudo ser modificado.');
					}
				} else {
					if (operation.error) {
						crearVentana (5, "Error de conexión");
					}
				}
			},
			success: function(rec,st){
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure: function(rec,st,a,b,c){
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});	
	},
	
    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation('InsuranceCompany');
            var paramValues =  btn.up('form').getValues(false, true, false);

            if (paramValues.rut != "" && paramValues.rut != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'playerPartyPar<>keyImo',
                    valor: paramValues.rut,
                    operacion: '=',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
            }

            if (paramValues.typeNameImo != "" && paramValues.typeNameImo != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('insurancecompanyv1formsearch').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
        }
    },

	mostrarWindowsInsuranceCompany: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('insurancecompanyv1selectiontypewindow');
        ventana.show();
        btn.setDisabled(false);
	},
	
	mostrarWindowsReinsuranceCompany: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('reinsurancecompanyv1selectiontypewindow');
        ventana.show();
        btn.setDisabled(false);
	},
	
	mostrarWindowsInsuranceBrokerage: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('insurancebrokeragev1selectiontypewindow_ext');
        ventana.show();
        btn.setDisabled(false);
	},
	
	mostrarWindowsReinsuranceBrokerage: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('reinsurancebrokeragev1selectiontypewindow');
        ventana.show();
        btn.setDisabled(false);
	},
	
	mostrarWindowsInspector: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('inspectorv1selectiontypewindow');
        ventana.show();
        btn.setDisabled(false);
	},
	
	mostrarWindowsCustomer: function (btn) {
		btn.setDisabled(true);
        var ventana = Ext.widget('customerv1selectiontypewindow');
        ventana.show();
        btn.setDisabled(false);
	},
	
	_addAdress: function(btn, type){		
	    var component = '#direccion_postal';
		if (type === 'visit') {
			component = '#direccion_visita';
		}
		
		var fieldset_dirpos_items=btn.up('window').down('contactpreference').down(component).items;
		if(fieldset_dirpos_items!==null && fieldset_dirpos_items!==undefined){
	    for(var i=0; i<fieldset_dirpos_items.items.length; ++i){
	    	fieldset_dirpos_items.items[i].setReadOnly(false);
	    	fieldset_dirpos_items.items[i].setHideTrigger(false);
	    	fieldset_dirpos_items.items[i].setEditable(true);
	        fieldset_dirpos_items.items[i].setRawValue("");
	    }
		window.down (components[4]).data = null;
	   }
	    
	},
	
	_setAdressPostal: function(btn) {		
		var me = this;
		var window = Ext.ComponentQuery.query ('#contact_preference')[Ext.ComponentQuery.query ('#contact_preference').length-1];
		var components = [];
		if (btn.atype === 'visit') {
			components = [	'combo[name="placeNameCountryVisit"]'
							, 'combo[name="placeNameCountrySubdivisionVisit"]'
							, 'combo[name="placeNameMunicipality1Visit"]'
							, 'combo[name="placeNameMunicipality2Visit"]'
							, '#direccion_visita'
							, 'combo[name="streetAdressNameVisit"]'
							, 'combo[name="streetAdressNumberVisit"]'
							, 'textfield[name="postalAdressUnitNumberVisit"]'
							, 'textfield[name="postalAdressBuildingNameVisit"]'
							, 'textfield[name="postalAdressFloorNumberVisit"]'
							, 'textfield[name="postalCodeAssignedCodeVisit"]'
							
							];	
		} else {
			components = [	  'combo[name="placeNameCountry"]'
							, 'combo[name="placeNameCountrySubdivision"]'
							, 'combo[name="placeNameMunicipality1"]'
							, 'combo[name="placeNameMunicipality2"]'
							, '#direccion_postal'
							, 'combo[name="streetAdressName"]'
							, 'combo[name="streetAdressNumber"]'
							, 'textfield[name="postalAdressUnitNumber"]'
							, 'textfield[name="postalAdressBuildingName"]'
							, 'textfield[name="postalAdressFloorNumber"]'
							, 'textfield[name="postalCodeAssignedCode"]'
							];
		}
		
		var fieldset_dirpos_items = window.down(components[4]).items;
		if(fieldset_dirpos_items!==null && fieldset_dirpos_items!==undefined){
	    for(var i=0; i<fieldset_dirpos_items.items.length; ++i){
	    	fieldset_dirpos_items.items[i].setReadOnly(true);
	    	fieldset_dirpos_items.items[i].setHideTrigger(true);
	    	fieldset_dirpos_items.items[i].setEditable(false);
	    }
	   }
        var seleccion = btn.up('window').down('grid').getSelectionModel().getSelection();
        if(seleccion) {
	        window.down(components[0]).setValue(seleccion[0].data.postalCountryPoa.placeIdentifierPla);
	        window.down(components[1]).setValue(seleccion[0].data.postalCountrySubdivisionPoa.placeIdentifierPla);
	        for(var j=0; j<seleccion[0].data.postalMunicipalityPoa.length; ++j){
	        	if(seleccion[0].data.postalMunicipalityPoa[0].typeCodeMun=='City'){
	        	window.down(components[2]).setValue(seleccion[0].data.postalMunicipalityPoa[j].placeIdentifierPla);
	        	}
	        	else if(seleccion[0].data.postalMunicipalityPoa[0].typeCodeMun=='Township'){
	        	window.down(components[3]).setValue(seleccion[0].data.postalMunicipalityPoa[j].placeIdentifierPla);
	        	}
	        }
	        
	        var adress=seleccion[0].data.unstructuredAddressPla;
			var resAdress = adress.split("::");
			if(resAdress!=null && resAdress.length>0){
			window.down(components[5]).setRawValue(resAdress[0]);
			}
			if(resAdress!=null && resAdress.length>1){
			window.down(components[6]).setValue(resAdress[1]);
			}
	        window.down(components[7]).setValue(seleccion[0].data.unitNumberPoa);
			window.down(components[8]).setValue(seleccion[0].data.buildingNamePoa);
			window.down(components[9]).setValue(seleccion[0].data.floorNumberPoa);
			window.down(components[10]).setValue(seleccion[0].data.postalPostCodePoa);
	        
	        btn.up('window').close();
	     } else {
	       	
	     }
	},
	
	_loadControllerAdress: function(type){
		this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1');
		 var window = Ext.create('Ext.window.Window', {
		 	         itemId: 'direccion',
		 	         width: '50%',
					 items: [
					 {
					   xtype: 'postaladdressv1grid',
					   listeners: {
                                afterrender: function(grid) {
                                    grid.getStore().load({
										callback : function () {
											Ext.ComponentQuery.query ('#direccion')[Ext.ComponentQuery.query ('#direccion').length-1].center ();
										}
									});
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
		if (isVisit) {
			components = ['combo[name="placeNameCountrySubdivisionVisit"]',
							'combo[name="placeNameMunicipality1Visit"]',
							'combo[name="placeNameMunicipality2Visit"]'];	
		} else {
			components = ['combo[name="placeNameCountrySubdivision"]',
							'combo[name="placeNameMunicipality1"]',
							'combo[name="placeNameMunicipality2"]'];
		}
		
		
		var store = Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1');
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
				/*window.down (components[0]).setValue (null);
				window.down (components[1]).setValue (null);
				window.down (components[2]).setValue (null);*/
		} else if (type == 'CountrySubdivision') {
				window.down (components[1]).getStore ().removeAll ();
				window.down (components[2]).getStore ().removeAll ();
				//window.down (components[1]).setValue (null);
				//window.down (components[2]).setValue (null);
       	} else if (type == 'City') {
			    window.down (components[2]).getStore ().removeAll ();
			    //window.down (components[2]).setValue (null);       				
		}
		
       	store.load ({
			callback : function(records, operation, success) {				
       			if (success && records.length>0) {
       				if (type == 'Country') {
						var storeCountruSubdivisionV1 = Ext.create('Ext.data.Store', {
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1'
						});
						
						for (var i=0; i<records.length; i++) {
							if (records[i].data.toPlacePlp.typeCodeCos == 'State') {
								storeCountruSubdivisionV1.loadRawData (records[i].data.toPlacePlp, true);
							}
						}
						window.down (components[0]).setStore (storeCountruSubdivisionV1);       					
       				} else if (type == 'CountrySubdivision') {										
       					var storeMunicipalityV1 = Ext.create('Ext.data.Store', {
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1'
						});
       					for (var i=0; i<records.length; i++) {
       						if (records[i].data.toPlacePlp.typeCodeMun == 'City') {
								storeMunicipalityV1.loadRawData (records[i].data.toPlacePlp, true);
							} 
						}
						window.down (components[1]).setStore (storeMunicipalityV1);				
       				} else if (type == 'City') {		       					   					       					
						var storeMunicipalityV2 = Ext.create('Ext.data.Store', {
						model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2'
						});
       			
       					for (var i=0; i<records.length; i++) {
       						if (records[i].data.toPlacePlp.typeCodeMun == 'Township') {
								storeMunicipalityV2.loadRawData (records[i].data.toPlacePlp, true);
							} 
						}
						window.down (components[2]).setStore (storeMunicipalityV2);
       				}
       			}	
			}
		});
	},

	initEmployee: function(btn){
		var me = this;
		var window = btn.up('window');
		var rut = window.down('textfield[name="rut"]').value;
		if (rut != null && rut != '') {
			window.close ();
			
			var typeParty = 'Person';
			var storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1';
			
			var storeParty = me.createStoreParty(storeName, typeParty, rut);
			me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1');

			storeParty.load({
				callback : function(records, operation, success) {
					var controller = AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1');
					var windowInsurance = Ext.widget('employeev1principalwindow_ext');;
					
					if (success) {
						if (records !== null && records.length > 0) {
							// windowInsurance.setTitle('Corredor de Seguros NÂº ' + records[0].get('roleIdentifierRol'));
							var store = me._createStoreInsurance('Employee', 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1', records[0].get('partyIdentifierPar'));
							var playerPartyPar = records[0];
							store.load({
								callback : function(records, operation, success) {
									if (records !== null && records.length > 0) {
										me.loadRol(windowInsurance, records[0], 'EmployeeV1');
									} else {
										me.__newEmployee(windowInsurance, playerPartyPar);
									}
								}
							});
						} else {
							me.__newEmptyEmployee(windowInsurance, rut, typeParty);
						}
					}
					window.close();
				}
			});
		} else {
		}
	},
	
	initEmployer: function(btn){
		var me = this;
		var window = btn.up('window');
		var rut = window.down('textfield[name="rut"]').value;
		if (rut != null && rut != '') {
			window.close ();
			
			var typeParty = null;
			var storeName = null;
			if (Ext.getCmp('radio_empresa').value) {
				typeParty = 'Company';
				storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';
			} else {
				typeParty = 'GovernmentBody';
				storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1';
			}

			var storeParty = me.createStoreParty(storeName, typeParty, rut);
			me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1');

			storeParty.load({
				callback : function(records, operation, success) {
					var controller = AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1');
					var windowInsurance = null;
					 if (typeParty === 'Company') {
						windowInsurance = Ext.widget('employerv1principalwindow_ext');
						windowInsurance.down ('statuscompany').down('fieldset').setTitle ('Estado de la Empresa');
			            windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos de la Empresa');
					} else {
						windowInsurance = Ext.widget('employerv2principalwindow_ext');
						windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos del Organismo de Gobierno');
		                windowInsurance.down('textfield[name="organizationNamefullName"]').setFieldLabel('Nombre del Organismo de Gobierno');

					}
					if (success) {
						if (records !== null && records.length > 0) {
							// windowInsurance.setTitle('Corredor de Seguros NÂº ' + records[0].get('roleIdentifierRol'));
							var store = me._createStoreInsurance('Employer', 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1', records[0].get('partyIdentifierPar'));
							var playerPartyPar = records[0];
							store.load({
								callback : function(records, operation, success) {
									if (records !== null && records.length > 0) {
										me.loadRol(windowInsurance, records[0], 'EmployerV1');
									} else {
										me.__newEmployer(windowInsurance, playerPartyPar);
									}
								}
							});
						} else {
							me.__newEmptyEmployer(windowInsurance, rut, typeParty);
						}
					}
					window.close();
            }        	
        });
		} else {
		}
    },
    
    initCustomer: function(btn){
		var me = this;
		var window = btn.up('window');
		var radio1 = Ext.getCmp('radio_persona');
		var rut = window.down('textfield[name="rut"]').value;
		if (rut != null && rut != '') {			
			
			var typeParty = null;
			var storeName = null;
			if (Ext.getCmp('radio_persona').value) {
				typeParty = 'Person';
				storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1';
			} else if (Ext.getCmp('radio_empresa').value) {
				typeParty = 'Company';
				storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';
			} else {
				typeParty = 'GovernmentBody';
				storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1';
			}
			
			window.close ();
			
			var storeParty = me.createStoreParty(storeName, typeParty, rut);
			me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1');

			storeParty.load({
				callback : function(records, operation, success) {
					var controller = AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1');
					var windowInsurance = null;
					if (typeParty === 'Person') {
						windowInsurance = Ext.widget('customerv1principalwindow_ext');
			            windowInsurance.setTitle('Cliente - Persona');
					} else if (typeParty === 'Company') {
						windowInsurance = Ext.widget('customerv2principalwindow_ext');
			            windowInsurance.setTitle('Cliente - Empresa');
			            windowInsurance.down ('statuscompany').down('fieldset').setTitle ('Estado de la Empresa');
			            windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos de la Empresa');
					} else {
						windowInsurance = Ext.widget('customerv3principalwindow_ext');
		                windowInsurance.setTitle('Cliente - Organismo de Gobierno');
		                windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos del Organismo de Gobierno');
		                windowInsurance.down('textfield[name="organizationNamefullName"]').setFieldLabel('Nombre del Organismo de Gobierno');
		                windowInsurance.down('textfield[name="organizationNamefullName"]').emptyText='Ingrese Nombre del Organismo de Gobierno';
					}
					if (success) {
						if (records !== null && records.length > 0) {
							var store = me._createStoreInsurance('Customer', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1', records[0].get('partyIdentifierPar'));
							var playerPartyPar = records[0];
							store.load({
								callback : function(records, operation, success) {
									if (records !== null && records.length > 0) {
										me.loadRol(windowInsurance, records[0], 'CustomerV1');
									} else {
										me.__newCustomer(windowInsurance, playerPartyPar);
									}
								}
							});
						} else {
							me.__newEmptyCustomer(windowInsurance, rut, typeParty);
						}
					}
					window.close();
				}
			});
		} else {
		}
    },
    
    initInspector: function (btn) {
		var me = this;		
		var window=	btn.up('window');
		var radio1 = Ext.getCmp('radio_persona');
 		var rut=window.down('textfield[name="rut"]').value;
 		if(rut!=null && rut!=''){
 			
 		   var typeParty=null;
 		   var storeName=null;
 		   if (Ext.getCmp('radio_persona').value){
	 		   typeParty = 'Person';
	 		   storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1';
 		   } else {
	 		   typeParty = 'Company';
	 		   storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';	
 		   } 	
 		   
		   window.close ();
		   
 	       var storeParty = me.createStoreParty (storeName, typeParty, rut);			
		   me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1');
           
           storeParty.load({
           	callback: function(records, operation, success) {
           		   var controller = AFW_FND_Xjs.getApplication ().getController ('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1');
           		   var windowInsurance = null;
           		   if (typeParty === 'Person') {
           		   	windowInsurance = Ext.widget('inspectorv1principalwindow_ext');
           		   } else {
           		   	windowInsurance = Ext.widget('inspectorv2principalwindow_ext');
           		   }
           		   if (success) {
					   if (records !== null && records.length>0) {   	
							windowInsurance.setTitle('Nuevo Inspector de Riesgo');
							var store = me._createStoreInsurance ('Inspector', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1', records[0].get ('partyIdentifierPar'));
							var playerPartyPar = records[0];
							store.load ({
									callback: function(records, operation, success) {
										if (records !== null && records.length>0) { 
											windowInsurance.setTitle('Inspector de Riesgo Nº ' + records[0].get('roleIdentifierRol'));
											me._loadData (windowInsurance, records[0], 'InspectorV1');
										} else {
											me.__newInspector (windowInsurance, playerPartyPar);
										}
									}
							});
				        } else {
				       	 	me._newEmptyObject (windowInsurance, rut, 'InspectorV1', typeParty)
				        }           		   		
					}
					window.close ();
                }
           	}); 
 		} else {
 		}
	},
    
	initReinsuranceCompany: function(btn) {
		var me = this;
		var window=	btn.up('window');
 		//var fieldContainer=window.down('fieldcontainer');
 		var rut=window.down('textfield[name="rut"]').value;
 		if(rut!=null && rut!=''){
			window.close ();
			//if(!me.validarRut(btn,rut)){
			//	return null;
			//}
			var store = Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1');
			var filtro = filterCreation('Company');
		   	var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	                nombreCampo: 'keyImo',
	                valor: rut,
	                operacion: '=',
	                tipoValor: 'string'
	        	});
	        filtro.push(keyImo.data);
	        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
			store.load({
				callback: function(records, operation, success) {
					if (success) {
						me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1');
						var window = Ext.widget('reinsurancecompanyv1principalwindow_ext');
						if (records !== null && records.length>0) {
								window.setTitle('Nueva Compañía de Reaseguros');
				               	var store = me._createStoreInsurance ('ReinsuranceCompany', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1', records[0].get ('partyIdentifierPar'));
					 		    var playerPartyPar = records[0];
				            	store.load ({
				            		 	callback: function(records, operation, success) {
					            		 	if (records !== null && records.length>0) {
												window.setTitle('Compañía de Reaseguros Nº ' + records[0].get('roleIdentifierRol'));
					            		 		me._loadData (window, records[0], 'ReinsuranceCompanyV1');
								            } else {
										me.__newReinsuranceCompany(window, playerPartyPar);
								            }
				            		 	}
				            	});
							me.__newReinsuranceCompany(window, records[0]);
						} else {
							me.__newEmptyReinsuranceCompany(window, rut);
						}
					}
				}
			});		
		}
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
	
	
	initReinsuranceBrokerage: function (btn) {
		var me = this;	
		var window=	btn.up('window');
		var radio1 = Ext.getCmp('radio_persona');
 		   console.log(radio1);
 		//var fieldContainer=window.down('fieldcontainer');
 		var rut=window.down('textfield[name="rut"]').value;
 		if(rut!=null && rut!=''){
	 		typeParty = 'Company';
			storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';	
 		   
 	       var storeParty = me.createStoreParty (storeName, typeParty, rut);			
		   me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1');
           
           storeParty.load({
           	callback: function(records, operation, success) {
           		   var controller = AFW_FND_Xjs.getApplication ().getController ('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1');
           		   var windowInsurance = Ext.widget('reinsurancebrokeragev1principalwindow');
           		   
           		   if (success) {
					   if (records !== null && records.length>0) {   	
								windowInsurance.setTitle('Nuevo Corredor de Reaseguros');
				               	var store = me._createStoreInsurance ('ReinsuranceBrokerage', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1', records[0].get ('partyIdentifierPar'));
					 		    var playerPartyPar = records[0];
				            	store.load ({
				            		 	callback: function(records, operation, success) {
					            		 	if (records !== null && records.length>0) { 
												windowInsurance.setTitle('Corredor de Seguros Nº ' + records[0].get('roleIdentifierRol'));
					            		 		me._loadData (windowInsurance, records[0], 'ReinsuranceBrokerageV1');
								            } else {
								            	me.__newReinsuranceBrokerage (windowInsurance, playerPartyPar);
								            }
				            		 	}
				            	});
				        } else {
							me._newEmptyObject (windowInsurance, rut, 'ReinsuranceBrokerageV1', typeParty);       
				        }           		   		
					}
					window.close ();
                }
           	}); 
 		} 		
	},
	
	initInsuranceBrokerage: function (btn) {
		var me = this;		
		/*********************************************************/		
		/*
		var task = new Object ();
		task.me = this;
		task.tasks = [];
		task.doIt = 0;
		var tasks = new Object ();
		tasks['function'] = 'loadObjectFromStore';
		tasks.param = new Object ();
		tasks.param.storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';
		tasks.points = [];
		var point = new Object ();
		point.name = 'loadObjectFromStore_load_records';
		point.task = new Object ();
		point.task['function'] = 'loadWindow';
		//point.task.doIt = 0;
		point.task.tasks = [];
		point.task.param = new Object ();
		point.task.param.windowName = 'insurancebrokeragev2principalwindow_ext'
		
		tasks.points.push (point);
		task.tasks.push (tasks);
		this.doIt (task);
		*/
		/*********************************************************/
		var window=	btn.up('window');
		var radio1 = Ext.getCmp('radio_persona');
 		   console.log(radio1);
 		//var fieldContainer=window.down('fieldcontainer');
 		var rut=window.down('textfield[name="rut"]').value;
 		if(rut!=null && rut!=''){
 			/*buscar si existe*/
 			// preguntar que radio estÃ¡ seleccionadoy obtener valor para typeParty
 		   var typeParty=null;
 		   var storeName=null;
 		   if (Ext.getCmp('radio_persona').value){
	 		   typeParty = 'Person';
	 		   storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1';
 		   } else {
	 		   typeParty = 'Company';
	 		   storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1';	
 		   } 	
 		   
 	       var storeParty = me.createStoreParty (storeName, typeParty, rut);			
		   me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1');
           
           storeParty.load({
           	callback: function(records, operation, success) {
           		   var controller = AFW_FND_Xjs.getApplication ().getController ('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1');
           		   var windowInsurance = null;
           		   if (typeParty === 'Person') {
           		   	windowInsurance = Ext.widget('insurancebrokeragev1principalwindow_ext');
           		   } else {
           		   	windowInsurance = Ext.widget('insurancebrokeragev2principalwindow_ext');
           		   }
           		   if (success) {
					   if (records !== null && records.length>0) {   	
								windowInsurance.setTitle('Nuevo Corredor de Seguros');
				               	var store = me._createStoreInsurance ('InsuranceBrokerage', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1', records[0].get ('partyIdentifierPar'));
					 		    var playerPartyPar = records[0];
				            	store.load ({
				            		 	callback: function(records, operation, success) {
					            		 	if (records !== null && records.length>0) { 
												windowInsurance.setTitle('Corredor de Seguros Nº ' + records[0].get('roleIdentifierRol'));
					            		 		me._loadData (windowInsurance, records[0], 'InsuranceBrokerageV1');
								            } else {
								            	me.__newInsuranceBrokerage (windowInsurance, playerPartyPar);
								            }
				            		 	}
				            	});
				        } else {
							me._newEmptyObject (windowInsurance, rut, 'InsuranceBrokerageV1', typeParty);       
				        }           		   		
					}
					window.close ();
                }
           	}); 
 		} 
	},
	
	_showEditObject: function (btn, type) {
		var widgetName = null;
		btn.setDisabled(true);
		if (type === 'InsuranceCompanyV1') {
			widgetName = 'insurancecompanyv1principalwindow_ext';
		} else if (type === 'ReinsuranceCompanyV1') {
			widgetName = 'reinsurancecompanyv1principalwindow_ext';
		} else if (type === 'InsuranceBrokerageV1') {
			widgetName = 'insurancebrokeragev1principalwindow_ext';
		} else if (type === 'InsuranceBrokerageV2') {
			type = 'InsuranceBrokerageV1';
			widgetName = 'insurancebrokeragev2principalwindow_ext';
		} else if (type === 'ReinsuranceBrokerageV1') {
			widgetName = 'reinsurancebrokeragev1principalwindow';
		} else if (type === 'InspectorV1') {
			widgetName = 'inspectorv1principalwindow_ext';
		} else if (type === 'InspectorV2') {
			type = 'InspectorV1';
			widgetName = 'inspectorv2principalwindow_ext';			
		} else if (type === 'CustomerV1') {
			type = 'CustomerV1';
			widgetName = 'customerv1principalwindow_ext';
		} else if (type === 'CustomerV2') {
			type = 'CustomerV1';
			widgetName = 'customerv2principalwindow_ext';
		} else if (type === 'CustomerV3') {
			type = 'CustomerV1';
			widgetName = 'customerv3principalwindow_ext';
		}
		
		var seleccion = btn.up('grid').getSelectionModel().getSelection();
		if (seleccion.length > 0) {
		var window = Ext.widget(widgetName);
			this._loadData (window, seleccion[0], type);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
	},
	
	editCustomer: function (btn) {
		var seleccion = btn.up('grid').getSelectionModel().getSelection();
		if (seleccion.length > 0) {
			if (seleccion[0].get ('playerPartyPar').typeNameImo === 'Person') {
				this._showEditObject (btn, 'CustomerV1');
			} else if (seleccion[0].get ('playerPartyPar').typeNameImo === 'Company') {
				this._showEditObject (btn, 'CustomerV2');
			} else {
				this._showEditObject (btn, 'CustomerV3');
			}
		} else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }	 
	}, 
	
	editInsuranceBrokerage: function (btn) {
		var seleccion = btn.up('grid').getSelectionModel().getSelection();
		if (seleccion.length > 0) {
			if (seleccion[0].get ('playerPartyPar').typeNameImo === 'Person') {
				this._showEditObject (btn, 'InsuranceBrokerageV1');
			} else {
				this._showEditObject (btn, 'InsuranceBrokerageV2');
			}
		} else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }	 
	}, 
	
	editInspector: function (btn) {
		var seleccion = btn.up('grid').getSelectionModel().getSelection();
		if (seleccion.length > 0) {
			if (seleccion[0].get ('playerPartyPar').typeNameImo === 'Person') {
				this._showEditObject (btn, 'InspectorV1');
			} else {
				this._showEditObject (btn, 'InspectorV2');
			}
		} else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }	 
	},
	
	editReinsuranceBrokerage: function (btn) {
		this._showEditObject (btn, 'ReinsuranceBrokerageV1');
	},
	
	editInsuranceCompany: function (btn) {
        this._showEditObject (btn, 'InsuranceCompanyV1');
    },
	
	editReinsuranceCompany: function (btn) {
        this._showEditObject (btn, 'ReinsuranceCompanyV1');
    },
	
	
	initInsuranceCompany: function(btn){
		var me = this;
		//me.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
		//me.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
		//me.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
		//me.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1');
		
		var window=	btn.up('window');
 		//var fieldContainer=window.down('fieldcontainer');
 		var rut=window.down('textfield[name="rut"]').value;
 		if(rut!=null && rut!=''){
			window.close ();
		   //if (!me.validarRut(btn,rut)) {
			//	return null;		   	
		   //}
		   	
			var store = Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1');
			var filtro = filterCreation('Company');
		   	var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	                nombreCampo: 'keyImo',
	                valor: rut,
	                operacion: '=',
	                tipoValor: 'string'
	        	});
	        filtro.push(keyImo.data);
	        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
			store.load({
				callback: function(records, operation, success) {
					if (success) {
						me.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1');
						var window = Ext.widget('insurancecompanyv1principalwindow_ext');
						window.down ('statuscompany').down('fieldset').setTitle ('Estado de la Empresa');
			            window.down ('datacompany').down('fieldset').setTitle ('Datos de la Empresa');
						if (records !== null && records.length>0) {
							//window.setTitle('Corredor de Seguros NÂº ' + records[0].get('roleIdentifierRol'));
				               	var store = me._createStoreInsurance ('InsuranceCompany', 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1', records[0].get ('partyIdentifierPar'));
					 		    var playerPartyPar = records[0];
				            	store.load ({
				            		 	callback: function(records, operation, success) {
					            		 	if (records !== null && records.length>0) { 
					            		 		me._loadData (window, records[0], 'InsuranceCompanyV1');
								            } else {
								            	me.__newInsuranceCompany (window, playerPartyPar);
								            }
				            		 	}
				            	});
							me.__newInsuranceCompany(window, records[0]);
						} else {
							me.__newEmptyInsuranceCompany (window, rut);
						}
					}
				}
			});				
		}
		
	},

	_newEmptyObject: function (window, rut, object, type) {
		if (object === 'InsuranceBrokerageV1') {
			this.__newEmptyInsuranceBrokerage (window, rut, type);
		} else if (object === 'InspectorV1') {
			this.__newEmptyInspector (window, rut, type);
		} if (object === 'ReinsuranceBrokerageV1') {
			this.__newEmptyReinsuranceBrokerage (window, rut, type);
		}
	},
		
	__newEmptyReinsuranceBrokerage: function (window, rut, type) {
		var playerPartyPar = this.___createParty (rut, type);                	
        this.__newReinsuranceBrokerage (window, playerPartyPar);       		
	},
	
	_loadData: function(window, record, type) {
		window.down('form').getForm().loadRecord(record);
		this._loadWindowData (window, record, type);
		window.show();
	},
	
	_loadWindowData: function (window, record, type) {
		this._loadPartyData (window, record);
		if (type === 'ReinsuranceBrokerageV1' || type === 'ReinsuranceCompanyV1')
			this._loadReinsuranceCompanyData (window, record);
		else
			this._loadInsuranceCompanyData (window, record);
		
		if (type === 'CustomerV1') 
			this._loadClientData(window, record);
	},

	__newEmptyInsuranceBrokerage: function (window, rut, type) {
		var playerPartyPar = this.___createParty (rut, type);                	
        this.__newInsuranceBrokerage (window, playerPartyPar);       		
	},
	
	__newEmptyInspector: function (window, rut, type) {
		var playerPartyPar = this.___createParty (rut, type);                	
		this.__newInspector (window, playerPartyPar);
	},

	__newReinsuranceBrokerage: function (window, playerPartyPar) {
		var insuranceBrokerageV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1', {});
		insuranceBrokerageV1.set ({
		  'playerPartyPar': playerPartyPar.data
	    });
	    this._loadData (window, insuranceBrokerageV1, 'ReinsuranceBrokerageV1');
	},
	
	__newInsuranceBrokerage: function (window, playerPartyPar) {
		var insuranceBrokerageV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1', {});
		insuranceBrokerageV1.set ({
		  'playerPartyPar': playerPartyPar.data
	    });
	    this._loadData (window, insuranceBrokerageV1, 'InsuranceBrokerageV1');
	},

	__newInspector: function (window, playerPartyPar) {
		var inspectorV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1', {});
		inspectorV1.set ({
		  'playerPartyPar': playerPartyPar.data
	    });
	    this._loadData (window, inspectorV1, 'InspectorV1');
	},
	
	__newEmptyInsuranceCompany: function (window, rut) {
		var playerPartyPar = this.___createParty (rut, 'Company');
		this.__newInsuranceCompany (window, playerPartyPar);	
	},
	
	__newInsuranceCompany: function (window, playerPartyPar) {
		var insuranceCompanyV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1', {});
		insuranceCompanyV1.set ({
		  'playerPartyPar': playerPartyPar.data
	    });
	    this._loadData (window, insuranceCompanyV1, 'InsuranceCompanyV1');
	},

	__newEmptyReinsuranceCompany : function(window, rut) {
		var playerPartyPar = this.___createParty(rut, 'Company');
		this.__newReinsuranceCompany(window, playerPartyPar);
	},

	__newReinsuranceCompany : function(window, playerPartyPar) {
		var reinsuranceCompanyV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1', {});
		reinsuranceCompanyV1.set({
			'playerPartyPar' : playerPartyPar.data
		});
		this._loadData (window, reinsuranceCompanyV1, 'ReinsuranceCompanyV1');
	},
	
	createReinsuranceBrokerage: function (btn) {
		btn.setDisabled(true);
		var me = this;
        var form = btn.up('window').down('form').getForm();
        var namePar = null;
        var ownedCapabilityPar = null;
        var playerPartyPar = null;
        var preferredContactPreferencePar = [];
        var preferredContactPar = [];
        var window=btn.up('window');
        
        if(form.isValid()){            
            var objeto = form.getValues(false, false, false);
            var insuranceBrokerageV1 =  form.getRecord();
            if (insuranceBrokerageV1 !== undefined 
                && insuranceBrokerageV1 !== null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==undefined 
                && new String(insuranceBrokerageV1.get('roleIdentifierRol')).indexOf('ReinsuranceBrokerageV1') === -1){
                    btn.setDisabled(false);
                    me.updateInsuranceBrokerage (btn);
       		} else {
				insuranceBrokerageV1.set (objeto);	        
				var playerPartyPar = insuranceBrokerageV1.get ('playerPartyPar');
				
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar, objeto);
				
				insuranceBrokerageV1.set({
					creationUserImo: usuario.get('userName'),
					ownedCapabilityPar: null,
					playerPartyPar: playerPartyPar,
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				
				var insuranceBrokerageV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1Validation', {});
				var validations = insuranceBrokerageV1Validation.createValidations (insuranceBrokerageV1);
				var errors = null;
				if (validations !== null || validations.length>0) {
					var utilValidation = this.application.getUtilValidation();
					if(validations[0]!==undefined){
						errors =  utilValidation.validation(validations);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}
				
				btn.up('window').mask("Guardando", "x-mask-loading");
				insuranceBrokerageV1.save ({
					callback: function (record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceBrokerageV1').reload();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana (5, "Error de conexión");
							}
						}
					},
					success: function(rec,st){
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure: function(rec,st,a,b,c){
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});      				
       		}
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
	
	},
	
	createObject: function (btn, type) {
		var validationName = null;
		var storeName = null;
		if (type === 'InsuranceBrokerageV1') {
			validationName = 'AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1Validation';
			storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1';
		} else if (type === 'InspectorV1') {
			validationName = 'AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1Validation';
			storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1';
		} 
				
		btn.setDisabled(true);
		var me = this;
        var form = btn.up('window').down('form').getForm();
        var namePar = null;
        var ownedCapabilityPar = null;
        var playerPartyPar = null;
        var preferredContactPreferencePar = [];
        var preferredContactPar = [];
        var window=btn.up('window');
        
        if(form.isValid()){            
            var objeto = form.getValues(false, false, false);
            var insuranceBrokerageV1 =  form.getRecord();
            if (insuranceBrokerageV1 !== undefined 
                && insuranceBrokerageV1 !== null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==undefined 
                && new String(insuranceBrokerageV1.get('roleIdentifierRol')).indexOf(type) === -1){
                    btn.setDisabled(false);
                    me._updateObject (btn);
       		} else {
				insuranceBrokerageV1.set (objeto);	        
				var playerPartyPar = insuranceBrokerageV1.get ('playerPartyPar');
				
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar, objeto);
				
				insuranceBrokerageV1.set({
					creationUserImo: usuario.get('userName'),
					ownedCapabilityPar: null,
					playerPartyPar: playerPartyPar,
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				
				var insuranceBrokerageV1Validation = Ext.create(validationName, {});
				var validations = insuranceBrokerageV1Validation.createValidations (insuranceBrokerageV1);
				var errors = null;
				if (validations !== null || validations.length>0) {
					var utilValidation = this.application.getUtilValidation();
					if(validations[0]!==undefined){
						errors =  utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}
				
				btn.up('window').mask("Guardando", "x-mask-loading");
				insuranceBrokerageV1.save ({
					callback: function (record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								Ext.getStore (storeName).reload();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana (5, "Error de conexión");
							}
						}
					},
					success: function(rec,st){
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure: function(rec,st,a,b,c){
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});      				
       		}
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
	},
	
	createInspector: function (btn) {
		this.createObject (btn, 'InspectorV1');
	},
	
	createInsuranceBrokerage: function (btn) {
		btn.setDisabled(true);
		var me = this;
        var form = btn.up('window').down('form').getForm();
        var namePar = null;
        var ownedCapabilityPar = null;
        var playerPartyPar = null;
        var preferredContactPreferencePar = [];
        var preferredContactPar = [];
        var window=btn.up('window');
        
        if(form.isValid()){            
            var objeto = form.getValues(false, false, false);
            var insuranceBrokerageV1 =  form.getRecord();
            if (insuranceBrokerageV1 !== undefined 
                && insuranceBrokerageV1 !== null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==null 
                && insuranceBrokerageV1 .get('roleIdentifierRol')!==undefined 
                && new String(insuranceBrokerageV1.get('roleIdentifierRol')).indexOf('InsuranceBrokerageV1') === -1){
                    btn.setDisabled(false);
                    me.updateInsuranceBrokerage (btn);
       		} else {
				insuranceBrokerageV1.set (objeto);	        
				var playerPartyPar = insuranceBrokerageV1.get ('playerPartyPar');
				
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar, objeto);
				
				insuranceBrokerageV1.set({
					creationUserImo: usuario.get('userName'),
					ownedCapabilityPar: null,
					playerPartyPar: playerPartyPar,
					updateUserImo: usuario.get('userName'),
					updateDateTimeImo: new Date()
				});
				
				var insuranceBrokerageV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1Validation', {});
				var validations = insuranceBrokerageV1Validation.createValidations (insuranceBrokerageV1);
				var errors = null;
				if (validations !== null || validations.length>0) {
					var utilValidation = this.application.getUtilValidation();
					if(validations[0]!==undefined){
						errors =  utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}
				
				btn.up('window').mask("Guardando", "x-mask-loading");
				insuranceBrokerageV1.save ({
					callback: function (record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1').reload();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana (5, "Error de conexiÃ³n");
							}
						}
					},
					success: function(rec,st){
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure: function(rec,st,a,b,c){
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});      				
       		}
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
        
	},	
	
	_updateObject: function (btn) {
		btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var window=btn.up('window');
        var namePar = null;
        var objeto = form.getValues(false, false, false);
        var obj = form.getRecord();
        obj.set (objeto);
        
        var playerPartyPar = obj.get ('playerPartyPar');
        if (playerPartyPar.preferredContactPar === null) {
        	playerPartyPar.preferredContactPar = [];
        }
		this.setDataPartyName (form, playerPartyPar);	    	
    	this.setDataParty (objeto, playerPartyPar);
		this.setDataContactPreference (window, playerPartyPar, objeto);
    	
    	obj.set({
        	ownedCapabilityPar: null,
        	playerPartyPar: playerPartyPar,
        	preferredContactPreferencePar: null,
        	updateUserImo: usuario.get('userName'),
        	updateDateTimeImo: new Date()
   	    });

		var objValidation = null;	
		var storeName = null;
		if (obj.get ('typeNameImo') === 'Inspector') {
			objValidation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1Validation', {});	
			storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InspectorV1';
		} else if (obj.get ('typeNameImo') === 'InsuranceBrokerage') {
			objValidation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1Validation', {});	
			storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1';
		}
        
        var validations = objValidation.createValidations (obj);
        var errors = null;
        if (validations !== null || validations.length>0) {
            var utilValidation = this.application.getUtilValidation();
            if(validations[0]!==undefined){
                errors =  utilValidation.validation(validations[0].data);
            }
        }
        if (errors !== null && errors !== undefined) {
            crearVentana(5, errors);
            btn.setDisabled(false);
            return null;
        }
        btn.up('window').mask("Guardando", "x-mask-loading");
        obj.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
						Ext.getStore (storeName).reload();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                    btn.setDisabled(false);
                } else {
                    if (operation.error) {
                        crearVentana (operation.error.status, "Error de conexión");
                    }
                }
            },
            success: function(rec,st){
                btn.setDisabled(false);
                btn.up('window').unmask();
            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
                btn.up('window').unmask();
            }
        });
	},
	
	updateInsuranceBrokerage: function (btn) {
		btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var window=btn.up('window');
        var namePar = null;
        var objeto = form.getValues(false, false, false);
        var insuranceBrokerageV1 = form.getRecord();
        insuranceBrokerageV1.set (objeto);
        
        var playerPartyPar = insuranceBrokerageV1.get ('playerPartyPar');
        if (playerPartyPar.preferredContactPar === null) {
        	playerPartyPar.preferredContactPar = [];
        }
		this.setDataPartyName (form, playerPartyPar);	    	
    	this.setDataParty (objeto, playerPartyPar);
		this.setDataContactPreference (window, playerPartyPar, objeto);
    	
    	insuranceBrokerageV1.set({
        	ownedCapabilityPar: null,
        	playerPartyPar: playerPartyPar,
        	preferredContactPreferencePar: null,
        	updateUserImo: usuario.get('userName'),
        	updateDateTimeImo: new Date()
   	    });
		
        var insuranceBrokerageV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1Validation', {});
        var validations = insuranceBrokerageV1Validation.createValidations (insuranceBrokerageV1);
        var errors = null;
        if (validations !== null || validations.length>0) {
            var utilValidation = this.application.getUtilValidation();
            if(validations[0]!==undefined){
                errors =  utilValidation.validation(validations[0].data);
            }
        }
        if (errors !== null && errors !== undefined) {
            crearVentana(5, errors);
            btn.setDisabled(false);
            return null;
        }
        btn.up('window').mask("Guardando", "x-mask-loading");
        insuranceBrokerageV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        //btn.up('window').close();
						Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1').reload();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                    btn.setDisabled(false);
                } else {
                    if (operation.error) {
                        crearVentana (operation.error.status, "Error de conexión");
                    }
                }
            },
            success: function(rec,st){
                btn.setDisabled(false);
                btn.up('window').unmask();
            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
                btn.up('window').unmask();
            }
        });
	},

	updateInsuranceCompany: function (btn) {
		btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var window=btn.up('window');
		var namePar = null;
		var objeto = form.getValues(false, false, false);
		var insuranceCompanyV1 = form.getRecord();
		insuranceCompanyV1.set (objeto);
		
		var playerPartyPar = insuranceCompanyV1.get ('playerPartyPar');
		
		if (playerPartyPar.preferredContactPar === null) {
			playerPartyPar.preferredContactPar = [];
		}
		this.setDataPartyName (form, playerPartyPar);	    	
		this.setDataParty (objeto, playerPartyPar);
		this.setDataContactPreference (window, playerPartyPar, objeto);
	
		insuranceCompanyV1.set({
			ownedCapabilityPar: null,
			playerPartyPar: playerPartyPar,
			preferredContactPreferencePar: null,
			updateUserImo: usuario.get('userName'),
			updateDateTimeImo: new Date()
		});
		
		var insuranceCompanyV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1Validation', {});
		var validations = insuranceCompanyV1Validation.createValidations (insuranceCompanyV1);
		var errors = null;
		if (validations !== null || validations.length>0) {
			var utilValidation = this.application.getUtilValidation();
			if(validations[0]!==undefined){
				errors =  utilValidation.validation(validations[0].data);
			}
		}
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return null;
		}
		btn.up('window').mask("Guardando", "x-mask-loading");
		
		insuranceCompanyV1.save ({
			callback: function (record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1').reload();
						crearVentana(respuesta.codigo, respuesta.mensaje);
					} else {
						crearVentana(respuesta.codigo, respuesta.mensaje);
					}
					btn.setDisabled(false);
				} else {
					if (operation.error) {
						crearVentana (operation.error.status, "Error de conexiÃ³n");
					}
				}
			},
			success: function(rec,st){
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure: function(rec,st,a,b,c){
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});		
	},
			
	createInsuranceCompany: function (btn) {
		btn.setDisabled(true);
		var me = this;
        var form = btn.up('window').down('form').getForm();
        var namePar = null;
        var ownedCapabilityPar = null;
        var playerPartyPar = null;
        var preferredContactPreferencePar = [];
        var preferredContactPar = [];
        var window=btn.up('window');
        
        if(form.isValid()){            
            var objeto = form.getValues(false, false, false);
            var insuranceCompanyV1 =  form.getRecord();
            if (insuranceCompanyV1 !== undefined 
                && insuranceCompanyV1 !== null 
                && insuranceCompanyV1 .get('roleIdentifierRol')!==null 
                && insuranceCompanyV1 .get('roleIdentifierRol')!==undefined 
                && new String(insuranceCompanyV1.get('roleIdentifierRol')).indexOf('InsuranceCompanyV1') === -1){
                    btn.setDisabled(false);
                    me.updateInsuranceCompany(btn);
       		} else {
		       		insuranceCompanyV1.set (objeto);	        
					var playerPartyPar = insuranceCompanyV1.get ('playerPartyPar');
					
					if (playerPartyPar.preferredContactPar === null) {
						playerPartyPar.preferredContactPar = [];
					}
					this.setDataPartyName (form, playerPartyPar);	    	
					this.setDataParty (objeto, playerPartyPar);
					this.setDataContactPreference (window, playerPartyPar, objeto);
					
	        		insuranceCompanyV1.set({
	        			creationUserImo: usuario.get('userName'),
	           	 		//namePar: namePar.data,
	            		ownedCapabilityPar: null,
	            		playerPartyPar: playerPartyPar,
	            		updateUserImo: usuario.get('userName'),
	            		updateDateTimeImo: new Date()
       	    		});
       				
       				var insuranceCompanyV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1Validation', {});
	                var validations = insuranceCompanyV1Validation.createValidations (insuranceCompanyV1);
	                var errors = null;
	                if (validations !== null || validations.length>0) {
	                    var utilValidation = this.application.getUtilValidation();
	                    if(validations[0]!==undefined){
	                        errors =  utilValidation.validation(validations[0].data);
	                    }
	                }
	                if (errors !== null && errors !== undefined) {
	                    crearVentana(5, errors);
	                    btn.setDisabled(false);
	                    return null;
	                }
	                
	       			btn.up('window').mask("Guardando", "x-mask-loading");
	                insuranceCompanyV1.save ({
	                    callback: function (record, operation) {
	                        if (operation.success === true) {
	                            var respuesta = Ext.decode(operation._response.responseText);
	                            if (respuesta.valido === true) {
	                                //btn.up('window').close();
	                                Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceCompanyV1').reload();
									crearVentana(respuesta.codigo, respuesta.mensaje);
	                            } else {
	                                crearVentana(respuesta.codigo, respuesta.mensaje);
	                            }
	                        } else {
	                            if (operation.error) {
	                                crearVentana (5, "Error de conexión");
	                            }
	                        }
	                    },
	                    success: function(rec,st){
	                        btn.setDisabled(false);
	                        btn.up('window').unmask();
	                    },
	                    failure: function(rec,st,a,b,c){
	                        btn.setDisabled(false);
	                        btn.up('window').unmask();
	                    }
	                });      				
       			}
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
        
	},
	
	updateReinsuranceCompany: function (btn) {
		btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var window=btn.up('window');
		var namePar = null;
		var objeto = form.getValues(false, false, false);
		var insuranceCompanyV1 = form.getRecord();
		insuranceCompanyV1.set (objeto);
		
		var playerPartyPar = insuranceCompanyV1.get ('playerPartyPar');
		
		if (playerPartyPar.preferredContactPar === null) {
			playerPartyPar.preferredContactPar = [];
		}
		this.setDataPartyName (form, playerPartyPar);	    	
		this.setDataParty (objeto, playerPartyPar);
		this.setDataContactPreference (window, playerPartyPar, objeto);	   
			
		insuranceCompanyV1.set({
			ownedCapabilityPar: null,
			playerPartyPar: playerPartyPar,
			preferredContactPreferencePar: null,
			updateUserImo: usuario.get('userName'),
			updateDateTimeImo: new Date()
		});
		
		var insuranceCompanyV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1Validation', {});
		var validations = insuranceCompanyV1Validation.createValidations (insuranceCompanyV1);
		var errors = null;
		if (validations !== null || validations.length>0) {
			var utilValidation = this.application.getUtilValidation();
			if(validations[0]!==undefined){
				errors =  utilValidation.validation(validations[0].data);
			}
		}
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return null;
		}
		btn.up('window').mask("Guardando", "x-mask-loading");
		
		insuranceCompanyV1.save ({
			callback: function (record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1').reload();
						crearVentana(respuesta.codigo, respuesta.mensaje);
					} else {
						crearVentana(respuesta.codigo, respuesta.mensaje);
					}
					btn.setDisabled(false);
				} else {
					if (operation.error) {
						crearVentana (operation.error.status, "Error de conexiÃ³n");
					}
				}
			},
			success: function(rec,st){
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure: function(rec,st,a,b,c){
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});		
	},
	
	createReinsuranceCompany : function(btn) {
		btn.setDisabled(true);
		var me = this;
		var form = btn.up('window').down('form').getForm();
		var namePar = null;
		var ownedCapabilityPar = null;
		var playerPartyPar = null;
		var preferredContactPreferencePar = [];
		var preferredContactPar = [];
		var window = btn.up('window');

		if (form.isValid()) {
			var objeto = form.getValues(false, false, false);
			var reinsuranceCompanyV1 = form.getRecord();
			if (reinsuranceCompanyV1 !== undefined && reinsuranceCompanyV1 !== null && reinsuranceCompanyV1.get('roleIdentifierRol') !== null && reinsuranceCompanyV1.get('roleIdentifierRol') !== undefined && new String(reinsuranceCompanyV1.get('roleIdentifierRol')).indexOf('ReinsuranceCompanyV1') === -1) {
				btn.setDisabled(false);
				me.updateReinsuranceCompany(btn);
			} else {
				reinsuranceCompanyV1.set(objeto);
				var playerPartyPar = reinsuranceCompanyV1.get('playerPartyPar');
					
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar, objeto);

				reinsuranceCompanyV1.set({
					creationUserImo : usuario.get('userName'),
					//namePar: namePar.data,
					ownedCapabilityPar : null,
					playerPartyPar : playerPartyPar,
					updateUserImo : usuario.get('userName'),
					updateDateTimeImo : new Date()
				});

				var reinsuranceCompanyV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1Validation', {});
				var validations = reinsuranceCompanyV1Validation.createValidations(reinsuranceCompanyV1);
				var errors = null;
				if (validations !== null || validations.length > 0) {
					var utilValidation = this.application.getUtilValidation();
					if (validations[0] !== undefined) {
						errors = utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}

				btn.up('window').mask("Guardando", "x-mask-loading");
				reinsuranceCompanyV1.save({
					callback : function(record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.ReinsuranceCompanyV1').reload();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana(5, "Error de conexiÃ³n");
							}
						}
					},
					success : function(rec, st) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure : function(rec, st, a, b, c) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});
			}
		} else {
			invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
			var msg = "Formulario no válido. Complete los campos requeridos:<br />";
			for (var i = 0; i < invalidFields.length; i++) {
				msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
				for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
					msg += invalidFields[i].getErrors()[j] + '. ';
				}
				msg += '<br />';
			}
			crearVentana(5, msg);
			btn.setDisabled(false);
		}

	},

	setDataParty: function (objeto, playerPartyPar) {
		if (playerPartyPar.typeNameImo === 'Person') {
			playerPartyPar.birthDatePer=objeto.birthDate;
			playerPartyPar.genderCodePer=objeto.genderCode;
			playerPartyPar.maritalStatusCodePer=objeto.maritalStatusCode;
			playerPartyPar.ethnicityCodePer=objeto.ethnicityCode;
			playerPartyPar.primaryLanguageExternalCodePer=objeto.primaryLanguageCode;
			playerPartyPar.deathDatePer=objeto.personNameDeathDate;
			playerPartyPar.missingDatePer=objeto.personNameMissingDate;
			playerPartyPar.deathIndicatorPer= objeto.personNameDeathIndicator;
			playerPartyPar.missingIndicatorPer = objeto.personNameMissingIndicator;
		} else if (playerPartyPar.typeNameImo === 'Company') {
			//membercount objeto.memberCount
			playerPartyPar.foundationDateOrg = objeto.foundationDate;
			playerPartyPar.dissolutionDateOrg = objeto.disolutionDate;
			playerPartyPar.memberCountOrg = objeto.memberCount;
		} else if (playerPartyPar.typeNameImo === 'Organization') {
			//membercount objeto.memberCount
			playerPartyPar.foundationDateOrg = objeto.foundationDate;
			playerPartyPar.dissolutionDateOrg = objeto.disolutionDate;
			playerPartyPar.memberCountOrg = objeto.memberCount;
		}
	},
	
	setDataContactPreference: function (window, playerPartyPar, objeto) {
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
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').rawValue, 'Land_Line', objeto);
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}		
		
		if (this.exists (window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]'), 'fullNumberTnu') === -1) {	
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').rawValue, 'Cell', objeto);
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}
		
		 var contactPreference = this._createAddress (window, true);
		 if (contactPreference !== null) {
			for (var i=0; i<playerPartyPar.preferredContactPar.length; i++) {
				if (playerPartyPar.preferredContactPar[i].preferredContactPointCop.typeNameImo === contactPreference.data.preferredContactPointCop.typeNameImo)
					playerPartyPar.preferredContactPar[i].priorityLevelCop = 0;
			}
			playerPartyPar.preferredContactPar.push (contactPreference.data);
		 }
		 
		var contactPreference = this._createAddress (window, false);
		 if (contactPreference !== null) { 
			for (var i=0; i<playerPartyPar.preferredContactPar.length; i++) {
				if (playerPartyPar.preferredContactPar[i].preferredContactPointCop.typeNameImo === contactPreference.data.preferredContactPointCop.typeNameImo)
					playerPartyPar.preferredContactPar[i].priorityLevelCop = 0;
			}
			playerPartyPar.preferredContactPar.push (contactPreference.data);
		 }		 
		
	},
	
	setDataPartyName : function (form, playerPartyPar) {
		if (playerPartyPar.typeNameImo === 'Person') {
				console.log (playerPartyPar.namePer);
				console.log (playerPartyPar.namePer == undefined);
				console.log (playerPartyPar.namePer === undefined); 
	      	if (playerPartyPar.namePer === undefined || playerPartyPar.namePer === null || playerPartyPar.namePer.length === 0) {
	      		playerPartyPar.namePer = [];
	      	          
	    		var namePar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1', {
	                effectivePeriodStartDateTimePan: new Date(),
	                languageExternalCodePan: 'SPA',
	                defaultIndicatorPan: true,	                
	                creationUserImo: usuario.get('userName'),
	                creationDateTimeImo: new Date()
	        	}).data;
	        	playerPartyPar.namePer.push (namePar);
	       } 
	        	
	       playerPartyPar.namePer[0].givenNamePen = form.getValues().personNameGivenName;
	       playerPartyPar.namePer[0].middleNamePen = form.getValues().personNameMiddleName;
	       playerPartyPar.namePer[0].surnamePen = form.getValues().personNameSurname;
	       playerPartyPar.namePer[0].updateUserImo = usuario.get('userName');
	       playerPartyPar.namePer[0].updateDateTimeImo = new Date();
	       
       } else if (playerPartyPar.typeNameImo === 'Company') {        	
    		if (playerPartyPar.nameOrg === undefined || playerPartyPar.nameOrg === null || playerPartyPar.nameOrg.length === 0) {
          		playerPartyPar.nameOrg = this.createPartyName (form, playerPartyPar)
           	} else if (playerPartyPar.nameOrg.length>=1) {		   	
		   		for (var i = 0; i < playerPartyPar.nameOrg.length; ++i) {
					if (playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();
					} else if (playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName2;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();
					}
				}
		   }    
    	}
	},
	
	createPartyName: function (form, playerPartyPar) {
		var partyName = [];
		
		if (playerPartyPar.typeNameImo === 'Person') {
	     	 var namePar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1', {
	            effectivePeriodStartDateTimePan: new Date(),
	            languageExternalCodePan: 'SPA',
	            defaultIndicatorPan: true,	                
	            creationUserImo: usuario.get('userName'),
	            creationDateTimeImo: new Date()
	    	 });
	    	 namePar.set ({
				 givenNamePen: form.getValues().personNameGivenName,
				 middleNamePen: form.getValues().personNameMiddleName,
				 surnamePen: form.getValues().personNameSurname,
				 updateUserImo: usuario.get('userName'),
				 updateDateTimeImo: new Date()	
	   		 });
			partyName.push (namePar.data);
			
		} else if (playerPartyPar.typeNameImo === 'Company') {
	     	 var namePar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1', {
	            effectivePeriodStartDateTimePan: new Date(),
	            languageExternalCodePan: 'SPA',
	            defaultIndicatorPan: true,	                
	            creationUserImo: usuario.get('userName'),
	            creationDateTimeImo: new Date(),
	            usageCodeOrn: 'LegalName'
	    	 });
	    	 namePar.set ({
	   		 	 fullNamePan: form.getValues().organizationNamefullName,
				 updateUserImo: usuario.get('userName'),
		         updateDateTimeImo: new Date()	
	   		 });
			partyName.push (namePar.data);
			
			var namePar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1', {
	            effectivePeriodStartDateTimePan: new Date(),
	            languageExternalCodePan: 'SPA',
	            defaultIndicatorPan: false,	                
	            creationUserImo: usuario.get('userName'),
	            creationDateTimeImo: new Date(),
	            usageCodeOrn: 'CompanyName'
	    	 });
	    	 namePar.set ({
	   		 	 fullNamePan: form.getValues().organizationNamefullName2,
				 updateUserImo: usuario.get('userName'),
		         updateDateTimeImo: new Date()	
	   		 });
			partyName.push (namePar.data);
		}
		
		return partyName;
	},
	
	_createStore: function (storeName, type, filter, value, filterType) {
		var store = Ext.getStore (storeName);
		var filtro = filterCreation(type);
		var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
			nombreCampo: filter,
			valor: value,
			operacion: '=',
			tipoValor: filterType
		});
       	filtro.push(keyImo.data);
       	store.getProxy().setExtraParam('filters', Ext.encode(filtro));
		return store;
	},
	
	_createStoreInsurance: function (type, storeName, idParty) {
		return this._createStore (storeName, type, 'playerPartyPar.partyIdentifierPar', idParty, 'long');
	},
	
	createStoreParty: function (storeName, typeParty, rut) {
		return this._createStore (storeName, typeParty, 'keyImo', rut, 'string');
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
			components = [	  'combo[name="placeNameCountryVisit"]'
							, 'combo[name="placeNameCountrySubdivisionVisit"]'
							, 'combo[name="placeNameMunicipality1Visit"]'
							, 'combo[name="placeNameMunicipality2Visit"]'
							, 'combo[name="streetAdressNameVisit"]'
							, 'streetAdressNumberVisit'
							, 'postalAdressUnitNumberVisit'
							, 'postalAdressBuildingNameVisit'
							, 'postalAdressFloorNumberVisit'
							, '#direccion_visita'
							, 'InPersonContact'
							, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.InPersonContactV1'
							, 'meetingAddressIpc'	
							, 'combo[name="postalCodeAssignedCodeVisit"]'
							
						];	
		} else {
			components = [	  'combo[name="placeNameCountry"]'
							, 'combo[name="placeNameCountrySubdivision"]'
							, 'combo[name="placeNameMunicipality1"]'
							, 'combo[name="placeNameMunicipality2"]'
							, 'combo[name="streetAdressName"]'
							, 'streetAdressNumber'
							, 'postalAdressUnitNumber'
							, 'postalAdressBuildingName'
							, 'postalAdressFloorNumber'
							, '#direccion_postal'
							, 'PostalMailContact'
							, 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.PostalMailContactV1'
							, 'deliveryAddressPmc'	
							, 'combo[name="postalCodeAssignedCode"]'							
						];
		}
		 
		if (window.down (components[9]).data !== null) {
			var selectAddress = window.down (components[9]).data;
			
			var record = window.down('form').getForm().getRecord ();
			if (record.get ('playerPartyPar').preferredContactPar) {
				for (var i=0;i<record.get ('playerPartyPar').preferredContactPar.length;i++) {
					if (record.get ('playerPartyPar').preferredContactPar[i].preferredContactPointCop.typeNameImo === components[10]) {
						if (record.get ('playerPartyPar').preferredContactPar[i].preferredContactPointCop[components[12]]) {
							if (record.get ('playerPartyPar').preferredContactPar[i].preferredContactPointCop[components[12]].addressIdentifierAdd === selectAddress.addressIdentifierAdd) {	
								console.log ('ya se encuentra.......... fijar como por defecto...');
								return null;
							}
						}
					}
				}
			}
			
			console.log ('No lo encontro, crear inpersoncontact');
			//return null;
		}
		
		
		var objeto = window.down('form').getForm().getValues(false, true, false);
		if (window.down (components[0]).value && 
			window.down (components[1]).value &&
			window.down (components[2]).value &&
			window.down (components[3]).value) {	
			var record = window.down('form').getForm().getRecord ();
			var address = selectAddress; //record.get ('playerPartyPar').preferredContactPar[0].preferredContactPointCop[components[12]];
			
			var postalMunicipalityPoa = [];
			var postalCountryPoa = null;
			var postalCountrySubdivisionPoa = null;
			var postalPostCodePoa = null;
			
			if (window.down (components[0]).valueModels === undefined) {
				//if (address.postalCountryPoa.descriptionPla === window.down (components[0]).value) {
					postalCountryPoa = address.postalCountryPoa;
					postalCountrySubdivisionPoa = address.postalCountrySubdivisionPoa;
					postalMunicipalityPoa = address.postalMunicipalityPoa;
					postalPostCodePoa = address.postalPostCodePoa;
				//}
			} else {
				postalCountryPoa = window.down (components[0]).valueModels[0].data;
				postalCountrySubdivisionPoa = window.down (components[1]).valueModels[0].data;
				postalMunicipalityPoa.push (window.down (components[2]).valueModels[0].data);
				postalMunicipalityPoa.push (window.down (components[3]).valueModels[0].data);
				postalPostCodePoa = window.down (components[13]).valueModels[0].data;
			}
			
			var uniformResourceLocation=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',{
				'unstructuredAddressPla': window.down(components[4]).rawValue+'::'+objeto[components[5]],
				//'unstructuredAddressPla': objeto[components[4]]+'::'+objeto[components[5]],
				'includedStreetAddressPoa': null,
				'unitNumberPoa': objeto[components[6]],
				'buildingNamePoa': objeto[components[7]],
				'floorNumberPoa': objeto[components[8]],
				'postalCountryPoa': postalCountryPoa,
				'postalCountrySubdivisionPoa': postalCountrySubdivisionPoa,
				'postalMunicipalityPoa': postalMunicipalityPoa,
				'postalPostCodePoa': postalPostCodePoa,
				'identifiedPlacePla': null, 
				'creationUserImo': usuario.get('userName'),
				'creationDateTimeImo': new Date(),
				'updateUserImo': usuario.get('userName'),
				'updateDateTimeImo': new Date()
				
			});
			
			
			var postalEmailContact=Ext.create(components[11],{
				creationUserImo: usuario.get('userName'),
				creationDateTimeImo: new Date(),
				updateUserImo: usuario.get('userName'),
				updateDateTimeImo: new Date()
			});
			
			postalEmailContact.data[components[12]]=uniformResourceLocation.data;	
		   
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
	
	_createTelephoneContact : function (value, type, objeto) {
		if (value === null || value === '') {
			return null;
		}		
		
		var areaExternalCodeTnu = null;
		
		if (type === 'Land_Line') 
			areaExternalCodeTnu = objeto.areaExternalCodeTnu;
		
		var telephoneNumberFijo=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',{
            	areaExternalCodeTnu: areaExternalCodeTnu,
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

			
	_loadInsuranceCompanyData : function (window, record) {
		 window.down('textarea[name="descriptionRol"]').setValue(record.data.descriptionRol);
		 window.down('datefield[name="rolePlayerPeriodStartDateTimeRol"]').setValue(record.data.rolePlayerPeriodStartDateTimeRol);
         window.down('datefield[name="rolePlayerPeriodEndDateTimeRol"]').setValue(record.data.rolePlayerPeriodEndDateTimeRol);  
	},

	_loadReinsuranceCompanyData : function(window, record) {
		window.down('textarea[name="descriptionRol"]').setValue(record.data.descriptionRol);
		window.down('datefield[name="rolePlayerPeriodStartDateTimeRol"]').setValue(record.data.rolePlayerPeriodStartDateTimeRol);
		window.down('datefield[name="rolePlayerPeriodEndDateTimeRol"]').setValue(record.data.rolePlayerPeriodEndDateTimeRol);
	    window.down('textfield[name="lloydsAliasRec"]').setValue(record.data.lloydsAliasRec);
	    window.down('textfield[name="lloydsGroupNameRec"]').setValue(record.data.lloydsGroupNameRec);
	    window.down('textfield[name="lloydsSubSyndicateNameRec"]').setValue(record.data.lloydsSubSyndicateNameRec);
	    window.down('textfield[name="lloydsSyndicateNameRec"]').setValue(record.data.lloydsSyndicateNameRec);
	    window.down('textfield[name="secondaryAliasRec"]').setValue(record.data.secondaryAliasRec);
	},

	_loadPartyData: function (window, record) {
		if(record.data.playerPartyPar){
    		window.down('textfield[name="partyKey"]').setValue(record.data.playerPartyPar.keyImo);	
			if (record.data.playerPartyPar.typeNameImo === 'Person') {
				window.down('combo[name="genderCode"]').setValue(record.data.playerPartyPar.genderCodePer);
				window.down('combo[name="maritalStatusCode"]').setValue(record.data.playerPartyPar.maritalStatusCodePer);
				window.down('combo[name="ethnicityCode"]').setValue(record.data.playerPartyPar.ethnicityCodePer);
				window.down('combo[name="primaryLanguageCode"]').setValue(record.data.playerPartyPar.primaryLanguageExternalCodePer);
				
				if(record.data.playerPartyPar.deathIndicatorPer){
				window.down('#radio_deathindicator_true').setValue(true);
				}else{
				window.down('#radio_deathindicator_false').setValue(true);				}
				if(record.data.playerPartyPar.missingIndicatorPer){
				window.down('#radio_missingindicator_true').setValue(true);
				}else{
				window.down('#radio_missingindicator_false').setValue(true);	
				}
         		
				if(record.data.playerPartyPar.namePer!== undefined && record.data.playerPartyPar.namePer!== null && record.data.playerPartyPar.namePer.length >=0){
					window.down('textfield[name="personNameGivenName"]').setValue(record.data.playerPartyPar.namePer[0].givenNamePen);
	            	window.down('textfield[name="personNameMiddleName"]').setValue(record.data.playerPartyPar.namePer[0].middleNamePen);
	            	window.down('textfield[name="personNameSurname"]').setValue(record.data.playerPartyPar.namePer[0].surnamePen);
					if (typeof record.data.playerPartyPar.birthDatePer === 'string') {
						window.down('datefield[name="birthDate"]').setValue(record.data.playerPartyPar.birthDatePer.split(' ')[0].replace (/\-/g,'/'));
					} else {
						window.down('datefield[name="birthDate"]').setValue(record.data.playerPartyPar.birthDatePer);
					}	
					if (typeof record.data.playerPartyPar.deathDatePer === 'string') {
						window.down('datefield[name="personNameDeathDate"]').setValue(record.data.playerPartyPar.deathDatePer.split(' ')[0].replace (/\-/g,'/'));
					} else {
						window.down('datefield[name="personNameDeathDate"]').setValue(record.data.playerPartyPar.deathDatePer);
					}	
					if (typeof record.data.playerPartyPar.missingDatePer === 'string') {
						window.down('datefield[name="personNameMissingDate"]').setValue(record.data.playerPartyPar.missingDatePer.split(' ')[0].replace (/\-/g,'/'));
					} else {
						window.down('datefield[name="personNameMissingDate"]').setValue(record.data.playerPartyPar.missingDatePer);
					}						
	            	
				}	
			} else if (record.data.playerPartyPar.typeNameImo === 'Company') {
	        	window.down('numericfield[name="memberCount"]').setValue(record.data.playerPartyPar.memberCountOrg);
	        	if (typeof record.data.playerPartyPar.foundationDateOrg === 'string') {
					window.down('datefield[name="foundationDate"]').setValue(record.data.playerPartyPar.foundationDateOrg.split(' ')[0].replace (/\-/g,'/'));
				} else {
					window.down('datefield[name="foundationDate"]').setValue(record.data.playerPartyPar.foundationDateOrg);
				}
				
				if (typeof record.data.playerPartyPar.dissolutionDateOrg === 'string') {
					window.down('datefield[name="disolutionDate"]').setValue(record.data.playerPartyPar.dissolutionDateOrg.split(' ')[0].replace (/\-/g,'/'));
				} else {
					window.down('datefield[name="disolutionDate"]').setValue(record.data.playerPartyPar.dissolutionDateOrg);
				}
				
	        	
						 
			
				if (record.data.playerPartyPar.statusCom) {
					if (window.down('textfield[name="status"]')) 
						window.down('textfield[name="status"]').setValue(record.data.playerPartyPar.statusCom.nameSta);
				}
				
				
	        	if(record.data.playerPartyPar.nameOrg){
	        		for (var i = 0; i < record.data.playerPartyPar.nameOrg.length; ++i) {
						if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
							window.down('textfield[name="organizationNamefullName"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);

						} else if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
							window.down('textfield[name="organizationNamefullName2"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);
						}

					}
				}
	    		
	        } else if (record.data.playerPartyPar.typeNameImo === 'Organization') {
	        	window.down('numericfield[name="memberCount"]').setValue(record.data.playerPartyPar.memberCountOrg);
	        	window.down('datefield[name="disolutionDate"]').setValue(record.data.playerPartyPar.dissolutionDateOrg);
	        	window.down('datefield[name="foundationDate"]').setValue(record.data.playerPartyPar.foundationDateOrg);
	        	if(record.data.playerPartyPar.nameOrg){
	        		for (var i = 0; i < record.data.playerPartyPar.nameOrg.length; ++i) {
						if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
							window.down('textfield[name="organizationNamefullName"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);

						} else if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
							window.down('textfield[name="organizationNamefullName2"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);
						}

					}
				}
	    		
	        } else if (record.data.playerPartyPar.typeNameImo === 'GovernmentBody') {
	        	window.down('numericfield[name="memberCount"]').setValue(record.data.playerPartyPar.memberCountOrg);
	        	window.down('datefield[name="disolutionDate"]').setValue(record.data.playerPartyPar.dissolutionDateOrg);
	        	window.down('datefield[name="foundationDate"]').setValue(record.data.playerPartyPar.foundationDateOrg);
						 
				if(record.data.playerPartyPar.nameOrg){
	        		for (var i = 0; i < record.data.playerPartyPar.nameOrg.length; ++i) {
						if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
							window.down('textfield[name="organizationNamefullName"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);

						} else if (record.data.playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
							window.down('textfield[name="organizationNamefullName2"]').setValue(record.data.playerPartyPar.nameOrg[i].fullNamePan);
						}

					}
				}
			}
	        
	        this._loadContactPreferenceData (window, record);
		}

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
						  window.down('combo[name="postalCodeAssignedCode"]').setRawValue(contactPoint.deliveryAddressPmc.postalPostCodePoa.assignedExternalCodePoc);
						  	for(var j=0; j<contactPoint.deliveryAddressPmc.postalMunicipalityPoa.length; ++j){
						  		if(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].typeCodeMun=='City')
						  		window.down('combo[name="placeNameMunicipality1"]').setRawValue(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].namePla);
						  		else if(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].typeCodeMun=='Township')
						  	    window.down('combo[name="placeNameMunicipality2"]').setRawValue(contactPoint.deliveryAddressPmc.postalMunicipalityPoa[j].namePla);
						  	}
						  var adress=contactPoint.deliveryAddressPmc.unstructuredAddressPla;
						  var resAdress = adress.split("::");
						  if(resAdress!=null && resAdress.length>0){
							window.down('combo[name="streetAdressName"]').setRawValue(resAdress[0]);
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
						  window.down('combo[name="postalCodeAssignedCodeVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalPostCodePoa.assignedExternalCodePoc);
						  	for(var j=0; j<contactPoint.meetingAddressIpc.postalMunicipalityPoa.length; ++j){
						  		if(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].typeCodeMun=='City')
						  		window.down('combo[name="placeNameMunicipality1Visit"]').setRawValue(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].namePla);
						  		else if(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].typeCodeMun=='Township')
						  	    window.down('combo[name="placeNameMunicipality2Visit"]').setRawValue(contactPoint.meetingAddressIpc.postalMunicipalityPoa[j].namePla);
						  	}
						  var adress=contactPoint.meetingAddressIpc.unstructuredAddressPla;
						  var resAdress = adress.split("::");
						  if(resAdress!=null && resAdress.length>0){
							window.down('combo[name="streetAdressNameVisit"]').setRawValue(resAdress[0]);
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
	
	___createParty: function (rut, type) {
		var playerPartyPar = null;
		 if (type === 'Person') {
		 	playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1', {});		
		} else if (type === 'Organization') {
        	playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1', {});
        } else if (type === 'Company') {
        	playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1', {});
		} else if (type === 'GovernmentBody') {
			playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1', {});
        }
         
		playerPartyPar.set({
         	keyImo: rut,
    		creationUserImo: usuario.get('userName'),
    		creationDateTimeImo: new Date(),
    		updateUserImo: usuario.get('userName'),
    		updateDateTimeImo: new Date(),
		});	
		
		return playerPartyPar;
	},
	
	validarRut: function(btn,rut){
		var validations = [];

		var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
			valor1: rut,                
			operacion: 'rut',
			mensaje: 'El RUT es invÃ¡lido.'
		});

	  validations.push (validation);

	  var errors = null;
	  if (validations !== null || validations.length>0) {
		var utilValidation = this.application.getUtilValidation();
		errors =  utilValidation.validation(validations);
		  
	   }
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return false;
	   }
	   return true;
	},
	
	loadRol : function(window, record, type) {
		if (type === 'CustomerV1') {
			this.loadCustomer(window, record);
		} else if (type === 'EmployerV1') {
			this.loadEmployer(window, record);
		} else if (type === 'EmployeeV1') {
			this.loadEmployee(window, record);
		}
	},
	
	_loadClientData : function(window, record) {
		window.down('textarea[name="descriptionRol"]').setValue(record.data.descriptionRol);
		window.down('datefield[name="rolePlayerPeriodStartDateTimeRol"]').setValue(record.data.rolePlayerPeriodStartDateTimeRol);
		window.down('datefield[name="rolePlayerPeriodEndDateTimeRol"]').setValue(record.data.rolePlayerPeriodEndDateTimeRol);
		if(record.data.primaryIndicatorCus){
		window.down('#radio1_dataclient').setValue(true);
		}else{
		window.down('#radio2_dataclient').setValue(true);				
		}
	},
	
	__newEmptyCustomer : function(window, rut, type) {
		var playerPartyPar = this.___createParty(rut, type);
		this.__newCustomer(window, playerPartyPar);
	},

	__newCustomer : function(window, playerPartyPar) {
		var customerV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1', {});
		customerV1.set({
			'playerPartyPar' : playerPartyPar.data
		});
		this.loadCustomer(window, customerV1);
	},
	loadCustomer : function(window, customerV1) {
		window.down('form').getForm().loadRecord(customerV1);
		this.loadCustomerData(window, customerV1);
		window.show();
	},
	loadCustomerData : function(window, record) {
		this._loadPartyData(window, record);
		this._loadClientData(window, record);
	},
	
	/************Employer***************************/
	__newEmptyEmployer : function(window, rut, type) {
		var playerPartyPar = this.___createParty(rut, type);
		this.__newEmployer(window, playerPartyPar);
	},

	__newEmployer : function(window, playerPartyPar) {
		var employerV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1', {});
		employerV1.set({
			'playerPartyPar' : playerPartyPar.data
		});
		this.loadEmployer(window, employerV1);
	},
	loadEmployer : function(window, employerV1) {
		window.down('form').getForm().loadRecord(employerV1);
		this.loadEmployerData(window, employerV1);
		window.show();
	},
	loadEmployerData : function(window, record) {
		this._loadPartyData(window, record);
		this._loadInsuranceCompanyData(window, record);
	},
	
	/*************************************/
	
	/************Employee************************/
	__newEmptyEmployee : function(window, rut, type) {
		var playerPartyPar = this.___createParty(rut, type);
		this.__newEmployee(window, playerPartyPar);
	},

	__newEmployee : function(window, playerPartyPar) {
		var employeeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1', {});
		employeeV1.set({
			'playerPartyPar' : playerPartyPar.data
		});
		this.loadEmployee(window, employeeV1);
	},
	loadEmployee : function(window, employeeV1) {
		window.down('form').getForm().loadRecord(employeeV1);
		this.loadEmployeeData(window, employeeV1);
		window.show();
	},
	loadEmployeeData : function(window, record) {
		this._loadPartyData(window, record);
	    this._loadClientData(window, record);
	},
	
	/*****************************************/
	
	createCustomer : function(btn) {
		btn.setDisabled(true);
		var me = this;
		var form = btn.up('window').down('form').getForm();
		var namePar = null;
		var ownedCapabilityPar = null;
		var playerPartyPar = null;
		var preferredContactPreferencePar = [];
		var preferredContactPar = [];
		var window = btn.up('window');

		if (form.isValid()) {
			var objeto = form.getValues(false, false, false);
			var customerV1 = form.getRecord();
			if (customerV1 !== undefined && customerV1 !== null && customerV1.get('roleIdentifierRol') !== null && customerV1.get('roleIdentifierRol') !== undefined && new String(customerV1.get('roleIdentifierRol')).indexOf('CustomerV1') === -1) {
				btn.setDisabled(false);
				me.updateCustomer(btn);
			} else {
				customerV1.set(objeto);
				var playerPartyPar = customerV1.get('playerPartyPar');

				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar);

				customerV1.set({
					creationUserImo : usuario.get('userName'),
					ownedCapabilityPar : null,
					playerPartyPar : playerPartyPar,
					updateUserImo : usuario.get('userName'),
					updateDateTimeImo : new Date()
				});

				var customerV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1Validation', {});
				var validations = customerV1Validation.createValidations(customerV1);
				var errors = null;
				if (validations !== null || validations.length > 0) {
					var utilValidation = this.application.getUtilValidation();
					if (validations[0] !== undefined) {
						errors = utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}

				btn.up('window').mask("Guardando", "x-mask-loading");
				customerV1.save({
					callback : function(record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1').reload();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana(5, "Error de conexiÃ³n");
							}
						}
					},
					success : function(rec, st) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure : function(rec, st, a, b, c) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});
			}
		} else {
			invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
			var msg = "Formulario no válido. Complete los campos requeridos:<br />";
			for (var i = 0; i < invalidFields.length; i++) {
				msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
				for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
					msg += invalidFields[i].getErrors()[j] + '. ';
				}
				msg += '<br />';
			}
			crearVentana(5, msg);
			btn.setDisabled(false);
		}

	},
	
	updateCustomer : function(btn) {
		btn.setDisabled(true);
		var form = btn.up('window').down('form').getForm();
		var window = btn.up('window');
		var namePar = null;
		var objeto = form.getValues(false, false, false);
		var customerV1 = form.getRecord();
		customerV1.set(objeto);

		var playerPartyPar = customerV1.get('playerPartyPar');

		var preferredContactPar = playerPartyPar.preferredContactPar;

		if (preferredContactPar === null) {
			preferredContactPar = [];
		}

		if (playerPartyPar.typeNameImo === 'Person') {
			if (playerPartyPar.namePer === null || playerPartyPar.namePer.length === 0) {
				playerPartyPar.namePer = [];

				var namePar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1', {
					effectivePeriodStartDateTimePan : new Date(),
					languageExternalCodePan : 'SPA',
					defaultIndicatorPan : true,
					creationUserImo : usuario.get('userName'),
					creationDateTimeImo : new Date()
				}).data;
				playerPartyPar.namePer.push(namePar);
			}

			playerPartyPar.namePer[0].givenNamePen = form.getValues().personNameGivenName;
			playerPartyPar.namePer[0].middleNamePen = form.getValues().personNameMiddleName;
			playerPartyPar.namePer[0].surnamePen = form.getValues().personNameSurname;
			playerPartyPar.namePer[0].updateUserImo = usuario.get('userName');
			playerPartyPar.namePer[0].updateDateTimeImo = new Date();

		} else if (playerPartyPar.typeNameImo === 'Organization' || playerPartyPar.typeNameImo === 'GovernmentBody') {
			if (playerPartyPar.nameOrg === null || playerPartyPar.nameOrg.length === 0) {
				playerPartyPar.nameOrg = this.createPartyName(form, playerPartyPar)
			}

			if (playerPartyPar.nameOrg.length >= 2) {

				if (playerPartyPar.nameOrg[0].usageCodeOrn === 'LegalName') {
					playerPartyPar.nameOrg[0].fullNamePan = form.getValues().organizationNamefullName;
					playerPartyPar.nameOrg[0].updateUserImo = usuario.get('userName');
					playerPartyPar.nameOrg[0].updateDateTimeImo = new Date();
				} else if (playerPartyPar.nameOrg[0].usageCodeOrn === 'CompanyName') {
					playerPartyPar.nameOrg[1].fullNamePan = form.getValues().organizationNamefullName2;
					playerPartyPar.nameOrg[1].updateUserImo = usuario.get('userName');
					playerPartyPar.nameOrg[1].updateDateTimeImo = new Date();
				}

				for (var i = 0; i < playerPartyPar.nameOrg.length; ++i) {
					if (playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();

					} else if (playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName2;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();
					}

				}

			}
		}

		this.setDataParty(objeto, playerPartyPar);

		if (this.exists(window.down('#networkAdressIdentifierEmailContact'), 'identifierNea') === -1) {
			var contactPreference = this._createEmailContact(window.down('combo[name="networkAdressIdentifierEmailContact"]').rawValue);
			if (contactPreference !== null) {
				preferredContactPar.push(contactPreference.data);
			}
		}

		if (this.exists(window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]'), 'fullNumberTnu') === -1) {
			var contactPreference = this._createTelephoneContact(window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').rawValue, 'Land_Line');
			if (contactPreference !== null) {
				preferredContactPar.push(contactPreference.data);
			}
		}

		playerPartyPar.preferredContactPar = preferredContactPar;
		customerV1.set({
			ownedCapabilityPar : null,
			playerPartyPar : playerPartyPar,
			preferredContactPreferencePar : null,
			updateUserImo : usuario.get('userName'),
			updateDateTimeImo : new Date()
		});
		var customerV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1Validation', {});
		var validations = customerV1Validation.createValidations(customerV1);
		var errors = null;
		if (validations !== null || validations.length > 0) {
			var utilValidation = this.application.getUtilValidation();
			if (validations[0] !== undefined) {
				errors = utilValidation.validation(validations[0].data);
			}
		}
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return null;
		}
		btn.up('window').mask("Guardando", "x-mask-loading");
		customerV1.save({
			callback : function(record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						Ext.getStore ('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1').reload();
						crearVentana(respuesta.codigo, respuesta.mensaje);
					} else {
						crearVentana(respuesta.codigo, respuesta.mensaje);
					}
					btn.setDisabled(false);
				} else {
					if (operation.error) {
						crearVentana(operation.error.status, "Error de conexiÃ³n");
					}
				}
			},
			success : function(rec, st) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure : function(rec, st, a, b, c) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});
	},
	
	createEmployer : function(btn) {
		btn.setDisabled(true);
		var me = this;
		var form = btn.up('window').down('form').getForm();
		var namePar = null;
		var ownedCapabilityPar = null;
		var playerPartyPar = null;
		var preferredContactPreferencePar = [];
		var preferredContactPar = [];
		var window = btn.up('window');

		if (form.isValid()) {
			var objeto = form.getValues(false, false, false);
			var employerV1 = form.getRecord();
			if (employerV1 !== undefined && employerV1 !== null && employerV1.get('roleIdentifierRol') !== null && employerV1.get('roleIdentifierRol') !== undefined && new String(employerV1.get('roleIdentifierRol')).indexOf('EmployerV1') === -1) {
				btn.setDisabled(false);
				me.updateEmployer(btn);
			} else {
				employerV1.set(objeto);
				var playerPartyPar = employerV1.get('playerPartyPar');
				
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar);
				
				employerV1.set({
					creationUserImo : usuario.get('userName'),
					ownedCapabilityPar : null,
					playerPartyPar : playerPartyPar,
					updateUserImo : usuario.get('userName'),
					updateDateTimeImo : new Date()
				});

				var employerV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1Validation', {});
				var validations = employerV1Validation.createValidations(employerV1);
				var errors = null;
				if (validations !== null || validations.length > 0) {
					var utilValidation = this.application.getUtilValidation();
					if (validations[0] !== undefined) {
						errors = utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}

				btn.up('window').mask("Guardando", "x-mask-loading");
				employerV1.save({
					callback : function(record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana(5, "Error de conexión");
							}
						}
					},
					success : function(rec, st) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure : function(rec, st, a, b, c) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});
			}
		} else {
			invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
			var msg = "Formulario no válido. Complete los campos requeridos:<br />";
			for (var i = 0; i < invalidFields.length; i++) {
				msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
				for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
					msg += invalidFields[i].getErrors()[j] + '. ';
				}
				msg += '<br />';
			}
			crearVentana(5, msg);
			btn.setDisabled(false);
		}

	},
	
	updateEmployer : function(btn) {
		btn.setDisabled(true);
		var form = btn.up('window').down('form').getForm();
		var window = btn.up('window');
		var namePar = null;
		var objeto = form.getValues(false, false, false);
		var employerV1 = form.getRecord();
		employerV1.set(objeto);

		var playerPartyPar = employerV1.get('playerPartyPar');

		var preferredContactPar = playerPartyPar.preferredContactPar;

		if (preferredContactPar === null) {
			preferredContactPar = [];
		}

			if (playerPartyPar.nameOrg === null || playerPartyPar.nameOrg.length === 0) {
				playerPartyPar.nameOrg = this.createPartyName(form, playerPartyPar)
			}

			if (playerPartyPar.nameOrg.length >= 2) {

				if (playerPartyPar.nameOrg[0].usageCodeOrn === 'LegalName') {
					playerPartyPar.nameOrg[0].fullNamePan = form.getValues().organizationNamefullName;
					playerPartyPar.nameOrg[0].updateUserImo = usuario.get('userName');
					playerPartyPar.nameOrg[0].updateDateTimeImo = new Date();
				} else if (playerPartyPar.nameOrg[0].usageCodeOrn === 'CompanyName') {
					playerPartyPar.nameOrg[1].fullNamePan = form.getValues().organizationNamefullName2;
					playerPartyPar.nameOrg[1].updateUserImo = usuario.get('userName');
					playerPartyPar.nameOrg[1].updateDateTimeImo = new Date();
				}

				for (var i = 0; i < playerPartyPar.nameOrg.length; ++i) {
					if (playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();

					} else if (playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
						playerPartyPar.nameOrg[i].fullNamePan = form.getValues().organizationNamefullName2;
						playerPartyPar.nameOrg[i].updateUserImo = usuario.get('userName');
						playerPartyPar.nameOrg[i].updateDateTimeImo = new Date();
					}

				}

			}
		

		this.setDataParty(objeto, playerPartyPar);

		if (this.exists(window.down('#networkAdressIdentifierEmailContact'), 'identifierNea') === -1) {
			var contactPreference = this._createEmailContact(window.down('combo[name="networkAdressIdentifierEmailContact"]').rawValue);
			if (contactPreference !== null) {
				preferredContactPar.push(contactPreference.data);
			}
		}

		if (this.exists(window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]'), 'fullNumberTnu') === -1) {
			var contactPreference = this._createTelephoneContact(window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').rawValue, 'Land_Line');
			if (contactPreference !== null) {
				preferredContactPar.push(contactPreference.data);
			}
		}

		playerPartyPar.preferredContactPar = preferredContactPar;
		employerV1.set({
			ownedCapabilityPar : null,
			playerPartyPar : playerPartyPar,
			preferredContactPreferencePar : null,
			updateUserImo : usuario.get('userName'),
			updateDateTimeImo : new Date()
		});
		var employerV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployerV1Validation', {});
		var validations = employerV1Validation.createValidations(employerV1);
		var errors = null;
		if (validations !== null || validations.length > 0) {
			var utilValidation = this.application.getUtilValidation();
			if (validations[0] !== undefined) {
				errors = utilValidation.validation(validations[0].data);
			}
		}
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return null;
		}
		btn.up('window').mask("Guardando", "x-mask-loading");
		employerV1.save({
			callback : function(record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						crearVentana(respuesta.codigo, respuesta.mensaje);
						//Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1').reload();
					} else {
						crearVentana(respuesta.codigo, respuesta.mensaje);
					}
					btn.setDisabled(false);
				} else {
					if (operation.error) {
						crearVentana(operation.error.status, "Error de conexiÃ³n");
					}
				}
			},
			success : function(rec, st) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure : function(rec, st, a, b, c) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});
	},

	createEmployee : function(btn) {
		btn.setDisabled(true);
		var me = this;
		var form = btn.up('window').down('form').getForm();
		var namePar = null;
		var ownedCapabilityPar = null;
		var playerPartyPar = null;
		var preferredContactPreferencePar = [];
		var preferredContactPar = [];
		var window = btn.up('window');

		if (form.isValid()) {
			var objeto = form.getValues(false, false, false);
			var employeeV1 = form.getRecord();
			if (employeeV1 !== undefined && employeeV1 !== null && employeeV1.get('roleIdentifierRol') !== null && employeeV1.get('roleIdentifierRol') !== undefined && new String(employeeV1.get('roleIdentifierRol')).indexOf('EmployeeV1') === -1) {
				btn.setDisabled(false);
				me.updateEmployee(btn);
			} else {
				employeeV1.set(objeto);
				var playerPartyPar = employeeV1.get('playerPartyPar');
				
				if (playerPartyPar.preferredContactPar === null) {
					playerPartyPar.preferredContactPar = [];
				}
				this.setDataPartyName (form, playerPartyPar);	    	
				this.setDataParty (objeto, playerPartyPar);
				this.setDataContactPreference (window, playerPartyPar);
				
				employeeV1.set({
					creationUserImo : usuario.get('userName'),
					ownedCapabilityPar : null,
					playerPartyPar : playerPartyPar,
					updateUserImo : usuario.get('userName'),
					updateDateTimeImo : new Date()
				});

				var employeeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1Validation', {});
				var validations = employeeV1Validation.createValidations(employeeV1);
				var errors = null;
				if (validations !== null || validations.length > 0) {
					var utilValidation = this.application.getUtilValidation();
					if (validations[0] !== undefined) {
						errors = utilValidation.validation(validations[0].data);
					}
				}
				if (errors !== null && errors !== undefined) {
					crearVentana(5, errors);
					btn.setDisabled(false);
					return null;
				}

				btn.up('window').mask("Guardando", "x-mask-loading");
				employeeV1.save({
					callback : function(record, operation) {
						if (operation.success === true) {
							var respuesta = Ext.decode(operation._response.responseText);
							if (respuesta.valido === true) {
								//btn.up('window').close();
								crearVentana(respuesta.codigo, respuesta.mensaje);
							} else {
								crearVentana(respuesta.codigo, respuesta.mensaje);
							}
						} else {
							if (operation.error) {
								crearVentana(5, "Error de conexiÃ³n");
							}
						}
					},
					success : function(rec, st) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					},
					failure : function(rec, st, a, b, c) {
						btn.setDisabled(false);
						btn.up('window').unmask();
					}
				});
			}
		} else {
			invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
			var msg = "Formulario no válido. Complete los campos requeridos:<br />";
			for (var i = 0; i < invalidFields.length; i++) {
				msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
				for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
					msg += invalidFields[i].getErrors()[j] + '. ';
				}
				msg += '<br />';
			}
			crearVentana(5, msg);
			btn.setDisabled(false);
		}

	},
	
	updateEmployee : function(btn) {
		btn.setDisabled(true);
		var form = btn.up('window').down('form').getForm();
		var window = btn.up('window');
		var namePar = null;
		var objeto = form.getValues(false, false, false);
		var employeeV1 = form.getRecord();
		employeeV1.set(objeto);

		var playerPartyPar = employeeV1.get('playerPartyPar');
				
		if (playerPartyPar.preferredContactPar === null) {
			playerPartyPar.preferredContactPar = [];
		}
		this.setDataPartyName (form, playerPartyPar);	    	
		this.setDataParty (objeto, playerPartyPar);
		this.setDataContactPreference (window, playerPartyPar);
		
		employeeV1.set({
			ownedCapabilityPar : null,
			playerPartyPar : playerPartyPar,
			preferredContactPreferencePar : null,
			updateUserImo : usuario.get('userName'),
			updateDateTimeImo : new Date()
		});
		
		var employeeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.EmployeeV1Validation', {});
		var validations = employeeV1Validation.createValidations(employeeV1);
		var errors = null;
		if (validations !== null || validations.length > 0) {
			var utilValidation = this.application.getUtilValidation();
			if (validations[0] !== undefined) {
				errors = utilValidation.validation(validations[0].data);
			}
		}
		if (errors !== null && errors !== undefined) {
			crearVentana(5, errors);
			btn.setDisabled(false);
			return null;
		}
		btn.up('window').mask("Guardando", "x-mask-loading");
		employeeV1.save({
			callback : function(record, operation) {
				if (operation.success === true) {
					var respuesta = Ext.decode(operation._response.responseText);
					if (respuesta.valido === true) {
						//btn.up('window').close();
						crearVentana(respuesta.codigo, respuesta.mensaje);
						//Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.serviceProviderSubtypes.InsuranceBrokerageV1').reload();
					} else {
						crearVentana(respuesta.codigo, respuesta.mensaje);
					}
					btn.setDisabled(false);
				} else {
					if (operation.error) {
						crearVentana(operation.error.status, "Error de conexiÃ³n");
					}
				}
			},
			success : function(rec, st) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			},
			failure : function(rec, st, a, b, c) {
				btn.setDisabled(false);
				btn.up('window').unmask();
			}
		});
	}



	
});

