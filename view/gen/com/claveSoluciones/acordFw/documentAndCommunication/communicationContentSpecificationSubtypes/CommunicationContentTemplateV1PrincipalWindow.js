Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.communicationcontenttemplatev1principalwindow',
    requires: ['AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Plantilla de Contenido de Comunicación',
    modal: true,
    autoScroll: true,
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
                xtype: 'communicationcontenttemplatev1forminput'
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
