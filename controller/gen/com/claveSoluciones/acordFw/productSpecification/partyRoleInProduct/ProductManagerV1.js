Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1Validation'
            ],

    init: function() {
        this.control({
            'productmanagerv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'productmanagerv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'productmanagerv1principalwindow button[action=create]': {
                click: this.create
            },
            'productmanagerv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'productmanagerv1grid button[action=edit]': {
                click: this.edit
            },
            'productmanagerv1principalwindow button[action=update]': {
                click: this.update
            },
            'productmanagerv1grid actioncolumn[action=showPlayerRoleRol]': {
                click: this.showPlayerRoleRol
            },
            'productmanagerv1grid actioncolumn[action=showRoleRol]': {
                click: this.showRoleRol
            },
            'productmanagerv1grid actioncolumn[action=showPlayerPartyPar]': {
                click: this.showPlayerPartyPar
            },
            'productmanagerv1grid actioncolumn[action=showNamePar]': {
                click: this.showNamePar
            },
            'productmanagerv1grid actioncolumn[action=showDesignedSpecificationPar]': {
                click: this.showDesignedSpecificationPar
            },
            'productmanagerv1grid actioncolumn[action=showOwnedCapabilityPar]': {
                click: this.showOwnedCapabilityPar
            },
            'productmanagerv1grid actioncolumn[action=showInvolvingProductSpecificationRpr]': {
                click: this.showInvolvingProductSpecificationRpr
            },
            'productmanagerv1grid button[action=mostrarWindows]': {
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
        var playerRoleRol = null;
        var playerRoleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var roleRol = null;
        var roleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var playerPartyPar = null;
        var playerPartyParGrid = btn.up('window').down('partyv1grid').getStore();
        var namePar = null;
        var nameParGrid = btn.up('window').down('partynamev1grid').getStore();
        var designedSpecificationPar = null;
        var designedSpecificationParGrid = btn.up('window').down('specificationv1grid').getStore();
        var ownedCapabilityPar = null;
        var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid').getStore();
        var involvingProductSpecificationRpr = null;
        var involvingProductSpecificationRprGrid = btn.up('window').down('productspecificationv1grid').getStore();
        if(form.isValid()
            && playerRoleRolGrid.count()>0
            && roleRolGrid.count()>0
            && playerPartyParGrid.count()>0
            && nameParGrid.count()>0
            && designedSpecificationParGrid.count()>0
        ){
            if(playerRoleRolGrid.count()>0){
                playerRoleRol = playerRoleRolGrid.getAt(0).data;
            };
            if(roleRolGrid.count()>0){
                roleRol = [];
                roleRolGrid.each(function(rec){
                    roleRol.push(rec.data);
                });
            };
            if(playerPartyParGrid.count()>0){
                playerPartyPar = playerPartyParGrid.getAt(0).data;
            };
            if(nameParGrid.count()>0){
                namePar = nameParGrid.getAt(0).data;
            };
            if(designedSpecificationParGrid.count()>0){
                designedSpecificationPar = [];
                designedSpecificationParGrid.each(function(rec){
                    designedSpecificationPar.push(rec.data);
                });
            };
            if(ownedCapabilityParGrid.count()>0){
                ownedCapabilityPar = [];
                ownedCapabilityParGrid.each(function(rec){
                    ownedCapabilityPar.push(rec.data);
                });
            };
            if(involvingProductSpecificationRprGrid.count()>0){
                involvingProductSpecificationRpr = involvingProductSpecificationRprGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productManagerV1Record =  form.getRecord();
            if (productManagerV1Record !== undefined 
                && productManagerV1Record !== null 
                && productManagerV1Record .get('roleIdentifierRol')!==null 
                && productManagerV1Record .get('roleIdentifierRol')!==undefined 
                && new String(productManagerV1Record.get('roleIdentifierRol')).indexOf('ProductManagerV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productManagerV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1', {});
                objeto = this.application.getConvertion().convert (objeto, productManagerV1);
                productManagerV1.set(objeto);
                productManagerV1.set({
                    roleIdentifierRol: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    playerRoleRol: playerRoleRol,
                    roleRol: roleRol,
                    playerPartyPar: playerPartyPar,
                    namePar: namePar,
                    designedSpecificationPar: designedSpecificationPar,
                    ownedCapabilityPar: ownedCapabilityPar,
                    involvingProductSpecificationRpr: involvingProductSpecificationRpr
                });
                var productManagerV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1Validation', {});
                var validations = productManagerV1Validation.createValidations (productManagerV1);
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
                productManagerV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1').reload();
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
            if(playerRoleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerRoleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(roleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#roleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(playerPartyParGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerPartyParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(nameParGrid.count()==0){
                var label = btn.up('window').down('form').down('#nameParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(designedSpecificationParGrid.count()==0){
                var label = btn.up('window').down('form').down('#designedSpecificationParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('productmanagerv1principalwindow');
            window.setTitle('Especificación de Product Manager Nº ' + seleccion[0].get('roleIdentifierRol'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var playerRoleRolGrid = Ext.ComponentQuery.query('#playerRoleRolGrid')[0];
            playerRoleRolGrid.getStore().loadRawData(seleccion[0].get('playerRoleRol')[0], true);
            var roleRolGrid = Ext.ComponentQuery.query('#roleRolGrid')[0];
            roleRolGrid.getStore().loadRawData(seleccion[0].get('roleRol')[0], true);
            var playerPartyParGrid = Ext.ComponentQuery.query('#playerPartyParGrid')[0];
            playerPartyParGrid.getStore().loadRawData(seleccion[0].get('playerPartyPar')[0], true);
            var nameParGrid = Ext.ComponentQuery.query('#nameParGrid')[0];
            nameParGrid.getStore().loadRawData(seleccion[0].get('namePar')[0], true);
            var designedSpecificationParGrid = Ext.ComponentQuery.query('#designedSpecificationParGrid')[0];
            designedSpecificationParGrid.getStore().loadRawData(seleccion[0].get('designedSpecificationPar')[0], true);
            var ownedCapabilityParGrid = Ext.ComponentQuery.query('#ownedCapabilityParGrid')[0];
            ownedCapabilityParGrid.getStore().loadRawData(seleccion[0].get('ownedCapabilityPar')[0], true);
            var involvingProductSpecificationRprGrid = Ext.ComponentQuery.query('#involvingProductSpecificationRprGrid')[0];
            involvingProductSpecificationRprGrid.getStore().loadRawData(seleccion[0].get('involvingProductSpecificationRpr')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var playerRoleRol = null;
        var playerRoleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var roleRol = null;
        var roleRolGrid = btn.up('window').down('rolev1grid').getStore();
        var playerPartyPar = null;
        var playerPartyParGrid = btn.up('window').down('partyv1grid').getStore();
        var namePar = null;
        var nameParGrid = btn.up('window').down('partynamev1grid').getStore();
        var designedSpecificationPar = null;
        var designedSpecificationParGrid = btn.up('window').down('specificationv1grid').getStore();
        var ownedCapabilityPar = null;
        var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid').getStore();
        var involvingProductSpecificationRpr = null;
        var involvingProductSpecificationRprGrid = btn.up('window').down('productspecificationv1grid').getStore();
        if(form.isValid()
            && playerRoleRolGrid.count()>0
            && roleRolGrid.count()>0
            && playerPartyParGrid.count()>0
            && nameParGrid.count()>0
            && designedSpecificationParGrid.count()>0
        ){
            if(playerRoleRolGrid.count()>0){
                playerRoleRol = playerRoleRolGrid.getAt(0).data;
            };
            if(roleRolGrid.count()>0){
                roleRol = [];
                roleRolGrid.each(function(rec){
                    roleRol.push(rec.data);
                });
            };
            if(playerPartyParGrid.count()>0){
                playerPartyPar = playerPartyParGrid.getAt(0).data;
            };
            if(nameParGrid.count()>0){
                namePar = nameParGrid.getAt(0).data;
            };
            if(designedSpecificationParGrid.count()>0){
                designedSpecificationPar = [];
                designedSpecificationParGrid.each(function(rec){
                    designedSpecificationPar.push(rec.data);
                });
            };
            if(ownedCapabilityParGrid.count()>0){
                ownedCapabilityPar = [];
                ownedCapabilityParGrid.each(function(rec){
                    ownedCapabilityPar.push(rec.data);
                });
            };
            if(involvingProductSpecificationRprGrid.count()>0){
                involvingProductSpecificationRpr = involvingProductSpecificationRprGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, false, false);
            var productManagerV1Record =  form.getRecord();
            if (productManagerV1Record !== undefined 
                && productManagerV1Record !== null 
                && productManagerV1Record .get('roleIdentifierRol')!==null 
                && productManagerV1Record .get('roleIdentifierRol')!==undefined 
                && new String(productManagerV1Record.get('roleIdentifierRol')).indexOf('ProductManagerV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var productManagerV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1', {});
                productManagerV1.set(objeto);
                productManagerV1.set({
                    roleIdentifierRol: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    playerRoleRol: playerRoleRol,
                    roleRol: roleRol,
                    playerPartyPar: playerPartyPar,
                    namePar: namePar,
                    designedSpecificationPar: designedSpecificationPar,
                    ownedCapabilityPar: ownedCapabilityPar,
                    involvingProductSpecificationRpr: involvingProductSpecificationRpr
                });
                var productManagerV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1Validation', {});
                var validations = productManagerV1Validation.createValidations (productManagerV1);
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
                return productManagerV1;
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
            if(playerRoleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerRoleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(roleRolGrid.count()==0){
                var label = btn.up('window').down('form').down('#roleRolGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(playerPartyParGrid.count()==0){
                var label = btn.up('window').down('form').down('#playerPartyParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(nameParGrid.count()==0){
                var label = btn.up('window').down('form').down('#nameParGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            if(designedSpecificationParGrid.count()==0){
                var label = btn.up('window').down('form').down('#designedSpecificationParGrid').up('panel').previousNode().prev();
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1').reload();
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
            var playerRoleRol = null;
            var playerRoleRolGrid = btn.up('window').down('rolev1grid').getStore();
            if(playerRoleRolGrid.count()>0){
                playerRoleRol = playerRoleRolGrid.getAt(0).data;
            };
            var roleRol = null;
            var roleRolGrid = btn.up('window').down('rolev1grid').getStore();
            if(roleRolGrid.count()>0){
                roleRol = [];
                roleRolGrid.each(function(rec){
                    roleRol.push(rec.data);
                });
            };
            var playerPartyPar = null;
            var playerPartyParGrid = btn.up('window').down('partyv1grid').getStore();
            if(playerPartyParGrid.count()>0){
                playerPartyPar = playerPartyParGrid.getAt(0).data;
            };
            var namePar = null;
            var nameParGrid = btn.up('window').down('partynamev1grid').getStore();
            if(nameParGrid.count()>0){
                namePar = nameParGrid.getAt(0).data;
            };
            var designedSpecificationPar = null;
            var designedSpecificationParGrid = btn.up('window').down('specificationv1grid').getStore();
            if(designedSpecificationParGrid.count()>0){
                designedSpecificationPar = [];
                designedSpecificationParGrid.each(function(rec){
                    designedSpecificationPar.push(rec.data);
                });
            };
            var ownedCapabilityPar = null;
            var ownedCapabilityParGrid = btn.up('window').down('capabilityv1grid').getStore();
            if(ownedCapabilityParGrid.count()>0){
                ownedCapabilityPar = [];
                ownedCapabilityParGrid.each(function(rec){
                    ownedCapabilityPar.push(rec.data);
                });
            };
            var involvingProductSpecificationRpr = null;
            var involvingProductSpecificationRprGrid = btn.up('window').down('productspecificationv1grid').getStore();
            if(involvingProductSpecificationRprGrid.count()>0){
                involvingProductSpecificationRpr = involvingProductSpecificationRprGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, false, false);
        var productManagerV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, productManagerV1);
        productManagerV1.set (objeto);
        productManagerV1.set({
            playerRoleRol: playerRoleRol,
            roleRol: roleRol,
            playerPartyPar: playerPartyPar,
            namePar: namePar,
            designedSpecificationPar: designedSpecificationPar,
            ownedCapabilityPar: ownedCapabilityPar,
            involvingProductSpecificationRpr: involvingProductSpecificationRpr,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var productManagerV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1Validation', {});
        var validations = productManagerV1Validation.createValidations (productManagerV1);
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
        productManagerV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var ventana = Ext.widget('productmanagerv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showPlayerRoleRol: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'rolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
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
        if(rec.get('playerRoleRol')!=null){
            data.push(rec.get('playerRoleRol'));
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

    showRoleRol: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'rolev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
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
        if(rec.get('roleRol')!=null){
            data.push(rec.get('roleRol'));
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

    showPlayerPartyPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PartyV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partyv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
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
        if(rec.get('playerPartyPar')!=null){
            data.push(rec.get('playerPartyPar'));
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

    showNamePar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'partynamev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',
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
        if(rec.get('namePar')!=null){
            data.push(rec.get('namePar'));
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

    showDesignedSpecificationPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'specificationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1',
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
        if(rec.get('designedSpecificationPar')!=null){
            data.push(rec.get('designedSpecificationPar'));
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

    showOwnedCapabilityPar: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'capabilityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
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
        if(rec.get('ownedCapabilityPar')!=null){
            data.push(rec.get('ownedCapabilityPar'));
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

    showInvolvingProductSpecificationRpr: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV2');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'productspecificationv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
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
        if(rec.get('involvingProductSpecificationRpr')!=null){
            data.push(rec.get('involvingProductSpecificationRpr'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.roleIdentifierRol_fs != "" && paramValues.roleIdentifierRol_fs != null) {
                var roleIdentifierRol = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'roleIdentifierRol',
                    valor: paramValues.roleIdentifierRol_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(roleIdentifierRol.data);
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

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('productmanagerv1formsearch').query("field{isValid()==false}");
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
