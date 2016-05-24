Ext.define('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.PersonV1', {
    extend: 'Ext.app.Controller',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1'],

    views:  [
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1PrincipalForm',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1PrincipalWindow',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1FormSearch',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1FormInput',
             'AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.PersonV1Validation'
            ],

    init: function() {
        this.control({
            'personv1formsearch button[action=buscar]': {
                click: this.buscar
            },
            'personv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'personv1principalwindow button[action=create]': {
                click: this.create
            },
            'personv1grid button[action=delete]': {
                click: this.deleteElement
            },
            'personv1grid button[action=edit]': {
                click: this.edit
            },
            'personv1principalwindow button[action=update]': {
                click: this.update
            },
            'personv1grid actioncolumn[action=showNamePer]': {
                click: this.showNamePer
            },
            'personv1grid button[action=mostrarWindows]': {
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
        var namePer = null;
        var namePerGrid = btn.up('window').down('personnamev1grid').getStore();
        if(form.isValid()
            && namePerGrid.count()>0
        ){
            if(namePerGrid.count()>0){
                namePer = [];
                namePerGrid.each(function(rec){
                    namePer.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var personV1Record =  form.getRecord();
            if (personV1Record !== undefined 
                && personV1Record !== null 
                && personV1Record .get('partyIdentifierPar')!==null 
                && personV1Record .get('partyIdentifierPar')!==undefined 
                && new String(personV1Record.get('partyIdentifierPar')).indexOf('PersonV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var personV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1', {});
                objeto = this.application.getConvertion().convert (objeto, personV1);
                personV1.set(objeto);
                personV1.set({
                    partyIdentifierPar: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    namePer: namePer
                });
                var personV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.PersonV1Validation', {});
                var validations = personV1Validation.createValidations (personV1);
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
                personV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1').reload();
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
            if(namePerGrid.count()==0){
                var label = btn.up('window').down('form').down('#namePerGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            btn.setDisabled(false);
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('personv1principalwindow');
            window.setTitle('Persona Nº ' + seleccion[0].get('partyIdentifierPar'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var namePerGrid = Ext.ComponentQuery.query('#namePerGrid')[0];
            namePerGrid.getStore().loadRawData(seleccion[0].get('namePer')[0], true);
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },

    createRecord: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var namePer = null;
        var namePerGrid = btn.up('window').down('personnamev1grid').getStore();
        if(form.isValid()
            && namePerGrid.count()>0
        ){
            if(namePerGrid.count()>0){
                namePer = [];
                namePerGrid.each(function(rec){
                    namePer.push(rec.data);
                });
            };
            var objeto = form.getValues(false, false, false);
            var personV1Record =  form.getRecord();
            if (personV1Record !== undefined 
                && personV1Record !== null 
                && personV1Record .get('partyIdentifierPar')!==null 
                && personV1Record .get('partyIdentifierPar')!==undefined 
                && new String(personV1Record.get('partyIdentifierPar')).indexOf('PersonV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var personV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1', {});
                personV1.set(objeto);
                personV1.set({
                    partyIdentifierPar: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    namePer: namePer
                });
                var personV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.PersonV1Validation', {});
                var validations = personV1Validation.createValidations (personV1);
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
                return personV1;
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
            if(namePerGrid.count()==0){
                var label = btn.up('window').down('form').down('#namePerGrid').up('panel').previousNode().prev();
                msg += '<b>- '+label.text+'</b>. No puede estar vacío.<br/>';
            }
            crearVentana(5,msg);
            return false;
        }
    },

    edit: function (btn) {
        btn.setDisabled(true);
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1');
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('personv1principalwindow');
            window.setTitle('Persona Nº ' + seleccion[0].get('partyIdentifierPar'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            var namePerGrid = Ext.ComponentQuery.query('#namePerGrid')[0];
            namePerGrid.getStore().loadRawData(seleccion[0].get('namePer')[0], true);
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
                                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1').reload();
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
            var namePer = null;
            var namePerGrid = btn.up('window').down('personnamev1grid').getStore();
            if(namePerGrid.count()>0){
                namePer = [];
                namePerGrid.each(function(rec){
                    namePer.push(rec.data);
                });
            };
        var objeto = form.getValues(false, false, false);
        var personV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, personV1);
        personV1.set (objeto);
        personV1.set({
            namePer: namePer,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var personV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.PersonV1Validation', {});
        var validations = personV1Validation.createValidations (personV1);
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
        personV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1').reload();
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
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1');
        var ventana = Ext.widget('personv1principalwindow');
        var personV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1', {
            maritalStatusCodePer: 'Single'
        });
        var form = ventana.down('form').getForm();
        form.loadRecord(personV1);
        ventana.show();
        btn.setDisabled(false);
    },

    showNamePer: function(grid, rowIndex,colIndex, item, e, rec){
        this.application.loadController('AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1');
        var ventana = Ext.create('Ext.window.Window',{
            width : 850,
            title : grid.headerCt.items.items[item].text,
            modal : true,
            items : [{
                xtype : 'personnamev1grid',
                store: new Ext.data.Store({
                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1',
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
        if(rec.get('namePer')!=null){
            data.push(rec.get('namePer'));
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
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.partyIdentifierPar_fs != "" && paramValues.partyIdentifierPar_fs != null) {
                var partyIdentifierPar = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'partyIdentifierPar',
                    valor: paramValues.partyIdentifierPar_fs,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(partyIdentifierPar.data);
            }

            if (paramValues.keyImo_fs != "" && paramValues.keyImo_fs != null) {
                var keyImo = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'keyImo',
                    valor: paramValues.keyImo_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(keyImo.data);
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

            if (paramValues.genderCodePer_fs != "" && paramValues.genderCodePer_fs != null) {
                var genderCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'genderCodePer',
                    valor: paramValues.genderCodePer_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.GenderCodeList'
                });
                filtro.push(genderCodePer.data);
            }

            if (paramValues.ethnicityCodePer_fs != "" && paramValues.ethnicityCodePer_fs != null) {
                var ethnicityCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'ethnicityCodePer',
                    valor: paramValues.ethnicityCodePer_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.party.partyCodeLists.EthnicityCodeList'
                });
                filtro.push(ethnicityCodePer.data);
            }

            if (paramValues.bloodTypeCodePer_fs != "" && paramValues.bloodTypeCodePer_fs != null) {
                var bloodTypeCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'bloodTypeCodePer',
                    valor: paramValues.bloodTypeCodePer_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.party.partyCodeLists.BloodTypeCodeList'
                });
                filtro.push(bloodTypeCodePer.data);
            }

            if (paramValues.maritalStatusCodePer_fs != "" && paramValues.maritalStatusCodePer_fs != null) {
                var maritalStatusCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'maritalStatusCodePer',
                    valor: paramValues.maritalStatusCodePer_fs,
                    tipoValor: 'enum',
                    operacion: '=',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.party.partyCodeLists.MaritalStatusCodeList'
                });
                filtro.push(maritalStatusCodePer.data);
            }

            if (paramValues.primaryLanguageExternalCodePer_fs != "" && paramValues.primaryLanguageExternalCodePer_fs != null) {
                var primaryLanguageExternalCodePer = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'primaryLanguageExternalCodePer',
                    valor: paramValues.primaryLanguageExternalCodePer_fs+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(primaryLanguageExternalCodePer.data);
            }

            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('personv1formsearch').query("field{isValid()==false}");
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
