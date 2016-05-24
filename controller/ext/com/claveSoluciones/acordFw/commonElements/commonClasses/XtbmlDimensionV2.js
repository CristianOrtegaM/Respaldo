Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Validation'
            ],

    init: function() {
        this.control({
            'xtbmldimensionv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'xtbmldimensionv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'xtbmldimensionv2principalwindow button[action=create]': {
                click: this.create
            },
            'xtbmldimensionv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'xtbmldimensionv1grid button[action=edit]': {
                click: this.edit
            },
            'xtbmldimensionv2principalwindow button[action=update]': {
                click: this.update
            },
            'xtbmldimensionv1grid actioncolumn[action=showRangesXtd]': {
                click: this.showRangesXtd
            },
            'xtbmldimensionv1grid button[action=mostrarWindows]': {
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
        var tableXtd = null;
        var tableXtdGrid = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form');
        var rangesXtd = null;
        var rangesXtdGrid = btn.up('window').down('xtbmlrangev2grid').getStore();
        if(form.isValid()
        ){
            if(tableXtdGrid!=null && tableXtdGrid!=undefined){
                tableXtd = tableXtdGrid.getForm().getRecord().data;
            };
            if(rangesXtdGrid.count()>0){
                rangesXtd = [];
                rangesXtdGrid.each(function(rec){
                    rangesXtd.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var xtbmlDimensionV1Record =  form.getRecord();
            if (xtbmlDimensionV1Record !== undefined 
                && xtbmlDimensionV1Record !== null 
                && xtbmlDimensionV1Record .get('dimensionIdentifierXtd')!==null 
                && xtbmlDimensionV1Record .get('dimensionIdentifierXtd')!==undefined 
                && new String(xtbmlDimensionV1Record.get('dimensionIdentifierXtd')).indexOf('XtbmlDimensionV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var xtbmlDimensionV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1', {});
                objeto = this.application.getConvertion().convert (objeto, xtbmlDimensionV1);
                xtbmlDimensionV1.set(objeto);
                xtbmlDimensionV1.set({
                    dimensionIdentifierXtd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    tableXtd: tableXtd,
                    rangesXtd: rangesXtd
                });
                var xtbmlDimensionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Validation', {});
                var validations = xtbmlDimensionV1Validation.createValidations (xtbmlDimensionV1);
                var errors = null;
                if (validations !== null || validations.length>0) {
                    var utilValidation = this.application.getUtilValidation();
                    if(validations[0]!==undefined){
                        errors =  utilValidation.validation(validations);
                    }
                }
                if (errors !== null && errors !== undefined) {
                    crearVentana(5, errors);
                    btn.setDisabled(false);
                    return null;
                }
                btn.up('window').mask("Guardando", "x-mask-loading");
                xtbmlDimensionV1.getProxy().setUrl(urlService+'xtbmlDimensionService');
	        xtbmlDimensionV1.getProxy().setAppendId(false);
                xtbmlDimensionV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1').reload();
                                var storeTable = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1');
                                storeTable.reload({
                                	callback: function(records, operation){
//                                		var storeTable = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1');
//                                		var index = storeTable.findExact('tableIdentifierXtt', tableXtd.tableIdentifierXtt);
//                                        var recTable = storeTable.getAt(index);
                                        //Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('xtbmldimensionv1grid').getStore().reload();//Data(recTable.data.dimensionsXtt, false);
                                        var dimensionsXttGrid = Ext.ComponentQuery.query('#dimensionsXttGrid')[0];
            
                                        dimensionsXttGrid.getStore().pageSize=15;
                                        dimensionsXttGrid.getStore().getProxy().setExtraParam('filters', 
                                                    Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: 'XtbmlDimension',
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'tableXtd.tableIdentifierXtt',
                                                    valor:  Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form').getForm().getRecord().data.tableIdentifierXtt,
                                                    operacion: '=',
                                                    tipoValor: 'long'
                                                }).data]));
                                        dimensionsXttGrid.getStore().currentPage=1;
                                        dimensionsXttGrid.getStore().start=0;
                                        dimensionsXttGrid.getStore().load();
                                	}
                                });
                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1', respuesta.data);
                                Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form').getForm().loadRecord(record);
                                btn.up('window').down('#rangesXtdGrid').setDisabled(false);
                                
                                var rangesXttGrid = Ext.ComponentQuery.query('#rangesXtdGrid')[0];
                                
                                rangesXttGrid.getStore().pageSize=15;
                                rangesXttGrid.getStore().getProxy().setExtraParam('filters', 
                                		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                            nombreCampo: 'class',
                                            valor: 'XtbmlRange',
                                            operacion: '=',
                                            tipoValor: 'string'
                                        }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                        	nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                                            valor:  record.data.dimensionIdentifierXtd,
                                            operacion: '=',
                                            tipoValor: 'long'
                                        }).data]));
                                rangesXttGrid.getStore().currentPage=1;
                                rangesXttGrid.getStore().start=0;
                                rangesXttGrid.getStore().load();
                                
