Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1Validation'
            ],

    init: function() {
        this.control({
            'externalcodev1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'externalcodev1grid_ext button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'externalcodev1principalwindow_ext button[action=create]': {
                click: this.create
            },
            'externalcodev1grid_ext button[action=delete]': {
                click: this.deleteElement
            },
            'externalcodev1grid_ext button[action=edit]': {
                click: this.edit
            },
            'externalcodev1principalwindow_ext button[action=update]': {
                click: this.update
            },
            'externalcodev1grid_ext button[action=mostrarWindows]': {
                click: this.mostrarWindows
            }
        });
    },

	 mostrarWindows: function(btn) {
        btn.setDisabled(true);
        var ventana = Ext.widget('externalcodev1principalwindow_ext');
        ventana.show();
        btn.setDisabled(false);
    },
    
    edit: function (btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('externalcodev1principalwindow_ext');
            window.setTitle('Código Externo Nº ' + seleccion[0].get('externalCodeIdentifierExc'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('combo[name="externalCodeListExc"]').setReadOnly(true);
            window.down('combo[name="externalCodeListExc"]').setHideTrigger(true);
           	window.down('textfield[name="externalCodeExc"]').setReadOnly(true);
            window.down('combo[name="languageExternalCodeExc"]').setReadOnly(true);
            window.down('combo[name="languageExternalCodeExc"]').setHideTrigger(true);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

});
