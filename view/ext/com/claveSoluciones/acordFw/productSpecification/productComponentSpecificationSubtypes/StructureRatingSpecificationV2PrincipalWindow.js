Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.StructureRatingSpecificationV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.structureratingspecificationv2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.StructureRatingSpecificationV2FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Especificación de Rating de Estructura',
    modal: true,
    layout: 'fit',
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },
    buildItems: function() {
        return [{
            xtype: 'form',
            autoScroll: true,
            cls: 'margen-ventana',
            border: false,
            items: [{
                xtype: 'structureratingspecificationv2forminput'
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
