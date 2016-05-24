Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
             'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryParentExt'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
             'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryParentExt'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeCategoryV2PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeCategoryV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV2Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1Validation'
            ],

    init: function() {
        this.control({
            'xtbmlrangev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'xtbmlrangev2grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'xtbmlrangev2principalwindow button[action=create]': {
                click: this.create
            },
            'xtbmlrangev2grid button[action=delete]': {
                click: this.deleteElement
            },
            'xtbmlrangev2grid button[action=edit]': {
                click: this.edit
            },
            'xtbmlrangev2principalwindow button[action=update]': {
                click: this.update
            },
            'xtbmlrangev2grid actioncolumn[action=showDimensionXtr]': {
                click: this.showDimensionXtr
            },
            'xtbmlrangev2grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'xtbmlrangev2grid menuitem[action=mostrarWindowsCategory]': {
                click: this.mostrarWindowsCategory
            },
            'xtbmlrangev2grid menuitem[action=mostrarWindowsAttribute]': {
                click: this.mostrarWindowsAttribute_v2
            },
            'xtbmlrangecategoryv2principalwindow button[action=createRangeByCategory]': {
                click: this.createRangeByCategory_v2
            },
            'accountingcategoryv1formsearch_ext button[action=buscar]': {
                click: this.buscaraccountingcategory
            },
            'xtbmlrangev2grid button[action=importar]': {
                click: this.mostrarWindowsCategory
            }
        });
    },
    
    buscaraccountingcategory: function(cmp){
    	if(cmp.up('form').getForm().isValid()){
    		var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.AccountingCategoryV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation('AccountingCategory');
            var paramValues =  cmp.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());
			
			if(cmp.up('window').keyImo!==undefined){
			filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'keyImo',
                valor: '%'+cmp.up('window').keyImo+'%',
                valores: null,
                operacion: 'like',
                tipoValor: 'string'
            }).data);
			}

            if (paramValues.categoryIdentifierCat != "" && paramValues.categoryIdentifierCat != null) {
            	filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                	nombreCampo: 'categoryIdentifierCat',
                    valor: paramValues.categoryIdentifierCat,
                    valores: null,
                    operacion: '=',
                    tipoValor: 'long'
                }).data);
            }
        
            if (paramValues.keyImo != "" && paramValues.keyImo != null) {
            	filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: '%'+paramValues.keyImo+'%',
                    valores: null,
                    operacion: 'like',
                    tipoValor: 'string'
                }).data);
            }
            
            if (paramValues.categoryNameCat != "" && paramValues.categoryNameCat != null) {
            	filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'categoryNameCat',
                    valor: '%'+paramValues.categoryNameCat+'%',
                    valores: null,
                    operacion: 'like',
                    tipoValor: 'string'
                }).data);
            }

            store.pageSize=10;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                cmp.setDisabled(false);
            });
       } else{
           
       }
    },

    mostrarWindowsAttribute_v2: function(btn){
        this.application.loadController('ext.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV2');
        
        var sec=1;
        var dimensionXtr = null;
        var dimensionXtrGrid = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form');

        if(dimensionXtrGrid!=null && dimensionXtrGrid!=undefined){
            dimensionXtr = dimensionXtrGrid.getForm().getRecord().data;  
        };              
        
        var store=Ext.create('Ext.data.Store',{

            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
            remoteSort: true,
            remoteFilter: true,
            simpleSortMode: true,
            simpleGroupMode: true,
            pageSize: 15,
            autoLoad: false,
            sorters: [{
                property: 'rangeSequenceXtr',
                direction: 'DESC'
            }],
            proxy:  {
                type: 'rest',
                url: urlService + 'xtbmlRangeService/findByFilter',
                actionMethods:  {
                    read: 'POST'
                },
                extraParams:{
                    filters : Ext.encode([
                    Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'class',
                        valor: 'XtbmlRange',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'string'
                    }).data,
                    Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'dimensionXtr<>dimensionIdentifierXtd',
                        valor: dimensionXtr.dimensionIdentifierXtd,
                        operacion: '=',
                        tipoValor: 'long'
                    }).data
                    ])
                },
                reader: {
                    type: 'json',
                    rootProperty: 'datos',
                    successProperty: 'valido',
                    totalProperty: 'totalRegistros'
                }
            }
         });
         
         store.load(function(records, operation, success) {
                if(records.length>0){
                sec=records[0].data.rangeSequenceXtr+1;
                }
                
                var ventana = Ext.create('Ext.window.Window', 
                {
                    border: false,
                    padding: 10,
                    itemId: 'attribute',
                    title: 'Asignar Variable',
                    modal:true,
                    width: '80%',
                    autoScroll: true,
                    
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'panelheader',
                            title: 'Búsqueda',
                            collapsible: true,
                            collapsed: true,
                            titleCollapse: true,
                            padding: '10 10 10 10',
                            listeners: {
                                collapse: function(cmp){
                                    cmp.up().updateLayout();
                                    cmp.up().center();
                                },
                                expand: function(cmp){
                                    cmp.up().updateLayout();
                                    cmp.up().center();
                                }
                            },
                            items: [{
                                fieldDefaults: {
                                    labelAlign: 'top',
                                    labelWidth: 85,
                                    msgTarget: 'side'
                                },
                                xtype: 'productattributespecificationv1formsearch'
                            }]
                        },
                        {
                        xtype: 'productattributespecificationv1grid',
                        padding: '10 10 10 10',
                        enableColumnResize: false,
                        listeners: {
                            afterrender: function(grid){
                              grid.getStore().setPageSize(10);
                              grid.getStore().load({
                                        callback : function () {
                                                Ext.ComponentQuery.query ('#attribute')[0].center();
                                        }
                             });
                             var column = Ext.create('Ext.grid.column.Action',{
                                   width: 50,
                                   sortable: false,
                                   align: 'center',
                                   iconCls: 'add-grid',
                                   tooltip: 'Agregar',
                                   handler: function(grid, rowIndex,colIndex, item, e, rec){
                                       
                                            var store= Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1');
                                            var index = store.findBy (function (record, id) {
                                                  if (record.data.rangeNameXtr=== rec.data.nameSpe) return true;
                                                  else return false;
                                              });
                                            if(index===-1){
                                              var productAttributeSpecification=rec.data;

                                              var xtbmlRangeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1', {});
                                              xtbmlRangeV1.set({
                                                    rangeIdentifierXtr: null,
                                                    creationUserImo: usuario.get('userName'),
                                                    creationDateTimeImo: new Date(),
                                                    updateUserImo: usuario.get('userName'),
                                                    updateDateTimeImo: new Date(),
                                                    dimensionXtr: dimensionXtr,
                                                    rangeSequenceXtr: sec,
                                                    varcharValueXtr: productAttributeSpecification.kindOfElementNameSpe,
                                                    rangeNameXtr: productAttributeSpecification.nameSpe
                                                });

                                               xtbmlRangeV1.save ({
                                                    callback: function (record, operation) {
                                                        if (operation.success === true) {
                                                            var respuesta = Ext.decode(operation._response.responseText);
                                                            if (respuesta.valido === true) {
                                                                sec++;
                                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400}); 
                                                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
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
                                            }else{
                                               crearVentana(5,  "Rango ya agregado");
                                            }
                                   }

                           });
                           //Ext.getElementById(grid.down('progressbar').getId()).click();
                           grid.headerCt.insert(0,column);
                           grid.getView().refresh();
                           grid.down('pagingtoolbar').add({
                                    xtype : 'button',
                                    text : 'Cerrar',
                                    handler : function(btn){
                                          btn.up('window').close();
                                   }
                           });
                          
                           }
                       }
                    }],
                    listeners: {
                        afterRender: function(thisForm, options){
                            this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                esc: function(){
                                    this.setVisible(false);
                                    //this.up('fieldset').down('button[pressed=true]').toggle();
                                },
                                scope: this
                            });


                        },
                        show: function(cmp){
                                cmp.center();
                                cmp.updateLayout();
                        }
                    }
             });
             ventana.show();
                
                
        });
        
        
        
        
    },
    
    createRangeByCategory_v2: function(btn){
        var cb=btn.up('window').down('combo[name="categoryType"]');
        var me=this;
        var sec=1;
        var dimensionXtr = null;
        var dimensionXtrGrid = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form');

        if(dimensionXtrGrid!=null && dimensionXtrGrid!=undefined){
            dimensionXtr = dimensionXtrGrid.getForm().getRecord().data;  
        };              
    	if(cb.getValue()!==null){
            btn.up('window').close();
            
            if(Ext.ComponentQuery.query('#rangesXtdGrid')[0].getStore().getData().items.length>0){
                Ext.ComponentQuery.query('#rangesXtdGrid')[0].getStore().sort('rangeSequenceXtr', 'DESC');
                sec=Ext.ComponentQuery.query('#rangesXtdGrid')[0].getStore().getData().items[0].data.rangeSequenceXtr+10;
            }
                
            me.application.loadController('ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1');
            
            
            var storeRange=Ext.create('Ext.data.Store',{

                        model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
                        remoteSort: true,
                        remoteFilter: true,
                        simpleSortMode: true,
                        simpleGroupMode: true,
                        pageSize: 15,
                        autoLoad: false,
                        sorters: [{
                            property: 'rangeSequenceXtr',
                            direction: 'DESC'
                        }],
                        proxy:  {
                            type: 'rest',
                            url: urlService + 'xtbmlRangeService/findByFilter',
                            actionMethods:  {
                                read: 'POST'
                            },
                            extraParams:{
                                filters : Ext.encode([
                                Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'class',
                                    valor: 'XtbmlRange',
                                    valores: null,
                                    operacion: '=',
                                    tipoValor: 'string'
                                }).data,
                                Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'dimensionXtr<>dimensionIdentifierXtd',
                                    valor: dimensionXtr.dimensionIdentifierXtd,
                                    operacion: '=',
                                    tipoValor: 'long'
                                }).data
                                ])
                            },
                            reader: {
                                type: 'json',
                                rootProperty: 'datos',
                                successProperty: 'valido',
                                totalProperty: 'totalRegistros'
                            }
                        }
                     });
            storeRange.load({
        
                callback: function (records, operation) {
                    
                    if(records.length>0){
                      sec=records[0].data.rangeSequenceXtr+10;  
                    }
                    
                    var ventana = Ext.create('Ext.window.Window', 
                    {
                        border: false,
                        padding: 10,
                        itemId: 'category_range',
                        title: 'Asignar Categoría',
                        modal:true,
                        width: '80%',
                        height: 570,
                        idCategory: cb.valueModels[0].data.categoria.categoryIdentifierCat,
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: false,
                                titleCollapse: true,
                                listeners: {
                                    collapse: function(cmp){
                                        cmp.up().updateLayout();
                                        cmp.up().center();
                                    },
                                    expand: function(cmp){
                                        cmp.up().updateLayout();
                                        cmp.up().center();
                                    }
                                },
                                items: [{
                                    fieldDefaults: {
                                        labelAlign: 'top',
                                        labelWidth: 85,
                                        msgTarget: 'side'
                                    },
                                    xtype: 'accountingcategoryv1formsearch_ext'
                                }]
                            },
                            {
                                xtype: 'accountingcategoryv1grid_ext',
                                padding: '10 0 0 0',
                                enableColumnResize: true,
                                listeners: {
                                	afterrender: function(grid){
                                		grid.getStore().pageSize=10;
                                		grid.getStore().load({
                                			callback : function () {
                                                Ext.ComponentQuery.query ('#category_range')[0].center();
                                			}
                                		});
                                 var column = Ext.create('Ext.grid.column.Action',{
                                   width: 50,
                                   sortable: false,
                                   align: 'center',
                                   iconCls: 'add-grid',
                                   tooltip: 'Agregar',
                                   handler: function(grid, rowIndex,colIndex, item, e, rec){
                                       
                                        var  storeCategory=  new Ext.data.Store({
                                                model:'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryParentExt',
                                                remoteSort: true,
                                                autoLoad: false,
                                                pageSize: 9999,
                                                proxy: {
                                                    type: 'rest',
                                                    url: urlService + 'categoryNodeService/findCategoryNodesById',
                                                    actionMethods: {
                                                        read: 'POST'
                                                    },
                                                    extraParams: {
                                                        idCategory: rec.data.categoryIdentifierCat
                                                    },
                                                    reader: {
                                                        rootProperty: 'datos',
                                                        successProperty: 'valido',
                                                        totalProperty: 'totalRegistros'
                                                    }
                                                }
                                        });
                                        grid.up('window').mask("Buscando", "x-mask-loading");      
                                        storeCategory.load(
                                            {
                                                callback: function (records, operation) {
                                                    
                                                   if (operation.success === true) {
                                                        var mapSecs=new Array();
                                                        var insertedXtbmlRangeV1=[];
                                                        var foundXtbmlRangeV1=[];
                                                        var categories=records;
                                                        var total=records.length;
                                                        
                                                        for(var i=0; i<records.length; ++i){
                                                            var store= Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',{});
                                                            var filtro = filterCreation("XtbmlRange");
                                                            var dimensionIdentifierXtd = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                                                nombreCampo: 'dimensionXtr.dimensionIdentifierXtd',
                                                                valor: dimensionXtr.dimensionIdentifierXtd,
                                                                operacion: '=',
                                                                tipoValor: 'long'
                                                            });
                                                            filtro.push(dimensionIdentifierXtd.data);
                                                            

                                                            var varcharValueXtr = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                                                                nombreCampo: 'varcharValueXtr',
                                                                valor: records[i].data.categoria.keyImo,
                                                                operacion: '=',
                                                                tipoValor: 'string'
                                                            });
                                                            filtro.push(varcharValueXtr.data);
                                                            mapSecs[records[i].data.categoria.keyImo]=1;
                                                            store.pageSize=15;
                                                            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                            store.currentPage=1;
                                                            store.load(function(records, operation, success) {
                                                                if(records.length>0){
                                                                    mapSecs[records[0].data.varcharValueXtr]=-1;
                                                                }
                                                                foundXtbmlRangeV1.push(records);
                                                                if(foundXtbmlRangeV1.length===total){
                                                                     var totalInsert=0;
                                                                     for (key in mapSecs) {
                                                                         if(mapSecs[key]===1){
                                                                         mapSecs[key]=sec;
                                                                         sec=sec+10;
                                                                         totalInsert++;
                                                                         }
                                                                      }
                                                                      if(totalInsert===0){
                                                                        grid.up('window').unmask(); 
                                                                        crearVentana(5,  "Se han agregado todos los rangos hijos del registro seleccionado");
                                                                      }
                                                                      for(var i=0; i<categories.length; ++i){
                                                                          if(mapSecs[categories[i].data.categoria.keyImo]!==-1){
                                                                 
                                                                              var categoryNode=categories[i].data.categoria;
                                                                              var xtbmlRangeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1', {});
                                                                              xtbmlRangeV1.set({
                                                                                    rangeIdentifierXtr: null,
                                                                                    creationUserImo: usuario.get('userName'),
                                                                                    creationDateTimeImo: new Date(),
                                                                                    updateUserImo: usuario.get('userName'),
                                                                                    updateDateTimeImo: new Date(),
                                                                                    dimensionXtr: dimensionXtr,
                                                                                    rangeSequenceXtr: mapSecs[categories[i].data.categoria.keyImo],
                                                                                    varcharValueXtr: categoryNode.keyImo,
                                                                                    rangeNameXtr: categoryNode.categoryNameCat
                                                                                });
                                                                                xtbmlRangeV1.save ({
                                                                                        callback: function (record, operation) {
                                                                                            if (operation.success === true) {
                                                                                                var respuesta = Ext.decode(operation._response.responseText);
                                                                                                if (respuesta.valido === true) {
                                                                                                    insertedXtbmlRangeV1.push(record);
                                                                                                    if(insertedXtbmlRangeV1.length===totalInsert){
                                                                                                       grid.up('window').unmask(); 
                                                                                                       Ext.toast({html: 'Se agregó el registro seleccionado y sus hijos', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                                                                                       Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
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
                                                                                        },
                                                                                        failure: function(rec,st,a,b,c){
                                                                                        }
                                                                                    });
                                                                          }
                                                                      }                                                                    
                                                                }
                                                            });                                                            
                                                        }                                                        
                                                   }
                                                },
                                                success: function(rec,st){
                                                },
                                                failure: function(rec,st,a,b,c){
                                                }
                                            }                            
                                        );
                                   }
                               });
                                 
                               grid.headerCt.insert(0,column);
                               grid.getView().refresh();
                               grid.down('pagingtoolbar').add({
                                      xtype : 'button',
                                   text : 'Cerrar',
                                   handler : function(btn){
                                       btn.up('window').close();
                                   }
                               });
                                }
                            }
                        }],
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                    esc: function(){
                                        this.setVisible(false);
                                        this.up('fieldset').down('button[pressed=true]').toggle();
                                    },
                                    scope: this
                                });


                            },
                            show: function(cmp){
                                    cmp.center();
                                    cmp.updateLayout();
                            }
                        }
            });
            
            
            var store=ventana.down('grid').getStore();
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation('AccountingCategory');
            filtro.push(Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: '%'+cb.valueModels[0].data.categoria.keyImo+'%',
                    valores: null,
                    operacion: 'like',
                    tipoValor: 'string'
                }).data);
                
            
            store.pageSize=10;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load();
            
            ventana.keyImo=cb.valueModels[0].data.categoria.keyImo;
            ventana.show();
                    
                }

            });
            
           
    	}else{

            invalidFields = btn.up('window').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);        
    	}
    },

    confirmarAccion: function() {
        if (seleccion.length > 0) {
            Ext.MessageBox.show({
                title: 'Confirmar',
                msg: '¿Está seguro de eliminar/crear/modificar los campos seleccionados?',
                buttons: Ext.MessageBox.YESNO,
                fn: this.realizarAccion,
                icon: Ext.MessageBox.QUESTION
            });
        } else {
            crearVentana(5, "No hay elementos seleccionados");
        }
    },

    create: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var dimensionXtr = null;
        var dimensionXtrGrid = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form');
        if(form.isValid()
        ){
            if(dimensionXtrGrid!=null && dimensionXtrGrid!=undefined){
            	//dimensionXtrGrid.getForm().getRecord().set('tableXtd', null);
            	//dimensionXtrGrid.getForm().getRecord().set('rangesXtd', null);
                dimensionXtr = dimensionXtrGrid.getForm().getRecord().data;  
            };
            var objeto = form.getValues(false, true, false);
            var xtbmlRangeV1Record =  form.getRecord();
            if (xtbmlRangeV1Record !== undefined 
                && xtbmlRangeV1Record !== null 
                && xtbmlRangeV1Record .get('rangeIdentifierXtr')!==null 
                && xtbmlRangeV1Record .get('rangeIdentifierXtr')!==undefined 
                && new String(xtbmlRangeV1Record.get('rangeIdentifierXtr')).indexOf('XtbmlRangeV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var xtbmlRangeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1', {});
                xtbmlRangeV1.set(objeto);
                xtbmlRangeV1.set({
                    rangeIdentifierXtr: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    dimensionXtr: dimensionXtr
                }); 
                var xtbmlRangeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1Validation', {});
                var validations = xtbmlRangeV1Validation.createValidations (xtbmlRangeV1);
                var errors = null;
                if (validations !== null || validations.length>0) {
                    var utilValidation = this.application.getUtilValidation();
                    if(validations[0]!==undefined){
                        errors =  utilValidation.validation(validations);
                    }
                }
                if (errors !== null && errors !== undefined) {
                    crearVentana(5, errors);
                    btn.setDisabled(false);
                    return null;
                }
                btn.up('window').mask("Guardando", "x-mask-loading");
                xtbmlRangeV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
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
                        btn.up('window').unmask();
                    },
                    failure: function(rec,st,a,b,c){
                        btn.setDisabled(false);
                        btn.up('window').unmask();
                    }
                });
            }
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i<invalidFields.length; i++){
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                    for(var j = 0; j<invalidFields[i].getErrors().length; j++){
                        msg += invalidFields[i].getErrors()[j]+'. ';
                    }
                msg +='<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('xtbmlrangev2principalwindow');
            window.setTitle('Rango de Tabla Nº ' + seleccion[0].get('rangeIdentifierXtr'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
//            var dimensionXtrGrid = Ext.ComponentQuery.query('#dimensionXtrGrid')[0];
//            dimensionXtrGrid.getStore().loadRawData(seleccion[0].get('dimensionXtr')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    deleteElement: function (btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            Ext.MessageBox.show({
                title: 'Confirmar',
                msg: '¿Está seguro de eliminar los campos seleccionados?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(rec){
                    if( rec === "yes"){
                        seleccion[0].set({
                            updateUserImo : usuario.get('userName'),
                            updateDateTimeImo : new Date()
                        });
                        seleccion[0].erase ({
                            callback: function (record, operation) {
                                if (operation.success === true) {
                                    var respuesta = Ext.decode(operation._response.responseText);
                                    if (respuesta.valido === true) {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1').reload();
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                    }
                                    btn.setDisabled(false);
                                } else {
                                    if (operation.error) {
                                        crearVentana (5, "Error de conexión");
                                        btn.setDisabled(false);
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
                    } else {
                        btn.setDisabled(false);
                    }
                }
            });
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    update: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var dimensionXtr = null;
        var dimensionXtrGrid = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form');
        if(dimensionXtrGrid!=null && dimensionXtrGrid!=undefined){
            dimensionXtr = dimensionXtrGrid.getForm().getRecord().data;
        };
        var objeto = form.getValues(false, true, false);
        var xtbmlRangeV1 = form.getRecord();
        xtbmlRangeV1.set (objeto);
        xtbmlRangeV1.set({
            dimensionXtr: dimensionXtr,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var xtbmlRangeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1Validation', {});
        var validations = xtbmlRangeV1Validation.createValidations (xtbmlRangeV1);
        var errors = null;
        if (validations !== null || validations.length>0) {
            var utilValidation = this.application.getUtilValidation();
            if(validations[0]!==undefined){
                errors =  utilValidation.validation(validations[0].data);
            }
        }
        if (errors !== null && errors !== undefined) {
            crearVentana(5, errors);
            btn.setDisabled(false);
            return null;
        }
        btn.up('window').mask("Guardando", "x-mask-loading");
        xtbmlRangeV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
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
                btn.up('window').unmask();
            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
                btn.up('window').unmask();
            }
        });
    },

    mostrarWindows: function(btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
        var ventana = Ext.widget('xtbmlrangev2principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    mostrarWindowsCategory: function(btn) {
        btn.setDisabled(true);
        var ventana = Ext.widget('xtbmlrangecategoryv2principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    mostrarWindowsAttribute: function(btn) {
    	btn.setDisabled(true);        
        
        Ext.MessageBox.show({
            title: 'Confirmar',
            msg: '¿Está seguro de crear los rangos desde las variables configuradas?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(rec){
                if( rec === "yes"){                    
                	var dimensionIdentifierXtd = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form').getForm().getRecord().data.dimensionIdentifierXtd;
                	    	
                    if (dimensionIdentifierXtd != null) {                    	
                    	Ext.Ajax.request( {
            				url : urlService
            				+ 'xtbmlRangeService/createByAttribute',
            				params : {
            					dimensionIdentifierXtd : dimensionIdentifierXtd
            				},
            				success : function(response) {
            					var respuesta = Ext.decode(response.responseText);
            					if (respuesta.valido === true) {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                    Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
                                } else {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                }
            					btn.setDisabled(false);
            				},
            				failure : function(response) {
            					btn.setDisabled(false);
            				}
            			});
                    } else {
                    	btn.up('window').down('form').getForm().valid();
                    	btn.setDisabled(false);
                    }
                } else {
                    btn.setDisabled(false);
                }
            }
        });
    },
    
    createRangeByCategory: function(btn) {
    	btn.setDisabled(true);        
        
    	var dimensionIdentifierXtd = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form').getForm().getRecord().data.dimensionIdentifierXtd;
    	var seleccion =btn.up('window').down('form').down('combo').value;
    	
        if (seleccion != null && dimensionIdentifierXtd != null) {
        	btn.setDisabled(false);
        	
        	Ext.Ajax.request( {
				url : urlService
				+ 'xtbmlRangeService/createByCategory',
				params : {
					dimensionIdentifierXtd : dimensionIdentifierXtd,
					categoryIdentifierCat : seleccion
				},
				success : function(response) {
					var respuesta = Ext.decode(response.responseText);
					if (respuesta.valido === true) {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1').reload();
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
					btn.setDisabled(false);
				},
				failure : function(response) {
					btn.setDisabled(false);
				}
			});
        	
        	btn.up('window').close();
        } else {
        	btn.up('window').down('form').getForm().valid();
        	btn.setDisabled(false);
        }    	
    },
    
    createRangeByAttribute: function(btn) {
    	btn.setDisabled(true);        
        
    	var dimensionIdentifierXtd = Ext.ComponentQuery.query('xtbmldimensionv2principalwindow')[0].down('form').getForm().getRecord().data.dimensionIdentifierXtd;
    	    	
        if (dimensionIdentifierXtd != null) {
        	btn.setDisabled(false);
        	
        	Ext.Ajax.request( {
				url : urlService
				+ 'xtbmlRangeService/createByAttribute',
				params : {
					dimensionIdentifierXtd : dimensionIdentifierXtd
				},
				success : function(response) {
					btn.setDisabled(false);
				},
				failure : function(response) {
					btn.setDisabled(false);
				}
			});
        	
        	btn.up('window').close();
        } else {
        	btn.up('window').down('form').getForm().valid();
        	btn.setDisabled(false);
        }    	
    },

    showDimensionXtr: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV2');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'xtbmldimensionv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1',
                    data: [],
                    proxy: {
                        type: 'pagingmemory'
                    },
                    pageSize: 15
                }),
                listeners:{
                    render : function(grid){
                        var toolbar = grid.down('toolbar');
                        toolbar.down('button[text="Nuevo"]').setVisible(false);
                        toolbar.down('button[text="Editar"]').setVisible(false);
                        toolbar.down('button[text="Borrar"]').setVisible(false);
                        toolbar.add({
                            xtype: 'button',
                            text: 'Cerrar',
                            handler: function(){
                                this.up('window').close();
                            }
                        });
                    }
                }
            }]
        });
        
         ventana.show();
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('dimensionXtr')!=null){
            data.push(rec.get('dimensionXtr'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
    },

    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);

            if (paramValues.rangeIdentifierXtr != "" && paramValues.rangeIdentifierXtr != null) {
                var rangeIdentifierXtr = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'rangeIdentifierXtr',
                    valor: paramValues.rangeIdentifierXtr,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(rangeIdentifierXtr.data);
            }

            if (paramValues.typeNameImo != "" && paramValues.typeNameImo != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            if (paramValues.rangeNameXtr != "" && paramValues.rangeNameXtr != null) {
                var rangeNameXtr = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'rangeNameXtr',
                    valor: paramValues.rangeNameXtr+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(rangeNameXtr.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('xtbmlrangev1formsearch').query("field{isValid()==false}");
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
