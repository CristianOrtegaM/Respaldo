Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.AttributeAddIn', {
    extend: 'Ext.app.Controller',
    views: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.AttributeRulesGrid'],
    
    init : function() {
        this.control( {
            'attributerulev1grid button[action=newAttributeEnumeration]' : {
            	click: this.newAttributeEnumeration
            },
            'attributerulev1grid button[action=newAttributeRange]' : {
            	click: this.newAttributeRange
            },
            'attributerulev1grid button[action=editAttribute]' : {
            	click: this.editAttribute
            },
            'attributerulev1grid button[action=deleteAttribute]' : {
            	click: this.deleteAttribute
            }
        });
    },
    newAttributeEnumeration: function(btn){
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeDataValueV1');
    	btn.setDisabled(true);
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1');
        var ventana = Ext.widget('attributeenumerationrulev1principalwindow');
        var record = btn.up('window').down('form').getForm().getRecord();
        
        ventana.show(undefined, function(){
        		ventana.down('#controlledProductSpecificationPrsGrid').getStore().loadRawData(record.raw,false);
        });
        btn.setDisabled(false);
    },
    newAttributeRange: function(btn){
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
    	btn.setDisabled(true);
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1');
        var ventana = Ext.widget('attributerangerulev1principalwindow');
        var record = btn.up('window').down('form').getForm().getRecord();
        
        ventana.show(undefined, function(){
        		ventana.down('#controlledProductSpecificationPrsGrid').getStore().loadRawData(record.raw,false);
        });
        btn.setDisabled(false);
    },
    editAttribute: function(btn){
    	btn.setDisabled(true);
    	if(btn.up('attributerulev1grid').getSelectionModel().getSelection().length>0){
	    	var record = btn.up('attributerulev1grid').getSelectionModel().getSelection()[0];
	    	if(record.get('typeNameImo')=='AttributeEnumerationRule'){
	    		this.editAttributeEnumeration(btn);
	    	} else if(record.get('typeNameImo')=='AttributeRangeRule'){
	    		this.editAttributeRange(btn);
	    	}
    	} else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    editAttributeRange: function(btn){
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV2');
        var seleccion = btn.up('attributerulev1grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('attributerangerulev1principalwindow');
            window.setTitle('Actualizar');
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            window.down('grid[itemId="designerSpeGrid"]').getStore().loadRawData(seleccion[0].get('designerSpe'),true);
            window.down('grid[itemId="controlledProductSpecificationPrsGrid"]').getStore().loadRawData(seleccion[0].get('controlledProductSpecificationPrs'),true);
            window.down('grid[itemId="controlledProductRuleSpecificationPrsGrid"]').getStore().loadRawData(seleccion[0].get('controlledProductRuleSpecificationPrs'),true);
            btn.setDisabled(false);
        }
    },
    editAttributeEnumeration: function(btn){
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV2');
    	AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1');
        AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeDataValueV1');
        var seleccion = btn.up('attributerulev1grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('attributeenumerationrulev1principalwindow');
            window.setTitle('Actualizar');
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            window.down('grid[itemId="designerSpeGrid"]').getStore().loadRawData(seleccion[0].get('designerSpe'),true);
            window.down('grid[itemId="controlledProductSpecificationPrsGrid"]').getStore().loadRawData(seleccion[0].get('controlledProductSpecificationPrs'),true);
            window.down('grid[itemId="controlledProductRuleSpecificationPrsGrid"]').getStore().loadRawData(seleccion[0].get('controlledProductRuleSpecificationPrs'),true);
            window.down('grid[itemId="allowedAttributeValueAerGrid"]').getStore().loadRawData(seleccion[0].get('allowedAttributeValueAer'),true);
            btn.setDisabled(false);
        }
    },
    deleteAttribute: function(btn){
    	btn.setDisabled(true);
    	if(btn.up('attributerulev1grid').getSelectionModel().getSelection().length>0){
	    	var record = btn.up('attributerulev1grid').getSelectionModel().getSelection()[0];
	    	if(record.get('typeNameImo')=='AttributeEnumerationRule'){
	    		this.deleteAttributeEnumeration(btn);
	    	} else if(record.get('typeNameImo')=='AttributeRangeRule'){
	    		this.deleteAttributeRange(btn);
	    	}
    	} else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    deleteAttributeEnumeration: function(btn){
    	var seleccion = btn.up('attributerulev1grid').getSelectionModel().getSelection();
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
                        seleccion[0].destroy ({
                            callback: function (record, operation) {
                                if (operation.success === true) {
                                    var respuesta = Ext.decode(operation.response.responseText);
                                    if (respuesta.valido === true) {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV1').reload();
                                        Ext.ComponentQuery.query('attributerulev1grid')[Ext.ComponentQuery.query('attributerulev1grid').length-1].getStore().reload();
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                    }
                                    btn.setDisabled(false);
                                } else {
                                    if (operation.error) {
                                        crearVentana (operation.error.status, "Error de conexión");
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
        }
    },
    deleteAttributeRange: function(btn){
    	var seleccion = btn.up('attributerulev1grid').getSelectionModel().getSelection();
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
                        seleccion[0].destroy ({
                            callback: function (record, operation) {
                                if (operation.success === true) {
                                    var respuesta = Ext.decode(operation.response.responseText);
                                    if (respuesta.valido === true) {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                        //Ext.StoreMgr.lookup('AFW_FND_Xjs.store.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRule').reload();
                                        btn.up('attributerulev1grid').getStore().reload();
                                    } else {
                                        crearVentana(respuesta.codigo, respuesta.mensaje);
                                    }
                                    btn.setDisabled(false);
                                } else {
                                    if (operation.error) {
                                        crearVentana (operation.error.status, "Error de conexión");
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
        }
    }
});