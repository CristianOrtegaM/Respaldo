Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1'],

    models: ['AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1',
             'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1PrincipalForm',
             //'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1FormSearch',
             //'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.SelectPeriodV1'
             //'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation'
            ],

    init: function() {
        this.control({
        	'periodv1grid_ext button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'periodv1grid_ext button[action=abrirProceso]': {
                click: this.abrirProceso
            },
            'periodv1grid_ext button[action=cerrarProceso]': {
                click: this.cerrarProceso
            },
            'periodv1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'selectperiodv1_ext button[action=create]': {
                click: this.createPeriods
            },
            
        });
    },
    
    createPeriods: function(btn){
    	    var me=this;
  	  	    var window= btn.up('window');
        	var year=window.down('numberfield[name="year"]').value;
        	var minValue=window.down('numberfield[name="year"]').minValue;
        	var maxValue=window.down('numberfield[name="year"]').maxValue;
        	if(year!=null && year!='' && minValue<=year && year<=maxValue){
	    	var store=Ext.create('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1',{});
	        
            var filtro = filterCreation('Period');
	        periodCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
	            nombreCampo: 'periodCodePer',
	            valor: parseInt(year+"01"),
	            valores: null,
	            operacion: '=',
	            tipoValor: 'int'
	        });
	        filtro.push(periodCodePer.data);
	        store.pageSize=15;
	        if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
	        store.currentPage=1;
	        store.load(
	        		{
	     	            callback: function (record, operation) {
	     	                if (record.length>0) {
	     	                      crearVentana (5, "Ya se encuentran ingresado los períodos para el año seleccionado");
	     	                } else {
	     	                	  var status=[];
		     	             	  var period=[];
		     	             	  var fullYear=year;
		     	             	  for(var i=0;i<12; ++i){
		     	             		  var periodStatusV1= Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1', {});
		     	           	    	
		     	           	    	  periodStatusV1.set({
		     	           	            creationUserImo: usuario.get('userName'),
		     	           	            creationDateTimeImo: new Date(),
		     	           	            updateUserImo: usuario.get('userName'),
		     	           	            updateDateTimeImo: new Date(),
		     	           	            codePes: 'New'
		     	           	         });
		     	           	    	
		     	           	    	 periodStatusV1.save ({
		     	         	            callback: function (record, operation) {
		     	         	                if (operation.success === true) {
		     	         	                    var respuesta = Ext.decode(operation._response.responseText);
		     	         	                    if (respuesta.valido === true) {
		     	         	                    	 status.push(operation._resultSet.records[0].data);
		     	         	                    	 if(status.length==12){
		     	          	                    	 	 for(var j=0;j<12; ++j){
		     	          	                    	 		var firstDay = new Date(fullYear, j, 1);
		     	     	     	                   		  	var lastDay = new Date(fullYear, j + 1, 0);
		     	     		     	                   		var periodV1 = Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1', {});
		     	     		     	                       
		     	     		     	                   		periodV1.set({
		     	     			     	                       	   periodIdentifierPer: null,
		     	     			     	                           creationUserImo: usuario.get('userName'),
		     	     			     	                           creationDateTimeImo: new Date(),
		     	     			     	                           updateUserImo: usuario.get('userName'),
		     	     			     	                           updateDateTimeImo: new Date(),
		     	     			     	                           periodStartDatePer: firstDay,
		     	     			     	                           periodEndDatePer: lastDay,
		     	     			     	                           periodStatusPer: status[j]
		     	     		     	                        });
		     	     		     	                   		
		     	     			     	                   	periodV1.save ({
		     	     	        	                            callback: function (record, operation) {
		     	     	        	                            	if (operation.success === true) {
		     	     	        	                                    var respuesta = Ext.decode(operation._response.responseText);
		     	     	        	                                    if (respuesta.valido === true) {
		     	     	        	           	                    	    period.push(operation._resultSet.records[0].data);
		     	     	        	           	                    	    
		     	     	        	           	                    	    if(period.length==12){
		     	     	        	           	                    	    	// se crean los periodos de la cuenta (accountentry)
		     	     	        	           	                    	    	btn.up('window').mask("Creando periodo y actualizando informes", "x-mask-loading");
		     	     	        	           	                    	    	Ext.Ajax.setTimeout(60000);
		     	     	        	           	                    	    	Ext.Ajax
							     	     	        	           	  					.request({
							     	     	        	           	  						url : urlService
							     	     	        	           	  								+ 'indicatorEntryService/createAndUpdateMasive',
							     	     	        	           	  						params : {							     	     	        	           	  							
							     	     	        	           	  							user : usuario.get('userName')
							     	     	        	           	  						},
							     	     	        	           	  						scope : this,
							     	     	        	           	  						success : function(response) {
							     	     	        	           	  							var respuesta = Ext.decode(response.responseText);
							     	     	        	           	  					    	crearVentana (respuesta.codigo, respuesta.mensaje);
					
							     	     	        	           	  					    	Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1').reload();
							     	     	        	           	  					    	btn.up('window').unmask();
							     	     	        	           	  					    	btn.up('window').close();
							     	     	        	           	  						},
							     	     	        	           	  						failure : function(response) {
								     	     	        	           	  						btn.up('window').unmask();
						     	     	        	           	  								btn.up('window').close();
						     	     	        	           	  								
							     	     	        	           	  							if(response.statusText==="communication failure"){							     	     	        	           	  								
							     	     	        	           	  								crearVentana (3, "Tiempo de espera agotado. Vuelva a revisar la información dentro de 30 segundos");
							     	     	        	           	  	                    	}else { 
							     	     	        	           	  	                    		crearVentana (response.status, response.statusText);
							     	     	        	           	  	                    	}
							     	     	        	           	  						}
							     	     	        	           	  					});
		     	     	        	           	                    	    }
		     	     	        	                                        
		     	     	        	                                    } else {
		     	     	        	                                        crearVentana(respuesta.codigo, respuesta.mensaje);
		     	     	        	                                    }
		     	     	        	                                } else {
		     	     	        	                                    if (operation.error) {
		     	     	        	                                        crearVentana (5, "Error de conexión");
		     	     	        	                                    }
		     	     	        	                                }
		     	     	        	                            }
		     	     	        	                        	
		     	     	        	                        });
		     	          	                    	 		 
		     	          	                    	 	 }
		     	          	                    	 }
		     	         	                    } else {
		     	         	                        crearVentana(respuesta.codigo, respuesta.mensaje);
		     	         	                    }
		     	         	                } else {
		     	         	                    if (operation.error) {
		     	         	                        crearVentana (5, "Error de conexión");
		     	         	                    }
		     	         	                }
		     	         	            },
		     	         	            success: function(rec,st){
		     	         	                btn.setDisabled(false);
	
		     	         	            },
		     	         	            failure: function(rec,st,a,b,c){
		     	         	                btn.setDisabled(false);
		     	         	            }
		     	         	        });
		     	             		  
		     	             	  }
	     	                }
	     	            },
	     	            success: function(rec,st){
	     	                btn.setDisabled(false);
	     	            },
	     	            failure: function(rec,st,a,b,c){
	     	                btn.setDisabled(false); 	                
	     	                crearVentana (5, "Error de conexión");
	     	            }
	     	        }		
	        
	        );
        	}else{
	          var invalidFields = btn.up('window').query("field{isValid()==false}");
	          var msg = "Formulario no válido. Complete los campos requeridos:<br />";
	          for (var i = 0; i<invalidFields.length; i++){
	              msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
	                  for(var j = 0; j<invalidFields[i].getErrors().length; j++){
	                      msg += invalidFields[i].getErrors()[j]+'. ';
	                  }
	              msg +='<br />';
	          }
	          crearVentana(5,msg);
	        }
    	  
    },
    
    mostrarWindows: function(btn){
    	btn.setDisabled(true);
		var ventana = Ext.widget('selectperiodv1_ext');
		ventana.show();
		btn.setDisabled(false);
    	
    },
    
    abrirProceso: function(btn){
    	
    	 btn.setDisabled(true);
    	 var periods=[]

         var seleccion = btn.up('grid').getSelectionModel().getSelection();
         if (seleccion.length > 0) {
        	for(var i=0;i<seleccion.length;++i){ 
        	var periodStatusV1= Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1', {});
   	  	    periodStatusV1.data=seleccion[i].data.periodStatusPer;
   	  	    periodStatusV1.data.codePes='Opened';
   	  	    var creationDate=seleccion[i].data.periodStatusPer.creationDateTimeImo;
   	  		periodStatusV1.data.creationDateTimeImo= creationDate.split(' ')[0].replace (/\-/g,'/') + ' ' + creationDate.split(' ')[1].replace (/\-/g,'/');
 	  	  	periodStatusV1.data.updateUserImo= usuario.get('userName');
 	  	    periodStatusV1.data.updateDateTimeImo= new Date();
   	  	    periodStatusV1.getProxy().setUrl(urlService+'periodStatusService/'+periodStatusV1.getId());
   	  	    periodStatusV1.getProxy().setAppendId(false);
   	  	    periodStatusV1.save ({
 	            callback: function (record, operation) {
 	                if (operation.success === true) {
 	                    var respuesta = Ext.decode(operation._response.responseText);
 	                    if (respuesta.valido === true) {
 	                        periods.push(operation._resultSet.records[0].data);
 	                    	if(periods.length===seleccion.length){
 	                        crearVentana(respuesta.codigo, respuesta.mensaje);
 	                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1').reload();
 	                    	}
 	                    } else {
 	                        crearVentana(respuesta.codigo, respuesta.mensaje);
 	                    }
 	                    btn.setDisabled(false);
 	                } else {
 	                    if (operation.error) {
 	                        crearVentana (operation.error.status, "Error de conexión");
 	                    }
 	                }
 	            },
 	            success: function(rec,st){
 	                btn.setDisabled(false);
 	            },
 	            failure: function(rec,st,a,b,c){
 	                btn.setDisabled(false); 	                
 	                crearVentana (5, "Error de conexión");
 	            }
 	        });
   	  	    periodStatusV1.getProxy().setUrl(urlService+'periodStatusService');
 	  	    periodStatusV1.getProxy().setAppendId(false);
        	}
         } else {
             crearVentana(5, "Debe seleccionar un elemento");
             btn.setDisabled(false);
         }
    },
    
    cerrarProceso: function(btn) {
    	btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        var periods=[];
        if (seleccion.length > 0) {
        	for(var i=0;i<seleccion.length;++i){ 
        	var periodStatusV1= Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1', {});
  	  	    periodStatusV1.data=seleccion[i].data.periodStatusPer;
  	  	    periodStatusV1.data.codePes='Closed';
   	  	    var creationDate=seleccion[i].data.periodStatusPer.creationDateTimeImo;
  	  		periodStatusV1.data.creationDateTimeImo= creationDate.split(' ')[0].replace (/\-/g,'/') + ' ' + creationDate.split(' ')[1].replace (/\-/g,'/');
	  	  	periodStatusV1.data.updateUserImo= usuario.get('userName');
	  	    periodStatusV1.data.updateDateTimeImo= new Date();
  	  	    periodStatusV1.getProxy().setUrl(urlService+'periodStatusService/'+periodStatusV1.getId());
  	  	    periodStatusV1.getProxy().setAppendId(false);
  	  	    periodStatusV1.save ({
	            callback: function (record, operation) {
	                if (operation.success === true) {
	                    var respuesta = Ext.decode(operation._response.responseText);
	                    if (respuesta.valido === true) {
	                    	periods.push(operation._resultSet.records[0].data);
 	                    	if(periods.length===seleccion.length){
 	                        crearVentana(respuesta.codigo, respuesta.mensaje);
 	                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1').reload();
 	                    	}
	                    } else {
	                        crearVentana(respuesta.codigo, respuesta.mensaje);
	                    }
	                    btn.setDisabled(false);
	                } else {
	                    if (operation.error) {
	                        crearVentana (operation.error.status, "Error de conexión");
	                    }
	                }
	            },
	            success: function(rec,st){
	                btn.setDisabled(false);
	            },
	            failure: function(rec,st,a,b,c){
	                btn.setDisabled(false);
	                crearVentana (5, "Error de conexión");
	            }
	        });
  	  	    periodStatusV1.getProxy().setUrl(urlService+'periodStatusService');
	  	    periodStatusV1.getProxy().setAppendId(false);
        	}
            
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    
    create: function(btn) {
    	
    	btn.setDisabled(true);
        
    	var periodStatusV1= Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1', {});
    	
    	periodStatusV1.set({
            creationUserImo: usuario.get('userName'),
            creationDateTimeImo: new Date(),
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date(),
            codePes: 'New'
        });
    	
    	
    	
        
        periodStatusV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        var periodV1 = Ext.create('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1', {});
                        
                        periodV1.set({
                        	periodIdentifierPer: null,
                        	periodStatusPer: operation._resultSet.records[0].data,
                            creationUserImo: usuario.get('userName'),
                            creationDateTimeImo: new Date(),
                            updateUserImo: usuario.get('userName'),
                            updateDateTimeImo: new Date()
                        });
                        periodV1.save ({
                            callback: function (record, operation) {
                            	if (operation.success === true) {
                                    var respuesta = Ext.decode(operation._response.responseText);
                                    if (respuesta.valido === true) {
            	                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1').reload();
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                    }
                                } else {
                                    if (operation.error) {
                                        crearVentana (5, "Error de conexión");
                                    }
                                }
                            }
                        	
                        });
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                } else {
                    if (operation.error) {
                        crearVentana (5, "Error de conexión");
                    }
                }
            },
            success: function(rec,st){
                btn.setDisabled(false);

            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
            }
        });
            
         
    },
    
    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

			
			if (paramValues.periodIdentifierPer != "" && paramValues.periodIdentifierPer != null) {
                var periodIdentifierPer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'periodIdentifierPer',
                    valor: paramValues.periodIdentifierPer,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(periodIdentifierPer.data);
            }

			
            if (paramValues.periodCodePer != "" && paramValues.periodCodePer != null) {
                var periodCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'periodCodePer',
                    valor: paramValues.periodCodePer,
                    operacion: '=',
                    tipoValor: 'int'
                });
                filtro.push(periodCodePer.data);
            }

            if (paramValues.codePer != "" && paramValues.codePer != null) {
                var codePes = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'periodStatusPer<>codePes',
                    valor: paramValues.codePer,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.PeriodStatusTypeCodeList'
                });
                filtro.push(codePes.data);
            }

            

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('periodv1formsearch_ext').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
        }
    }
    
    
    
});
