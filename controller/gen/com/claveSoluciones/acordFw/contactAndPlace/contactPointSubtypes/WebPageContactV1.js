Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1Validation'
            ],

    init: function() {
        this.control({
            'webpagecontactv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'webpagecontactv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'webpagecontactv1principalwindow button[action=create]': {
                click: this.create
            },
            'webpagecontactv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'webpagecontactv1grid button[action=edit]': {
                click: this.edit
            },
            'webpagecontactv1principalwindow button[action=update]': {
                click: this.update
            },
            'webpagecontactv1grid button[action=mostrarWindows]': {
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
        var uniformResourceLocationWpc = null;
        var uniformResourceLocationWpcGrid = btn.up('window').down('uniformresourcelocationv1grid').getStore();
        if(form.isValid()
        ){
            if(uniformResourceLocationWpcGrid.count()>0){
                uniformResourceLocationWpc = uniformResourceLocationWpcGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var webPageContactV1Record =  form.getRecord();
            if (webPageContactV1Record !== undefined 
                && webPageContactV1Record !== null 
                && webPageContactV1Record .get('contactPointIdentifierCop')!==null 
                && webPageContactV1Record .get('contactPointIdentifierCop')!==undefined 
                && new String(webPageContactV1Record.get('contactPointIdentifierCop')).indexOf('WebPageContactV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var webPageContactV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1', {});
                objeto = this.application.getConvertion().convert (objeto, webPageContactV1);
                webPageContactV1.set(objeto);
                webPageContactV1.set({
                    contactPointIdentifierCop: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCop: null,
                    uniformResourceLocationWpc: uniformResourceLocationWpc
                });
                var webPageContactV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1Validation', {});
                var validations = webPageContactV1Validation.createValidations (webPageContactV1);
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
                webPageContactV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('webpagecontactv1principalwindow');
            window.setTitle('Página Web Nº ' + seleccion[0].get('contactPointIdentifierCop'));
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
        var uniformResourceLocationWpc = null;
        var uniformResourceLocationWpcGrid = btn.up('window').down('uniformresourcelocationv1grid').getStore();
        if(form.isValid()
        ){
            if(uniformResourceLocationWpcGrid.count()>0){
                uniformResourceLocationWpc = uniformResourceLocationWpcGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var webPageContactV1Record =  form.getRecord();
            if (webPageContactV1Record !== undefined 
                && webPageContactV1Record !== null 
                && webPageContactV1Record .get('contactPointIdentifierCop')!==null 
                && webPageContactV1Record .get('contactPointIdentifierCop')!==undefined 
                && new String(webPageContactV1Record.get('contactPointIdentifierCop')).indexOf('WebPageContactV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var webPageContactV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1', {});
                webPageContactV1.set(objeto);
                webPageContactV1.set({
                    contactPointIdentifierCop: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCop: null,
                    uniformResourceLocationWpc: uniformResourceLocationWpc
                });
                var webPageContactV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1Validation', {});
                var validations = webPageContactV1Validation.createValidations (webPageContactV1);
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
                return webPageContactV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1').reload();
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
            var uniformResourceLocationWpc = null;
            var uniformResourceLocationWpcGrid = btn.up('window').down('uniformresourcelocationv1grid').getStore();
            if(uniformResourceLocationWpcGrid.count()>0){
                uniformResourceLocationWpc = uniformResourceLocationWpcGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var webPageContactV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, webPageContactV1);
        webPageContactV1.set (objeto);
        webPageContactV1.set({
            uniformResourceLocationWpc: uniformResourceLocationWpc,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var webPageContactV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1Validation', {});
        var validations = webPageContactV1Validation.createValidations (webPageContactV1);
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
        webPageContactV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1');
        var ventana = Ext.widget('webpagecontactv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusCop: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'contactpointstatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1',
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

    showUniformResourceLocationWpc: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'uniformresourcelocationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1',
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
        if(rec.get('uniformResourceLocationWpc')!=null){
            data.push(rec.get('uniformResourceLocationWpc'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.contactPointIdentifierCop_fs != "" && paramValues.contactPointIdentifierCop_fs != null) {
                var contactPointIdentifierCop = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'contactPointIdentifierCop',
                    valor: paramValues.contactPointIdentifierCop_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(contactPointIdentifierCop.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('webpagecontactv1formsearch').query("field{isValid()==false}");
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
