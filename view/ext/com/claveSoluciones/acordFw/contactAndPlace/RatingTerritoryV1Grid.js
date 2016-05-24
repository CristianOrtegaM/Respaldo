Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.ratingterritoryv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'ratingTerritoryIdentifierRat',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Tipo',
                dataIndex: 'typeCodeRat',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'RatingTerritoryTypeCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 240
            },
            {
                header: 'Código',
                dataIndex: 'territoryExternalCodeRat',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 300
            },
            {
                header: 'Lugar Identificado',
                dataIndex: 'identifiedPlaceRat',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 240,
				renderer: function (val) {
                    return val.typeNameImo + " - " + val.namePla;
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
