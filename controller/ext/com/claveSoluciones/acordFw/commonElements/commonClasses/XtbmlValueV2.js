Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1Validation',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2SearchWindows',
             'AFW_FND_Xjs.view.ext.SelectFileToLoad'
            ],

    init: function() {
        this.control({
            'xtbmlvaluev2formsearch button[action=buscar]': {
                click: this.buscar
            },
            'xtbmlvaluev2grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'xtbmlvaluev2principalwindow button[action=create]': {
                click: this.create
            },
            'xtbmlvaluev2grid button[action=delete]': {
                click: this.deleteElement
            },
            'xtbmlvaluev2grid button[action=edit]': {
                click: this.edit
            },
            'xtbmlvaluev2grid button[action=asignarValor]': {
                click: this.asignarValor
            },
            'xtbmlvaluev2grid button[action=borrarValor]': {
                click: this.deleteElement
            },   
            'xtbmlvaluev2grid menuitem[action=exportFileExcel]': {
                click: this.exportFileExcel
            },
            'xtbmlvaluev2principalwindow button[action=update]': {
                click: this.update
            },
            'xtbmlvaluev2grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'xtbmlvaluev2formsearch button[action=buscaRango]': {
                click: this.abrirRango
            },
            'xtbmlvaluev2searchwindows button[action=seleccionaRango]': {
                click: this.seleccionaRango
            },
            'xtbmlvaluev2searchwindows button[action=limpiaRango]': {
                click: this.limpiaRango
            },
            'xtbmlvaluev2searchwindows button[action=busquedaRangoNombre]': {
                click: this.busquedaRangoNombre
            },
            'xtbmlvaluev2searchwindows button[action=busquedaRangoCodigo]': {
                click: this.busquedaRangoCodigo
            },
            'xtbmlvaluev2searchwindows button[action=buscarValue]': {
                click: this.buscarValue
            },
            'xtbmlvaluev2grid #fixedAmountXtvEditor': {
                blur: this.asignarValor2
            },
            'selectfiletoload button[action=upload]' : {
                click: this.upload
            },
            'xtbmlvaluev2grid menuitem[action=loadfile]' : {
                click: this.loadfile
            }
        });
    },
    

    loadfile: function(btn){
        var win = Ext.widget('selectfiletoload');
        win.show();
    },

    upload: function(btn){
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var me = this;
        if (form.isValid()) {
            var formFile = btn.up('window').down('#docForm').getForm(),
            filename = formFile.getFieldValues().file.replace(/^.*[\\\/]/, ''),
            filenameArray = filename.split('.');
            var componentXtbmlTable = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[Ext.ComponentQuery.query('xtbmltablev2principalwindow').length-1];
            var id = componentXtbmlTable.down('form').getForm().getRecord().get('tableIdentifierXtt');

            if (filenameArray[filenameArray.length - 1] == 'xls' || filenameArray[filenameArray.length - 1] == 'xlsx') {
                formFile.submit({
                    url: urlService + 'file/uploadXtbmlValues',
                    method: 'POST',
                    params: {
                        fileName: filename,
                        userName: usuario.get('userName'),
                        tableId: id
                    },
                    clientValidation: false,
                    scope: me,
                    waitMsg: 'Cargando el archivo...',
                    waitTitle: 'Cargando',
                    success: function(response, action) {
                        var respuesta = Ext.decode(action.response.responseText);
                        if (respuesta.success === true) {
                            if (respuesta.text == undefined) {
                                crearVentana(1, "Carga realizada de forma correcta.");
                            } else {
                                respuesta.text = respuesta.text.replace(/ - /gi, '<br>');
                                crearVentana(5, respuesta.text);
                            }
                        } else {
                            if (respuesta.text != undefined && respuesta.text != null && respuesta.text != "") {
                                crearVentana(5, respuesta.text);
                            } else {
                                crearVentana(5, "No se lograron cargar los datos");
                            }
                        }
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
                        btn.setDisabled(false);
                        btn.up('window').close();
                    },
                    failure: function(form, action) {
                        try{
                            var respuesta = Ext.decode(action.response.responseText);
                             if (respuesta.success === true) {
                                respuesta.text = respuesta.text.replace(/ - /gi, '<br>');
                                crearVentana(5, respuesta.text);
                            } else {
                                if (respuesta.text != undefined && respuesta.text != null && respuesta.text != "") {
                                    crearVentana(5, respuesta.text);
                                } else {
                                    crearVentana(5, "No se lograron cargar los datos");
                                }
                            }
                            btn.setDisabled(false);
                            btn.up('window').close();
                        }catch (err){
                            crearVentana(5, "No se logro subir el archivo");
                            btn.setDisabled(false);
                        }
                    }
                });
            } else {
                crearVentana(5, "El formato del archivo no es el correcto");
                btn.setDisabled(false);
            }
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i < invalidFields.length; i++) {
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
                    msg += invalidFields[i].getErrors()[j] + '. ';
                }
                msg += '<br />';
            }
            crearVentana(5, msg);
            btn.setDisabled(false);
        }
    },

    buscarValue: function(btn){
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var grillaRango = btn.up('window').down("#rangoGrid");
    	    var storeRango = grillaRango.getStore();
           
            var filters = Ext.decode(storeRango.getProxy().extraParams['filters']);
            for(var i = filters.length;i >= 2; i--){
            	if(filters.length > 2){
                        filters.pop();
                }
            }
            var paramValues =  btn.up('form').getValues(false, true, false);
	    paramValues = this.application.getConvertion().convert (paramValues, storeRango.getModel());
			
			
            if (paramValues.nombreRango != "" && paramValues.nombreRango != null) {
                var nombreRango = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'rangeNameXtr',
                    valor: paramValues.nombreRango+"%",
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filters.push(nombreRango.data);
            }

            

            if (paramValues.codigoRango != "" && paramValues.codigoRango != null) {
                var codigoRango = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'varcharValueXtr',
                    valor: paramValues.codigoRango+"%",
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filters.push(codigoRango.data);
            }

            storeRango.pageSize=15;
            if(filters.length>0) storeRango.getProxy().setExtraParam('filters', Ext.encode(filters));
            storeRango.currentPage=1;
            storeRango.load(function(records, operation, success) {
                    btn.up('window').updateLayout();
                    btn.up('window').update();
                    btn.setDisabled(false);
                                   
            });
        } else {
            invalidFields = btn.up('viewport').down('xtbmlvaluev2formsearch').query("field{isValid()==false}");
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
    },
            
    asignarValor2: function(celda){
        //console.log(celda.up().up().getSelectionModel().selected.items[0].data);
        celda.up().up().getSelectionModel().selected.items[0].data.fixedAmountXtv = celda.value;
        if(celda.up().up().getSelectionModel().selected.items[0].data.fixedAmountXtv != null){
            celda.up().up().getSelectionModel().selected.items[0].save();
        }
        else{
            crearVentana(5, "Debe ingresar un Valor");
        }
    },
    
   /* asignarValor: function(btn){
    	btn.setDisabled(true);
    	btn.up('grid').up('window').data = btn.up('grid').up('window').getScrollY();
    	var seleccion = btn.up('grid').selectedRecords;
    	var cont = 0;
    	var valorSeleccionado = btn.up('grid').down('#comboValor').getValue();
    	if (Object.keys(seleccion).length > 0 && valorSeleccionado != null) {
    		btn.up('grid').up('window').mask("Guardando", "x-mask-loading");
                for (key in seleccion) {    			
                        var xtbmlValueV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1', seleccion[key].data);
    			xtbmlValueV1.set({fixedAmountXtv: valorSeleccionado});
    			xtbmlValueV1.save({
    					callback: function (record, operation) {
                            if (operation.success === true) {
                                var respuesta = Ext.decode(operation._response.responseText);
                                if (respuesta.valido === true) {
                                cont=cont+1;
	                                if(cont == Object.keys(seleccion).length){
	                                	crearVentana(respuesta.codigo, respuesta.mensaje);
	                                	btn.setDisabled(false);
	                                    Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
	                                    btn.up('grid').up('window').setScrollY(btn.up('grid').up('window').data);
	                                    btn.up('grid').up('window').unmask();
	                                }
                                } else {
                                	btn.setDisabled(false);
                                	btn.up('grid').up('window').setScrollY(btn.up('grid').up('window').data);
                                	btn.up('grid').up('window').unmask();
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                }
                            } else {
                            	btn.setDisabled(false);
                            	btn.up('grid').up('window').unmask();
                            	btn.up('grid').up('window').setScrollY(btn.up('grid').up('window').data);
                                if (operation.error) {
                                    crearVentana (5, "Error de conexión");
                                }
                            }
                        }		
    			});
    		}    		
    	}else{
    		crearVentana(5, "Debe seleccionar al menos un elemento y un valor");
    		btn.up('grid').up('window').setScrollY(btn.up('grid').up('window').data);
    		btn.up('grid').up('window').unmask();
            btn.setDisabled(false);
    	}
    },*/
    
    borrarValor: function(btn){
    	btn.setDisabled(true);
    	btn.up('grid').up('window').data = btn.up('grid').up('window').getScrollY();
    	var seleccion = btn.up('grid').selectedRecords;
    	var cont = 0;
    	var valorSeleccionado = btn.up('grid').down('#comboValor').getValue();
        if(Object.keys(seleccion).length > 0){
    		
    	}
    	/*
    	if (Object.keys(seleccion).length > 0 && valorSeleccionado != null) {
    		btn.up('grid').up('window').mask("Eliminando", "x-mask-loading");
                for (key in seleccion) {    			
                        var xtbmlValueV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1', seleccion[key].data);
    			
    		}    		
    	}*/else{
    		crearVentana(5, "Debe seleccionar al menos un elemento y un valor");
    		btn.up('grid').up('window').setScrollY(btn.up('grid').up('window').data);
    		btn.up('grid').up('window').unmask();
            btn.setDisabled(false);
    	}
    },
    exportFileExcel: function(btn){
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);

            var form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: urlService + 'file/exportXtbmlValues',
                method: 'POST',
                target: '_blank',
                hrefTarget: '_blank'
            });

            var record = btn.up('window').down('form').getForm().getRecord();
            var id = record.get('tableIdentifierXtt');
            
            form.submit({
                target: '_blank',
                hrefTarget: '_blank',
                timeout: 100000,
                scope: this,
                params: {
                    tableId: id
                }
            });
            
            btn.setDisabled(false);

        } else {
            invalidFields = btn.up('viewport').down('clausev2formsearch').query("field{isValid()==false}");
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
    },
    busquedaRangoNombre: function(btn){
    	var grillaRango = btn.up('window').down("#rangoGrid");
    	var storeRango = grillaRango.getStore();
    	var txtRango = btn.up('window').down("#nombreRango");
    	var filters = Ext.decode(storeRango.getProxy().getExtraParams()['filters']);
    	
    	if(filters.length > 2){
    		filters.pop();
    	}
		filters.push(
    		Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
            	nombreCampo: 'rangeNameXtr',
                valor:  txtRango.getValue()+"%",
                operacion: 'like',
                tipoValor: 'string'
    		}).data);
    	
		storeRango.currentPage=1;
    	storeRango.getProxy().setExtraParam('filters', 
    		Ext.encode(filters));
    	storeRango.load({
			callback: function(records, operation){
				btn.up('window').updateLayout();
				btn.up('window').update();
			}

    	})
    	
    },
    
    busquedaRangoCodigo: function(btn){
    	var grillaRango = btn.up('window').down("#rangoGrid");
    	var storeRango = grillaRango.getStore();
    	var txtRango = btn.up('window').down("#codigoRango");
    	var filters = Ext.decode(storeRango.getProxy().getExtraParams()['filters']);
    	
    	if(filters.length > 2){
    		filters.pop();
    	}
		filters.push(
    		Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
            	nombreCampo: 'varcharValueXtr',
                valor:  txtRango.getValue()+"%",
                operacion: 'like',
                tipoValor: 'string'
    		}).data);
    	
		storeRango.currentPage=1;
    	storeRango.getProxy().setExtraParam('filters', 
    		Ext.encode(filters));
    	storeRango.load({
			callback: function(records, operation){
				btn.up('window').updateLayout();
				btn.up('window').update();
			}

    	})
    	
    },
    
    seleccionaRango: function(btn){
    	var numRango = btn.up('window').getData();
    	var grillaRango =btn.up('window').down("#rangoGrid");
    	var rangosSeleccionados = grillaRango.selectedRecords;
        var rangosArray = [];
        var rangosString = "";
        if(Object.keys(rangosSeleccionados).length > 0 ){
                for (i in rangosSeleccionados) {    			
                        rangosArray.push(rangosSeleccionados[i].get('rangeIdentifierXtr'));
                        if(rangosString.length > 0)
                                rangosString += "; "+ rangosSeleccionados[i].get('rangeNameXtr');
                        else
                                rangosString += rangosSeleccionados[i].get('rangeNameXtr');
                }
                var itemBusqueda = Ext.ComponentQuery.query('[name=dim0'+numRango+'Xtv]')[0];
                itemBusqueda.setValue(rangosString);
                itemBusqueda.data = rangosArray;
                btn.up('window').close();
        }else{
                crearVentana(5, "No hay elementos seleccionados");
        }
    },
    
    limpiaRango: function(btn){
    	var numRango = btn.up('window').getData();
    	var itemBusqueda = Ext.ComponentQuery.query('[name=dim0'+numRango+'Xtv]')[0];
		itemBusqueda.setValue("");
		itemBusqueda.data = null;
		btn.up('window').close();
    },
    
    abrirRango: function(btn) {
    	var window = Ext.widget('xtbmlvaluev2searchwindows');
    	var numRango = btn.itemId.replace("dimbutt0","");
    	var itemBusqueda = Ext.ComponentQuery.query('[name=dim0'+numRango+'Xtv]')[0];
    	var idDimension = btn.getData();
    	var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1');
    	store.pageSize=10;
    	store.getProxy().setExtraParam('filters', 
        		Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'class',
                    valor: 'XtbmlRange',
                    operacion: '=',
                    tipoValor: 'string'
                }).data, Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                	nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                    valor:  idDimension,
                    operacion: '=',
                    tipoValor: 'long'
                }).data]));
    	store.currentPage=1;
        store.load(function(records, operation, success) {
        	window.data = numRango;
        	window.show();
                window.updateLayout();
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
        var tableXtv = null;
        var tableXtvGrid = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form');
        if(form.isValid()
        ){
            if(tableXtvGrid!=null && tableXtvGrid!=undefined){
            	tableXtvGrid.getForm().getRecord().set('dimensionsXtt', null);
            	tableXtvGrid.getForm().getRecord().set('valuesXtt', null);
                tableXtv = tableXtvGrid.getForm().getRecord().data;
            };
            var objeto = form.getValues(false, true, false);
            var xtbmlValueV1Record =  form.getRecord();
            if (xtbmlValueV1Record !== undefined 
                && xtbmlValueV1Record !== null 
                && xtbmlValueV1Record .get('valueIdentifierXtv')!==null 
                && xtbmlValueV1Record .get('valueIdentifierXtv')!==undefined 
                && new String(xtbmlValueV1Record.get('valueIdentifierXtv')).indexOf('XtbmlValueV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var xtbmlValueV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1', {});
				objeto = this.application.getConvertion().convert (objeto, xtbmlValueV1);
                xtbmlValueV1.set(objeto);
                xtbmlValueV1.set({
                    valueIdentifierXtv: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    tableXtv: tableXtv
                });
                var xtbmlValueV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1Validation', {});
                var validations = xtbmlValueV1Validation.createValidations (xtbmlValueV1);
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
                xtbmlValueV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('xtbmlvaluev2principalwindow');
            window.setTitle('Valores de Tabla Nº ' + seleccion[0].get('valueIdentifierXtv'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            if(seleccion[0].get('dim01Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim01Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim01"]').setValue(val);
            }  if(seleccion[0].get('dim02Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim02Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim02"]').setValue(val);
            }  if(seleccion[0].get('dim03Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim03Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim03"]').setValue(val);
            }  if(seleccion[0].get('dim04Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim04Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim04"]').setValue(val);
            }  if(seleccion[0].get('dim05Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim05Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim05"]').setValue(val);
            }  if(seleccion[0].get('dim06Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim06Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim06"]').setValue(val);
            }  if(seleccion[0].get('dim07Xtv')!=null){ 
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim07Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim07"]').setValue(val);
            }  if(seleccion[0].get('dim08Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim08Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim08"]').setValue(val);
            }  if(seleccion[0].get('dim09Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim09Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim09"]').setValue(val);
            }  if(seleccion[0].get('dim10Xtv')!=null){
            	var index = rangeTableStore.findExact('rangeIdentifierXtr', seleccion[0].get('dim10Xtv'));
                var val = index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
            	window.down('[name="dim10"]').setValue(val);
            }
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
        //var seleccion_id = btn.up('grid').selectedRecords;
        if (seleccion.length > 0) {
            Ext.MessageBox.show({
                title: 'Confirmar',
                msg: '¿Está seguro de eliminar los campos seleccionados?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(rec){
                    if( rec === "yes"){
                    	/*for(var i in Ext.ComponentQuery.query("grid")[2].selectedRecords){*/
                    	var seleccion_id = [];
                    	for(var i in Ext.ComponentQuery.query("grid")[2].selectedRecords){
                    		seleccion_id.push(i);
                    	}
                    		Ext.Ajax.request({
                        	    url: urlService+'xtbmlValueService/delete',
                        	    params : {
                        	    	xtv_nvid : JSON.stringify(seleccion_id)
                				},
                				success : function(response) {
                					var respuesta = response.responseText; // Validacion o Borrar
                					if (response.statusText == 'OK') {
                                        crearVentana(1, respuesta);
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
                                        seleccion[0].erase ({
                                            callback: function (record, operation) {
                                                if (operation.success === true) {
                                                    var respuesta = Ext.decode(operation._response.responseText);
                                                    if (respuesta.valido === true) {
                                                        //crearVentana(respuesta.codigo, respuesta.mensaje);
                                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
                                                    } else {
                                                        //crearVentana(respuesta.codigo, respuesta.mensaje);
                                                    }
                                                    btn.setDisabled(false);
                                                } else {
                                                    if (operation.error) {
                                                        //crearVentana (5, "Error de conexión");
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
                                        crearVentana(5, respuesta);
                                    }
                					btn.setDisabled(false);
                				},
                				failure : function(response) {
                					console.log(response);
                					var respuesta = response.responseText;
                					crearVentana(5, respuesta);
                					btn.setDisabled(false);
                				},
                        	    callback: function(options, success, response) {
                        	        console.log(response.responseText);
                        	    }
                        	});
                		//}
                    	
                    	btn.setDisabled(false);
                        /*
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
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
                        });*/
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
        var tableXtv = null;
        var tableXtvGrid = Ext.ComponentQuery.query('xtbmltablev2principalwindow')[0].down('form');
        if(tableXtvGrid!=null && tableXtvGrid!=undefined){
        	tableXtvGrid.getForm().getRecord().set('dimensionsXtt', null);
        	tableXtvGrid.getForm().getRecord().set('valuesXtt', null);
            tableXtv = tableXtvGrid.getForm().getRecord().data;
        };
        var objeto = form.getValues(false, true, false);
        var xtbmlValueV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, xtbmlValueV1);
        xtbmlValueV1.set (objeto);
        xtbmlValueV1.set({
            tableXtv: tableXtv,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var xtbmlValueV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1Validation', {});
        var validations = xtbmlValueV1Validation.createValidations (xtbmlValueV1);
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
        xtbmlValueV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1').reload();
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                   // btn.setDisabled(false);
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2');
        var ventana = Ext.widget('xtbmlvaluev2principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showTableXtv: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'xtbmltablev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
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
        if(rec.get('tableXtv')!=null){
            data.push(rec.get('tableXtv'));
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
            btn.up('window').down('xtbmlvaluev2grid').selectedRecords={};
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1');
            /**store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);**/
            var filters = Ext.decode(store.getProxy().extraParams['filters']);
            for(var i = filters.length;i >= 2; i--){
            	if(filters.length > 2){
					filters.pop();
				}
            }
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());
			
			
            if (paramValues.valueIdentifierXtv != "" && paramValues.valueIdentifierXtv != null) {
                var valueIdentifierXtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'valueIdentifierXtv',
                    valor: paramValues.valueIdentifierXtv,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filters.push(valueIdentifierXtv.data);
            }

            if (paramValues.typeNameImo != "" && paramValues.typeNameImo != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filters.push(typeNameImo.data);
            }

            if (paramValues.dim01Xtv != "" && paramValues.dim01Xtv != null) {
                var dim01Xtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dim01Xtv',
                    valores: Ext.ComponentQuery.query('[name=dim01Xtv]')[0].data,//ARRAY
                    operacion: 'in',
                    tipoValor: 'int'
                });
                filters.push(dim01Xtv.data);
            }

            if (paramValues.dim02Xtv != "" && paramValues.dim02Xtv != null) {
                var dim02Xtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dim02Xtv',
                    valores: Ext.ComponentQuery.query('[name=dim02Xtv]')[0].data,//ARRAY
                    operacion: 'in',
                    tipoValor: 'int'
                });
                filters.push(dim02Xtv.data);
            }

            if (paramValues.dim03Xtv != "" && paramValues.dim03Xtv != null) {
                var dim03Xtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dim03Xtv',
                    valores: Ext.ComponentQuery.query('[name=dim03Xtv]')[0].data,//ARRAY
                    operacion: 'in',
                    tipoValor: 'int'
                });
                filters.push(dim03Xtv.data);
            }
            
            if (paramValues.dim04Xtv != "" && paramValues.dim04Xtv != null) {
                var dim04Xtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dim04Xtv',
                    valores: Ext.ComponentQuery.query('[name=dim04Xtv]')[0].data,//ARRAY
                    operacion: 'in',
                    tipoValor: 'int'
                });
                filters.push(dim04Xtv.data);
            }
            
            if (paramValues.dim05Xtv != "" && paramValues.dim05Xtv != null) {
                var dim05Xtv = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dim05Xtv',
                    valores: Ext.ComponentQuery.query('[name=dim05Xtv]')[0].data,//ARRAY
                    operacion: 'in',
                    tipoValor: 'int'
                });
                filters.push(dim05Xtv.data);
            }

            store.pageSize=15;
            if(filters.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filters));
            var scrollY = btn.up('window').getScrollY();
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
                btn.up('window').setScrollY(scrollY);
            });
        } else {
            invalidFields = btn.up('viewport').down('xtbmlvaluev2formsearch').query("field{isValid()==false}");
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
