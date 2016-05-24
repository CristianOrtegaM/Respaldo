Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.ProductGroupV1', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.ProductGroupV1',
    requires: ['AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.category.ProductGroupV1'],
    //models: ['AFW_FND_Xjs.model.com.ext.claveSoluciones.acordFw.contactAndPlace.PlaceNode'],
    stores: ['AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryNode'],
    views: [
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.ProductGroupV1PrincipalForm',
        'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1PrincipalWindow',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.HeterogeneousTree',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.ContextMenu'
    ],
    init: function() {
        var me = this;
        this.control({
            'productgroupv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productgroupv1principalwindow button[action=create]': {
                click: this.create
            },
            'productgroupv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productgroupv1grid button[action=edit]': {
                click: this.edit
            },
            'productgroupv1principalwindow button[action=update]': {
                click: this.update
            },
            'heterogeneoustree': {
                loadTree: me.mostrarWindows,
                itemcontextmenu: me.showContextMenu
            },
            'listsContextMenu menuitem': {
                click: me.showSeleccionarAsociacion
            },
            /**'#asociacion button[action=asociarLugar]': {
                click: this.asociarLugar
            },**/
            'viewport': {
                refreshTreePanel: this.refreshTreePanel
            },
            'productgroupv1principalwindow button[action=create]': {
                click: this.create
            },
            'productgroupv1principalform_ext button[action=nuevo]':{
            	click: this.mostrarNuevo
            }
        });
    },
    refs: [
        {
            ref: 'heterogeneoustree',
            selector: 'heterogeneoustree'
        },
        {
            ref: 'contextMenu',
            selector: 'listsContextMenu',
            xtype: 'listsContextMenu',
            autoCreate: true
        }
    ],
   	
    mostrarWindows: function(btn) {
        var me = this;
        var storeplacenode = Ext.getStore('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryNode');

        var tree = me.getHeterogeneoustree();
        var root = new Ext.data.TreeModel();
        root.set({
            idTree: 'root',
            id: 'root',
            name: 'root',
            expanded: true,
            loaded: true
        });
        tree.getStore().setRoot(root);
        tree.getStore().sync();

        storeplacenode.load({
            callback: function(records, operation, success) {
                if (records !== null && records !== undefined) {
                    var n = records.length,
                            i = 0;
                    for (; i < n; i += 1) {
                        records[i].expanded = true;
                        records[i].loaded = true;
                        //records[i].leaf = false;
                        tree.getStore().getRoot().appendChild(records[i]).expand(true);
                    }
                    tree.getStore().sync();
                    //tree.refreshView();
                }
            }
        });
    },
    showContextMenu: function(view, record, node, rowIndex, e) {
        var global = this;
        var contextMenu = global.getContextMenu(),
		newAgregaCategoria = contextMenu.down('#agrega_categoria');
        newAgregaEsquema = contextMenu.down('#agrega_esquema');
        
        /**newAsociarCiudad = contextMenu.down('#asociar_ciudad'),
        newAsociarProvincia = contextMenu.down('#asociar_provincia'),
        newAsociarComuna = contextMenu.down('#asociar_comuna'),
        newAsociarCodigoPostal = contextMenu.down('#asociar_codigopostal');**/
        newEliminar = contextMenu.down('#eliminar');
        

        //Categoría
        if (record.data.type === 'category') {
        	newAgregaCategoria.hide();
        	if(record.data.children == null || record.data.children.length == 0){
        		newAgregaEsquema.show();
        		newEliminar.show();
        	}else{
        		newAgregaEsquema.hide();
        		newEliminar.hide();
        	}
        }
        //Esquema
        else if (record.data.type === 'categoryScheme') {
        	newAgregaCategoria.show();
        	newAgregaEsquema.hide();
        	if(record.data.children == null || record.data.children.length == 0){
        		newEliminar.show();
        	}else{
        		newEliminar.hide();
        	}
        }
        
        contextMenu.setCountry(record);
        contextMenu.showAt(e.getX(), e.getY());
        e.preventDefault();
    },
    showSeleccionarAsociacion: function(component, e) {
        var me = this;
        var contextMenu = me.getContextMenu();
        var dato = contextMenu.getCountry();
        var categoryNode = dato.getData();       
        
        if (component.action === 'eliminar') {
        	if(categoryNode.type == 'category'){
            	var categoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', categoryNode.categoria);
            	me.deleteItem(categoria,'Categoría');
            }else{
            	var esquemaCategoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', categoryNode.esquemaCategoria);
            	me.deleteItem(esquemaCategoria,'Esquema');
        	}        	
        } else {
            if (component.itemId === 'agrega_categoria') {
                var categoriaPadre = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', categoryNode.categoria);
                var categoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', null);
            	var esquemaCategoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', categoryNode.esquemaCategoria);
            	var isSubschemeOfCas = [];
                	isSubschemeOfCas.push(categoriaPadre.getData());
                esquemaCategoria.setIsSubschemeOfCas(isSubschemeOfCas);
            	categoria.setIsSubcategoryOfCat(esquemaCategoria.getData());
            	var window = Ext.widget('productgroupv1principalwindow');
                window.down('form').getForm().loadRecord(categoria);
                window.down('form').down('#jerarquia').setValue(categoryNode.jerarquia);
                window.show();
            } else if (component.itemId === 'agrega_esquema') {
            	var categoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', categoryNode.categoria);
            	var esquemaCategoriaPadre = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', categoryNode.esquemaCategoria);
            	var esquemaCategoria = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', null);
            	if(categoryNode.esquemaCategoria == null){
                    categoria.setIsSubcategoryOfCat(null);
            	}else{
            	    categoria.setIsSubcategoryOfCat(esquemaCategoriaPadre.getData());
            	}
            	esquemaCategoria.setIsSubschemeOfCas(categoria.getData());
            	var window = Ext.widget('categoryschemev1principalwindow');
                window.down('form').getForm().loadRecord(esquemaCategoria);
                window.show();           
            }
        }
    },
    refreshTreePanel: function() {
        this.mostrarWindows(null);
    },
    
    deleteItem: function (item, type){
    	var me = this;
    	Ext.MessageBox.show({
            title: 'Confirmar',
            msg: '¿Está seguro de eliminar '+type+'?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(rec){
                if( rec === "yes"){
                	item.set({
                        updateUserImo : usuario.get('userName'),
                        updateDateTimeImo : new Date()
                    });
                	item.phantom = false;
                    item.erase ({
                        callback: function (record, operation) {
                            if (operation.success === true) {
                            	if(operation._response == null){
                            		me.deleteItem(item, type);
                            	}else{
	                                var respuesta = Ext.decode(operation._response.responseText);
	                                if (respuesta.valido === true) {
	                                    crearVentana(respuesta.codigo, respuesta.mensaje);
	                                    me.mostrarWindows(null);
	                                } else {
	                                    crearVentana(respuesta.codigo, respuesta.mensaje);
	                                }
                                }
                                //btn.setDisabled(false);
                            } else {
                                if (operation.error) {
                                    crearVentana (5, "Error de conexión");
                                    //btn.setDisabled(false);
                                }
                            }
                        },
                        success: function(rec,st){
                            //btn.setDisabled(false);
                        },
                        failure: function(rec,st,a,b,c){
                            //btn.setDisabled(false);
                        }
                    });
                } else {
                    //btn.setDisabled(false);
                }
            }
        });
    	
    	
    },
    create: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var form = btn.up('window').down('form').getForm();
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var productGroupV1Record =  form.getRecord();
            if (productGroupV1Record !== undefined 
                && productGroupV1Record !== null 
                && productGroupV1Record .get('categoryIdentifierCat')!==null 
                && productGroupV1Record .get('categoryIdentifierCat')!==undefined 
                && new String(productGroupV1Record.get('categoryIdentifierCat')).indexOf('ProductGroupV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productGroupV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', {});
                objeto = this.application.getConvertion().convert (objeto, productGroupV1);
                if (productGroupV1Record !== undefined && productGroupV1Record !== null){
                	productGroupV1.set(productGroupV1Record.getData());
                }
                if(btn.up('window').down('form').down('#jerarquia').getValue().length > 0)
                	objeto.keyImo = btn.up('window').down('form').down('#jerarquia').getValue()+"::"+objeto.keyImo;
                productGroupV1.set(objeto);
                productGroupV1.set({
                    categoryIdentifierCat: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                    
                });
                var productGroupV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.ProductGroupV1Validation', {});
                var validations = productGroupV1Validation.createValidations (productGroupV1);
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
                //productGroupV1.phantom = false;
                productGroupV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
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
                        me.mostrarWindows(null);
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
    update: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var form = btn.up('window').down('form').getForm();
        var objeto = form.getValues(false, true, false);
        var productGroupV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, productGroupV1);
        if(btn.up('window').down('form').down('#jerarquia').getValue().length > 0)
        	objeto.keyImo = btn.up('window').down('form').down('#jerarquia').getValue()+"::"+objeto.keyImo;
        productGroupV1.set (objeto);
        productGroupV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var productGroupV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.category.ProductGroupV1Validation', {});
        var validations = productGroupV1Validation.createValidations (productGroupV1);
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
        productGroupV1.phantom = false;
        productGroupV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        me.mostrarWindows(null);
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
    
    mostrarNuevo: function(btn) {
        btn.setDisabled(true);
        var ventana = Ext.widget('productgroupv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

});