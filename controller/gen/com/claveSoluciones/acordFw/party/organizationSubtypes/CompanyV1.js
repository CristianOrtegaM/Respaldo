Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Validation'
            ],

    init: function() {
        this.control({
            'companyv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'companyv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'companyv1principalwindow button[action=create]': {
                click: this.create
            },
            'companyv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'companyv1grid button[action=edit]': {
                click: this.edit
            },
            'companyv1principalwindow button[action=update]': {
                click: this.update
            },
            'companyv1grid actioncolumn[action=showNameOrg]': {
                click: this.showNameOrg
            },
            'companyv1grid actioncolumn[action=showPlayingRegistryAuthorityOrg]': {
                click: this.showPlayingRegistryAuthorityOrg
            },
            'companyv1grid button[action=mostrarWindows]': {
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
        var nameOrgGrid = btn.up('window').down('organizationnamev1grid').getStore();
        var playingRegistryAuthorityOrg = null;
        var playingRegistryAuthorityOrgGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(form.isValid()
            && nameOrgGrid.count()>0
        ){
            if(nameOrgGrid.count()>0){
                nameOrg = [];
                nameOrgGrid.each(function(rec){
                    nameOrg.push(rec.data);
                });
            };
            if(playingRegistryAuthorityOrgGrid.count()>0){
                playingRegistryAuthorityOrg = [];
                playingRegistryAuthorityOrgGrid.each(function(rec){
                    playingRegistryAuthorityOrg.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var companyV1Record =  form.getRecord();
            if (companyV1Record !== undefined 
                && companyV1Record !== null 
                && companyV1Record .get('partyIdentifierPar')!==null 
                && companyV1Record .get('partyIdentifierPar')!==undefined 
                && new String(companyV1Record.get('partyIdentifierPar')).indexOf('CompanyV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var companyV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1', {});
                objeto = this.application.getConvertion().convert (objeto, companyV1);
                companyV1.set(objeto);
                companyV1.set({
                    partyIdentifierPar: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    nameOrg: nameOrg,
                    playingRegistryAuthorityOrg: playingRegistryAuthorityOrg
                });
                var companyV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Validation', {});
                var validations = companyV1Validation.createValidations (companyV1);
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
                companyV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1').reload();
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
            var window = Ext.widget('companyv1principalwindow');
            window.setTitle('Empresa Nº ' + seleccion[0].get('partyIdentifierPar'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var nameOrgGrid = Ext.ComponentQuery.query('#nameOrgGrid')[0];
            nameOrgGrid.getStore().loadRawData(seleccion[0].get('nameOrg')[0], true);
            var playingRegistryAuthorityOrgGrid = Ext.ComponentQuery.query('#playingRegistryAuthorityOrgGrid')[0];
            playingRegistryAuthorityOrgGrid.getStore().loadRawData(seleccion[0].get('playingRegistryAuthorityOrg')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var nameOrg = null;
        var nameOrgGrid = btn.up('window').down('organizationnamev1grid').getStore();
        var playingRegistryAuthorityOrg = null;
        var playingRegistryAuthorityOrgGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(form.isValid()
            && nameOrgGrid.count()>0
        ){
            if(nameOrgGrid.count()>0){
                nameOrg = [];
                nameOrgGrid.each(function(rec){
                    nameOrg.push(rec.data);
                });
            };
            if(playingRegistryAuthorityOrgGrid.count()>0){
                playingRegistryAuthorityOrg = [];
                playingRegistryAuthorityOrgGrid.each(function(rec){
                    playingRegistryAuthorityOrg.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var companyV1Record =  form.getRecord();
            if (companyV1Record !== undefined 
                && companyV1Record !== null 
                && companyV1Record .get('partyIdentifierPar')!==null 
                && companyV1Record .get('partyIdentifierPar')!==undefined 
                && new String(companyV1Record.get('partyIdentifierPar')).indexOf('CompanyV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var companyV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1', {});
                companyV1.set(objeto);
                companyV1.set({
                    partyIdentifierPar: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    nameOrg: nameOrg,
                    playingRegistryAuthorityOrg: playingRegistryAuthorityOrg
                });
                var companyV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Validation', {});
                var validations = companyV1Validation.createValidations (companyV1);
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
                return companyV1;
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
            return false;
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('companyv1principalwindow');
            window.setTitle('Empresa Nº ' + seleccion[0].get('partyIdentifierPar'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var nameOrgGrid = Ext.ComponentQuery.query('#nameOrgGrid')[0];
            nameOrgGrid.getStore().loadRawData(seleccion[0].get('nameOrg')[0], true);
            var playingRegistryAuthorityOrgGrid = Ext.ComponentQuery.query('#playingRegistryAuthorityOrgGrid')[0];
            playingRegistryAuthorityOrgGrid.getStore().loadRawData(seleccion[0].get('playingRegistryAuthorityOrg')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1').reload();
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
            var nameOrgGrid = btn.up('window').down('organizationnamev1grid').getStore();
            if(nameOrgGrid.count()>0){
                nameOrg = [];
                nameOrgGrid.each(function(rec){
                    nameOrg.push(rec.data);
                });
            };
            var playingRegistryAuthorityOrg = null;
            var playingRegistryAuthorityOrgGrid = btn.up('window').down('registryauthorityv1grid').getStore();
            if(playingRegistryAuthorityOrgGrid.count()>0){
                playingRegistryAuthorityOrg = [];
                playingRegistryAuthorityOrgGrid.each(function(rec){
                    playingRegistryAuthorityOrg.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var companyV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, companyV1);
        companyV1.set (objeto);
        companyV1.set({
            nameOrg: nameOrg,
            playingRegistryAuthorityOrg: playingRegistryAuthorityOrg,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var companyV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Validation', {});
        var validations = companyV1Validation.createValidations (companyV1);
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
        companyV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1').reload();
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
        var ventana = Ext.widget('companyv1principalwindow');
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1');
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

            if (paramValues.keyImo_fs != "" && paramValues.keyImo_fs != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
            }

            if (paramValues.typeNameImo_fs != "" && paramValues.typeNameImo_fs != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            if (paramValues.memberCountOrg_fs != "" && paramValues.memberCountOrg_fs != null) {
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
            invalidFields = btn.up('viewport').down('companyv1formsearch').query("field{isValid()==false}");
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
