Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.ratingterritoryv1forminput',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    initComponent: function() {
        this.items = [{
            layout: 'column',
            xtype: 'panel',
            border: false,
            items: [{
                layout: 'column',
                xtype: 'panel',
                height: '100%',
                border: false,
                columnWidth: 1,
                defaults: {
                    anchor: '100%',
                    columnWidth: 1
                },
                padding: '10 10 0 10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Datos del Territorio de Suscripción',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .333
                    },
                    items:[                    
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'typeCodeRat',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 0,
                        listeners: {
                            focus: function(combo){
                                combo.getStore().load({
                                    callback: function(){
                                        combo.expand();
                                    }
                                });
                            }
                        },
                        hidden: false,
                        valueField: 'enumerationLiteralEnu',
                        displayField: 'descriptionEnu',
                        forceSelection: true,
                        store: new Ext.data.Store({
                            model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
                            remoteSort: true,
                            autoLoad: false,
                            pageSize: 9999,
                            proxy: {
                                type: 'rest',
                                url: urlService + 'enumerationService/findByEnumerationType',
                                actionMethods: {
                                    read: 'POST'
                                },
                                extraParams: {
                                    enumName: 'RatingTerritoryTypeCodeList'
                                },
                                reader: {
                                    rootProperty: 'datos',
                                    successProperty: 'valido',
                                    totalProperty: 'totalRegistros'
                                }
                            }
                        })
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Código',
                        emptyText: 'Ingrese Código',
                        name: 'territoryExternalCodeRat',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        regex: nameReg1,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo',
                        itemId: 'tipoplace_ratingterritory',
                        columnWidth : .25,
                        padding: '0 10 10 0',
                        name: 'tipo',
                        displayField: 'place',
                        valueField: 'typeNameImo',
                         listeners: {
                            change: function(cmp){
                                 cmp.fireEvent ('load_places_ratingterritory',cmp);
                            }
                        },
                        store: Ext.create('Ext.data.Store', {
    								fields: ['place','typeNameImo'],
									data : [
									    {"place":"País", "typeNameImo":"Country"},
									    {"place":"Región", "typeNameImo":"CountrySubdivisionV1"},
									    {"place":"Provincia", "typeNameImo":"CountrySubdivisionV2"},
									    {"place":"Ciudad", "typeNameImo":"MunicipalityV1"},
									    {"place":"Comuna", "typeNameImo":"MunicipalityV2"},
									    {"place":"Zona Geográfica", "typeNameImo":"GeographicRegion"}
									]
						}),
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Lugar',
                        displayField: 'namePla',
                        name: 'identifiedPlaceRat',
                        itemId: 'place_ratingterritory',
                        valueField: 'placeIdentifierPla',  
                        triggerCls: 'x-form-search-trigger',
                        store: new Ext.data.Store({
                            model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
                            remoteSort: true,
						    remoteFilter: true,
						    simpleSortMode: true,
						    simpleGroupMode: true,
						    autoLoad: false,
						    sorters: [{
						        property: 'placeIdentifierPla',
						        direction: 'DESC'
						    }],
						    proxy:  {
							        type: 'rest',
							        url: urlService + 'placeService/findByFilter',
							        actionMethods:  {
							            read: 'POST'
							        },
							        extraParams:{
							            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
							                nombreCampo: 'class',
							                valor: 'Place',
							                valores: null,
							                operacion: '=',
							                tipoValor: 'string'
							            }).data])
							        },
							        reader: {
							            type: 'json',
							            rootProperty: 'datos',
							            successProperty: 'valido',
							            totalProperty: 'totalRegistros'
							        }
    							}
						    
                        }),
                        listeners: {
                            change: function(cmp){
                                 cmp.fireEvent ('find_places',cmp);
                            },
                            beforerender: function(){
						        
						        
						   },
						  
						},
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        allowBlank: false,
                        queryMode: 'local',
                        padding: '0 10 10 0',
                        columnWidth : .25
                   },
                   
                    
                    ]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
