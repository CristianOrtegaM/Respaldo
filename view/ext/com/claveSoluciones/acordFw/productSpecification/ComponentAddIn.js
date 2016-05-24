Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ComponentAddIn', {
	 extend: 'Ext.window.Window',
	 alias: 'widget.componentaddin',
	 title: 'Componente',
	 height: '95%',
	 width: '95%',
	 layout: 'fit',
         draggable: false,
        resizable: false,
	 items: [{
		 xtype: 'panel',	
		 layout: 'column',
		 autoScroll: true,
		 defaults: {
			columnWidth: .5,
			padding: 10
		 },
		 items: [{
	        	 xtype: 'form',
	        	 title: 'Búsqueda de Componente',
	    		 collapsible: true,
	    		 collapsed: false,
	        	 layout: 'column',
	        	 itemId: 'searchCmp',
	        	 defaults: {
	        		 columnWidth: 1,
	        		 padding: 3
	        	 },
		 		 fieldDefaults: {
	        	        labelAlign: 'top',
	        	        labelWidth: 100,
	        	        anchor: '100%'
	        	 },
	        	 items: [ 
	        	 {
	        		 xtype: 'textfield',
	        		 width: '100%',
	        		 fieldLabel: 'Código',
	        		 name: 'kindOfElementNameSpe'
	        	 },
	        	 {
	        		 xtype: 'textfield',
	        		 width: '100%',
	        		 fieldLabel: 'Nombre',
	        		 name: 'nameSpe'
	        	 }, {
	        		 xtype: 'combo',
	        		 columnWidth: .5,
	        		 fieldLabel: 'Tipo de Componente',
	        		 store: typeNameImoStoreComponent,
	        		 allowBlank: false,
                     afterLabelTextTpl: [
                         '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                     ],
	        		 name: 'typeNameImo',
	        		 valueField: 'keyImo',
	        		 displayField: 'descriptionEnu'
	        	 },
	        	 {
	        		 border: false,
	        		 columnWidth: .5,
	        		 style: {
			            left: '10px !important'
			         },
	        		 padding: '30 10 0 0',
	        		 layout: {
        		        type: 'vbox',
        		        align: 'end'
	        		 },
	        		 items:[{
	        			 border: false,
		        		 defaults: {
		        			 xtype: 'button',
		        			 width: 85,
		        			 margin: '0 5 0 5'
		        		 },
		        		 items: [{
			        		 text: 'Buscar',
			        		 action: 'searchComponent'
			        	 }, {
			        		 text: 'Limpiar',
			        		 handler: function(){
			        			 this.up('form').getForm().reset();
			        		 }
			        	 }]
	        		 }]
	        	 }
	        	 
	        	 
	        	 ],
	        	 listeners: {
	        		 collapse: function(){	        			 
	        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].up('panel').collapse();
	        		 },
	        		 expand: function(){
	        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].up('panel').expand();
	        		 }
	        	 }
	         },{
	        	 xtype: 'panel',
	        	 title: 'Opciones y Acciones',
	    		 collapsible: true,
	    		 collapsed: false,
	        	 listeners: {
	        		 collapse: function(){
	        			 Ext.ComponentQuery.query('#searchCmp')[Ext.ComponentQuery.query('#searchCmp').length-1].collapse();   
	        		 },
	        		 expand: function(){
	        			 Ext.ComponentQuery.query('#searchCmp')[Ext.ComponentQuery.query('#searchCmp').length-1].expand();
	        		 }
	        	 },
	        	 items: [{
	        		 xtype: 'form',
	        		 border: false,
	        		 itemId: 'opcAct',
		        	 layout: 'column',
		        	 defaults: {
		        		 columnWidth: 1,
		        		 //padding: 3,
		        		 style: {
		        			 background: 'transparent'
		        		 }
		        	 },
		        	 fieldDefaults: {
		        	        labelAlign: 'top',
		        	        labelWidth: 100,
		        	        anchor: '100%'
		        	 },
		        	 items: [{
		        		 xtype: 'textfield',
		        		 //width: '100%',
		        		 columnWidth: 1,
		        		 fieldLabel: 'Componente',
		        		 name: 'nameSpe',
		        		 style: {
		        			 padding: '2px !important'
		        		 },
		        		 //allowBlank: false,
		        		 readOnly: true,
		        		 //afterLabelTextTpl: [
                         //                   '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                         //               ]
		        	 }, {
		        		 xtype: 'datefield',
		        		 width: '100%',
		        		 submitFormat: 'd-m-Y H:i:s',
		        		 columnWidth: .25,
		        		 allowBlank: false,
		        		 afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
		        		 fieldLabel: 'Vigencia Inicial',
		        		 name: 'effectivePeriodStartDateTimePra',
		        		 editable: false
		        	 }, {
		        		 xtype: 'datefield',
		        		 width: '100%',
		        		 submitFormat: 'd-m-Y H:i:s',
		        		 columnWidth: .25,
		        		 fieldLabel: 'Vigencia Final',
		        		 name: 'effectivePeriodEndDateTimePra',
		        		 editable: true
		        	 }, {
		        		 xtype: 'label',
		        		 text: 'Cantidad de Componentes:',
		        		 cls: 'x-label-req',
		        		 padding: '7 5 2 5',
		        		 columnWidth: .5
//		        	 }, {
//		        		 html: '<p>&nbsp</p>',
//		        		 columnWidth: .5,
//		        		 height: 25,
//		        		 padding: 2,
//		        		 border: false
		        	 }, {
		        		 xtype: 'numericfield',
				         maxLength: 10,
		        		 emptyText: 'Mínimo',
		        		 name: 'minimumComponentCountPrc',
		        		 padding: '3 2 5 5',
		        		 columnWidth: .25,
	                     afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                         ],
		        		 allowBlank: false,
		         		 minValue: 0,
		         		 value: 1,
		        		 listeners: {
		        			focus : function(){
		        				var maxValueField = this.up('form').down('numericfield[name="maximumComponentCountPrc"]');
			        			if(maxValueField.getValue!=null && maxValueField != ""){
			        				this.setMaxValue(maxValueField.getValue());
			        			}
		        			}
		        		}
		        	 }, {
		        		 xtype: 'numericfield',
				         maxLength: 10,
		        		 emptyText: 'Máximo',
		        		 name: 'maximumComponentCountPrc',
		        		 padding: '3 5 5 2',
		        		 columnWidth: .25,
                         afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
		        		 allowBlank: false,
		         		 minValue: 0,
		         		 value: 1,
		        		 listeners: {
		        			focus : function(){        		
			        			var minValueField = this.up('form').down('numericfield[name="minimumComponentCountPrc"]');
			        			if(minValueField.getValue!=null && minValueField != ""){
			        				this.setMinValue(minValueField.getValue());
			        			}
			        		}
		        		 }
		        	 }, {
		        		 xtype: 'numericfield',
				         maxLength: 10,
		        		 fieldLabel: 'Orden de Cálculo',
		        		 emptyText: 'Ingrese Orden de Cálculo',
		        		 name: 'calculationOrderPrc',
		        		 columnWidth: .25,
		        		 minValue: 1,
	                     afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                         ],
		        		 allowBlank: false
		        	 }, {
		        		 xtype: 'numericfield',
				         maxLength: 10,
		        		 fieldLabel: 'Orden de Despliegue',
		        		 emptyText: 'Ingrese Orden de Despliegue',
		        		 name: 'displayOrderPrc',
		        		 columnWidth: .25,
		        		 minValue: 1,
	                     afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                         ],
		        		 allowBlank: false
		        	 }, {
		        		 border: false,
		        		 columnWidth: .5,
		        		 style: {
		        			left: '-1px !important',
		        			top: '7px'
		        		 },
		        		 layout: {
		        		        type: 'vbox',
		        		        align: 'end'
		        		 },
		        		 items:[{
		        			 border: false,
			        		 defaults: {
			        			 xtype: 'button',
			        			 width: 85,
			        			 margin: '25 5 0 5'
			        		 },
			        		 items: [{
				        		 text: 'Agregar',
				        		 action: 'addNewComponent'
				        	 }, {
				        		 text: 'Quitar',
				        		 action: 'removeComponent'
				        	 }]
		        		 }]
		        	 }]
	        	 }]
	         }, {
	        	 xtype: 'productspecificationv1grid',
	        	 listeners: {
	        		 itemclick: function(gridView,rec){
	        		 	 var recordForm=Ext.ComponentQuery.query('#agregar_componentes')[0].up('window').down('form').getForm().getRecord();
	        		 	 if(rec.data.specificationIdentifierSpe!==recordForm.data.specificationIdentifierSpe){
		        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].getForm().reset();
		        			 Ext.ComponentQuery.query('[action=addNewComponent]')[Ext.ComponentQuery.query('[action=addNewComponent]').length-1].setText('Agregar');
		        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].getForm().loadRecord(rec);
		        			 var recordsSel = this.up('componentaddin').down('#componentGridSelected').getStore().getRange();
		        			 var calculationOrderPrc = 1;
		        			 var displayOrderPrc = 1;
		        			 var dateIni = Ext.ComponentQuery.query('[name="marketablePeriodStartDateTimePrs"]')[Ext.ComponentQuery.query('[name="marketablePeriodStartDateTimePrs"]').length-1].getValue();
		        			 for (i in recordsSel){
		        				 if (calculationOrderPrc<=recordsSel[i].data.calculationOrderPrc){
		        					 calculationOrderPrc = recordsSel[i].data.calculationOrderPrc+1;
		        				 }
		        				 if (displayOrderPrc<=recordsSel[i].data.displayOrderPrc){
		        					 displayOrderPrc = recordsSel[i].data.displayOrderPrc+1;
		        				 }
		        			 }
		        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].down('[name="calculationOrderPrc"]').setValue(calculationOrderPrc);
		        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].down('[name="displayOrderPrc"]').setValue(displayOrderPrc);
		        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].down('[name="effectivePeriodStartDateTimePra"]').setValue(dateIni);
	        			 }else{
	        				 crearVentana(2, 'No se puede seleccionar el mismo componente que se está actualizando');
	        			 }
	        			 
	        		 },
	        		 beforerender: function(grid){
	        			 grid.removeDocked(grid.down('pagingtoolbar'));
	        			 grid.addDocked(Ext.create('Ext.PagingToolbar',{
	        		            store: this.store,
	        		            displayInfo: false,
	        		            dock: 'bottom',
	        		            pageSize: 15,
	        		            refreshText: 'Actualizar',
	        		            beforePageText: 'Página',
	        		            afterPageText: 'de {0}',
	        		            displayMsg: 'Mostrando resultados {0} - {1} de {2}'
	        		        }));
	        		 },
	        		 afterrender: function(grid){
        			 	for(var i = 0; i<grid.columns.length; i++){
				    		if (grid.columns[i].text.indexOf("Nº")==0){
				    			grid.columns[i].setText('Nº');
				    			grid.columns[i].setWidth(60);
				    		}
				    		else if (grid.columns[i].text=="Nombre"){
				    			grid.columns[i].flex=1;
				    			//grid.columns[i].setText('Nombre');
				    			//grid.columns[i].flex=1;
				    			//grid.columns[i].renderer = function(val, metadata, rec){
				    			//	var index = '';
				    			//	if(rec.get('typeNameImo')==='ProductSpecification' || rec.get('typeNameImo')==='PartyRoleInAgreementSpecification' || rec.get('typeNameImo')==='PartyRoleInRelationshipSpecification'
			            		//		|| rec.get('typeNameImo')==='ProductAttributeSpecification'){
				    			//		index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.'+rec.get('typeNameImo'));
				    			//	} else {
				    			//		index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+rec.get('typeNameImo'));
				    			//	}
				    			//	if(index!=-1) {
			            		//		titulo = typeNameImoStoreComponent.getAt(index).get('descriptionEnu');
					    		//		return val + ' - ' + titulo;
				    			//	}
				    			//	else
				    			//		return val;
				    			//};
				    		}
				    		else if (grid.columns[i].text=="Código"){
				    			grid.columns[i].setText('Tipo');
				    			grid.columns[i].setWidth(200);
				    			grid.columns[i].renderer = function(val, metadata, rec){
				    				var index = '';
				    				var tipo='';
				    				if(rec.get('typeNameImo')==='ProductSpecification' || rec.get('typeNameImo')==='PartyRoleInAgreementSpecification' || rec.get('typeNameImo')==='PartyRoleInRelationshipSpecification'
			            				|| rec.get('typeNameImo')==='ProductAttributeSpecification'){
				    					index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.'+rec.get('typeNameImo'));
				    				} else {
				    					index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+rec.get('typeNameImo'));
				    				}
				    				if(index!=-1) {
			            				tipo = typeNameImoStoreComponent.getAt(index).get('descriptionEnu');
					    				return tipo;
				    				}else{
				    					tipo=rec.get('typeNameImo');
				    					return tipo;
				    				}
				    				
				    			};
				    		}
				    		else {
				    			grid.columns[i].setVisible(false);
				    		}
        			 	}
	        		 }
	        	 }
	         }, {
	        	 xtype: 'productcompositionv2grid',
	        	 itemId: 'componentGridSelected',
	        	 store: new Ext.data.Store({
                     model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1',
                     data: [],
                     proxy: {
                         type: 'memory',
                         reader: {
                             type: 'json'
                         }
                     }
                 }),
	        	 listeners: {
	        		 itemclick: function(gridView,rec){
	        			 Ext.ComponentQuery.query('#opcAct')[ Ext.ComponentQuery.query('#opcAct').length-1].getForm().reset();
	        			 Ext.ComponentQuery.query('[action=addNewComponent]')[Ext.ComponentQuery.query('[action=addNewComponent]').length-1].setText('Editar');
	        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].getForm().loadRecord(rec);
	        			 Ext.ComponentQuery.query('#opcAct')[Ext.ComponentQuery.query('#opcAct').length-1].getForm().findField('nameSpe').setValue(rec.data.associatedProductSpecificationBasePra.nameSpe);
	        		 },
	        		 beforerender: function(grid){
	        			 /*grid.removeDocked(grid.down('pagingtoolbar'));
	        			 grid.addDocked(Ext.create('Ext.PagingToolbar',{
	        		            store: this.store,
	        		            displayInfo: false,
	        		            dock: 'bottom',
	        		            pageSize: 15,
	        		            refreshText: 'Actualizar',
	        		            beforePageText: 'Página',
	        		            afterPageText: 'de {0}',
	        		            displayMsg: 'Mostrando resultados {0} - {1} de {2}'
	        		        }));*/
	        		 }
	        	 }
	         }],
	         buttons: [{
	        	 text: 'Guardar',
	        	 action: 'saveProductComposition'
	         }, {
	        	 text: 'Cancelar',
	        	 handler: function(btn){
	        		 btn.up('window').close();
	        	 }
	         }]
         }
         ]
});