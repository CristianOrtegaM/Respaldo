Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV1SelectionTypeWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.registryv1selectiontypewindow_ext',
	addMode : false,
	title : 'Seleccione el Tipo de Parte',
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
	items : [{
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
			boxLabel : 'Empresa',
			name : 'tipoParte',
			inputValue : 'empresa',
			id : 'radio_empresa',
			checked : true
		}, {
			boxLabel : 'Organismo de Gobierno',
			name : 'tipoParte',
			id : 'radio_gobierno',
			inputValue : 'gobierno',
		}]
	}, {
		xtype : 'textfield',
		fieldLabel : 'Rut',
		name : 'rut',
		padding : '0 0 0 10',
		maxLength : 10,
		maskRe : /[0-9kK-]/,
		listeners : {
			change : function() {
				var sRut = this.getValue();
				var sRutFormateado = '';
				var strRut = sRut;
				var sDV = '';
				while (strRut.indexOf(".") != -1) {
					strRut = strRut.replace(".", "");
				}
				while (strRut.indexOf("-") != -1) {
					strRut = strRut.replace("-", "");
				}
				sRut = strRut;
				if (this.isValid()) {
					sDV = sRut.charAt(sRut.length - 1);
					sRut = sRut.substring(0, sRut.length - 1);
				}
				sRutFormateado = sRut + sRutFormateado;
				if (sRutFormateado != "" && this.isValid()) {
					sRutFormateado += "-" + sDV;
				} else if (this.isValid()) {
					sRutFormateado += sDV;
				}

				this.setValue(sRutFormateado.toUpperCase());
			}
		}
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
