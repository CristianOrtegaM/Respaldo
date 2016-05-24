Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.ruleapplicabilityv1formsearch',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Ruta',
            emptyText: 'Ingrese Ruta',
            name: 'componentPathCodeRua',
            columnWidth: .5,
            padding: '0 10 10 0',
            maxLength: 255,
            enforceMaxLength: true
            
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
