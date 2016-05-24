Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.communicationstatusv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1',
    viewConfig: {
        listeners: {
            resize: function (view){
                view.updateLayout();
            }
        }
    },
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº de Estado',
                dataIndex: 'statusIdentifierSta',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
                renderer: function(val){
                    return Ext.util.Format.number(val,'0.0,/i');
                }
            },
            {
                header: 'key',
                dataIndex: 'keyImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'typeName',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Fecha y Hora Efectiva',
                dataIndex: 'effectiveDateTimeSta',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombre',
                dataIndex: 'nameSta',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Motivo',
                dataIndex: 'reasonSta',
                sortable: true,
                align: 'left',
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
