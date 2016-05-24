Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.postaladdressv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    //store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'addressIdentifierAdd',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },          
//			{
//                header: 'Tipo de Dirección',
//                dataIndex: 'typeNameImo',
//                sortable: true,
//                align: 'right',
//                hidden: false,
//                width: 120
//            },          			
			{
                header: 'País',
                dataIndex: 'postalCountryPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
					return val.namePla;
                },
                width: 120
            },
			{
                header: 'Región',
                dataIndex: 'postalCountrySubdivisionPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
					return val.namePla;
                },
                width: 120
            },
			{
                header: 'Ciudad',
                dataIndex: 'postalMunicipalityPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
					if (val !== null && val.length>0) {
						for (var i=0; i<val.length; i++) {
							if (val[i].typeCodeMun === 'City')
								return val[i].namePla;
						}
					}
                },
                width: 120
            },
			{
                header: 'Comuna',
                dataIndex: 'postalMunicipalityPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
					if (val !== null && val.length>0) {
						for (var i=0; i<val.length; i++) {
							if (val[i].typeCodeMun === 'Township')
								return val[i].namePla;
						}
					}
                },
                width: 120
            },
			{
                header: 'Calle',
                dataIndex: 'unstructuredAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					return val.split ('::')[0];
                },
				
            },
			{
                header: 'Número',
                dataIndex: 'unstructuredAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					if(val.split ('::')[1]!=='undefined'){
						return val.split ('::')[1];
					}else{
						return '';	
					}
                },
            },
						{
                header: 'Departamento, Casa o Unidad',
                dataIndex: 'unitNumberPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
			{
                header: 'Edificio o Condominio',
                dataIndex: 'buildingNamePoa',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },		
			{
                header: 'Piso',
                dataIndex: 'floorNumberPoa',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },				
            {
                header: 'Código Postal',
                menuText: 'Código Postal',
                dataIndex: 'postalPostCodePoa',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showPostalPostCodePoa'
            },
            {
                header: 'Nombre del Edificio',
                dataIndex: 'buildingNamePoa',
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
