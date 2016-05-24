Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableInputV2FormInput',
{
			extend : 'Ext.form.FormPanel',
			alias : 'widget.xtbmltableinputv2forminput',
			fieldDefaults: {
		        labelAlign: 'top',
		        style: 'font-size: 14px'
		    },
		    border: false,
		    initComponent: function() {
		        this.items = [{
		            layout: 'column',
		            xtype: 'panel',
		            border: false,
		            items: [{
		                layout: 'column',
		                xtype: 'panel',
		                height: '100%',
		                border: false,
		                columnWidth: 1,
		                defaults: {
		                    anchor: '100%',
		                    columnWidth: 1
		                },
		                padding: '10',
		                items: [
		                {
		                    xtype:'fieldset',
		                    title: 'Especificación',
		                    collapsible: true,
		                    hidden: false,
		                    columnWidth: 1,
		                    layout: 'column',
		                    defaults: {
		                        anchor: '100%',
		                        columnWidth: .25
		                    },
		                    items:[
		                           {
		                               xtype : 'combo',
		                               fieldLabel : 'Período Desde',
		                               id : 'periodstartid',
		                               name : 'periodstart',
		                               editable: false,
		                               allowBlank: false,
		                               columnWidth: 1,
		                               afterLabelTextTpl: [
		                                   '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
		                               ],
		                               padding: '0 10 10 0',
		                               valueField: 'periodIdentifierPer',
		                               displayField: 'namePer',
		                               store: new Ext.data.Store(
		                           	  {
		                                      model :'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1',
		                                      remoteSort: true,
		                                      autoLoad: false,
		                                      sorters : [{
		                                           property: 'periodCodePer',
		                                           direction: 'DESC'
		                                      }],
		                                      proxy: {
		                                          type: 'rest',
		                                          url: urlService + 'periodService/findByFilterAll',
		                                          actionMethods: {
		                                              read: 'POST'
		                                          },
		                                          extraParams:{
		                                               filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
		                                                   nombreCampo: 'periodStatusPer<>codePes',
		                                                   valor: 'Opened',
		                                                   operacion: '=',
		                                                   tipoValor: 'enum',
		                                                   enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.PeriodStatusTypeCodeList'
		                                               }).data])
		                                           },
		                                          reader: {
		                                              rootProperty: 'datos',
		                                              successProperty: 'valido',
		                                              totalProperty: 'totalRegistros'
		                                          }
		                                      }
		                                    }
		                              ),
		                              listeners: {
		                                  select: function(cmp){
		                                       //cmp.up('panel').fireEvent('loadPanel', cmp.up('panel'),cmp);
		                                  }
		                              }
		                                  
		               	   },
		                          {
		                               xtype : 'combo',
		                               fieldLabel : 'Período Hasta',
		                               id : 'periodendid',
		                               name : 'periodend',
		                               editable: false,
		                               allowBlank: false,
		                               columnWidth: 1,
		                               afterLabelTextTpl: [
		                                   '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
		                               ],
		                               padding: '0 10 10 0',
		                               valueField: 'periodIdentifierPer',
		                               displayField: 'namePer',
		                               store: new Ext.data.Store(
		                           	  {
		                                      model :'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1',
		                                      remoteSort: true,
		                                      autoLoad: false,
		                                      sorters : [{
		                                           property: 'periodCodePer',
		                                           direction: 'DESC'
		                                      }],
		                                      proxy: {
		                                          type: 'rest',
		                                          url: urlService + 'periodService/findByFilterAll',
		                                          actionMethods: {
		                                              read: 'POST'
		                                          },
		                                          extraParams:{
		                                          filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
		                                                   nombreCampo: 'periodStatusPer<>codePes',
		                                                   valor: 'Opened',
		                                                   operacion: '=',
		                                                   tipoValor: 'enum',
		                                                   enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.PeriodStatusTypeCodeList'
		                                               }).data])
		                                           },
		                                          
		                                          reader: {
		                                              rootProperty: 'datos',
		                                              successProperty: 'valido',
		                                              totalProperty: 'totalRegistros'
		                                          }
		                                      }
		                                    }
		                              ),
		                              listeners: {
		                                  select: function(cmp){
		                                       //cmp.up('panel').fireEvent('loadPanel', cmp.up('panel'),cmp);
		                                  }
		                              }
		                                  
		               	   },
		                    
		                    ]
		                }
		                ]
		            }]
		        }];
		        this.callParent(arguments);
		    }
			
				
			
			
			
});
