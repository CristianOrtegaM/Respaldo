Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategoryV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryV1Validation'
            ],

    init: function() {
        this.control({
            'categoryv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'categoryv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'categoryv1principalwindow button[action=create]': {
                click: this.create
            },
            'categoryv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'categoryv1grid button[action=edit]': {
                click: this.edit
            },
            'categoryv1principalwindow button[action=update]': {
                click: this.update
            },
            'categoryv1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'categoryv1grid_ext button[action=showSelectionTypeCategory]': {
                click: this.showSelectionTypeCategory
            },
            'categoryv1grid_ext button[action=edit]': {
                click: this.editCategory
            },
             'categoryv1grid_ext button[action=delete]': {
                click: this.removeCategory
            },
        });
    },
    
    removeCategory: function(btn){
    	btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
        	var store=btn.up('window').down('grid').getStore();
            store.remove(seleccion);
            store.reload();
            btn.up('window').down('grid').updateLayout();
            btn.setDisabled(false);
        	
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    	
    },
    
    
    
    editCategory: function(btn){
    	btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
        	this.application.loadController('ext.com.claveSoluciones.acordFw.category.' + seleccion[0].get('typeNameImo') + 'V1');
        	var principalWindow = seleccion[0].get('typeNameImo').toLowerCase()+'v1principalwindow';
            var window = Ext.widget(principalWindow);
            window.setTitle('Categoría Nº ' + seleccion[0].get('categoryIdentifierCat'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="keyImo"]').setDisabled(true);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    	
    },
    
    showSelectionTypeCategory: function(btn){
    	var ventana = Ext.widget('categoryv1selectiontype');
		ventana.show();
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
            var categoryV1Record =  form.getRecord();
            if (categoryV1Record !== undefined 
                && categoryV1Record !== null 
                && categoryV1Record .get('categoryIdentifierCat')!==null 
                && categoryV1Record .get('categoryIdentifierCat')!==undefined 
                && new String(categoryV1Record.get('categoryIdentifierCat')).indexOf('CategoryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categoryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1', {});
                objeto = this.application.getConvertion().convert (objeto, categoryV1);
                categoryV1.set(objeto);
                categoryV1.set({
                    categoryIdentifierCat: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var categoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryV1Validation', {});
                var validations = categoryV1Validation.createValidations (categoryV1);
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
                categoryV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryV1').reload();
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
            var window = Ext.widget('categoryv1principalwindow');
            window.setTitle('Categoría Nº ' + seleccion[0].get('categoryIdentifierCat'));
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
            var categoryV1Record =  form.getRecord();
            if (categoryV1Record !== undefined 
                && categoryV1Record !== null 
                && categoryV1Record .get('categoryIdentifierCat')!==null 
                && categoryV1Record .get('categoryIdentifierCat')!==undefined 
                && new String(categoryV1Record.get('categoryIdentifierCat')).indexOf('CategoryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categoryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1', {});
                categoryV1.set(objeto);
                categoryV1.set({
                    categoryIdentifierCat: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var categoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryV1Validation', {});
                var validations = categoryV1Validation.createValidations (categoryV1);
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
                return categoryV1;
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
            var window = Ext.widget('categoryv1principalwindow');
            window.setTitle('Categoría Nº ' + seleccion[0].get('categoryIdentifierCat'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryV1').reload();
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
        var categoryV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, categoryV1);
        categoryV1.set (objeto);
        categoryV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var categoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryV1Validation', {});
        var validations = categoryV1Validation.createValidations (categoryV1);
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
        categoryV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryV1').reload();
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
        var ventana = Ext.widget('categoryv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.categoryIdentifierCat != "" && paramValues.categoryIdentifierCat != null) {
                var categoryIdentifierCat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'categoryIdentifierCat',
                    valor: paramValues.categoryIdentifierCat,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(categoryIdentifierCat.data);
            }

            if (paramValues.categoryNameCat != "" && paramValues.categoryNameCat != null) {
                var categoryNameCat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'categoryNameCat',
                    valor: paramValues.categoryNameCat+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(categoryNameCat.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('categoryv1formsearch').query("field{isValid()==false}");
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
