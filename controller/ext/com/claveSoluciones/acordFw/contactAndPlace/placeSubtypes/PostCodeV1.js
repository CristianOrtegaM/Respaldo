Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1',
    		 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Validation'
            ],

    init: function() {
        this.control({
            'postcodev1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'postcodev1grid_ext button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'postcodev1principalwindow button[action=create]': {
                click: this.create
            },
            'postcodev1grid_ext button[action=delete]': {
                click: this.deleteElement
            },
            'postcodev1grid_ext button[action=edit]': {
                click: this.edit
            },
            'postcodev1principalwindow button[action=update]': {
                click: this.update
            },
            'postcodev1grid_ext button[action=mostrarWindows]': {
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
        var window=btn.up('window');
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var postCodeV1Record =  form.getRecord();
            if (postCodeV1Record !== undefined 
                && postCodeV1Record !== null 
                && postCodeV1Record .get('placeProximityIdentifierPlp')!==null 
                && postCodeV1Record .get('placeProximityIdentifierPlp')!==undefined 
                && new String(postCodeV1Record.get('placeProximityIdentifierPlp')).indexOf('PlaceProximityV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var postCodeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', {});
				objeto = this.application.getConvertion().convert (objeto, postCodeV1);
                postCodeV1.set(objeto);
                postCodeV1.set({
                    placeIdentifierPla: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var postCodeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Validation', {});
                var validations = postCodeV1Validation.createValidations (postCodeV1);
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
                //crear placeproximity
                var fromPlace=null;
                if(window.down('combo[name="placeMunicipality"]').valueModels!==null
                	&& window.down('combo[name="placeMunicipality"]').valueModels!==undefined
                	&& window.down('combo[name="placeMunicipality"]').valueModels.length>0){
                	fromPlace=btn.up('window').down('combo[name="placeMunicipality"]').valueModels[0].data;
                }
                var placeProximity = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {});
	            placeProximity.set({
	                placeIdentifierPla: null,
	                placeProximityIdentifierPlp: null,
	                creationUserImo: usuario.get('userName'),
	                creationDateTimeImo: new Date(),
	                updateUserImo: usuario.get('userName'),
	                updateDateTimeImo: new Date(),
	                basicDataCompleteCodeImo: 'Full',
	                typeCodePlp: 'Includes',
	                fromPlacePlp: fromPlace,
	                toPlacePlp: postCodeV1.data
	            });
	            var url_old=urlService + 'placeProximityService';
	            placeProximity.getProxy().setUrl(url_old+'/postalCode');
				var grid = Ext.widget ('postcodev1grid_ext');
				
		        placeProximity.save({
                	callback: function(record, operation) {
                    btn.setDisabled(false);
                    if (operation.success === true) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido === true) {
                            btn.up('window').close();
                            crearVentana(respuesta.codigo, respuesta.mensaje);							
							if (grid)
								grid.getStore ().reload ();							
                        } else {
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana(5, "Error de conexión");
                        }
                    }
               	    },
	                success: function(rec, st) {
	                    btn.setDisabled(false);
	                    //////btn.up().up().down('countryV1forminput').getEl().unmask();
	                },
	                failure: function(rec, st, a, b, c) {
	                    btn.setDisabled(false);
	                    //////btn.up().up().down('countryV1forminput').getEl().unmask();
	                }
	           	 });
                /*btn.up('window').mask("Guardando", "x-mask-loading");
                postCodeV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1').reload();
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
                });*/
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
            var window = Ext.widget('postcodev1principalwindow');
            window.setTitle('Código Postal Nº ' + seleccion[0].get('placeIdentifierPla'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('combo[name="placeMunicipality"]').setValue(seleccion[0].get('fromPlacePlp').namePla);
            window.down('textfield[name="assignedExternalCodePoc"]').setValue(seleccion[0].get('toPlacePlp').assignedExternalCodePoc);
            window.down('datefield[name="availablePeriodStartDateTimePla"]').setValue(seleccion[0].get('toPlacePlp').availablePeriodStartDateTimePla);
            window.down('datefield[name="availablePeriodEndDateTimePla"]').setValue(seleccion[0].get('toPlacePlp').availablePeriodEndDateTimePla);
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
										//Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1').reload();
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
        
		var record = form.getRecord();
		var postCodeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', record.data.toPlacePlp);
		objeto = this.application.getConvertion().convert (objeto, postCodeV1);
        postCodeV1.set (objeto);
        postCodeV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var postCodeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Validation', {});
        var validations = postCodeV1Validation.createValidations (postCodeV1);
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
		var grid = Ext.widget ('postcodev1grid_ext'); 
        postCodeV1.getProxy().setUrl(postCodeV1.getProxy().getInitialConfig('url') + '/' + postCodeV1.getId());
        postCodeV1.getProxy().setAppendId(false);
        postCodeV1.save ({
            callback: function (record, operation) {
                record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                record.getProxy().setAppendId(true);
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    if (grid) {
			grid.getStore ().reload ();
                    }else if(Ext.ComponentQuery.query('heterogeneoustreev2').length>0 && Ext.ComponentQuery.query('placeproximityv2principalform_ext').length> 0){
                            var principalpanel = Ext.ComponentQuery.query('placeproximityv2principalform_ext')[Ext.ComponentQuery.query('placeproximityv2principalform_ext').length-1]
                            principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
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
        var ventana = Ext.widget('postcodev1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            //var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1');
            var store = Ext.ComponentQuery.query('postcodev1grid_ext')[Ext.ComponentQuery.query('postcodev1grid_ext').length-1].getStore();
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation('PlaceProximity');
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );

			filtro.push(
				   Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	                	nombreCampo: 'toPlacePlp<>class',
	                	valor: 'PostCode',
	                	valores: null,
	                	operacion: '=',
	                	tipoValor: 'string'
                            }).data,
                            Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                nombreCampo: 'fromPlacePlp<>typeNameImo',
                                valor: 'Municipality',
                                valores: null,
                                operacion: '=',
                                tipoValor: 'string'
            		}).data		
			);
			
			 if (paramValues.placeMunicipality != "" && paramValues.placeMunicipality != null) {
                var placeMunicipality = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'fromPlacePlp<>placeIdentifierPla',
                    valor: paramValues.placeMunicipality,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(placeMunicipality.data);
            }
            
            if (paramValues.assignedExternalCodePoc != "" && paramValues.assignedExternalCodePoc != null) {
                var assignedExternalCodePoc = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'toPlacePlp<>assignedExternalCodePoc',
                    valor: paramValues.assignedExternalCodePoc,
                    operacion: '=',
                    tipoValor: 'string'
                });
                filtro.push(assignedExternalCodePoc.data);
            }
            
            console.log(paramValues.availablePeriodStartDateTimePla);
            if (paramValues.availablePeriodStartDateTimePla != "" && paramValues.availablePeriodStartDateTimePla != null) {
                var availablePeriodStartDateTimePla = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'toPlacePlp<>availablePeriodStartDateTimePla',
                    valor: paramValues.availablePeriodStartDateTimePla,
                    operacion: '>',
                    tipoValor: 'date'
                });
                filtro.push(availablePeriodStartDateTimePla.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('postcodev1formsearch').query("field{isValid()==false}");
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
