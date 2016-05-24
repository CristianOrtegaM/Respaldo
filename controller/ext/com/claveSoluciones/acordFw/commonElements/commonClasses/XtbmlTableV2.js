Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
             'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
             'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1'
             ],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2CopyFormInput',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableInputV2PrincipalWindow'
            ],

    init: function() {
        this.control({
            'xtbmltablev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'xtbmltablev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'xtbmltablev2principalwindow button[action=create]': {
                click: this.create
            },
            'xtbmltablev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'xtbmltablev1grid button[action=edit]': {
                click: this.edit
            },
            'xtbmltablev2principalwindow button[action=update]': {
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
            },
            'xtbmltablev2copyforminput button[action=copyTable]' : {
            	click: this.copyTable
            },
            'xtbmltablev2principalwindow button[action=createValues]' : {
            	click: this.createValues
            },
            'xtbmltablev2principalwindow button[action=updateInput]' : {
            	click: this.updateInput
            },
            'xtbmltableinputv2principalwindow button[action=create]' : {
            	click: this.updateInputFull
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
        alert("create");
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var dimensionsXtt = null;
        var dimensionsXttGrid = btn.up('window').down('xtbmldimensionv1grid').getStore();
        var valuesXtt = null;
        var valuesXttGrid = btn.up('window').down('xtbmlvaluev2grid').getStore();
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
                        errors =  utilValidation.validation(validations);
                    }
                }
                if (errors !== null && errors !== undefined) {
                    crearVentana(5, errors);
                    btn.setDisabled(false);
                    return null;
                }
                btn.up('window').mask("Guardando", "x-mask-loading");
                rangeTableStore = new Ext.data.Store({
                	model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
	                data: []
                });
                xtbmlTableV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                //btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1').reload();
                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', respuesta.data);
                                var form = btn.up('window').down('form').getForm().loadRecord(record);
                                var proxy = xtbmlTableV1.getProxy();
                                /**record.setProxy({
                                	type: 'rest',
                                	url: urlService + 'xtbmlRangeService/findRageNamesByXtbTable',
                                	actionMethods: {
                                		create: 'POST',
                                		update: 'POST'
                                	}
                                });
                                record.save({
                        			callback: function(rec, operation){	
                        				rec.setProxy(proxy);
                        				if(operation.success){
                        					var respuesta = Ext.decode(operation.response.responseText);
                        					rangeTableStore.loadRawData(respuesta.datos,true);
                        				}
                        			}
                        		});**/
                                btn.up('window').down('#itemDimension').setDisabled(false);
                                btn.up('window').down('#itemValue').setDisabled(false);
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        rangeTableStore = new Ext.data.Store({
        	model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
            data: []
        });
        if (seleccion.length > 0) {
        	idPrincipal = seleccion[0].get('tableIdentifierXtt');
        	
            var window = Ext.widget('xtbmltablev2principalwindow');
            window.setTitle('Tabla Nº ' + seleccion[0].get('tableIdentifierXtt'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('#itemDimension').setDisabled(false);
            window.down('#itemValue').setDisabled(false);
            window.show();
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
                        valor:  seleccion[0].data.tableIdentifierXtt,
                        operacion: '=',
                        tipoValor: 'long'
                    }).data]));
            var valuesXttGrid = Ext.ComponentQuery.query('#valuesXttGrid')[0];
            dimensionsXttGrid.getStore().currentPage=1;
            dimensionsXttGrid.getStore().start=0;
            dimensionsXttGrid.getStore().load(
            	function(records, operation, success) {
            		if(success == true){
            			for(var i=0;i<records.length;i++){
                    		var itemBusqueda = Ext.ComponentQuery.query('[name=dim0'+records[i].get('dimSequenceXtd')+'Xtv]')[0];
                    		itemBusqueda.setVisible(true);
                    		itemBusqueda.setFieldLabel(records[i].get('transactionCodeXtd'));
                    		var itemButton = Ext.ComponentQuery.query('[itemId=dimbutt0'+records[i].get('dimSequenceXtd')+']')[0];
                    		itemButton.setVisible(true);
                    		itemButton.data = records[i].get('dimensionIdentifierXtd');
                    		var column = valuesXttGrid.down('[dataIndex=dim0'+records[i].get('dimSequenceXtd')+'Xtv]');
                    		column.setVisible(true);
                    		column.setText(records[i].get('transactionCodeXtd'));
                    		var column_varcharValueXtr= valuesXttGrid.down('[itemId=dim0'+records[i].get('dimSequenceXtd')+'Xtv_varcharValueXtr]');
                    		column_varcharValueXtr.setVisible(true);
                    		column_varcharValueXtr.setText('Código '+records[i].get('transactionCodeXtd'));
				       
                    	}
                    }                   
                }
        	);
            
            
