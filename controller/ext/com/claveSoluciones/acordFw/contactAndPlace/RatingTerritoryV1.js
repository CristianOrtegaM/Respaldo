Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Grid',
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
            },
            '#place_ratingterritory': {
                find_places: this.findPlaces
            },
            
            '#tipoplace_ratingterritory': {
                load_places_ratingterritory: this.loadPlaces
            }
        });
    },

	loadPlaces: function(cmp){
		 var filtro = [];
		 var tipo = cmp.getValue();
		 var place = cmp.getRawValue();
		 var store = cmp.up('window').down('combo[name="identifiedPlaceRat"]').getStore();
		 store.removeAll();
		 cmp.up('window').down('combo[name="identifiedPlaceRat"]').setValue(null);
		 if(tipo!==null){
		 var placeType=tipo;
		 if	(tipo==='CountrySubdivisionV1' || tipo==='CountrySubdivisionV2'){
		 	placeType='CountrySubdivision';
		 } else if (tipo==='MunicipalityV1' || tipo==='MunicipalityV2'){
		 	placeType='Municipality';
		 }
		 filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
	                 nombreCampo: 'class',
                	 valor: placeType,
                	 valores: null,
                	 operacion: '=',
                     tipoValor: 'string'
         }).data);

         	if(place==='Región'){
         		filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'State',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
                    }).data);
         	} else if(place==='Provincia'){
			 filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'Province',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
                    }).data);         	
         	} else if(place === 'Ciudad'){
        	 filtro.push( Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeMun',
                    valor: 'City',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
                }).data);	
        	} else if(place === 'Comuna'){
         	 filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeMun',
                    valor: 'Township',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
                }).data);	
         	} 
         
         store.getProxy().setExtraParam('filters', Ext.encode(filtro));
         store.load();
         console.log(cmp);
         }
		
		
	},
	
	findPlaces: function(cmp) {
		 var filtro = [];
		 var tipo = cmp.up('window').down('combo[name="tipo"]').getValue();
		 var place = cmp.up('window').down('combo[name="tipo"]').getRawValue();
		 var store = cmp.getStore();
		 if(tipo!==null){
		 var placeType=tipo;
		 if	(tipo==='CountrySubdivisionV1' || tipo==='CountrySubdivisionV2'){
		 	placeType='CountrySubdivision';
		 } else if (tipo==='MunicipalityV1' || tipo==='MunicipalityV2'){
		 	placeType='Municipality';
		 }
		 
		 filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
	                 nombreCampo: 'class',
                	 valor: placeType,
                	 valores: null,
                	 operacion: '=',
                     tipoValor: 'string'
         }).data);
         filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'namePla',
                    valor: cmp.rawValue + '%',
                    operacion: 'like',
                    tipoValor: 'string'
         }).data);
         	if(place==='Región'){
         		filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'State',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
                    }).data);
         	} else if(place==='Provincia'){
			 filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'Province',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
                    }).data);         	
         	} else if(place === 'Ciudad'){
        	 filtro.push( Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeMun',
                    valor: 'City',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
                }).data);	
        	} else if(place === 'Comuna'){
         	 filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeMun',
                    valor: 'Township',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
                }).data);	
         	} 
         
         store.getProxy().setExtraParam('filters', Ext.encode(filtro));
         store.load();
         console.log(cmp);
         }
         
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
        //var identifiedPlaceRatGrid = btn.up('window').down('placev1grid').getStore();
        if(form.isValid()
            //&& identifiedPlaceRatGrid.count()>0
        ){
            //if(identifiedPlaceRatGrid.count()>0){
            //    identifiedPlaceRat = identifiedPlaceRatGrid.getAt(0).data;
            //};
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
            	console.log(btn.up('window').down('combo[name="identifiedPlaceRat"]'));
                var ratingTerritoryV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {});
				objeto = this.application.getConvertion().convert (objeto, ratingTerritoryV1);
				var comboPlaceRat=btn.up('window').down('combo[name="identifiedPlaceRat"]');
				if(comboPlaceRat.valueModels!==null && comboPlaceRat.valueModels!==undefined && comboPlaceRat.valueModels.length>0 ){
					identifiedPlaceRat = comboPlaceRat.valueModels[0].data;
                }
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
                        errors =  utilValidation.validation(validations);
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
            if(seleccion[0].data.identifiedPlaceRat!=null && seleccion[0].data.identifiedPlaceRat!==undefined){
            
            if(seleccion[0].data.identifiedPlaceRat.typeCodeCos!==undefined){
            	
            	if(seleccion[0].data.identifiedPlaceRat.typeCodeCos==='State')
            	window.down('combo[name="tipo"]').setValue('CountrySubdivisionV1');
            	else if (seleccion[0].data.identifiedPlaceRat.typeCodeCos==='Province')
            	window.down('combo[name="tipo"]').setValue('CountrySubdivisionV2');
            	
            } else if (seleccion[0].data.identifiedPlaceRat.typeCodeMun!==undefined){
	          	
	          	if (seleccion[0].data.identifiedPlaceRat.typeCodeMun==='City')
	            window.down('combo[name="tipo"]').setValue('MunicipalityV1');
	            else if (seleccion[0].data.identifiedPlaceRat.typeCodeMun==='Township')
	            window.down('combo[name="tipo"]').setValue('MunicipalityV2');
            
            } else window.down('combo[name="tipo"]').setValue(seleccion[0].data.identifiedPlaceRat.typeNameImo);
            
            window.down('combo[name="identifiedPlaceRat"]').setValue(seleccion[0].data.identifiedPlaceRat.placeIdentifierPla);
           // window.down('combo[name="identifiedPlaceRat"]').setRawValue(seleccion[0].data.identifiedPlaceRat.namePla);
  			}
            window.show();
            btn.setDisabled(false);
            //var identifiedPlaceRatGrid = Ext.ComponentQuery.query('#identifiedPlaceRatGrid')[0];
            //identifiedPlaceRatGrid.getStore().loadRawData(seleccion[0].get('identifiedPlaceRat')[0], true);
            //btn.setDisabled(false);
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
            //var identifiedPlaceRatGrid = btn.up('window').down('placev1grid').getStore();
            //if(identifiedPlaceRatGrid.count()>0){
            //    identifiedPlaceRat = identifiedPlaceRatGrid.getAt(0).data;
            //};
        var comboPlaceRat=btn.up('window').down('combo[name="identifiedPlaceRat"]');
		if(comboPlaceRat.valueModels!==null && comboPlaceRat.valueModels!==undefined && comboPlaceRat.valueModels.length>0 ){
			identifiedPlaceRat = comboPlaceRat.valueModels[0].data;
        } else if(comboPlaceRat.getValue().placeIdentifierPla!==undefined && comboPlaceRat.getValue().placeIdentifierPla!==null){
       	   identifiedPlaceRat =comboPlaceRat.getValue();
        }
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
                errors =  utilValidation.validation(validations);
            }
        }
        if (errors !== null && errors !== undefined) {
            crearVentana(5, errors);
            btn.setDisabled(false);
            return null;
        }
        btn.up('window').mask("Guardando", "x-mask-loading");
        ratingTerritoryV1.getProxy().setUrl(ratingTerritoryV1.getProxy().getInitialConfig('url') + '/' + ratingTerritoryV1.getId());
        ratingTerritoryV1.getProxy().setAppendId(false);
        ratingTerritoryV1.save ({
            callback: function (record, operation) {
                record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                record.getProxy().setAppendId(true);
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        if(Ext.ComponentQuery.query('heterogeneoustreev2').length>0 && Ext.ComponentQuery.query('placeproximityv2principalform_ext').length> 0){
                            var principalpanel = Ext.ComponentQuery.query('placeproximityv2principalform_ext')[Ext.ComponentQuery.query('placeproximityv2principalform_ext').length-1]
                            principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
                        }else{
                            Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1').reload();
                        }
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
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );            

            if (paramValues.ratingTerritoryIdentifierRat != "" && paramValues.ratingTerritoryIdentifierRat != null) {
                var ratingTerritoryIdentifierRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'ratingTerritoryIdentifierRat',
                    valor: paramValues.ratingTerritoryIdentifierRat,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(ratingTerritoryIdentifierRat.data);
            }

            if (paramValues.typeCodeRat != "" && paramValues.typeCodeRat != null) {
                var typeCodeRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeCodeRat',
                    valor: paramValues.typeCodeRat,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.RatingTerritoryTypeCodeList'
                });
                filtro.push(typeCodeRat.data);
            }

            if (paramValues.territoryExternalCodeRat != "" && paramValues.territoryExternalCodeRat != null) {
                var territoryExternalCodeRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'territoryExternalCodeRat',
                    valor: paramValues.territoryExternalCodeRat+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(territoryExternalCodeRat.data);
            }
            
             if (paramValues.identifiedPlaceRat != "" && paramValues.identifiedPlaceRat != null) {
                var identifiedPlaceRat = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'identifiedPlaceRat<>namePla',
                    valor: paramValues.identifiedPlaceRat,
                    operacion: '=',
                    tipoValor: 'string'
                });
                filtro.push(identifiedPlaceRat.data);
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
