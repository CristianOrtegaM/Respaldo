Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.registryv1principalwindow_ext',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1FormInput'],
    addMode: false,
    width: '80%',
    height: 690,
    title: 'Especificación de Libro de Registro - Empresa',
    modal: true,
    draggable: false,
    resizable: false,
	layout: 'fit',
	shadow: false,
	closable: true,
	listeners : {
		beforeclose: function( window ) {
            this.getEl().slideOut('r', 
	            	{ duration: 500, 
	            		listeners : {
	                		afteranimate: function(){
	               		 	window.destroy();
	               		 }
	            		}
	            	}
            	);
            return false;
        }
   },
	
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
			autoScroll: true,
			shadow: true,
            items: [{
                xtype: 'registryv1forminput_ext'
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
            handler: function(){
            	this.close();
            	
            }
        }];
    }
});
