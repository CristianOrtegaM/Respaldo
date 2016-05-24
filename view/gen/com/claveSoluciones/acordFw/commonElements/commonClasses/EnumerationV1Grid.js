Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.enumerationv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'enumerationIdentifierEnu',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Tipo',
                dataIndex: 'enumerationEnu',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = externalcodeRenderStore.findExact('externalCodeExc', 'EnumerationCode::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionExc') : val;
                },
                width: 240
            },
            {
                header: 'Código',
                dataIndex: 'enumerationLiteralEnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Descripción',
                dataIndex: 'descriptionEnu',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 360
            },
            {
                header: 'Lenguaje',
                dataIndex: 'languageExternalCodeEnu',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = externalcodeRenderStore.findExact('externalCodeExc', 'LanguageCode::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionExc') : val;
                },
                width: 120
            },
            {
                header: 'Usable',
                dataIndex: 'usableIndicatorEnu',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'BooleanTypeCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
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
