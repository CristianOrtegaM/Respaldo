Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.ProductGroupV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.productgroupv1forminput',
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
                padding: '10',
                items: [
                {
                    xtype:'fieldset',
                    title: 'Grupo de Productos',
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
                        fieldLabel: 'Código',
                        emptyText: 'Ingrese Código',
                        name: 'keyImo',
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
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'categoryNameCat',
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
                        maxLength: 5000,
                        grow: true,
                        name: 'categoryDescriptionCat',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        fieldLabel: 'Descripción',
                        anchor: '100%'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Vigencia Inicial',
                        emptyText: 'Ingrese Vigencia Inicial',
                        name: 'availablePeriodStartDateTimeCat',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        listeners : {
                        render : function(datefield) {
                            /// code to convert GMT String to date object
                        	if(datefield.getValue() == null)
                                datefield.setValue(new Date());
                            }
                        },
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Vigencia Final',
                        emptyText: 'Ingrese Vigencia Final',
                        name: 'availablePeriodEndDateTimeCat',
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