//            dimensionsXttGrid.getStore().loadRawData(seleccion[0].get('dimensionsXtt'), false);
            valuesXttGrid.getStore().pageSize=15;
            valuesXttGrid.getStore().getProxy().setExtraParam('filters', 
            		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'class',
                        valor: 'XtbmlValue',
                        operacion: '=',
                        tipoValor: 'string'
                    }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    	nombreCampo: 'tableXtv.tableIdentifierXtt',
                        valor:  seleccion[0].data.tableIdentifierXtt,
                        operacion: '=',
                        tipoValor: 'long'
                    }).data]));
            valuesXttGrid.getStore().currentPage=1;
            valuesXttGrid.getStore().start=0;
            //valuesXttGrid.getStore().load();
            
            var proxy = seleccion[0].getProxy().getUrl();
        	seleccion[0].getProxy().setUrl(urlService + 'xtbmlRangeService/findRageNamesByXtbTable');
        	seleccion[0].save({
    			callback: function(rec, operation){	
    				rec.getProxy().setUrl(proxy);    				
    				if(operation.success){
    					var respuesta = Ext.decode(operation._response.responseText);
    					rangeTableStore.loadRawData(respuesta.datos,true);
    					valuesXttGrid.getStore().load();
    					window.show();
    				}
    			}
    		});
            
