Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1Validation'
            ],

    init: function() {
        this.control({
            'partyroleinrelationshipspecificationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'partyroleinrelationshipspecificationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'partyroleinrelationshipspecificationv1principalwindow button[action=create]': {
                click: this.create
            },
            'partyroleinrelationshipspecificationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'partyroleinrelationshipspecificationv1grid button[action=edit]': {
                click: this.edit
            },
            'partyroleinrelationshipspecificationv1principalwindow button[action=update]': {
                click: this.update
            },
            'partyroleinrelationshipspecificationv1grid button[action=mostrarWindows]': {
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
        var utilizedPartyRoleInAgreementSpecificationRrs = null;
        var utilizedPartyRoleInAgreementSpecificationRrsGrid = btn.up('window').down('partyroleinagreementspecificationv1grid').getStore();
        var designerSpe = null;
        var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
        if(form.isValid()
        ){
            if(utilizedPartyRoleInAgreementSpecificationRrsGrid.count()>0){
                utilizedPartyRoleInAgreementSpecificationRrs = utilizedPartyRoleInAgreementSpecificationRrsGrid.getAt(0).data;
            };
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var partyRoleInRelationshipSpecificationV1Record =  form.getRecord();
            if (partyRoleInRelationshipSpecificationV1Record !== undefined 
                && partyRoleInRelationshipSpecificationV1Record !== null 
                && partyRoleInRelationshipSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && partyRoleInRelationshipSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(partyRoleInRelationshipSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('PartyRoleInRelationshipSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var partyRoleInRelationshipSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1', {});
                objeto = this.application.getConvertion().convert (objeto, partyRoleInRelationshipSpecificationV1);
                partyRoleInRelationshipSpecificationV1.set(objeto);
                partyRoleInRelationshipSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null,
                    utilizedPartyRoleInAgreementSpecificationRrs: utilizedPartyRoleInAgreementSpecificationRrs,
                    designerSpe: designerSpe
                });
                var partyRoleInRelationshipSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1Validation', {});
                var validations = partyRoleInRelationshipSpecificationV1Validation.createValidations (partyRoleInRelationshipSpecificationV1);
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
                partyRoleInRelationshipSpecificationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('partyroleinrelationshipspecificationv1principalwindow');
            window.setTitle('Especificación de Rol de Parte en Relación Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusPrs"]').setValue(seleccion[0].data.statusPrs.nameSta);
            window.down('textfield[name="statusPrs"]').setVisible(true);
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
        var utilizedPartyRoleInAgreementSpecificationRrs = null;
        var utilizedPartyRoleInAgreementSpecificationRrsGrid = btn.up('window').down('partyroleinagreementspecificationv1grid').getStore();
        var designerSpe = null;
        var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
        if(form.isValid()
        ){
            if(utilizedPartyRoleInAgreementSpecificationRrsGrid.count()>0){
                utilizedPartyRoleInAgreementSpecificationRrs = utilizedPartyRoleInAgreementSpecificationRrsGrid.getAt(0).data;
            };
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var partyRoleInRelationshipSpecificationV1Record =  form.getRecord();
            if (partyRoleInRelationshipSpecificationV1Record !== undefined 
                && partyRoleInRelationshipSpecificationV1Record !== null 
                && partyRoleInRelationshipSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && partyRoleInRelationshipSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(partyRoleInRelationshipSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('PartyRoleInRelationshipSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var partyRoleInRelationshipSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1', {});
                partyRoleInRelationshipSpecificationV1.set(objeto);
                partyRoleInRelationshipSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null,
                    utilizedPartyRoleInAgreementSpecificationRrs: utilizedPartyRoleInAgreementSpecificationRrs,
                    designerSpe: designerSpe
                });
                var partyRoleInRelationshipSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1Validation', {});
                var validations = partyRoleInRelationshipSpecificationV1Validation.createValidations (partyRoleInRelationshipSpecificationV1);
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
                return partyRoleInRelationshipSpecificationV1;
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('partyroleinrelationshipspecificationv1principalwindow');
            window.setTitle('Especificación de Rol de Parte en Relación Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusPrs"]').setValue(seleccion[0].data.statusPrs.nameSta);
            window.down('textfield[name="statusPrs"]').setVisible(true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1').reload();
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
            var utilizedPartyRoleInAgreementSpecificationRrs = null;
            var utilizedPartyRoleInAgreementSpecificationRrsGrid = btn.up('window').down('partyroleinagreementspecificationv1grid').getStore();
            if(utilizedPartyRoleInAgreementSpecificationRrsGrid.count()>0){
                utilizedPartyRoleInAgreementSpecificationRrs = utilizedPartyRoleInAgreementSpecificationRrsGrid.getAt(0).data;
            };
            var designerSpe = null;
            var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var partyRoleInRelationshipSpecificationV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, partyRoleInRelationshipSpecificationV1);
        partyRoleInRelationshipSpecificationV1.set (objeto);
        partyRoleInRelationshipSpecificationV1.set({
            utilizedPartyRoleInAgreementSpecificationRrs: utilizedPartyRoleInAgreementSpecificationRrs,
            designerSpe: designerSpe,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var partyRoleInRelationshipSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1Validation', {});
        var validations = partyRoleInRelationshipSpecificationV1Validation.createValidations (partyRoleInRelationshipSpecificationV1);
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
        partyRoleInRelationshipSpecificationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var ventana = Ext.widget('partyroleinrelationshipspecificationv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusPrs: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'productspecificationstatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
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
        if(rec.get('statusPrs')!=null){
            data.push(rec.get('statusPrs'));
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

    showUtilizedPartyRoleInAgreementSpecificationRrs: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partyroleinagreementspecificationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1',
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
        if(rec.get('utilizedPartyRoleInAgreementSpecificationRrs')!=null){
            data.push(rec.get('utilizedPartyRoleInAgreementSpecificationRrs'));
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

    showDesignerSpe: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partyrolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
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
        if(rec.get('designerSpe')!=null){
            data.push(rec.get('designerSpe'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.specificationIdentifierSpe_fs != "" && paramValues.specificationIdentifierSpe_fs != null) {
                var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'specificationIdentifierSpe',
                    valor: paramValues.specificationIdentifierSpe_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(specificationIdentifierSpe.data);
            }

            if (paramValues.kindOfElementNameSpe_fs != "" && paramValues.kindOfElementNameSpe_fs != null) {
                var kindOfElementNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'kindOfElementNameSpe',
                    valor: paramValues.kindOfElementNameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(kindOfElementNameSpe.data);
            }

            if (paramValues.productExternalCodePrs_fs != "" && paramValues.productExternalCodePrs_fs != null) {
                var productExternalCodePrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'productExternalCodePrs',
                    valor: paramValues.productExternalCodePrs_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(productExternalCodePrs.data);
            }

            if (paramValues.nameSpe_fs != "" && paramValues.nameSpe_fs != null) {
                var nameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameSpe',
                    valor: paramValues.nameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameSpe.data);
            }

            if (paramValues.shortNameSpe_fs != "" && paramValues.shortNameSpe_fs != null) {
                var shortNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'shortNameSpe',
                    valor: paramValues.shortNameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(shortNameSpe.data);
            }

            if (paramValues.marketingNamePrs_fs != "" && paramValues.marketingNamePrs_fs != null) {
                var marketingNamePrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'marketingNamePrs',
                    valor: paramValues.marketingNamePrs_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(marketingNamePrs.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('partyroleinrelationshipspecificationv1formsearch').query("field{isValid()==false}");
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
