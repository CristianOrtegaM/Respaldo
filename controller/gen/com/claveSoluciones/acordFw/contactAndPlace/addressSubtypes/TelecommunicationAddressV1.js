Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1Validation'
            ],

    init: function() {
        this.control({
            'telecommunicationaddressv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'telecommunicationaddressv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'telecommunicationaddressv1principalwindow button[action=create]': {
                click: this.create
            },
            'telecommunicationaddressv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'telecommunicationaddressv1grid button[action=edit]': {
                click: this.edit
            },
            'telecommunicationaddressv1principalwindow button[action=update]': {
                click: this.update
            },
            'telecommunicationaddressv1grid button[action=mostrarWindows]': {
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
            var telecommunicationAddressV1Record =  form.getRecord();
            if (telecommunicationAddressV1Record !== undefined 
                && telecommunicationAddressV1Record !== null 
                && telecommunicationAddressV1Record .get('addressIdentifierAdd')!==null 
                && telecommunicationAddressV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(telecommunicationAddressV1Record.get('addressIdentifierAdd')).indexOf('TelecommunicationAddressV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var telecommunicationAddressV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1', {});
                objeto = this.application.getConvertion().convert (objeto, telecommunicationAddressV1);
                telecommunicationAddressV1.set(objeto);
                telecommunicationAddressV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var telecommunicationAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1Validation', {});
                var validations = telecommunicationAddressV1Validation.createValidations (telecommunicationAddressV1);
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
                telecommunicationAddressV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1').reload();
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
            var window = Ext.widget('telecommunicationaddressv1principalwindow');
            window.setTitle('Dirección de Telecomunicaciones Nº ' + seleccion[0].get('addressIdentifierAdd'));
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
            var telecommunicationAddressV1Record =  form.getRecord();
            if (telecommunicationAddressV1Record !== undefined 
                && telecommunicationAddressV1Record !== null 
                && telecommunicationAddressV1Record .get('addressIdentifierAdd')!==null 
                && telecommunicationAddressV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(telecommunicationAddressV1Record.get('addressIdentifierAdd')).indexOf('TelecommunicationAddressV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var telecommunicationAddressV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1', {});
                telecommunicationAddressV1.set(objeto);
                telecommunicationAddressV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var telecommunicationAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1Validation', {});
                var validations = telecommunicationAddressV1Validation.createValidations (telecommunicationAddressV1);
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
                return telecommunicationAddressV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1').reload();
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
        var telecommunicationAddressV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, telecommunicationAddressV1);
        telecommunicationAddressV1.set (objeto);
        telecommunicationAddressV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var telecommunicationAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1Validation', {});
        var validations = telecommunicationAddressV1Validation.createValidations (telecommunicationAddressV1);
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
        telecommunicationAddressV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1').reload();
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
        var ventana = Ext.widget('telecommunicationaddressv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.addressIdentifierAdd_fs != "" && paramValues.addressIdentifierAdd_fs != null) {
                var addressIdentifierAdd = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'addressIdentifierAdd',
                    valor: paramValues.addressIdentifierAdd_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(addressIdentifierAdd.data);
            }

            if (paramValues.creationUserImo_fs != "" && paramValues.creationUserImo_fs != null) {
                var creationUserImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'creationUserImo',
                    valor: paramValues.creationUserImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(creationUserImo.data);
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

            if (paramValues.keyImo_fs != "" && paramValues.keyImo_fs != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
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

            if (paramValues.identifierNea_fs != "" && paramValues.identifierNea_fs != null) {
                var identifierNea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'identifierNea',
                    valor: paramValues.identifierNea_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(identifierNea.data);
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

            if (paramValues.localNumberTea_fs != "" && paramValues.localNumberTea_fs != null) {
                var localNumberTea = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'localNumberTea',
                    valor: paramValues.localNumberTea_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(localNumberTea.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('telecommunicationaddressv1formsearch').query("field{isValid()==false}");
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
