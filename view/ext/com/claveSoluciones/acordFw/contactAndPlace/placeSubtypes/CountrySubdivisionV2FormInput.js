Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.countrysubdivisionv2forminput',
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
                    title: 'Provincia',
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
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'namePla',
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
                        xtype: 'textfield',
                        fieldLabel: 'Abreviación',
                        emptyText: 'Ingrese Abreviación',
                        name: 'abbreviationPla',
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
                        fieldLabel: 'Código Provincia',
                        emptyText: 'Ingrese Código Provincia',
                        name: 'alphaISOExternalCodeCos',
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
                        fieldLabel: 'Superficie',
                        autoLoadOnValue: true,
                        emptyText: 'Seleccione ...',
                        name: 'surfaceAreaUnitCodePla',
                        allowBlank: true,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        queryMode: 'local',
                        //typeAhead: true,
                        editable: false,
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
                        valueField: 'externalCodeExc',
                        displayField: 'descriptionExc',
                        store: new Ext.data.Store({
                           model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
                           remoteSort: true,
                            autoLoad: false,
                            pageSize: 9999,
                            proxy: {
                                type: 'rest',
                                url: urlService + 'externalCodeService/findByExternalCodeType',
                                actionMethods: {
                                    read: 'POST'
                                },
                                extraParams: {
                                    code: 'SurfaceAreaCode'
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
                        xtype: 'numericfield',
                        fieldLabel: 'Cantidad',
                        emptyText: 'Ingrese Superficie',
                        name: 'surfaceAreaValuePla',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '26 10 10 0',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        negativeText: 'El valor no puede ser negativo'
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
                    },
                    {
                        xtype: 'textareafield',
                        name: 'descriptionPla',
                        allowBlank: true,
                        hidden: false,
						height: 110,
						//grow: true,
						//growMin: 1,
						//growMax: 25,
						columnWidth: 1,
						maxLength: 255,
                        fieldLabel: 'Descripción',
						padding: '0 10 10 0',
                        anchor: '100%'
                    }
                ]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
