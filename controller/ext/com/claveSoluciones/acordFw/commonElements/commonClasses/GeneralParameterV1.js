Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1',

    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1'],

    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1'],

    views:  [
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1PrincipalForm',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1PrincipalWindow',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1FormSearch',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1FormInput',
             'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Grid',
             'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Validation'
            ],

    init: function() {
        this.control({
            'generalparameterv1formsearch_ext button[action=buscar]': {
                click: this.buscar
            },
            'generalparameterv1grid button[action=confirmarAccion]': {
                click: this.confirmarAccion
            },
            'generalparameterv1principalwindow_ext button[action=create]': {
                click: this.create
            },
            'generalparameterv1grid_ext button[action=delete]': {
                click: this.deleteElement
            },
            'generalparameterv1grid_ext button[action=edit]': {
                click: this.edit
            },
            'generalparameterv1principalwindow_ext button[action=update]': {
                click: this.update
            },
            'generalparameterv1grid_ext button[action=mostrarWindows]': {
                click: this.mostrarWindows
            }
        });
    },
    
    mostrarWindows: function(btn) {
        btn.setDisabled(true);
        var ventana = Ext.widget('generalparameterv1principalwindow_ext');
        ventana.show();
        btn.setDisabled(false);
    },
    
    edit: function (btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('generalparameterv1principalwindow_ext');
            window.setTitle('Parámetro General Nº ' + seleccion[0].get('generalParameterIdentifierGep'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="codeGep"]').setReadOnly(true);
            window.down('combo[name="dataTypeGep"]').setReadOnly(true);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    
    update: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var objeto = form.getValues(false, true, false);
        var generalParameterV1 = form.getRecord();
        objeto = this.application.getConvertion().convert (objeto, generalParameterV1);
        generalParameterV1.set (objeto);
        generalParameterV1.set({
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });
        var generalParameterV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Validation', {});
        var validations = generalParameterV1Validation.createValidations (generalParameterV1);
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
        generalParameterV1.save ({
            callback: function (record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    btn.up('window').unmask();
                    if (respuesta.valido === true) {
                        btn.up('window').close();
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                        Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1').reload();
                    } else {
                        crearVentana(respuesta.codigo, respuesta.mensaje);
                    }
                    btn.setDisabled(false);
                } else {
                    if (operation.error) {
                        crearVentana (operation.error.status, "Error de conexión");
                    }
                    btn.up('window').unmask();
                }
            },
            success: function(rec,st){
                btn.setDisabled(false);
                btn.up('window').unmask();
            },
            failure: function(rec,st,a,b,c){
                btn.setDisabled(false);
                btn.up('window').unmask();
                crearVentana(5, "Error de conexión");
            }
        });
    },
    
    buscar: function(btn) {
        if(btn.up('form').getForm().isValid()){
            btn.setDisabled(true);
            var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1');
            store.removeAll ();
            store.filters.clear();
            delete store.getProxy().extraParams['filters'];
            var filtro = filterCreation(this.self.getName().split('.')[this.self.getName().split('.').length-1]);
            var paramValues =  btn.up('form').getValues(false, true, false);
            paramValues = this.application.getConvertion().convert (paramValues, store.getModel() );
			paramValues = this.application.getConvertion().convert (paramValues, store.getModel());

            if (paramValues.generalParameterIdentifierGep != "" && paramValues.generalParameterIdentifierGep != null) {
                var generalParameterIdentifierGep = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'generalParameterIdentifierGep',
                    valor: paramValues.generalParameterIdentifierGep,
                    operacion: '=',
                    tipoValor: 'long'
                });
                filtro.push(generalParameterIdentifierGep.data);
            }

            if (paramValues.codeGep != "" && paramValues.codeGep != null) {
                var codeGep = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'codeGep',
                    valor: paramValues.codeGep+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(codeGep.data);
            }

            if (paramValues.dataTypeGep != "" && paramValues.dataTypeGep != null) {
                var dataTypeGep = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'dataTypeGep',
                    valor: paramValues.dataTypeGep,
                    operacion: '=',
                    tipoValor: 'enum',
                    enumName: 'main.java.com.claveSoluciones.acordFw.entity.commonElements.commonCodeLists.DataTypeCodeList'
                });
                filtro.push(dataTypeGep.data);
            }
            
            if (paramValues.nameGep != "" && paramValues.nameGep != null) {
                var nameGep = Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'nameGep',
                    valor: paramValues.nameGep+'%',
                    operacion: 'like',
                    tipoValor: 'string'
                });
                filtro.push(nameGep.data);
            }


            store.pageSize=15;
            if(filtro.length>0) store.getProxy().setExtraParam('filters', Ext.encode(filtro));
            store.currentPage=1;
            store.load(function(records, operation, success) {
                btn.setDisabled(false);
            });
        } else {
            invalidFields = btn.up('viewport').down('generalparameterv1formsearch').query("field{isValid()==false}");
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
    
    create: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        if(form.isValid()
        ){
            var objeto = form.getValues(false, true, false);
            var generalParameterV1Record =  form.getRecord();
            if (generalParameterV1Record !== undefined 
                && generalParameterV1Record !== null 
                && generalParameterV1Record .get('generalParameterIdentifierGep')!==null 
                && generalParameterV1Record .get('generalParameterIdentifierGep')!==undefined 
                && new String(generalParameterV1Record.get('generalParameterIdentifierGep')).indexOf('GeneralParameterV1') === -1){
                    btn.setDisabled(false);
                    this.update(btn);
            }else{
                var generalParameterV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1', {});
                objeto = this.application.getConvertion().convert (objeto, generalParameterV1);
                generalParameterV1.set(objeto);
                generalParameterV1.set({
                    generalParameterIdentifierGep: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });
                var generalParameterV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Validation', {});
                var validations = generalParameterV1Validation.createValidations (generalParameterV1);
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
                generalParameterV1.save ({
                    callback: function (record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                btn.up('window').close();
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                                Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1').reload();
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


   

});
