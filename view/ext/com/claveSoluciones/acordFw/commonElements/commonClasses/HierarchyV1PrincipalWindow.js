Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.HierarchyV1PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.hierarchyv1principalwindow_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.HierarchyV1FormInput'],
    addMode: false,
    width: '80%',
    height: '60%',
    title: 'Jerarquía',
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
                xtype: 'hierarchyv1forminput_ext'
            }]
        }];
    },
    buildButtons: function() {
        return [ {
            text: 'Guardar',
            scope: this,
            bodyPadding: 5,
            margins: '0 17 0 0',
            action: 'create'
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
