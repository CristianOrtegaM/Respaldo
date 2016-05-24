Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1Validation'
            ],

    init: function() {
        this.control({
            'calculationrulev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'calculationrulev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'calculationrulev1principalwindow button[action=create]': {
                click: this.create
            },
            'calculationrulev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'calculationrulev1grid button[action=edit]': {
                click: this.edit
            },
            'calculationrulev1principalwindow button[action=update]': {
                click: this.update
            },
            'calculationrulev1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'calculationrulev1forminput button[action=ruleApplicabilityPrsPanelGridButton]': {
                click: this.ruleApplicabilityShow
            }
        });
    },
            
    ruleApplicabilityShow: function(btn){
        var window = Ext.create('Ext.window.Window', {
            addMode: false,
            width: '70%',
            height: '90%',
            title: 'Aplicabilidad de Regla',
            modal: false,
            layout:'fit',
            items: {
                xtype: 'ruleapplicabilityv1principalform',
                listener: {
                	render: function(p){
//                		p.removedown('ruleapplicabilityv1formsearch').setVisible(false);
                		p.down('grid').down('column[dataIndex=applicabilityTypeCodeRuaBool]').setVisible(false);
                	}
                }
            }
        });
        var store = window.down('ruleapplicabilityv1grid').getStore();
        store.removeAll();
        store.filters.clear();
        delete store.getProxy().extraParams['filters'];
        store.pageSize = 15;                                        
        var filtro =[Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'p_productCode',
            valor: btn.up('window').record.get('kindOfElementNameSpe'),
            operacion: '=',
            tipoValor: 'string'
        }).data,
        Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'p_version',
            valor: btn.up('window').record.get('versionSpe'),
            operacion: '=',
            tipoValor: 'string'
        }).data,
        Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'p_componentClass',
            valor: btn.up('window').record.get('typeNameImo'),
            operacion: '=',
            tipoValor: 'string'
        }).data];
        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
        store.getProxy().setUrl(urlService + 'ruleApplicabilityService/findRuleApplicabilityByFilter');
        store.currentPage = 1;
        store.load();
        var column = Ext.create('Ext.grid.column.Action',{
            width: 30, 
            sortable: false,
            align: 'center',
            iconCls: 'add-grid',
            tooltip: 'Agregar',
            handler: function(grid, rowIndex,colIndex, item, e, rec){
            	rec.set('applicabilityTypeCodeRua', 'Included');
                var screen = Ext.ComponentQuery.query('#ruleApplicabilityPrsGrid');
                var store = screen[screen.length-1].getStore();
                if(store.findExact('componentPathCodeRua', rec.get('componentPathCodeRua'))==-1)
                	store.loadRawData(rec.data,true);
                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
            }
        });
        window.down('ruleapplicabilityv1grid').headerCt.insert(0,column);
        window.down('ruleapplicabilityv1grid').headerCt.remove(window.down('ruleapplicabilityv1grid').columns[0]);
        window.down('ruleapplicabilityv1grid').getView().refresh();
        window.show();
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

    create: function(btn, closeWin) {
        btn.setDisabled(true);
        closeWin = !closeWin ? closeWin : true;
        var form = btn.up('window').down('form').getForm();
        var designerSpe = null;
        var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
        var controlledProductSpecificationPrs = null;
        var controlledProductSpecificationPrsGrid = Ext.ComponentQuery.query('attributerulesgrid')[Ext.ComponentQuery.query('attributerulesgrid').length-1].up('window').down('form').getForm().getRecord();
        var ruleApplicabilityPrs = [];
        var ruleApplicabilityPrsGrid = btn.up('window').down('ruleapplicabilityv1grid').getStore();
//        if(form.isValid() && ruleApplicabilityPrsGrid.count()>0){
        if(form.isValid()){
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
            if(controlledProductSpecificationPrsGrid!=null){
                controlledProductSpecificationPrs = controlledProductSpecificationPrsGrid.data;
            };
            
            if(ruleApplicabilityPrsGrid.count()>0){
            	for(i in ruleApplicabilityPrsGrid.getRange()){
            		var recRule = ruleApplicabilityPrsGrid.getRange()[i];
            		if(recRule.get('ruleApplicabilityIdentifierRua')!=null && recRule.get('ruleApplicabilityIdentifierRua')!=undefined){
            			recRule.set({
                            updateUserImo: usuario.get('userName'),
                            updateDateTimeImo: new Date(),
                            basicDataCompleteCodeImo: 'Full'
                		});
            		} else {
            			recRule.set({
    	        			creationUserImo: usuario.get('userName'),
    	                    creationDateTimeImo: new Date(),
    	                    updateUserImo: usuario.get('userName'),
    	                    updateDateTimeImo: new Date(),
    	                    basicDataCompleteCodeImo: 'Full'
    	        		});
            		}
            		ruleApplicabilityPrs.push(recRule.data);
            	}
            }
            
            var objeto = form.getValues(false, true, false);
            var calculationRuleV1Record =  form.getRecord();
            if (calculationRuleV1Record !== undefined 
                && calculationRuleV1Record !== null 
                && calculationRuleV1Record .get('specificationIdentifierSpe')!==null 
                && calculationRuleV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(calculationRuleV1Record.get('specificationIdentifierSpe')).indexOf('CalculationRuleV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var calculationRuleV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1', {});
				objeto = this.application.getConvertion().convert (objeto, calculationRuleV1);
                calculationRuleV1.set(objeto);
                calculationRuleV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    designerSpe: designerSpe,
                    controlledProductSpecificationPrs: controlledProductSpecificationPrs,
                    ruleApplicabilityPrs: ruleApplicabilityPrs
                });
                var calculationRuleV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1Validation', {});
                var validations = calculationRuleV1Validation.createValidations (calculationRuleV1);
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
                calculationRuleV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                            	if(closeWin)
                            		btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                //Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1').reload();
                                if(Ext.ComponentQuery.query('#attributeCalculation').length >= 0){
                                    Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length-1].fireEvent('loadTitle', Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length-1]);
                                    Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length -1].down('grid').getStore().load();
                                }
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
//            if(ruleApplicabilityPrsGrid.count()<=0){
//            	msg += '<b>- Aplica a Componentes</b>. Debe seleccionar a lo menos un componente.<br/>'; 
//            }
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('calculationrulev1principalwindow');
            window.setTitle('Regla de Cálculo Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            window.record = null;
            try{
                window.record = btn.up('window').down('form').getForm().getRecord();
            }catch(err){
            }
            var recsRule = seleccion[0].get('ruleApplicabilityPrs');
            if(recsRule != null && recsRule != undefined && recsRule.length > 0){
        	var resultRule = [];
        	for (rr in recsRule){
        		var ra = Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV2', recsRule[rr]);
        		resultRule.push(ra);
        	}
            window.down('ruleapplicabilityv1grid').getStore().loadRawData(recsRule);
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
                        btn.up('window').mask('Cargando');
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
                                        //Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1').reload();
                                        if(Ext.ComponentQuery.query('#attributeCalculation').length >= 0){
                                            Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length-1].fireEvent('loadTitle', Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length-1]);
                                            Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length -1].down('grid').getStore().load();
                                        }
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
                                btn.up('window').unmask();
                            },
                            failure: function(rec,st,a,b,c){
                                btn.setDisabled(false);
                                btn.up('window').unmask();
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
            var designerSpe = null;
            var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
        var ruleApplicabilityPrs = [];
        var ruleApplicabilityPrsGrid = btn.up('window').down('ruleapplicabilityv1grid').getStore();
        if(ruleApplicabilityPrsGrid.count()>0){
        	for(i in ruleApplicabilityPrsGrid.getRange()){
        		var recRule = ruleApplicabilityPrsGrid.getRange()[i];
        		if(recRule.get('ruleApplicabilityIdentifierRua')!=null && recRule.get('ruleApplicabilityIdentifierRua')!=undefined){
        			recRule.set({
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date(),
                        basicDataCompleteCodeImo: 'Full'
            		});
        		} else {
        			recRule.set({
	        			creationUserImo: usuario.get('userName'),
	                    creationDateTimeImo: new Date(),
	                    updateUserImo: usuario.get('userName'),
	                    updateDateTimeImo: new Date(),
	                    basicDataCompleteCodeImo: 'Full'
	        		});
        		}
        		ruleApplicabilityPrs.push(recRule.data);
        	}
        }
        
        var objeto = form.getValues(false, true, false);
        var calculationRuleV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, calculationRuleV1);
        calculationRuleV1.set (objeto);
        calculationRuleV1.set({
            designerSpe: designerSpe,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date(),
            ruleApplicabilityPrs: ruleApplicabilityPrs
        });
        var calculationRuleV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1Validation', {});
        var validations = calculationRuleV1Validation.createValidations (calculationRuleV1);
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
        calculationRuleV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var ventana = Ext.widget('calculationrulev1principalwindow');
        try{
            ventana.record = btn.up('window').down('form').getForm().getRecord();
        }catch(err){
        }
        ventana.show();
        btn.setDisabled(false);
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1');
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

            if (paramValues.typeNameImo_fs != "" && paramValues.typeNameImo_fs != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
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

            if (paramValues.versionSpe_fs != "" && paramValues.versionSpe_fs != null) {
                var versionSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'versionSpe',
                    valor: paramValues.versionSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(versionSpe.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('calculationrulev1formsearch').query("field{isValid()==false}");
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
