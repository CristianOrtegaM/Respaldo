Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.CategoryAddIn', {
	extend: 'Ext.form.FormPanel',
	alias: 'widget.categoryaddin',
	requires: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1',
    defaults: {
//        border: false
    },
    loadMask: true,
    autoScroll: true,
    disabled: true,
    border: false,
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    padding: 10,
    listeners: {
    	enable: function(){
    		//this.down('tabpanel').setDisabled(false);
    		/**
    		 * Llamada búsqueda de CategoryMembership para elemento cargado en formulario
    		 * */
    	}
    },
    initComponent : function() {
    	 this.items= [{  
    		 xtype: 'categorymembershipv1grid',
             selType: 'checkboxmodel',
             selModel: {
                 checkOnly: false,
                 injectCheckbox: 0,
                 mode: 'SINGLE',
                 allowDeselect: true,
                 showHeaderCheckbox: false
             },
             store: new Ext.data.Store({
                 model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1',
        	    remoteSort: true,
        	    remoteFilter: true,
        	    simpleSortMode: true,
        	    simpleGroupMode: true,
        	    pageSize: 15,
        	    autoLoad: false,
        	    sorters: [{
        	        property: 'categoryMembershipIdentifierCam',
        	        direction: 'DESC'
        	    }],
        	    proxy:  {
        	        type: 'rest',
        	        url: urlService + 'categoryMembershipService/findByFilter',
        	        actionMethods:  {
        	            read: 'POST'
        	        },
        	        extraParams:{
        	            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
        	                nombreCampo: 'class',
        	                valor: 'CategoryMembership',
        	                valores: null,
        	                operacion: '=',
        	                tipoValor: 'string'
        	            }).data])
        	        },
        	        reader: {
        	            type: 'json',
        	            rootProperty: 'datos',
        	            successProperty: 'valido',
        	            totalProperty: 'totalRegistros'
        	        }
        	    }
             }),
             listeners: {
            	 afterrender: function(grid){
            		 AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryMembershipV1');
            		 var record = grid.up('window').down('form').getForm().getRecord();
            		 if(record!=null && record != undefined){
	            		 var filtro = [Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
		     	                nombreCampo: 'class',
		    	                valor: 'CategoryMembership',
		    	                valores: null,
		    	                operacion: '=',
		    	                tipoValor: 'string'
		    	            }).data];
			            var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
			                nombreCampo: 'categorizedIdentifierCam',
			                valor: record.data.specificationIdentifierSpe,
			                operacion: '=',
			                tipoValor: 'int'
			            });
			            filtro.push(specificationIdentifierSpe.data);
			            var specificationTypeNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
			                nombreCampo: 'categorizedTypeNameCam',
			                valor: record.data.typeNameImo,
			                operacion: '=',
			                tipoValor: 'string'
			            });
			            filtro.push(specificationTypeNameSpe.data);
			            var categoryMembershipStore = grid.getStore();
			            categoryMembershipStore.pageSize=15;
			            categoryMembershipStore.getProxy().setExtraParam('filters', Ext.encode(filtro));
			            categoryMembershipStore.currentPage=1;
			            categoryMembershipStore.load();
            		 }
            		 
            		 grid.columns[0].setVisible(false);
            		 grid.columns[1].setVisible(false);
            		 var column3 = Ext.create('Ext.grid.column.Column',{
            			 header: 'Categoría',
                         dataIndex: 'categorizingCategoryCam',
                         sortable: true,
                         align: 'left',
                         hidden: false,
                         width: 240,
                         renderer: function(val){
                        	 return val.categoryNameCat;
                         }
            		 });
	                 grid.headerCt.insert(grid.columns.length,column3);
	                 var column2 = Ext.create('Ext.grid.column.Column',{
            			 header: 'Esquema de Categoría',
                         dataIndex: 'categorizingCategoryCam',
                         sortable: true,
                         align: 'left',
                         hidden: false,
                         width: 240,
                         renderer: function(val){
                        	 return val.isSubcategoryOfCat != null ? val.isSubcategoryOfCat.categorySchemeNameCas : '';//val.isSubcategoryOfCat.categorySchemeNameCas;
                         }
            		 });
	                 grid.headerCt.insert(grid.columns.length,column2);
	                 var column = Ext.create('Ext.grid.column.Column',{ 
            			 header: 'N°',
                         dataIndex: 'categoryMembershipIdentifierCam',
                         sortable: true,
                         align: 'right',
                         hidden: false,
                         width: 120
            		 });
            		 grid.headerCt.insert(grid.columns.length,column);
	                 grid.getView().refresh();
            		 grid.down('pagingtoolbar').add({xtype: 'tbfill'});
            		 grid.down('pagingtoolbar').add({
            			 xtype: 'button',
            			 text: 'Nuevo',
            			 action: 'newCategoryMembership'
            		 });
            		 grid.down('pagingtoolbar').add({
            			 xtype: 'button',
            			 text: 'Editar',
            			 action: 'editCategoryMembership'
            		 });
            		 grid.down('pagingtoolbar').add({
            			 xtype: 'button',
            			 text: 'Borrar',
            			 action: 'delete'
            		 });
            	 }
             }
    	 }];
    	 this.callParent(arguments);
    }
});