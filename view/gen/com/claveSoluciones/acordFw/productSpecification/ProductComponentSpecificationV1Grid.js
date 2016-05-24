Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductComponentSpecificationV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.productcomponentspecificationv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductComponentSpecificationV1',
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
                header: 'typeName',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
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
                header: 'Código del Rol',
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
            },
            {
                header: 'Descripción',
                dataIndex: 'descriptionSpe',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 360
            },
            {
                header: 'Estado',
                menuText: 'Estado',
                dataIndex: 'statusPrs',
                hidden: false,
                align: 'left',
                renderer: function(val) {
                    if (val != null) {
                        return val.nameSta;
                    }
                    else {
                        return "";
                    }
                },
                width: 120,
                sortable: false
            },
            {
                header: 'Código Externo',
                dataIndex: 'productExternalCodePrs',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Línea de Negocios Agregada',
                dataIndex: 'broadLineOfBusinessCodePrs',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'BroadLineOfBusinessCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Nombre Interno',
                dataIndex: 'internalNamePrs',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Línea de Negocios',
                dataIndex: 'lineOfBusinessCodePrs',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'LineOfBusinessCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Nombre Comercial',
                dataIndex: 'marketingNamePrs',
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
