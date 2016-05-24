Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Validation'
            ],

    init: function() {
        this.control({
            'productregistrationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productregistrationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'productregistrationv1principalwindow button[action=create]': {
                click: this.create
            },
            'productregistrationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productregistrationv1grid button[action=edit]': {
                click: this.edit
            },
            'productregistrationv1principalwindow button[action=update]': {
                click: this.update
            },
            'productregistrationv1grid actioncolumn[action=showIncludedInRegistryReg]': {
                click: this.showIncludedInRegistryReg
            },
            'productregistrationv1grid actioncolumn[action=showRegisteredProductSpecificationPrr]': {
                click: this.showRegisteredProductSpecificationPrr
            },
            'productregistrationv1grid button[action=mostrarWindows]': {
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
        var includedInRegistryReg = null;
        var includedInRegistryRegGrid = btn.up('window').down('registryv1grid').getStore();
        var registeredProductSpecificationPrr = null;
        var registeredProductSpecificationPrrGrid = btn.up('window').down('productspecificationv1grid').getStore();
        if(form.isValid()
            && includedInRegistryRegGrid.count()>0
            && registeredProductSpecificationPrrGrid.count()>0
        ){
            if(includedInRegistryRegGrid.count()>0){
                includedInRegistryReg = includedInRegistryRegGrid.getAt(0).data;
            };
            if(registeredProductSpecificationPrrGrid.count()>0){
                registeredProductSpecificationPrr = registeredProductSpecificationPrrGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productRegistrationV1Record =  form.getRecord();
            if (productRegistrationV1Record !== undefined 
                && productRegistrationV1Record !== null 
                && productRegistrationV1Record .get('registrationIdentifierReg')!==null 
                && productRegistrationV1Record .get('registrationIdentifierReg')!==undefined 
                && new String(productRegistrationV1Record.get('registrationIdentifierReg')).indexOf('ProductRegistrationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productRegistrationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1', {});
                objeto = this.application.getConvertion().convert (objeto, productRegistrationV1);
                productRegistrationV1.set(objeto);
                productRegistrationV1.set({
                    registrationIdentifierReg: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusReg: null,
                    includedInRegistryReg: includedInRegistryReg,
                    registeredProductSpecificationPrr: registeredProductSpecificationPrr
                });
                var productRegistrationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Validation', {});
                var validations = productRegistrationV1Validation.createValidations (productRegistrationV1);
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
                productRegistrationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1').reload();
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
            if(includedInRegistryRegGrid.count()==0){
                var label = btn.up('window').down('form').down('#includedInRegistryRegGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(registeredProductSpecificationPrrGrid.count()==0){
                var label = btn.up('window').down('form').down('#registeredProductSpecificationPrrGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryV1');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('productregistrationv1principalwindow');
            window.setTitle('Especificación de Registro de Producto Nº ' + seleccion[0].get('registrationIdentifierReg'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="statusReg"]').setValue(seleccion[0].data.statusReg.nameSta);
            window.down('textfield[name="statusReg"]').setVisible(true);
            window.show();
            var includedInRegistryRegGrid = Ext.ComponentQuery.query('#includedInRegistryRegGrid')[0];
            includedInRegistryRegGrid.getStore().loadRawData(seleccion[0].get('includedInRegistryReg')[0], true);
            var registeredProductSpecificationPrrGrid = Ext.ComponentQuery.query('#registeredProductSpecificationPrrGrid')[0];
            registeredProductSpecificationPrrGrid.getStore().loadRawData(seleccion[0].get('registeredProductSpecificationPrr')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var includedInRegistryReg = null;
        var includedInRegistryRegGrid = btn.up('window').down('registryv1grid').getStore();
        var registeredProductSpecificationPrr = null;
        var registeredProductSpecificationPrrGrid = btn.up('window').down('productspecificationv1grid').getStore();
        if(form.isValid()
            && includedInRegistryRegGrid.count()>0
            && registeredProductSpecificationPrrGrid.count()>0
        ){
            if(includedInRegistryRegGrid.count()>0){
                includedInRegistryReg = includedInRegistryRegGrid.getAt(0).data;
            };
            if(registeredProductSpecificationPrrGrid.count()>0){
                registeredProductSpecificationPrr = registeredProductSpecificationPrrGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productRegistrationV1Record =  form.getRecord();
            if (productRegistrationV1Record !== undefined 
                && productRegistrationV1Record !== null 
                && productRegistrationV1Record .get('registrationIdentifierReg')!==null 
                && productRegistrationV1Record .get('registrationIdentifierReg')!==undefined 
                && new String(productRegistrationV1Record.get('registrationIdentifierReg')).indexOf('ProductRegistrationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productRegistrationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1', {});
                productRegistrationV1.set(objeto);
                productRegistrationV1.set({
                    registrationIdentifierReg: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusReg: null,
                    includedInRegistryReg: includedInRegistryReg,
                    registeredProductSpecificationPrr: registeredProductSpecificationPrr
                });
                var productRegistrationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Validation', {});
                var validations = productRegistrationV1Validation.createValidations (productRegistrationV1);
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
                return productRegistrationV1;
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
            if(includedInRegistryRegGrid.count()==0){
                var label = btn.up('window').down('form').down('#includedInRegistryRegGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(registeredProductSpecificationPrrGrid.count()==0){
                var label = btn.up('window').down('form').down('#registeredProductSpecificationPrrGrid').up('panel').previousNode().prev();
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1').reload();
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
            var includedInRegistryReg = null;
            var includedInRegistryRegGrid = btn.up('window').down('registryv1grid').getStore();
            if(includedInRegistryRegGrid.count()>0){
                includedInRegistryReg = includedInRegistryRegGrid.getAt(0).data;
            };
            var registeredProductSpecificationPrr = null;
            var registeredProductSpecificationPrrGrid = btn.up('window').down('productspecificationv1grid').getStore();
            if(registeredProductSpecificationPrrGrid.count()>0){
                registeredProductSpecificationPrr = registeredProductSpecificationPrrGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, false, false);
        var productRegistrationV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, productRegistrationV1);
        productRegistrationV1.set (objeto);
        productRegistrationV1.set({
            includedInRegistryReg: includedInRegistryReg,
            registeredProductSpecificationPrr: registeredProductSpecificationPrr,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var productRegistrationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Validation', {});
        var validations = productRegistrationV1Validation.createValidations (productRegistrationV1);
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
        productRegistrationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryV1');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var ventana = Ext.widget('productregistrationv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusReg: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'registrationstatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1',
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
        if(rec.get('statusReg')!=null){
            data.push(rec.get('statusReg'));
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

    showIncludedInRegistryReg: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.registration.RegistryV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'registryv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1',
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
        if(rec.get('includedInRegistryReg')!=null){
            data.push(rec.get('includedInRegistryReg'));
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

    showRegisteredProductSpecificationPrr: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'productspecificationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
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
        if(rec.get('registeredProductSpecificationPrr')!=null){
            data.push(rec.get('registeredProductSpecificationPrr'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.registrationIdentifierReg_fs != "" && paramValues.registrationIdentifierReg_fs != null) {
                var registrationIdentifierReg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'registrationIdentifierReg',
                    valor: paramValues.registrationIdentifierReg_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(registrationIdentifierReg.data);
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

            if (paramValues.identifierReg_fs != "" && paramValues.identifierReg_fs != null) {
                var identifierReg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'identifierReg',
                    valor: paramValues.identifierReg_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(identifierReg.data);
            }

            if (paramValues.disqualificationReasonCodeReg_fs != "" && paramValues.disqualificationReasonCodeReg_fs != null) {
                var disqualificationReasonCodeReg = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'disqualificationReasonCodeReg',
                    valor: paramValues.disqualificationReasonCodeReg_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.StatusReasonCodeList'
                });
                filtro.push(disqualificationReasonCodeReg.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('productregistrationv1formsearch').query("field{isValid()==false}");
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
