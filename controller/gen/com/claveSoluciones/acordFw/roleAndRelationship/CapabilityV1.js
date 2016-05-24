Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation'
            ],

    init: function() {
        this.control({
            'capabilityv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'capabilityv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'capabilityv1principalwindow button[action=create]': {
                click: this.create
            },
            'capabilityv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'capabilityv1grid button[action=edit]': {
                click: this.edit
            },
            'capabilityv1principalwindow button[action=update]': {
                click: this.update
            },
            'capabilityv1grid actioncolumn[action=showOwningCapabilityCap]': {
                click: this.showOwningCapabilityCap
            },
            'capabilityv1grid actioncolumn[action=showOwnedCapabilityCap]': {
                click: this.showOwnedCapabilityCap
            },
            'capabilityv1grid button[action=mostrarWindows]': {
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
        var owningCapabilityCap = null;
        var owningCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
        var ownedCapabilityCap = null;
        var ownedCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
        if(form.isValid()
        ){
            if(owningCapabilityCapGrid.count()>0){
                owningCapabilityCap = owningCapabilityCapGrid.getAt(0).data;
            };
            if(ownedCapabilityCapGrid.count()>0){
                ownedCapabilityCap = [];
                ownedCapabilityCapGrid.each(function(rec){
                    ownedCapabilityCap.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var capabilityV1Record =  form.getRecord();
            if (capabilityV1Record !== undefined 
                && capabilityV1Record !== null 
                && capabilityV1Record .get('capabilityIdentifierCap')!==null 
                && capabilityV1Record .get('capabilityIdentifierCap')!==undefined 
                && new String(capabilityV1Record.get('capabilityIdentifierCap')).indexOf('CapabilityV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var capabilityV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1', {});
                objeto = this.application.getConvertion().convert (objeto, capabilityV1);
                capabilityV1.set(objeto);
                capabilityV1.set({
                    capabilityIdentifierCap: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    owningCapabilityCap: owningCapabilityCap,
                    ownedCapabilityCap: ownedCapabilityCap
                });
                var capabilityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {});
                var validations = capabilityV1Validation.createValidations (capabilityV1);
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
                capabilityV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('capabilityv1principalwindow');
            window.setTitle('Capacidad Nº ' + seleccion[0].get('capabilityIdentifierCap'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var owningCapabilityCapGrid = Ext.ComponentQuery.query('#owningCapabilityCapGrid')[0];
            owningCapabilityCapGrid.getStore().loadRawData(seleccion[0].get('owningCapabilityCap')[0], true);
            var ownedCapabilityCapGrid = Ext.ComponentQuery.query('#ownedCapabilityCapGrid')[0];
            ownedCapabilityCapGrid.getStore().loadRawData(seleccion[0].get('ownedCapabilityCap')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var owningCapabilityCap = null;
        var owningCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
        var ownedCapabilityCap = null;
        var ownedCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
        if(form.isValid()
        ){
            if(owningCapabilityCapGrid.count()>0){
                owningCapabilityCap = owningCapabilityCapGrid.getAt(0).data;
            };
            if(ownedCapabilityCapGrid.count()>0){
                ownedCapabilityCap = [];
                ownedCapabilityCapGrid.each(function(rec){
                    ownedCapabilityCap.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var capabilityV1Record =  form.getRecord();
            if (capabilityV1Record !== undefined 
                && capabilityV1Record !== null 
                && capabilityV1Record .get('capabilityIdentifierCap')!==null 
                && capabilityV1Record .get('capabilityIdentifierCap')!==undefined 
                && new String(capabilityV1Record.get('capabilityIdentifierCap')).indexOf('CapabilityV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var capabilityV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1', {});
                capabilityV1.set(objeto);
                capabilityV1.set({
                    capabilityIdentifierCap: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    owningCapabilityCap: owningCapabilityCap,
                    ownedCapabilityCap: ownedCapabilityCap
                });
                var capabilityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {});
                var validations = capabilityV1Validation.createValidations (capabilityV1);
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
                return capabilityV1;
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('capabilityv1principalwindow');
            window.setTitle('Capacidad Nº ' + seleccion[0].get('capabilityIdentifierCap'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var owningCapabilityCapGrid = Ext.ComponentQuery.query('#owningCapabilityCapGrid')[0];
            owningCapabilityCapGrid.getStore().loadRawData(seleccion[0].get('owningCapabilityCap')[0], true);
            var ownedCapabilityCapGrid = Ext.ComponentQuery.query('#ownedCapabilityCapGrid')[0];
            ownedCapabilityCapGrid.getStore().loadRawData(seleccion[0].get('ownedCapabilityCap')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1').reload();
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
            var owningCapabilityCap = null;
            var owningCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
            if(owningCapabilityCapGrid.count()>0){
                owningCapabilityCap = owningCapabilityCapGrid.getAt(0).data;
            };
            var ownedCapabilityCap = null;
            var ownedCapabilityCapGrid = btn.up('window').down('capabilityv1grid').getStore();
            if(ownedCapabilityCapGrid.count()>0){
                ownedCapabilityCap = [];
                ownedCapabilityCapGrid.each(function(rec){
                    ownedCapabilityCap.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var capabilityV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, capabilityV1);
        capabilityV1.set (objeto);
        capabilityV1.set({
            owningCapabilityCap: owningCapabilityCap,
            ownedCapabilityCap: ownedCapabilityCap,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var capabilityV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {});
        var validations = capabilityV1Validation.createValidations (capabilityV1);
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
        capabilityV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.widget('capabilityv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showOwningCapabilityCap: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'capabilityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
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
        if(rec.get('owningCapabilityCap')!=null){
            data.push(rec.get('owningCapabilityCap'));
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

    showOwnedCapabilityCap: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'capabilityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
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
        if(rec.get('ownedCapabilityCap')!=null){
            data.push(rec.get('ownedCapabilityCap'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.capabilityIdentifierCap_fs != "" && paramValues.capabilityIdentifierCap_fs != null) {
                var capabilityIdentifierCap = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'capabilityIdentifierCap',
                    valor: paramValues.capabilityIdentifierCap_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(capabilityIdentifierCap.data);
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

            if (paramValues.nameCap_fs != "" && paramValues.nameCap_fs != null) {
                var nameCap = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameCap',
                    valor: paramValues.nameCap_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameCap.data);
            }

            if (paramValues.proficiencyLevelCodeCap_fs != "" && paramValues.proficiencyLevelCodeCap_fs != null) {
                var proficiencyLevelCodeCap = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'proficiencyLevelCodeCap',
                    valor: paramValues.proficiencyLevelCodeCap_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.roleAndRelationship.roleAndRelationshipCodeLists.ProficiencyLevelCodeList'
                });
                filtro.push(proficiencyLevelCodeCap.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('capabilityv1formsearch').query("field{isValid()==false}");
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
