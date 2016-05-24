Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.capabilityv1formsearch',
    //renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº de Capacidad',
            emptyText: 'Ingrese Nº de Capacidad',
            name: 'capabilityIdentifierCap_fs',
            columnWidth: .25,
            decimalPrecision: 0,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            maxLength: 10,
            hidden: false,
            listeners: {
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tipo Nombre',
            emptyText: 'Ingrese Tipo Nombre',
            name: 'typeNameImo_fs',
            columnWidth: .5,
            padding: '0 10 10 0',
            regex: searchReg1,
            regexText: 'Campo inválido',
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                blur: function(tf){
                    if(tf.getValue!="")
                        this.setValue(tf.getValue().trim());
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            emptyText: 'Ingrese Nombre',
            name: 'nameCap_fs',
            columnWidth: .5,
            padding: '0 10 10 0',
            regex: searchReg1,
            regexText: 'Campo inválido',
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                blur: function(tf){
                    if(tf.getValue!="")
                        this.setValue(tf.getValue().trim());
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            }
        },
        {
            xtype: 'combo',
            forceSelection: true,
            autoLoadOnValue: true,
            fieldLabel: 'Nivel de Expertiz',
            emptyText: 'Seleccione ...',
            name: 'proficiencyLevelCodeCap_fs',
            columnWidth: .25,
            padding: '0 10 10 0',
            queryMode: 'local',
            typeAhead: false,
            editable: false,
            minChars: 0,
            listeners: {
                focus: function(combo){
                    combo.getStore().load({
                        callback: function(){
                            combo.expand();
                        }
                    });
                },
                afterrender: function(){
                    this.getEl().addListener('click', function() {
                        this.down('input').focus();
                    });
                }
            },
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
                        enumName: 'ProficiencyLevelCodeList'
                    },
                    reader: {
                        rootProperty: 'datos',
                        successProperty: 'valido',
                        totalProperty: 'totalRegistros'
                    }
                }
            })
        }
    ],
    buttons:[{
        text: 'Limpiar',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
