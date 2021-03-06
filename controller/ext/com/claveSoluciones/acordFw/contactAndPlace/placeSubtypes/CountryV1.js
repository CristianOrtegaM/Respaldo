Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Validation'
            ],

    init: function() {
        this.control({
            'countryv1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'countryv1grid_ext button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'countryv1principalwindow button[action=create]': {
                click: this.create
            },
            'countryv1grid_ext button[action=delete]': {
                click: this.deleteElement
            },
            'countryv1grid_ext button[action=edit]': {
                click: this.edit
            },
            'countryv1principalwindow button[action=update]': {
                click: this.update
            },
            'countryv1grid_ext button[action=mostrarWindows]': {
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
            var countryV1Record =  form.getRecord();
            if (countryV1Record !== undefined 
                && countryV1Record !== null 
                && countryV1Record .get('placeIdentifierPla')!==null 
                && countryV1Record .get('placeIdentifierPla')!==undefined 
                && new String(countryV1Record.get('placeIdentifierPla')).indexOf('CountryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var countryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1', {});
				objeto = this.application.getConvertion().convert (objeto, countryV1);
                countryV1.set(objeto);
                countryV1.set({
                    placeIdentifierPla: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var countryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Validation', {});
                var validations = countryV1Validation.createValidations (countryV1);
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
                countryV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1').reload();
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
            var window = Ext.widget('countryv1principalwindow');
            window.setTitle('País Nº ' + seleccion[0].get('placeIdentifierPla'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1').reload();
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
        var objeto = form.getValues(false, false, false);
        var countryV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, countryV1);
        countryV1.set (objeto);
        countryV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var countryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Validation', {});
        var validations = countryV1Validation.createValidations (countryV1);
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
        countryV1.getProxy().setUrl(countryV1.getProxy().getInitialConfig('url') + '/' + countryV1.getId());
        countryV1.getProxy().setAppendId(false);
        countryV1.save ({
            callback: function (record, operation) {
                record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                record.getProxy().setAppendId(true);
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        //Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1').reload();
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
        var ventana = Ext.widget('countryv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );

            if (paramValues.placeIdentifierPla != "" && paramValues.placeIdentifierPla != null) {
                var placeIdentifierPla = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'placeIdentifierPla',
                    valor: paramValues.placeIdentifierPla,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(placeIdentifierPla.data);
            }

            if (paramValues.namePla != "" && paramValues.namePla != null) {
                var namePla = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'namePla',
                    valor: paramValues.namePla+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(namePla.data);
            }

            if (paramValues.alphaISOExternalCodeCou != "" && paramValues.alphaISOExternalCodeCou != null) {
                var alphaISOExternalCodeCou = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'alphaISOExternalCodeCou',
                    valor: paramValues.alphaISOExternalCodeCou+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(alphaISOExternalCodeCou.data);
            }

            if (paramValues.extendedISOExternalCodeCou != "" && paramValues.extendedISOExternalCodeCou != null) {
                var extendedISOExternalCodeCou = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'extendedISOExternalCodeCou',
                    valor: paramValues.extendedISOExternalCodeCou+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(extendedISOExternalCodeCou.data);
            }

            if (paramValues.telephonePrefixExternalCodeCou != "" && paramValues.telephonePrefixExternalCodeCou != null) {
                var telephonePrefixExternalCodeCou = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'telephonePrefixExternalCodeCou',
                    valor: paramValues.telephonePrefixExternalCodeCou+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(telephonePrefixExternalCodeCou.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('countryv1formsearch').query("field{isValid()==false}");
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
