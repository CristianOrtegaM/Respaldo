Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Grid',
             'AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Validation'
            ],

    init: function() {
        this.control({
            'exchangeratev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'exchangeratev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'exchangeratev1principalwindow_ext button[action=create]': {
                click: this.create
            },
            'exchangeratev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'exchangeratev1grid button[action=edit]': {
                click: this.edit
            },
            'exchangeratev1principalwindow button[action=update]': {
                click: this.update
            },
            'exchangeratev1grid button[action=mostrarWindows]': {
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
            var exchangeRateV1Record =  form.getRecord();
            if (exchangeRateV1Record !== undefined 
                && exchangeRateV1Record !== null 
                && exchangeRateV1Record .get('exchangeRateIdentifierExr')!==null 
                && exchangeRateV1Record .get('exchangeRateIdentifierExr')!==undefined 
                && new String(exchangeRateV1Record.get('exchangeRateIdentifierExr')).indexOf('ExchangeRateV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var exchangeRateV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1', {});
                objeto = this.application.getConvertion().convert (objeto, exchangeRateV1);
                exchangeRateV1.set(objeto);
                exchangeRateV1.set({
                    exchangeRateIdentifierExr: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var exchangeRateV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Validation', {});
                var validations = exchangeRateV1Validation.createValidations (exchangeRateV1);
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
                exchangeRateV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1').reload();
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
            var window = Ext.widget('exchangeratev1principalwindow_ext');
            window.setTitle('Tasa de Cambio Nº ' + seleccion[0].get('exchangeRateIdentifierExr'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('combo[name="fromCurrencyTypeExternalCodeExr"]').setDisabled(true);
            window.down('combo[name="toCurrencyTypeExternalCodeExr"]').setDisabled(true);
            window.down('datefield[name="asOfDateExr"]').setDisabled(true);
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
            var exchangeRateV1Record =  form.getRecord();
            if (exchangeRateV1Record !== undefined 
                && exchangeRateV1Record !== null 
                && exchangeRateV1Record .get('exchangeRateIdentifierExr')!==null 
                && exchangeRateV1Record .get('exchangeRateIdentifierExr')!==undefined 
                && new String(exchangeRateV1Record.get('exchangeRateIdentifierExr')).indexOf('ExchangeRateV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var exchangeRateV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1', {});
                exchangeRateV1.set(objeto);
                exchangeRateV1.set({
                    exchangeRateIdentifierExr: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var exchangeRateV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Validation', {});
                var validations = exchangeRateV1Validation.createValidations (exchangeRateV1);
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
                    return false;
                }
                return exchangeRateV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1').reload();
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
        var exchangeRateV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, exchangeRateV1);
        exchangeRateV1.set (objeto);
        exchangeRateV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var exchangeRateV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Validation', {});
        var validations = exchangeRateV1Validation.createValidations (exchangeRateV1);
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
        exchangeRateV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1').reload();
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
        var ventana = Ext.widget('exchangeratev1principalwindow_ext');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.fromCurrencyTypeExternalCodeExr != "" && paramValues.fromCurrencyTypeExternalCodeExr != null) {
                var fromCurrencyTypeExternalCodeExr = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'fromCurrencyTypeExternalCodeExr',
                    valor: paramValues.fromCurrencyTypeExternalCodeExr,
                    tipoValor: 'string',
                    operacion: '='
                });
                filtro.push(fromCurrencyTypeExternalCodeExr.data);
            }

            if (paramValues.toCurrencyTypeExternalCodeExr != "" && paramValues.toCurrencyTypeExternalCodeExr != null) {
                var toCurrencyTypeExternalCodeExr = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'toCurrencyTypeExternalCodeExr',
                    valor: paramValues.toCurrencyTypeExternalCodeExr,
                    tipoValor: 'string',
                    operacion: '='
                });
                filtro.push(toCurrencyTypeExternalCodeExr.data);
            }

            if (paramValues.asOfDateExrFrom != "" && paramValues.asOfDateExrFrom != null) {
                var asOfDateExrFrom = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'asOfDateExr',
		            valor: Ext.Date.format(new Date(paramValues.asOfDateExrFrom), "d-m-Y H:i:s"),				    
					valores: null,
					operacion: '>=',
					tipoValor: 'date'
                });
                filtro.push(asOfDateExrFrom.data);
            }
            
             if (paramValues.asOfDateExrTo != "" && paramValues.asOfDateExrTo != null) {
                var asOfDateExrTo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'asOfDateExr',
		            valor: Ext.Date.format(new Date(paramValues.asOfDateExrTo), "d-m-Y H:i:s"),				    
					valores: null,
					operacion: '<=',
					tipoValor: 'date'
                });
                filtro.push(asOfDateExrTo.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('exchangeratev1formsearch').query("field{isValid()==false}");
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