//                                var index = storeTable.findExact('tableIdentifierXtt', tableXtd.tableIdentifierXtt);
//                                var recTable = storeTable.getAt(index);
//                                Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('xtbmldimensionv1grid').getStore().loadData(recTable.data.dimensionsXtt, false);
//                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1', respuesta.data);
//                                form.loadRecord(record);
//                                btn.up('window').down('#itemRange').setDisabled(false);
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2');
		this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        var record = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form').getForm().getRecord();
        record.set('dimensionsXtt', null);
        if (seleccion.length > 0) {
            seleccion[0].set({
            	tableXtd: record.data
            });            
            var window = Ext.widget('xtbmldimensionv2principalwindow');
            window.down('#tableXtdGrid').getStore().loadData(record.data,true);
            window.setTitle('Dimensión de Tabla Nº ' + seleccion[0].get('dimensionIdentifierXtd'));
            if (seleccion[0].get('transactionCodeXtd') !== null && seleccion[0].get('transactionCodeXtd') !== undefined) {
            	window.setTitle('Dimensión de Tabla Nº ' + seleccion[0].get('dimensionIdentifierXtd') + ': ' + seleccion[0].get('transactionCodeXtd'));	
            } 
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('#rangesXtdGrid').setDisabled(false);
            window.show();
//            var rangesXtdGrid = Ext.ComponentQuery.query('#rangesXtdGrid')[0];
//            rangesXtdGrid.getStore().loadRawData(seleccion[0].get('rangesXtd'), true);
            
            var rangesXttGrid = Ext.ComponentQuery.query('#rangesXtdGrid')[0];
            
            rangesXttGrid.getStore().pageSize=15;
            rangesXttGrid.getStore().getProxy().setExtraParam('filters', 
            		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'class',
                        valor: 'XtbmlRange',
                        operacion: '=',
                        tipoValor: 'string'
                    }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    	nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                        valor:  seleccion[0].data.dimensionIdentifierXtd,
                        operacion: '=',
                        tipoValor: 'long'
                    }).data]));
            rangesXttGrid.getStore().currentPage=1;
            rangesXttGrid.getStore().load();
            rangesXttGrid.down('progressbar').el.dom.style.pointerEvents='none';

            
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1').reload();
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
//            var tableXtd = null;
//            var tableXtdGrid = btn.up('window').down('xtbmltablev1grid').getStore();
//            if(tableXtdGrid.count()>0){
//                tableXtd = tableXtdGrid.getAt(0).data;
//            };
            var rangesXtd = null;
            var rangesXtdGrid = btn.up('window').down('xtbmlrangev2grid').getStore();
            if(rangesXtdGrid.count()>0){
                rangesXtd = [];
                rangesXtdGrid.each(function(rec){
                    rangesXtd.push(rec.data);
                });
            };
        var objeto = form.getValues();
        var xtbmlDimension = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, xtbmlDimension);
        xtbmlDimension.set (objeto);
        xtbmlDimension.set({
//            tableXtd: tableXtd,
            rangesXtd: rangesXtd,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var xtbmlDimensionV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Validation', {});
        var validations = xtbmlDimensionV1Validation.createValidations (xtbmlDimension);
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
        xtbmlDimension.getProxy().setUrl(urlService+'xtbmlDimensionService/'+xtbmlDimension.getId());
	xtbmlDimension.getProxy().setAppendId(false);
        xtbmlDimension.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1').reload();
                        var storeTable = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1');
                        storeTable.reload();
                        var index = storeTable.findExact('tableIdentifierXtt', Ext.ComponentQuery.query('#tableXtdGrid')[0].getStore().getAt(0).data.tableIdentifierXtt);
                        var recTable = storeTable.getAt(index);
                        Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('xtbmldimensionv1grid').getStore().loadData(recTable.data.dimensionsXtt, false);
						var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1', respuesta.data);
						Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form').getForm().loadRecord(record);
                        
                        var rangesXttGrid = Ext.ComponentQuery.query('#rangesXtdGrid')[0];
                        
                        rangesXttGrid.getStore().pageSize=15;
                        rangesXttGrid.getStore().getProxy().setExtraParam('filters', 
                        		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'class',
                                    valor: 'XtbmlRange',
                                    operacion: '=',
                                    tipoValor: 'string'
                                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                	nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                                    valor:  record.data.dimensionIdentifierXtd,
                                    operacion: '=',
                                    tipoValor: 'long'
                                }).data]));
                        rangesXttGrid.getStore().currentPage=1;
                        rangesXttGrid.getStore().load();
                        
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2');
        var ventana = Ext.widget('xtbmldimensionv2principalwindow');
		var rec = btn.up('window').down('form').getForm().getRecord();
//        ventana.down('#tableXtdGrid').getStore().loadRawData(rec.data,true);
		
		var rangesXttGrid = ventana.down('#rangesXtdGrid');
        
        rangesXttGrid.getStore().pageSize=15;
        rangesXttGrid.getStore().getProxy().setExtraParam('filters', 
        		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'class',
                    valor: 'XtbmlRange',
                    operacion: '=',
                    tipoValor: 'string'
                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                	nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                    valor:  0,
                    operacion: '=',
                    tipoValor: 'long'
                }).data]));
        rangesXttGrid.getStore().currentPage=1;
        rangesXttGrid.getStore().load();
		
        ventana.show();
        rangesXttGrid.getStore().reload();
        rangesXttGrid.down('progressbar').el.dom.style.pointerEvents='none';
        btn.setDisabled(false);
    },

    showRangesXtd: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'xtbmlrangev2grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
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
        if(rec.get('rangesXtd')!=null){
            data.push(rec.get('rangesXtd'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.dimensionIdentifierXtd != "" && paramValues.dimensionIdentifierXtd != null) {
                var dimensionIdentifierXtd = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dimensionIdentifierXtd',
                    valor: paramValues.dimensionIdentifierXtd,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(dimensionIdentifierXtd.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('xtbmldimensionv1formsearch').query("field{isValid()==false}");
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
