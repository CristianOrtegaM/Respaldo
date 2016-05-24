Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.RegistryV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.RegistryV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.RegistryV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation'
            ],

    init: function() {
        this.control({
            'registryv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'registryv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'registryv1principalwindow button[action=create]': {
                click: this.create
            },
            'registryv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'registryv1grid button[action=edit]': {
                click: this.edit
            },
            'registryv1principalwindow button[action=update]': {
                click: this.update
            },
            'registryv1grid actioncolumn[action=showAdministeringAuthorityReg]': {
                click: this.showAdministeringAuthorityReg
            },
            'registryv1grid button[action=mostrarWindows]': {
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
        var administeringAuthorityReg = null;
        var administeringAuthorityRegGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(form.isValid()
            && administeringAuthorityRegGrid.count()>0
        ){
            if(administeringAuthorityRegGrid.count()>0){
                administeringAuthorityReg = [];
                administeringAuthorityRegGrid.each(function(rec){
                    administeringAuthorityReg.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var registryV1Record =  form.getRecord();
            if (registryV1Record !== undefined 
                && registryV1Record !== null 
                && registryV1Record .get('registryIdentifierReg')!==null 
                && registryV1Record .get('registryIdentifierReg')!==undefined 
                && new String(registryV1Record.get('registryIdentifierReg')).indexOf('RegistryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var registryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1', {});
                objeto = this.application.getConvertion().convert (objeto, registryV1);
                registryV1.set(objeto);
                registryV1.set({
                    registryIdentifierReg: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    administeringAuthorityReg: administeringAuthorityReg
                });
                var registryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {});
                var validations = registryV1Validation.createValidations (registryV1);
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
                registryV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1').reload();
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
            if(administeringAuthorityRegGrid.count()==0){
                var label = btn.up('window').down('form').down('#administeringAuthorityRegGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('registryv1principalwindow');
            window.setTitle('Especificación de Libro de Registro Nº ' + seleccion[0].get('registryIdentifierReg'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var administeringAuthorityRegGrid = Ext.ComponentQuery.query('#administeringAuthorityRegGrid')[0];
            administeringAuthorityRegGrid.getStore().loadRawData(seleccion[0].get('administeringAuthorityReg')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var administeringAuthorityReg = null;
        var administeringAuthorityRegGrid = btn.up('window').down('registryauthorityv1grid').getStore();
        if(form.isValid()
            && administeringAuthorityRegGrid.count()>0
        ){
            if(administeringAuthorityRegGrid.count()>0){
                administeringAuthorityReg = [];
                administeringAuthorityRegGrid.each(function(rec){
                    administeringAuthorityReg.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var registryV1Record =  form.getRecord();
            if (registryV1Record !== undefined 
                && registryV1Record !== null 
                && registryV1Record .get('registryIdentifierReg')!==null 
                && registryV1Record .get('registryIdentifierReg')!==undefined 
                && new String(registryV1Record.get('registryIdentifierReg')).indexOf('RegistryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var registryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1', {});
                registryV1.set(objeto);
                registryV1.set({
                    registryIdentifierReg: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    administeringAuthorityReg: administeringAuthorityReg
                });
                var registryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {});
                var validations = registryV1Validation.createValidations (registryV1);
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
                return registryV1;
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
            if(administeringAuthorityRegGrid.count()==0){
                var label = btn.up('window').down('form').down('#administeringAuthorityRegGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('registryv1principalwindow');
            window.setTitle('Especificación de Libro de Registro Nº ' + seleccion[0].get('registryIdentifierReg'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var administeringAuthorityRegGrid = Ext.ComponentQuery.query('#administeringAuthorityRegGrid')[0];
            administeringAuthorityRegGrid.getStore().loadRawData(seleccion[0].get('administeringAuthorityReg')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1').reload();
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
            var administeringAuthorityReg = null;
            var administeringAuthorityRegGrid = btn.up('window').down('registryauthorityv1grid').getStore();
            if(administeringAuthorityRegGrid.count()>0){
                administeringAuthorityReg = [];
                administeringAuthorityRegGrid.each(function(rec){
                    administeringAuthorityReg.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var registryV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, registryV1);
        registryV1.set (objeto);
        registryV1.set({
            administeringAuthorityReg: administeringAuthorityReg,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var registryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {});
        var validations = registryV1Validation.createValidations (registryV1);
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
        registryV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var ventana = Ext.widget('registryv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showAdministeringAuthorityReg: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'registryauthorityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',
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
        if(rec.get('administeringAuthorityReg')!=null){
            data.push(rec.get('administeringAuthorityReg'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.RegistryV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.registryIdentifierReg_fs != "" && paramValues.registryIdentifierReg_fs != null) {
                var registryIdentifierReg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'registryIdentifierReg',
                    valor: paramValues.registryIdentifierReg_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(registryIdentifierReg.data);
            }

            if (paramValues.nameReg_fs != "" && paramValues.nameReg_fs != null) {
                var nameReg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameReg',
                    valor: paramValues.nameReg_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameReg.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('registryv1formsearch').query("field{isValid()==false}");
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
