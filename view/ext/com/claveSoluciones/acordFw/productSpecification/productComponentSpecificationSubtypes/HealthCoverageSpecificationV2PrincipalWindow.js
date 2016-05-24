Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.HealthCoverageSpecificationV2PrincipalWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.healthcoveragespecificationv2principalwindow',
    requires: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.HealthCoverageSpecificationV2FormInput'],
    addMode: false,
    width: '80%',
    height: '90%',
    title: 'Especificación de Cobertura de Salud',
    modal: true,
    layout: 'fit',
    draggable: false,
    resizable: false,
    listeners: {
        show: function(cmp){
        	if(cmp.down('textareafield')!==null && cmp.down('textareafield')!==undefined){
	        	var oldValue=cmp.down('textareafield').getValue();
	            cmp.down('textareafield').setValue(cmp.down('textareafield').getValue()+'\n');
	            cmp.down('textareafield').setValue(oldValue);
            }
        }
    },
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
                xtype: 'healthcoveragespecificationv2forminput'
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
