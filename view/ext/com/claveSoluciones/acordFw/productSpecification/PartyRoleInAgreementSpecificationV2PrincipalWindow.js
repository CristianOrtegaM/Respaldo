Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.partyroleinagreementspecificationv2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV2FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Especificación de Rol de Contrato',
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
                xtype: 'partyroleinagreementspecificationv2forminput'
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
