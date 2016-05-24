Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV2', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV2PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV2FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1Validation'             
            ],

    init: function() {
        this.control({
            'productattributespecificationv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productattributespecificationv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'productattributespecificationv2principalwindow button[action=create]': {
                click: this.create
            },
            'productattributespecificationv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productattributespecificationv1grid button[action=edit]': {
                click: this.edit
            },
            'productattributespecificationv2principalwindow button[action=update]': {
                click: this.update
            },
            'productattributespecificationv1grid button[action=mostrarWindows]': {
                click: this.mostrarWindows
            }
        });
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
        var designerSpe = null;
        var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
        if(form.isValid()
        ){
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
            var objeto = form.getValues(false, true, false);
            var productAttributeSpecificationV1Record =  form.getRecord();
            if (productAttributeSpecificationV1Record !== undefined 
                && productAttributeSpecificationV1Record !== null 
                && productAttributeSpecificationV1Record .get('specificationIdentifierSpe')!==null 
                && productAttributeSpecificationV1Record .get('specificationIdentifierSpe')!==undefined 
                && new String(productAttributeSpecificationV1Record.get('specificationIdentifierSpe')).indexOf('ProductAttributeSpecificationV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productAttributeSpecificationV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1', {});
				objeto = this.application.getConvertion().convert (objeto, productAttributeSpecificationV1);
                productAttributeSpecificationV1.getProxy().setUrl(urlService+'productAttributeSpecificationService');
		   		productAttributeSpecificationV1.getProxy().setAppendId(false);
                productAttributeSpecificationV1.set(objeto);
                productAttributeSpecificationV1.set({
                    specificationIdentifierSpe: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    statusPrs: null,
                    designerSpe: designerSpe,
                    typeNameImo: 'ProductAttributeSpecification'
                });
                var productAttributeSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1Validation', {});
                var validations = productAttributeSpecificationV1Validation.createValidations (productAttributeSpecificationV1);
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
                productAttributeSpecificationV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
//                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1').reload();
                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1', respuesta.data);
								record.getProxy().setUrl(urlService+'productAttributeSpecificationService/'+record.getId());
		   						record.getProxy().setAppendId(false);
                                btn.up('window').down('form').getForm().loadRecord(record);
                               
                                btn.up('window').down('attributerulesgrid').setDisabled(false);
                                if(btn.up('window').down('#attributeRange')){
                                    btn.up('window').down('#attributeRange').fireEvent('loadTitle', btn.up('window').down('#attributeRange'));
                                }
                                if(btn.up('window').down('#attributeEnumeration')){
                                    btn.up('window').down('#attributeEnumeration').fireEvent('loadTitle', btn.up('window').down('#attributeEnumeration'));
                                }
                                if(btn.up('window').down('#attributeCalculation')){
                                    btn.up('window').down('#attributeCalculation').fireEvent('loadTitle', btn.up('window').down('#attributeCalculation'));
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
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');

        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAdd');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.AttributeAddIn');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('productattributespecificationv2principalwindow');
            window.setTitle('Especificación de Atributo Nº ' + seleccion[0].get('specificationIdentifierSpe'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('attributerulesgrid').setDisabled(false);
            if(seleccion[0].data.statusPrs!=null && seleccion[0].data.statusPrs != []){
            	window.down('textfield[name="status"]').setValue(seleccion[0].data.statusPrs.nameSta);
            }
            window.down('button[action=create]').up('toolbar').insert(1,{
            	text: 'Guardar y Cerrar',
            	handler: function(){
            		var createBtn = this.up('toolbar').down('button[action=create]');
            		createBtn.fireEvent('click', createBtn);    
            		this.up('window').close();
            	}
            });
            window.show();
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1').reload();
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
            var designerSpe = null;
            var designerSpeGrid = btn.up('window').down('partyrolev1grid').getStore();
            if(designerSpeGrid.count()>0){
                designerSpe = [];
                designerSpeGrid.each(function(rec){
                    designerSpe.push(rec.data);
                });
            };
        var objeto = form.getValues(false, true, false);
        var productAttributeSpecificationV1 = form.getRecord();
		objeto = this.application.getConvertion().convert (objeto, productAttributeSpecificationV1);
        productAttributeSpecificationV1.set (objeto);
        productAttributeSpecificationV1.set({
            designerSpe: designerSpe,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date(),
            typeNameImo: 'ProductAttributeSpecification'
        });
        var productAttributeSpecificationV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1Validation', {});
        var validations = productAttributeSpecificationV1Validation.createValidations (productAttributeSpecificationV1);
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
        productAttributeSpecificationV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1').reload();
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
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.FormSpecificationAdd');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ConflictAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV2');
		AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.AttributeAddIn');
        var ventana = Ext.widget('productattributespecificationv2principalwindow');
        ventana.down('button[action=create]').up('toolbar').insert(1,{
        	text: 'Guardar y Cerrar',
        	handler: function(){
        		var createBtn = this.up('toolbar').down('button[action=create]');
        		createBtn.fireEvent('click', createBtn);    
        		if(this.up('window').down('form').getForm().isValid())
        			this.up('window').close();
        	}
        });
        ventana.show();
        btn.setDisabled(false);
    },

    showStatusPrs: function(grid, rowIndex,colIndex, item, e, rec){
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'productspecificationstatusv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
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
        if(rec.get('statusPrs')!=null){
            data.push(rec.get('statusPrs'));
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

    showDesignerSpe: function(grid, rowIndex,colIndex, item, e, rec){
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partyrolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
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
        if(rec.get('designerSpe')!=null){
            data.push(rec.get('designerSpe'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductAttributeSpecificationV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);;
            var paramValues =  btn.up('form').getValues(false, true, false);
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.specificationIdentifierSpe_fs != "" && paramValues.specificationIdentifierSpe_fs != null) {
                var specificationIdentifierSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'specificationIdentifierSpe',
                    valor: paramValues.specificationIdentifierSpe_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(specificationIdentifierSpe.data);
            }

            if (paramValues.typeNameImo_fs != "" && paramValues.typeNameImo_fs != null) {
                var typeNameImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'typeNameImo',
                    valor: paramValues.typeNameImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(typeNameImo.data);
            }

            if (paramValues.kindOfElementNameSpe_fs != "" && paramValues.kindOfElementNameSpe_fs != null) {
                var kindOfElementNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'kindOfElementNameSpe',
                    valor: paramValues.kindOfElementNameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(kindOfElementNameSpe.data);
            }

            if (paramValues.versionSpe_fs != "" && paramValues.versionSpe_fs != null) {
                var versionSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'versionSpe',
                    valor: paramValues.versionSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(versionSpe.data);
            }

            if (paramValues.productExternalCodePrs_fs != "" && paramValues.productExternalCodePrs_fs != null) {
                var productExternalCodePrs = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'productExternalCodePrs',
                    valor: paramValues.productExternalCodePrs_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(productExternalCodePrs.data);
            }

            if (paramValues.nameSpe_fs != "" && paramValues.nameSpe_fs != null) {
                var nameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameSpe',
                    valor: paramValues.nameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameSpe.data);
            }

            if (paramValues.shortNameSpe_fs != "" && paramValues.shortNameSpe_fs != null) {
                var shortNameSpe = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'shortNameSpe',
                    valor: paramValues.shortNameSpe_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(shortNameSpe.data);
            }

            store.pageSize=15;
            if(filtro.length>0)
                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                store.currentPage=1;
                store.load(function(records, operation, success) {
                    btn.setDisabled(false);
                });
        } else {
            invalidFields = btn.up('viewport').down('productattributespecificationv1formsearch').query("field{isValid()==false}");
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
