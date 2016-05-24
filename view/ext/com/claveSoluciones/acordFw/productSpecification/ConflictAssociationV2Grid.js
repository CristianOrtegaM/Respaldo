Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV2Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.conflictassociationv2grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº de Asociación de Producto',
                dataIndex: 'productAssociationIdentifierPra',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
            	header: 'Especificación Base de Producto Asociado',
                menuText: 'Especificación Base de Producto Asociado',
                dataIndex: 'associatedProductSpecificationBasePra',
                sortable: false,
                align: 'left',
                hidden: false,
                width: 280,
                renderer: function(val){
                	return val.nameSpe;
                }
            }, {
            	header: 'Período Efectivo Inicial',
            	dataIndex: 'effectivePeriodStartDateTimePra',
            	sortable: true,
            	align: 'center',
            	xtype: 'datecolumn',
			    format: 'd/m/Y',
            	width: 120
            }, {
            	header: 'Período Efectivo Final',
            	dataIndex: 'effectivePeriodEndDateTimePra',
            	sortable: true,
            	align: 'center',
            	xtype: 'datecolumn',
			    format: 'd/m/Y',
            	width: 120
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
