Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.xtbmlvaluev1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº de Valor',
                dataIndex: 'valueIdentifierXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Tipo Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Dim 01',
                dataIndex: 'dim01Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 02',
                dataIndex: 'dim02Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 03',
                dataIndex: 'dim03Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 04',
                dataIndex: 'dim04Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 05',
                dataIndex: 'dim05Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 06',
                dataIndex: 'dim06Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 07',
                dataIndex: 'dim07Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 08',
                dataIndex: 'dim08Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 09',
                dataIndex: 'dim09Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Dim 10',
                dataIndex: 'dim10Xtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Monto Fijo',
                dataIndex: 'fixedAmountXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Porcentaje',
                dataIndex: 'percentageXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Piso',
                dataIndex: 'floorAmountXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Tope',
                dataIndex: 'capAmountXtv',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Descuento',
                dataIndex: 'discountAmountXtv',
                sortable: true,
                align: 'right',
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
