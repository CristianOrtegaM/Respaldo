Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1Grid',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategoryV1SelectionTypeWindow',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategorySchemeV1Validation'
            ],

    init: function() {
        this.control({
            'categoryschemev1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'categoryschemev1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'categoryschemev1grid button[action=delete]': {
                click: this.deleteElement
            },
            'categoryschemev1grid button[action=edit]': {
                click: this.edit
            },
            'categoryschemev1principalwindow button[action=update]': {
                click: this.update
            },
            'categoryschemev1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            },
            'categoryv1selectiontype button[action=aceptar]': {
                click: this.showSelectedCategory
            },
            'categoryschemev1principalwindow button[action=create]': {
                click: this.create_v2
            },
        });
    },
    
    
    create_v2: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var isSubschemeOfCas = null;
        if(form.isValid()
        ){
            
            var objeto = form.getValues(false, true, false);
            var categorySchemeV1Record =  form.getRecord();
            var categorySchemeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
            objeto = this.application.getConvertion().convert (objeto, categorySchemeV1);
            isSubschemeOfCas = [];
            isSubschemeOfCas.push(categorySchemeV1Record.getData().isSubschemeOfCas);
            categorySchemeV1.set(objeto);
            categorySchemeV1.set({
                categorySchemeIdentifierCas: null,
                creationUserImo: usuario.get('userName'),
                creationDateTimeImo: new Date(),
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date(),
                isSubschemeOfCas: isSubschemeOfCas
            });
            var categorySchemeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategorySchemeV1Validation', {});
            var validations = categorySchemeV1Validation.createValidations (categorySchemeV1);
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
            categorySchemeV1.getProxy().setUrl(urlService + 'categorySchemeService/createCategorySchemeUpdateCategory/'+categorySchemeV1Record.getData().isSubschemeOfCas.categoryIdentifierCat);
            /*categorySchemeV1.getProxy().extraParams={
            		categoryIdentifierCat :  categorySchemeV1Record.getData().isSubschemeOfCas.categoryIdentifierCat,
             };*/
            categorySchemeV1.save ({
                callback: function (record, operation) {
                	var categorySchemeV1Url = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                	categorySchemeV1Url.getProxy().setUrl(urlService + 'categorySchemeService');
                    if (operation.success === true) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido === true) {
                            var objetoCategoria = record.get('isSubschemeOfCas')[0];
							var categoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.AccountingCategoryV1', objetoCategoria);
							categoria.setIsParentCategoryOfCat(respuesta.data);
                            AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1').mostrarWindows(null,categoria.data.categoryIdentifierCat);
                            crearVentana(respuesta.codigo, respuesta.mensaje);
							btn.up('window').close();
							
                            
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
                	var categorySchemeV1Url = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                	categorySchemeV1Url.getProxy().setUrl(urlService + 'categorySchemeService');
                    btn.setDisabled(false);
                    btn.up('window').unmask();
                },
                failure: function(rec,st,a,b,c){
                	var categorySchemeV1Url = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                	categorySchemeV1Url.getProxy().setUrl(urlService + 'categorySchemeService');
                    btn.setDisabled(false);
                    btn.up('window').unmask();
                }
            });

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
            if(isParentSchemeOfCasGrid.count()==0){
                msg += '<b>- Categorías.</b> No puede estar vacío.<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },
    
    showSelectedCategory: function(btn){
    	var cb=btn.up('window').down('combo[name="categorytype"]');
    	if(cb.getValue()!==null){
    		var tipoCategoria = cb.getValue();
    		//tipoCategoria = 'Category';
	   		this.application.loadController('ext.com.claveSoluciones.acordFw.category.' + tipoCategoria + 'V1');
	    	var formSearchTypeCategory = tipoCategoria.toLowerCase()+'v1formsearch';
	    	var gridTypeCategory = tipoCategoria.toLowerCase()+'v1grid';
	    	var principalWindow = tipoCategoria.toLowerCase()+'v1principalwindow';
	    	/*var ventana = Ext.create('Ext.window.Window', 
	    		{
		            border: false,
		            padding: 10,
		            itemId: 'isParentSchemeOfCasPanelGrid',
		            modal:true,
		            width: '85%',
		            items: [{
		                title: 'Búsqueda',
		                cls: 'panelheader',
		                title: 'Búsqueda',
		                collapsible: true,
		                collapsed: true,
		                titleCollapse: true,
		                listeners:{
		                    collapse: function(){
		                        this.updateLayout();
		                    },
		                    expand: function(){
		                        this.updateLayout();
		                    },
		                },
		                items: [{
		                    xtype: formSearchTypeCategory
		                }]
		            },{
		                xtype: gridTypeCategory,
		                enableColumnResize: false,
		                listeners: {
		                    afterrender: function(){
		                        this.getStore().load();
		                        var toolbar = this.down('pagingtoolbar');
		                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
		                        toolbar.add({
		                            xtype : 'button',
		                            text : 'Cerrar',
		                            handler : function(){
		                                var screen = Ext.ComponentQuery.query('#isParentSchemeOfCasPanelGrid');
		                                var win = screen[screen.length-1];
		                                win.setVisible(false);
		                                //var button = Ext.ComponentQuery.query('button[itemId="isParentSchemeOfCasPanelGridButton"]');
		                                //button[button.length-1].toggle();
		                            }
		                        });
		                        var column = Ext.create('Ext.grid.column.Action',{
		                            flex: 0.3,
		                            sortable: false,
		                            align: 'center',
		                            iconCls: 'add-grid',
		                            tooltip: 'Agregar',
		                            handler: function(grid, rowIndex,colIndex, item, e, rec){
		                                var screen = Ext.ComponentQuery.query('#isParentSchemeOfCasGrid');
		                                var store = screen[screen.length-1].getStore();
		                                if(store.findExact('categoryIdentifierCat', rec.get('categoryIdentifierCat'))==-1)
		                                store.loadRawData(rec.data,true);
		                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
		                            }
		                        });
		                        this.headerCt.insert(0,column);
		                        this.getView().refresh();
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
	    	});*/
	    	var ventana = Ext.widget(principalWindow);
	    	btn.up('window').close();
	    	ventana.show();
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
        var isSubschemeOfCas = null;
        //var isParentSchemeOfCasGrid = btn.up('window').down('categoryv1grid_ext').getStore();
        if(form.isValid()
            //&& isParentSchemeOfCasGrid.count()>0
        ){
            /**if(isParentSchemeOfCasGrid.count()>0){
                isParentSchemeOfCas = [];
                isParentSchemeOfCasGrid.each(function(rec){
                    isParentSchemeOfCas.push(rec.data);
                });
            };**/
            var objeto = form.getValues(false, true, false);
            var categorySchemeV1Record =  form.getRecord();
            if (categorySchemeV1Record !== undefined 
                && categorySchemeV1Record !== null 
                && categorySchemeV1Record .get('categorySchemeIdentifierCas')!==null 
                && categorySchemeV1Record .get('categorySchemeIdentifierCas')!==undefined 
                && new String(categorySchemeV1Record.get('categorySchemeIdentifierCas')).indexOf('CategorySchemeV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categorySchemeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                objeto = this.application.getConvertion().convert (objeto, categorySchemeV1);
                isSubschemeOfCas = [];
                isSubschemeOfCas.push(categorySchemeV1Record.getData().isSubschemeOfCas);
                categorySchemeV1.set(objeto);
                categorySchemeV1.set({
                    categorySchemeIdentifierCas: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    isSubschemeOfCas: isSubschemeOfCas
                });
                var categorySchemeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategorySchemeV1Validation', {});
                var validations = categorySchemeV1Validation.createValidations (categorySchemeV1);
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
                //categorySchemeV1.phantom = false;
                categorySchemeV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                //btn.up('window').close();
                                var objetoCategoria = record.get('isSubschemeOfCas')[0];
								var categoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.AccountingCategoryV1', objetoCategoria);
								categoria.setIsParentCategoryOfCat(respuesta.data);
								//categoria.phantom = false;
								categoria.save({
				                    callback: function (record, operation) {
				                        if (operation.success === true) {
				                            var respuesta = Ext.decode(operation._response.responseText);
				                            if (respuesta.valido === true) {
				                                btn.up('window').close();
				                                crearVentana(respuesta.codigo, respuesta.mensaje);
				                                AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1').mostrarWindows(null,operation._resultSet.records[0].data.categoryIdentifierCat);
				                                crearVentana(respuesta.codigo, respuesta.mensaje);
				    							btn.up('window').close();
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
            if(isParentSchemeOfCasGrid.count()==0){
                msg += '<b>- Categorías.</b> No puede estar vacío.<br />';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('categoryschemev1principalwindow');
            window.setTitle('Esquema de Categoría Nº ' + seleccion[0].get('categorySchemeIdentifierCas'));
           	window.down('#isParentSchemeOfCasGrid').getStore().loadRawData(seleccion[0].data.isParentSchemeOfCas,true);
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="keyImo"]').setDisabled(true);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var isParentSchemeOfCas = null;
        var isParentSchemeOfCasGrid = btn.up('window').down('categoryv1grid_ext').getStore();
        if(form.isValid()
            && isParentSchemeOfCasGrid.count()>0
        ){
            if(isParentSchemeOfCasGrid.count()>0){
                isParentSchemeOfCas = [];
                isParentSchemeOfCasGrid.each(function(rec){
                    isParentSchemeOfCas.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var categorySchemeV1Record =  form.getRecord();
            if (categorySchemeV1Record !== undefined 
                && categorySchemeV1Record !== null 
                && categorySchemeV1Record .get('categorySchemeIdentifierCas')!==null 
                && categorySchemeV1Record .get('categorySchemeIdentifierCas')!==undefined 
                && new String(categorySchemeV1Record.get('categorySchemeIdentifierCas')).indexOf('CategorySchemeV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var categorySchemeV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                categorySchemeV1.set(objeto);
                categorySchemeV1.set({
                    categorySchemeIdentifierCas: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    isParentSchemeOfCas: isParentSchemeOfCas
                });
                var categorySchemeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategorySchemeV1Validation', {});
                var validations = categorySchemeV1Validation.createValidations (categorySchemeV1);
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
                    return false;
                }
                return categorySchemeV1;
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
            if(isParentSchemeOfCasGrid.count()==0){
                var label = btn.up('window').down('form').down('#isParentSchemeOfCasGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1').reload();
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
           
        var objeto = form.getValues(false, true, false);
        var categorySchemeV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, categorySchemeV1);
        categorySchemeV1.set (objeto);
        
        
         var isParentSchemeOfCas = null;
		 /**var isParentSchemeOfCasGrid = btn.up('window').down('categoryv1grid_ext').getStore();
         if(isParentSchemeOfCasGrid.count()>0){
            isParentSchemeOfCas = [];
            isParentSchemeOfCasGrid.each(function(rec){
            	var scheme = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {});
                scheme.set(categorySchemeV1.data)
                scheme.data.isParentSchemeOfCas=[];
                rec.data.isSubcategoryOfCat=scheme.data;
                isParentSchemeOfCas.push(rec.data);
            });
	     };**/
        
        
        categorySchemeV1.set({
            isParentSchemeOfCas: isParentSchemeOfCas,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var categorySchemeV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.CategorySchemeV1Validation', {});
        var validations = categorySchemeV1Validation.createValidations (categorySchemeV1);
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
        categorySchemeV1.phantom = false;
        categorySchemeV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.AccountingCategoryV1').mostrarWindows(null);
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                    btn.up('window').unmask();
                    btn.setDisabled(false);
                } else {
                    if (operation.error) {
                        crearVentana (operation.error.status, "Error de conexión");
                    }
                    btn.up('window').unmask();
                    btn.setDisabled(false);
                }
            },
            success: function(rec,st){
                btn.setDisabled(false);
                btn.up('window').unmask();
            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
                btn.up('window').unmask();
                crearVentana (5, "Error de conexión");
            }
        });
    },

    mostrarWindows: function(btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryV1');
        var ventana = Ext.widget('categoryschemev1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showIsParentSchemeOfCas: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategoryV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'categoryv1grid_ext',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
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
        var store = ventana.down('grid').getStore();
        store.removeAll ();
        store.filters.clear();
        var data = [];
        var storeData=[];
        if(rec.get('isParentSchemeOfCas')!=null){
            data.push(rec.get('isParentSchemeOfCas'));
            for(var i = 0; i<data[0].length; i++){
                storeData.push(data[0][i]);
            }
            if(data.length==1 && data[0].length===undefined){
                storeData=data[0];
            }
        }
        store.getProxy().data = storeData;
        store.load();
        ventana.show();
    },

    buscar: function(btn) {
       if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.categorySchemeIdentifierCas != "" && paramValues.categorySchemeIdentifierCas != null) {
                var categorySchemeIdentifierCas = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'categorySchemeIdentifierCas',
                    valor: paramValues.categorySchemeIdentifierCas,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(categorySchemeIdentifierCas.data);
            }

            if (paramValues.keyImo != "" && paramValues.keyImo != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
            }

            if (paramValues.categorySchemeNameCas != "" && paramValues.categorySchemeNameCas != null) {
                var categorySchemeNameCas = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'categorySchemeNameCas',
                    valor: paramValues.categorySchemeNameCas+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(categorySchemeNameCas.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('categoryschemev1formsearch').query("field{isValid()==false}");
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
