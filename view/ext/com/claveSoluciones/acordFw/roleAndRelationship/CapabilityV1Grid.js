Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.capabilityv1grid_ext',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
    listeners: {
        sortchange: function( ct, column, direction) {
        	console.log(ct);   
        	console.log(column);   
        	console.log(direction);
        	var data = this.getStore().getProxy().getData();   
        	if(column.text==='Id'){
        		if(direction==='ASC'){
	        		data.sort(function(a,b){
				    if(a.capabilityIdentifierCap == b.capabilityIdentifierCap)
				        return 0;
				    if(a.capabilityIdentifierCap < b.capabilityIdentifierCap)
				        return -1;
				    if(a.capabilityIdentifierCap > b.capabilityIdentifierCap)
				        return 1;
				    });
        		}else{
        			data.sort(function(a,b){
				    if(a.capabilityIdentifierCap == b.capabilityIdentifierCap)
				        return 0;
				    if(a.capabilityIdentifierCap < b.capabilityIdentifierCap)
				        return 1;
				    if(a.capabilityIdentifierCap > b.capabilityIdentifierCap)
				        return -1;
				    });
        		}
        		this.getStore().commitChanges();
        	}
        }
    },
    initComponent: function() {
        this.columns = [
        	{
                header: 'Código Capacidad',
                dataIndex: 'capabilityIdentifierCap',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 180,
                listeners: {
			        sortchange: function( ct, column, direction) {
			        	console.log('sddsds');
			        }
			    },
            },            
            {
                header: 'Nombre',
                dataIndex: 'nameCap',
                sortable: true,
                align: 'left',
                hidden: false,
                flex: 1
            },
			{
                header: 'Vigencia Inicial',
                dataIndex: 'availablePeriodStartDateTimeCap',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 120
            },
			{
                header: 'Vigencia Final',
                dataIndex: 'availablePeriodEndDateTimeCap',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
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
                            hidden: false
                        },{
                            xtype: 'button',
                            text: 'Editar',
                            action: 'edit',
                            hidden: false
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
