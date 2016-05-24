Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.postcodev1forminput',
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
                    title: 'Código Postal',
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
						fieldLabel: 'Comuna',								
						emptyText: 'Seleccione Comuna',
						name: 'placeMunicipality',
						displayField: 'namePla',
						valueField: 'placeIdentifierPla',
						columnWidth: .25,
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],						
						autoLoadOnValue: false,
                                                triggerCls : 'x-form-search-trigger',
						//queryMode: 'local', 
                                                typeAhead: true,
                                                minChars: 0,
						padding: '0 10 10 0',
						editable: true,
						store : new Ext.data.Store({
							model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1',
							remoteSort: true,
							remoteFilter: true,
							simpleSortMode: true,
							simpleGroupMode: true,
							pageSize: 15,
							autoLoad: false,
							sorters: [{
								property: 'placeIdentifierPla',
								direction: 'DESC'
							}],
							proxy : {
								type : 'rest',
								url : urlService + 'municipalityService/findByFilter',
								actionMethods : {
									read : 'POST'
								},
								extraParams:{
									filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
										nombreCampo: 'class',
										valor: 'Municipality',
										valores: null,
										operacion: '=',
										tipoValor: 'string'
									}).data,
											Ext.create('AFW_FND_Xjs.model.util.Filtro', {
											nombreCampo: 'typeCodeMun',
											valor: 'Township',
											valores: null,
											operacion: '=',
											tipoValor: 'enum',
											enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
										}).data       
									])
								},
								reader : {
									rootProperty : 'datos',
									successProperty : 'valido',
									totalProperty : 'totalRegistros'
								}
							}
						}),
	                        listeners: {
                                    change: function(cb, newValue, oldValue) {
                                        var value = cb.getValue(),
                                            filtro = [],
                                            store = cb.getStore();;
                                        if(typeof value === "string" && value.length>0){
                                            store.removeAll ();
                                            store.filters.clear();
                                            delete store.getProxy().extraParams['filters'];
                                            filtro = [Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'class',
                                                    valor: 'Municipality',
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'string'
                                            }).data, Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'typeCodeMun',
                                                    valor: 'Township',
                                                    valores: null,
                                                    operacion: '=',
                                                    tipoValor: 'enum',
                                                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.MunicipalityTypeCodeList'
                                            }).data, Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'namePla',
                                                    valor: value + '%',
                                                    valores: null,
                                                    operacion: 'like',
                                                    tipoValor: 'string'
                                                }).data];
                                            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
	                                    store.currentPage=1;
	                                    cb.setEditable(false);
                                            store.load({
                                                callback: function(records){
                                                    if(records.length>0){
                                                        cb.expand();
                                                    }
                                                    cb.setEditable(true);
                                                }
                                            });
                                        }
                                    }
                                }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Código Postal',
                        emptyText: 'Ingrese Código Postal',
                        name: 'assignedExternalCodePoc',
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
                        xtype: 'datefield',
                        fieldLabel: 'Habilitado Desde',
                        emptyText: 'Ingrese Habilitado Desde',
                        name: 'availablePeriodStartDateTimePla',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Habilitado Hasta',
                        emptyText: 'Ingrese Habilitado Hasta',
                        name: 'availablePeriodEndDateTimePla',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
