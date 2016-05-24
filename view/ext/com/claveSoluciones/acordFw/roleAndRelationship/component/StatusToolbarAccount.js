Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.StatusToolbarAccount', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.statustoolbaraccount',
	cls: 'x-pagingtoolbar-top',
	border: false,
	padding: '25 0 0 0',
	listeners: {
		beforerender: function(){
			var rec = this.up('window').down('form').getForm().getRecord();
			if(rec==null || rec.data.statusCur==null){
				this.down('button[action=prospectar]').setDisabled(true);
				this.down('button[action=activar]').setDisabled(true);
				this.down('button[action=inactivar]').setDisabled(true);
				this.down('button[action=descartar]').setDisabled(true);
			} else if (rec.data.statusCur.codeCrs=='Prospect') {
				this.down('button[action=prospectar]').setDisabled(true);
				this.down('button[action=activar]').setDisabled(false);
				this.down('button[action=inactivar]').setDisabled(true);
				this.down('button[action=descartar]').setDisabled(false);
			} else if (rec.data.statusCur.codeCrs=='Active') {
				this.down('button[action=prospectar]').setDisabled(true);
				this.down('button[action=activar]').setDisabled(true);
				this.down('button[action=inactivar]').setDisabled(false);
				this.down('button[action=descartar]').setDisabled(true);
			} else if (rec.data.statusCur.codeCrs=='Former') {
				this.down('button[action=prospectar]').setDisabled(false);
				this.down('button[action=activar]').setDisabled(true);
				this.down('button[action=inactivar]').setDisabled(true);
				this.down('button[action=descartar]').setDisabled(true);
			} else if (rec.data.statusCur.codeCrs=='Disqualified') {
				this.down('button[action=prospectar]').setDisabled(true);
				this.down('button[action=activar]').setDisabled(true);
				this.down('button[action=inactivar]').setDisabled(true);
				this.down('button[action=descartar]').setDisabled(true);
			} 
		}
	},
    initComponent: function() {
        this.items = [
        '->', {
        xtype: 'segmentedbutton',
        items: [
        {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Prospectar',
        	action: 'prospectar',
        	width: 100
        },
         {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Activar',
        	action: 'activar',
        	width: 100
        }, {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Inactivar',
        	action: 'inactivar',
        	width: 100
        }, {
        	xtype: 'button',
        	cls: 'x-btn-b',
        	text: 'Descartar',
        	action: 'descartar',
        	width: 100
        }]
        }];
        this.callParent(arguments);
    }
});