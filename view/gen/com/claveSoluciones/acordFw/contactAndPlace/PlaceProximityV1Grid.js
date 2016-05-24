Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.placeproximityv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Desde',
                menuText: 'Desde',
                dataIndex: 'toPlacePlp',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showToPlacePlp'
            },
            {
                header: 'Hasta',
                menuText: 'Hasta',
                dataIndex: 'fromPlacePlp',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showFromPlacePlp'
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
