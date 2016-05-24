Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.postcodev1grid_ext',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    //store:'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1',
    store: new Ext.data.Store({
        model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1',
        remoteSort: true,
        remoteFilter: true,
        simpleSortMode: true,
        simpleGroupMode: true,
        autoLoad: true,
        sorters: [{
                property: 'placeProximityIdentifierPlp',
                direction: 'DESC'
            }],
        proxy: {
            type: 'rest',
            url: urlService + 'placeProximityService/findByFilter',
            actionMethods: {
                read: 'POST'
            },
            extraParams:{
                limit:15,
                filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'class',
                    valor: 'PlaceProximity',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'string'
                }).data,
                Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'toPlacePlp<>class',
                    valor: 'PostCode',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'string'
                }).data,
                Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'fromPlacePlp<>typeNameImo',
                    valor: 'Municipality',
                    valores: null,
                    operacion: '=',
                    tipoValor: 'string'
                }).data])
            },
            reader: {
                type: 'json',
                rootProperty: 'datos',
                successProperty: 'valido',
                totalProperty: 'totalRegistros'
            }
        }
    }),
    initComponent: function() {
        this.columns = [
			{
                header: 'Nº',
                dataIndex: 'toPlacePlp',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
				renderer: function (val) {
					return val.placeIdentifierPla;
				}
            },
            {
                header: 'Comuna',
                dataIndex: 'fromPlacePlp',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240,
				renderer: function (val) {
					return val.namePla;
				}
            },
            {
                header: 'Código Postal',
                dataIndex: 'toPlacePlp',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					return val.assignedExternalCodePoc;
				}
            },
			{
                header: 'Habilitado Desde',
                dataIndex: 'toPlacePlp',
                sortable: true,
                align: 'center',
                hidden: false,
                width: 120,
                renderer: function (val) {
                	if(val.availablePeriodStartDateTimePla!==null){
						return Ext.util.Format.date(val.availablePeriodStartDateTimePla,'d/m/Y');
					}else{
						return '';
					}
				}
           },
           {
                header: 'Habilitado Hasta',
                dataIndex: 'toPlacePlp',
                sortable: true,
                align: 'center',
                hidden: false,
                width: 120,
                renderer: function (val) {
                	if(val.availablePeriodEndDateTimePla!==null){
						return Ext.util.Format.date(availablePeriodEndDateTimePla,'d/m/Y');
					} else {
						return '';
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
                }
            }
        });
        this.callParent(arguments);
    }
});
