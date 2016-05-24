Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.placev1grid_ext',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    //store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'placeIdentifierPla',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombre',
                dataIndex: 'namePla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'País',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                	try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									if(val[i].postalCountryPoa!==null){
										return val[i].postalCountryPoa.namePla
									}
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
                width: 120
            },
            {
                header: 'Región',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                	try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									if(val[i].postalCountrySubdivisionPoa!==null){
										return val[i].postalCountrySubdivisionPoa.namePla
									}
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
                width: 120
            },
            {
                header: 'Ciudad',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                	try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									if(val[i].postalMunicipalityPoa!==null && val[i].postalMunicipalityPoa.length>0){
										for (var j=0; j<val[i].postalMunicipalityPoa.length; j++) {
											if (val[i].postalMunicipalityPoa[j].typeCodeMun === 'City')
												return val[i].postalMunicipalityPoa[j].namePla;
										}
									}
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
                width: 120
            },
             {
                header: 'Comuna',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                	try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									if(val[i].postalMunicipalityPoa!==null && val[i].postalMunicipalityPoa.length>0){
										for (var j=0; j<val[i].postalMunicipalityPoa.length; j++) {
											if (val[i].postalMunicipalityPoa[j].typeCodeMun === 'Township')
												return val[i].postalMunicipalityPoa[j].namePla;
										}
									}
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
                width: 120
            },
			{
                header: 'Calle',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									return val[i].unstructuredAddressPla.split ('::')[0];
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
				
            },
			{
                header: 'Número',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									if(val[i].unstructuredAddressPla.split ('::')[1]!=='undefined'){
										if(val[i].unstructuredAddressPla.split ('::')[1]==="null"){
                                                                                return '';    
                                                                                }else{
                                                                                return val[i].unstructuredAddressPla.split ('::')[1];
                                                                                }
									}else{
										return '';	
									}
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },
			{
                header: 'Departamento, Casa o Unidad',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
                renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									return val[i].unitNumberPoa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },
            {
                header: 'Edificio o Condominio',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
                renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									return val[i].buildingNamePoa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },		
			{
                header: 'Piso',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
                renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "PostalAddress"){
									return val[i].floorNumberPoa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },	
            {
                header: 'Sistema de Coordenadas Geográficas',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "GlobalPositionAddress"){
									return val[i].coordinateSystemCodeGpa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },
            {
                header: 'Latitud',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "GlobalPositionAddress"){
									return val[i].latitudeGpa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },
            {
                header: 'Longitud',
                dataIndex: 'identifyingAddressPla',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120,
				renderer: function (val) {
					try {
							for(var i=0; i<val.length; i++){
								if(val[i].typeNameImo== "GlobalPositionAddress"){
									return val[i].longitudeGpa;
								}
							}
						
						
					} catch (err){											
						console.log (err);
					}									
					return '';
                },
            },			
            
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
