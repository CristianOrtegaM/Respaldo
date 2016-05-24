Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.xtbmldimensionv2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Dimensión de Tabla',
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },
    buildItems: function() {
        return [{
            xtype: 'form',
            cls: 'margen-ventana',
            border: false,
            items: [{
                xtype: 'xtbmldimensionv2forminput'
            }]
        }];
    }
});
