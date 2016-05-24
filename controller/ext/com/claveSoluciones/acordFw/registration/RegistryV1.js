Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.registration.RegistryV1', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryV1',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1',
    		 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',
    		 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1',
    		 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1'	
    		],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1',
    		'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1',
    		'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1',
    		'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1'
    		],
    views:  [
    		 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusToolbar',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1SelectionTypeWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV2PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV2FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation'
            ],

    init: function() {
        this.control({
            'registryv1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'registryv1grid_ext button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'registryv1principalwindow_ext button[action=create]': {
                click: this.create
            },
            'registryv2principalwindow_ext button[action=create]': {
                click: this.create
            },
            'registryv1grid_ext button[action=delete]': {
                click: this.deleteElement
            },
            'registryv1grid_ext button[action=edit]': {
                click: this.edit
            },
            'registryv1principalwindow_ext button[action=update]': {
                click: this.update
            },
            'registryv2principalwindow_ext button[action=update]': {
                click: this.update
            },
            'registryv1grid_ext button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'registryv1selectiontypewindow_ext button[action=aceptar]' : {
				click : this.initRegistry
			},
             'registryv1principalwindow_ext button[action=abrir]' : {
				click : this.setStatusCompany
			},
			'registryv1principalwindow_ext button[action=cerrar]' : {
				click : this.setStatusCompany
			},
			'registryv1principalwindow_ext button[action=liquidar]' : {
				click : this.setStatusCompany
			},

        });
    },

  update: function(btn) {
        btn.setDisabled(true);
        var me=this;
        var form = btn.up('window').down('form').getForm();
        var administeringAuthorityReg = [];
        var includedRegistrationReg = [];
        var objeto = form.getValues(false, false, false);
        var registryV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, registryV1);
        var administeringAuthorityRegRecord=registryV1.get('administeringAuthorityReg');
        var playerPartyPar = administeringAuthorityRegRecord[0].playerPartyPar;
		var partyNames = me.createPartyName (form, playerPartyPar);
		playerPartyPar.nameOrg = partyNames;
		//playerPartyPar.preferredContactPar= null;
		me.setDataParty (objeto, playerPartyPar);
		administeringAuthorityRegRecord[0].playerPartyPar=playerPartyPar;
		//setear info rol a administeringAuthorityRegRecord
		administeringAuthorityRegRecord[0].rolePlayerPeriodStartDateTimeRol=objeto.rolePlayerPeriodStartDateTimeRol;
		administeringAuthorityRegRecord[0].rolePlayerPeriodEndDateTimeRol=objeto.rolePlayerPeriodEndDateTimeRol;
		administeringAuthorityRegRecord[0].descriptionRol=objeto.descriptionRol;
        
        administeringAuthorityReg.push(administeringAuthorityRegRecord[0]);
        var includedRegistrationRegRecord=registryV1.get('includedRegistrationReg');
        
        includedRegistrationReg.push(includedRegistrationRegRecord[0]);
        registryV1.set (objeto);
        registryV1.set({
            administeringAuthorityReg: administeringAuthorityReg,
            includedRegistrationReg: includedRegistrationReg,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var registryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {});
        var validations = registryV1Validation.createValidations (registryV1);
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
        registryV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1').reload();
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
    
   edit: function (btn) {
  		 btn.setDisabled(true);
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistrationV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
        	console.log(seleccion);
        	if(seleccion[0].get('administeringAuthorityReg')!==null && seleccion[0].get('administeringAuthorityReg')!==undefined
        	&& seleccion[0].get('administeringAuthorityReg').length>0){
        	var administeringAuthorityReg=seleccion[0].get('administeringAuthorityReg')[0];
            var playerPartyPar=seleccion[0].get('administeringAuthorityReg')[0].playerPartyPar;
            	console.log(playerPartyPar);
            	if(playerPartyPar!==null && playerPartyPar!==undefined){
            		var window=null;
            		if(playerPartyPar.typeNameImo=='Company'){
            		window = Ext.widget('registryv1principalwindow_ext');
            		window.down ('statuscompany').down('fieldset').setTitle ('Estado de la Empresa');
			        window.down ('datacompany').down('fieldset').setTitle ('Datos de la Empresa');
			        window.down ('datainsurancecompany').down('fieldset').setTitle ('Datos de la Compañía de Reaseguros');
            		}else {
            		window = Ext.widget('registryv2principalwindow_ext');
            		window.down ('datacompany').down('fieldset').setTitle ('Datos del Organismo de Gobierno');
		            window.down('textfield[name="organizationNamefullName"]').setFieldLabel('Nombre del Organismo de Gobierno');
		            window.down ('datainsurancecompany').down('fieldset').setTitle ('Datos de la Compañía de Reaseguros');
            		}
            		this._loadPartyData(window,seleccion[0].get('administeringAuthorityReg')[0]);
            		//datos corredor de seguro
            		window.down('datefield[name="rolePlayerPeriodStartDateTimeRol"]').setValue(administeringAuthorityReg.rolePlayerPeriodStartDateTimeRol);
            		window.down('datefield[name="rolePlayerPeriodEndDateTimeRol"]').setValue(administeringAuthorityReg.rolePlayerPeriodEndDateTimeRol);
            		window.down('textarea[name="descriptionRol"]').setValue(administeringAuthorityReg.descriptionRol);
            		
            		window.setTitle('Especificación de Libro de Registro Nº ' + seleccion[0].get('registryIdentifierReg'));
            		window.down('form').getForm().loadRecord(seleccion[0]);
            		window.show();
            	}
            }
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
   },
    
   setStatusCompany: function(btn){
   	
   	 var form = btn.up('window').down('form').getForm();
     var registryV1 =  form.getRecord();
     if(registryV1.data.administeringAuthorityReg!==null && registryV1.data.administeringAuthorityReg!==undefined){
     	if(registryV1.data.administeringAuthorityReg.playerPartyPar!==null && 
     		registryV1.data.administeringAuthorityReg.playerPartyPar!==undefined){
     		var playerPartyPar=registryV1.data.administeringAuthorityReg.playerPartyPar;
     		if(playerPartyPar.statusCom!==null && playerPartyPar.statusCom!==undefined){
     			playerPartyPar.statusCom.codeCos=btn.value;
     		} else{
     			var statusCom=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyStatusV1',{});
     			statusCom.set({
		    		creationUserImo: usuario.get('userName'),
		    		creationDateTimeImo: new Date(),
		    		updateUserImo: usuario.get('userName'),
		    		updateDateTimeImo: new Date(),
				});	
				playerPartyPar.statusCom=statusCom.data
     			playerPartyPar.statusCom.codeCos=btn.value;
     		}
     	}
     	
     }
     btn.up('window').down('textfield[name="status"]').setValue(btn.getText());

   	
   },

   create: function(btn) {
        btn.setDisabled(true);
        var me=this;
        var form = btn.up('window').down('form').getForm();
        var administeringAuthorityReg = [];
        var includedRegistrationReg = [];
        if(form.isValid()){
            
            var objeto = form.getValues(false, false, false);
            var registryV1 =  form.getRecord();
            if (registryV1!== undefined 
                && registryV1!== null 
                && registryV1.get('registryIdentifierReg')!==null 
                && registryV1.get('registryIdentifierReg')!==undefined 
                && new String(registryV1.get('registryIdentifierReg')).indexOf('RegistryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var administeringAuthorityRegRecord=registryV1.get('administeringAuthorityReg')[0];
                var playerPartyPar = administeringAuthorityRegRecord.playerPartyPar;
				var partyNames = me.createPartyName (form, playerPartyPar);
				playerPartyPar.nameOrg = partyNames;
				me.setDataParty (objeto, playerPartyPar);
				me.setDataContactPreference (btn.up('window'), playerPartyPar);
				administeringAuthorityRegRecord.playerPartyPar=playerPartyPar;
				//setear info rol a administeringAuthorityRegRecord
				administeringAuthorityRegRecord.rolePlayerPeriodStartDateTimeRol=objeto.rolePlayerPeriodStartDateTimeRol;
				administeringAuthorityRegRecord.rolePlayerPeriodEndDateTimeRol=objeto.rolePlayerPeriodEndDateTimeRol;
				administeringAuthorityRegRecord.descriptionRol=objeto.descriptionRol;
                
                administeringAuthorityReg.push(administeringAuthorityRegRecord);
                
                
                
                
                objeto = this.application.getConvertion().convert (objeto, registryV1);
                registryV1.set(objeto);
                registryV1.set({
                    registryIdentifierReg: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    administeringAuthorityReg: administeringAuthorityReg,
                    includedRegistrationReg: registryV1.get('includedRegistrationReg')
                });
                var registryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {});
                var validations = registryV1Validation.createValidations (registryV1);
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
                registryV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1').reload();
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
    

    mostrarWindows: function(btn) {
    	console.log('mostrarWindows');
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.UtilControllerV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistrationV1');
        var ventana = Ext.widget('registryv1selectiontypewindow_ext');
        ventana.show();
        btn.setDisabled(false);
    },
    
    initRegistry: function(btn){
    	var me = this;		
		var window=	btn.up('window');
		var radio1 = Ext.getCmp('radio_persona');
 		//var fieldContainer=window.down('fieldcontainer');
 		var rut=window.down('textfield[name="rut"]').value;
 		
 		if(rut!=null && rut!=''){
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
			
			storeParty.load({
				callback : function(records, operation, success) {
					var windowInsurance = null;
					 if (typeParty === 'Company') {
						windowInsurance = Ext.widget('registryv1principalwindow_ext');
						windowInsurance.down ('statuscompany').down('fieldset').setTitle ('Estado de la Empresa');
			            windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos de la Empresa');
			        	windowInsurance.down ('datainsurancecompany').down('fieldset').setTitle ('Datos de la Compañía de Reaseguros');
					} else {
						windowInsurance = Ext.widget('registryv2principalwindow_ext');
						windowInsurance.down ('datacompany').down('fieldset').setTitle ('Datos del Organismo de Gobierno');
		                windowInsurance.down('textfield[name="organizationNamefullName"]').setFieldLabel('Nombre del Organismo de Gobierno');
		                windowInsurance.down ('datainsurancecompany').down('fieldset').setTitle ('Datos de la Compañía de Reaseguros');

					}
					if (success) {
						if (records !== null && records.length > 0) {
							// windowInsurance.setTitle('Corredor de Seguros NÂº ' + records[0].get('roleIdentifierRol'));
							var store = me._createStore('RegistryAuthority', 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1', records[0].get('partyIdentifierPar'),'playerPartyPar.partyIdentifierPar');
							var playerPartyPar = records[0];
							store.load({
								callback : function(records, operation, success) {
									if (records !== null && records.length > 0) {
										//chequear si hay un registry asociado a registryauthority
										//me.loadRegister(windowInsurance, records[0]);
									} else {
										me.__newRegister(windowInsurance, playerPartyPar);
									}
								}
							});
						} else {
							me.__newEmptyRegister(windowInsurance, rut, typeParty);
						}
					}
					window.close();
            }        	
        });

 		   
 			
 	    }else{
 	    	
 	    }

   },
    
    createStoreParty: function (storeName, typeParty, rut) {
		var storeParty = Ext.create (storeName,{});
			
	   	var filtro = filterCreation(typeParty);
	   	var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'keyImo',
                valor: rut,
                operacion: '=',
                tipoValor: 'string'
            });
       	filtro.push(keyImo.data);
       	storeParty.getProxy().setExtraParam('filters', Ext.encode(filtro));	
       	return storeParty;
	},
	
	_createStore: function (type, storeName, id,campo) {
		var store = Ext.create (storeName,{});
		var filtro = filterCreation(type);
	   	var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: campo,
                valor: id,
                operacion: '=',
                tipoValor: 'long'
            });
       	filtro.push(keyImo.data);
       	store.getProxy().setExtraParam('filters', Ext.encode(filtro));
		return store;
	},

	loadRegister : function(window, registerV1) {
		window.down('form').getForm().loadRecord(registerV1);
		this.loadRegisterData(window, registerV1);
		window.show();
		this.createAnimation(window.getEl());
		
	},
	
	createAnimation: function(elem_target){

		elem_target.slideIn("r", {
			duration: 500});
		
	},
	
	loadRegisterData : function(window, record) {
		this._loadPartyData(window, record.data.administeringAuthorityReg[0]);
		//this._loadClientData(window, record);
	},
	
	__newRegister : function(window, playerPartyPar) {
		var registryauthorityv1=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',{});
		registryauthorityv1.set({
					playerPartyPar : playerPartyPar.data,
		    		creationUserImo: usuario.get('userName'),
		    		creationDateTimeImo: new Date(),
		    		updateUserImo: usuario.get('userName'),
		    		updateDateTimeImo: new Date(),
		});

		var registrationv1=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistrationV1',{});
		registrationv1.set({
		    		creationUserImo: usuario.get('userName'),
		    		creationDateTimeImo: new Date(),
		    		updateUserImo: usuario.get('userName'),
		    		updateDateTimeImo: new Date(),
		});	
		var registerV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1', {});
		var administeringAuthorityReg=[];
		administeringAuthorityReg.push(registryauthorityv1.data);
		var includedRegistrationReg=[];
		includedRegistrationReg.push(registrationv1.data);
		registerV1.set({
			'administeringAuthorityReg' : administeringAuthorityReg,
			'includedRegistrationReg'  : includedRegistrationReg
		});
		this.loadRegister(window, registerV1);
	},
	
	__newEmptyRegister : function(window, rut, type) {
		var playerPartyPar = this.___createParty(rut, type);
		this.__newRegister(window, playerPartyPar);
	},
	
		_loadPartyData: function (window, record) {
		if(record.playerPartyPar){
			window.down('textfield[name="partyKey"]').setValue(record.playerPartyPar.keyImo);	
    		 if (record.playerPartyPar.typeNameImo === 'Company') {
	        	//window.down('datefield[name="disolutionDate"]').setValue(Ext.Date.parse("09-10-2014 00:00:00", "d-m-Y H:i:s"));
	        	window.down('numericfield[name="memberCount"]').setValue(record.playerPartyPar.memberCountOrg);
	        	if(Ext.Date.parse(record.playerPartyPar.dissolutionDateOrg,"d-m-Y H:i:s")!==undefined){
	        		window.down('datefield[name="disolutionDate"]').setValue(Ext.Date.parse(record.playerPartyPar.dissolutionDateOrg,"d-m-Y H:i:s"));
				}else{
					window.down('datefield[name="disolutionDate"]').setValue(record.playerPartyPar.dissolutionDateOrg);	
				}
				if(Ext.Date.parse(record.playerPartyPar.foundationDateOrg,"d-m-Y H:i:s")!==undefined){
	        		window.down('datefield[name="foundationDate"]').setValue(Ext.Date.parse(record.playerPartyPar.foundationDateOrg,"d-m-Y H:i:s"));
				}else{
					window.down('datefield[name="foundationDate"]').setValue(record.playerPartyPar.foundationDateOrg);		
				}	
			
				if (record.playerPartyPar.statusCom) {
					window.down('textfield[name="status"]').setValue(record.playerPartyPar.statusCom.codeCos);
				}
				
				
	        	if(record.playerPartyPar.nameOrg){
	        		for (var i = 0; i < record.playerPartyPar.nameOrg.length; ++i) {
						if (record.playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
							window.down('textfield[name="organizationNamefullName"]').setValue(record.playerPartyPar.nameOrg[i].fullNamePan);

						} else if (record.playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
							window.down('textfield[name="organizationNamefullName2"]').setValue(record.playerPartyPar.nameOrg[i].fullNamePan);
						}

					}
				}
	    		
	        } else if (record.playerPartyPar.typeNameImo === 'Organization') {
	        	window.down('numericfield[name="memberCount"]').setValue(record.playerPartyPar.memberCountOrg);
	        	window.down('datefield[name="disolutionDate"]').setValue(record.playerPartyPar.dissolutionDateOrg);
	        	window.down('datefield[name="foundationDate"]').setValue(record.playerPartyPar.foundationDateOrg);
	        	if(record.playerPartyPar.nameOrg){
	        		for (var i = 0; i < record.playerPartyPar.nameOrg.length; ++i) {
						if (record.playerPartyPar.nameOrg[i].usageCodeOrn === 'LegalName') {
							window.down('textfield[name="organizationNamefullName"]').setValue(record.playerPartyPar.nameOrg[i].fullNamePan);

						} else if (record.playerPartyPar.nameOrg[i].usageCodeOrn === 'CompanyName') {
							window.down('textfield[name="organizationNamefullName2"]').setValue(record.playerPartyPar.nameOrg[i].fullNamePan);
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
		
		
		
		
		if(seleccion.playerPartyPar.preferredContactPar){
			window.down ('combo[name="networkAdressIdentifierEmailContact"]').setStore (storeEmail);
			window.down ('combo[name="networkAdressIdentifierWebPageContact"]').setStore (storeWebPage);
			window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').setStore (storeTelephoneNumber);
			window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').setStore (storeTelephoneNumber2);
			
			var prefer=seleccion.playerPartyPar.preferredContactPar;
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
						window.down ('combo[name="externalCodeArea"]').setValue (contactPoint.telephoneNumberTcc.areaExternalCodeTnu);
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
						  window.down('textfield[name="postalCodeAssignedCode"]').setValue(contactPoint.deliveryAddressPmc.postalPostCodePoa);
						  
				} else if(contactPoint!== null && contactPoint!== undefined && contactPoint.typeNameImo=='InPersonContact' && prefer[i].priorityLevelCop===1 &&  prefer[i].usageCodeCop==='Business'){
						  window.down ('#direccion_visita').data = contactPoint.meetingAddressIpc;
						  window.down('combo[name="placeNameCountryVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalCountryPoa.namePla);
						  window.down('combo[name="placeNameCountrySubdivisionVisit"]').setRawValue(contactPoint.meetingAddressIpc.postalCountrySubdivisionPoa.namePla);
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
						  window.down('textfield[name="postalCodeAssignedCodeVisit"]').setValue(contactPoint.meetingAddressIpc.postalPostCodePoa);
						  
				}	 				
			}
		};
	
	
	},

	___createParty: function (rut, type) {
		var playerPartyPar = null;
		if (type === 'Company') {
        	var statusCom=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyStatusV1',{});
 			statusCom.set({
	    		creationUserImo: usuario.get('userName'),
	    		creationDateTimeImo: new Date(),
	    		updateUserImo: usuario.get('userName'),
	    		updateDateTimeImo: new Date(),
			});	
        	playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1', {});
			playerPartyPar.statusCom=statusCom.data;       	
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
	
	
	
	createPartyName: function (form, playerPartyPar) {
		var partyName = [];
		
		if (playerPartyPar.typeNameImo === 'Company') {
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
	
	setDataParty: function (objeto, playerPartyPar) {

			playerPartyPar.foundationDateOrg = objeto.foundationDate;
			playerPartyPar.dissolutionDateOrg = objeto.disolutionDate;
			playerPartyPar.memberCountOrg = objeto.memberCount;


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
		
		if (this.exists (window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]'), 'fullNumberTen') === -1) {	
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact1"]').rawValue, 'Land_Line',window.down('combo[name="externalCodeArea"]').rawValue);
		    if (contactPreference !== null) {
		    	 playerPartyPar.preferredContactPar.push (contactPreference.data);
		    }			    
		}		
		
		if (this.exists (window.down ('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]'), 'fullNumberTen') === -1) {	
		    var contactPreference = this._createTelephoneContact (window.down('combo[name="telephoneNumberFullNumberTelephoneCallContact2"]').rawValue, 'Cell','9');
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
	
	_createTelephoneContact : function (value, type, areaCode) {
		if (value === null || value === '') {
			return null;
		}
		var telephoneNumberFijo=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',{
            	fullNumberTen: value,
            	areaExternalCodeTnu: areaCode, 
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
			if (record.get ('administeringAuthorityReg')[0].playerPartyPar!==null && record.get ('administeringAuthorityReg')[0].playerPartyPar!==undefined
				&& record.get ('administeringAuthorityReg')[0].playerPartyPar.preferredContactPar!==null
				&& record.get ('administeringAuthorityReg')[0].playerPartyPar.preferredContactPar!==undefined
			) {
				for (var i=0;i<record.get ('administeringAuthorityReg')[0].playerPartyPar.preferredContactPar.length;i++) {
					var preferContact=record.get ('administeringAuthorityReg')[0].playerPartyPar.preferredContactPar[i];
					if (preferContact.preferredContactPointCop.typeNameImo === components[10]) {
						if (preferContact.preferredContactPointCop[components[12]]) {
							if (preferContact.preferredContactPointCop[components[12]].addressIdentifierAdd === selectAddress.addressIdentifierAdd) {	
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
				//}
			} else {
				postalCountryPoa = window.down (components[0]).valueModels[0].data;
				postalCountrySubdivisionPoa = window.down (components[1]).valueModels[0].data;
				postalMunicipalityPoa.push (window.down (components[2]).valueModels[0].data);
				postalMunicipalityPoa.push (window.down (components[3]).valueModels[0].data);
			}
			
			if(window.down (components[13]).valueModels!==null && window.down (components[13]).valueModels!==undefined
				&& window.down (components[13]).valueModels.length>0)
				postalPostCodePoa = window.down (components[13]).valueModels[0].data;

			
			var uniformResourceLocation=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',{
				'unstructuredAddressPla': window.down(components[4]).rawValue+'::'+objeto[components[5]],
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
   

});
