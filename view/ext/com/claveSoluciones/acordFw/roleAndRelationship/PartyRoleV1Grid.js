Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.partyrolev1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
    initComponent: function() {
        this.columns = [
		    {
                header: 'Nº',
                dataIndex: 'roleIdentifierRol',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 70,
                
            },
            {
                header: 'Código',
                dataIndex: 'playerPartyPar',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 200,
				renderer: function (val) {
					return val.keyImo;
                }
            },
            {
                header: 'Nombre',
                dataIndex: 'playerPartyPar',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 385,
				renderer: function (val, p, r) {
					
					if(val.nameOrg!==null && val.nameOrg!==undefined && val.nameOrg.length>0){
						for(var i=0; i<val.nameOrg.length; i++){
							if(val.nameOrg[i].usageCodeOrn == "LegalName"){
								return val.nameOrg[i].fullNamePan;
							}
						}
					}else if(val.namePer!==null && val.namePer!==undefined && val.namePer.length>0){
						return val.namePer[0].fullNamePan;
					}else if(val.nameVip!==null && val.nameVip!==undefined && val.nameVip.length>0){
						return val.nameVip[0].fullNamePan;
					}  
                }
            },
			{
                header: 'Vigencia Inicial',
                dataIndex: 'rolePlayerPeriodStartDateTimeRol',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 150
            },
			{ 
                header: 'Vigencia Final',
                dataIndex: 'rolePlayerPeriodEndDateTimeRol',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: true,
                align: 'center',
                hidden: false,
                width: 150
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
