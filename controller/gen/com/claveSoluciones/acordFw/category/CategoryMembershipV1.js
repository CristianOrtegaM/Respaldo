Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryMembershipV1Validation'
            ],

    init: function() {
        this.control({
            'categorymembershipv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'categorymembershipv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'categorymembershipv1principalwindow button[action=create]': {
                click: this.create
            },
            'categorymembershipv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'categorymembershipv1grid button[action=edit]': {
                click: this.edit
            },
            'categorymembershipv1principalwindow button[action=update]': {
                click: this.update
            },
            'categorymembershipv1grid button[action=mostrarWindows]': {
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
        var categorizingCategoryCam = null;
        var categorizingCategoryCamGrid = btn.up('window').down('categoryv1grid').getStore();
        if(form.isValid()
        ){
            if(categorizingCategoryCamGrid.count()>0){
                categorizingCategoryCam = categorizingCategoryCamGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var categoryMembershipV1Record =  form.getRecord();
            if (categoryMembershipV1Record !== undefined 
                && categoryMembershipV1Record !== null 
                && categoryMembershipV1Record .get('categoryMembershipIdentifierCam')!==null 
                && categoryMembershipV1Record .get('categoryMembershipIdentifierCam')!==undefined 
                && new String(categoryMembershipV1Record.get('categoryMembershipIdentifierCam')).indexOf('CategoryMembershipV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categoryMembershipV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1', {});
                objeto = this.application.getConvertion().convert (objeto, categoryMembershipV1);
                categoryMembershipV1.set(objeto);
                categoryMembershipV1.set({
                    categoryMembershipIdentifierCam: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    categorizingCategoryCam: categorizingCategoryCam
                });
                var categoryMembershipV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryMembershipV1Validation', {});
                var validations = categoryMembershipV1Validation.createValidations (categoryMembershipV1);
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
                categoryMembershipV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('categorymembershipv1principalwindow');
            window.setTitle('Membresía de Categoría Nº ' + seleccion[0].get('categoryMembershipIdentifierCam'));
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
        var categorizingCategoryCam = null;
        var categorizingCategoryCamGrid = btn.up('window').down('categoryv1grid').getStore();
        if(form.isValid()
        ){
            if(categorizingCategoryCamGrid.count()>0){
                categorizingCategoryCam = categorizingCategoryCamGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var categoryMembershipV1Record =  form.getRecord();
            if (categoryMembershipV1Record !== undefined 
                && categoryMembershipV1Record !== null 
                && categoryMembershipV1Record .get('categoryMembershipIdentifierCam')!==null 
                && categoryMembershipV1Record .get('categoryMembershipIdentifierCam')!==undefined 
                && new String(categoryMembershipV1Record.get('categoryMembershipIdentifierCam')).indexOf('CategoryMembershipV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categoryMembershipV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1', {});
                categoryMembershipV1.set(objeto);
                categoryMembershipV1.set({
                    categoryMembershipIdentifierCam: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    categorizingCategoryCam: categorizingCategoryCam
                });
                var categoryMembershipV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryMembershipV1Validation', {});
                var validations = categoryMembershipV1Validation.createValidations (categoryMembershipV1);
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
                return categoryMembershipV1;
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('categorymembershipv1principalwindow');
            window.setTitle('Membresía de Categoría Nº ' + seleccion[0].get('categoryMembershipIdentifierCam'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1').reload();
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
            var categorizingCategoryCam = null;
            var categorizingCategoryCamGrid = btn.up('window').down('categoryv1grid').getStore();
            if(categorizingCategoryCamGrid.count()>0){
                categorizingCategoryCam = categorizingCategoryCamGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var categoryMembershipV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, categoryMembershipV1);
        categoryMembershipV1.set (objeto);
        categoryMembershipV1.set({
            categorizingCategoryCam: categorizingCategoryCam,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var categoryMembershipV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategoryMembershipV1Validation', {});
        var validations = categoryMembershipV1Validation.createValidations (categoryMembershipV1);
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
        categoryMembershipV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryV1');
        var ventana = Ext.widget('categorymembershipv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showCategorizingCategoryCam: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'categoryv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
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
        if(rec.get('categorizingCategoryCam')!=null){
            data.push(rec.get('categorizingCategoryCam'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.creationUserImo != "" && paramValues.creationUserImo != null) {
                var creationUserImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'creationUserImo',
                    valor: paramValues.creationUserImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(creationUserImo.data);
            }

            if (paramValues.keyImo != "" && paramValues.keyImo != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
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
            invalidFields = btn.up('viewport').down('categorymembershipv1formsearch').query("field{isValid()==false}");
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
