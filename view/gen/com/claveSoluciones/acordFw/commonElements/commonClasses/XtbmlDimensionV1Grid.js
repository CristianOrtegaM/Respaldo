Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.xtbmldimensionv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1',
    /*** Agregar ***/
    /**viewConfig: {
    	listeners: {
    		resize: function (view){
    			view.updateLayout();
    		},
    		columnresize: function (grid){
    			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
    		}
    	}
    },**/
    /**************/
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº ',
                dataIndex: 'dimensionIdentifierXtd',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}          		
            	}
            },
            /**{
                header: 'Tipo Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240,
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}
            	}
            },**/
            {
                header: 'Secuencia',
                dataIndex: 'dimSequenceXtd',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}
            	}
            },
            {
                header: 'Nombre',
                dataIndex: 'transactionCodeXtd',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 320,
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}    		
            	}
            },
            {
                header: 'Tipo Dato',
                dataIndex: 'dataTypeXtd',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'DataTypeCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120,
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}    		
            	}
            }/**,
            {
                header: 'Rangos',
                menuText: 'Rangos',
                dataIndex: 'rangesXtd',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showRangesXtd',
                listeners: {
                	headerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		headertriggerclick: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		},
            		hide: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		},            		
            		show: function (grid){
            			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            		}    		
            	}
            }**/
        ];
        this.bbar = Ext.create('Ext.PagingToolbar',{
            store: this.store,
            displayInfo: true,
            cls: 'x-pagingtoolbar-bottom',
            plugins: new Ext.ux.ProgressBarPager({
                width: 300
            }),
            pageSize: 15,
            refreshText: 'Actualizar',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando resultados {0} - {1} de {2}',
            listeners:{
                beforerender: function(tb){
                	tb.add(['->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->',
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            action: 'mostrarWindows',
                            hidden: true
                        },{
                            xtype: 'button',
                            text: 'Editar',
                            action: 'edit',
                            hidden: true
                        },{
                            xtype: 'button',
                            text: 'Borrar',
                            action: 'delete',
                            hidden: true
                        }
                    ]);
                },
                buttonsAccess: function(permisos){
                    for (var i = 0; i<permisos.length; i++){
                        if(permisos[i]==='c'){
                            this.down('button[text="Nuevo"]').setVisible(true);
                        } else if(permisos[i]==='u'){
                            this.down('button[text="Editar"]').setVisible(true);
                        } else if(permisos[i]==='d'){
                            this.down('button[text="Borrar"]').setVisible(true);
                        } 
                    } 
                },
                change: function(grid,changePage){
                	grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
                },
                beforechange: function(grid,changePage){
                	grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
                }
            }
        });
        this.callParent(arguments);
    },
    listeners: {
		resize: function (view){
			view.updateLayout();
		},
		columnresize: function (grid){
			grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
		}
	}
});
