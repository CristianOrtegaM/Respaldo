Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation'
            ],

    init: function() {
        this.control({
            'enumerationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'enumerationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'enumerationv1principalwindow button[action=create]': {
                click: this.create
            },
            'enumerationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'enumerationv1grid button[action=edit]': {
                click: this.edit
            },
            'enumerationv1principalwindow button[action=update]': {
                click: this.update
            },
            'enumerationv1grid button[action=mostrarWindows]': {
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
            var enumerationV1Record =  form.getRecord();
            if (enumerationV1Record !== undefined 
                && enumerationV1Record !== null 
                && enumerationV1Record .get('enumerationIdentifierEnu')!==null 
                && enumerationV1Record .get('enumerationIdentifierEnu')!==undefined 
                && new String(enumerationV1Record.get('enumerationIdentifierEnu')).indexOf('EnumerationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var enumerationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1', {});
                objeto = this.application.getConvertion().convert (objeto, enumerationV1);
                enumerationV1.set(objeto);
                enumerationV1.set({
                    enumerationIdentifierEnu: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var enumerationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation', {});
                var validations = enumerationV1Validation.createValidations (enumerationV1);
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
                enumerationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1').reload();
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
            var window = Ext.widget('enumerationv1principalwindow');
            window.setTitle('Enumeración Nº ' + seleccion[0].get('enumerationIdentifierEnu'));
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
            var enumerationV1Record =  form.getRecord();
            if (enumerationV1Record !== undefined 
                && enumerationV1Record !== null 
                && enumerationV1Record .get('enumerationIdentifierEnu')!==null 
                && enumerationV1Record .get('enumerationIdentifierEnu')!==undefined 
                && new String(enumerationV1Record.get('enumerationIdentifierEnu')).indexOf('EnumerationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var enumerationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1', {});
                enumerationV1.set(objeto);
                enumerationV1.set({
                    enumerationIdentifierEnu: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var enumerationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation', {});
                var validations = enumerationV1Validation.createValidations (enumerationV1);
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
                return enumerationV1;
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
            var window = Ext.widget('enumerationv1principalwindow');
            window.setTitle('Enumeración Nº ' + seleccion[0].get('enumerationIdentifierEnu'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1').reload();
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
        var enumerationV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, enumerationV1);
        enumerationV1.set (objeto);
        enumerationV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var enumerationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation', {});
        var validations = enumerationV1Validation.createValidations (enumerationV1);
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
        enumerationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1').reload();
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
        var ventana = Ext.widget('enumerationv1principalwindow');
        var enumerationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1', {
            usableIndicatorEnu: 'true'
        });
        var form = ventana.down('form').getForm();
        form.loadRecord(enumerationV1);
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.enumerationIdentifierEnu != "" && paramValues.enumerationIdentifierEnu != null) {
                var enumerationIdentifierEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'enumerationIdentifierEnu',
                    valor: paramValues.enumerationIdentifierEnu,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(enumerationIdentifierEnu.data);
            }

            if (paramValues.enumerationEnu != "" && paramValues.enumerationEnu != null) {
                var enumerationEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'enumerationEnu',
                    valor: paramValues.enumerationEnu,
                    tipoValor: 'string',
                    operacion: '='
                });
                filtro.push(enumerationEnu.data);
            }

            if (paramValues.enumerationLiteralEnu != "" && paramValues.enumerationLiteralEnu != null) {
                var enumerationLiteralEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'enumerationLiteralEnu',
                    valor: paramValues.enumerationLiteralEnu+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(enumerationLiteralEnu.data);
            }

            if (paramValues.descriptionEnu != "" && paramValues.descriptionEnu != null) {
                var descriptionEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'descriptionEnu',
                    valor: paramValues.descriptionEnu+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(descriptionEnu.data);
            }

            if (paramValues.languageExternalCodeEnu != "" && paramValues.languageExternalCodeEnu != null) {
                var languageExternalCodeEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'languageExternalCodeEnu',
                    valor: paramValues.languageExternalCodeEnu,
                    tipoValor: 'string',
                    operacion: '='
                });
                filtro.push(languageExternalCodeEnu.data);
            }

            if (paramValues.usableIndicatorEnu != null && paramValues.usableIndicatorEnu != undefined) {
                var usableIndicatorEnu = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'usableIndicatorEnu',
                    valor: paramValues.usableIndicatorEnu,
                    operacion: '=',
                    tipoValor: 'boolean'
                });
                filtro.push(usableIndicatorEnu.data);
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
            invalidFields = btn.up('viewport').down('enumerationv1formsearch').query("field{isValid()==false}");
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
