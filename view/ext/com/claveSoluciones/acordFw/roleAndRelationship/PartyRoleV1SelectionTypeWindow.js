Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1SelectionTypeWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.partyrolev1selectiontypewindow_ext',
	addMode : false,
	title : 'Ingrese el Código de Rol de Usuario',
	height : 150,
	width : 400,
	modal : true,
	autoScroll : true,
	autoShow : true,
        draggable: false,
    resizable: false,
	initComponent : function() {
		this.buttons = this.buildButtons();
		this.callParent(arguments);
	},
	
	items : [
	{
		border: false,
		padding: 10,
		layout: 'column',
		defaults: {
			columnWidth: 1
			},
			
	   items : [ {
		xtype : 'textfield',
		fieldLabel : 'Código de Rol de Usuario',
		labelWidth: 180,
		allowBlank: false,
		name : 'rol',
		padding : '0 0 0 10',
        vtype: 'alphanum'
		
	   }]
			
	}
	],
	
	buildButtons : function() {
		return [{
			text : 'Aceptar',
			scope : this,
			margins : '0 17 0 0',
			action : 'aceptar'
		}, {
			text : 'Cancelar',
			scope : this,
			margins : '0 17 0 0',
			handler : this.close
		}];
	}
});