//            valuesXttGrid.getStore().loadRawData(seleccion[0].get('valuesXtt'), true);
            if(seleccion[0].get('completeIndicatorXtt')){
            	window.down('button[action=edit]').setDisabled(true);
            	window.down('button[text="Copiar"]').setDisabled(false);
            	//window.down('button[text="Cerrar"]').setDisabled(true);
            } else if(!seleccion[0].get('completeIndicatorXtt')){
            	window.down('button[action=edit]').setDisabled(false);
            	window.down('button[text="Copiar"]').setDisabled(true);
            	//window.down('button[text="Cerrar"]').setDisabled(false);
            }
            
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
            var valuesXttGrid = btn.up('window').down('xtbmlvaluev2grid').getStore();
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
                        //btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1').reload();
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
//                    btn.setDisabled(false);
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
                crearVentana (5, "Error de conexión");
            }
        });
    },

    mostrarWindows: function(btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2');
        var ventana = Ext.widget('xtbmltablev2principalwindow');
        var dimensionsXttGrid = ventana.down('xtbmldimensionv1grid');
        
        dimensionsXttGrid.getStore().pageSize=15;
        dimensionsXttGrid.getStore().getProxy().setExtraParam('filters', 
        		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'class',
                    valor: 'XtbmlDimension',
                    operacion: '=',
                    tipoValor: 'string'
                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                	nombreCampo: 'tableXtd.tableIdentifierXtt',
                    valor:  0,
                    operacion: '=',
                    tipoValor: 'long'
                }).data]));
        dimensionsXttGrid.getStore().currentPage=1;
        dimensionsXttGrid.getStore().load();
        ventana.show();

        
        var valuesXttGrid = ventana.down('xtbmlvaluev2grid');
        
        valuesXttGrid.getStore().pageSize=15;
        valuesXttGrid.getStore().getProxy().setExtraParam('filters', 
        		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'class',
                    valor: 'XtbmlValue',
                    operacion: '=',
                    tipoValor: 'string'
                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                	nombreCampo: 'tableXtv.tableIdentifierXtt',
                    valor:  0,
                    operacion: '=',
                    tipoValor: 'long'
                }).data]));
        valuesXttGrid.getStore().currentPage=1;
        valuesXttGrid.getStore().load();
        ventana.show();
        
        
        btn.setDisabled(false);
        

    },
        
        

    showDimensionsXtt: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2');
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
    
    copyTable: function(btn){
    	btn.setDisabled(true);
    	var record = btn.up('window').down('form').getForm().getRecord();
    	var newTableName = btn.up('window').down('textfield').getValue();
    	record.set('tableNameXtt', newTableName);
    	var proxy = record.getProxy().getUrl();
//		record.setProxy({
//            type: 'rest',
//            url: urlService + 'xtbmlTableService/copyXtbmlTable',
//            actionMethods: {
//                create: 'POST',
//                update: 'POST'
//            }
//		});
		record.getProxy().setUrl(urlService + 'xtbmlTableService/copyXtbmlTable');
		record.save({
			callback: function(rec, operation){	
				rec.getProxy().setUrl(proxy);
                if (operation.success === true) {
                	var window = btn.up('window');
                	window.close();
                	btn.setDisabled(false);
                    
                    Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].close();
                    Ext.ComponentQuery.query('xtbmltablev1grid')[0].getStore().load();
                } else {
                    if (operation.error!=null) {
                        crearVentana (operation.error.status, operation.error.statusText);
                        Ext.ComponentQuery.query('xtbmltablev1grid')[0].getStore().load();
                        btn.setDisabled(false);
                    }
                }                
			}
		});
    },
    
    closeTable: function(btn){
    	btn.setDisabled(true);
    	var record = btn.up('window').down('form').getForm().getRecord();
    	var proxy = record.getProxy().getUrl();
//		record.setProxy({
//            type: 'rest',
//            url: urlService + 'xtbmlTableService/closeXtbmlTable',
//            actionMethods: {
//                create: 'POST',
//                update: 'POST'
//            }
//		});
    	record.getProxy().setUrl(urlService + 'xtbmlTableService/closeXtbmlTable');
		record.save({
			callback: function(rec, operation){	
				rec.setProxy(proxy);
                if (operation.success === true) {
                	var window = btn.up('window');
                	window.close();
                    Ext.ComponentQuery.query('xtbmltablev1grid')[0].getStore().reload();
                } else {
                    if (operation.error!=null) {
                        crearVentana (operation.error.status, operation.error.statusText);
                        Ext.ComponentQuery.query('xtbmltablev1grid')[0].getStore().load();
                        btn.setDisabled(false);
                    }
                }                
			}
		});
    },
    
    createValues: function(btn){
    	btn.setDisabled(true);
    	var record = btn.up('window').down('form').getForm().getRecord();
        record.getProxy().setTimeout(60000);
        var me=this;
       
    	if(record!=null){
	    	var proxy = record.getProxy().getUrl();
			record.getProxy().setUrl(urlService + 'xtbmlTableService/createXtbmlValues');
			btn.up('window').down('xtbmlvaluev2grid').mask("Actualizando valores", "x-mask-loading");
			record.save({
				callback: function(rec, operation){
					btn.up('window').down('xtbmlvaluev2grid').unmask();
					rec.getProxy().setUrl(proxy);
	                if (operation.success === true) {
                            
                            
                            var proxy_v2 = rec.getProxy().getUrl();
                            rec.getProxy().setUrl(urlService + 'xtbmlRangeService/findRageNamesByXtbTable');
                            rec.save({
                                    callback: function(rec, operation){	
                                            rec.getProxy().setUrl(proxy_v2);    				
                                            if(operation.success){
                                                    var respuesta = Ext.decode(operation._response.responseText);
                                                    rangeTableStore = new Ext.data.Store({
                                                            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
                                                            data: []
                                                    });
                                                    rangeTableStore.loadRawData(respuesta.datos,true);
                                                     btn.setDisabled(false);                    
                                                    Ext.ComponentQuery.query('xtbmltablev1grid')[0].getStore().load();
                                                    Ext.ComponentQuery.query('xtbmlvaluev2grid')[0].getStore().load();
                                                    crearVentana (1, "Se ha actualizado la Tabla de Valores");
                                            }
                                    }
                            });
	                   
	                } else {
	                    if (operation.error!=null) {
	                    	if(operation.error.statusText==="communication failure"){
		                    crearVentana (3, "Tiempo de espera agotado. Vuelva a revisar la información dentro de 30 segundos");
	                    	}else {Ext.ComponentQuery.query('xtbmltablev2grid')[0].getStore().load();}
	                        btn.setDisabled(false);
	                    }
	                }                
				}
			});
    	}
    },
    
    updateInput: function(btn){
//        var window = Ext.widget('xtbmltableinputv2principalwindow');
//        window.show();
    	btn.setDisabled(true);
    	var record = btn.up('window').down('form').getForm().getRecord();
    	if(record!=null){
			var reportCode = record.data.tableNameXtt;
			btn.up('window').mask("Actualizando Input", "x-mask-loading");
			Ext.Ajax
					.request({
						url : urlService
								+ 'indicatorAccountService/createAndUpdateFromXtbmlvalue',
						params : {
							reportCode : reportCode,
							user : usuario.get('userName')
						},
						timeout: 60000,
						scope : this,
						success : function(response) {
							var respuesta = Ext.decode(response.responseText);
					    	crearVentana (respuesta.codigo, respuesta.mensaje);

					    	btn.setDisabled(false);
					    	btn.up('window').unmask();
						},
						failure : function(response) {
							if(response.statusText==="communication failure"){
		                    crearVentana (3, "Tiempo de espera agotado. Vuelva a revisar la información dentro de 30 segundos");
	                    	}else { crearVentana (response.status, response.statusText);}
					    	btn.setDisabled(false);
					    	btn.up('window').unmask();
						}
					});
    	}
    },
    
    updateInputFull: function(btn){
    	btn.setDisabled(true);
    	
    	var initialPeriod = Ext.getCmp('periodstartid').valueModels[0].data.periodCodePer;
    	var finalPeriod = Ext.getCmp('periodendid').valueModels[0].data.periodCodePer;
    	var reportCode = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form').getForm().getRecord().data.tableNameXtt;
            	
    	if(reportCode != null && reportCode != ""){					
			btn.up('window').mask("Actualizando Input", "x-mask-loading");
			Ext.Ajax
					.request({
						url : urlService
								+ 'indicatorAccountService/createAndUpdateFromXtbmlvalue',
						params : {
							reportCode : reportCode,
							initialPeriod : initialPeriod,
							finalPeriod : finalPeriod,
							user : UserName
						},
						timeout: 60000,
						scope : this,
						success : function(response) {
							var respuesta = Ext.decode(response.responseText);
					    	crearVentana (respuesta.codigo, respuesta.mensaje);

					    	btn.setDisabled(false);
					    	btn.up('window').unmask();
					    	btn.up('window').close();
						},
						failure : function(response) {
							if(response.statusText==="communication failure"){
		                    crearVentana (3, "Tiempo de espera agotado. Vuelva a revisar la información dentro de 30 segundos");
	                    	}else { crearVentana (response.status, response.statusText);}
					    	btn.setDisabled(false);
					    	btn.up('window').unmask();
						}
					});
    	} else {
    		btn.setDisabled(false);
    	}
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
