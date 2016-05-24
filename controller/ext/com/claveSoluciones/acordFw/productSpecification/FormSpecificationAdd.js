Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAdd', {
    extend: 'Ext.app.Controller',
    views: [
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAddIn',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ComponentAddIn',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV2Grid',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.StatusToolbar',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictRequisiteForm',
            'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1PrincipalWindow',
            'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1PrincipalWindow',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.CategoryMembershipNew',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.CategoryAddIn',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV2FormInput',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV2Grid',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV2PrincipalWindow',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV2FormInput',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV2Grid',
            'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV2PrincipalWindow'
            ],
    
    init : function() {
        this.control( {
        	'formspecificationaddin' : {
        		destroy : function(){
        			componentesSeleccionados = new Array();
        			var searchButton = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('button[action=buscar]');
        			searchButton.fireEvent('click', searchButton);
        		}
        	},
            'componentaddin button[action=addNewComponent]' : {
            	click : this.addNewComponent
            },
            'componentaddin button[action=searchComponent]' : {
            	click : this.searchComponent
            },
            'componentaddin button[action=removeComponent]' : {
            	click : this.removeComponent
            },
            'componentaddin button[action=saveProductComposition]' : {
            	click : this.saveProductComposition
            },
            'formspecificationaddin button[action=addConflictRequisite]' : {
            	click : this.addConflictRequisite 
            }, 
            'formspecificationaddin button[action=downloadStructure]' : {
            	click : this.downloadStructure 
            },
            'conflictrequisiteform button[action=mostrarWindows]' : {
            	beforerender: this.changeAction            	
            },
            'formspecificationaddin button[action=newConflictRequisite]' : {
            	click: this.newConflictRequisite
            },
            'conflictassociationv2principalwindow button[action=newConflict]' : {
            	click: this.newConflict
            },
            'requisiteassociationv2principalwindow button[action=newRequisite]' : {
            	click: this.newRequisite
            },
            'formspecificationaddin button[action=deleteConflict]' : {
            	click: this.deleteConflict
            },
            'formspecificationaddin button[action=deleteRequisite]' : {
            	click: this.deleteRequisite
            },
            'conflictrequisiteform button[action=saveConflictRequisite]' : {
            	click: this.saveConflictRequisite
            },
            'statustoolbar button[action=inDevelopment]' : {
            	click: this.inDevelopmentSpecification
            },
            'statustoolbar button[action=open]' : {
            	click: this.openSpecification
            },
            'statustoolbar button[action=suspend]' : {
            	click: this.suspendSpecification
            },
            'statustoolbar button[action=close]' : {
            	click: this.closeSpecification
            },
            'categoryaddin button[action=newCategoryMembership]' : {
            	click: this.newCategoryMembership
            }
        });
        },
        
        addNewComponent: function(btn){
        	if(btn.up('window').down('#opcAct').getForm().isValid()){
        		var rec = btn.up('window').down('#opcAct').getForm().getRecord(); 
        		var recordsStore = Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().getRange();
        		var indExist = false,
                            specificationIdentifierSpe = -1,
                            position = -1;
                        if (rec.get("typeNameImo") === 'ProductComposition') {
                            specificationIdentifierSpe = rec.data.associatedProductSpecificationBasePra.specificationIdentifierSpe;
                        } else {
                            specificationIdentifierSpe = rec.data.specificationIdentifierSpe;
                        }
        		for(k in recordsStore){
                            if (recordsStore[k].data.associatedProductSpecificationBasePra.specificationIdentifierSpe == specificationIdentifierSpe){
                                    indExist=true;
                                    position = k;
                                    break;
                            }
        		}
        		if(!indExist){
	        		var productComposition = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1'),
        				objeto = btn.up('window').down('#opcAct').getForm().getValues();
        			objeto = this.application.getConvertion().convert (objeto, productComposition);
        			productComposition.set(objeto);
	        		productComposition.set('associatedProductSpecificationBasePra', rec.data);
	        		productComposition.set({
	        			creationUserImo: usuario.get('userName'),
	    				creationDateTimeImo: new Date(),
						updateDateTimeImo: new Date(),
						updateUserImo: usuario.get('userName'),
		        		productAssociationIdentifierPra: null
	        		});
	        		componentesSeleccionados.push(productComposition);
	        		var record = rec.data;
	            	record.minimum = productComposition.data.minimumComponentCountPrc;
	            	record.maximum = productComposition.data.maximumComponentCountPrc;
					//var data = Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().getProxy().getData();
			 		//data.push(productComposition.data);
			 		//Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().getProxy().setData(data);
			 		//Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().reload();
					Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().loadRawData(productComposition.data, true);
        		} else {
        			var compStore = Ext.ComponentQuery.query('#componentGridSelected')[Ext.ComponentQuery.query('#componentGridSelected').length-1].getStore();
                                var productComposition = recordsStore[position];
        			
        			var index = compStore.findExact('id',productComposition.data.id);//var index = compStore.findExact('id',rec.data.id);
        			var index2 = componentesSeleccionados.indexOf(productComposition.data);//rec.data);
        			var associated = productComposition.get('associatedProductSpecificationBasePra');
        			var objeto = btn.up('window').down('#opcAct').getForm().getValues();
        			objeto = this.application.getConvertion().convert (objeto, productComposition);
        			productComposition.set(objeto);
	        		productComposition.set('associatedProductSpecificationBasePra', associated);
	        		productComposition.set({
						updateDateTimeImo: new Date(),
						updateUserImo: usuario.get('userName'),
		        		productAssociationIdentifierPra: null
	        		});
	        		componentesSeleccionados[index2]=productComposition.data;
                                if (rec.get("typeNameImo") !== 'ProductComposition') {
	        		compStore.remove(compStore.getAt(index));
	        		//var data = Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().getProxy().getData();
			 		//data.push(productComposition.data);
			 		//Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().getProxy().setData(data);
			 		//Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().reload();
        			Ext.ComponentQuery.query('#componentGridSelected')[0].getStore().loadRawData(productComposition.data, true);
                                }
        		}
    		} 
    		else {
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
    		} 
        },
        
        removeComponent: function(btn){
        	var rec = btn.up('window').down('#opcAct').getForm().getRecord();
        	var storeSelected = Ext.ComponentQuery.query('#componentGridSelected')[ Ext.ComponentQuery.query('#componentGridSelected').length-1].getStore();        	
        	storeSelected.remove(rec);
        	if(rec.get('productAssociationIdentifierPra')!=null && rec.get('productAssociationIdentifierPra')!=undefined){
        		var removedRecs = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1];
	        	if(removedRecs.RemovedRecs==null || removedRecs.RemovedRecs==undefined){
	        		removedRecs.RemovedRecs=[rec];
	        	} else {
	        		removedRecs.RemovedRecs.push(rec);
	        	}
        	}
        },
        
        saveProductComposition: function(btn){
        	btn.up('window').mask("Guardando", "x-mask-loading");
        	var rec = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].up('window').down('form').getForm().getRecord();
        	var storeSelected = Ext.ComponentQuery.query('#componentGridSelected')[Ext.ComponentQuery.query('#componentGridSelected').length-1].getStore();
        	var selectedComposition = new Array();
        	
        	for(var i = 0; i<storeSelected.getRange().length; i++){
        		storeSelected.getAt(i).data.productAssociationIdentifierPra = null;
        		selectedComposition.push(storeSelected.getAt(i).data);
        	}        	
        	rec.set({
        		originatingProductAssociationPsb: selectedComposition
        	});
        	rec.save({
        		callback: function (record, operation) {
                    if (operation.success === true) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido === true) {
                            btn.up('window').close();
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                            Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1').reload();
                            var window = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].up('window');
                            window.down('formspecificationaddin').down('tabpanel[itemId="summaryComponents"]').removeAll();
                            Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].up('window').down('form').getForm().loadRecord(record);
                            if(respuesta.data.originatingProductAssociationPsb!=null && respuesta.data.originatingProductAssociationPsb != []){
                            	var associations = record.data.originatingProductAssociationPsb;
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
                	            			                        width: 40,
                	            			                        align: 'right',
                	            			                        header: 'Mín.',
                	            			                        dataIndex: 'minimum',
                	            			                        renderer: function(val,meta,record){
                	            			                        	return record.raw.minimum;
                	            			                        }
                	            			                    });
                	            			                    grid.headerCt.insert(grid.columns.length,column);
                	            			                    column = Ext.create('Ext.grid.column.Column',{
                	            			                        width: 40,
                	            			                        align: 'right',
                	            			                        header: 'Máx.',
                	            			                        dataIndex: 'maximum',
                	            			                        renderer: function(val,meta,record){
                	            			                        	return record.raw.maximum;
                	            			                        }
                	            			                    });
                	            			                    grid.headerCt.insert(grid.columns.length+1,column);
                	            			                    column = Ext.create('Ext.grid.column.Column',{
                	            			                        width: 40,
                	            			                        align: 'right',
                	            			                        header: 'Cálculo',
                	            			                        dataIndex: 'calculation',
                	            			                        renderer: function(val,meta,record){
                	            			                        	return record.data.calculation;
                	            			                        }
                	            			                    });
                	            			                    grid.headerCt.insert(5,column);
                	            			                    column = Ext.create('Ext.grid.column.Column',{
                	            			                        width: 40,
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
//                	            		                		this.remove(toolbar);
                	            		                	}
                	            		                }
                	            					}]
                	            				});
                            				} else {
                            					var grid = window.down(tipo);
                            					if(grid.getStore().find('specificationIdentifierSpe',association.specificationIdentifierSpe)==-1)
                            						grid.getStore().loadRawData(association,true);          								
                            				}                							
                            			}
                            		} 
                            	}
                            }
                            if(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].RemovedRecs!=null && Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].RemovedRecs!=undefined){
                            	var removedRecs = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].RemovedRecs;
                            	for(rem in removedRecs){
                            		removedRecs[rem].erase();
                            	}
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
                    btn.up('window').unmask();
                },
                failure: function(rec,st,a,b,c){
                    btn.up('window').unmask();
                }
        	});
        },
        
        addConflictRequisite : function(btn){
    		var win = Ext.widget('conflictrequisiteform');
    		componentesSeleccionados=[];
    		var associations = btn.up('window').down('form').getForm().getRecord().get('originatingProductAssociationPsb');
    		if(btn.getItemId()=='conflictButton'){
    			win.setTitle('Conflictos');
    			var conflicts = [];
    			AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
    			win.removeAll();
    			if(associations!=null && associations!=[]){
    				for(var i=0; i<associations.length; i++){
    					if(associations[i].productAssociationKindPra==='ConflictAssociation'){
                			conflicts.push(associations[i]);
    					}
    				}
    			}			
    			win.add({
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
    	        			grid.down('button[text="Nuevo"]').setVisible(true);
    	        			grid.down('button[text="Borrar"]').setVisible(true);
    	        		}
    	        	}
    			});
    		} else if (btn.getItemId()=='requisiteButton'){
    			win.setTitle('Requisitos');
    			var requisites = [];
    			AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
    			win.removeAll();
    			if(associations!=null && associations!=[]){
    				for(var i=0; i<associations.length; i++){
    					if(associations[i].productAssociationKindPra==='RequisiteAssociation'){
                			requisites.push(associations[i]);
    					}
    				}
    			}
    			win.add({
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
    	        			grid.down('button[text="Nuevo"]').setVisible(true);
    	        			grid.down('button[text="Borrar"]').setVisible(true);
    	        		}
    	        	}
    			});
    		}
    		win.show();
    	},
        changeAction: function(btn){
    		btn.action='newConflictRequisite';
    	},
    	newConflictRequisite: function(btn){
    		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
    		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1');
    		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
    		if(btn.getItemId()=='conflictButton'){
    			var win = Ext.widget('conflictassociationv2principalwindow');
    			win.down('button[action=create]').action='newConflict';
    			var form = win.down('conflictassociationv2forminput');
    			form.down('fieldset').insert(0, {
    				xtype: 'combo',
    				fieldLabel: 'Componente',
                    emptyText: 'Búsqueda de componente',
                    itemId: 'selectedComponent',
                    allowBlank: false,
                    columnWidth: .6666,
                    padding: '0 10 10 0',
                    triggerCls : 'x-form-search-trigger',
                    listeners: {
                        focus: function(combo){
                            combo.getStore().load();
                        },
                        change: function(combo, nv, oldValue){
                        	var newValue = nv;
                        	if(newValue!=null && typeof newValue=='string' && newValue.length>2 && newValue!=oldValue){
                        		var store = combo.getStore();
                        		store.removeAll ();
                                store.filters.clear();
                                delete store.getProxy().extraParams['filters'];
                                var filtro = [Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'kindOfElementNameSpe',
                                    valor: newValue+'%',
                                    operacion: 'like',
                                    tipoValor: 'string'
                                }).data];
                                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                store.load({
                                    callback: function(records){
                                        if(records.length>0){
                                        combo.expand();
                                       }
                                    }
                    			});
                        	}
                        }
                    },
                    valueField: 'specificationIdentifierSpe',
                    displayField: 'kindOfElementNameSpe',
                    hidden: false,
                    store: new Ext.data.Store({
    	                  model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
    	                  remoteSort: true,
    	                  autoLoad: false,
    	                  pageSize: 50,
    	                  sorters: [{
    	                      property: 'specificationIdentifierSpe',
    	                      direction: 'DESC'
    	                  }],
    	                  proxy: {
    	                      type: 'rest',
    	                      url: urlService + 'productSpecificationService/findByFilter',
    	                      actionMethods: {
    	                          read: 'POST'
    	                      },
    	                      reader: {
    	                          rootProperty: 'datos',
    	                          successProperty: 'valido',
    	                          totalProperty: 'totalRegistros'
    	                      }
    	                  }
    	              })
    			});
    			form.down('fieldset').insert(1, {
    				xtype: 'displayfield',
    				html: '&nbsp',
    				columnWidth: 1
    			});
    			win.show();
    		} else if(btn.getItemId()=='requisiteButton'){
    			var win = Ext.widget('requisiteassociationv2principalwindow');
    			win.down('button[action=create]').action='newRequisite';
    			var form = win.down('requisiteassociationv2forminput');
    			form.down('fieldset').insert(0, {
    				xtype: 'combo',
    				fieldLabel: 'Componente',
                    emptyText: 'Búsqueda de componente',
                    itemId: 'selectedComponent',
                    triggerCls : 'x-form-search-trigger',
                    allowBlank: false,
                    columnWidth: .6666,
                    padding: '0 10 10 0',
    				store: new Ext.data.Store({
  	                  model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
  	                  remoteSort: true,
  	                  autoLoad: false,
  	                  pageSize: 10,
  	                  sorters: [{
  	                      property: 'specificationIdentifierSpe',
  	                      direction: 'DESC'
  	                  }],
  	                  proxy: {
  	                      type: 'rest',
  	                      url: urlService + 'productSpecificationService/findByFilter',
  	                      actionMethods: {
  	                          read: 'POST'
  	                      },
  	                      reader: {
  	                          rootProperty: 'datos',
  	                          successProperty: 'valido',
  	                          totalProperty: 'totalRegistros'
  	                      }
  	                  }
  	              	}),
  	              	valueField: 'specificationIdentifierSpe',
    	            displayField: 'kindOfElementNameSpe',
    	            typeAhead: false,
    	            anchor: '100%',
    	            listConfig: {
    	                loadingText: 'Buscando...',
    	                emptyText: 'No se encontraron resultados.'
    	            },
    	            pageSize: 10,
    	            listeners: {
                      focus: function(combo){
                          combo.getStore().load();
                      },
                      change: function(combo, nv, oldValue){
                      	var newValue = nv;
                      	if(newValue!=null && typeof newValue=='string' && newValue.length>2 && newValue!=oldValue && combo.getStore().getTotalCount()>10){
                      		var store = combo.getStore();
                      		store.removeAll ();
                              store.filters.clear();
                              delete store.getProxy().extraParams['filters'];
                              var filtro = [Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                  nombreCampo: 'kindOfElementNameSpe',
                                  valor: newValue+'%',
                                  operacion: 'like',
                                  tipoValor: 'string'
                              }).data];
                              store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                              store.load({
                                  callback: function(records){
                                      if(records.length>0){
                                      combo.expand();
                                     }
                                  }
                  			});
                      	}
                      }
                  }
    				
    				
    				
    				
    				
//    				xtype: 'combo',
//    				fieldLabel: 'Componente',
//                    emptyText: 'Búsqueda de componente',
//                    itemId: 'selectedComponent',
//                    triggerCls : 'x-form-search-trigger',
//                    allowBlank: false,
//                    columnWidth: .6666,
//                    padding: '0 10 10 0',
//                    listeners: {
//                        focus: function(combo){
//                            combo.getStore().load();
//                        },
//                        change: function(combo, nv, oldValue){
//                        	var newValue = nv;
//                        	if(newValue!=null && typeof newValue=='string' && newValue.length>2 && newValue!=oldValue){
//                        		var store = combo.getStore();
//                        		store.removeAll ();
//                                store.filters.clear();
//                                delete store.getProxy().extraParams['filters'];
//                                var filtro = [Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//                                    nombreCampo: 'kindOfElementNameSpe',
//                                    valor: newValue+'%',
//                                    operacion: 'like',
//                                    tipoValor: 'string'
//                                }).data];
//                                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
//                                store.load({
//                                    callback: function(records){
//                                        if(records.length>0){
//                                        combo.expand();
//                                       }
//                                    }
//                    			});
//                        	}
//                        }
//                    },
//                    valueField: 'specificationIdentifierSpe',
//                    displayField: 'kindOfElementNameSpe',
//                    hidden: false,
//                    store: new Ext.data.Store({
//    	                  model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
//    	                  remoteSort: true,
//    	                  autoLoad: false,
//    	                  pageSize: 50,
//    	                  sorters: [{
//    	                      property: 'specificationIdentifierSpe',
//    	                      direction: 'DESC'
//    	                  }],
//    	                  proxy: {
//    	                      type: 'rest',
//    	                      url: urlService + 'productSpecificationService/findByFilter',
//    	                      actionMethods: {
//    	                          read: 'POST'
//    	                      },
//    	                      reader: {
//    	                          rootProperty: 'datos',
//    	                          successProperty: 'valido',
//    	                          totalProperty: 'totalRegistros'
//    	                      }
//    	                  }
//    	              })
    			});
    			form.down('fieldset').insert(1, {
    				xtype: 'displayfield',
    				html: '&nbsp',
    				columnWidth: 1
    			});
    			win.show();
    		}
    	},
        newConflict: function(btn){
            var me = this;
            AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
            var form = btn.up('window').down('form').getForm();
            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1', form.getValues());
            var comboStore = btn.up('window').down('form').down('combo').getStore();
            var comboValue = btn.up('window').down('form').down('combo').getValue();
            var index = comboStore.findExact('specificationIdentifierSpe', parseInt(comboValue));
            var recordSpecification = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord();
            var store = new Ext.data.Store({
                model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1',
                data: []
            });
            if (form.isValid()) {
                if (index != -1 && recordSpecification.get('specificationIdentifierSpe') != comboStore.getAt(index).data.specificationIdentifierSpe) {
                    rec.set('associatedProductSpecificationBasePra', comboStore.getAt(index).data);
                    rec.set({
                        creationUserImo: usuario.get('userName'),
                        creationDateTimeImo: new Date(),
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date(),
                        productAssociationIdentifierPra: null
                    });
                    me.conflictCombo = rec.getData();
                    me.componentAssociate = comboStore.getAt(index);
                    rec.save({
                        scope: me,
                        params: {
                            component: Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord().get('specificationIdentifierSpe')
                        },
                        callback: function(record, operation) {
                            var me = this;
                            if (operation.success === true) {
                                var respuesta = Ext.decode(operation._response.responseText);
                                if (Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('conflictassociationv2grid') != null) {
                                    store = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('conflictassociationv2grid').getStore();
                                } else {
                                    Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryConflicts').add({
                                        xtype: 'conflictassociationv2grid',
                                        store: store,
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            checkOnly: true,
                                            mode: 'SINGLE',
                                            allowDeselect: true,
                                            showHeaderCheckbox: false
                                        }),
                                        listeners: {
                                            beforerender: function(grid) {
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
                                }
                                if (respuesta.valido === true) {
                                    var recResp = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1', respuesta.data);
                                    var componentesSeleccionados = [];
                                    for (var j = 0; j < recordSpecification.data.originatingProductAssociationPsb.length; j++) {
                                        componentesSeleccionados.push(recordSpecification.data.originatingProductAssociationPsb[j]);
                                    }
                                    componentesSeleccionados.push(recResp.data);
                                    recordSpecification.set({
                                        originatingProductAssociationPsb: componentesSeleccionados,
                                        updateUserImo: usuario.get('userName'),
                                        updateDateTimeImo: new Date()
                                    });
                                    me.storeToAdd = store;
                                    me.recResp = recResp;
                                    recordSpecification.save({
                                        scope: me,
                                        callback: function(record, operation) {
                                            var me = this;
                                            if (operation.success === true) {

                                                var rec2 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1', {});
                                                rec2.set({
                                                    creationUserImo: usuario.get('userName'),
                                                    creationDateTimeImo: new Date(),
                                                    updateUserImo: usuario.get('userName'),
                                                    effectivePeriodEndDateTimePra: me.conflictCombo.effectivePeriodEndDateTimePra,
                                                    effectivePeriodStartDateTimePra: me.conflictCombo.effectivePeriodStartDateTimePra,
                                                    updateDateTimeImo: new Date(),
                                                    productAssociationIdentifierPra: null,
                                                    associatedProductSpecificationBasePra: Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord().data
                                                });
                                                me.recordToLoadByForm = record;
                                                rec2.save({
                                                    scope: me,
                                                    params: {
                                                        component: me.componentAssociate.data.specificationIdentifierSpe
                                                    },
                                                    callback: function(record, operation) {
                                                        var me = this;
                                                        if (operation.success === true) {

                                                            var respuesta = Ext.decode(operation._response.responseText);
                                                            if (respuesta.valido === true) {
                                                                var recResp2 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1', respuesta.data);
                                                                var componentesSeleccionados2 = [];
                                                                for (var j = 0; j < me.componentAssociate.data.originatingProductAssociationPsb.length; j++) {
                                                                    componentesSeleccionados2.push(me.componentAssociate.data.originatingProductAssociationPsb[j]);
                                                                }
                                                                componentesSeleccionados2.push(recResp2.data);
                                                                me.componentAssociate.set({
                                                                    originatingProductAssociationPsb: componentesSeleccionados2,
                                                                    updateUserImo: usuario.get('userName'),
                                                                    updateDateTimeImo: new Date()
                                                                });
                                                                me.componentAssociate.getProxy().setUrl(me.componentAssociate.getProxy().getUrl() + '/' + me.componentAssociate.get('id'));
                                                                me.componentAssociate.getProxy().setAppendId(false);
                                                                me.componentAssociate.save({
                                                                    scope: me,
                                                                    callback: function(record, operation) {
                                                                        record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                                                                        var me = this;
                                                                        if (operation.success == true) {

                                                                            var respuesta = Ext.decode(operation._response.responseText);
                                                                            if (respuesta.valido === true) {
                                                                                me.storeToAdd.loadRawData(me.recResp.data, true);
                                                                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                                                                //Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().loadRecord(record);
                                                                                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().loadRecord(me.recordToLoadByForm);
                                                                                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryConflicts').setTitle(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryConflicts').title.split('(')[0] + '(' + store.count() + ')');
                                                                                var tabpanel = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('tabpanel'),
                                                                                        tabTmp = tabpanel.getActiveTab();
                                                                                tabpanel.setActiveTab(tabpanel.down('#summaryConflicts'));
                                                                                tabpanel.setActiveTab(tabTmp);
                                                                                btn.up('window').close();
                                                                            } else {
                                                                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                                                                btn.setDisabled(false);
                                                                            }
                                                                        } else {
                                                                            crearVentana(operation.error.status, "Error de conexión");
                                                                            btn.setDisabled(false);
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                                                btn.setDisabled(false);
                                                            }
                                                        } else {
                                                            crearVentana(operation.error.status, "Error de conexión");
                                                            btn.setDisabled(false);
                                                        }
                                                    }
                                                });
                                            } else {
                                                if (operation.error) {
                                                    crearVentana(operation.error.status, operation.error.statusText);
                                                    recResp.destroy();
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                    btn.setDisabled(false);
                                }
                            } else {
                                if (operation.error) {
                                    crearVentana(operation.error.status, "Error de conexión");
                                    btn.setDisabled(false);
                                }
                            }
                        }
                    });
                } else {
                    crearVentana(5, "No se puede crear un conflicto<br />con el mismo componente de producto.");
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
            }
        },
        newRequisite: function(btn){
            AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
            var form = btn.up('window').down('form').getForm();
            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1', form.getValues());
            var comboStore = btn.up('window').down('form').down('combo').getStore();
            var comboValue = btn.up('window').down('form').down('combo').getValue();
            var index = comboStore.findExact('specificationIdentifierSpe', parseInt(comboValue));
            var recordSpecification = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord();
            var store = new Ext.data.Store({
                model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1',
                data: []
            });
            if (form.isValid()) {
                if (index != -1 && recordSpecification.get('specificationIdentifierSpe') != comboStore.getAt(index).data.specificationIdentifierSpe) {
                    rec.set('associatedProductSpecificationBasePra', comboStore.getAt(index).data);
                    rec.set({
                        creationUserImo: usuario.get('userName'),
                        creationDateTimeImo: new Date(),
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date(),
                        productAssociationIdentifierPra: null
                    });
                    rec.save({
                        params: {
                            component: Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord().get('specificationIdentifierSpe')
                        },
                        callback: function(record, operation) {
                            if (operation.success === true) {
                                var respuesta = Ext.decode(operation._response.responseText);
                                if (respuesta.valido === true) {
                                    if (Ext.ComponentQuery.query('requisiteassociationv2grid')[Ext.ComponentQuery.query('requisiteassociationv2grid').length - 1] != null) {
                                        store = Ext.ComponentQuery.query('requisiteassociationv2grid')[Ext.ComponentQuery.query('requisiteassociationv2grid').length - 1].getStore();
                                    } else {
                                        Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryRequisites').add({
                                            xtype: 'requisiteassociationv2grid',
                                            store: store,
                                            selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                checkOnly: true,
                                                mode: 'SINGLE',
                                                allowDeselect: true,
                                                showHeaderCheckbox: false
                                            }),
                                            listeners: {
                                                beforerender: function(grid) {
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
                                    }
                                    var recResp = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1', respuesta.data);
                                    var componentesSeleccionados = [];
                                    for (var j = 0; j < recordSpecification.data.originatingProductAssociationPsb.length; j++) {
                                        componentesSeleccionados.push(recordSpecification.data.originatingProductAssociationPsb[j]);
                                    }
                                    componentesSeleccionados.push(recResp.data);
                                    recordSpecification.set({
                                        originatingProductAssociationPsb: componentesSeleccionados,
                                        updateUserImo: usuario.get('userName'),
                                        updateDateTimeImo: new Date()
                                    });
                                    recordSpecification.save({
                                        callback: function(record, operation) {
                                            if (operation.success === true) {
                                                var respuesta = Ext.decode(operation._response.responseText);
                                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                                store.loadRawData(recResp.data, true);
                                                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().loadRecord(record);
                                                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryRequisites').setTitle(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryRequisites').title.split('(')[0] + '(' + store.count() + ')');
                                                var tabpanel = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('tabpanel'),
                                                        tabTmp = tabpanel.getActiveTab();
                                                tabpanel.setActiveTab(tabpanel.down('#summaryRequisites'));
                                                tabpanel.setActiveTab(tabTmp);
                                            } else {
                                                if (operation.error) {
                                                    crearVentana(operation.error.status, operation.error.statusText);
                                                    recResp.destroy();
                                                }
                                            }
                                        }
                                    });

                                    btn.up('window').close();
                                } else {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                    btn.setDisabled(false);
                                }
                            } else {
                                if (operation.error) {
                                    crearVentana(operation.error.status, "Error de conexión");
                                    btn.setDisabled(false);
                                }
                            }
                        }
                    });
                } else {
                    crearVentana(5, "No se puede crear un requisito<br />con el mismo componente de producto.");
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
            }
            },
        deleteRequisite: function(btn){
    		btn.setDisabled(true);
    		var selection = btn.up('window').down('requisiteassociationv2grid').getSelectionModel().getSelection()[0];
    			if (selection !== null && selection !== undefined) {
    			var store = Ext.ComponentQuery.query('requisiteassociationv2grid')[Ext.ComponentQuery.query('requisiteassociationv2grid').length-1].getStore();
    			var recordSpecification = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].up('window').down('form').getForm().getRecord();
    			var associations=[];
    			for(var j =0; j<recordSpecification.data.originatingProductAssociationPsb.length; j++){
    				if(recordSpecification.data.originatingProductAssociationPsb[j].productAssociationIdentifierPra != selection.get('productAssociationIdentifierPra')){
    					associations.push(recordSpecification.data.originatingProductAssociationPsb[j]);
    				}
    			}
    			recordSpecification.set({
    				originatingProductAssociationPsb : associations,
    				updateUserImo: usuario.get('userName'),
    	            updateDateTimeImo: new Date()
    			});
    			recordSpecification.save({
    				callback: function(record,operation){
    					btn.setDisabled(false);
    					if (operation.success === true) {
//    	    				selection.destroy({
//    	    					callback: function(record,operation){
//    	            				if (operation.success === true) {
    	            					
    						Ext.ComponentQuery.query('requisiteassociationv2grid')[Ext.ComponentQuery.query('requisiteassociationv2grid').length-1].getStore().remove(btn.up('window').down('requisiteassociationv2grid').getSelectionModel().getSelection()[0]); 
                                                Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('#summaryRequisites').setTitle(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].down('#summaryRequisites').title.split('(')[0]+'(' + store.count()+')');
//    	                            } else {
//    	                                if (operation.error) {
//    	                                    crearVentana (operation.error.status, operation.error.statusText);
//    	                                }
//    	                            }
//    	            			}
//    	    				});
    	                } else {
    	                    if (operation.error) {
    	                        crearVentana (operation.error.status, operation.error.statusText);
    	                    }
    	                }
    				}
    			});
    		} else {
    			crearVentana(5, "Debe seleccionar un elemento");
                btn.setDisabled(false);
    		}
    	},
        deleteConflict: function(btn){
            var me = this;
            btn.setDisabled(true);
            var selection = btn.up('window').down('conflictassociationv2grid').getSelectionModel().getSelection()[0];
            if (selection !== null && selection !== undefined) {
                var store = Ext.ComponentQuery.query('conflictassociationv2grid')[Ext.ComponentQuery.query('conflictassociationv2grid').length - 1].getStore();
                var recordSpecification = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].up('window').down('form').getForm().getRecord();
                var associations = [];
                var recordToRemove = null;
                for (var j = 0; j < recordSpecification.data.originatingProductAssociationPsb.length; j++) {
                    if (recordSpecification.data.originatingProductAssociationPsb[j].productAssociationIdentifierPra != selection.get('productAssociationIdentifierPra')) {
                        associations.push(recordSpecification.data.originatingProductAssociationPsb[j]);
                    } else {
                        recordToRemove = recordSpecification.data.originatingProductAssociationPsb[j];
                    }
                }
                recordSpecification.set({
                    originatingProductAssociationPsb: associations,
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                me.recordToRemove = recordToRemove;
                me.idToRemove = recordSpecification.get('specificationIdentifierSpe');
                recordSpecification.save({
                    scope: me,
                    callback: function(record, operation) {
                        var me = this;
                        btn.setDisabled(false);
                        if (operation.success === true) {
                            var recordNew = null;
                            Ext.Ajax.request({
                                url: urlService + 'productSpecificationService/findById',
                                async: false,
                                method: 'POST',
                                params: {
                                    id: me.recordToRemove.associatedProductSpecificationBasePra.specificationIdentifierSpe
                                },
                                callback: function(options, success, response) {
                                    var respuesta = Ext.decode(response.responseText);
                                    if (respuesta.valido) {
                                        recordNew = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1', respuesta.data);
                                    }
                                }
                            });
                            var recordToRemove2 = null;
                            if (recordNew != null && recordNew.get('originatingProductAssociationPsb') != null && recordNew.get('originatingProductAssociationPsb') != undefined && recordNew.get('originatingProductAssociationPsb').length > 0) {
                                var arrayOriginatingProductAssociationPsb = [];
                                for (var i = 0; i < recordNew.get('originatingProductAssociationPsb').length; i++) {
                                    if (recordNew.get('originatingProductAssociationPsb')[i].associatedProductSpecificationBasePra.specificationIdentifierSpe != me.idToRemove) {
                                        arrayOriginatingProductAssociationPsb.push(recordNew.get('originatingProductAssociationPsb')[i]);
                                    }else{
                                        recordToRemove2 = recordNew.get('originatingProductAssociationPsb')[i];
                                    }
                                }
                                recordNew.set('originatingProductAssociationPsb', arrayOriginatingProductAssociationPsb);
                            }
                            me.recordToRemove2 = recordToRemove2;
                            recordNew.getProxy().setUrl(recordNew.getProxy().getUrl() + '/' + recordNew.get('id'));
                            recordNew.getProxy().setAppendId(false);
                            recordNew.save({
                                scope: me,
                                callback: function(record, operation) {
                                    record.getProxy().setUrl(record.getProxy().getInitialConfig('url'));
                                    var me = this;
                                    btn.setDisabled(false);
                                    if (operation.success === true) {
                                        var conflictAssociation1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1',me.recordToRemove);
                                        conflictAssociation1.erase({
                                            scope: me,
                                            callback: function (record, operation) {
                                                var me = this;
                                                var conflictAssociation2 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1',me.recordToRemove2);
                                                conflictAssociation2.erase();
                                            }
                                        });
                                        Ext.ComponentQuery.query('conflictassociationv2grid')[Ext.ComponentQuery.query('conflictassociationv2grid').length - 1].getStore().remove(btn.up('window').down('conflictassociationv2grid').getSelectionModel().getSelection()[0]);
                                        Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryConflicts').setTitle(Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length - 1].down('#summaryConflicts').title.split('(')[0] + '(' + store.count() + ')');
                                    } else {
                                        if (operation.error) {
                                            crearVentana(operation.error.status, operation.error.statusText);
                                        }
                                    }
                                }
                            });
                        } else {
                            if (operation.error) {
                                crearVentana(operation.error.status, operation.error.statusText);
                            }
                        }
                    }
                });
            } else {
                crearVentana(5, "Debe seleccionar un elemento");
                btn.setDisabled(false);
            }    	
        },
        saveConflictRequisite: function(btn){
    		var tipo = btn.up('window').down('grid').getXType();
    		var store = null;
    		if(tipo==='conflictassociationgrid') {
    			store = Ext.ComponentQuery.query('conflictassociationgrid')[0].getStore();
    		}
    		else if(tipo==='requisiteassociationgrid'){
    			store = Ext.ComponentQuery.query('requisiteassociationgrid')[0].getStore();
    		}
    		if(store!=null){
    			var recordSpecification = Ext.ComponentQuery.query('formspecificationaddin')[Ext.ComponentQuery.query('formspecificationaddin').length-1].up('window').down('form').getForm().getRecord();	
    			for(var k=0;k<recordSpecification.data.originatingProductAssociationPsb.length;k++){
        			componentesSeleccionados.push(recordSpecification.data.originatingProductAssociationPsb[k]);
        		}
        		recordSpecification.set({
        			originatingProductAssociationPsb : componentesSeleccionados,
        			updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
        		});
        		recordSpecification.save({
        			callback: function(record,operation){
        				if (operation.success === true) {
            				btn.setDisabled(false);
            				btn.up('window').close();
                        } else {
                            if (operation.error) {
                                crearVentana (operation.error.status, operation.error.statusText);
                            }
                        }
        			}
        		});
    		}		
    		
    	},
    	inDevelopmentSpecification: function(btn){
    		var record = btn.up('window').down('form').getForm().getRecord();
    		var proxy = record.getProxy();
    		record.setProxy({
                type: 'rest',
                url: urlService + 'productSpecificationService/inDevelopmentProductSpecification',
                actionMethods: {
                    create: 'POST',
                    update: 'POST'
                }
    		});
    		var nombre = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('grid').getStore().storeId.split("productSpecification");
    		record.save({
    			callback: function(rec, operation){	
    				rec.setProxy(proxy);
                    if (operation.success === true) {
                    	var form = btn.up('window').down('form').getForm();
                    	var window = btn.up('window');
                        var respuesta = Ext.decode(operation.response.responseText);
                        var record = Ext.create('AFW_FND_Xjs.model.com.claveSoluciones.acordFw.productSpecification'+nombre[1], respuesta.data);
                        form.loadRecord(record);
                        if(record.data.statusPrs!=null && record.data.statusPrs != []){
                        	window.down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);
//                        	window.down('textfield[name="statusProductSpecification"]').setValue(record.data.statusPrs.nameSta);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana (operation.error.status, operation.error.statusText);
                        }
                    }                
    			}
    		});
    	},
    	openSpecification: function(btn){
    		var record = btn.up('window').down('form').getForm().getRecord();
    		var proxy = record.getProxy().setConfig({url: urlService + 'productSpecificationService/openProductSpecification'});
    		var nombre = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('grid').getStore().storeId.split("productSpecification");
    		record.save({
    			callback: function(rec, operation){	
    				rec.getProxy().getInitialConfig();
                    if (operation.success === true) {
                    	var form = btn.up('window').down('form').getForm();
                    	var window = btn.up('window');
                        var respuesta = Ext.decode(operation._response.responseText);
                        var store = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('#panelprincipal').down('grid').getStore();
                        var index = store.findExact('specificationIdentifierSpe', rec.get('specificationIdentifierSpe'));
                        var record = store.getAt(index);
//                        var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification'+nombre[1], respuesta.data);
                        form.loadRecord(record);
                        if(record.data.statusPrs!=null && record.data.statusPrs != []){
                        	window.down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana (operation.error.status, operation.error.statusText);
                        }
                    }                
    			}
    		});
    	},
    	suspendSpecification: function(btn){
    		var record = btn.up('window').down('form').getForm().getRecord();
    		var proxy = record.getProxy();
    		record.setProxy({
                type: 'rest',
                url: urlService + 'productSpecificationService/suspendProductSpecification',
                actionMethods: {
                    create: 'POST',
                    update: 'POST'
                }
    		});
    		var nombre = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('grid').getStore().storeId.split("productSpecification");
    		record.save({
    			callback: function(rec, operation){	
    				rec.setProxy(proxy);
                    if (operation.success === true) {
                    	var form = btn.up('window').down('form').getForm();
                    	var window = btn.up('window');
                        var respuesta = Ext.decode(operation._response.responseText);
                        var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification'+nombre[1], respuesta.data);
                        form.loadRecord(record);
                        if(record.data.statusPrs!=null && record.data.statusPrs != []){
                        	window.down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);
//                        	window.down('textfield[name="statusProductSpecification"]').setValue(record.data.statusPrs.nameSta);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana (operation.error.status, operation.error.statusText);
                        }
                    }                
    			}
    		});
    	},
    	closeSpecification: function(btn){
    		var record = btn.up('window').down('form').getForm().getRecord();
    		var proxy = record.getProxy();
    		record.setProxy({
                type: 'rest',
                url: urlService + 'productSpecificationService/closeProductSpecification',
                actionMethods: {
                    create: 'POST',
                    update: 'POST'
                }
    		});
    		var nombre = Ext.ComponentQuery.query('viewport')[Ext.ComponentQuery.query('viewport').length-1].down('grid').getStore().storeId.split("productSpecification");
    		record.save({
    			callback: function(rec, operation){	
    				rec.setProxy(proxy);
                    if (operation.success === true) {
                    	var form = btn.up('window').down('form').getForm();
                    	var window = btn.up('window');
                        var respuesta = Ext.decode(operation._response.responseText);
        				var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification'+nombre[1], respuesta.data);
                        form.loadRecord(record);
                        if(record.data.statusPrs!=null && record.data.statusPrs != []){
                        	window.down('textfield[name="status"]').setValue(record.data.statusPrs.nameSta);
                        	window.down('textfield[name="statusProductSpecification"]').setValue(record.data.statusPrs.nameSta);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana (operation.error.status, operation.error.statusText);
                        }
                    }                
    			}
    		});
    	},
    	
    	searchComponent: function(btn){
    		if(btn.up('form').getForm().isValid() || Ext.ComponentQuery.query('#searchCmp').length==0){
                btn.setDisabled(true);
                var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1');
                store.removeAll ();
                store.filters.clear();
                delete store.getProxy().extraParams['filters'];
                var filtro = [];
	            filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	                nombreCampo: 'typeNameImo',
	                valor: 'ProductAttributeSpecification',
	                valores: ['ProductAttributeSpecification','ProductSpecification','ClauseSpecification',
	                'DisabilityCoverageSpecification','PropertyCoverageSpecification',
	                'LiabilityCoverageSpecification','HealthCoverageSpecification','LifeCoverageSpecification','SuretyBondCoverageSpecification',
	                'StructuralComponentSpecification','LimitSpecification','DeductibleSpecification',
	                'PremiumFactorSpecification','FinancialSchedulerOptionSpecification','LimitSpecification',
	                'WaitingPeriodSpecification','FinancialProvisionSpecification','PartyRoleInAgreementSpecification',
	                'InsuredRatingSpecification','DriverRatingSpecification','StructureRatingSpecification',
	                'VehicleRatingSpecification','RatingSpecification', 'FeeSpecification', 'ReinstatementLimitSpecification'
	                ],
	                operacion: 'in',
	                tipoValor: 'string'
	            }).data);
	            
                var paramValues =  btn.up('form').getValues(false, true, false);
                if (paramValues.typeNameImo != "" && paramValues.typeNameImo != null) {
                    var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeNameImo',
                        valor: paramValues.typeNameImo,
                        operacion: '=',
                        tipoValor: 'string'
                    });
                    filtro.push(typeNameImo.data);
                }

                if (paramValues.nameSpe != "" && paramValues.nameSpe != null) {
                    var nameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'nameSpe',
                        valor: paramValues.nameSpe+'%',
                        operacion: 'like',
                        tipoValor: 'string'
                    });
                    filtro.push(nameSpe.data);
                }

                if (paramValues.kindOfElementNameSpe != "" && paramValues.kindOfElementNameSpe != null) {
                    var kindOfElementNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'kindOfElementNameSpe',
                        valor: paramValues.kindOfElementNameSpe+'%',
                        operacion: 'like',
                        tipoValor: 'string'
                    });
                    filtro.push(kindOfElementNameSpe.data);
                }

