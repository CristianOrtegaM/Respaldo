Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2SearchWindows',{
    extend: 'Ext.window.Window',
    alias: 'widget.xtbmlvaluev2searchwindows',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2SearchWindowsGrid'],
    addMode: false,
    width: 850,
    height: 500,
    title: 'Rangos',
    modal: true,
    autoScroll: true,
    initComponent: function() {
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent(arguments);
    },
    buildItems: function() {
        return [
            {
            xtype: 'panel',
            padding : '10',
            cls: 'panelheader',
            title: 'Búsqueda',
            collapsible: true,
            collapsed: true,
            titleCollapse: true,
            anchor: '98.5%',
            listeners:{
                    resize: function(cmp){
                        cmp.up('window').updateLayout();
                        cmp.up('window').updateLayout(); 
                    }
                    },
            items: [{
                    xtype: 'form',
                    layout : 'column',
                    fieldDefaults: {
                        labelAlign: 'top',
                        labelWidth: 85,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                        xtype : 'textfield',
                        fieldLabel : 'Código',
                        name : 'codigoRango',
                        columnWidth : .5,
                        padding : '0 10 10 0'
                        },
                        {
                        xtype : 'textfield',
                        fieldLabel : 'Nombre',
                        name : 'nombreRango',
                        columnWidth : .5,
                        padding : '0 10 10 0'
                        }
                        
                    ],
            buttons:[
              {
                    text: 'Limpiar',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
              },
              {
                text: 'Buscar',
                formBind: true,
                disabled: true,
                action: 'buscarValue'
            }]
            }]
        },
        {
            xtype: 'form',
            cls: 'margen-ventana',
            border: false,
            items: [{
                xtype: 'xtbmlvaluev2searchwindowsgrid',
                columnWidth: 1,
                padding : '10',
                selType: 'checkboxmodel',
	            selModel: {
	                mode: 'MULTI'
	            },
                itemId: 'rangoGrid',
                autoScroll: true
            }]
        }];
    },
    buildButtons: function() {
        return [ {
            text: 'Aceptar',
            scope: this,
            bodyPadding: 5,
            margins: '0 17 0 0',
            action: 'seleccionaRango'
        },
        {
            text: 'Limpiar',
            scope: this,
            bodyPadding: 5,
            margins: '0 17 0 0',
            action: 'limpiaRango'
        }];
    }
});