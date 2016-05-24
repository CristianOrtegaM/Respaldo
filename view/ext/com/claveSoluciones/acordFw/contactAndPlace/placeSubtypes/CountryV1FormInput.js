Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1FormInput', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.countryv1forminput',
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
                                xtype: 'fieldset',
                                title: 'País',
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
                                                    this.setValue(tf.getValue().trim());
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Código País',
                                        emptyText: 'Ingrese Código País',
                                        name: 'alphaISOExternalCodeCou',
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
                                                    this.setValue(tf.getValue().trim());
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Código País Extendido',
                                        emptyText: 'Ingrese Código País Extendido',
                                        name: 'extendedISOExternalCodeCou',
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
                                                    this.setValue(tf.getValue().trim());
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Código de Area de Teléfono',
                                        emptyText: 'Ingrese Código de Area de Teléfono',
                                        name: 'telephonePrefixExternalCodeCou',
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
                                            blur: function(tf) {
                                                if (tf.getValue != "")
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
                                        //      hideLabel: true,
                                        listeners: {
                                            focus: function(combo) {
                                                combo.getStore().load({
                                                    callback: function() {
                                                        combo.expand();
                                                    }
                                                });
                                            }
                                        },
                                        hidden: false,
                                        valueField: 'externalCodeExc',
                                        displayField: 'descriptionExc',
                                        store: new Ext.data.Store({
                                            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
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
                                        //    hideLabel: true,
                                        emptyText: 'Ingrese Superficie',
                                        name: 'surfaceAreaValuePla',
                                        allowBlank: true,
                                        hidden: false,
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        minValue: 0,
                                        negativeText: 'El valor no puede ser negativo',
                                        fieldStyle: 'text-align: right;',
                                        /*
                                         columnWidth: .7,
                                         padding: '0 10 10 0',
                                         minValue: 0,
                                         maxLength: 10,
                                         maxValue: 9999999999,
                                         listeners: {
                                         change: function(cmp, newValue, oldValue) {
                                         var physicalObjectKind = cmp.up('window').down('combo[name="physicalObjectKind"]').getValue();
                                         var ownershipCountGoi = cmp.up('window').down('numericfield[name="ownershipCountGoi"]').getValue();
                                         
                                         if (physicalObjectKind !== null && physicalObjectKind === 'physicalObject.Fleet' && ownershipCountGoi > 0) {
                                         cmp.up('physicalobjectnew').fireEvent('calculate_average_fleet', cmp, newValue, ownershipCountGoi);
                                         
                                         }
                                         }
                                         },
                                         fieldStyle: 'text-align: right;',
                                         */
                                    },
                                    {
                                        xtype: 'textareafield',
                                        //grow: true,
                                        //growMin: 1,
                                        //growMax: 5,
                                        name: 'descriptionPla',
                                        height: 110,
                                        allowBlank: true,
                                        hidden: false,
                                        columnWidth: .75,
                                        maxLength: 255,
                                        fieldLabel: 'Descripción',
                                        padding: '0 10 10 0',
                                        anchor: '100%'
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
                                    }
                                    
                                ]
                            }
                        ]
                    }]
            }];
        this.callParent(arguments);
    }
});
