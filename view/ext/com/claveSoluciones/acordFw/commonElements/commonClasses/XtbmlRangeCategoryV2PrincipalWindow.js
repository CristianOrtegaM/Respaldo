Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeCategoryV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.xtbmlrangecategoryv2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeCategoryV2FormInput'],
    addMode: false,
    width: '30%',
    height: '25%',
    title: 'Selección de Categoría',
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent(arguments);
    },
    buildItems: function() {
        return [{
            xtype: 'form',
            cls: 'margen-ventana',
            border: false,
            items: [{
                xtype: 'xtbmlrangecategoryv2forminput'
            }]
        }];
    },
    buildButtons: function() {
        return [ {
            text: 'Aceptar',
            scope: this,
            bodyPadding: 5,
            margins: '0 17 0 0',
            action: 'createRangeByCategory'
        },
        {
            text: 'Cancelar',
            scope: this,
            bodyPadding: 5,
            margins: '0 17 0 0',
            handler: this.close
        }];
    }
});
