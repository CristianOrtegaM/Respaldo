Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAddIn', {
	 extend: 'Ext.panel.Panel',
	 alias: 'widget.formspecificationaddin',
	 layout: 'column',
	 border: false,
	 defaults: {
		columnWidth: 1
	 },
	 padding: 10,
	 listeners:{
	 	afterrender: function(cmp){
	 		cmp.up('fieldset').collapsible = true;
	 		cmp.up('fieldset').collapsed = false;
	 		cmp.up('fieldset').setTitle('Componentes');
	 	}
	 },
	 items: [
	         {
	        	 xtype: 'panel',
	        	 border: false,
	        	 layout: 'column',
        		 defaults: {
                    	margin: 5,
                    	columnWidth: .3333 
                 },	                    
                items: [{
                    text: 'Administrar Componentes',
                    itemId: 'agregar_componentes',
                    xtype: 'button',
                    icon: 'extjs/build/packages/ext-theme-crisp/build/resources/images/config.png',
                    scale: 'medium',
                    handler: function(btn){
                    	var win = Ext.widget('componentaddin');
                    	var store = win.down('productcompositionv2grid').getStore();
                    	store.removeAll();
                    	var associations = btn.up('window').down('form').getForm().getRecord().data.originatingProductAssociationPsb;
                    	for(var i = 0; i<associations.length; i++)
                    	if(associations[i].typeNameImo=='ProductComposition')
                    		store.loadRawData(associations[i], true);
                    	//win.down('button[action=searchComponent]').fireEvent('click', win.down('button[action=searchComponent]'));
                    	win.show();
                    }
                }, {
                    xtype: 'button',
                    icon: 'extjs/build/packages/ext-theme-crisp/build/resources/images/config.png',
                    text: 'Administrar Conflictos',
                    scale: 'medium',
                    itemId: 'conflictButton',
		 			action: 'newConflictRequisite'
                }, {
                	xtype: 'button',
                    icon: 'extjs/build/packages/ext-theme-crisp/build/resources/images/config.png',
                    text: 'Administrar Requisitos',
                    scale: 'medium',
                    itemId: 'requisiteButton',
		 			action: 'newConflictRequisite'
                }]
	         }, {
		 			xtype: 'tabpanel',
            itemId: 'allSummaryComponents',
		 			columnWidth: 1,
		 			items: [{
		 				title: 'Resumen de Componentes',
                    ItemId: 'allElementSumary',
		 				border: false,
              //      activeTab: 0, 
		 				items: [{
		 					xtype: 'tabpanel',
		 					itemId: 'summaryComponents',
		 					listeners: {
		 		 				afterrender: function(tp){
                                    
	 			 					for(var i = tp.query('tab').length; i>=0; --i){
	 			 						this.setActiveTab(tp.query('tab')[i]);
	 			 					}
		 		 				},
		 		 				tabchange: function(tabPanel, newCard, oldCard){
	 			 					newCard.down('grid').getView().refresh();
		 		 				},	 		 				 
		 					}
		 				}]

		 			}, {
		 				title: 'Resumen de Conflictos (0)',
		 				itemId: 'summaryConflicts',
		 				border: false,
		 				items: []
		 			}, {
		 				title: 'Resumen de Requisitos (0)',
		 				itemId: 'summaryRequisites',
		 				border: false,
		 				items: []
		 			}]
		 		}, {
		 			border: false,
	        		columnWidth: 1,
	        		padding: '15 0 0 10',
	        		layout: {
	        			type: 'vbox',
	        		    align: 'end'
		        	},
	        		items: [{
	        			xtype: 'button',
	 		 			width: 150,
	 		 			disabled: true,
	 	        		text: 'Estructura Componente',
	 	        		action: 'downloadStructure'
	        		}] 			
		 		}
	         ]
});