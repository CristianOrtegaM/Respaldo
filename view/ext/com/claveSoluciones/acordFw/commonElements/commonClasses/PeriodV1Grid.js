Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.periodv1grid_ext',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1',
    initComponent: function() {
        this.columns = [
			{
			    header: 'Nº',
			    dataIndex: 'periodIdentifierPer',
			    sortable: true,
			    align: 'right',
			    hidden: false,
			    width: 120
			},
			{
				header : 'Código',
				dataIndex : 'periodCodePer',
				sortable : true,
				align : 'right',
				flex : 1
			}, {
				header : 'Período', 
				dataIndex : 'namePer',
				sortable : true,
				flex : 1
			}, {
				header : 'Fecha Apertura',
				dataIndex : 'periodStartDatePer',
				renderer: Ext.util.Format.dateRenderer('d/m/Y'),
				sortable : true, 
				flex : 1,
				align : 'center'
			}, { 
				header : 'Fecha Cierre',
				dataIndex : 'periodEndDatePer',
				renderer: Ext.util.Format.dateRenderer('d/m/Y'),
				sortable : true,
				flex : 1,
				align : 'center'
			}, {
				header : 'Estado',
				flex : 1,
				dataIndex : 'periodStatusPer',
				sortable : true,
				renderer : function(val){
					var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'PeriodStatusTypeCodeList::'+val.codePes);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val.codePes;
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
                            text: 'Abrir',
                            action: 'abrirProceso',
                            hidden: false
                        },{
                            xtype: 'button',
                            text: 'Cerrar',
                            action: 'cerrarProceso',
                            hidden: false
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
