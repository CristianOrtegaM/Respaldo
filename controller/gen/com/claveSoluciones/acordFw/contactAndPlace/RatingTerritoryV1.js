Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Validation'
            ],

    init: function() {
        this.control({
            'ratingterritoryv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'ratingterritoryv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'ratingterritoryv1principalwindow button[action=create]': {
                click: this.create
            },
            'ratingterritoryv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'ratingterritoryv1grid button[action=edit]': {
                click: this.edit
            },
            'ratingterritoryv1principalwindow button[action=update]': {
                click: this.update
            },
            'ratingterritoryv1grid actioncolumn[action=showIdentifiedPlaceRat]': {
                click: this.showIdentifiedPlaceRat
            },
            'ratingterritoryv1grid button[action=mostrarWindows]': {
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
        var identifiedPlaceRat = null;
        var identifiedPlaceRatGrid = btn.up('window').down('placev1grid').getStore();
        if(form.isValid()
            && identifiedPlaceRatGrid.count()>0
        ){
            if(identifiedPlaceRatGrid.count()>0){
                identifiedPlaceRat = identifiedPlaceRatGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var ratingTerritoryV1Record =  form.getRecord();
            if (ratingTerritoryV1Record !== undefined 
                && ratingTerritoryV1Record !== null 
                && ratingTerritoryV1Record .get('ratingTerritoryIdentifierRat')!==null 
                && ratingTerritoryV1Record .get('ratingTerritoryIdentifierRat')!==undefined 
                && new String(ratingTerritoryV1Record.get('ratingTerritoryIdentifierRat')).indexOf('RatingTerritoryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var ratingTerritoryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {});
                objeto = this.application.getConvertion().convert (objeto, ratingTerritoryV1);
                ratingTerritoryV1.set(objeto);
                ratingTerritoryV1.set({
                    ratingTerritoryIdentifierRat: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    identifiedPlaceRat: identifiedPlaceRat
                });
                var ratingTerritoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Validation', {});
                var validations = ratingTerritoryV1Validation.createValidations (ratingTerritoryV1);
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
                ratingTerritoryV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1').reload();
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
            if(identifiedPlaceRatGrid.count()==0){
                var label = btn.up('window').down('form').down('#identifiedPlaceRatGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('ratingterritoryv1principalwindow');
            window.setTitle('Clasificación de Territorio Nº ' + seleccion[0].get('ratingTerritoryIdentifierRat'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var identifiedPlaceRatGrid = Ext.ComponentQuery.query('#identifiedPlaceRatGrid')[0];
            identifiedPlaceRatGrid.getStore().loadRawData(seleccion[0].get('identifiedPlaceRat')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var identifiedPlaceRat = null;
        var identifiedPlaceRatGrid = btn.up('window').down('placev1grid').getStore();
        if(form.isValid()
            && identifiedPlaceRatGrid.count()>0
        ){
            if(identifiedPlaceRatGrid.count()>0){
                identifiedPlaceRat = identifiedPlaceRatGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var ratingTerritoryV1Record =  form.getRecord();
            if (ratingTerritoryV1Record !== undefined 
                && ratingTerritoryV1Record !== null 
                && ratingTerritoryV1Record .get('ratingTerritoryIdentifierRat')!==null 
                && ratingTerritoryV1Record .get('ratingTerritoryIdentifierRat')!==undefined 
                && new String(ratingTerritoryV1Record.get('ratingTerritoryIdentifierRat')).indexOf('RatingTerritoryV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var ratingTerritoryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {});
                ratingTerritoryV1.set(objeto);
                ratingTerritoryV1.set({
                    ratingTerritoryIdentifierRat: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    identifiedPlaceRat: identifiedPlaceRat
                });
                var ratingTerritoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Validation', {});
                var validations = ratingTerritoryV1Validation.createValidations (ratingTerritoryV1);
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
                return ratingTerritoryV1;
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
            if(identifiedPlaceRatGrid.count()==0){
                var label = btn.up('window').down('form').down('#identifiedPlaceRatGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1').reload();
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
            var identifiedPlaceRat = null;
            var identifiedPlaceRatGrid = btn.up('window').down('placev1grid').getStore();
            if(identifiedPlaceRatGrid.count()>0){
                identifiedPlaceRat = identifiedPlaceRatGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var ratingTerritoryV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, ratingTerritoryV1);
        ratingTerritoryV1.set (objeto);
        ratingTerritoryV1.set({
            identifiedPlaceRat: identifiedPlaceRat,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var ratingTerritoryV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Validation', {});
        var validations = ratingTerritoryV1Validation.createValidations (ratingTerritoryV1);
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
        ratingTerritoryV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var ventana = Ext.widget('ratingterritoryv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showIdentifiedPlaceRat: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'placev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
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
        if(rec.get('identifiedPlaceRat')!=null){
            data.push(rec.get('identifiedPlaceRat'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

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

            if (paramValues.typeCodeRat_fs != "" && paramValues.typeCodeRat_fs != null) {
                var typeCodeRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeRat',
                    valor: paramValues.typeCodeRat_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.RatingTerritoryTypeCodeList'
                });
                filtro.push(typeCodeRat.data);
            }

            if (paramValues.territoryExternalCodeRat_fs != "" && paramValues.territoryExternalCodeRat_fs != null) {
                var territoryExternalCodeRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'territoryExternalCodeRat',
                    valor: paramValues.territoryExternalCodeRat_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(territoryExternalCodeRat.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('ratingterritoryv1formsearch').query("field{isValid()==false}");
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
