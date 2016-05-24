Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Validation'
            ],

    init: function() {
        this.control({
            'postaladdressv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'postaladdressv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'postaladdressv1principalwindow button[action=create]': {
                click: this.create
            },
            'postaladdressv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'postaladdressv1grid button[action=edit]': {
                click: this.edit
            },
            'postaladdressv1principalwindow button[action=update]': {
                click: this.update
            },
            'postaladdressv1grid actioncolumn[action=showPostalPostCodePoa]': {
                click: this.showPostalPostCodePoa
            },
            'postaladdressv1grid button[action=mostrarWindows]': {
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
        var identifiedPlacePla = null;
        var identifiedPlacePlaGrid = btn.up('window').down('placev1grid').getStore();
        var postalCountryPoa = null;
        var postalCountryPoaGrid = btn.up('window').down('countryv1grid').getStore();
        var postalCountrySubdivisionPoa = null;
        var postalCountrySubdivisionPoaGrid = btn.up('window').down('countrysubdivisionv1grid').getStore();
        var postalMunicipalityPoa = null;
        var postalMunicipalityPoaGrid = btn.up('window').down('municipalityv1grid').getStore();
        var postalPostCodePoa = null;
        var postalPostCodePoaGrid = btn.up('window').down('postcodev1grid').getStore();
        var includedStreetAddressPoa = null;
        var includedStreetAddressPoaGrid = btn.up('window').down('streetaddressv1grid').getStore();
        if(form.isValid()
        ){
            if(identifiedPlacePlaGrid.count()>0){
                identifiedPlacePla = identifiedPlacePlaGrid.getAt(0).data;
            };
            if(postalCountryPoaGrid.count()>0){
                postalCountryPoa = postalCountryPoaGrid.getAt(0).data;
            };
            if(postalCountrySubdivisionPoaGrid.count()>0){
                postalCountrySubdivisionPoa = postalCountrySubdivisionPoaGrid.getAt(0).data;
            };
            if(postalMunicipalityPoaGrid.count()>0){
                postalMunicipalityPoa = [];
                postalMunicipalityPoaGrid.each(function(rec){
                    postalMunicipalityPoa.push(rec.data);
                });
            };
            if(postalPostCodePoaGrid.count()>0){
                postalPostCodePoa = postalPostCodePoaGrid.getAt(0).data;
            };
            if(includedStreetAddressPoaGrid.count()>0){
                includedStreetAddressPoa = includedStreetAddressPoaGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var postalAddressV1Record =  form.getRecord();
            if (postalAddressV1Record !== undefined 
                && postalAddressV1Record !== null 
                && postalAddressV1Record .get('addressIdentifierAdd')!==null 
                && postalAddressV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(postalAddressV1Record.get('addressIdentifierAdd')).indexOf('PostalAddressV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var postalAddressV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1', {});
                objeto = this.application.getConvertion().convert (objeto, postalAddressV1);
                postalAddressV1.set(objeto);
                postalAddressV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    identifiedPlacePla: identifiedPlacePla,
                    postalCountryPoa: postalCountryPoa,
                    postalCountrySubdivisionPoa: postalCountrySubdivisionPoa,
                    postalMunicipalityPoa: postalMunicipalityPoa,
                    postalPostCodePoa: postalPostCodePoa,
                    includedStreetAddressPoa: includedStreetAddressPoa
                });
                var postalAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Validation', {});
                var validations = postalAddressV1Validation.createValidations (postalAddressV1);
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
                postalAddressV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('postaladdressv1principalwindow');
            window.setTitle('Dirección Postal Nº ' + seleccion[0].get('addressIdentifierAdd'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var postalPostCodePoaGrid = Ext.ComponentQuery.query('#postalPostCodePoaGrid')[0];
            postalPostCodePoaGrid.getStore().loadRawData(seleccion[0].get('postalPostCodePoa')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var identifiedPlacePla = null;
        var identifiedPlacePlaGrid = btn.up('window').down('placev1grid').getStore();
        var postalCountryPoa = null;
        var postalCountryPoaGrid = btn.up('window').down('countryv1grid').getStore();
        var postalCountrySubdivisionPoa = null;
        var postalCountrySubdivisionPoaGrid = btn.up('window').down('countrysubdivisionv1grid').getStore();
        var postalMunicipalityPoa = null;
        var postalMunicipalityPoaGrid = btn.up('window').down('municipalityv1grid').getStore();
        var postalPostCodePoa = null;
        var postalPostCodePoaGrid = btn.up('window').down('postcodev1grid').getStore();
        var includedStreetAddressPoa = null;
        var includedStreetAddressPoaGrid = btn.up('window').down('streetaddressv1grid').getStore();
        if(form.isValid()
        ){
            if(identifiedPlacePlaGrid.count()>0){
                identifiedPlacePla = identifiedPlacePlaGrid.getAt(0).data;
            };
            if(postalCountryPoaGrid.count()>0){
                postalCountryPoa = postalCountryPoaGrid.getAt(0).data;
            };
            if(postalCountrySubdivisionPoaGrid.count()>0){
                postalCountrySubdivisionPoa = postalCountrySubdivisionPoaGrid.getAt(0).data;
            };
            if(postalMunicipalityPoaGrid.count()>0){
                postalMunicipalityPoa = [];
                postalMunicipalityPoaGrid.each(function(rec){
                    postalMunicipalityPoa.push(rec.data);
                });
            };
            if(postalPostCodePoaGrid.count()>0){
                postalPostCodePoa = postalPostCodePoaGrid.getAt(0).data;
            };
            if(includedStreetAddressPoaGrid.count()>0){
                includedStreetAddressPoa = includedStreetAddressPoaGrid.getAt(0).data;
            };
            var objeto = form.getValues(false, true, false);
            var postalAddressV1Record =  form.getRecord();
            if (postalAddressV1Record !== undefined 
                && postalAddressV1Record !== null 
                && postalAddressV1Record .get('addressIdentifierAdd')!==null 
                && postalAddressV1Record .get('addressIdentifierAdd')!==undefined 
                && new String(postalAddressV1Record.get('addressIdentifierAdd')).indexOf('PostalAddressV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var postalAddressV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1', {});
                postalAddressV1.set(objeto);
                postalAddressV1.set({
                    addressIdentifierAdd: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    identifiedPlacePla: identifiedPlacePla,
                    postalCountryPoa: postalCountryPoa,
                    postalCountrySubdivisionPoa: postalCountrySubdivisionPoa,
                    postalMunicipalityPoa: postalMunicipalityPoa,
                    postalPostCodePoa: postalPostCodePoa,
                    includedStreetAddressPoa: includedStreetAddressPoa
                });
                var postalAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Validation', {});
                var validations = postalAddressV1Validation.createValidations (postalAddressV1);
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
                return postalAddressV1;
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1').reload();
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
            var identifiedPlacePla = null;
            var identifiedPlacePlaGrid = btn.up('window').down('placev1grid').getStore();
            if(identifiedPlacePlaGrid.count()>0){
                identifiedPlacePla = identifiedPlacePlaGrid.getAt(0).data;
            };
            var postalCountryPoa = null;
            var postalCountryPoaGrid = btn.up('window').down('countryv1grid').getStore();
            if(postalCountryPoaGrid.count()>0){
                postalCountryPoa = postalCountryPoaGrid.getAt(0).data;
            };
            var postalCountrySubdivisionPoa = null;
            var postalCountrySubdivisionPoaGrid = btn.up('window').down('countrysubdivisionv1grid').getStore();
            if(postalCountrySubdivisionPoaGrid.count()>0){
                postalCountrySubdivisionPoa = postalCountrySubdivisionPoaGrid.getAt(0).data;
            };
            var postalMunicipalityPoa = null;
            var postalMunicipalityPoaGrid = btn.up('window').down('municipalityv1grid').getStore();
            if(postalMunicipalityPoaGrid.count()>0){
                postalMunicipalityPoa = [];
                postalMunicipalityPoaGrid.each(function(rec){
                    postalMunicipalityPoa.push(rec.data);
                });
            };
            var postalPostCodePoa = null;
            var postalPostCodePoaGrid = btn.up('window').down('postcodev1grid').getStore();
            if(postalPostCodePoaGrid.count()>0){
                postalPostCodePoa = postalPostCodePoaGrid.getAt(0).data;
            };
            var includedStreetAddressPoa = null;
            var includedStreetAddressPoaGrid = btn.up('window').down('streetaddressv1grid').getStore();
            if(includedStreetAddressPoaGrid.count()>0){
                includedStreetAddressPoa = includedStreetAddressPoaGrid.getAt(0).data;
            };
        var objeto = form.getValues(false, true, false);
        var postalAddressV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, postalAddressV1);
        postalAddressV1.set (objeto);
        postalAddressV1.set({
            identifiedPlacePla: identifiedPlacePla,
            postalCountryPoa: postalCountryPoa,
            postalCountrySubdivisionPoa: postalCountrySubdivisionPoa,
            postalMunicipalityPoa: postalMunicipalityPoa,
            postalPostCodePoa: postalPostCodePoa,
            includedStreetAddressPoa: includedStreetAddressPoa,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var postalAddressV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Validation', {});
        var validations = postalAddressV1Validation.createValidations (postalAddressV1);
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
        postalAddressV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1');
        var ventana = Ext.widget('postaladdressv1principalwindow');
        ventana.show();
        btn.setDisabled(false);
    },

    showIdentifiedPlacePla: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'placev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
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
        if(rec.get('identifiedPlacePla')!=null){
            data.push(rec.get('identifiedPlacePla'));
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

    showPostalCountryPoa: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'countryv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1',
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
        if(rec.get('postalCountryPoa')!=null){
            data.push(rec.get('postalCountryPoa'));
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

    showPostalCountrySubdivisionPoa: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'countrysubdivisionv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1',
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
        if(rec.get('postalCountrySubdivisionPoa')!=null){
            data.push(rec.get('postalCountrySubdivisionPoa'));
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

    showPostalMunicipalityPoa: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'municipalityv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1',
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
        if(rec.get('postalMunicipalityPoa')!=null){
            data.push(rec.get('postalMunicipalityPoa'));
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

    showPostalPostCodePoa: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'postcodev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1',
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
        if(rec.get('postalPostCodePoa')!=null){
            data.push(rec.get('postalPostCodePoa'));
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

    showIncludedStreetAddressPoa: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'streetaddressv1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1',
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
        if(rec.get('includedStreetAddressPoa')!=null){
            data.push(rec.get('includedStreetAddressPoa'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.addressIdentifierAdd_fs != "" && paramValues.addressIdentifierAdd_fs != null) {
                var addressIdentifierAdd = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'addressIdentifierAdd',
                    valor: paramValues.addressIdentifierAdd_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(addressIdentifierAdd.data);
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

            if (paramValues.buildingNamePoa_fs != "" && paramValues.buildingNamePoa_fs != null) {
                var buildingNamePoa = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'buildingNamePoa',
                    valor: paramValues.buildingNamePoa_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(buildingNamePoa.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('postaladdressv1formsearch').query("field{isValid()==false}");
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
