Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataAccount', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataaccount',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Datos de la Cuenta Comercial',
	                   collapsible: true,
	                   hidden: false,
	                   columnWidth: 1,
	                   layout: 'column',
	                   defaults: {
	                      anchor: '100%',
	                      columnWidth: .333
	                    },
                        items: [
						{
							xtype: 'datefield',
							fieldLabel: 'Vigencia Inicial',
							name: 'rolePlayerPeriodStartDateTimeRol',
							emptyText: 'Seleccione Vigencia Inicial',
							columnWidth: .25,
							padding: '0 10 10 0',
							format : 'd/m/Y',
							submitFormat : 'd-m-Y H:i:s',
							allowBlank: false,
                        	afterLabelTextTpl: [
                            	'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        	],
                        	editable: false
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Vigencia Final',
							emptyText: 'Seleccione Vigencia Final',
							name: 'rolePlayerPeriodEndDateTimeRol',
							columnWidth: .25,
							padding: '0 10 10 0',
							format : 'd/m/Y',
							submitFormat : 'd-m-Y H:i:s',
							editable: true
						},
						{
							xtype: 'panel',
							width: 500,
    						height: 61,
						    //fieldLabel: ' ',
							columnWidth : .5,
							padding : '0 10 10 0',
							bodyStyle: 'border-color: white;'
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Fecha Inicio Relación',
							name: 'effectivePeriodStartDateTimePrr',
							emptyText: 'Seleccione Fecha Inicio Relación',
							columnWidth: .25,
							padding: '0 10 10 0',
							format : 'd/m/Y',
							submitFormat : 'd-m-Y H:i:s',
							allowBlank: false,
                        	afterLabelTextTpl: [
                            	'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        	],
                        	editable: false
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Método del Primer Contacto',
							emptyText: 'Ingrese Método del Primer Contacto',
							name : 'firstContactMethodCur',
							columnWidth : .25,
							padding : '0 10 10 0',
					    },
						{
							xtype : 'combo',
							fieldLabel : 'Nivel de Prioridad',
							name : 'importanceLevelCodeCur',
							columnWidth : .25,
							emptyText: 'Ingrese Nivel de Prioridad',
							padding : '0 10 10 0',
							queryMode : 'local',
							hidden : false,
							valueField : 'enumerationLiteralEnu',
							displayField : 'descriptionEnu',
							forceSelection : true,
							allowBlank: false,
                        	afterLabelTextTpl: [
                            	'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        	],
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
							store : new Ext.data.Store({
								model : 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
								remoteSort : true,
								autoLoad : true,
								pageSize : 9999,
								proxy : {
									type : 'rest',
									url : urlService + 'enumerationService/findByEnumerationType',
									actionMethods : {
										read : 'POST'
									},
									extraParams : {
										enumName : 'CustomerImportanceLevelCodeList'
									},
									reader : {
										rootProperty : 'datos',
										successProperty : 'valido',
										totalProperty : 'totalRegistros'
									}
								}
							})
						},
					    /*{
							xtype : 'combo',
							fieldLabel : 'Nivel de Prioridad',
							columnWidth : .25,
							padding : '0 10 10 0',
							emptyText: 'Ingrese Nivel de Prioridad',
							name: 'importanceLevelCodeCur',
							allowBlank: false,
                        	afterLabelTextTpl: [
                            	'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        	],
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
							displayField: 'name',
							valueField: 'attr',
							store: Ext.create('Ext.data.Store', {
				    						fields: ['name','atrr'],
											data : [
											    {"name":"1", "atrr":"1"},
											    {"name":"2", "atrr":"2"},
											    {"name":"3", "atrr":"3"}
											]
							})
						},*/
						{
							xtype : 'fieldcontainer',
							padding : '0 10 10 0',
							fieldLabel : 'VIP',
							defaultType : 'radiofield',
							columnWidth : .25,
							defaults : {
								flex : 1
							},
							layout : 'hbox',
							items : [{
								boxLabel : 'Sí',
								name : 'vipIndicatorCur',
								padding : '0 10 10 0',
								inputValue : true,
								id : 'radio_vipIndicatorCur_true'
							}, {
								boxLabel : 'No',
								padding : '0 10 10 0',
								name : 'vipIndicatorCur',
								inputValue : false,
								id : 'radio_vipIndicatorCur_false'
							}]
						},
						{
                        		xtype: 'fieldcontainer',
                        		fieldLabel: 'Monto Potencial de Negocios',
                        		columnWidth: .25,
                        		layout: 'hbox',
                        		items: [
                        		{
                        			xtype: 'combo',
                        			name: 'potentialCurrencyCodeCur',
                        		    padding: '0 10 10 0',
                        		    width: '30%'
                        		},
                        		{						
	                                xtype: 'textfield',
	                                name: 'potentialAmountCur',
	                                emptyText: 'Ingrese Monto Potencial de Negocios',
	                                padding: '0 10 10 0',
									width: '70%'               				 	
                            	}]
                         },
                         {
                        		xtype: 'fieldcontainer',
                        		fieldLabel: 'Monto Realizado de Negocios',
                        		columnWidth: .25,
                        		layout: 'hbox',
                        		items: [
                        		{
                        			xtype: 'combo',
                        			name: 'establishedCurrencyCodeCur',
                        		    padding: '0 10 10 0',
                        		    width: '30%'
                        		},
                        		{						
	                                xtype: 'textfield',
	                                name: 'establishedAmountCur',
	                                emptyText: 'Ingrese Monto Realizado de Negocios',
	                                padding: '0 10 10 0',
									width: '70%'               				 	
                            	}]
                         },
                         {
                        		xtype: 'fieldcontainer',
                        		fieldLabel: 'Monto Anual de Suscripción',
                        		columnWidth: .25,
                        		layout: 'hbox',
                        		items: [
                        		{
                        			xtype: 'combo',
                        			name: 'totalAnnualSubscriptionsCurrencyCodeCur',
                        		    padding: '0 10 10 0',
                        		    width: '30%'
                        		},
                        		{						
	                                xtype: 'textfield',
	                                name: 'totalAnnualSubscriptionsAmountCur',
	                                emptyText: 'Ingrese Monto Anual de Suscripción',
	                                padding: '0 10 10 0',
									width: '70%'               				 	
                            	}]
                         },
                         {
							xtype : 'textfield',
							fieldLabel : 'Evaluación del Cliente',
							emptyText: 'Ingrese Evaluación del Cliente',
							name : 'customerEvaluationCur',
							columnWidth : .25,
							padding : '0 10 10 0',
					    },
					    
					    {
                    		xtype: 'fieldcontainer',
                    		fieldLabel: 'Monto de Siniestros Histórico',
                    		columnWidth: .25,
                    		layout: 'hbox',
                    		items: [
                    		{
                    			xtype: 'combo',
                    			name: 'claimCurrencyCodeCur',
                    		    padding: '0 10 10 0',
                    		    width: '30%'
                    		},
                    		{						
                                xtype: 'textfield',
                                name: 'claimAmountCur',
                                emptyText: 'Ingrese Monto de Siniestros Histórico',
                                padding: '0 10 10 0',
								width: '70%'               				 	
                        	}]
                         },
                         {
                        	xtype : 'textfield',
							fieldLabel : 'Cantidad de Siniestros Histórico',
							emptyText: 'Ingrese Cantidad de Siniestros Histórico',
							name : 'claimCountCur',
							columnWidth : .25,
							padding : '0 10 10 0',
                         },
                         {
                    		xtype: 'fieldcontainer',
                    		fieldLabel: 'Duración de Período de Siniestros',
                    		columnWidth: .25,
                    		layout: 'hbox',
                    		items: [
                    		{
                    			xtype: 'combo',
                    			name: 'claimPeriodDurationUnitCodeCur',
                    		    padding: '0 10 10 0',
                    		    width: '30%'
                    		},
                    		{						
                                xtype: 'textfield',
                                name: 'claimPeriodDurationValueCur',
                                emptyText: 'Ingrese Duración de Período de Siniestros',
                                padding: '0 10 10 0',
								width: '70%'               				 	
                        	}]
                         },
                         {
							xtype : 'textfield',
							fieldLabel : 'Cantidad de Siniestros Período',
							emptyText: 'Ingrese Cantidad de Siniestros Período',
							name : 'claimDuringClaimPeriodCountCur',
							columnWidth : .25,
							padding : '0 10 10 0',
					    },
					    
					    {
							xtype: 'textarea',
							fieldLabel: 'Descripción',
							maxLength: 255,
							emptyText: 'Ingrese Descripción',
							name: 'descriptionRol',
							columnWidth: 1,
							padding: '0 10 10 0',
						}
					    
					    
					    
						
						],

                    }];
        this.callParent(arguments);
    }
});