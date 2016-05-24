Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.xtbmltablev2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Tabla',
    modal: true,
    overflowY: 'auto',
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
        /**this.body.on('scroll', function() {  
        	this.data = this.getScrollY( );
        	
        });**/
    },
    buildItems: function() {
        return [{
            xtype: 'form',
            cls: 'margen-ventana',
            border: false,
            items: [{
            	width: '95%',
                xtype: 'xtbmltablev2forminput'
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
