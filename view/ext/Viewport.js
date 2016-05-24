Ext.define('AFW_FND_Xjs.view.ext.Viewport',{
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	alias : 'widget.viewportview',
	initComponent : function() {
		
		this.items = {
//			autoScroll: true, 
			layout: 'border',
			dockedItems : [ {
				region : 'north',
				itemId : 'mainToolbar',
				xtype : 'toolbar',
				anchorToTarget : true,
				border : true,
				height : 58,
				items : [{
					xtype : 'box',
					width : 300
				},{
					xtype : 'box',
					itemId : 'titulo',
					cls : 'nameTitle',
					html : '<div style="color:white;font-size:2em;opacity:0.9;text-align:center;">Fundaciones</div>',
					flex : 5,
					style : 'line-height: 27px;'
				}, {
					xtype : 'box',
					html : '<div style="margin-right:0px;margin-left:auto;position:relative;"></div>',
					flex : 0.6
				},{ 
					xtype : 'container',
					flex : 1,
					items : [{
						xtype : 'box',
						style :'color: #fff',
                                                html: '<h7>' + usuario.get('givenName') + ' ' + usuario.get('sn') + '</h7>'
					}, {
						xtype : 'label',
						style :'color: #fff',
						listeners : {
							render : function(){
	                            Ext.TaskManager.start({
                                    run : function() {
                                        this.setText(Ext.Date.format(new Date(),'d/m/Y H:i:s'));
                                    },
                                    interval : 1000,
	                                scope:this
	                            });
							}
						}
					}]
				}]
			} ],
			items : [{
				xtype : 'panel',
				region : 'center',
				border : false,
                layout: 'fit',
				itemId : 'panelprincipal',
            	defaults: {
					overflowY: 'auto'
				},
				items : [
				         ]
			},  {
	            region: 'west',
	            stateId: 'navigation-panel',
	            itemId: 'west-panel',
	            title: 'Menú',
	            split: true,
	            width: 230,
	            minWidth: 175,
	            maxWidth: 400,
	            collapsible: true,
	            animCollapse: true,
	            collapsed : false,
	            margins: '0 0 0 0',
	            layout: 'accordion',
	            items: mainmenu
	            
	        } ]
	
			};
		//Contador de actividad se reinicia con cada click, ingreso por teclado o antes de un request
		Ext.getBody().on('click', recordFn);
		Ext.getBody().on('keypress', recordFn);
		Ext.Ajax.on('beforerequest', recordFn);
	
	this.callParent();
}
});
// prueba cosorio
