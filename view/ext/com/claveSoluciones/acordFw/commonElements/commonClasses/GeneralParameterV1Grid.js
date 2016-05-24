Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Grid',{
    extend: 'Ext.grid.Panel', 
    alias: 'widget.generalparameterv1grid_ext',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'generalParameterIdentifierGep',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Código',
                dataIndex: 'codeGep',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 300
            },
            {
                header: 'Nombre',
                dataIndex: 'nameGep',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 438
            },
            {
                header: 'Tipo',
                dataIndex: 'dataTypeGep',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 100,
                renderer: function(val){
                	var index = generalParamRender.findExact('enumerationLiteralEnu',val);
                	return index != -1 ? generalParamRender.getAt(index).get('descriptionEnu') : val;
                }
            },
            {
                header: 'Valor Texto',
                dataIndex: 'stringValueGep',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 115
            },
            {
                header: 'Valor Numérico',
                dataIndex: 'numberValueGep',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 140
            },
            {
                header: 'Valor Fecha',
                dataIndex: 'dateValueGep',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 175
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
