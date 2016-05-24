Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1Validation'
            ],

    init: function() {
        this.control({
            'agreementdocumentv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'agreementdocumentv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'agreementdocumentv1principalwindow button[action=create]': {
                click: this.create
            },
            'agreementdocumentv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'agreementdocumentv1grid button[action=edit]': {
                click: this.edit
            },
            'agreementdocumentv1principalwindow button[action=update]': {
                click: this.update
            },
            'agreementdocumentv1grid button[action=mostrarWindows]': {
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
        var fileOfDocumentsDoc = null;
        var fileOfDocumentsDocGrid = btn.up('window').down('documentv1grid').getStore();
        var includedDocumentDoc = null;
        var includedDocumentDocGrid = btn.up('window').down('documentv1grid').getStore();
        var replacesDoc = null;
        var replacesDocGrid = btn.up('window').down('documentv1grid').getStore();
        if(form.isValid()
        ){
            if(fileOfDocumentsDocGrid.count()>0){
                fileOfDocumentsDoc = fileOfDocumentsDocGrid.getAt(0).data;
            };
            if(includedDocumentDocGrid.count()>0){
                includedDocumentDoc = [];
                includedDocumentDocGrid.each(function(rec){
                    includedDocumentDoc.push(rec.data);
                });
            };
            if(replacesDocGrid.count()>0){
                replacesDoc = [];
                replacesDocGrid.each(function(rec){
                    replacesDoc.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var agreementDocumentV1Record =  form.getRecord();
            if (agreementDocumentV1Record !== undefined 
                && agreementDocumentV1Record !== null 
                && agreementDocumentV1Record .get('documentIdentifierDoc')!==null 
                && agreementDocumentV1Record .get('documentIdentifierDoc')!==undefined 
                && new String(agreementDocumentV1Record.get('documentIdentifierDoc')).indexOf('AgreementDocumentV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var agreementDocumentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1', {});
                objeto = this.application.getConvertion().convert (objeto, agreementDocumentV1);
                agreementDocumentV1.set(objeto);
                agreementDocumentV1.set({
                    documentIdentifierDoc: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    fileOfDocumentsDoc: fileOfDocumentsDoc,
                    includedDocumentDoc: includedDocumentDoc,
                    replacesDoc: replacesDoc
                });
                var agreementDocumentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1Validation', {});
                var validations = agreementDocumentV1Validation.createValidations (agreementDocumentV1);
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
                agreementDocumentV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('agreementdocumentv1principalwindow');
            window.setTitle('Documento de Contrato Nº ' + seleccion[0].get('documentIdentifierDoc'));
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
        var fileOfDocumentsDoc = null;
        var fileOfDocumentsDocGrid = btn.up('window').down('documentv1grid').getStore();
        var includedDocumentDoc = null;
        var includedDocumentDocGrid = btn.up('window').down('documentv1grid').getStore();
        var replacesDoc = null;
        var replacesDocGrid = btn.up('window').down('documentv1grid').getStore();
        if(form.isValid()
        ){
            if(fileOfDocumentsDocGrid.count()>0){
                fileOfDocumentsDoc = fileOfDocumentsDocGrid.getAt(0).data;
            };
            if(includedDocumentDocGrid.count()>0){
                includedDocumentDoc = [];
                includedDocumentDocGrid.each(function(rec){
                    includedDocumentDoc.push(rec.data);
                });
            };
            if(replacesDocGrid.count()>0){
                replacesDoc = [];
                replacesDocGrid.each(function(rec){
                    replacesDoc.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var agreementDocumentV1Record =  form.getRecord();
            if (agreementDocumentV1Record !== undefined 
                && agreementDocumentV1Record !== null 
                && agreementDocumentV1Record .get('documentIdentifierDoc')!==null 
                && agreementDocumentV1Record .get('documentIdentifierDoc')!==undefined 
                && new String(agreementDocumentV1Record.get('documentIdentifierDoc')).indexOf('AgreementDocumentV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var agreementDocumentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1', {});
                agreementDocumentV1.set(objeto);
                agreementDocumentV1.set({
                    documentIdentifierDoc: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    fileOfDocumentsDoc: fileOfDocumentsDoc,
                    includedDocumentDoc: includedDocumentDoc,
                    replacesDoc: replacesDoc
                });
                var agreementDocumentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1Validation', {});
                var validations = agreementDocumentV1Validation.createValidations (agreementDocumentV1);
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
                return agreementDocumentV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1').reload();
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
            var fileOfDocumentsDoc = null;
            var fileOfDocumentsDocGrid = btn.up('window').down('documentv1grid').getStore();
            if(fileOfDocumentsDocGrid.count()>0){
                fileOfDocumentsDoc = fileOfDocumentsDocGrid.getAt(0).data;
            };
            var includedDocumentDoc = null;
            var includedDocumentDocGrid = btn.up('window').down('documentv1grid').getStore();
            if(includedDocumentDocGrid.count()>0){
                includedDocumentDoc = [];
                includedDocumentDocGrid.each(function(rec){
                    includedDocumentDoc.push(rec.data);
                });
            };
            var replacesDoc = null;
            var replacesDocGrid = btn.up('window').down('documentv1grid').getStore();
            if(replacesDocGrid.count()>0){
                replacesDoc = [];
                replacesDocGrid.each(function(rec){
                    replacesDoc.push(rec.data);
                });
            };
        var objeto = form.getValues(false, true, false);
        var agreementDocumentV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, agreementDocumentV1);
        agreementDocumentV1.set (objeto);
        agreementDocumentV1.set({
            fileOfDocumentsDoc: fileOfDocumentsDoc,
            includedDocumentDoc: includedDocumentDoc,
            replacesDoc: replacesDoc,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var agreementDocumentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1Validation', {});
        var validations = agreementDocumentV1Validation.createValidations (agreementDocumentV1);
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
        agreementDocumentV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        var ventana = Ext.widget('agreementdocumentv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showFileOfDocumentsDoc: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'documentv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',
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
        if(rec.get('fileOfDocumentsDoc')!=null){
            data.push(rec.get('fileOfDocumentsDoc'));
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

    showIncludedDocumentDoc: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'documentv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',
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
        if(rec.get('includedDocumentDoc')!=null){
            data.push(rec.get('includedDocumentDoc'));
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

    showReplacesDoc: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'documentv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',
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
        if(rec.get('replacesDoc')!=null){
            data.push(rec.get('replacesDoc'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.documentIdentifierDoc_fs != "" && paramValues.documentIdentifierDoc_fs != null) {
                var documentIdentifierDoc = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'documentIdentifierDoc',
                    valor: paramValues.documentIdentifierDoc_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(documentIdentifierDoc.data);
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

            if (paramValues.typeNameImo_fs != "" && paramValues.typeNameImo_fs != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
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

            if (paramValues.identifierDoc_fs != "" && paramValues.identifierDoc_fs != null) {
                var identifierDoc = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'identifierDoc',
                    valor: paramValues.identifierDoc_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(identifierDoc.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('agreementdocumentv1formsearch').query("field{isValid()==false}");
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
