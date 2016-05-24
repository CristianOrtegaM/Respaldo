Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1Validation'
            ],

    init: function() {
        this.control({
            'communicationcontenttemplatev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'communicationcontenttemplatev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'communicationcontenttemplatev1principalwindow button[action=create]': {
                click: this.create
            },
            'communicationcontenttemplatev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'communicationcontenttemplatev1grid button[action=edit]': {
                click: this.edit
            },
            'communicationcontenttemplatev1principalwindow button[action=update]': {
                click: this.update
            },
            'communicationcontenttemplatev1grid button[action=mostrarWindows]': {
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
            var communicationContentTemplateV1Record =  form.getRecord();
            if (communicationContentTemplateV1Record !== undefined 
                && communicationContentTemplateV1Record !== null 
                && communicationContentTemplateV1Record .get('specificationIdentifierSpe')!==null 
                && communicationContentTemplateV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(communicationContentTemplateV1Record.get('specificationIdentifierSpe')).indexOf('CommunicationContentTemplateV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var communicationContentTemplateV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1', {});
                objeto = this.application.getConvertion().convert (objeto, communicationContentTemplateV1);
                communicationContentTemplateV1.set(objeto);
                communicationContentTemplateV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var communicationContentTemplateV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1Validation', {});
                var validations = communicationContentTemplateV1Validation.createValidations (communicationContentTemplateV1);
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
                communicationContentTemplateV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1').reload();
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
            var window = Ext.widget('communicationcontenttemplatev1principalwindow');
            window.setTitle('Plantilla de Contenido de Comunicación Nº ' + seleccion[0].get('specificationIdentifierSpe'));
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
            var communicationContentTemplateV1Record =  form.getRecord();
            if (communicationContentTemplateV1Record !== undefined 
                && communicationContentTemplateV1Record !== null 
                && communicationContentTemplateV1Record .get('specificationIdentifierSpe')!==null 
                && communicationContentTemplateV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(communicationContentTemplateV1Record.get('specificationIdentifierSpe')).indexOf('CommunicationContentTemplateV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var communicationContentTemplateV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1', {});
                communicationContentTemplateV1.set(objeto);
                communicationContentTemplateV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var communicationContentTemplateV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1Validation', {});
                var validations = communicationContentTemplateV1Validation.createValidations (communicationContentTemplateV1);
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
                return communicationContentTemplateV1;
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

    edit: function (btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('communicationcontenttemplatev1principalwindow');
            window.setTitle('Plantilla de Contenido de Comunicación Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1').reload();
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
        var communicationContentTemplateV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, communicationContentTemplateV1);
        communicationContentTemplateV1.set (objeto);
        communicationContentTemplateV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var communicationContentTemplateV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1Validation', {});
        var validations = communicationContentTemplateV1Validation.createValidations (communicationContentTemplateV1);
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
        communicationContentTemplateV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1').reload();
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
        var ventana = Ext.widget('communicationcontenttemplatev1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.kindOfElementNameSpe_fs != "" && paramValues.kindOfElementNameSpe_fs != null) {
                var kindOfElementNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'kindOfElementNameSpe',
                    valor: paramValues.kindOfElementNameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(kindOfElementNameSpe.data);
            }

            if (paramValues.titleCcs_fs != "" && paramValues.titleCcs_fs != null) {
                var titleCcs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'titleCcs',
                    valor: paramValues.titleCcs_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(titleCcs.data);
            }

            if (paramValues.versionNumberCcs_fs != "" && paramValues.versionNumberCcs_fs != null) {
                var versionNumberCcs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'versionNumberCcs',
                    valor: paramValues.versionNumberCcs_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(versionNumberCcs.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('communicationcontenttemplatev1formsearch').query("field{isValid()==false}");
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
