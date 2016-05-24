Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ConflictRequisiteForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.conflictrequisiteform',
	addMode: false,
    width: 600,
    height: 400,
    title: 'Restricción y Requisitos',
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = [];
        this.buttons = [{
        	text: 'Guardar',
        	action: 'saveConflictRequisite'
        },{
        	text: 'Cancelar',
        	handler: function(){
        		this.up('window').close();
        	}
        }];
        this.callParent(arguments);
    }
});