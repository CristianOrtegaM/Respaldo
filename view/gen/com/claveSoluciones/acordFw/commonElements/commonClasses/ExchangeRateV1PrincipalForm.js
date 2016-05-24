Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1PrincipalForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.exchangeratev1principalform',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1FormSearch',
               'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Grid'],
    title: 'Tasa de Cambio',
    border: false,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 85,
        msgTarget: 'side'
    },
    items: [{
        xtype: 'panel',
        anchor: '98.5%',
        x: 10,
        cls: 'panelheader',
        title: 'Búsqueda',
        collapsible: true,
        collapsed: true,
        titleCollapse: true,
        listeners:{
            expand: function(cmp) {
                cmp.updateLayout();
            }
        },
        items: [{
            xtype: 'exchangeratev1formsearch'
        }]
    },
    {
        xtype: 'panel',
        padding: '10 10 10 10',
        border: false,
        height: 'auto',
        flex: 1,
        items: [{
            xtype: 'exchangeratev1grid',
            selType: 'checkboxmodel',
            selModel: {
                checkOnly: false,
                injectCheckbox: 0,
                mode: 'SINGLE',
                allowDeselect: true,
                showHeaderCheckbox: false
            }
        }]
    }]
});
