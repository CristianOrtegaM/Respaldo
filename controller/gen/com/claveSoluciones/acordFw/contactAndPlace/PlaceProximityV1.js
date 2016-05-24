Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Validation'
            ],

    init: function() {
        this.control({
            'placeproximityv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'placeproximityv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'placeproximityv1principalwindow button[action=create]': {
                click: this.create
            },
            'placeproximityv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'placeproximityv1grid button[action=edit]': {
                click: this.edit
            },
            'placeproximityv1principalwindow button[action=update]': {
                click: this.update
            },
            'placeproximityv1grid actioncolumn[action=showToPlacePlp]': {
                click: this.showToPlacePlp
            },
            'placeproximityv1grid actioncolumn[action=showFromPlacePlp]': {
                click: this.showFromPlacePlp
            },
            'placeproximityv1grid button[action=mostrarWindows]': {
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
        var toPlacePlp = null;
        var toPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
        var fromPlacePlp = null;
        var fromPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
        if(form.isValid()
            && toPlacePlpGrid.count()>0
            && fromPlacePlpGrid.count()>0
        ){
            if(toPlacePlpGrid.count()>0){
                toPlacePlp = toPlacePlpGrid.getAt(0).data;
            };
            if(fromPlacePlpGrid.count()>0){
                fromPlacePlp = fromPlacePlpGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var placeProximityV1Record =  form.getRecord();
            if (placeProximityV1Record !== undefined 
                && placeProximityV1Record !== null 
                && placeProximityV1Record .get('placeProximityIdentifierPlp')!==null 
                && placeProximityV1Record .get('placeProximityIdentifierPlp')!==undefined 
                && new String(placeProximityV1Record.get('placeProximityIdentifierPlp')).indexOf('PlaceProximityV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var placeProximityV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {});
                objeto = this.application.getConvertion().convert (objeto, placeProximityV1);
                placeProximityV1.set(objeto);
                placeProximityV1.set({
                    placeProximityIdentifierPlp: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    toPlacePlp: toPlacePlp,
                    fromPlacePlp: fromPlacePlp
                });
                var placeProximityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Validation', {});
                var validations = placeProximityV1Validation.createValidations (placeProximityV1);
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
                placeProximityV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1').reload();
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
            if(toPlacePlpGrid.count()==0){
                var label = btn.up('window').down('form').down('#toPlacePlpGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(fromPlacePlpGrid.count()==0){
                var label = btn.up('window').down('form').down('#fromPlacePlpGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('placeproximityv1principalwindow');
            window.setTitle('Proximidad entre Lugares Nº ' + seleccion[0].get('placeProximityIdentifierPlp'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var toPlacePlpGrid = Ext.ComponentQuery.query('#toPlacePlpGrid')[0];
            toPlacePlpGrid.getStore().loadRawData(seleccion[0].get('toPlacePlp')[0], true);
            var fromPlacePlpGrid = Ext.ComponentQuery.query('#fromPlacePlpGrid')[0];
            fromPlacePlpGrid.getStore().loadRawData(seleccion[0].get('fromPlacePlp')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var toPlacePlp = null;
        var toPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
        var fromPlacePlp = null;
        var fromPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
        if(form.isValid()
            && toPlacePlpGrid.count()>0
            && fromPlacePlpGrid.count()>0
        ){
            if(toPlacePlpGrid.count()>0){
                toPlacePlp = toPlacePlpGrid.getAt(0).data;
            };
            if(fromPlacePlpGrid.count()>0){
                fromPlacePlp = fromPlacePlpGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var placeProximityV1Record =  form.getRecord();
            if (placeProximityV1Record !== undefined 
                && placeProximityV1Record !== null 
                && placeProximityV1Record .get('placeProximityIdentifierPlp')!==null 
                && placeProximityV1Record .get('placeProximityIdentifierPlp')!==undefined 
                && new String(placeProximityV1Record.get('placeProximityIdentifierPlp')).indexOf('PlaceProximityV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var placeProximityV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {});
                placeProximityV1.set(objeto);
                placeProximityV1.set({
                    placeProximityIdentifierPlp: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    toPlacePlp: toPlacePlp,
                    fromPlacePlp: fromPlacePlp
                });
                var placeProximityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Validation', {});
                var validations = placeProximityV1Validation.createValidations (placeProximityV1);
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
                return placeProximityV1;
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
            if(toPlacePlpGrid.count()==0){
                var label = btn.up('window').down('form').down('#toPlacePlpGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(fromPlacePlpGrid.count()==0){
                var label = btn.up('window').down('form').down('#fromPlacePlpGrid').up('panel').previousNode().prev();
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1').reload();
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
            var toPlacePlp = null;
            var toPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
            if(toPlacePlpGrid.count()>0){
                toPlacePlp = toPlacePlpGrid.getAt(0).data;
            };
            var fromPlacePlp = null;
            var fromPlacePlpGrid = btn.up('window').down('placev1grid').getStore();
            if(fromPlacePlpGrid.count()>0){
                fromPlacePlp = fromPlacePlpGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var placeProximityV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, placeProximityV1);
        placeProximityV1.set (objeto);
        placeProximityV1.set({
            toPlacePlp: toPlacePlp,
            fromPlacePlp: fromPlacePlp,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var placeProximityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Validation', {});
        var validations = placeProximityV1Validation.createValidations (placeProximityV1);
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
        placeProximityV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var ventana = Ext.widget('placeproximityv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showToPlacePlp: function(grid, rowIndex,colIndex, item, e, rec){
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
        if(rec.get('toPlacePlp')!=null){
            data.push(rec.get('toPlacePlp'));
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

    showFromPlacePlp: function(grid, rowIndex,colIndex, item, e, rec){
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
        if(rec.get('fromPlacePlp')!=null){
            data.push(rec.get('fromPlacePlp'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.typeCodePlp_fs != "" && paramValues.typeCodePlp_fs != null) {
                var typeCodePlp = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodePlp',
                    valor: paramValues.typeCodePlp_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.ProximityTypeCodeList'
                });
                filtro.push(typeCodePlp.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('placeproximityv1formsearch').query("field{isValid()==false}");
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
