Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV2CopyFormInput',{
	extend : 'Ext.window.Window',
	alias : 'widget.xtbmltablev2copyforminput',
	width : 450,
	height : 135,
	modal : true,
	autoScroll : false,
	resizable : false,
	border : false,
	initComponent : function() {
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent(arguments);
	}, 
	bodyPadding: '20 10',
	
	buildItems : function() {
			
			return [ {
				xtype : 'form',
				cls : 'margen-ventana',
				layout : 'column',
				border : false,
				defaults : {
					columnWidth : 1,
					padding : '20 10',
					labelAlign: 'left'
				},
				items : [{
					xtype : 'textfield',
					name : 'tableNameXtt',
//					regex : descRegex,
					fieldLabel : 'Nombre Tabla',
					allowBlank : false,
					listeners : {
						blur : function(tf){
							if(tf.getValue!="")
								this.setValue(tf.getValue().trim());
						}
					}
				}]
			}];
		},	
	buildButtons : function() {
		return [ {
			text : 'Guardar',
			scope : this,
			bodyPadding : 5,
			action : 'copyTable',
			width : 75,
			margins : '0 17 0 0'
		}, {
			text : 'Cancelar',
			scope : this,
			bodyPadding : 5,
			margins : '0 17 0 0',
			width : 75,
			handler : this.close
		} ];
	}
});