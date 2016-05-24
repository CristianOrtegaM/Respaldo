Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.attributerangerulev1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº de Especificación',
                dataIndex: 'specificationIdentifierSpe',
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
                header: 'Código de la Regla',
                dataIndex: 'kindOfElementNameSpe',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Versión',
                dataIndex: 'versionSpe',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombre',
                dataIndex: 'nameSpe',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Nombre Corto',
                dataIndex: 'shortNameSpe',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
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
