Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1Validation'
            ],

    init: function() {
        this.control({
            'productspecificationstatusv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productspecificationstatusv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'productspecificationstatusv1principalwindow button[action=create]': {
                click: this.create
            },
            'productspecificationstatusv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productspecificationstatusv1grid button[action=edit]': {
                click: this.edit
            },
            'productspecificationstatusv1principalwindow button[action=update]': {
                click: this.update
            },
            'productspecificationstatusv1grid button[action=mostrarWindows]': {
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
            var objeto = form.getValues(false, false, false);
            var productSpecificationStatusV1Record =  form.getRecord();
            if (productSpecificationStatusV1Record !== undefined 
                && productSpecificationStatusV1Record !== null 
                && productSpecificationStatusV1Record .get('statusIdentifierSta')!==null 
                && productSpecificationStatusV1Record .get('statusIdentifierSta')!==undefined 
                && new String(productSpecificationStatusV1Record.get('statusIdentifierSta')).indexOf('ProductSpecificationStatusV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productSpecificationStatusV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1', {});
                objeto = this.application.getConvertion().convert (objeto, productSpecificationStatusV1);
                productSpecificationStatusV1.set(objeto);
                productSpecificationStatusV1.set({
                    statusIdentifierSta: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var productSpecificationStatusV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1Validation', {});
                var validations = productSpecificationStatusV1Validation.createValidations (productSpecificationStatusV1);
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
                productSpecificationStatusV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1').reload();
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
            var window = Ext.widget('productspecificationstatusv1principalwindow');
            window.setTitle('Estado de la Especificación del Producto Nº ' + seleccion[0].get('statusIdentifierSta'));
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
            var objeto = form.getValues(false, false, false);
            var productSpecificationStatusV1Record =  form.getRecord();
            if (productSpecificationStatusV1Record !== undefined 
                && productSpecificationStatusV1Record !== null 
                && productSpecificationStatusV1Record .get('statusIdentifierSta')!==null 
                && productSpecificationStatusV1Record .get('statusIdentifierSta')!==undefined 
                && new String(productSpecificationStatusV1Record.get('statusIdentifierSta')).indexOf('ProductSpecificationStatusV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productSpecificationStatusV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1', {});
                productSpecificationStatusV1.set(objeto);
                productSpecificationStatusV1.set({
                    statusIdentifierSta: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var productSpecificationStatusV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1Validation', {});
                var validations = productSpecificationStatusV1Validation.createValidations (productSpecificationStatusV1);
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
                return productSpecificationStatusV1;
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
            var window = Ext.widget('productspecificationstatusv1principalwindow');
            window.setTitle('Estado de la Especificación del Producto Nº ' + seleccion[0].get('statusIdentifierSta'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1').reload();
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
        var productSpecificationStatusV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, productSpecificationStatusV1);
        productSpecificationStatusV1.set (objeto);
        productSpecificationStatusV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var productSpecificationStatusV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1Validation', {});
        var validations = productSpecificationStatusV1Validation.createValidations (productSpecificationStatusV1);
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
        productSpecificationStatusV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1').reload();
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
        var ventana = Ext.widget('productspecificationstatusv1principalwindow');
        var productSpecificationStatusV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1', {
            codePss: 'InDevelopment'
        });
        var form = ventana.down('form').getForm();
        form.loadRecord(productSpecificationStatusV1);
        ventana.show();
        btn.setDisabled(false);
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.statusIdentifierSta_fs != "" && paramValues.statusIdentifierSta_fs != null) {
                var statusIdentifierSta = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'statusIdentifierSta',
                    valor: paramValues.statusIdentifierSta_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(statusIdentifierSta.data);
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

            if (paramValues.nameSta_fs != "" && paramValues.nameSta_fs != null) {
                var nameSta = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameSta',
                    valor: paramValues.nameSta_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameSta.data);
            }

            if (paramValues.reasonCodePss_fs != "" && paramValues.reasonCodePss_fs != null) {
                var reasonCodePss = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'reasonCodePss',
                    valor: paramValues.reasonCodePss_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.StatusReasonCodeList'
                });
                filtro.push(reasonCodePss.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('productspecificationstatusv1formsearch').query("field{isValid()==false}");
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
