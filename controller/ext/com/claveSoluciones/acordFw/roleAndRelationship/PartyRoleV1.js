Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
    		'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PartyV1',
    		'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.VirtualPartyV1'
    		],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'],

    views:  [
    		 'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1EditStorePrincipalWindowEdit',
    	     'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1PrincipalWindow',
    	     'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1SelectionTypeWindow',
             'AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Validation'
            ],

    init: function() {
        this.control({
            'partyrolev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'partyrolev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'partyrolev1principalwindow button[action=create]': {
                click: this.create
            },
            'partyrolev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'partyrolev1grid button[action=edit]': {
                click: this.edit
            },
            'partyrolev1principalwindow button[action=update]': {
                click: this.update
            },
            'partyrolev1grid actioncolumn[action=showPlayerRoleRol]': {
                click: this.showPlayerRoleRol
            },
            'partyrolev1grid actioncolumn[action=showRoleRol]': {
                click: this.showRoleRol
            },
            'partyrolev1grid actioncolumn[action=showPlayerPartyPar]': {
                click: this.showPlayerPartyPar
            },
            'partyrolev1grid actioncolumn[action=showNamePar]': {
                click: this.showNamePar
            },
            'partyrolev1grid actioncolumn[action=showDesignedSpecificationPar]': {
                click: this.showDesignedSpecificationPar
            },
            'partyrolev1grid actioncolumn[action=showOwnedCapabilityPar]': {
                click: this.showOwnedCapabilityPar
            },
            'partyrolev1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'partyrolev1selectiontypewindow_ext button[action=aceptar]' : {
				click : this.initPartyRole
			},
			'#create_capability' : {
				mostrarwindowcapability: this.mostrarWindowCapability
			},
			'#edit_capability' : {
				mostrarwindowcapabilityedit: this.mostrarWindowCapabilityEdit
			},
			'capabilityv1principalwindow_ext button[action=agregarCapabilityStore]': {
                click: this.agregarCapabilityStore
            },
           'capabilityv1editstoreprincipalwindowedit_ext button[action=editarCapabilityStore]': {
                click: this.editarCapability
            }
        });
    },


	editarCapability: function(btn){
      	btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
        	var capabilityV1Record =  form.getRecord();
        	var objeto = form.getValues(false, false, false);
        	var window=Ext.ComponentQuery.query ('partyrolev1principalwindow')[Ext.ComponentQuery.query ('partyrolev1principalwindow').length-1];
        	var recordStore=window.down('#ownedCapabilityParGrid').getStore().getByInternalId(capabilityV1Record.internalId);
        	capabilityV1Record.set(objeto);
        	var capabilityV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {});
            var validations = capabilityV1Validation.createValidations (capabilityV1Record);
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
        	
        	recordStore.set(objeto);
        	window.down('#ownedCapabilityParGrid').getStore().reload();
    		btn.setDisabled(false);
    		btn.up('window').close();
    	}else{
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
    	
      mostrarWindowCapabilityEdit: function (btn) {
      	 btn.setDisabled(true);
		 var seleccion = btn.up('window').down('#ownedCapabilityParGrid').getSelectionModel().getSelection();
		 if (seleccion.length > 0) {
		 	console.log(seleccion);
            var window = Ext.widget('capabilityv1editstoreprincipalwindowedit_ext');
            if(seleccion[0].get('capabilityIdentifierCap')!==undefined && seleccion[0].get('capabilityIdentifierCap')!==null ){
            window.setTitle('Capacidad Nº ' + seleccion[0].get('capabilityIdentifierCap'));
            window.down('textfield[name="nameCap"]').setDisabled(true);

            }
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
      },
      
    agregarCapabilityStore: function(btn){
      	btn.setDisabled(true);
      	var form = btn.up('window').down('form').getForm();
      	if(form.isValid()){
	      	var objeto = form.getValues(false, true, false);
	      	var capabilityV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1', {});
	        capabilityV1.set(objeto);
	        capabilityV1.set({
	            capabilityIdentifierCap: null,
	            creationUserImo: usuario.get('userName'),
	            creationDateTimeImo: new Date(),
	            updateUserImo: usuario.get('userName'),
	            updateDateTimeImo: new Date()
	        });
	        
	        var capabilityV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {});
	        var validations = capabilityV1Validation.createValidations (capabilityV1);
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
	        
	         var window=Ext.ComponentQuery.query ('partyrolev1principalwindow')[Ext.ComponentQuery.query ('partyrolev1principalwindow').length-1];

	        if(window.down('#ownedCapabilityParGrid').getStore().findExact('nameCap', capabilityV1.get('nameCap'))==-1){
			var data=window.down('#ownedCapabilityParGrid').getStore().getProxy().getData();
 			data.push(capabilityV1.data);
 		
	 		
	 		window.down('#ownedCapabilityParGrid').getStore().getProxy().setData(data);
	 		window.down('#ownedCapabilityParGrid').getStore().reload();
	 		 
	        btn.up('window').close();                                		
			}else{
				
			crearVentana(5,'No se pudo crear porque ya existe');
				
			}
	        btn.setDisabled(false);
        	
	        
	       
      	}else{
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
    
	  mostrarWindowCapability: function(cmp){
	  	
	  	var ventana = Ext.widget('capabilityv1principalwindow_ext');
        ventana.show();
	  },

    confirmarAccion: function() {
        if (seleccion.length > 0) {
            Ext.MessageBox.show({
                title: 'Confirmar',
                msg: '¿Está seguro de eliminar/crear/modificar los campos seleccionados?',
                buttons: Ext.MessageBox.YESNO,
                fn: this.realizarAccion,
                icon: Ext.MessageBox.QUESTION
            });
        } else {
            crearVentana(5, "No hay elementos seleccionados");
        }
    },

    create: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
     
        var playerRoleRol = null;
        var roleRol = null;
        var playerPartyPar = null;
        var namePar = null;
        var nameParGrid=[];
        var preferredContactPreferencePar = null;
        var ownedCapabilityPar = null;
        var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid_ext').getStore();
        if(form.isValid()){
            
 			var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid_ext').getStore().getProxy().getData();
            if(ownedCapabilityParGrid.length>0){
                ownedCapabilityPar = [];
                for(var i=0; i<ownedCapabilityParGrid.length;++i)
                    ownedCapabilityPar.push(ownedCapabilityParGrid[i]);
                
            };
            var objeto = form.getValues(false, false, false);
            var partyRoleV1Record =  form.getRecord();
            if (partyRoleV1Record !== undefined 
                && partyRoleV1Record !== null 
                && partyRoleV1Record .get('roleIdentifierRol')!==null 
                && partyRoleV1Record .get('roleIdentifierRol')!==undefined 
                && new String(partyRoleV1Record.get('roleIdentifierRol')).indexOf('PartyRoleV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var partyRoleV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1', {});
				objeto = this.application.getConvertion().convert (objeto, partyRoleV1);
                playerPartyPar=partyRoleV1Record.get('playerPartyPar');
                //playerPartyPar.keyImo=objeto.keyImo;
                //setear fullNamePan a playerPartyPar.namePer o playerPartyPar.nameOrg
                //crear función para setear fullNamePan por typeNameImo
                if(playerPartyPar.nameOrg!== undefined && playerPartyPar.nameOrg!== null && playerPartyPar.nameOrg.length >0){
					playerPartyPar.nameOrg[0].fullNamePan=objeto.fullNamePan;
				} else if(playerPartyPar.namePer!== undefined && playerPartyPar.namePer!== null && playerPartyPar.namePer.length >0){
					playerPartyPar.namePer[0].fullNamePan=objeto.fullNamePan;
				} else if(playerPartyPar.nameVip!== undefined && playerPartyPar.nameVip!== null && playerPartyPar.nameVip.length >0){
					playerPartyPar.nameVip[0].fullNamePan=objeto.fullNamePan;
				} else if(playerPartyPar.nameVip!== undefined && playerPartyPar.nameVip!== null && playerPartyPar.nameVip.length <=0){
					var virtualPartyName=[];
					virtualPartyNameObject=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1', {});		
					virtualPartyNameObject.set({
			    		creationUserImo: usuario.get('userName'),
			    		creationDateTimeImo: new Date(),
			    		updateUserImo: usuario.get('userName'),
			    		fullNamePan: objeto.fullNamePan,
			    		updateDateTimeImo: new Date(),
					});	
					virtualPartyName.push(virtualPartyNameObject.data);
					playerPartyPar.nameVip=virtualPartyName;
				}
				
                partyRoleV1.set(objeto);
                partyRoleV1.set({
                    roleIdentifierRol: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    playerPartyPar: playerPartyPar,
                    ownedCapabilityPar: ownedCapabilityPar,
                    keyImo: playerPartyPar.keyImo,
                });
                var partyRoleV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Validation', {});
                var validations = partyRoleV1Validation.createValidations (partyRoleV1);
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
                partyRoleV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1').reload();
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

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('partyrolev1principalwindow');
            window.setTitle('Rol de Usuario Nº ' + seleccion[0].get('roleIdentifierRol'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="keyImo"]').setValue(seleccion[0].data.playerPartyPar.keyImo);
             window.down('textfield[name="keyImo"]').setDisabled(true);
            //cargar nombre
            if(seleccion[0].data.playerPartyPar!== undefined && seleccion[0].data.playerPartyPar!== null ){
            	if(seleccion[0].data.playerPartyPar.nameOrg!== undefined && seleccion[0].data.playerPartyPar.nameOrg!== null && seleccion[0].data.playerPartyPar.nameOrg.length >0){
            		window.down('textfield[name="fullNamePan"]').setValue(seleccion[0].data.playerPartyPar.nameOrg[0].fullNamePan);
            	} else if(seleccion[0].data.playerPartyPar.namePer!== undefined && seleccion[0].data.playerPartyPar.namePer!== null && seleccion[0].data.playerPartyPar.namePer.length >0){
           			window.down('textfield[name="fullNamePan"]').setValue(seleccion[0].data.playerPartyPar.namePer[0].fullNamePan);
            	} else if(seleccion[0].data.playerPartyPar.nameVip!== undefined && seleccion[0].data.playerPartyPar.nameVip!== null && seleccion[0].data.playerPartyPar.nameVip.length >0){
           			window.down('textfield[name="fullNamePan"]').setValue(seleccion[0].data.playerPartyPar.nameVip[0].fullNamePan);
            	}
            }
            
            //cargar capability
            var data = window.down('#ownedCapabilityParGrid').getStore().getProxy().getData();
	 		for(var i=0;i<seleccion[0].data.ownedCapabilityPar.length;++i){
	 			data=window.down('#ownedCapabilityParGrid').getStore().getProxy().getData();
	 			data.push(seleccion[0].data.ownedCapabilityPar[i]);
	 		}
	 		data.sort(function(a,b){
			    if(a.capabilityIdentifierCap == b.capabilityIdentifierCap)
			        return 0;
			    if(a.capabilityIdentifierCap < b.capabilityIdentifierCap)
			        return -1;
			    if(a.capabilityIdentifierCap > b.capabilityIdentifierCap)
			        return 1;
			});
	 		window.down('#ownedCapabilityParGrid').getStore().getProxy().setData(data);
	 		window.down('#ownedCapabilityParGrid').getStore().reload();
			//window.down('#ownedCapabilityParGrid').getStore().loadRawData(seleccion[0].data.ownedCapabilityPar,true);
            //window.down('#ownedCapabilityParGrid').getStore().load();
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var playerRoleRol = null;
        var playerRoleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var roleRol = null;
        var roleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var playerPartyPar = null;
        var playerPartyParGrid = btn.up('window').down('partyv1grid').getStore();
        var namePar = null;
        var nameParGrid = btn.up('window').down('partynamev1grid').getStore();
        var designedSpecificationPar = null;
        var designedSpecificationParGrid = btn.up('window').down('specificationv1grid').getStore();
        var ownedCapabilityPar = null;
        var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid').getStore();
        if(form.isValid()
            && playerRoleRolGrid.count()>0
            && roleRolGrid.count()>0
            && playerPartyParGrid.count()>0
            && nameParGrid.count()>0
            && designedSpecificationParGrid.count()>0
        ){
            if(playerRoleRolGrid.count()>0){
                playerRoleRol = playerRoleRolGrid.getAt(0).data;
            };
            if(roleRolGrid.count()>0){
                roleRol = [];
                roleRolGrid.each(function(rec){
                    roleRol.push(rec.data);
                });
            };
            if(playerPartyParGrid.count()>0){
                playerPartyPar = playerPartyParGrid.getAt(0).data;
            };
            if(nameParGrid.count()>0){
                namePar = nameParGrid.getAt(0).data;
            };
            if(designedSpecificationParGrid.count()>0){
                designedSpecificationPar = [];
                designedSpecificationParGrid.each(function(rec){
                    designedSpecificationPar.push(rec.data);
                });
            };
            if(ownedCapabilityParGrid.count()>0){
                ownedCapabilityPar = [];
                ownedCapabilityParGrid.each(function(rec){
                    ownedCapabilityPar.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var partyRoleV1Record =  form.getRecord();
            if (partyRoleV1Record !== undefined 
                && partyRoleV1Record !== null 
                && partyRoleV1Record .get('roleIdentifierRol')!==null 
                && partyRoleV1Record .get('roleIdentifierRol')!==undefined 
                && new String(partyRoleV1Record.get('roleIdentifierRol')).indexOf('PartyRoleV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var partyRoleV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1', {});
                partyRoleV1.set(objeto);
                partyRoleV1.set({
                    roleIdentifierRol: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    playerRoleRol: playerRoleRol,
                    roleRol: roleRol,
                    playerPartyPar: playerPartyPar,
                    namePar: namePar,
                    designedSpecificationPar: designedSpecificationPar,
                    ownedCapabilityPar: ownedCapabilityPar
                });
                var partyRoleV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Validation', {});
                var validations = partyRoleV1Validation.createValidations (partyRoleV1);
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
                    return false;
                }
                return partyRoleV1;
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
            if(playerRoleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerRoleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(roleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#roleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(playerPartyParGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerPartyParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(nameParGrid.count()==0){
                var label = btn.up('window').down('form').down('#nameParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(designedSpecificationParGrid.count()==0){
                var label = btn.up('window').down('form').down('#designedSpecificationParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
        }
    },

    deleteElement: function (btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            Ext.MessageBox.show({
                title: 'Confirmar',
                msg: '¿Está seguro de eliminar los campos seleccionados?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(rec){
                    if( rec === "yes"){
                        seleccion[0].set({
                            updateUserImo : usuario.get('userName'),
                            updateDateTimeImo : new Date()
                        });
                        seleccion[0].erase ({
                            callback: function (record, operation) {
                                if (operation.success === true) {
                                    var respuesta = Ext.decode(operation._response.responseText);
                                    if (respuesta.valido === true) {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1').reload();
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                    }
                                    btn.setDisabled(false);
                                } else {
                                    if (operation.error) {
                                        crearVentana (5, "Error de conexión");
                                        btn.setDisabled(false);
                                    }
                                }
                            },
                            success: function(rec,st){
                                btn.setDisabled(false);
                            },
                            failure: function(rec,st,a,b,c){
                                btn.setDisabled(false);
                            }
                        });
                    } else {
                        btn.setDisabled(false);
                    }
                }
            });
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    update: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
           
            var playerPartyPar = null;
           
            var ownedCapabilityPar = null;
            var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid_ext').getStore().getProxy().getData();
            if(ownedCapabilityParGrid.length>0){
                ownedCapabilityPar = [];
                for(var i=0; i<ownedCapabilityParGrid.length;++i)
                    ownedCapabilityPar.push(ownedCapabilityParGrid[i]);
                
            };
        var objeto = form.getValues(false, false, false);
        var partyRoleV1 = form.getRecord();
        var playerPartyPar=partyRoleV1.get('playerPartyPar');
		objeto = this.application.getConvertion().convert (objeto, partyRoleV1);
        var namePar=partyRoleV1.get('namePar');
        //playerPartyPar.keyImo=objeto.keyImo;
        //setear fullNamePan a playerPartyPar.namePer o playerPartyPar.nameOrg
        //crear función para setear fullNamePan por typeNameImo
        if(playerPartyPar.nameOrg!== undefined && playerPartyPar.nameOrg!== null && playerPartyPar.nameOrg.length > 0){
			playerPartyPar.nameOrg[0].fullNamePan=objeto.fullNamePan;
		} else if(playerPartyPar.namePer!== undefined && playerPartyPar.namePer!== null && playerPartyPar.namePer.length > 0){
			playerPartyPar.namePer[0].fullNamePan=objeto.fullNamePan;
		} else if(playerPartyPar.nameVip!== undefined && playerPartyPar.nameVip!== null && playerPartyPar.nameVip.length > 0){
			playerPartyPar.nameVip[0].fullNamePan=objeto.fullNamePan;
		} else if(playerPartyPar.nameVip!== undefined && playerPartyPar.nameVip!== null && playerPartyPar.nameVip.length <=0){
			var virtualPartyName=[];
			virtualPartyNameObject=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1', {});		
			virtualPartyNameObject.set({
	    		creationUserImo: usuario.get('userName'),
	    		creationDateTimeImo: new Date(),
	    		updateUserImo: usuario.get('userName'),
	    		fullNamePan: objeto.fullNamePan,
	    		updateDateTimeImo: new Date(),
			});	
			virtualPartyName.push(virtualPartyNameObject.data);
			playerPartyPar.nameVip=virtualPartyName;
		}
        partyRoleV1.set (objeto);
        partyRoleV1.set({
            playerPartyPar: playerPartyPar,
            ownedCapabilityPar: ownedCapabilityPar,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var partyRoleV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Validation', {});
        var validations = partyRoleV1Validation.createValidations (partyRoleV1);
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
        partyRoleV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1').reload();
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
                crearVentana (5, "Error de conexión");
            }
        });
    },

   mostrarWindows: function(btn) {
        btn.setDisabled(true);
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
        //this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.widget('partyrolev1selectiontypewindow_ext');
        ventana.show();
        btn.setDisabled(false);
    },

    showPlayerRoleRol: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'rolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('playerRoleRol')!=null){
            data.push(rec.get('playerRoleRol'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    showRoleRol: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'rolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('roleRol')!=null){
            data.push(rec.get('roleRol'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    showPlayerPartyPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partyv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('playerPartyPar')!=null){
            data.push(rec.get('playerPartyPar'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    showNamePar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partynamev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('namePar')!=null){
            data.push(rec.get('namePar'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    showDesignedSpecificationPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'specificationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('designedSpecificationPar')!=null){
            data.push(rec.get('designedSpecificationPar'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    showOwnedCapabilityPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'capabilityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('ownedCapabilityPar')!=null){
            data.push(rec.get('ownedCapabilityPar'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.keyImo_fs != "" && paramValues.keyImo_fs != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'playerPartyPar<>keyImo',
                    valor: paramValues.keyImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
            }

            if (paramValues.fullNamePan_fs != "" && paramValues.fullNamePan_fs != null) {
                var fullNamePan = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'playerPartyPar<>nameVip<>fullNamePan',
                    valor: paramValues.fullNamePan_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(fullNamePan.data);
            }
            
            if (paramValues.roleIdentifierRol_fs != "" && paramValues.roleIdentifierRol_fs != null) {
                var roleIdentifierRol = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'roleIdentifierRol',
                    valor: paramValues.roleIdentifierRol_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(roleIdentifierRol.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('partyrolev1formsearch').query("field{isValid()==false}");
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
    
     initPartyRole: function(btn) {
    	var me = this;		
		var window=	btn.up('window');
 		var rol=window.down('textfield[name="rol"]').value;
 		if(window.down('textfield[name="rol"]').isValid()){
 		 	var type = 'VirtualParty';
			var storeName = 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.VirtualPartyV1';

			
			var storeParty = me.createStoreParty(storeName, type, rol);
			
			storeParty.load({
				callback : function(records, operation, success) {
					var windowPartyRole= Ext.widget('partyrolev1principalwindow');

					if (success) {
						if (records !== null && records.length > 0) {
						    var storePartyRole = me.createStore('PartyRole', 'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1', records[0].get('partyIdentifierPar'),'playerPartyPar.partyIdentifierPar');
							var playerPartyPar = records[0];
							storePartyRole.load({
								callback : function(records, operation, success) {
									if (records !== null && records.length > 0) {
										//si existe con el rol requerido no permite el ingreso
										//e indica que debe buscarlo y editarlo
										crearVentana (3, "El rol ya existe. Para editarlo debe buscarlo");
										console.log('si existe');
									} else {
										me.__newPartyRole(windowPartyRole, playerPartyPar);
									}
								}
							});
						} else {
							me.__newEmptyPartyRole(windowPartyRole, rol, 'VirtualParty');
						}
					}
					window.close();
            }        	
        });

 		   
 			
 	    }else{
 	    	invalidFields = btn.up('window').query("field{isValid()==false}");
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
   
    createStore: function (type, storeName, id,campo) {
		var store = Ext.create (storeName);
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

    createStoreParty: function (storeName, typeParty, rol) {
		var storeParty = Ext.getStore (storeName);
			
	   	var filtro = [];
	   	var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'keyImo',
                valor:  rol,
                operacion: '=',
                tipoValor: 'string'
            });
       	filtro.push(keyImo.data);
       	storeParty.getProxy().setExtraParam('filters', Ext.encode(filtro));	
       	return storeParty;
	},
	
	__newEmptyPartyRole : function(window, rut, type) {
		var playerPartyPar = this.___createParty(rut, type);
		this.__newPartyRole(window, playerPartyPar);
	},
	
	__newPartyRole : function(window, playerPartyPar) {
		var partyroleyv1=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',{});
		partyroleyv1.set({
			'playerPartyPar' : playerPartyPar.data
		});
		
		
		this.loadPartyRole(window, partyroleyv1);
	},
	
	loadPartyRole : function(window, partyroleyv1) {
		window.down('form').getForm().loadRecord(partyroleyv1);
		window.down('textfield[name="keyImo"]').setDisabled(true);
		this.loadPartyRoleData(window, partyroleyv1);
		window.show();
	},
	
	loadPartyRoleData : function(window, record) {
		this._loadPartyData(window, record);
	},
	
	_loadPartyData: function (window, record) {
		if(record.data.playerPartyPar!== undefined && record.data.playerPartyPar!== null){
			window.down('textfield[name="keyImo"]').setValue(record.data.playerPartyPar.keyImo);
			window.down('datefield[name="rolePlayerPeriodStartDateTimeRol"]').setValue(record.data.rolePlayerPeriodStartDateTimeRol);
			window.down('datefield[name="rolePlayerPeriodEndDateTimeRol"]').setValue(record.data.rolePlayerPeriodEndDateTimeRol);
			window.down('textareafield[name="descriptionRol"]').setValue(record.data.descriptionRol);
			if(record.data.playerPartyPar.nameOrg!== undefined && record.data.playerPartyPar.nameOrg!== null && record.data.playerPartyPar.nameOrg.length >=0){
				window.down('textfield[name="fullNamePan"]').setValue(record.data.namePar[0].fullNamePan);
			} else if(record.data.playerPartyPar.namePer!== undefined && record.data.playerPartyPar.namePer!== null && record.data.playerPartyPar.namePer.length >=0){
				window.down('textfield[name="fullNamePan"]').setValue(record.data.playerPartyPar.namePer[0].fullNamePan);
			}
		}
		
		if(record.data.namePar!==undefined && record.data.namePar!==null){
			window.down('textfield[name="fullNamePan"]').setValue(record.data.namePar.fullNamePan);
		}

	},
	
	___createParty: function (rut, type) {
		var playerPartyPar = null;
		var virtualPartyNameObject=null;
		var virtualPartyName=[];
		virtualPartyNameObject=Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1', {});		
		virtualPartyNameObject.set({
    		creationUserImo: usuario.get('userName'),
    		creationDateTimeImo: new Date(),
    		updateUserImo: usuario.get('userName'),
    		updateDateTimeImo: new Date(),
		});	
		virtualPartyName.push(virtualPartyNameObject.data);

		playerPartyPar = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.VirtualPartyV1', {});		
		
		playerPartyPar.set({
         	keyImo: rut,
    		creationUserImo: usuario.get('userName'),
    		creationDateTimeImo: new Date(),
    		updateUserImo: usuario.get('userName'),
    		updateDateTimeImo: new Date(),
    		nameVip: virtualPartyName
		});	
		
		return playerPartyPar;
	},

});
