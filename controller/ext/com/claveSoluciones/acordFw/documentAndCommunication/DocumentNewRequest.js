Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.documentAndCommunication.DocumentNewRequest', {
    extend: 'AFW_FND_Xjs.controller.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',
    views: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.agreement.RelatedDocumentGrid',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.agreement.RelatedDocumentNew'],
    models: [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1'
    ],
//    stores: [
//             'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
//             'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.StructuralComponentSpecificationV1'
//             ],
    init: function() {
        this.control({
            'relateddocumentgrid button[action=newRelatedDocument]': {
                click: this.newRelatedDocument
            },
            'relateddocumentgrid button[action=editRelatedDocument]': {
                click: this.editRelatedDocument
            },
            'relateddocumentnew button[action=uploadRelatedDocument]': {
                click: this.uploadRelatedDocument
            },
            'relateddocumentgrid': {
                destroy: this.destroyGrid
            },
            'relateddocumentgrid actioncolumn[action=seeRelatedDocument]': {
                click: this.showDocument
            }
        });
    },
    newRelatedDocument: function(btn) {
        Ext.widget('relateddocumentnew').show();
    },
    destroyGrid: function(obj) {
        obj.getStore().removeAll();
    },
    editRelatedDocument: function(btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            var window = Ext.widget('relateddocumentnew');
            if (seleccion[0].get('documentIdentifierDoc') != null && seleccion[0].get('documentIdentifierDoc') != "")
                window.setTitle('Documento Relacionado Nº ' + seleccion[0].get('documentIdentifierDoc'));
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    uploadRelatedDocument: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm(),
                me = this;
        if (form.isValid()) {
            if (Ext.ComponentQuery.query('pruebawizardprincipal').length > 0) {
                var quotationRequestSt = Ext.getStore('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1');
                quotationRequestSt.removeAll();
                quotationRequestSt.filters.clear();
                delete quotationRequestSt.getProxy().extraParams['filters'];
                var filtro = [Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'includedAgreementRequestAgr<>includedAgreementRequestAgr<>activityIdentifierAct',
                        valor: Ext.ComponentQuery.query('pruebawizardprincipal')[0].down('agreementformv2').getForm().getRecord().get('activityIdentifierAct'),
                        valores: null,
                        operacion: '=',
                        tipoValor: 'long'
                    }).data];
                quotationRequestSt.getProxy().setExtraParam('filters', Ext.encode(filtro));
                quotationRequestSt.load({
                    scope: me,
                    callback: function(records, operation, success) {
                        var me = this;
                        if (success) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido) {
                                if (respuesta.datos != null && respuesta.datos != undefined && respuesta.datos.length > 0) {
                                    var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.datos[0]);

                                    var formFile = btn.up('window').down('#docForm').getForm(),
                                            filename = formFile.getFieldValues().file.replace(/^.*[\\\/]/, '');
                                    me.QuotationRequestV1 = record;
                                    formFile.submit({
                                        url: urlService + 'file/uploadAlfrescoQuotation',
                                        method: 'POST',
                                        params: {
                                            name: filename,
                                            quotationRequest: record.get('activityIdentifierAct'),
                                            userName: usuario.get('userName'),
                                            documentId: form.getRecord() != null ? form.getRecord().get('documentIdentifierDoc') : null,
                                            documentName: form.getFieldValues().nameDoc,
                                            typeCodeDoc: btn.up('window').down('[name="nameDoc"]').getRawValue()//form.getFieldValues().nameDoc
                                        },
                                        clientValidation: false,
                                        enctype: 'multipart/form-data',
                                        scope: me,
                                        waitMsg: 'Subiendo el archivo...',
                                        waitTitle: 'Subiendo',
                                        success: function(formFileSuc, action) {
                                            var me = this;
                                            var result = Ext.decode(action.response.responseText),
                                                    idDoc = -1,
                                                    version = '1.0';

                                            if (!Ext.isNumeric(result.respuesta) && Boolean(result.success) !== true) {
                                                if (result.error) {
                                                    crearVentana(5, result.error);
                                                } else {
                                                    crearVentana(5, "No se logro subir el archivo");
                                                }
                                                btn.setDisabled(false);
                                            } else {
                                                idDoc = result.file;
                                                version = result.version;
                                            }

                                            var objeto = form.getValues();
                                            var documentRelatedV1Record = form.getRecord();
                                            //            var generalOwnershipInformationV1 = null;
                                            if (documentRelatedV1Record !== undefined
                                                    && documentRelatedV1Record !== null
                                                    && documentRelatedV1Record.get('documentIdentifierDoc') !== null
                                                    && documentRelatedV1Record.get('documentIdentifierDoc') !== undefined
                                                    && new String(documentRelatedV1Record.get('documentIdentifierDoc')).indexOf('DocumentV1') === -1) {
                                                documentRelatedV1Record = btn.up('window').down('form').getForm().getRecord();
                                                documentRelatedV1Record.set(objeto);
                                                documentRelatedV1Record.set({
                                                    creationUserImo: usuario.get('userName'),
                                                    creationDateTimeImo: new Date(),
                                                    updateUserImo: usuario.get('userName'),
                                                    updateDateTimeImo: new Date(),
                                                    storageLocationDoc: idDoc,
                                                    versionIdentifierDoc: version,
                                                    typeNameImo: 'Document'
                                                });
                                            } else {
                                                documentRelatedV1Record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1', {});
                                                documentRelatedV1Record.set(objeto);
                                                documentRelatedV1Record.set({
                                                    creationUserImo: usuario.get('userName'),
                                                    creationDateTimeImo: new Date(),
                                                    updateUserImo: usuario.get('userName'),
                                                    updateDateTimeImo: new Date(),
                                                    storageLocationDoc: idDoc,
                                                    typeNameImo: 'Document',
                                                    versionIdentifierDoc: version
                                                });
                                            }
                                            if (result.error) {
                                                crearVentana(5, result.error);
                                                btn.setDisabled(false);
                                            } else {
                                                me.createDocument(documentRelatedV1Record, me.QuotationRequestV1);
                                                crearVentana(1, "Archivo se subio de forma correcta");
                                                btn.up('window').close();
                                            }
                                        },
                                        failure: function(form, action) {
                                            crearVentana(5, "No se logro subir el archivo");
                                            btn.setDisabled(false);
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
            } else {
                var formFile = btn.up('window').down('#docForm').getForm(),
                        filename = formFile.getFieldValues().file.replace(/^.*[\\\/]/, '');

                formFile.submit({
                    url: urlService + 'file/uploadAlfrescoQuotation',
                    method: 'POST',
                    params: {
                        name: filename,
                        quotationRequest: Ext.ComponentQuery.query('agreementrequestform')[0].getForm().getRecord().get('activityIdentifierAct'),
                        userName: usuario.get('userName'),
                        documentId: form.getRecord() != null ? form.getRecord().get('documentIdentifierDoc') : null,
                        documentName: form.getFieldValues().nameDoc,
                        typeCodeDoc: btn.up('window').down('[name="nameDoc"]').getRawValue()//form.getFieldValues().nameDoc
                    },
                    clientValidation: false,
                    enctype: 'multipart/form-data',
                    scope: me,
                    waitMsg: 'Subiendo el archivo...',
                    waitTitle: 'Subiendo',
                    success: function(formFileSuc, action) {
                        var result = Ext.decode(action.response.responseText),
                                idDoc = -1,
                                version = '1.0';

                        if (!Ext.isNumeric(result.respuesta) && Boolean(result.success) !== true) {
                            if (result.error) {
                                crearVentana(5, result.error);
                            } else {
                                crearVentana(5, "No se logro subir el archivo");
                            }
                            btn.setDisabled(false);
                        } else {
                            idDoc = result.file;
                            version = result.version;
                        }

                        var objeto = form.getValues();
                        var documentRelatedV1Record = form.getRecord();
                        //            var generalOwnershipInformationV1 = null;
                        if (documentRelatedV1Record !== undefined
                                && documentRelatedV1Record !== null
                                && documentRelatedV1Record.get('documentIdentifierDoc') !== null
                                && documentRelatedV1Record.get('documentIdentifierDoc') !== undefined
                                && new String(documentRelatedV1Record.get('documentIdentifierDoc')).indexOf('DocumentV1') === -1) {
                            documentRelatedV1Record = btn.up('window').down('form').getForm().getRecord();
                            documentRelatedV1Record.set(objeto);
                            documentRelatedV1Record.set({
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date(),
                                storageLocationDoc: idDoc,
                                versionIdentifierDoc: version,
                                typeNameImo: 'Document'
                            });
                        } else {
                            documentRelatedV1Record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1', {});
                            documentRelatedV1Record.set(objeto);
                            documentRelatedV1Record.set({
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date(),
                                storageLocationDoc: idDoc,
                                typeNameImo: 'Document',
                                versionIdentifierDoc: version
                            });
                        }
                        if (result.error) {
                            crearVentana(5, result.error);
                            btn.setDisabled(false);
                        } else {
                            me.createDocument(documentRelatedV1Record);
                            crearVentana(1, "Archivo se subio de forma correcta");
                            btn.up('window').close();
                        }
                    },
                    failure: function(form, action) {
                        crearVentana(5, "No se logro subir el archivo");
                        btn.setDisabled(false);
                    }
                });
            }
        } else if (form.getRecord() != null && form.getRecord().get('documentIdentifierDoc') != null) {
            var documentRelatedV1Record = form.getRecord();
            var objeto = form.getValues();
            documentRelatedV1Record.set(objeto);
            documentRelatedV1Record.set({
                updateUserImo: usuario.get('userName'),
                updateDateTimeImo: new Date(),
                typeNameImo: 'Document'
            });
            me.createDocument(documentRelatedV1Record);
            btn.up('window').close();
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i < invalidFields.length; i++) {
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
                    msg += invalidFields[i].getErrors()[j] + '. ';
                }
                msg += '<br />';
            }
            crearVentana(5, msg);
            btn.setDisabled(false);
        }
    },
    createDocument: function(documentRelatedV1Record, recordCreate) {
        var documentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1Validation', {});
        var validations = documentV1Validation.createValidations(documentRelatedV1Record);
        var errors = null;
        if (validations !== null || validations.length > 0) {
            var utilValidation = this.application.getUtilValidation();
            if (validations[0] !== undefined) {
                errors = utilValidation.validation(validations);
            }
        }
        if (errors !== null && errors !== undefined) {
            crearVentana(5, errors);
            btn.setDisabled(false);
            return null;
        }
        var store = Ext.ComponentQuery.query('relateddocumentgrid', Ext.ComponentQuery.query('window[title="Documentos Relacionados"]')[0])[0].getStore();
        if (documentRelatedV1Record.get('documentIdentifierDoc') == null
                || documentRelatedV1Record.get('documentIdentifierDoc') == undefined
                || documentRelatedV1Record.get('documentIdentifierDoc') == "") {
            store.loadRawData(documentRelatedV1Record.data, true);
            if (Ext.ComponentQuery.query('pruebawizardprincipal').length > 0) {
                record = recordCreate;
                var relatedDocumentAct = null;
                /*
                 * Documentos Relacionados
                 */
                var relatedDocumentStore = Ext.ComponentQuery.query('relateddocumentgrid')[0].getStore().getRange();
                if (relatedDocumentStore.length > 0) {
                    if (relatedDocumentAct == null) {
                        relatedDocumentAct = new Array();
                    }
                    for (var i = 0; i < relatedDocumentStore.length; i++) {
                        relatedDocumentAct.push(relatedDocumentStore[i].data);
                    }
                }
                record.set('relatedDocumentAct', relatedDocumentAct);

                record.set({
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date()
                });

                record.getProxy().setAppendId(true);
                record.save({
                    synchronous: true,
                    callback: function(record, operation) {
                        record.getProxy().getInitialConfig();
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {

                                var relateddocumentgrid = Ext.ComponentQuery.query('relateddocumentgrid'),
                                        relatedDocumentAct = record.data.relatedDocumentAct;

                                if (operation._resultSet.records.length > 0 && operation._resultSet.records[0].data.hasOwnProperty('relatedDocumentAct') && operation._resultSet.records[0].data.relatedDocumentAct.length > 0) {
                                    for (j = 0; j < relatedDocumentAct.length; j++) {
                                        if (!relatedDocumentAct[j].hasOwnProperty('documentIdentifierDoc') && (relatedDocumentAct[j].documentIdentifierDoc == null || relatedDocumentAct[j].documentIdentifierDoc == '')) {
                                            for (i = 0; i < operation._resultSet.records[0].data.relatedDocumentAct.length; i++) {
                                                if (operation._resultSet.records[0].data.relatedDocumentAct[i].storageLocationDoc == relatedDocumentAct[j].storageLocationDoc) {
                                                    relatedDocumentAct[j].documentIdentifierDoc = operation._resultSet.records[0].data.relatedDocumentAct[i].documentIdentifierDoc;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (relateddocumentgrid.length > 0) {
                                    var relateddocumentgridStore = relateddocumentgrid[0].getStore();
                                    relateddocumentgridStore.removeAll();
                                    relateddocumentgridStore.getProxy().setData(relatedDocumentAct);
                                    relateddocumentgridStore.load();
                                }
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                            } else {
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                            }
                        } else {
                            if (operation.error) {
                                crearVentana(5, "Error de conexión");
                            }
                        }
                    }
                });
            } else if (Ext.ComponentQuery.query('agreementrequestform').length > 0) {
                btn = Ext.ComponentQuery.query('agreementrequestform')[0].down('button[text="Guardar"]');
                btn.setDisabled(true);
                var form = btn.up('window').down('form').getForm();
                var values = form.getValues();
                var flagInsurer = false;
                var flagAgrProducer = false;
                var flagAgrManager = false;
                var flagApplicant = false;
                if (form.isValid()) {
                    var record;
                    var isContextForAgr = [];
                    if (form.getRecord() != null && form.getRecord() != undefined) {
                        record = form.getRecord();
                        if (record.get('isContextForAgr') != null) {
                            for (var h = 0; h < record.get('isContextForAgr').length; h++) {
                                var combo = btn.up('window').down('#insurerCombo');
                                var index = combo.getStore().findExact('roleIdentifierRol', combo.getValue());
                                var val = combo.getStore().getAt(index);
                                if (record.get('isContextForAgr')[h].playerPartyPar != null && record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar == val.get('playerPartyPar').partyIdentifierPar) {
                                    isContextForAgr.push(record.get('isContextForAgr')[h]);
                                    flagInsurer = true;
                                } else {
                                    combo = btn.up('window').down('#agreementProducerCombo');
                                    index = combo.getStore().findExact('roleIdentifierRol', combo.getValue());
                                    val = combo.getStore().getAt(index);
                                    if (record.get('isContextForAgr')[h].playerPartyPar != null && record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar == val.get('playerPartyPar').partyIdentifierPar) {
                                        isContextForAgr.push(record.get('isContextForAgr')[h]);
                                        flagAgrProducer = true;
                                    } else {
                                        combo = btn.up('window').down('#agreementManagerCombo');
                                        if (record.get('isContextForAgr')[h].typeNameImo == 'AgreementManager') {
                                            if (record.get('isContextForAgr')[h].keyImo != null) {
                                                index = combo.getStore().findExact('keyImo', record.get('isContextForAgr')[h].keyImo);
                                                val = combo.getStore().getAt(index);
                                            } else
                                                val = null;
                                            if (val != null && record.get('isContextForAgr')[h].keyImo == combo.getValue() && record.get('isContextForAgr')[h].rolePlayerPeriodEndDateTimeRol == null) {//(record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar==val.get('playerPartyPar').partyIdentifierPar){
                                                isContextForAgr.push(record.get('isContextForAgr')[h]);
                                                flagAgrManager = true;
                                            } else if (val != null && record.get('isContextForAgr')[h].keyImo != combo.getValue() && record.get('isContextForAgr')[h].rolePlayerPeriodEndDateTimeRol == null) {//(record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar==val.get('playerPartyPar').partyIdentifierPar){
                                                record.get('isContextForAgr')[h].rolePlayerPeriodEndDateTimeRol = Ext.Date.format(new Date(), 'd-m-Y H:i:s');
                                                isContextForAgr.push(record.get('isContextForAgr')[h]);
                                            } else if (record.get('isContextForAgr')[h].rolePlayerPeriodEndDateTimeRol != null && record.get('isContextForAgr')[h].rolePlayerPeriodEndDateTimeRol != "") {//(record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar==val.get('playerPartyPar').partyIdentifierPar){
                                                isContextForAgr.push(record.get('isContextForAgr')[h]);
                                            }
                                        } else {
                                            combo = btn.up('window').down('#applicantRequestForm');
                                            index = combo.getStore().findExact('roleIdentifierRol', combo.getValue());
                                            val = combo.getStore().getAt(index);
                                            if (record.get('isContextForAgr')[h].playerPartyPar.partyIdentifierPar == val.get('playerPartyPar').partyIdentifierPar) {

                                                var ownedGeneralOwnership = null;
                                                var generalOwnershipStore = btn.up('window').down('generalownershipgrid').getStore().getRange();
                                                if (generalOwnershipStore.length > 0) {
                                                    if (ownedGeneralOwnership == null) {
                                                        ownedGeneralOwnership = new Array();
                                                    }
                                                    for (var i = 0; i < generalOwnershipStore.length; i++) {
                                                        ownedGeneralOwnership.push(generalOwnershipStore[i].data);
                                                    }
                                                    record.get('isContextForAgr')[h].playerPartyPar.ownedGeneralOwnershipPar = ownedGeneralOwnership;
                                                }
                                                isContextForAgr.push(record.get('isContextForAgr')[h]);
                                                flagApplicant = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    } else {
                        record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', values);
                    }
                    record.set(values);
                    /*
                     * Documentos Relacionados
                     */
                    var relatedDocumentActStoreRange = Ext.ComponentQuery.query('relateddocumentgrid')[0].getStore().getRange();
                    var relatedDocumentAct = null;
                    if (relatedDocumentActStoreRange.length > 0) {
                        relatedDocumentAct = new Array();
                        for (var i = 0; i < relatedDocumentActStoreRange.length; i++) {
                            relatedDocumentAct.push(relatedDocumentActStoreRange[i].data);
                        }
                    }
                    record.set('relatedDocumentAct', relatedDocumentAct);

                    /*
                     * Aseguradores
                     */
                    var insurerStore = Ext.ComponentQuery.query('#insurerGridRequestForm')[0].getStore().getRange();
                    if (insurerStore.length > 1 && !flagInsurer) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        for (var i = 0; i < insurerStore.length; i++) {
                            isContextForAgr.push(insurerStore[i].data);
                        }
                    } else if (btn.up('window').down('#insurerCombo').getValue() != null && btn.up('window').down('#insurerCombo').getValue() != '' && !flagInsurer) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        var combo = btn.up('window').down('#insurerCombo');
                        var index = combo.getStore().findExact('roleIdentifierRol', combo.getValue());
                        if (index != -1) {
                            var val = combo.getStore().getAt(index);
                            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.InsurerV1', {});
                            rec.set('playerPartyPar', val.get('playerPartyPar'));
                            rec.set({
                                leaderIndicatorIre: true,
                                writtenLinePercentageIre: 1,
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date()
                            });
                            isContextForAgr.push(rec.data);
                        } else {
                            btn.up('window').down('#insurerCombo').markInvalid('El Asegurador no se encuentra en la base de datos');
                            crearVentana(5, 'El Asegurador no se encuentra en la base de datos');
                            btn.setDisabled(false);
                            return null;
                        }
                    }

                    /*
                     * Corredores de Seguro
                     */
                    var agreementProducerStore = Ext.ComponentQuery.query('#agreementProducerGridRequestForm')[0].getStore().getRange();
                    if (agreementProducerStore.length > 1 && !flagAgrProducer) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        for (var i = 0; i < agreementProducerStore.length; i++) {
                            isContextForAgr.push(agreementProducerStore[i].data);
                        }
                    } else if (btn.up('window').down('#agreementProducerCombo').getValue() != null && btn.up('window').down('#agreementProducerCombo').getValue() != '' && !flagAgrProducer) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        var combo = btn.up('window').down('#agreementProducerCombo');
                        var index = combo.getStore().findExact('roleIdentifierRol', combo.getValue());
                        if (index != -1) {
                            var val = combo.getStore().getAt(index);
                            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.AgreementProducerV1', {});
                            rec.set('playerPartyPar', val.get('playerPartyPar'));
                            rec.set({
                                typeCodeAgp: 'PrimaryWritingAgent',
                                interestPercentageAgp: 1,
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date()
                            });
                            isContextForAgr.push(rec.data);
                        } else {
                            btn.up('window').down('#agreementProducerCombo').markInvalid('El Corredor de Seguros no se encuentra en la base de datos');
                            crearVentana(5, 'El Corredor de Seguros no se encuentra en la base de datos');
                            btn.setDisabled(false);
                            return null;
                        }
                    }

                    /*
                     * Ejecutivo Comercial
                     */
                    var agreementManagerStore = Ext.ComponentQuery.query('#agreementManagerGridRequestForm')[0].getStore().getRange();
                    if (agreementManagerStore.length > 1 && !flagAgrManager) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        for (var i = 0; i < agreementManagerStore.length; i++) {
                            isContextForAgr.push(agreementManagerStore[i].data);
                        }
                    } else if (btn.up('window').down('#agreementManagerCombo').getValue() != null && btn.up('window').down('#agreementManagerCombo').getValue() != '' && !flagAgrManager) {
                        if (isContextForAgr == null) {
                            isContextForAgr = new Array();
                        }
                        var combo = btn.up('window').down('#agreementManagerCombo');
                        var index = combo.getStore().findExact('keyImo', combo.getValue());
                        if (index != -1) {
                            var val = combo.getStore().getAt(index);
                            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.AgreementManagerV1', {});
                            //rec.set('playerPartyPar', val.get('playerPartyPar'));
                            rec.set({
                                rolePlayerPeriodStartDateTimeRol: Ext.Date.format(new Date(), 'd-m-Y H:i:s'),
                                rolePlayerPeriodEndDateTimeRol: null,
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date(),
                                keyImo: val.get('keyImo'),
                                descriptionRol: val.get('descriptionRol')
                            });
                            isContextForAgr.push(rec.data);
                        } else {
                            btn.up('window').down('#agreementManagerCombo').markInvalid('El Ejecutivo Comercial no se encuentra en la base de datos');
                            crearVentana(5, 'El Ejecutivo Comercial no se encuentra en la base de datos');
                            btn.setDisabled(false);
                            return null;
                        }
                    }

                    /*
                     * Solicitante
                     */
                    var applicant = btn.up('window').down('#applicantRequestForm');
                    if (applicant.getValue() != null && !flagApplicant) {
                        var recApplicant = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.ApplicantV1');
                        var index = applicant.getStore().findExact('roleIdentifierRol', applicant.getValue());
                        if (index != -1) {
                            var playerParty = applicant.getStore().getAt(index).data.playerPartyPar;

                            /*
                             * General Ownership Information para Applicant (playerPartyPar)
                             */
                            var ownedGeneralOwnership = null;
                            var generalOwnershipStore = btn.up('window').down('generalownershipgrid').getStore().getRange();
                            if (generalOwnershipStore.length > 0) {
                                if (ownedGeneralOwnership == null) {
                                    ownedGeneralOwnership = new Array();
                                }
                                for (var i = 0; i < generalOwnershipStore.length; i++) {
                                    ownedGeneralOwnership.push(generalOwnershipStore[i].data);
                                }
                                playerParty.ownedGeneralOwnershipPar = ownedGeneralOwnership;
                            }

                            recApplicant.set('playerPartyPar', playerParty);
                            recApplicant.set({
                                creationUserImo: usuario.get('userName'),
                                creationDateTimeImo: new Date(),
                                updateUserImo: usuario.get('userName'),
                                updateDateTimeImo: new Date()
                            });
                            isContextForAgr.push(recApplicant.data);
                        } else {
                            btn.up('window').down('#applicantRequestForm').markInvalid('El Solicitante no se encuentra en la base de datos');
                            crearVentana(5, 'El Solicitante no se encuentra en la base de datos');
                            btn.setDisabled(false);
                            return null;
                        }
                    }
                    record.set('isContextForAgr', isContextForAgr);

                    var relatedDocumentAct = null;
                    /*
                     * Documentos Relacionados
                     */
                    var relatedDocumentStore = Ext.ComponentQuery.query('relateddocumentgrid')[0].getStore().getRange();
                    if (relatedDocumentStore.length > 0) {
                        if (relatedDocumentAct == null) {
                            relatedDocumentAct = new Array();
                        }
                        for (var i = 0; i < relatedDocumentStore.length; i++) {
                            relatedDocumentAct.push(relatedDocumentStore[i].data);
                        }
                    }
                    record.set('relatedDocumentAct', relatedDocumentAct);

                    record.set({
                        creationUserImo: usuario.get('userName'),
                        creationDateTimeImo: new Date(),
                        updateUserImo: usuario.get('userName'),
                        updateDateTimeImo: new Date()
                    });

                    record.getProxy().setAppendId(true);
                    record.save({
                        synchronous: true,
                        callback: function(record, operation) {
                            record.getProxy().getInitialConfig();
                            if (operation.success === true) {
                                var respuesta = Ext.decode(operation._response.responseText);
                                if (respuesta.valido === true) {

                                    var relateddocumentgrid = Ext.ComponentQuery.query('relateddocumentgrid'),
                                            relatedDocumentAct = record.data.relatedDocumentAct;

                                    if (operation._resultSet.records.length > 0 && operation._resultSet.records[0].data.hasOwnProperty('relatedDocumentAct') && operation._resultSet.records[0].data.relatedDocumentAct.length > 0) {
                                        for (j = 0; j < relatedDocumentAct.length; j++) {
                                            if (!relatedDocumentAct[j].hasOwnProperty('documentIdentifierDoc') && (relatedDocumentAct[j].documentIdentifierDoc == null || relatedDocumentAct[j].documentIdentifierDoc == '')) {
                                                for (i = 0; i < operation._resultSet.records[0].data.relatedDocumentAct.length; i++) {
                                                    if (operation._resultSet.records[0].data.relatedDocumentAct[i].storageLocationDoc == relatedDocumentAct[j].storageLocationDoc) {
                                                        relatedDocumentAct[j].documentIdentifierDoc = operation._resultSet.records[0].data.relatedDocumentAct[i].documentIdentifierDoc;
                                                    }
                                                }
                                            }
                                        }
                                    }


                                    if (relateddocumentgrid.length > 0) {
                                        var relateddocumentgridStore = relateddocumentgrid[0].getStore();
                                        relateddocumentgridStore.removeAll();
                                        relateddocumentgridStore.getProxy().setData(relatedDocumentAct);
                                        relateddocumentgridStore.load();
                                    }

                                    btn.up('window').down('#agreementPhysicalObjectPanel').setDisabled(false);
                                    //crearVentana(respuesta.codigo, respuesta.mensaje);
                                    Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1').reload();
                                    var recordSaved = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.data);
                                    Ext.ComponentQuery.query('agreementrequestform')[0].getForm().loadRecord(recordSaved);
                                    //Ext.ComponentQuery.query('agreementrequestwindow')[0].down('#communicationButton').setDisabled(false);
                                    Ext.ComponentQuery.query('#insurerGridRequestForm')[0].getStore().removeAll();
                                    for (var i = 0; i < recordSaved.data.isContextForAgr.length; i++) {
                                        isContext = recordSaved.data.isContextForAgr[i];
                                        if (isContext.typeNameImo == "Insurer") {
                                            var grid = Ext.ComponentQuery.query('#insurerGridRequestForm')[0];
                                            var combo = Ext.ComponentQuery.query('#insurerCombo')[0];
                                            if (grid.getStore().getProxy().getData() != null && grid.getStore().getProxy().getData().length > 0)
                                                storeData = grid.getStore().getProxy().getData();
                                            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.InsurerV1', {});
                                            rec.data = isContext;
                                            storeData.push(rec);
                                            grid.getStore().getProxy().setData(storeData);
                                            grid.getStore().reload();
                                            combo.getStore().load({
                                                callback: function(records, operation, success) {
                                                    for (var i = 0; i < records.length; i++) {
                                                        var party = records[i].data.playerPartyPar;
                                                        for (key in Ext.ComponentQuery.query('#insurerGridRequestForm')[0].getStore().getRange()) {
                                                            if (party.partyIdentifierPar == Ext.ComponentQuery.query('#insurerGridRequestForm')[0].getStore().getRange()[key].data.playerPartyPar.partyIdentifierPar && Ext.ComponentQuery.query('#insurerGridRequestForm')[0].getStore().getRange()[key].get('leaderIndicatorIre')) {
                                                                Ext.ComponentQuery.query('#insurerCombo')[0].setValue(records[i].data.roleIdentifierRol);
                                                                Ext.ComponentQuery.query('#insurerCombo')[0].fireEvent('select', Ext.ComponentQuery.query('#insurerCombo')[0], [records[i].data]);
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                        } else if (isContext.typeNameImo == "AgreementProducer") {
                                            var gridProducer = Ext.ComponentQuery.query('#agreementProducerGridRequestForm')[0];
                                            var comboProducer = Ext.ComponentQuery.query('#agreementProducerCombo')[0];
                                            var store = comboProducer.getStore();
                                            var storeData = [];
                                            if (gridProducer.getStore().getProxy().getData() != null && gridProducer.getStore().getProxy().getData().length > 0)
                                                storeData = gridProducer.getStore().getProxy().getData();
                                            var rec = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.partyRoleInAgreement.AgreementProducerV1', {});
                                            rec.data = isContext;
                                            storeData.push(rec);
                                            gridProducer.getStore().getProxy().setData(storeData);
                                            gridProducer.getStore().reload();
                                            store.filters.clear();
                                            delete store.getProxy().extraParams['filters'];
                                            var filtro = filterCreation('InsuranceBrokerage');
                                            var partyIdentifierPar = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                nombreCampo: 'playerPartyPar<>partyIdentifierPar',
                                                valor: Ext.ComponentQuery.query('#agreementProducerGridRequestForm')[0].getStore().getRange()[0].data.playerPartyPar.partyIdentifierPar,
                                                operacion: '=',
                                                tipoValor: 'long'
                                            });

                                            filtro.push(partyIdentifierPar.data);
                                            store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                            store.currentPage = 1;

                                            comboProducer.getStore().load({
                                                callback: function(records, operation, success) {
                                                    for (var i = 0; i < records.length; i++) {
                                                        var party = records[i].data.playerPartyPar;
                                                        if (party.partyIdentifierPar == Ext.ComponentQuery.query('#agreementProducerGridRequestForm')[0].getStore().getRange()[0].data.playerPartyPar.partyIdentifierPar) {
                                                            Ext.ComponentQuery.query('#agreementProducerCombo')[0].setValue(records[i].data.roleIdentifierRol);
                                                            break;
                                                        }
                                                    }
                                                }
                                            });
                                        } else if (isContext.typeNameImo == "AgreementManager" && (isContext.rolePlayerPeriodEndDateTimeRol == null || isContext.rolePlayerPeriodEndDateTimeRol == undefined || isContext.rolePlayerPeriodEndDateTimeRol > new Date())) {
                                            var grid = Ext.ComponentQuery.query('#agreementManagerGridRequestForm')[0];
                                            var combo = Ext.ComponentQuery.query('#agreementManagerCombo')[0];
                                            grid.getStore().loadRawData(isContext, true);
                                            combo.getStore().load({
                                                callback: function(records, operation, success) {
                                                    for (var i = 0; i < records.length; i++) {
                                                        var party = records[i].data.keyImo;
                                                        if (party == Ext.ComponentQuery.query('#agreementManagerGridRequestForm')[0].getStore().getRange()[0].data.keyImo) {
                                                            Ext.ComponentQuery.query('#agreementManagerCombo')[0].setValue(records[i].data.keyImo);
                                                            break;
                                                        }
                                                    }
                                                }
                                            });

                                        } else if (isContext.typeNameImo == "Applicant") {
                                            var combo = Ext.ComponentQuery.query('#applicantRequestForm')[0];
                                            combo.getStore().load({
                                                callback: function(records, operation, success) {
                                                    var selected = [recordSaved];
                                                    for (var k = 0; k < selected[0].data.isContextForAgr; k++) {
                                                        var v = selected[0].data.isContextForAgr[k];
                                                        if (v.typeNameImo == "Applicant") {
                                                            isContext = v;
                                                        }
                                                    }
                                                    for (var i = 0; i < records.length; i++) {
                                                        var applicants = records;
                                                        if (applicants[i].data.playerPartyPar.partyIdentifierPar == isContext.playerPartyPar.partyIdentifierPar) {
                                                            Ext.ComponentQuery.query('#applicantRequestForm')[0].setValue(records[i].data.roleIdentifierRol);
                                                            break;
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }

                                    var agreementStore = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV2');
                                    var filtro = [];
                                    var basingAgreement = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'basingAgreementRequestAgr.activityIdentifierAct',
                                        valor: recordSaved.data.activityIdentifierAct,
                                        operacion: '=',
                                        tipoValor: 'long'
                                    });
                                    filtro.push(basingAgreement.data);

                                    agreementStore.pageSize = 15;
                                    if (filtro.length > 0)
                                        agreementStore.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    agreementStore.currentPage = 1;
                                    agreementStore.load();
                                } else {
                                    crearVentana(respuesta.codigo, respuesta.mensaje);
                                }
                            } else {
                                if (operation.error) {
                                    crearVentana(5, "Error de conexión");
                                }
                            }
                        },
                        success: function(rec, st) {
                            btn.setDisabled(false);
                            btn.up('window').unmask();
                        },
                        failure: function(rec, st, a, b, c) {
                            btn.setDisabled(false);
                            btn.up('window').unmask();
                        }
                    });

                }
            }
        } else {
            var index = store.findExact('id', documentRelatedV1Record.get('id'));
            if (index != -1)
                store.removeAt(index);
            var items = store.getRange();
            if (items != null && items.length >= 0) {
                items.push(documentRelatedV1Record.data);
                store.getProxy().setData(items);
            } else if (items != null && !items instanceof Array) {
                store.getProxy().setData([items]);
            }
        }
        store.load();
    },
    showDocument: function(grid, rowIndex, colIndex, item, e, rec) {
        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: urlService + 'file/get',
            method: 'GET',
            target: '_blank',
            hrefTarget: '_blank'
        });

        if (rec.get('storageLocationDoc') != null && rec.get('storageLocationDoc') != undefined) {
            var archivoSeleccionado = rec.get('documentIdentifierDoc');
            var quotation = Ext.ComponentQuery.query('agreementrequestform')[0].getForm().getRecord().get('activityIdentifierAct');
            if (quotation != null && quotation != undefined) {
                if (archivoSeleccionado != null && archivoSeleccionado != undefined) {
                    form.submit({
                        target: '_blank',
                        params: {
                            'documentId': archivoSeleccionado,
                            'quotationId': quotation//,
//							'docName' : rec.get('nameDoc')
                        }
                    });
                } else {
                    crearVentana(5, 'Guarde la solicitud para asociar los documentos.');
                }
            } else {
                crearVentana(5, 'Para asociar el documento, debe crear la solicitud.');
            }
        } else {
            crearVentana(5, 'El documento no tiene archivo asociado.');
        }

//    	Ext.Ajax.request({
//			method: 'GET',
//			url: 'http://192.168.1.122:8080/AF_V2-4-2_PYC_WebServices/webresources/' + 'file/get',
//			success: function(fp, o) {
//                console.log(fp);
//                console.log(o);
//                download(fp.responseText, "descarga.xls", "application/excel;base64");
//            },
//            failure: function (){alert('Fail...');}
//        });
    }
});
