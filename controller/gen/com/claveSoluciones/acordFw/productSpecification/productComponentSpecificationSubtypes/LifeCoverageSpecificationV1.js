Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1Validation'
            ],

    init: function() {
        this.control({
            'lifecoveragespecificationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'lifecoveragespecificationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'lifecoveragespecificationv1principalwindow button[action=create]': {
                click: this.create
            },
            'lifecoveragespecificationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'lifecoveragespecificationv1grid button[action=edit]': {
                click: this.edit
            },
            'lifecoveragespecificationv1principalwindow button[action=update]': {
                click: this.update
            },
            'lifecoveragespecificationv1grid button[action=mostrarWindows]': {
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
        var includedPerilCos = null;
        var includedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
        var excludedPerilCos = null;
        var excludedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
        if(form.isValid()
        ){
            if(includedPerilCosGrid.count()>0){
                includedPerilCos = [];
                includedPerilCosGrid.each(function(rec){
                    includedPerilCos.push(rec.data);
                });
            };
            if(excludedPerilCosGrid.count()>0){
                excludedPerilCos = [];
                excludedPerilCosGrid.each(function(rec){
                    excludedPerilCos.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var lifeCoverageSpecificationV1Record =  form.getRecord();
            if (lifeCoverageSpecificationV1Record !== undefined 
                && lifeCoverageSpecificationV1Record !== null 
                && lifeCoverageSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && lifeCoverageSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(lifeCoverageSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('LifeCoverageSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var lifeCoverageSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1', {});
                objeto = this.application.getConvertion().convert (objeto, lifeCoverageSpecificationV1);
                lifeCoverageSpecificationV1.set(objeto);
                lifeCoverageSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null,
                    includedPerilCos: includedPerilCos,
                    excludedPerilCos: excludedPerilCos
                });
                var lifeCoverageSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1Validation', {});
                var validations = lifeCoverageSpecificationV1Validation.createValidations (lifeCoverageSpecificationV1);
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
                lifeCoverageSpecificationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('lifecoveragespecificationv1principalwindow');
            window.setTitle('Especificación de Cobertura de Vida Nº ' + seleccion[0].get('specificationIdentifierSpe'));
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
        var includedPerilCos = null;
        var includedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
        var excludedPerilCos = null;
        var excludedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
        if(form.isValid()
        ){
            if(includedPerilCosGrid.count()>0){
                includedPerilCos = [];
                includedPerilCosGrid.each(function(rec){
                    includedPerilCos.push(rec.data);
                });
            };
            if(excludedPerilCosGrid.count()>0){
                excludedPerilCos = [];
                excludedPerilCosGrid.each(function(rec){
                    excludedPerilCos.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var lifeCoverageSpecificationV1Record =  form.getRecord();
            if (lifeCoverageSpecificationV1Record !== undefined 
                && lifeCoverageSpecificationV1Record !== null 
                && lifeCoverageSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && lifeCoverageSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(lifeCoverageSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('LifeCoverageSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var lifeCoverageSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1', {});
                lifeCoverageSpecificationV1.set(objeto);
                lifeCoverageSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null,
                    includedPerilCos: includedPerilCos,
                    excludedPerilCos: excludedPerilCos
                });
                var lifeCoverageSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1Validation', {});
                var validations = lifeCoverageSpecificationV1Validation.createValidations (lifeCoverageSpecificationV1);
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
                return lifeCoverageSpecificationV1;
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('lifecoveragespecificationv1principalwindow');
            window.setTitle('Especificación de Cobertura de Vida Nº ' + seleccion[0].get('specificationIdentifierSpe'));
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1').reload();
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
            var includedPerilCos = null;
            var includedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
            if(includedPerilCosGrid.count()>0){
                includedPerilCos = [];
                includedPerilCosGrid.each(function(rec){
                    includedPerilCos.push(rec.data);
                });
            };
            var excludedPerilCos = null;
            var excludedPerilCosGrid = btn.up('window').down('perilv1grid').getStore();
            if(excludedPerilCosGrid.count()>0){
                excludedPerilCos = [];
                excludedPerilCosGrid.each(function(rec){
                    excludedPerilCos.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var lifeCoverageSpecificationV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, lifeCoverageSpecificationV1);
        lifeCoverageSpecificationV1.set (objeto);
        lifeCoverageSpecificationV1.set({
            includedPerilCos: includedPerilCos,
            excludedPerilCos: excludedPerilCos,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var lifeCoverageSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1Validation', {});
        var validations = lifeCoverageSpecificationV1Validation.createValidations (lifeCoverageSpecificationV1);
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
        lifeCoverageSpecificationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        var ventana = Ext.widget('lifecoveragespecificationv1principalwindow');
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

    showIncludedPerilCos: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'perilv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1',
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
        if(rec.get('includedPerilCos')!=null){
            data.push(rec.get('includedPerilCos'));
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

    showExcludedPerilCos: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'perilv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1',
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
        if(rec.get('excludedPerilCos')!=null){
            data.push(rec.get('excludedPerilCos'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LifeCoverageSpecificationV1');
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

            if (paramValues.broadLineOfBusinessCodePrs_fs != "" && paramValues.broadLineOfBusinessCodePrs_fs != null) {
                var broadLineOfBusinessCodePrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'broadLineOfBusinessCodePrs',
                    valor: paramValues.broadLineOfBusinessCodePrs_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.agreement.agreementCodeLists.BroadLineOfBusinessCodeList'
                });
                filtro.push(broadLineOfBusinessCodePrs.data);
            }

            if (paramValues.lineOfBusinessCodePrs_fs != "" && paramValues.lineOfBusinessCodePrs_fs != null) {
                var lineOfBusinessCodePrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'lineOfBusinessCodePrs',
                    valor: paramValues.lineOfBusinessCodePrs_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.agreement.agreementCodeLists.LineOfBusinessCodeList'
                });
                filtro.push(lineOfBusinessCodePrs.data);
            }

            if (paramValues.coveredRiskOccurrenceCountCos_fs != "" && paramValues.coveredRiskOccurrenceCountCos_fs != null) {
                var coveredRiskOccurrenceCountCos = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'coveredRiskOccurrenceCountCos',
                    valor: paramValues.coveredRiskOccurrenceCountCos_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(coveredRiskOccurrenceCountCos.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('lifecoveragespecificationv1formsearch').query("field{isValid()==false}");
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
