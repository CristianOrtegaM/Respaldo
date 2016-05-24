Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation'
            ],

    init: function() {
        this.control({
            'xtbmltablev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'xtbmltablev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'xtbmltablev1principalwindow button[action=create]': {
                click: this.create
            },
            'xtbmltablev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'xtbmltablev1grid button[action=edit]': {
                click: this.edit
            },
            'xtbmltablev1principalwindow button[action=update]': {
                click: this.update
            },
            'xtbmltablev1grid actioncolumn[action=showDimensionsXtt]': {
                click: this.showDimensionsXtt
            },
            'xtbmltablev1grid actioncolumn[action=showValuesXtt]': {
                click: this.showValuesXtt
            },
            'xtbmltablev1grid button[action=mostrarWindows]': {
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
        var dimensionsXtt = null;
        var dimensionsXttGrid = btn.up('window').down('xtbmldimensionv1grid').getStore();
        var valuesXtt = null;
        var valuesXttGrid = btn.up('window').down('xtbmlvaluev1grid').getStore();
        if(form.isValid()
        ){
            if(dimensionsXttGrid.count()>0){
                dimensionsXtt = [];
                dimensionsXttGrid.each(function(rec){
                    dimensionsXtt.push(rec.data);
                });
            };
            if(valuesXttGrid.count()>0){
                valuesXtt = [];
                valuesXttGrid.each(function(rec){
                    valuesXtt.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var xtbmlTableV1Record =  form.getRecord();
            if (xtbmlTableV1Record !== undefined 
                && xtbmlTableV1Record !== null 
                && xtbmlTableV1Record .get('tableIdentifierXtt')!==null 
                && xtbmlTableV1Record .get('tableIdentifierXtt')!==undefined 
                && new String(xtbmlTableV1Record.get('tableIdentifierXtt')).indexOf('XtbmlTableV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var xtbmlTableV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', {});
                objeto = this.application.getConvertion().convert (objeto, xtbmlTableV1);
                xtbmlTableV1.set(objeto);
                xtbmlTableV1.set({
                    tableIdentifierXtt: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    dimensionsXtt: dimensionsXtt,
                    valuesXtt: valuesXtt
                });
                var xtbmlTableV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation', {});
                var validations = xtbmlTableV1Validation.createValidations (xtbmlTableV1);
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
                xtbmlTableV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('xtbmltablev1principalwindow');
            window.setTitle('Tabla Nº ' + seleccion[0].get('tableIdentifierXtt'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var dimensionsXttGrid = Ext.ComponentQuery.query('#dimensionsXttGrid')[0];
            dimensionsXttGrid.getStore().loadRawData(seleccion[0].get('dimensionsXtt')[0], true);
            var valuesXttGrid = Ext.ComponentQuery.query('#valuesXttGrid')[0];
            valuesXttGrid.getStore().loadRawData(seleccion[0].get('valuesXtt')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var dimensionsXtt = null;
        var dimensionsXttGrid = btn.up('window').down('xtbmldimensionv1grid').getStore();
        var valuesXtt = null;
        var valuesXttGrid = btn.up('window').down('xtbmlvaluev1grid').getStore();
        if(form.isValid()
        ){
            if(dimensionsXttGrid.count()>0){
                dimensionsXtt = [];
                dimensionsXttGrid.each(function(rec){
                    dimensionsXtt.push(rec.data);
                });
            };
            if(valuesXttGrid.count()>0){
                valuesXtt = [];
                valuesXttGrid.each(function(rec){
                    valuesXtt.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var xtbmlTableV1Record =  form.getRecord();
            if (xtbmlTableV1Record !== undefined 
                && xtbmlTableV1Record !== null 
                && xtbmlTableV1Record .get('tableIdentifierXtt')!==null 
                && xtbmlTableV1Record .get('tableIdentifierXtt')!==undefined 
                && new String(xtbmlTableV1Record.get('tableIdentifierXtt')).indexOf('XtbmlTableV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var xtbmlTableV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', {});
                xtbmlTableV1.set(objeto);
                xtbmlTableV1.set({
                    tableIdentifierXtt: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    dimensionsXtt: dimensionsXtt,
                    valuesXtt: valuesXtt
                });
                var xtbmlTableV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation', {});
                var validations = xtbmlTableV1Validation.createValidations (xtbmlTableV1);
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
                return xtbmlTableV1;
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('xtbmltablev1principalwindow');
            window.setTitle('Tabla Nº ' + seleccion[0].get('tableIdentifierXtt'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var dimensionsXttGrid = Ext.ComponentQuery.query('#dimensionsXttGrid')[0];
            dimensionsXttGrid.getStore().loadRawData(seleccion[0].get('dimensionsXtt')[0], true);
            var valuesXttGrid = Ext.ComponentQuery.query('#valuesXttGrid')[0];
            valuesXttGrid.getStore().loadRawData(seleccion[0].get('valuesXtt')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1').reload();
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
            var dimensionsXtt = null;
            var dimensionsXttGrid = btn.up('window').down('xtbmldimensionv1grid').getStore();
            if(dimensionsXttGrid.count()>0){
                dimensionsXtt = [];
                dimensionsXttGrid.each(function(rec){
                    dimensionsXtt.push(rec.data);
                });
            };
            var valuesXtt = null;
            var valuesXttGrid = btn.up('window').down('xtbmlvaluev1grid').getStore();
            if(valuesXttGrid.count()>0){
                valuesXtt = [];
                valuesXttGrid.each(function(rec){
                    valuesXtt.push(rec.data);
                });
            };
        var objeto = form.getValues(false, true, false);
        var xtbmlTableV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, xtbmlTableV1);
        xtbmlTableV1.set (objeto);
        xtbmlTableV1.set({
            dimensionsXtt: dimensionsXtt,
            valuesXtt: valuesXtt,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var xtbmlTableV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation', {});
        var validations = xtbmlTableV1Validation.createValidations (xtbmlTableV1);
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
        xtbmlTableV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1');
        var ventana = Ext.widget('xtbmltablev1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showDimensionsXtt: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'xtbmldimensionv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1',
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
        if(rec.get('dimensionsXtt')!=null){
            data.push(rec.get('dimensionsXtt'));
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

    showValuesXtt: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'xtbmlvaluev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1',
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
        if(rec.get('valuesXtt')!=null){
            data.push(rec.get('valuesXtt'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.tableIdentifierXtt != "" && paramValues.tableIdentifierXtt != null) {
                var tableIdentifierXtt = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'tableIdentifierXtt',
                    valor: paramValues.tableIdentifierXtt,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(tableIdentifierXtt.data);
            }

            if (paramValues.typeNameImo != "" && paramValues.typeNameImo != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            if (paramValues.tableNameXtt != "" && paramValues.tableNameXtt != null) {
                var tableNameXtt = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'tableNameXtt',
                    valor: paramValues.tableNameXtt+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(tableNameXtt.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('xtbmltablev1formsearch').query("field{isValid()==false}");
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
