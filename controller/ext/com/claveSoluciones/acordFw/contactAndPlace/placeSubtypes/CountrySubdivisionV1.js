Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1Validation'
            ],

    init: function() {
        this.control({
            'countrysubdivisionv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'countrysubdivisionv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'countrysubdivisionv1principalwindow button[action=create]': {
                click: this.create
            },
            'countrysubdivisionv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'countrysubdivisionv1grid button[action=edit]': {
                click: this.edit
            },
            'countrysubdivisionv1principalwindow button[action=update]': {
                click: this.update
            },
            'countrysubdivisionv1grid button[action=mostrarWindows]': {
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
            var countrySubdivisionV1Record =  form.getRecord();
            if (countrySubdivisionV1Record !== undefined 
                && countrySubdivisionV1Record !== null 
                && countrySubdivisionV1Record .get('placeIdentifierPla')!==null 
                && countrySubdivisionV1Record .get('placeIdentifierPla')!==undefined 
                && new String(countrySubdivisionV1Record.get('placeIdentifierPla')).indexOf('CountrySubdivisionV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var countrySubdivisionV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1', {});
				objeto = this.application.getConvertion().convert (objeto, countrySubdivisionV1);
                countrySubdivisionV1.set(objeto);
                countrySubdivisionV1.set({
                    placeIdentifierPla: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
					typeCodeCos: 'State'
                });
                var countrySubdivisionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1Validation', {});
                var validations = countrySubdivisionV1Validation.createValidations (countrySubdivisionV1);
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
                countrySubdivisionV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1').reload();
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
            var window = Ext.widget('countrysubdivisionv1principalwindow');
            window.setTitle('Región Nº ' + seleccion[0].get('placeIdentifierPla'));
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
                                        btn.up('window').close();
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1').reload();
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
										Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1').reload();
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
        var countrySubdivisionV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, countrySubdivisionV1);
        countrySubdivisionV1.set (objeto);
        countrySubdivisionV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var countrySubdivisionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1Validation', {});
        var validations = countrySubdivisionV1Validation.createValidations (countrySubdivisionV1);
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
        countrySubdivisionV1.getProxy().setUrl(countrySubdivisionV1.getProxy().getInitialConfig('url') + '/' + countrySubdivisionV1.getId());
        countrySubdivisionV1.getProxy().setAppendId(false);
        countrySubdivisionV1.save ({
            callback: function (record, operation) {
                record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                record.getProxy().setAppendId(true);
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        if(Ext.ComponentQuery.query('heterogeneoustreev2').length>0 && Ext.ComponentQuery.query('placeproximityv2principalform_ext').length> 0){
                            var principalpanel = Ext.ComponentQuery.query('placeproximityv2principalform_ext')[Ext.ComponentQuery.query('placeproximityv2principalform_ext').length-1]
                            principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
                        }else{
                            Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1').reload();
                        }
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
        var ventana = Ext.widget('countrysubdivisionv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            filtro.push (Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'State',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
                    }).data);
			var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );

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

            if (paramValues.alphaISOExternalCodeCos_fs != "" && paramValues.alphaISOExternalCodeCos_fs != null) {
                var alphaISOExternalCodeCos = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'alphaISOExternalCodeCos',
                    valor: paramValues.alphaISOExternalCodeCos_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(alphaISOExternalCodeCos.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('countrysubdivisionv1formsearch').query("field{isValid()==false}");
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
