Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Validation'
            ],

    init: function() {
        this.control({
            'telephonenumberv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'telephonenumberv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'telephonenumberv1principalwindow button[action=create]': {
                click: this.create
            },
            'telephonenumberv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'telephonenumberv1grid button[action=edit]': {
                click: this.edit
            },
            'telephonenumberv1principalwindow button[action=update]': {
                click: this.update
            },
            'telephonenumberv1grid button[action=mostrarWindows]': {
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
            var telephoneNumberV1Record =  form.getRecord();
            if (telephoneNumberV1Record !== undefined 
                && telephoneNumberV1Record !== null 
                && telephoneNumberV1Record .get('addressIdentifierAdd')!==null 
                && telephoneNumberV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(telephoneNumberV1Record.get('addressIdentifierAdd')).indexOf('TelephoneNumberV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var telephoneNumberV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1', {});
                objeto = this.application.getConvertion().convert (objeto, telephoneNumberV1);
                telephoneNumberV1.set(objeto);
                telephoneNumberV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var telephoneNumberV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Validation', {});
                var validations = telephoneNumberV1Validation.createValidations (telephoneNumberV1);
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
                telephoneNumberV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1').reload();
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
            var window = Ext.widget('telephonenumberv1principalwindow');
            window.setTitle('Número de Teléfono Nº ' + seleccion[0].get('addressIdentifierAdd'));
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
            var telephoneNumberV1Record =  form.getRecord();
            if (telephoneNumberV1Record !== undefined 
                && telephoneNumberV1Record !== null 
                && telephoneNumberV1Record .get('addressIdentifierAdd')!==null 
                && telephoneNumberV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(telephoneNumberV1Record.get('addressIdentifierAdd')).indexOf('TelephoneNumberV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var telephoneNumberV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1', {});
                telephoneNumberV1.set(objeto);
                telephoneNumberV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var telephoneNumberV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Validation', {});
                var validations = telephoneNumberV1Validation.createValidations (telephoneNumberV1);
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
                return telephoneNumberV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1').reload();
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
        var telephoneNumberV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, telephoneNumberV1);
        telephoneNumberV1.set (objeto);
        telephoneNumberV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var telephoneNumberV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Validation', {});
        var validations = telephoneNumberV1Validation.createValidations (telephoneNumberV1);
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
        telephoneNumberV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1').reload();
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
        var ventana = Ext.widget('telephonenumberv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.areaExternalCodeTen_fs != "" && paramValues.areaExternalCodeTen_fs != null) {
                var areaExternalCodeTen = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'areaExternalCodeTen',
                    valor: paramValues.areaExternalCodeTen_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(areaExternalCodeTen.data);
            }

            if (paramValues.countryExternalCodeTen_fs != "" && paramValues.countryExternalCodeTen_fs != null) {
                var countryExternalCodeTen = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'countryExternalCodeTen',
                    valor: paramValues.countryExternalCodeTen_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(countryExternalCodeTen.data);
            }

            if (paramValues.extensionTen_fs != "" && paramValues.extensionTen_fs != null) {
                var extensionTen = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'extensionTen',
                    valor: paramValues.extensionTen_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(extensionTen.data);
            }

            if (paramValues.fullNumberTen_fs != "" && paramValues.fullNumberTen_fs != null) {
                var fullNumberTen = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'fullNumberTen',
                    valor: paramValues.fullNumberTen_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(fullNumberTen.data);
            }

            if (paramValues.identifierNea_fs != "" && paramValues.identifierNea_fs != null) {
                var identifierNea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'identifierNea',
                    valor: paramValues.identifierNea_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(identifierNea.data);
            }

            if (paramValues.localNumberTea_fs != "" && paramValues.localNumberTea_fs != null) {
                var localNumberTea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'localNumberTea',
                    valor: paramValues.localNumberTea_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(localNumberTea.data);
            }

            if (paramValues.networkAddressKindNea_fs != "" && paramValues.networkAddressKindNea_fs != null) {
                var networkAddressKindNea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'networkAddressKindNea',
                    valor: paramValues.networkAddressKindNea_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.NetworkAddressKTypeCodeList'
                });
                filtro.push(networkAddressKindNea.data);
            }

            if (paramValues.telecommunicationAddressKindTea_fs != "" && paramValues.telecommunicationAddressKindTea_fs != null) {
                var telecommunicationAddressKindTea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'telecommunicationAddressKindTea',
                    valor: paramValues.telecommunicationAddressKindTea_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(telecommunicationAddressKindTea.data);
            }

            if (paramValues.trunkPrefixTen_fs != "" && paramValues.trunkPrefixTen_fs != null) {
                var trunkPrefixTen = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'trunkPrefixTen',
                    valor: paramValues.trunkPrefixTen_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(trunkPrefixTen.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('telephonenumberv1formsearch').query("field{isValid()==false}");
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
