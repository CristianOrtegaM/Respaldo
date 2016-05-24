Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.documentAndCommunication.ContactPointSelectionTypeWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.contactpointselectiontypewindow',
	addMode : false,
	title : 'Seleccione Tipo de Punto de Contacto',
	height : 200,
	width : 250,
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
	items : [{
		xtype : 'fieldcontainer',
		defaultType : 'radiofield',
		defaults : {
			flex : 1
		},
		layout : 'vbox',
		padding : '0 0 0 10',
		items : [{
			boxLabel : 'Dirección Postal',
			name : 'tipoPuntoContacto',
			id : 'radio_direccionpostal',
			inputValue : 'direccionpostal',
			checked : true
		}, {
			boxLabel : 'Correo Electrónico',
			name : 'tipoPuntoContacto',
			id : 'radio_correoelectronico',
			inputValue : 'correoelectronico',
		}]
	}],
	}],
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