//                if (paramValues.kindOfElementNameSpe != "" && paramValues.kindOfElementNameSpe != null) {
//                    var kindOfElementNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
//                        nombreCampo: 'kindOfElementNameSpe',
//                        valor: paramValues.kindOfElementNameSpe+'%',
//                        operacion: 'like',
//                        tipoValor: 'string'
//                    });
//                    filtro.push(kindOfElementNameSpe.data);
//                }                

                store.pageSize=15;
                if(filtro.length>0)
                    store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                    store.currentPage=1;
                    store.load(function(records, operation, success) {
                        btn.setDisabled(false);
                    });
            } else {
                invalidFields = Ext.ComponentQuery.query('#searchCmp')[Ext.ComponentQuery.query('#searchCmp').length-1].query("field{isValid()==false}");
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
    	
    	newCategoryMembership: function(btn){
    		var window = Ext.widget('categorymembershipnew');
    		window.down('button[text="Guardar"]').originScreen = btn.up('window').getXType();
    		window.show();
    	},
    	downloadStructure: function(btn){
    		var record = btn.up('window').down('form').getForm().getRecord().get('kindOfElementNameSpe');
        	var urlForm = urlService + 'report/getStructure';
        	
        	var form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: urlForm,
                method: 'POST',
                target: '_blank',
                hrefTarget: '_blank'
            });
	        form.submit({
	        	target:'_blank',
	        	params : {
	        		productCode : record,
	        		report: 'reporteproducto',
	        		user : usuario.get('userName'),
				}
	        });
    	}
        
});
