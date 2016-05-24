Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Validation'
            ],

    init: function() {
        this.control({
            'productcompositionv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productcompositionv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'productcompositionv1principalwindow button[action=create]': {
                click: this.create
            },
            'productcompositionv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productcompositionv1grid button[action=edit]': {
                click: this.edit
            },
            'productcompositionv1principalwindow button[action=update]': {
                click: this.update
            },
            'productcompositionv1grid actioncolumn[action=showAssociatedProductSpecificationBasePra]': {
                click: this.showAssociatedProductSpecificationBasePra
            },
            'productcompositionv1grid button[action=mostrarWindows]': {
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
        var associatedProductSpecificationBasePra = null;
        var associatedProductSpecificationBasePraGrid = btn.up('window').down('productspecificationbasev1grid').getStore();
        if(form.isValid()
            && associatedProductSpecificationBasePraGrid.count()>0
        ){
            if(associatedProductSpecificationBasePraGrid.count()>0){
                associatedProductSpecificationBasePra = associatedProductSpecificationBasePraGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productCompositionV1Record =  form.getRecord();
            if (productCompositionV1Record !== undefined 
                && productCompositionV1Record !== null 
                && productCompositionV1Record .get('productAssociationIdentifierPra')!==null 
                && productCompositionV1Record .get('productAssociationIdentifierPra')!==undefined 
                && new String(productCompositionV1Record.get('productAssociationIdentifierPra')).indexOf('ProductCompositionV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productCompositionV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1', {});
                objeto = this.application.getConvertion().convert (objeto, productCompositionV1);
                productCompositionV1.set(objeto);
                productCompositionV1.set({
                    productAssociationIdentifierPra: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    associatedProductSpecificationBasePra: associatedProductSpecificationBasePra
                });
                var productCompositionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Validation', {});
                var validations = productCompositionV1Validation.createValidations (productCompositionV1);
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
                productCompositionV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1').reload();
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
            if(associatedProductSpecificationBasePraGrid.count()==0){
                var label = btn.up('window').down('form').down('#associatedProductSpecificationBasePraGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('productcompositionv1principalwindow');
            window.setTitle('Composición del Producto Nº ' + seleccion[0].get('productAssociationIdentifierPra'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var associatedProductSpecificationBasePraGrid = Ext.ComponentQuery.query('#associatedProductSpecificationBasePraGrid')[0];
            associatedProductSpecificationBasePraGrid.getStore().loadRawData(seleccion[0].get('associatedProductSpecificationBasePra')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var associatedProductSpecificationBasePra = null;
        var associatedProductSpecificationBasePraGrid = btn.up('window').down('productspecificationbasev1grid').getStore();
        if(form.isValid()
            && associatedProductSpecificationBasePraGrid.count()>0
        ){
            if(associatedProductSpecificationBasePraGrid.count()>0){
                associatedProductSpecificationBasePra = associatedProductSpecificationBasePraGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productCompositionV1Record =  form.getRecord();
            if (productCompositionV1Record !== undefined 
                && productCompositionV1Record !== null 
                && productCompositionV1Record .get('productAssociationIdentifierPra')!==null 
                && productCompositionV1Record .get('productAssociationIdentifierPra')!==undefined 
                && new String(productCompositionV1Record.get('productAssociationIdentifierPra')).indexOf('ProductCompositionV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productCompositionV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1', {});
                productCompositionV1.set(objeto);
                productCompositionV1.set({
                    productAssociationIdentifierPra: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    associatedProductSpecificationBasePra: associatedProductSpecificationBasePra
                });
                var productCompositionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Validation', {});
                var validations = productCompositionV1Validation.createValidations (productCompositionV1);
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
                return productCompositionV1;
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
            if(associatedProductSpecificationBasePraGrid.count()==0){
                var label = btn.up('window').down('form').down('#associatedProductSpecificationBasePraGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('productcompositionv1principalwindow');
            window.setTitle('Composición del Producto Nº ' + seleccion[0].get('productAssociationIdentifierPra'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var associatedProductSpecificationBasePraGrid = Ext.ComponentQuery.query('#associatedProductSpecificationBasePraGrid')[0];
            associatedProductSpecificationBasePraGrid.getStore().loadRawData(seleccion[0].get('associatedProductSpecificationBasePra')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1').reload();
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
            var associatedProductSpecificationBasePra = null;
            var associatedProductSpecificationBasePraGrid = btn.up('window').down('productspecificationbasev1grid').getStore();
            if(associatedProductSpecificationBasePraGrid.count()>0){
                associatedProductSpecificationBasePra = associatedProductSpecificationBasePraGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, false, false);
        var productCompositionV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, productCompositionV1);
        productCompositionV1.set (objeto);
        productCompositionV1.set({
            associatedProductSpecificationBasePra: associatedProductSpecificationBasePra,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var productCompositionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Validation', {});
        var validations = productCompositionV1Validation.createValidations (productCompositionV1);
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
        productCompositionV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1');
        var ventana = Ext.widget('productcompositionv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showAssociatedProductSpecificationBasePra: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'productspecificationbasev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('associatedProductSpecificationBasePra')!=null){
            data.push(rec.get('associatedProductSpecificationBasePra'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.productAssociationIdentifierPra_fs != "" && paramValues.productAssociationIdentifierPra_fs != null) {
                var productAssociationIdentifierPra = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'productAssociationIdentifierPra',
                    valor: paramValues.productAssociationIdentifierPra_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(productAssociationIdentifierPra.data);
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

            if (paramValues.keyImo_fs != "" && paramValues.keyImo_fs != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('productcompositionv1formsearch').query("field{isValid()==false}");
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
