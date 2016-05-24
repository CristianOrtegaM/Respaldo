Ext.define('AFW_FND_Xjs.view.ext.LoginScreen',{
	extend : 'Ext.window.Window',
	requires : ['AFW_FND_Xjs.view.ext.Viewport'],
	alias : 'widget.loginscreen',
	width : 350,
	height : 218,
	modal : true,
	autoScroll : true,
	border : false,
	resizable : false,
	closable : false,
        draggable: false,
	title : 'Login',
	initComponent : function() {
		this.items = this.buildItems();
		this.buttons = this.buildButtons();     
		this.callParent(arguments);
	},
	listeners: {
		render: function(){
			setTimeout(function() {
                Ext.get('loading').remove();
                Ext.get('loading-mask').fadeOut({remove: true});
            }, 500);
		}
	},
	buildItems : function() {
		return [ {
			xtype : 'form',
			cls : 'margen-ventana',
			itemId : 'formLogin',
			layout : 'column',
			border : false,
			height : 130,
			defaults : {
				columnWidth : 1,
				padding : 10,
				labelAlign: 'top'
			},
			items : [  {
				xtype : 'textfield',
				fieldLabel : 'Usuario',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
				],
				name : 'usuario',
				regex : /^[a-zA-Z0-9._]+$/,
				maskRe: /[a-zA-Z0-9._]/,
				allowBlank : false,
				itemId : 'userLogin',
				listeners : {
					blur : function(tf){
						if(tf.getValue!="")
							this.setValue(tf.getValue().trim());
					}
				}
			}, {
				xtype : 'textfield',
				fieldLabel : 'Contraseña',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
				],
				name : 'password',
				allowBlank : false,
				itemId : 'passLogin',
				inputType : 'password'
			}]
		} ];
	},
	
	buildButtons : function() {
		return [ {
			text : 'Aceptar',
			scope : this,
			itemId : 'enterLoginScreen',
			bodyPadding : 5,
			width : 80,
			action : 'login',
			margins : '0 0 0 0'
		}];
	}
});
