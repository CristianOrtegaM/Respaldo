Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.ProductGroupV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.productgroupv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.ProductGroupV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'categoryIdentifierCat',
                sortable: true,
                align: 'right',
                /**xtype: 'treecolumn',**/
                hidden: false,
                width: 120
            }/**,
            {
                header: 'typeName',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            }**/,
            {
                header: 'Código',
                dataIndex: 'keyImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombre',
                dataIndex: 'categoryNameCat',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 360
            },
            {
                header: 'Vigencia Inicial',
                dataIndex: 'availablePeriodStartDateTimeCat',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 120
            },
            {
                header: 'Vigencia Final',
                dataIndex: 'availablePeriodEndDateTimeCat',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
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
