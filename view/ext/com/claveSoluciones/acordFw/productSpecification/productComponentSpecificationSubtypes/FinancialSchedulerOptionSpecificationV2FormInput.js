Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.FinancialSchedulerOptionSpecificationV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.financialscheduleroptionspecificationv2forminput',
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
                    title: 'Estado',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Estado',
                        name: 'status',
                        hidden: false,
                        readOnly: true,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            } 
                        }
                    }, {
                    	xtype: 'statustoolbar',
                    	columnWidth: .6666
                    }]
                },{
                    xtype:'fieldset',  
                    title: 'Especificación de Opción de Plan de Pago',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Código de Opción de Plan de Pago',
                        emptyText: 'Ingrese Código de Opción de Plan de Pago',
                        name: 'kindOfElementNameSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
                        padding: '0 10 10 0',
                        regex: nameReg1withoutSpace,
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
                        xtype: 'textfield',
                        fieldLabel: 'Versión',
                        emptyText: 'Ingrese Versión',
                        name: 'versionSpe',
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
                        xtype: 'textfield',
                        fieldLabel: 'Código Externo',
                        emptyText: 'Ingrese Código Externo',
                        name: 'productExternalCodePrs',
                        allowBlank: true,
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
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'nameSpe',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .75,
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
                        xtype: 'textfield',
                        fieldLabel: 'Nombre Corto',
                        emptyText: 'Ingrese Nombre Corto',
                        name: 'shortNameSpe',
                        allowBlank: true,
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
                        xtype: 'textfield',
                        fieldLabel: 'Nombre Comercial',
                        emptyText: 'Ingrese Nombre Comercial',
                        name: 'marketingNamePrs',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .5,
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
                        xtype: 'textareafield',
                        grow: true,
                        name: 'descriptionSpe',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        fieldLabel: 'Descripción',
                        maxLength: 5000,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Comercializable',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'marketableIndicatorPrs',
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
                        valueField: 'valor',
                        displayField: 'nombre',
                        forceSelection: true,
                        store: new Ext.data.ArrayStore({
                            fields: ['nombre', 'valor'],
                            data: [['Sí', true], ['No', false] ]
                        })
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Inicio de Comercialización',
                        emptyText: 'Ingrese Inicio de Comercialización',
                        name: 'marketablePeriodStartDateTimePrs',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Término de Comercialización',
                        emptyText: 'Ingrese Término de Comercialización',
                        name: 'marketablePeriodEndDateTimePrs',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Tipo de Remesa',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'remittanceTypeCodeFso',
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
                                    enumName: 'RemittanceTypeCodeList'
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
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Medio de Pago',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'remittanceMeansCodeFso',
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
                                    enumName: 'FinancialMediumTypeCodeList'
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
                        xtype: 'combo',
                        forceSelection: true,
                        fieldLabel: 'Frecuencia de Pago',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'paymentFrequencyCodeFso',
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
                                    enumName: 'FrequencyCodeList'
                                },
                                reader: {
                                    rootProperty: 'datos',
                                    successProperty: 'valido',
                                    totalProperty: 'totalRegistros'
                                }
                            }
                        })
                    },
//                    {
//                        xtype: 'combo',
//                        forceSelection: true,
//                        fieldLabel: 'Unidad de Duración de Pago',
//                        autoLoadOnValue: true,
//                        emptyText: 'Seleccione ...',
//                        name: 'paymentDurationUnitCodeFso',
//                        allowBlank: false,
//                        afterLabelTextTpl: [
//                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
//                        ],
//                        columnWidth: .25,
//                        padding: '0 10 10 0',
//                        queryMode: 'local',
//                        typeAhead: false,
//                        editable: false,
//                        minChars: 0,
//                        listeners: {
//                            focus: function(combo){
//                                combo.getStore().load({
//                                    callback: function(){
//                                        combo.expand();
//                                    }
//                                });
//                            }
//                        },
//                        hidden: false,
//                        valueField: 'externalCodeExc',
//                        displayField: 'descriptionExc',
//                        store: new Ext.data.Store({
//                           model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
//                           remoteSort: true,
//                            autoLoad: false,
//                            pageSize: 9999,
//                            proxy: {
//                                type: 'rest',
//                                url: urlService + 'externalCodeService/findByExternalCodeType',
//                                actionMethods: {
//                                    read: 'POST'
//                                },
//                                extraParams: {
//                                    code: 'UnitCode'
//                                },
//                                reader: {
//                                    rootProperty: 'datos',
//                                    successProperty: 'valido',
//                                    totalProperty: 'totalRegistros'
//                            }
//                        }
//                        })
//                    },
                    {
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Duración de Pago',
                        emptyText: 'Ingrese Duración de Pago',
                        name: 'paymentDurationValueFso',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'                    
                    }]
                }
                ],
                buttons: [{
                            xtype: 'splitbutton',
                            text: 'Imprimir',
                            margins: '0 17 0 0',
                            hidden: false,
                            menu: [{
                            	text: 'Estructura Componente',
                            	optionButton: true,
                            	action: 'printComponentStructure'
                            }, {
                            	text: 'Componentes Dependientes',
                            	optionButton: true,
                            	action: 'printDependentComponents'
                            }]
                },{
                	text: 'Guardar',
		            scope: this,
		            bodyPadding: 5,
		            margins: '0 17 0 0',
		            action: 'create'
                },{ 
                	text: 'Cancelar',
		            scope: this,
		            bodyPadding: 5,
		            margins: '0 17 0 0',
		            handler: function(){
		            	this.up('window').close();
		            }
                }]
            }]
        }, 
        {
        	xtype: 'fieldset',
        	margin: 10,
        	border: true,        	
        	items: [{
        		xtype: 'formspecificationaddin',
        		disabled: true
        	}]
        }, {
        	xtype: 'fieldset',
        	margin: '10 10',
        	title: 'Reglas',
        	collapsible: true,
            hidden: false,
        	items: [{
        		xtype: 'attributerulesgrid'
        	}]
        }];
        this.callParent(arguments);
    }
});

