Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV2PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1Validation'
            ],

    init: function() {
        this.control({
            'premiumfactorspecificationv2forminput menuitem[action=printComponentStructure]' : {
                    click: this.printComponentStructure
            },
            'premiumfactorspecificationv2forminput menuitem[action=printDependentComponents]' : {
                    click: this.printDependentComponents
            },
            'premiumfactorspecificationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'premiumfactorspecificationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'premiumfactorspecificationv2principalwindow button[action=create]': {
                click: this.create
            },
            'premiumfactorspecificationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'premiumfactorspecificationv1grid button[action=edit]': {
                click: this.edit
            },
            'premiumfactorspecificationv2principalwindow button[action=update]': {
                click: this.update
            },
            'premiumfactorspecificationv1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            }
        });
    },
            
    printComponentStructure: function(btn){
        var record = btn.up('window').down('form').getForm().getRecord(),
            urlForm = urlService + 'report/getReportProduct',
            form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: urlForm,
                method: 'POST',
                target: '_blank',
                hrefTarget: '_blank'
            });
        
        form.submit({
            target:'_blank',
            params : {
                productCode : record.getData().kindOfElementNameSpe,
                version: record.getData().versionSpe,
                type: record.getData().typeNameImo,
                user : usuario.get('userName'),
                draft : '0'
            }
        });
    },	
    printDependentComponents: function(btn){
        var record = btn.up('window').down('form').getForm().getRecord(),
            urlForm = urlService + 'report/getReportDependentComponents',
            form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: urlForm,
                method: 'POST',
                target: '_blank',
                hrefTarget: '_blank'
            });
        
        form.submit({
            target:'_blank',
            params : {
                productCode : record.getData().kindOfElementNameSpe,
                version: record.getData().versionSpe,
                type: record.getData().typeNameImo,
                user : usuario.get('userName'),
                draft : '0'
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
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var premiumFactorSpecificationV1Record =  form.getRecord();
            if (premiumFactorSpecificationV1Record !== undefined 
                && premiumFactorSpecificationV1Record !== null 
                && premiumFactorSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && premiumFactorSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(premiumFactorSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('PremiumFactorSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var premiumFactorSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1', {});
				objeto = this.application.getConvertion().convert (objeto, premiumFactorSpecificationV1);
				premiumFactorSpecificationV1.getProxy().setUrl(urlService+'premiumFactorSpecificationService');
				premiumFactorSpecificationV1.getProxy().setAppendId(false);
                premiumFactorSpecificationV1.set(objeto);
                premiumFactorSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null
                });
                var premiumFactorSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1Validation', {});
                var validations = premiumFactorSpecificationV1Validation.createValidations (premiumFactorSpecificationV1);
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
                premiumFactorSpecificationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                //btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1').reload();
								var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1', respuesta.data);
								record.getProxy().setUrl(urlService+'premiumFactorSpecificationService/'+record.getId());
		   						record.getProxy().setAppendId(false);
                                btn.up('window').down('form').getForm().loadRecord(record);
                                if(record.data.statusPrs!=null && record.data.statusPrs != []){
                                	btn.up('window').down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);
                                	
                                }  
                                btn.up('window').down('button[text=Imprimir]').setDisabled(false);
                                btn.up('window').down('formspecificationaddin').setDisabled(false);
                                btn.up('window').down('attributerulesgrid').setDisabled(false);
                                btn.up('window').down('categoryaddin').setDisabled(false);
                                if(btn.up('window').down('#tabPanelAttributeRule')){
                                    btn.up('window').down('#tabPanelAttributeRule').fireEvent('afterrender', btn.up('window').down('#tabPanelAttributeRule'));
                                }
                                var grid = btn.up('window').down('categorymembershipv1grid'),
                                    categoryMembershipStore = grid.getStore();
                                var filtro = [Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'class',
                                    valor: 'CategoryMembership',
                                    valores: null,
                                    operacion: '=',
                                    tipoValor: 'string'
                                }).data];
                                var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'categorizedIdentifierCam',
                                    valor: record.data.specificationIdentifierSpe,
                                    operacion: '=',
                                    tipoValor: 'int'
                                });
                                filtro.push(specificationIdentifierSpe.data);
                                var specificationTypeNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'categorizedTypeNameCam',
                                    valor: record.data.typeNameImo,
                                    operacion: '=',
                                    tipoValor: 'string'
                                });
                                filtro.push(specificationTypeNameSpe.data);
                                categoryMembershipStore.pageSize=15;
                                categoryMembershipStore.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                categoryMembershipStore.currentPage=1;
                            } else {
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                            }
                        } else {
                            if (operation.error) {
                                crearVentana (5, "Error de conexión");
                            }
                        }
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
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAdd');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.AttributeAddIn');
        
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1');
        
        var seleccion = btn.up('grid').getSelectionModel().getSelection(); 
        if (seleccion.length > 0) {
            var window = Ext.widget('premiumfactorspecificationv2principalwindow');
            window.setTitle('Especificación de Factor de Prima Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('formspecificationaddin').setDisabled(false);
            window.down('attributerulesgrid').setDisabled(false);
            window.down('categoryaddin').setDisabled(false);
            if(seleccion[0].data.statusPrs!=null && seleccion[0].data.statusPrs != []){
            	window.down('textfield[name="status"]').setValue(seleccion[0].data.statusPrs.nameSta);
            }
            /*window.down('button[action=create]').up('toolbar').insert(1,{
            	text: 'Guardar y Cerrar',
            	handler: function(){
            		var createBtn = this.up('toolbar').down('button[action=create]');
            		createBtn.fireEvent('click', createBtn);    
            		this.up('window').close();
            	}
            });*/
            window.show();
            btn.setDisabled(false);
            
            if(seleccion[0].data.originatingProductAssociationPsb!=null && seleccion[0].data.originatingProductAssociationPsb != []){
            	var associations = seleccion[0].data.originatingProductAssociationPsb;  
            	componentesSeleccionados= new Array();
				conflicts=null;
				requisites = null;
            	for(var i=0;i<associations.length;i++){
            		if(associations[i].productAssociationKindPra==='ProductComposition' && associations[i].associatedProductSpecificationBasePra!=null){
            			var association = associations[i].associatedProductSpecificationBasePra;
            			componentesSeleccionados.push(associations[i]);
            			association.minimum = associations[i].minimumComponentCountPrc;
            			association.maximum = associations[i].maximumComponentCountPrc;
            			association.calculation = associations[i].calculationOrderPrc;
            			association.display = associations[i].displayOrderPrc;
            			var model = null;
            			var titulo = null;            			
            			if(association!=null){
	            			if(association.typeNameImo==='ProductSpecification' || association.typeNameImo==='PartyRoleInAgreementSpecification' || association.typeNameImo==='PartyRoleInRelationshipSpecification'
	            				|| association.typeNameImo==='ProductAttributeSpecification'){
	            				AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.'+association.typeNameImo+'V2');
	            				model = 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.'+association.typeNameImo+'V1';
	            				var index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.'+association.typeNameImo);
	            				titulo = typeNameImoStoreComponent.getAt(index).get('descriptionEnu');
	            			} else {
	            				AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+association.typeNameImo+'V2');
	            				model = 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+association.typeNameImo+'V1';
	            				var index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+association.typeNameImo);
	            				titulo = typeNameImoStoreComponent.getAt(index).get('descriptionEnu');
	            			}	            				
            				var tipo = association.typeNameImo.toLowerCase()+'v1grid';
            				if(window.down(tipo)==null){
	            				var formSpec = window.down('formspecificationaddin');
	            				formSpec.down('tabpanel[itemId="summaryComponents"]').add({
	            					title: titulo,
	            					items: [{
	            						xtype: tipo,
	            						store: new Ext.data.Store({
	            		                    model: model,
	            		                    data: [association]
	            		                }),
	            		                listeners: {
	            		                	cellclick: function(grid, td, cellIndex, record, tr, rowIndex){
	            						        if(cellIndex == 0){
	            						        	var type = record.get('typeNameImo');
	            						        	if(type == 'ProductSpecification' || type== 'PartyRoleInAgreementSpecification' || type== 'PartyRoleInRelationshipSpecification' || type =='ProductAttributeSpecification'){
	            						        		var gridPpal = grid.up('grid');
		            						        	var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.' + type + 'V1');
		            						        	store.removeAll ();
		            						            store.filters.clear();
		            						            delete store.getProxy().extraParams['filters'];
		            						            var filtro = filterCreation(type);
		            						            var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
		            					                    nombreCampo: 'specificationIdentifierSpe',
		            					                    valor: record.data.specificationIdentifierSpe,
		            					                    operacion: '=',
		            					                    tipoValor: 'long'
		            					                });
		            					                filtro.push(specificationIdentifierSpe.data);
		            					                store.pageSize=15;
		            					                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
		            					                store.currentPage=1;
		            					                store.load(function(records, operation, success) {
		            					                	gridPpal.getSelectionModel().select(records[0]);
			            						        	AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.' + type + 'V2').edit(gridPpal.down('button'));
		            					                });	   
	            						        	}
	            						        	else {
		            						        	var gridPpal = grid.up('grid');
		            						        	var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.' + type + 'V1');
		            						        	store.removeAll ();
		            						            store.filters.clear();
		            						            delete store.getProxy().extraParams['filters'];
		            						            var filtro = filterCreation(type);
		            						            var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
		            					                    nombreCampo: 'specificationIdentifierSpe',
		            					                    valor: record.data.specificationIdentifierSpe,
		            					                    operacion: '=',
		            					                    tipoValor: 'long'
		            					                });
		            					                filtro.push(specificationIdentifierSpe.data);
		            					                store.pageSize=15;
		            					                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
		            					                store.currentPage=1;
		            					                store.load(function(records, operation, success) {
		            					                	gridPpal.getSelectionModel().select(records[0]);
			            						        	AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.' + type + 'V2').edit(gridPpal.down('button'));
		            					                });	   
	            						        	}
	            						        }
	            						    },
	            		                	render: function(grid){
	            		                		var fields = grid.getStore().model.fields;
	            		                		fields.push({
	            		                			name: 'calculation',
	            		                			type: 'int'
	            		                		}, {
	            		                			name: 'display',
	            		                			type: 'int'
	            		                		}, {
	            		                			name: 'minimum',
	            		                			type: 'int'
	            		                		}, {
	            		                			name: 'maximum',
	            		                			type: 'int'
	            		                		});
	            		                		grid.getStore().model.fields = fields;
	            		                		grid.getStore().load();
	            		                		grid.columns[0].setWidth(60);
	            		                		grid.columns[0].tdCls = 'x-link-cell';
	            		                		grid.columns[3].setWidth(70);
	            		                		var column = Ext.create('Ext.grid.column.Column',{
	            			                        width: 50,
	            			                        align: 'right',
	            			                        header: 'Mín.',
	            			                        dataIndex: 'minimum',
	            			                        renderer: function(val,meta,record){
	            			                        	return record.data.minimum;
	            			                        }
	            			                    });
	            			                    grid.headerCt.insert(grid.columns.length,column);
	            			                    column = Ext.create('Ext.grid.column.Column',{
	            			                        width: 50,
	            			                        align: 'right',
	            			                        header: 'Máx.',
	            			                        dataIndex: 'maximum',
	            			                        renderer: function(val,meta,record){
	            			                        	return record.data.maximum;
	            			                        }
	            			                    });
	            			                    grid.headerCt.insert(grid.columns.length+1,column);
	            			                    column = Ext.create('Ext.grid.column.Column',{
	            			                        width: 60,
	            			                        align: 'right',
	            			                        header: 'Cálculo',
	            			                        dataIndex: 'calculation',
	            			                        renderer: function(val,meta,record){
	            			                        	return record.data.calculation;
	            			                        }
	            			                    });
	            			                    grid.headerCt.insert(5,column);
	            			                    column = Ext.create('Ext.grid.column.Column',{
	            			                        width: 60,
	            			                        align: 'right',
	            			                        header: 'Despliegue',
	            			                        dataIndex: 'display',
	            			                        renderer: function(val,meta,record){
	            			                        	return record.data.display;
	            			                        }
	            			                    });
	            			                    grid.headerCt.insert(6,column);
	            			                    grid.getView().refresh();
	            		                		var toolbar = this.down('pagingtoolbar');
	            		                		toolbar.hide();
	            		                		this.updateLayout();
	            		                	}
	            		                }
	            					}]
	            				});
            				} else {
            					var grid = window.down(tipo);
            					grid.getStore().loadRawData(association,true);								
            				}
							
            			}
            		} else if(associations[i].productAssociationKindPra==='ConflictAssociation' && associations[i].associatedProductSpecificationBasePra!=null){
            			var association = associations[i];
						if(conflicts==null){
							conflicts=[];
							conflicts.push(association);
						}
            			 else if (association!=null) {
            				conflicts.push(association);
            			}
            		} else if(associations[i].productAssociationKindPra==='RequisiteAssociation' && associations[i].associatedProductSpecificationBasePra!=null){
            			var association = associations[i];
            			if(requisites==null){
							requisites=[];
							requisites.push(association);
						}
            			 else if (association!=null) {
            				requisites.push(association);
            			}
            		}
            	}
				if(conflicts!=null && window.down('conflictassociationv2grid')==null){
					window.down('formspecificationaddin').down('#summaryConflicts').add({            					
						xtype: 'conflictassociationv2grid',
						store: new Ext.data.Store({
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1',
							data: conflicts
						}),
						selModel: Ext.create('Ext.selection.CheckboxModel', {
							checkOnly: true,
							mode: 'SINGLE',
							allowDeselect: true,
							showHeaderCheckbox: false
						}),
						listeners: {
							beforerender: function(grid){
								grid.removeDocked(grid.down('pagingtoolbar'));
								grid.addDocked({
									dock: 'bottom',
									xtype: 'toolbar',
									items: ['->', {
										text: 'Borrar',
			                            action: 'deleteConflict',
									}]
								});
							}
						}
					});
					window.down('formspecificationaddin').down('#summaryConflicts').setTitle(window.down('formspecificationaddin').down('#summaryConflicts').title.split('(')[0]+'(' + conflicts.length+')');
					Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').setActiveItem(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').items.items[1]);
				}
				if(requisites!=null && window.down('requisiteassociationv2grid')==null){
					window.down('formspecificationaddin').down('#summaryRequisites').add({
						xtype: 'requisiteassociationv2grid',
						store: new Ext.data.Store({
							model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1',
							data: requisites
						}),
						selModel: Ext.create('Ext.selection.CheckboxModel', {
							checkOnly: true,
							mode: 'SINGLE',
							allowDeselect: true,
							showHeaderCheckbox: false
						}),
						listeners: {
							beforerender: function(grid){
								grid.removeDocked(grid.down('pagingtoolbar'));
								grid.addDocked({
									dock: 'bottom',
									xtype: 'toolbar',
									items: ['->', {
										text: 'Borrar',
			                            action: 'deleteRequisite',
									}]
								});
							}
						}
					});
					window.down('formspecificationaddin').down('#summaryRequisites').setTitle(window.down('formspecificationaddin').down('#summaryRequisites').title.split('(')[0]+' (' + requisites.length+')');
					Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').setActiveItem(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').items.items[2]);
				}
            }
            var l= Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].getComponent('allSummaryComponents').items.items[0].items.items[0].items.length;
            if(l>0){
                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].getComponent('allSummaryComponents').items.items[0].items.items[0].setActiveItem(0);
            }
            Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').setActiveItem(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('tabpanel').items.items[0]);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1').reload();
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
        var objeto = form.getValues(false, true, false);
        var premiumFactorSpecificationV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, premiumFactorSpecificationV1);
        premiumFactorSpecificationV1.set (objeto);
        premiumFactorSpecificationV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var premiumFactorSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1Validation', {});
        var validations = premiumFactorSpecificationV1Validation.createValidations (premiumFactorSpecificationV1);
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
        premiumFactorSpecificationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        //btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1').reload();
						var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1', respuesta.data);
                        btn.up('window').down('form').getForm().loadRecord(record);
                        if(record.data.statusPrs!=null && record.data.statusPrs != []){
                        	btn.up('window').down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);                        	
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
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAdd');

        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.AttributeAddIn');
        
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1');
        
        var ventana = Ext.widget('premiumfactorspecificationv2principalwindow');
		/*ventana.down('button[action=create]').up('toolbar').insert(1,{
        	text: 'Guardar y Cerrar',
        	handler: function(){
        		var createBtn = this.up('toolbar').down('button[action=create]');
        		createBtn.fireEvent('click', createBtn);    
        		if(this.up('window').down('form').getForm().isValid())
        			this.up('window').close();
        	}
        });*/
        ventana.down('button[text=Imprimir]').setDisabled(true);
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusPrs: function(grid, rowIndex,colIndex, item, e, rec){
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
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

    buscar: function(btn) {
    	if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1');
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

            if (paramValues.marketableIndicatorPrs_fs != null && paramValues.marketableIndicatorPrs_fs != undefined) {
                var marketableIndicatorPrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'marketableIndicatorPrs',
                    valor: paramValues.marketableIndicatorPrs_fs,
                    operacion: '=',
                    tipoValor: 'boolean'
                });
                filtro.push(marketableIndicatorPrs.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('premiumfactorspecificationv1formsearch').query("field{isValid()==false}");
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
