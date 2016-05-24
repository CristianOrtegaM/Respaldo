Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.xtbmlvaluev2grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1',
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: false,
        injectCheckbox: 0,
        mode: 'SINGLE',
        allowDeselect: true,
        showHeaderCheckbox: false    
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    selectedRecords: {},
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'valueIdentifierXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
                resizable: false,
                draggable: false,
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
            		},
                    columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}                        
            	}
            },
            /**{
                header: 'Tipo Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },**/
            {
                header: 'Dim 01',
                dataIndex: 'dim01Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 450,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                    columnmove: function (grid){
                		grid.focus();
            		} 
            	}
            },
            {
                header: 'Dim 01',
                dataIndex: 'dim01Xtv',
                itemId: 'dim01Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 450,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                    columnmove: function (grid){
                		grid.focus();
            		} 
            	}
            },
            {
                header: 'Dim 02',
                dataIndex: 'dim02Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 02',
                dataIndex: 'dim02Xtv',
                itemId: 'dim02Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 400,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 03',
                dataIndex: 'dim03Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 03',
                dataIndex: 'dim03Xtv',
                itemId: 'dim03Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 04',
                dataIndex: 'dim04Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 04',
                dataIndex: 'dim04Xtv',
                itemId: 'dim04Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 05',
                dataIndex: 'dim05Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 05',
                dataIndex: 'dim05Xtv',
                itemId: 'dim05Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 06',
                dataIndex: 'dim06Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 06',
                dataIndex: 'dim06Xtv',
                itemId: 'dim06Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 07',
                dataIndex: 'dim07Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 07',
                dataIndex: 'dim07Xtv',
                itemId: 'dim07Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 08',
                dataIndex: 'dim08Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}    		
            	}
            },
            {
                header: 'Dim 08',
                dataIndex: 'dim08Xtv',
                itemId: 'dim08Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 09',
                dataIndex: 'dim09Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}   		
            	}
            },
            {
                header: 'Dim 09',
                dataIndex: 'dim09Xtv',
                itemId: 'dim09Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Dim 10',
                dataIndex: 'dim10Xtv',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('rangeNameXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		}     		
            	}
            },
            {
                header: 'Dim 10',
                dataIndex: 'dim10Xtv',
                itemId: 'dim10Xtv_varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
                renderer: function(val){
                	var index = rangeTableStore.findExact('rangeIdentifierXtr', val);
                    return index != -1 ? rangeTableStore.getAt(index).get('varcharValueXtr') : '';
                },
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
            		},
                        columnmove: function (grid){
                		grid.up('grid').up('window').data = grid.up('grid').up('window').getScrollY();
            		} 
            	}
            },
            {
                header: 'Valor',
                dataIndex: 'fixedAmountXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 200,
                resizable: true,
                draggable: false,
                
                editor: {
                    xtype: 'numericfield',
                    allowBlank: false,
                    itemId: 'fixedAmountXtvEditor',
                    maxValue: 99,
                    minValue: 0
                },                    
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
                header: 'Porcentaje',
                dataIndex: 'percentageXtv',
                sortable: true,
                align: 'right',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
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
                header: 'Piso',
                dataIndex: 'floorAmountXtv',
                sortable: true,
                align: 'right',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
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
                header: 'Tope',
                dataIndex: 'capAmountXtv',
                sortable: true,
                align: 'right',
                hidden: true,
                width: 300,
                resizable: true,
                draggable: false,
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
                header: 'Descuento',
                dataIndex: 'discountAmountXtv',
                sortable: true,
                align: 'right',
                hidden: true,
                width: 150,
                resizable: true,
                draggable: false,
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
            }
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
                        },
                       /* {
							xtype : 'combo',
							itemId: 'comboValor',
							width: 50,
							//fieldLabel : 'Indicador Completa',
							autoLoadOnValue : true,
							emptyText : '...',
							queryMode : 'local',
							typeAhead : true,
							minChars : 0,
							listeners : {
								focus : function(
										combo) {
									combo.getStore().load({
										callback : function() {
											combo.expand();
										}
									});
								}
							},
							hidden : false,
							valueField : 'valor',
							displayField : 'nombre',
							store : new Ext.data.ArrayStore(
									{
										fields : [
												'nombre',
												'valor' ],
										data : [
												['0',0 ],
												['1',1 ],
												['2',2 ],
												['3',3 ] ]
									})
						},*/
                        /*{
                            xtype: 'button',
                            text: 'Asignar Valor',
                            action: 'asignarValor',
                            hidden: false
                        }*/,
                        {
                        	xtype: 'button',
                            text: 'Borrar',
                            action: 'borrarValor',
                            hidden: false
                        },
                        {
                            xtype: 'splitbutton',
                            text: 'Acciones',
                            hidden: false,
                            handler: function(btn){
                                this.showMenu();
                            },
                            menu: [{
                                text: 'Exportar Valores',
                                optionButton: true,
                                action: 'exportFileExcel'
                            }, {
                                text: 'Carga de Valores',
                                optionButton: true,
                                action: 'loadfile'
                            }]
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
        this.selectedRecords={};
        this.callParent(arguments);
        this.getView().on('refresh', this.refreshSelection, this);
    },
    listeners: {
            resize: function (view){
                    view.updateLayout();
            },
            columnresize: function (grid){
                    grid.up('grid').up('window').setScrollY(grid.up('grid').up('window').data);
            },
            deselect: function(cmp,record){
            	if(this.selectedRecords[record.data.valueIdentifierXtv]!==undefined){
            	delete this.selectedRecords[record.data.valueIdentifierXtv]
            	}
            },
            select: function(cmp,record){
            	if(this.selectedRecords[record.data.valueIdentifierXtv]===undefined){
            	this.selectedRecords[record.data.valueIdentifierXtv]=record;
            	}
            }
    },
    
    refreshSelection: function () {
       if (0 >= Object.keys(this.selectedRecords).length) {
            return;
        }

        var newRecordsToSelect = [];
         for (key in this.selectedRecords) {
            var record = this.getStore().findRecord('valueIdentifierXtv',this.selectedRecords[key].data.valueIdentifierXtv);
            if (!Ext.isEmpty(record)) {
                newRecordsToSelect.push(record);
            }
        }

        this.getSelectionModel().select(newRecordsToSelect);
    }
});
