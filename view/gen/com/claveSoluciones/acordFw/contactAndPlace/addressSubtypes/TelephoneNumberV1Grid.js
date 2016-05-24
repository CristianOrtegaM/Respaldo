Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.telephonenumberv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Código de Área',
                dataIndex: 'areaExternalCodeTnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Código de Ciudad',
                dataIndex: 'countryExternalCodeTnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Extensión',
                dataIndex: 'extensionTnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Número Completo',
                dataIndex: 'fullNumberTnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Número Local',
                dataIndex: 'localNumberTea',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Direccioón de Red',
                dataIndex: 'networkAddressKindNea',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'NetworkAddressKTypeCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Dirección de Telecomunicación',
                dataIndex: 'telecommunicationAddressKindTea',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Prefijo',
                dataIndex: 'trunkPrefixTnu',
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
