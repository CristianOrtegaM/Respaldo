Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Validation'
            ],

    init: function() {
        this.control({
            'municipalityv2formsearch button[action=buscar]': {
                click: this.buscar
            },
            'municipalityv2grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'municipalityv2principalwindow button[action=create]': {
                click: this.create
            },
            'municipalityv2grid button[action=delete]': {
                click: this.deleteElement
            },
            'municipalityv2grid button[action=edit]': {
                click: this.edit
            },
            'municipalityv2principalwindow button[action=update]': {
                click: this.update
            },
            'municipalityv2grid button[action=mostrarWindows]': {
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
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var municipalityV2Record =  form.getRecord();
            if (municipalityV2Record !== undefined 
                && municipalityV2Record !== null 
                && municipalityV2Record .get('placeIdentifierPla')!==null 
                && municipalityV2Record .get('placeIdentifierPla')!==undefined 
                && new String(municipalityV2Record.get('placeIdentifierPla')).indexOf('MunicipalityV2') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var municipalityV2 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2', {});
                objeto = this.application.getConvertion().convert (objeto, municipalityV2);
                municipalityV2.set(objeto);
                municipalityV2.set({
                    placeIdentifierPla: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var municipalityV2Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Validation', {});
                var validations = municipalityV2Validation.createValidations (municipalityV2);
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
                municipalityV2.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2').reload();
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
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('municipalityv2principalwindow');
            window.setTitle('Comuna Nº ' + seleccion[0].get('placeIdentifierPla'));
            window.down('form').getForm().loadRecord(seleccion[0]);
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
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var municipalityV2Record =  form.getRecord();
            if (municipalityV2Record !== undefined 
                && municipalityV2Record !== null 
                && municipalityV2Record .get('placeIdentifierPla')!==null 
                && municipalityV2Record .get('placeIdentifierPla')!==undefined 
                && new String(municipalityV2Record.get('placeIdentifierPla')).indexOf('MunicipalityV2') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var municipalityV2 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2', {});
                municipalityV2.set(objeto);
                municipalityV2.set({
                    placeIdentifierPla: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var municipalityV2Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Validation', {});
                var validations = municipalityV2Validation.createValidations (municipalityV2);
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
                return municipalityV2;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2').reload();
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
        var objeto = form.getValues(false, true, false);
        var municipalityV2 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, municipalityV2);
        municipalityV2.set (objeto);
        municipalityV2.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var municipalityV2Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Validation', {});
        var validations = municipalityV2Validation.createValidations (municipalityV2);
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
        municipalityV2.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2').reload();
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
        var ventana = Ext.widget('municipalityv2principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.placeIdentifierPla_fs != "" && paramValues.placeIdentifierPla_fs != null) {
                var placeIdentifierPla = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'placeIdentifierPla',
                    valor: paramValues.placeIdentifierPla_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(placeIdentifierPla.data);
            }

            if (paramValues.namePla_fs != "" && paramValues.namePla_fs != null) {
                var namePla = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'namePla',
                    valor: paramValues.namePla_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(namePla.data);
            }

            if (paramValues.assignedExternalCodeMun_fs != "" && paramValues.assignedExternalCodeMun_fs != null) {
                var assignedExternalCodeMun = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'assignedExternalCodeMun',
                    valor: paramValues.assignedExternalCodeMun_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(assignedExternalCodeMun.data);
            }

            if (paramValues.administrativeSubDivisionCodeMun_fs != "" && paramValues.administrativeSubDivisionCodeMun_fs != null) {
                var administrativeSubDivisionCodeMun = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'administrativeSubDivisionCodeMun',
                    valor: paramValues.administrativeSubDivisionCodeMun_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.AdministrativeSubDivisionCodeList'
                });
                filtro.push(administrativeSubDivisionCodeMun.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('municipalityv2formsearch').query("field{isValid()==false}");
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
