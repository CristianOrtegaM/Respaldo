Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.xtbmldimensionv2forminput',
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
                items: [{
		            xtype: 'xtbmltablev1grid',
		            itemId: 'tableXtdGrid',
		            autoScroll: true,
		            height: '',
		            hidden: true,
		            store: new Ext.data.Store({
		                model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
		                data: []
		            })
		            },
                {
                    xtype:'fieldset',
                    title: 'Especificación',
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
                    	xtype: 'numericfield',
				        maxLength: 10,
                        fieldLabel: 'Secuencia',
                        emptyText: 'Ingrese Secuencia',
                        name: 'dimSequenceXtd',
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
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'transactionCodeXtd',
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
                        fieldLabel: 'Tipo Dato',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'dataTypeXtd',
                        editable: false,
                        //allowBlank: false,
                        //afterLabelTextTpl: [
                        //    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        //],
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
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
                                    enumName: 'DataTypeCodeXtbmlDimensionList'
                                },
                                reader: {
                                    rootProperty: 'datos',
                                    successProperty: 'valido',
                                    totalProperty: 'totalRegistros'
                                }
                            }
                        })
                    }]
                }
                ],
                buttons: [{
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
            }, 
			{
                layout: 'column',
                xtype: 'panel',
                height: '100%',
                border: false,
                columnWidth: 1,
                defaults: {
                    anchor: '100%',
                    columnWidth: 1
                },
                padding: '10',
                items: [
                {
                    xtype: 'panel',
                    title: 'Rangos',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    height: '100%',
                    border: false,
                    defaults: {
                        anchor: '100%',
                        columnWidth: 1
                    },
                    items: [					
                     {
                        xtype: 'xtbmlrangev2grid',
                        itemId: 'rangesXtdGrid',
                        columnWidth : 1,
                        autoScroll: true,
                        disabled: true,
                        padding: '10 0 0 0',
                        listeners: {	
                            afterrender: function(){
                                this.down('toolbar').fireEvent('buttonsAccess', ['c','u','d']);

                            }
                        }

                       }

                     ]
                 }
		]
	      }
	    ]
        }];
        this.callParent(arguments);
    }
});
