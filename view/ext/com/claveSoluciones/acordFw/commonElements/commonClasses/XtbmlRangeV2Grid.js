Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.xtbmlrangev2grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: false,
        injectCheckbox: 0,
        mode: 'SINGLE',
        allowDeselect: true,
        showHeaderCheckbox: false
    },
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'rangeIdentifierXtr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            }/**,
            {
                header: 'Tipo Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Dimensión',
                menuText: 'Dimensión',
                dataIndex: 'dimensionXtr',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showDimensionXtr'
            }**/,
            {
                header: 'Secuencia',
                dataIndex: 'rangeSequenceXtr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombre',
                dataIndex: 'rangeNameXtr',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Valor Texto',
                dataIndex: 'varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Valor Número Desde',
                dataIndex: 'numberValueFromXtr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Valor Número Hasta',
                dataIndex: 'numberValueToXtr',
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
                width: '30%'
            }),
            pageSize: 15,
            refreshText: 'Actualizar',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando resultados {0} - {1} de {2}',
            listeners:{
                beforerender: function(tb){
                    tb.add(['->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->',
                            /*{
                            xtype: 'splitbutton',
                            text: 'Importar',
                            handler: function(btn){
                            	this.showMenu();
                            },
							hidden: true,
                            menu: [{
		                        text: 'Importar Categoría',
                            	optionButton: true,
                            	action: 'mostrarWindowsCategory'
		                    },{
		                        text: 'Importar Variable',
                            	optionButton: true,
                            	action: 'mostrarWindowsAttribute'
                            }]
                            }*/
                                {
		                        xtype: 'button',
		                        text: 'Importar',
		                        action: 'importar',
		                        hidden: true
		                    },
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
                            this.down('button[text="Importar"]').setVisible(true);
                            //this.down('button[text="Importar Variable"]').setVisible(true);
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
