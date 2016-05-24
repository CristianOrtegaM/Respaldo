Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.party.OrganizationV2', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.OrganizationV1',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.OrganizationV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.OrganizationV2PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.OrganizationV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.OrganizationV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.OrganizationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.OrganizationV1Validation'
            ],

    init: function() {
        this.control({
            'organizationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'organizationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'organizationv1principalwindow button[action=create]': {
                click: this.create
            },
            'organizationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'organizationv1grid button[action=edit]': {
                click: this.edit
            },
            'organizationv1principalwindow button[action=update]': {
                click: this.update
            },
            'organizationv1grid actioncolumn[action=showNameOrg]': {
                click: this.showNameOrg
            },
            'organizationv1grid actioncolumn[action=showPlayingRegistryAuthorityOrg]': {
                click: this.showPlayingRegistryAuthorityOrg
            },
            'organizationv1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            }
        });
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
        var nameOrg = null;
        var playingRegistryAuthorityOrg = null;
        var playingRegistryAuthorityOrgGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(form.isValid()
        ){
            nameOrg = [];
            if(playingRegistryAuthorityOrgGrid.count()>0){
                playingRegistryAuthorityOrg = [];
                playingRegistryAuthorityOrgGrid.each(function(rec){
                    playingRegistryAuthorityOrg.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var organizationV1Record =  form.getRecord();
            if (organizationV1Record !== undefined 
                && organizationV1Record !== null 
                && organizationV1Record .get('partyIdentifierPar')!==null 
                && organizationV1Record .get('partyIdentifierPar')!==undefined 
                && new String(organizationV1Record.get('partyIdentifierPar')).indexOf('OrganizationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
            	if(objeto.fullNamePanLegal!="" && objeto.fullNamePanLegal!=null){
            		var rec = Ext.create('AFW_FND_Xjs.model.com.claveSoluciones.acordFw.party.partyName.OrganizationName',{
            			fullNamePan: objeto.fullNamePanLegal,
            			usageCodeOrn: 'LegalName',
            			effectivePeriodStartDateTimePan: new Date(),
            			descriptionPan: objeto.fullNamePanLegal,
            			defaultIndicatorPan: true,
            			creationUserImo: usuario.get('userName'),
                        creationDateTimeImo: new Date(),
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date()
            		});
            		nameOrg.push(rec.data);
            	}
            	if(objeto.fullNamePanComercial!="" && objeto.fullNamePanComercial!=null){
            		var rec = Ext.create('AFW_FND_Xjs.model.com.claveSoluciones.acordFw.party.partyName.OrganizationName',{
            			fullNamePan: objeto.fullNamePanComercial,
            			usageCodeOrn: 'CompanyName',
            			effectivePeriodStartDateTimePan: new Date(),
            			descriptionPan: objeto.fullNamePanComercial,
            			defaultIndicatorPan: false,
            			creationUserImo: usuario.get('userName'),
                        creationDateTimeImo: new Date(),
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date()
            		});
            		nameOrg.push(rec.data);
            	}
                var organizationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1', {});
				objeto = this.application.getConvertion().convert (objeto, organizationV1);
                organizationV1.set(objeto);
                organizationV1.set({
                    partyIdentifierPar: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    nameOrg: nameOrg,
                    playingRegistryAuthorityOrg: playingRegistryAuthorityOrg
                });
                var organizationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.OrganizationV1Validation', {});
                var validations = organizationV1Validation.createValidations (organizationV1);
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
                organizationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1').reload();
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
            if(nameOrgGrid.count()==0){
                var label = btn.up('window').down('form').down('#nameOrgGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('organizationv2principalwindow');
            window.setTitle('Organización Nº ' + seleccion[0].get('partyIdentifierPar'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show(undefined, function(){
            	var playingRegistryAuthorityOrgGrid = window.down('grid[itemId="playingRegistryAuthorityOrgGrid"]').getStore();
            	if(playingRegistryAuthorityOrgGrid!=null && seleccion[0].get('playingRegistryAuthorityOrg')!=null )
                for(var k = 0; k<seleccion[0].get('playingRegistryAuthorityOrg').length;k++){
                	playingRegistryAuthorityOrgGrid.loadRawData(seleccion[0].get('playingRegistryAuthorityOrg')[k],true);
                }
            });
            for(var l=0; l<seleccion[0].get('nameOrg').length;l++){
            	if(seleccion[0].get('nameOrg')[l].usageCodeOrn=='LegalName')
            		window.down('textfield[name="fullNamePanLegal"]').setValue(seleccion[0].get('nameOrg')[l].fullNamePan);
            	 if(seleccion[0].get('nameOrg')[l].usageCodeOrn=='CompanyName')
            		window.down('textfield[name="fullNamePanComercial"]').setValue(seleccion[0].get('nameOrg')[l].fullNamePan);
            }
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1').reload();
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
        var nameOrg = null;
        nameOrg = [];
        var playingRegistryAuthorityOrg = null;
        var playingRegistryAuthorityOrgGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(playingRegistryAuthorityOrgGrid.count()>0){
            playingRegistryAuthorityOrg = [];
            playingRegistryAuthorityOrgGrid.each(function(rec){
                playingRegistryAuthorityOrg.push(rec.data);
            });
        };
        var objeto = form.getValues(false, false, false);
        var organizationV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, organizationV1);
        if(organization.get('nameOrg')!=null && organization.get('nameOrg')!=[]){
	        for(var k = 0; k<organization.get('nameOrg').length; k++){
		        if(organization.get('nameOrg')[k]!=null && organization.get('nameOrg')[k].usageCodeOrn=='LegalName'){
		    		var rec = Ext.create('AFW_FND_Xjs.model.com.claveSoluciones.acordFw.party.partyName.OrganizationName', organization.get('nameOrg')[k]);
		    		rec.set({
		    			fullNamePan: objeto.fullNamePanLegal
		    		});
		    		nameOrg.push(rec.data);
		    	} else if(organization.get('nameOrg')[k]!=null && organization.get('nameOrg')[k].usageCodeOrn=='CompanyName'){
		    		var rec = Ext.create('AFW_FND_Xjs.model.com.claveSoluciones.acordFw.party.partyName.OrganizationName', organization.get('nameOrg')[k]);
		    		rec.set({
		    			fullNamePan: objeto.fullNamePanComercial
		    		});
		    		nameOrg.push(rec.data);
		    	}
		    }
    	}
        organizationV1.set (objeto);
        organizationV1.set({
            nameOrg: nameOrg,
            playingRegistryAuthorityOrg: playingRegistryAuthorityOrg,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var organizationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.OrganizationV1Validation', {});
        var validations = organizationV1Validation.createValidations (organizationV1);
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
        organizationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1').reload();
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

    mostrarWindows: function(btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var ventana = Ext.widget('organizationv2principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showNameOrg: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'organizationnamev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1',
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
        if(rec.get('nameOrg')!=null){
            data.push(rec.get('nameOrg'));
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

    showPlayingRegistryAuthorityOrg: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'registryauthorityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',
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
        if(rec.get('playingRegistryAuthorityOrg')!=null){
            data.push(rec.get('playingRegistryAuthorityOrg'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.OrganizationV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.partyIdentifierPar_fs != "" && paramValues.partyIdentifierPar_fs != null) {
                var partyIdentifierPar = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'partyIdentifierPar',
                    valor: paramValues.partyIdentifierPar_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(partyIdentifierPar.data);
            }

            if (paramValues.typeNameImo_fs != "" && paramValues.typeNameImo_fs != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo_fs +'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            if (paramValues.memberCountOrg_fs  != "" && paramValues.memberCountOrg_fs != null) {
                var memberCountOrg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'memberCountOrg',
                    valor: paramValues.memberCountOrg_fs,
                    operacion: '=',
                    tipoValor: 'double'
                });
                filtro.push(memberCountOrg.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('organizationv1formsearch').query("field{isValid()==false}");
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
    }

});
