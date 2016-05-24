Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Validation'
            ],

    init: function() {
        this.control({
            'communicationcontentv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'communicationcontentv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'communicationcontentv1principalwindow button[action=create]': {
                click: this.create
            },
            'communicationcontentv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'communicationcontentv1grid button[action=edit]': {
                click: this.edit
            },
            'communicationcontentv1principalwindow button[action=update]': {
                click: this.update
            },
            'communicationcontentv1grid actioncolumn[action=showDirectedContactPointCom]': {
                click: this.showDirectedContactPointCom
            },
            'communicationcontentv1grid button[action=mostrarWindows]': {
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
        var directedContactPointCom = null;
        var directedContactPointComGrid = btn.up('window').down('contactpointv1grid').getStore();
        if(form.isValid()
            && directedContactPointComGrid.count()>0
        ){
            if(directedContactPointComGrid.count()>0){
                directedContactPointCom = [];
                directedContactPointComGrid.each(function(rec){
                    directedContactPointCom.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var communicationContentV1Record =  form.getRecord();
            if (communicationContentV1Record !== undefined 
                && communicationContentV1Record !== null 
                && communicationContentV1Record .get('communicationIdentifierCom')!==null 
                && communicationContentV1Record .get('communicationIdentifierCom')!==undefined 
                && new String(communicationContentV1Record.get('communicationIdentifierCom')).indexOf('CommunicationContentV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var communicationContentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1', {});
                objeto = this.application.getConvertion().convert (objeto, communicationContentV1);
                communicationContentV1.set(objeto);
                communicationContentV1.set({
                    communicationIdentifierCom: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCom: null,
                    directedContactPointCom: directedContactPointCom
                });
                var communicationContentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Validation', {});
                var validations = communicationContentV1Validation.createValidations (communicationContentV1);
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
                communicationContentV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1').reload();
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
            if(directedContactPointComGrid.count()==0){
                var label = btn.up('window').down('form').down('#directedContactPointComGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('communicationcontentv1principalwindow');
            window.setTitle('Contenido de la Comunicación Nº ' + seleccion[0].get('communicationIdentifierCom'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusCom"]').setValue(seleccion[0].data.statusCom.nameSta);
            window.down('textfield[name="statusCom"]').setVisible(true);
            window.show();
            var directedContactPointComGrid = Ext.ComponentQuery.query('#directedContactPointComGrid')[0];
            directedContactPointComGrid.getStore().loadRawData(seleccion[0].get('directedContactPointCom')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var directedContactPointCom = null;
        var directedContactPointComGrid = btn.up('window').down('contactpointv1grid').getStore();
        if(form.isValid()
            && directedContactPointComGrid.count()>0
        ){
            if(directedContactPointComGrid.count()>0){
                directedContactPointCom = [];
                directedContactPointComGrid.each(function(rec){
                    directedContactPointCom.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var communicationContentV1Record =  form.getRecord();
            if (communicationContentV1Record !== undefined 
                && communicationContentV1Record !== null 
                && communicationContentV1Record .get('communicationIdentifierCom')!==null 
                && communicationContentV1Record .get('communicationIdentifierCom')!==undefined 
                && new String(communicationContentV1Record.get('communicationIdentifierCom')).indexOf('CommunicationContentV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var communicationContentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1', {});
                communicationContentV1.set(objeto);
                communicationContentV1.set({
                    communicationIdentifierCom: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusCom: null,
                    directedContactPointCom: directedContactPointCom
                });
                var communicationContentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Validation', {});
                var validations = communicationContentV1Validation.createValidations (communicationContentV1);
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
                return communicationContentV1;
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
            if(directedContactPointComGrid.count()==0){
                var label = btn.up('window').down('form').down('#directedContactPointComGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('communicationcontentv1principalwindow');
            window.setTitle('Contenido de la Comunicación Nº ' + seleccion[0].get('communicationIdentifierCom'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusCom"]').setValue(seleccion[0].data.statusCom.nameSta);
            window.down('textfield[name="statusCom"]').setVisible(true);
            window.show();
            var directedContactPointComGrid = Ext.ComponentQuery.query('#directedContactPointComGrid')[0];
            directedContactPointComGrid.getStore().loadRawData(seleccion[0].get('directedContactPointCom')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1').reload();
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
            var directedContactPointCom = null;
            var directedContactPointComGrid = btn.up('window').down('contactpointv1grid').getStore();
            if(directedContactPointComGrid.count()>0){
                directedContactPointCom = [];
                directedContactPointComGrid.each(function(rec){
                    directedContactPointCom.push(rec.data);
                });
            };
        var objeto = form.getValues(false, true, false);
        var communicationContentV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, communicationContentV1);
        communicationContentV1.set (objeto);
        communicationContentV1.set({
            directedContactPointCom: directedContactPointCom,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var communicationContentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1Validation', {});
        var validations = communicationContentV1Validation.createValidations (communicationContentV1);
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
        communicationContentV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1');
        var ventana = Ext.widget('communicationcontentv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusCom: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'communicationstatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1',
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
        if(rec.get('statusCom')!=null){
            data.push(rec.get('statusCom'));
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

    showDirectedContactPointCom: function(grid, rowIndex,colIndex, item, e, rec){
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
        if(rec.get('directedContactPointCom')!=null){
            data.push(rec.get('directedContactPointCom'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.communicationIdentifierCom_fs != "" && paramValues.communicationIdentifierCom_fs != null) {
                var communicationIdentifierCom = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'communicationIdentifierCom',
                    valor: paramValues.communicationIdentifierCom_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(communicationIdentifierCom.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('communicationcontentv1formsearch').query("field{isValid()==false}");
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
