Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.accountingcategoryv1formsearch_ext',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'numericfield',
            fieldLabel: 'Nº',
            emptyText: 'Ingrese Número',
            name: 'categoryIdentifierCat',
            columnWidth: .25,
            decimalPrecision: 0,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            maxLength: 10,
            hidden: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Código',
            emptyText: 'Ingrese Código',
            name: 'keyImo',
            columnWidth: .25,
            padding: '0 10 10 0',
            regex: searchReg1,
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
            columnWidth: .25,
            padding: '0 10 10 0',
            regex: searchReg1,
            regexText: 'Campo inválido',
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                blur: function(tf){
                    if(tf.getValue!="")
                        this.setValue(tf.getValue().trim());
                }
            }
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
