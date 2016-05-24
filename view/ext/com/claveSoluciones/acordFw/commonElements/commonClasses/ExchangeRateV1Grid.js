Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.exchangeratev1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'exchangeRateIdentifierExr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120,
                renderer: function(val){
                    return Ext.util.Format.number(val,'0.0,/i');
                }
            },
            {
                header: 'Moneda Desde',
                dataIndex: 'fromCurrencyTypeExternalCodeExr',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = externalcodeRenderStore.findExact('externalCodeExc', val);
                    return index != -1 ? externalcodeRenderStore.getAt(index).get('descriptionExc') : val;
                },
                width: 120
            },
            {
                header: 'Moneda Hasta',
                dataIndex: 'toCurrencyTypeExternalCodeExr',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = externalcodeRenderStore.findExact('externalCodeExc', val);
                    return index != -1 ? externalcodeRenderStore.getAt(index).get('descriptionExc') : val;
                },
                width: 120
            },
            {
                header: 'Fecha de Cambio',
                dataIndex: 'asOfDateExr',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 160
            },
            {
                header: 'Tasa de Cambio',
                dataIndex: 'conversionFactorExr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 150,
                renderer: function(val){
                	return Ext.util.Format.number(val,'0.0,00/i');
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
