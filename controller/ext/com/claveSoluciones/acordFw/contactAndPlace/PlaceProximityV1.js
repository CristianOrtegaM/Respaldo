Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1',
    requires: ['AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1'],
    //models: ['AFW_FND_Xjs.model.com.ext.claveSoluciones.acordFw.contactAndPlace.PlaceNode'],
    stores: ['AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNode'],
    views: [
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1PrincipalForm',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.HeterogeneousTree',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.ContextMenu'
    ],
    init: function() {
        var me = this;
        this.control({
            'placeproximityv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'placeproximityv1principalwindow button[action=create]': {
                click: this.create
            },
            'placeproximityv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'placeproximityv1grid button[action=edit]': {
                click: this.edit
            },
            'placeproximityv1principalwindow button[action=update]': {
                click: this.update
            },
            'heterogeneoustree': {
                loadTree: me.mostrarWindows,
                itemcontextmenu: me.showContextMenu
            },
            'listsContextMenu menuitem': {
                click: me.showSeleccionarAsociacion
            },
            '#asociacion button[action=asociarLugar]': {
                click: this.asociarLugar
            },
            'viewport': {
                refreshTreePanel: this.refreshTreePanel
            }

        });
    },
    refs: [
        {
            ref: 'heterogeneoustree',
            selector: 'heterogeneoustree'
        },
        {
            ref: 'contextMenu',
            selector: 'listsContextMenu',
            xtype: 'listsContextMenu',
            autoCreate: true
        }
    ],
    asociarLugar: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var seleccion = btn.up('window').down('grid').getSelectionModel().getSelection();

        if (seleccion.length > 0) {
            var tree = me.getHeterogeneoustree();
            var placeProximity = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {});
            var toPlacePlpObj=seleccion[0].data;
            if(seleccion[0].data.typeNameImo==='PlaceProximity') toPlacePlpObj=seleccion[0].data.toPlacePlp;
            placeProximity.set({
                placeIdentifierPla: null,
                placeProximityIdentifierPlp: null,
                creationUserImo: usuario.get('userName'),
                creationDateTimeImo: new Date(),
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date(),
                basicDataCompleteCodeImo: 'Full',
                typeCodePlp: 'Includes',
                descriptionPlp: 'Prueba',
                fromPlacePlp: tree.getSelectionModel().getSelection()[0].data.place,
                toPlacePlp: toPlacePlpObj
            });

            placeProximity.save({
                callback: function(record, operation) {
                    btn.setDisabled(false);
                    if (operation.success === true) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido === true) {
                            btn.up('window').close();
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                            me.mostrarWindows();
                        } else {
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana(5, "Error de conexión");
                        }
                    }
                },
                success: function(rec, st) {
                    btn.setDisabled(false);
                    //////btn.up().up().down('countryV1forminput').getEl().unmask();
                },
                failure: function(rec, st, a, b, c) {
                    btn.setDisabled(false);
                    //////btn.up().up().down('countryV1forminput').getEl().unmask();
                }
            });
        } else {
            btn.setDisabled(false);
            crearVentana(5, "Debe seleccionar un registro.");
        }
    },
	
    mostrarWindows: function(btn) {
        var me = this;
        var storeplacenode = Ext.getStore('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNode');

        var tree = me.getHeterogeneoustree();
        var root = new Ext.data.TreeModel();
        root.set({
            idTree: 'root',
            id: 'root',
            name: 'root',
            expanded: true,
            loaded: true
        });
        tree.getStore().setRoot(root);
        tree.getStore().sync();

        storeplacenode.load({
            callback: function(records, operation, success) {
                if (records !== null && records !== undefined) {
                    var n = records.length,
                            i = 0;
                    for (; i < n; i += 1) {
                        records[i].expanded = true;
                        records[i].loaded = true;
                        //records[i].leaf = false;
                        tree.getStore().getRoot().appendChild(records[i]).expand();
                    }
                    tree.getStore().sync();
                    //tree.refreshView();
                    //console.log (tree.getStore ().getRoot ());
                }
            }
        });
    },
    showContextMenu: function(view, record, node, rowIndex, e) {
        var global = this;
        var contextMenu = global.getContextMenu(),
		newAsociarPais = contextMenu.down('#asociar_pais');
                newAsociarRegion = contextMenu.down('#asociar_region');
        newAsociarCiudad = contextMenu.down('#asociar_ciudad'),
                newAsociarProvincia = contextMenu.down('#asociar_provincia'),
                newAsociarComuna = contextMenu.down('#asociar_comuna'),
                newAsociarCodigoPostal = contextMenu.down('#asociar_codigopostal');
        newDesasociar = contextMenu.down('#desasociar');
		newAsociarPais.hide ();

        //PaÃ­s
        if (record.data.type === 'Country') {
            newAsociarRegion.show();
            newAsociarCiudad.hide();
            newAsociarProvincia.hide();
            newAsociarComuna.hide();
            newAsociarCodigoPostal.hide();
            newDesasociar.hide();
        }
        //RegiÃ³n
        else if (record.data.type === 'CountrySubdivision.State') {
            newAsociarRegion.hide();
            newAsociarCiudad.show();
            newAsociarProvincia.show();
            newAsociarComuna.hide();
            newAsociarCodigoPostal.hide();
            newDesasociar.show();
        }


        //Provincia
        else if (record.data.type === 'CountrySubdivision.Province') {
            newAsociarRegion.hide();
            newAsociarCiudad.hide();
            newAsociarProvincia.hide();
            newAsociarComuna.show();
            newAsociarCodigoPostal.hide();
            newDesasociar.show();
        }

        //Ciudad
        else if (record.data.type === 'Municipality.City') {
            newAsociarRegion.hide();
            newAsociarCiudad.hide();
            newAsociarProvincia.hide();
            newAsociarComuna.show();
            newAsociarCodigoPostal.hide();
            newDesasociar.show();
        }

        //Comuna
        else if (record.data.type === 'Municipality.Township') {
            newAsociarRegion.hide();
            newAsociarCiudad.hide();
            newAsociarProvincia.hide();
            newAsociarComuna.hide();
            newAsociarCodigoPostal.show();
            newDesasociar.show();
        } else {
            newAsociarRegion.hide();
            newAsociarCiudad.hide();
            newAsociarProvincia.hide();
            newAsociarComuna.hide();
            newAsociarCodigoPostal.hide();
            newDesasociar.show();
        }

        contextMenu.setCountry(record);
        contextMenu.showAt(e.getX(), e.getY());
        e.preventDefault();
    },
    showSeleccionarAsociacion: function(component, e) {
        var gridType = null;
        var me = this;
        var storePlace = '';
        var tipo = '';
        var subtipo = '';
        var enumName = '';
        var nombreCampo = '';
        var nombreCampo_2 = '';
        if (component.action === 'desasociar') {
            var tree = me.getHeterogeneoustree();

            var store = Ext.getStore('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1');
            store.removeAll();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = [];
            var placeIdentifierPla = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'placeProximityIdentifierPlp',
                valor: tree.getSelectionModel().getSelection()[0].data.idTree,
                operacion: '=',
                tipoValor: 'long'
            });

            filtro.push(placeIdentifierPla.data);
            store.pageSize = 15;
            store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage = 1;
            store.load({
                callback: function(records, operation, success) {
                    var placeProximity = records[0];
                    placeProximity.erase({
                        callback: function(record, operation) {
                            if (operation.success === true) {
                                var respuesta = Ext.decode(operation._response.responseText);
                                if (respuesta.valido === true) {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                    me.mostrarWindows();
                                } else {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                }
                            } else {
                                if (operation.error) {
                                    crearVentana(5, "Error de conexión");
                                }
                            }
                        }
                    });
                }
            });
        } else {
            if (component.itemId === 'asociar_region') {
                this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
                storePlace = 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1';
                gridType = 'countrysubdivisionv1grid';
                tipo = 'CountrySubdivision';
                subtipo = 'State';
                nombreCampo = 'typeCodeCos';
                nombreCampo_2 = 'namePla';
                enumName = 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList';

            } else if (component.itemId === 'asociar_provincia') {
                this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2');
                storePlace = 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2';
                gridType = 'countrysubdivisionv2grid';
                tipo = 'CountrySubdivision';
                subtipo = 'Province';
                nombreCampo = 'typeCodeCos';
                nombreCampo_2 = 'namePla';
                enumName = 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList';
            } else if (component.itemId === 'asociar_ciudad') {
                this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
                storePlace = 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1';
                gridType = 'municipalityv1grid';
                tipo = 'Municipality';
                subtipo = 'City';
                nombreCampo = 'typeCodeMun';
                nombreCampo_2 = 'namePla';
                enumName = 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList';
            } else if (component.itemId === 'asociar_comuna') {
                this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2');
                storePlace = 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2';
                gridType = 'municipalityv2grid';
                tipo = 'Municipality';
                subtipo = 'Township';
                nombreCampo = 'typeCodeMun';
                nombreCampo_2 = 'namePla';
                enumName = 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList';
            } else if (component.itemId === 'asociar_codigopostal') {
                this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
                storePlace = 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1';
                gridType = 'postcodev1grid_ext';
                tipo = 'PlaceProximity';
                nombreCampo='toPlacePlp<>class';
                subtipo='PostCode';
                nombreCampo_2 = 'toPlacePlp<>assignedExternalCodePoc';
            }
			
			var store = Ext.getStore (storePlace);
			store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(tipo);
			filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
				nombreCampo: 'class',
				valor: tipo,
				valores: null,
				operacion: '=',
				tipoValor: 'string'
			}).data);
			if (nombreCampo !== '' && subtipo !== '' && enumName !== '') {
				filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
					nombreCampo: nombreCampo,
					valor: subtipo,
					valores: null,
					operacion: '=',
					tipoValor: 'enum',
					enumName: enumName
				}).data);
			}
			
			if (nombreCampo !== '' && subtipo !== '' && enumName === '') {
                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: nombreCampo,
                    valor: subtipo,
                    valores: null,
                    operacion: '=',
                    tipoValor: 'string'
                }).data);
            }

			
			store.getProxy().setExtraParam('filters', Ext.encode(filtro));
			store.load();
			
            if (gridType !== null) {
                var window = Ext.create('Ext.window.Window', {
                    width: '50%',
                    itemId: 'asociacion',
                    items: [
                        {
                            xtype: gridType,
                            tbar: Ext.create('Ext.toolbar.Toolbar', {
                                store: this.store,
                                items: [{
                                        width: '50%',
                                        fieldLabel: 'Buscar',
                                        labelWidth: 50,
                                        xtype: 'textfield',
                                        itemId: 'searchlive',
                                        store: store, //Ext.StoreMgr.lookup(storePlace),
                                        triggers: {
						        			filter: {
						            			cls: 'x-form-search-trigger',
						            			handler: function(field) {
						            				 var filtro = [];
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: nombreCampo_2,
                                                    valor: field.value + '%',
                                                    operacion: 'like',
                                                    tipoValor: 'string'
                                                }).data);
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: tipo,
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                                }).data);
                                                if (nombreCampo !== '' && subtipo !== '' && enumName !== '') {
                                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                        nombreCampo: nombreCampo,
                                                        valor: subtipo,
                                                        valores: null,
                                                        operacion: '=',
                                                        tipoValor: 'enum',
                                                        enumName: enumName
                                                    }).data);
                                                }
                                                
                                                if (nombreCampo !== '' && subtipo !== '' && enumName === '') {
                                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                        nombreCampo: nombreCampo,
                                                        valor: subtipo,
                                                        valores: null,
                                                        operacion: '=',
                                                        tipoValor: 'string'
                                                    }).data);
                                                }


                                                this.store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                this.store.load();
						            			},
						            		
						        			},        		
						 				},
                                        listeners: {
                                            change: function(field) {
                                                var filtro = [];
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: nombreCampo_2,
                                                    valor: field.value + '%',
                                                    operacion: 'like',
                                                    tipoValor: 'string'
                                                }).data);
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: tipo,
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                                }).data);
                                                if (nombreCampo !== '' && subtipo !== '' && enumName !== '') {
                                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                        nombreCampo: nombreCampo,
                                                        valor: subtipo,
                                                        valores: null,
                                                        operacion: '=',
                                                        tipoValor: 'enum',
                                                        enumName: enumName
                                                    }).data);
                                                }
                                                
                                                if (nombreCampo !== '' && subtipo !== '' && enumName === '') {
                                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                        nombreCampo: nombreCampo,
                                                        valor: subtipo,
                                                        valores: null,
                                                        operacion: '=',
                                                        tipoValor: 'string'
                                                    }).data);
                                                }

                                                this.store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                this.store.load();
                                            },
                                        }
                                    }]
                            }),
                            listeners: {
                                afterrender: function(grid) {
                                    grid.getStore().load({
										callback : function () {
											Ext.ComponentQuery.query ('#asociacion')[0].center ();
										}
									});
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            layout: {pack: 'center'},
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'asociarLugar',
                                    name: 'AsociarLugar',
                                    text: 'Asociar',
                                },
                                {
                                    xtype: 'button',
                                    action: 'cancelarLugar',
                                    name: 'CancelarLugar',
                                    text: 'Cancelar',
                                    handler: function() {
                                        this.up('window').close();
                                    }
                                }

                            ]
                        }
                    ]
                });

                window.show();
            }
        }
    },
    refreshTreePanel: function() {
        this.mostrarWindows(null);
    }


});