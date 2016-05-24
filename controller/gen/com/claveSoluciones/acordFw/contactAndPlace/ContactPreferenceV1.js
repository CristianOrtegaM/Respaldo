Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Validation'
            ],

    init: function() {
        this.control({
            'contactpreferencev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'contactpreferencev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'contactpreferencev1principalwindow button[action=create]': {
                click: this.create
            },
            'contactpreferencev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'contactpreferencev1grid button[action=edit]': {
                click: this.edit
            },
            'contactpreferencev1principalwindow button[action=update]': {
                click: this.update
            },
            'contactpreferencev1grid button[action=mostrarWindows]': {
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
        var preferredContactPointCop = null;
        var preferredContactPointCopGrid = btn.up('window').down('contactpointv1grid').getStore();
        if(form.isValid()
        ){
            if(preferredContactPointCopGrid.count()>0){
                preferredContactPointCop = preferredContactPointCopGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var contactPreferenceV1Record =  form.getRecord();
            if (contactPreferenceV1Record !== undefined 
                && contactPreferenceV1Record !== null 
                && contactPreferenceV1Record .get('contactPreferenceIdentifierCop')!==null 
                && contactPreferenceV1Record .get('contactPreferenceIdentifierCop')!==undefined 
                && new String(contactPreferenceV1Record.get('contactPreferenceIdentifierCop')).indexOf('ContactPreferenceV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var contactPreferenceV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1', {});
                objeto = this.application.getConvertion().convert (objeto, contactPreferenceV1);
                contactPreferenceV1.set(objeto);
                contactPreferenceV1.set({
                    contactPreferenceIdentifierCop: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCop: null,
                    preferredContactPointCop: preferredContactPointCop
                });
                var contactPreferenceV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Validation', {});
                var validations = contactPreferenceV1Validation.createValidations (contactPreferenceV1);
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
                contactPreferenceV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('contactpreferencev1principalwindow');
            window.setTitle('Preferencia de Contacto Nº ' + seleccion[0].get('contactPreferenceIdentifierCop'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusCop"]').setValue(seleccion[0].data.statusCop.nameSta);
            window.down('textfield[name="statusCop"]').setVisible(true);
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
        var preferredContactPointCop = null;
        var preferredContactPointCopGrid = btn.up('window').down('contactpointv1grid').getStore();
        if(form.isValid()
        ){
            if(preferredContactPointCopGrid.count()>0){
                preferredContactPointCop = preferredContactPointCopGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var contactPreferenceV1Record =  form.getRecord();
            if (contactPreferenceV1Record !== undefined 
                && contactPreferenceV1Record !== null 
                && contactPreferenceV1Record .get('contactPreferenceIdentifierCop')!==null 
                && contactPreferenceV1Record .get('contactPreferenceIdentifierCop')!==undefined 
                && new String(contactPreferenceV1Record.get('contactPreferenceIdentifierCop')).indexOf('ContactPreferenceV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var contactPreferenceV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1', {});
                contactPreferenceV1.set(objeto);
                contactPreferenceV1.set({
                    contactPreferenceIdentifierCop: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCop: null,
                    preferredContactPointCop: preferredContactPointCop
                });
                var contactPreferenceV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Validation', {});
                var validations = contactPreferenceV1Validation.createValidations (contactPreferenceV1);
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
                return contactPreferenceV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1').reload();
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
            var preferredContactPointCop = null;
            var preferredContactPointCopGrid = btn.up('window').down('contactpointv1grid').getStore();
            if(preferredContactPointCopGrid.count()>0){
                preferredContactPointCop = preferredContactPointCopGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var contactPreferenceV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, contactPreferenceV1);
        contactPreferenceV1.set (objeto);
        contactPreferenceV1.set({
            preferredContactPointCop: preferredContactPointCop,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var contactPreferenceV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Validation', {});
        var validations = contactPreferenceV1Validation.createValidations (contactPreferenceV1);
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
        contactPreferenceV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var ventana = Ext.widget('contactpreferencev1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusCop: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'contactpreferencestatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1',
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
        if(rec.get('statusCop')!=null){
            data.push(rec.get('statusCop'));
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

    showPreferredContactPointCop: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'contactpointv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1',
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
        if(rec.get('preferredContactPointCop')!=null){
            data.push(rec.get('preferredContactPointCop'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.contactPreferenceIdentifierCop_fs != "" && paramValues.contactPreferenceIdentifierCop_fs != null) {
                var contactPreferenceIdentifierCop = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'contactPreferenceIdentifierCop',
                    valor: paramValues.contactPreferenceIdentifierCop_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(contactPreferenceIdentifierCop.data);
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

            if (paramValues.validationResultCodeCop_fs != "" && paramValues.validationResultCodeCop_fs != null) {
                var validationResultCodeCop = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'validationResultCodeCop',
                    valor: paramValues.validationResultCodeCop_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.ValidationResultCodeList'
                });
                filtro.push(validationResultCodeCop.data);
            }

            if (paramValues.purposeCodeCop_fs != "" && paramValues.purposeCodeCop_fs != null) {
                var purposeCodeCop = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'purposeCodeCop',
                    valor: paramValues.purposeCodeCop_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.ContactPreferencePurposeCodeList'
                });
                filtro.push(purposeCodeCop.data);
            }

            if (paramValues.usageCodeCop_fs != "" && paramValues.usageCodeCop_fs != null) {
                var usageCodeCop = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'usageCodeCop',
                    valor: paramValues.usageCodeCop_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.ContactPreferenceUsageCodeList'
                });
                filtro.push(usageCodeCop.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('contactpreferencev1formsearch').query("field{isValid()==false}");
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
