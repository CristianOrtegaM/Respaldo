Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.SelectPeriodV1', {
	extend : 'Ext.window.Window',
	alias : 'widget.selectperiodv1_ext',
	addMode : false,
	title : 'Seleccione Año',
	height : 140,
	width : 300,
	modal : true,
        autoScroll: true,
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
			
	   items : [ 
					{
				        xtype: 'numberfield',
					    fieldLabel: 'Año',
					    name: 'year',
					    allowBlank: false,
					    afterLabelTextTpl: [
					        '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
					    ],
					    hidden: false,
				        maxValue: 2050,
				        minValue: 1990
					},                           
       
            ]
			
	}
	],
	
	buildButtons : function() {
		return [{
			text : 'Aceptar',
			scope : this,
			margins : '0 17 0 0',
			action : 'create'
		}, {
			text : 'Cancelar',
			scope : this,
			margins : '0 17 0 0',
			handler : this.close
		}];
	}
});
