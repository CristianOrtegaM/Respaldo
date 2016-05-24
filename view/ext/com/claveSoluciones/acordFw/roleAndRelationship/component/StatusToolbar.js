Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.statustoolbar',
	cls: 'x-pagingtoolbar-top',
	border: false,
	padding: '25 0 0 0',
	/*listeners: {
		beforerender: function(){
			var rec = this.up('window').down('form').getForm().getRecord();
			if(rec==null || rec.data.statusPrs==null){
				this.down('button[action=open]').setDisabled(true);
				this.down('button[action=suspend]').setDisabled(true);
				this.down('button[action=close]').setDisabled(true);
			} else if (rec.data.statusPrs.codePss=='InDevelopment') {
				this.down('button[action=open]').setDisabled(false);
				this.down('button[action=suspend]').setDisabled(true);
				this.down('button[action=close]').setDisabled(true);
			} else if (rec.data.statusPrs.codePss=='Open') {
				this.down('button[action=open]').setDisabled(true);
				this.down('button[action=suspend]').setDisabled(false);
				this.down('button[action=close]').setDisabled(false);
			} else if (rec.data.statusPrs.codePss=='Suspended') {
				this.down('button[action=open]').setDisabled(false);
				this.down('button[action=suspend]').setDisabled(true);
				this.down('button[action=close]').setDisabled(false);
			} else if (rec.data.statusPrs.codePss=='Closed') {
				this.down('button[action=open]').setDisabled(true);
				this.down('button[action=suspend]').setDisabled(true);
				this.down('button[action=close]').setDisabled(true);
			}
		}
	},*/
    initComponent: function() {
        this.items = [
        '->', {
        xtype: 'segmentedbutton',
        items: [
         {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Activar',
        	value: 'Active',
        	action: 'abrir',
        	width: 100
        }, {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Cerrar',
        	value: 'Closed',
        	action: 'cerrar',
        	width: 100
        }, {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Liquidar',
        	value: 'ForcedLiquidation',
        	action: 'liquidar',
        	width: 100
        }]
        }];
        this.callParent(arguments);
    }
});