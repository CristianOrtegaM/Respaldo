Ext.define('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.documentAndCommunication.Communication', {
    extend: 'Ext.app.Controller',
    views: ['AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationFormWindow',
        'AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1Validation',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.documentAndCommunication.ContactPointSelectionTypeWindow',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.agreement.UnspecifiedContentGrid',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.PersonV1FormInput',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.PersonV1PrincipalWindow',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.CompanyV1FormInput',
        'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.party.CompanyV1PrincipalWindow'
    ],
    models: ['AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1'],
    stores: ['AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1',
        'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1'],
    init: function() {
        this.control({
            'communicationformwindow button[action=guardarCommunication]': {
                click: this.guardarCommunication
            },
            'communicationformwindow button[action=sendCommunication]': {
                click: this.sendCommunication
            },
            'contactpointselectiontypewindow button[action="communicationQuoteAbandoned"]': {
                click: this.communicationQuoteAbandoned
            },
            'contactpointselectiontypewindow button[action="aceptar"]': {
                click: this.mostrarCommunication
            },
            'unspecifiedcontentgrid button[action="selectPointContact"]': {
                click: this.selectPointContact
            },
            'unspecifiedcontentgrid button[action="editUnspecifiedContent"]': {
                click: this.editUnspecifiedContent
            },
            'communicationformwindow button[action=editCommunication]': {
                click: this.editCommunication
            },
            'communicationformwindow button[action=completeCommunication]': {
                click: this.completeCommunication
            },
            'communicationformwindow button[action=printCommunication]': {
                click: this.printCommunication
            },
            'communicationformwindow button[action=editContact]': {
                click: this.editRol
            },
            'personyv1principalwindow_ext button[action=create]': {
                click: this.updateParty//click: this.updatePerson
            },
            'companyv1principalwindow_ext button[action=create]': {
                click: this.updateParty//click: this.updateCompany
            },
        });
    },
    printCommunication: function(btn) {
        var record = btn.up('window').down('form').getForm().getRecord(),
                urlForm = urlService + 'report/getReportCommunication',
                form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: urlForm,
            method: 'POST',
            target: '_blank',
            hrefTarget: '_blank'
        });
        if (record == null || record == undefined) {
            crearVentana(5, 'Debe crear el registro para poder imprimir.');
        } else {
            form.submit({
                target: '_blank',
                params: {
                    communication: record.get('communicationIdentifierCom'),
                    idQuotationRequest: record.get('referencedSubjectIdentifierCoc'),
                    user: usuario.get('userName'),
                }
            });
        }
    },
    communicationQuoteAbandoned: function(btn) {
        var typeContactPoint = null;
        var me = this;
        if (Ext.getCmp('radio_direccionpostal').value) {
            typeContactPoint = 'PostalMailContact';
        } else {
            typeContactPoint = 'EmailContact';
        }
        if (typeContactPoint !== null) {
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
            me.btn = btn;
            me.typeContactPoint = typeContactPoint;
            quotationRequestSt.load({
                scope: me,
                callback: function(records, operation, success) {
                    var me = this;
                    var btn = me.btn;
                    var typeContactPoint = me.typeContactPoint;
                    if (success) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido) {
                            if (respuesta.datos != null && respuesta.datos != undefined && respuesta.datos.length > 0) {
                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.datos[0]);
                                var window = Ext.widget('communicationformwindow');
                                if (typeContactPoint === 'EmailContact') {
                                    window.down('#imprimir_communication').setDisabled(true);
                                }
                                var storeParty = window.down('grid').getStore();
                                storeParty.removeAll();
                                storeParty.filters.clear();
                                //delete storeParty.getProxy().extraParams['filters'];
                                var partys = [];
                                for (var i = 0; i < record.get('isContextForAgr').length; ++i) {
                                    if (record.get('isContextForAgr')[i].roleIdentifierRol != null && record.get('isContextForAgr')[i].roleIdentifierRol != undefined) {
                                        partys.push(record.get('isContextForAgr')[i].roleIdentifierRol);
                                    }
                                }
                                var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                                var filtro = [];
                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'roleIdentifierRol',
                                    valor: null,
                                    valores: partys,
                                    operacion: 'in',
                                    tipoValor: 'long'
                                }).data);
                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                                    valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                                    operacion: 'isnull',
                                    tipoValor: 'date'
                                }).data);
                                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                store.load({
                                    callback: function(records, operation, success) {
                                        if (success && records.length > 0) {
                                            var party = null;
                                            var data = [];
                                            for (var i = 0; i < records.length; ++i) {
                                                var playerPartyPar = records[i].data.playerPartyPar;
                                                if(playerPartyPar == null || playerPartyPar == undefined ){
                                                    continue;
                                                }
                                                party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                                party.data = playerPartyPar;
                                                var partyPointContact = party.copy(null);
                                                var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                                var rol = records[i].data.typeNameImo;
                                                if (index >= 0) {
                                                    rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                                }
                                                partyPointContact.data.rol = rol;
                                                partyPointContact.data.preferredContactPar2 = [];
                                                if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                                    for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                                        if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                                            partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                                        }
                                                    }
                                                }
                                                data.push(partyPointContact.data);
                                            }
                                            storeParty.getProxy().setData(data);
                                            storeParty.reload();
                                            window.down('grid').unmask();
                                        }
                                    }
                                });
                                window.down('hiddenfield[name="referencedSubjectTypeNameCoc"]').setValue(record.get('typeNameImo'));
                                window.down('hiddenfield[name="referencedSubjectIdentifierCoc"]').setValue(record.get('activityIdentifierAct'));
                                window.show();
                                window.down('grid').mask('Cargando');
                                btn.up('window').close();
                            }
                        }
                    }
                }
            });
        }
    },
    selectPointContact: function(btn) {
        var ventana = Ext.widget('contactpointselectiontypewindow');
        var actionDif = true;
        if (typeof btn == 'string' && btn == 'discardInsuranceAgreement') {
            ventana.down('button[action="aceptar"]').action = 'communicationQuoteAbandoned';
            actionDif = false;
        } else {
            btn.setDisabled(true);
        }
        ventana.show();
        if (actionDif) {
            btn.setDisabled(false);
        }
    },
    mostrarCommunication: function(btn) {
        var typeContactPoint = null;
        var me = this;
        if (Ext.getCmp('radio_direccionpostal').value) {
            typeContactPoint = 'PostalMailContact';
        } else {
            typeContactPoint = 'EmailContact';
        }
        if (typeContactPoint !== null) {
            var isContextForAgr = [];
            var record = null,
                    typeNameImo = 'QuotationRequest',
                    referencedSubjectIdentifierCoc = -1;
            if (Ext.ComponentQuery.query('agreementrequestform').length > 0) {
                record = Ext.ComponentQuery.query('agreementrequestform')[0].getRecord();
                isContextForAgr = record.data.isContextForAgr;
                referencedSubjectIdentifierCoc = record.data.activityIdentifierAct;
                var window = Ext.widget('communicationformwindow');
                if (typeContactPoint === 'EmailContact') {
                    window.down('#imprimir_communication').setDisabled(true);
                }
                var storeParty = window.down('grid').getStore();
                storeParty.removeAll();
                storeParty.filters.clear();
                //delete storeParty.getProxy().extraParams['filters'];
                var filtro = [];
                var partys = [];
                for (var i = 0; i < isContextForAgr.length; ++i) {
                    if (isContextForAgr[i].roleIdentifierRol != null && isContextForAgr[i].roleIdentifierRol != undefined) {
                        partys.push(isContextForAgr[i].roleIdentifierRol);
                    }
                }
                var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                var filtro = [];
                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'roleIdentifierRol',
                    valor: null,
                    valores: partys,
                    operacion: 'in',
                    tipoValor: 'long'
                }).data);
                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                    valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                    operacion: 'isnull',
                    tipoValor: 'date'
                }).data);
                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                store.load({
                    callback: function(records, operation, success) {
                        if (success && records.length > 0) {
                            var party = null;
                            var data = [];
                            for (var i = 0; i < records.length; ++i) {
                                var playerPartyPar = records[i].data.playerPartyPar;
                                if (playerPartyPar == null || playerPartyPar == undefined)
                                    continue;
                                party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                party.data = playerPartyPar;
                                var partyPointContact = party.copy(null);
                                var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                var rol = records[i].data.typeNameImo;
                                if (index >= 0) {
                                    rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                }
                                partyPointContact.data.rol = rol;
                                partyPointContact.data.preferredContactPar2 = [];
                                if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                    for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                        if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                            partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                        }
                                    }
                                }
                                data.push(partyPointContact.data);
                            }
                            storeParty.getProxy().setData(data);
                            storeParty.reload();
                            window.down('grid').unmask();
                        }
                    }
                });
                window.down('grid').typeContactPoint = typeContactPoint;
                window.down('hiddenfield[name="referencedSubjectTypeNameCoc"]').setValue(typeNameImo);
                window.down('hiddenfield[name="referencedSubjectIdentifierCoc"]').setValue(referencedSubjectIdentifierCoc);
                window.show();
                window.down('grid').mask('Cargando');
                btn.up('window').close();
            } else {
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
                me.btn = btn;
                me.typeContactPoint = typeContactPoint;
                quotationRequestSt.load({
                    scope: me,
                    callback: function(records, operation, success) {
                        var me = this;
                        var btn = me.btn;
                        var typeContactPoint = me.typeContactPoint;
                        if (success) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido) {
                                if (respuesta.datos != null && respuesta.datos != undefined && respuesta.datos.length > 0) {
                                    var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.datos[0]);
                                    var isContextForAgr = record.data.isContextForAgr;
                                    referencedSubjectIdentifierCoc = record.data.activityIdentifierAct;
                                    typeNameImo = record.data.typeNameImo;
                                    var window = Ext.widget('communicationformwindow');
                                    if (typeContactPoint === 'EmailContact') {
                                        window.down('#imprimir_communication').setDisabled(true);
                                    }
                                    var storeParty = window.down('grid').getStore();
                                    storeParty.removeAll();
                                    storeParty.filters.clear();
                                    //delete storeParty.getProxy().extraParams['filters'];
                                    var filtro = [];
                                    var partys = [];
                                    for (var i = 0; i < isContextForAgr.length; ++i) {
                                        if (isContextForAgr[i].roleIdentifierRol != null && isContextForAgr[i].roleIdentifierRol != undefined) {
                                            partys.push(isContextForAgr[i].roleIdentifierRol);
                                        }
                                    }
                                    var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                                    var filtro = [];
                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'roleIdentifierRol',
                                        valor: null,
                                        valores: partys,
                                        operacion: 'in',
                                        tipoValor: 'long'
                                    }).data);
                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                                        valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                                        operacion: 'isnull',
                                        tipoValor: 'date'
                                    }).data);
                                    store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    store.load({
                                        callback: function(records, operation, success) {
                                            if (success && records.length > 0) {
                                                var party = null;
                                                var data = [];
                                                for (var i = 0; i < records.length; ++i) {
                                                    var playerPartyPar = records[i].data.playerPartyPar;
                                                    if (playerPartyPar == null || playerPartyPar == undefined)
                                                        continue;
                                                    party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                                    party.data = playerPartyPar;
                                                    var partyPointContact = party.copy(null);
                                                    var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                                    var rol = records[i].data.typeNameImo;
                                                    if (index >= 0) {
                                                        rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                                    }
                                                    partyPointContact.data.rol = rol;
                                                    partyPointContact.data.preferredContactPar2 = [];
                                                    if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                                        for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                                            if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                                                partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                                            }
                                                        }
                                                    }
                                                    data.push(partyPointContact.data);
                                                }
                                                storeParty.getProxy().setData(data);
                                                storeParty.reload();
                                                window.down('grid').unmask();
                                            }else{
												window.down('grid').unmask();
                                            }
                                        }
                                    });
                                    window.down('grid').typeContactPoint = typeContactPoint;
                                    window.down('hiddenfield[name="referencedSubjectTypeNameCoc"]').setValue(typeNameImo);
                                    window.down('hiddenfield[name="referencedSubjectIdentifierCoc"]').setValue(referencedSubjectIdentifierCoc);
                                    window.show();
                                    window.down('grid').mask('Cargando');
                                    btn.up('window').close();


                                }
                            }
                        }
                    }
                });
            }
        }
    },
    editUnspecifiedContent: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length > 0) {
            AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.documentAndCommunication.Communication');
            var window = Ext.widget('communicationformwindow');
            window.down('form').getForm().loadRecord(seleccion[0]);
            window.down('textfield[name="status"]').setValue(seleccion[0].data.statusCom.nameSta);
            //window.down('grid').getStore().loadRawData(seleccion[0].data.directedContactPointCom,true);

            var record = null;
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
                me.btn = btn;
                quotationRequestSt.load({
                    scope: me,
                    callback: function(records, operation, success) {
                        var me = this;
                        btn = me.btn;
                        if (success) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido) {
                                if (respuesta.datos != null && respuesta.datos != undefined && respuesta.datos.length > 0) {
                                    var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.datos[0]);
                                    var isContextForAgr = record.data.isContextForAgr;
                                    var typeNameImo = record.data.typeNameImo;
                                    if (record.data.targetedAgreementBaseAgr != null && record.data.targetedAgreementBaseAgr != undefined
                                            && record.data.targetedAgreementBaseAgr.includedPartyRoleInAgreementAgb != null
                                            && record.data.targetedAgreementBaseAgr.includedPartyRoleInAgreementAgb != undefined
                                            && record.data.targetedAgreementBaseAgr.includedPartyRoleInAgreementAgb.length > 0) {
                                        //isContextForAgr = record.data.targetedAgreementBaseAgr.includedPartyRoleInAgreementAgb;
                                        isContextForAgr = record.data.isContextForAgr;
                                    } else {
                                        isContextForAgr = record.data.isContextForAgr;
                                    }
                                    var storeParty = window.down('grid').getStore();
                                    var typeContactPoint = seleccion[0].data.directedContactPointCom[0].contactPointKindCop == 'ElectronicContact' ? 'EmailContact' : seleccion[0].data.directedContactPointCom[0].contactPointKindCop;
                                    var filtro = [];
                                    var isContextForAgr = record.data.isContextForAgr;
                                    var partys = [];
                                    for (var i = 0; i < isContextForAgr.length; ++i) {
                                        if (isContextForAgr[i].roleIdentifierRol != null && isContextForAgr[i].roleIdentifierRol != undefined) {
                                            partys.push(isContextForAgr[i].roleIdentifierRol);
                                        }
                                    }

                                    var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                                    var filtro = [];
                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'roleIdentifierRol',
                                        valor: null,
                                        valores: partys,
                                        operacion: 'in',
                                        tipoValor: 'long'
                                    }).data);
                                    filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                                        valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                                        operacion: 'isnull',
                                        tipoValor: 'date'
                                    }).data);
                                    store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    store.load({
                                        callback: function(records, operation, success) {
                                            if (success && records.length > 0) {
                                                var party = null;
                                                var data = [];
                                                for (var i = 0; i < records.length; ++i) {
                                                    var playerPartyPar = records[i].data.playerPartyPar;
                                                    if (playerPartyPar == null || playerPartyPar == undefined)
                                                        continue;
                                                    party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                                    party.data = playerPartyPar;
                                                    var partyPointContact = party.copy(null);
                                                    var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                                    var rol = records[i].data.typeNameImo;
                                                    if (index >= 0) {
                                                        rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                                    }
                                                    partyPointContact.data.rol = rol;
                                                    partyPointContact.data.preferredContactPar2 = [];
                                                    if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                                        for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                                            if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                                                partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                                            }
                                                        }
                                                    }
                                                    data.push(partyPointContact.data);
                                                }
                                                storeParty.getProxy().setData(data);
                                                storeParty.reload();
                                                window.down('grid').unmask();
                                                var contactpointcommunicationgrid = storeParty.getRange();
                                                for (var i = 0; i < seleccion[0].data.directedContactPointCom.length; ++i) {
                                                    for (var j = 0; j < contactpointcommunicationgrid.length; j++) {
                                                        for (var k = 0; k < contactpointcommunicationgrid[j].data.preferredContactPar.length; k++) {
                                                            if (contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop != null && contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop != undefined) {
                                                                if (seleccion[0].data.directedContactPointCom[i].contactPointIdentifierCop == contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop.contactPointIdentifierCop) {
                                                                    Ext.ComponentQuery.query('#contactpointcommunicationgrid')[0].selModel.select(contactpointcommunicationgrid[j], true);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    });
                                    window.show();
                                    window.down('grid').mask('Cargando');
                                    window.down('grid').typeContactPoint = typeContactPoint;


                                }
                            }
                        }
                    }
                });
            } else {
                record = Ext.ComponentQuery.query('agreementrequestform')[0].getRecord();
                isContextForAgr = record.data.isContextForAgr;
                var storeParty = window.down('grid').getStore();
                var typeContactPoint = seleccion[0].data.directedContactPointCom[0].contactPointKindCop == 'ElectronicContact' ? 'EmailContact' : seleccion[0].data.directedContactPointCom[0].contactPointKindCop;
                var filtro = [];
                var isContextForAgr = record.data.isContextForAgr;
                var partys = [];
                for (var i = 0; i < isContextForAgr.length; ++i) {
                    if (isContextForAgr[i].roleIdentifierRol != null && isContextForAgr[i].roleIdentifierRol != undefined) {
                        partys.push(isContextForAgr[i].roleIdentifierRol);
                    }
                }

                var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                var filtro = [];
                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'roleIdentifierRol',
                    valor: null,
                    valores: partys,
                    operacion: 'in',
                    tipoValor: 'long'
                }).data);
                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                    nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                    valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                    operacion: 'isnull',
                    tipoValor: 'date'
                }).data);
                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                store.load({
                    callback: function(records, operation, success) {
                        if (success && records.length > 0) {
                            var party = null;
                            var data = [];
                            for (var i = 0; i < records.length; ++i) {
                                var playerPartyPar = records[i].data.playerPartyPar;
                                if (playerPartyPar == null || playerPartyPar == undefined)
                                    continue;
                                party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                party.data = playerPartyPar;
                                var partyPointContact = party.copy(null);
                                var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                var rol = records[i].data.typeNameImo;
                                if (index >= 0) {
                                    rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                }
                                partyPointContact.data.rol = rol;
                                partyPointContact.data.preferredContactPar2 = [];
                                if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                    for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                        if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                            partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                        }
                                    }
                                }
                                data.push(partyPointContact.data);
                            }
                            storeParty.getProxy().setData(data);
                            storeParty.reload();
                            window.down('grid').unmask();
                            var contactpointcommunicationgrid = storeParty.getRange();
                            for (var i = 0; i < seleccion[0].data.directedContactPointCom.length; ++i) {
                                for (var j = 0; j < contactpointcommunicationgrid.length; j++) {
                                    for (var k = 0; k < contactpointcommunicationgrid[j].data.preferredContactPar.length; k++) {
                                        if (contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop != null && contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop != undefined) {
                                            if (seleccion[0].data.directedContactPointCom[i].contactPointIdentifierCop == contactpointcommunicationgrid[j].data.preferredContactPar[k].preferredContactPointCop.contactPointIdentifierCop) {
                                                Ext.ComponentQuery.query('#contactpointcommunicationgrid')[0].selModel.select(contactpointcommunicationgrid[j], true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                window.show();
                window.down('grid').mask('Cargando');
                window.down('grid').typeContactPoint = typeContactPoint;
            }
        }
        btn.setDisabled(false);
    },
    createParty: function(records, contactPoint, window) {
        var party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
        party.data = records[0].data;
        var preferredContact = party.data.preferredContactPar[0];
        preferredContact.preferredContactPointCop = contactPoint;
        party.data.preferredContactPar = [];
        party.data.preferredContactPar.push(preferredContact);
        var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleInRelationshipSubtypes.CustomerV1', {});
        var filtro = [];
        filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'class',
            valor: 'Customer',
            valores: null,
            operacion: '=',
            tipoValor: 'string'
        }).data);
        filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'playerPartyPar<>partyIdentifierPar',
            valor: party.data.partyIdentifierPar,
            operacion: '=',
            tipoValor: 'long'
        }).data);
        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
        store.load({
            callback: function(records, operation, success) {
                if (success && records.length > 0) {
                    party.data.rol = 'Solicitante';
                } else {
                    party.data.rol = 'Corredor de Seguros';
                }
                var data = window.down('grid').getStore().getProxy().getData();
                data.push(party);
                window.down('grid').getStore().getProxy().setData(data);
                window.down('grid').getStore().reload();
                window.down('grid').getSelectionModel().select(party, true);
            }
        });
    },
    loadContactPoint: function(storeName, type, partyIdentifierPar, storeParty, rol, typeContactPoint) {
        var store = Ext.create(storeName, {});
        var filtro = [];
        filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'class',
            valor: type,
            valores: null,
            operacion: '=',
            tipoValor: 'string'
        }).data);
        filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
            nombreCampo: 'partyIdentifierPar',
            valor: partyIdentifierPar,
            operacion: '=',
            tipoValor: 'long'
        }).data);
        store.getProxy().setExtraParam('filters', Ext.encode(filtro));
        store.load({
            callback: function(records, operation, success) {
                if (success && records.length > 0) {
                    //storeParty.removeAll();
                    var party = null;
                    var data = [];
                    for (var i = 0; i < records.length; ++i) {
                        var playerPartyPar = records[i].data;
                        if (playerPartyPar == null || playerPartyPar == undefined)
                            continue;
                        party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                        party.data = playerPartyPar;
                        if (playerPartyPar.preferredContactPar.length > 0) {
                            for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                    var partyPointContact = party.copy(null);
                                    partyPointContact.data.rol = rol;
                                    partyPointContact.data.playerPartyType = party.data.typeNameImo;
                                    partyPointContact.data.preferredContactPar = [];
                                    partyPointContact.data.preferredContactPar.push(playerPartyPar.preferredContactPar[j]);
                                    data.push(partyPointContact.data);
                                }
                            }
//                        } else {
                            //playerPartyPar.rol=rol;
                            //storeParty.add(playerPartyPar);
                        }
                    }
                    storeParty.getProxy().setData(data);
                    storeParty.reload();
                    window.down('grid').unmask();
                }
            }
        });
    },
    completeCommunication: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var record = btn.up('window').down('form').getForm().getRecord();
        record.data.statusCom.codeCms = 'Ready';
        record.data.statusCom.nameSta = 'Completa';
        this.saveUnspecifiedContent(btn, record);
    },
    editCommunication: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var record = btn.up('window').down('form').getForm().getRecord();
        record.data.statusCom.codeCms = 'Draft';
        record.data.statusCom.nameSta = 'Borrador';
        this.saveUnspecifiedContent(btn, record);
    },
    sendCommunication: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var record = btn.up('window').down('form').getForm().getRecord();
        record.data.statusCom.codeCms = 'Sent';
        record.data.statusCom.nameSta = 'Enviado';
        this.saveUnspecifiedContent(btn, record);
    },
    saveUnspecifiedContent: function(btn, record) {
        var me = this;
        btn.up('window').mask("Cambiando estado.", "x-mask-loading");
        record.save({
            callback: function(record, operation) {
                if (operation.success === true) {
                    var respuesta = Ext.decode(operation._response.responseText);
                    if (respuesta.valido === true) {

                        me._refreshCommunicationStatus(btn, record);
                        crearVentana(respuesta.codigo, 'El estado de la Comunicación ha sido modificado.');
                    } else {
                        crearVentana(respuesta.codigo, 'El estado de la Comunicación no pudo ser modificado.');
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
    },
    _refreshCommunicationStatus: function(btn, rec) {
        if (rec == null || rec.data.statusCom == null) {
            btn.up('window').down('button[action=completeCommunication]').setDisabled(true);
            btn.up('window').down('button[action=editCommunication]').setDisabled(true);
            btn.up('window').down('button[action=sendCommunication]').setDisabled(true);
        } else if (rec.data.statusCom.codeCms == 'Draft') {
            btn.up('window').down('button[action=completeCommunication]').setDisabled(false);
            btn.up('window').down('button[action=editCommunication]').setDisabled(true);
            btn.up('window').down('button[action=sendCommunication]').setDisabled(true);
            btn.up('window').down('textfield[name="status"]').setValue('Borrador');
        } else if (rec.data.statusCom.codeCms == 'Ready') {
            btn.up('window').down('button[action=completeCommunication]').setDisabled(true);
            btn.up('window').down('button[action=editCommunication]').setDisabled(false);
            btn.up('window').down('button[action=sendCommunication]').setDisabled(false);
            btn.up('window').down('textfield[name="status"]').setValue('Completa');
        } else if (rec.data.statusCom.codeCms == 'Sent') {
            btn.up('window').down('button[action=completeCommunication]').setDisabled(true);
            btn.up('window').down('button[action=editCommunication]').setDisabled(true);
            btn.up('window').down('button[action=sendCommunication]').setDisabled(true);
            btn.up('window').down('textfield[name="status"]').setValue('Enviado');
        }
    },
    guardarCommunication: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var directedContactPointCom = [];
        var statusCom = null;
        if (form.isValid() && btn.up('window').down('#contactpointcommunicationgrid').getSelectionModel().getSelection().length > 0) {
            var unspecifiedContentV1Record = form.getRecord();
            if (unspecifiedContentV1Record !== undefined
                    && unspecifiedContentV1Record !== null
                    && unspecifiedContentV1Record.get('communicationIdentifierCom') !== null
                    && unspecifiedContentV1Record.get('communicationIdentifierCom') !== undefined
                    && new String(unspecifiedContentV1Record.get('communicationIdentifierCom')).indexOf('UnspecifiedContentV1') === -1) {
                btn.setDisabled(false);
                this.update(btn);
            } else {
                statusCom = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1', {});
                statusCom.set({
                    statusIdentifierSta: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    nameSta: 'Borrador',
                    codeCms: 'Draft'
                });
                var objeto = form.getValues(false, false, false);
                var referencedSubjectTypeNameCoc = btn.up('window').down('hiddenfield[name="referencedSubjectTypeNameCoc"]').getValue();
                var referencedSubjectIdentifierCoc = btn.up('window').down('hiddenfield[name="referencedSubjectIdentifierCoc"]').getValue();

                var contactpointcommunicationStore = btn.up('window').down('#contactpointcommunicationgrid').getSelectionModel().getSelection();
                for (var i = 0; i < contactpointcommunicationStore.length; i++) {
                    if (contactpointcommunicationStore[i].data.preferredContactPar !== null && contactpointcommunicationStore[i].data.preferredContactPar.length > 0) {
                        directedContactPointCom.push(contactpointcommunicationStore[i].data.preferredContactPar[0].preferredContactPointCop);
                    }
                }
                var unspecifiedContentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1', {});
                unspecifiedContentV1.set(objeto);
                unspecifiedContentV1.set({
                    communicationIdentifierCom: null,
                    creationUserImo: usuario.get('userName'),
                    creationDateTimeImo: new Date(),
                    updateUserImo: usuario.get('userName'),
                    updateDateTimeImo: new Date(),
                    purposeCodeCom: 'Sale',
                    directionTypeCodeCom: 'Outbound',
                    directedContactPointCom: directedContactPointCom,
                    referencedSubjectTypeNameCoc: referencedSubjectTypeNameCoc,
                    referencedSubjectIdentifierCoc: referencedSubjectIdentifierCoc
                });

                var unspecifiedContentV1Validation = Ext.create('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1Validation', {});
                var validations = unspecifiedContentV1Validation.createValidations(unspecifiedContentV1);
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
                btn.up('window').mask("Guardando", "x-mask-loading");
                unspecifiedContentV1.save({
                    callback: function(record, operation) {
                        if (operation.success === true) {
                            var respuesta = Ext.decode(operation._response.responseText);
                            if (respuesta.valido === true) {
                                var unspecifiedContentV1 = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1', respuesta.data);
								if(Ext.ComponentQuery.query('unspecifiedcontentgrid').length > 0){
									var storeUnspecifiedContentGrid = Ext.ComponentQuery.query('unspecifiedcontentgrid')[0].getStore();
									storeUnspecifiedContentGrid.removeAll();
									storeUnspecifiedContentGrid.reload();
									var storeUnspecifiedContent = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1', {});
									storeUnspecifiedContent.filters.clear();
									delete storeUnspecifiedContent.getProxy().extraParams['filters'];
									var filtroUnspecifiedContent = filterCreation('UnspecifiedContent');
									var referencedSubjectIdentifierCoc = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
										nombreCampo: 'referencedSubjectIdentifierCoc',
										valor: unspecifiedContentV1.get('referencedSubjectIdentifierCoc'),
										operacion: '=',
										tipoValor: 'int'
									});
									filtroUnspecifiedContent.push(referencedSubjectIdentifierCoc.data);
									storeUnspecifiedContent.getProxy().setExtraParam('filters', Ext.encode(filtroUnspecifiedContent));
									storeUnspecifiedContent.currentPage = 1;
									storeUnspecifiedContent.load({
										callback: function(records, operation, success) {
											if (records.length > 0 && success === true) {
												storeUnspecifiedContentGrid.loadRawData(records, true);
												storeUnspecifiedContentGrid.reload();
											}
										}
									});									
								}
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                            } else {
                                crearVentana(respuesta.codigo, respuesta.mensaje);
                            }
							btn.up('window').close();
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
            if (btn.up('window').down('#contactpointcommunicationgrid').getSelectionModel().getSelection() < 1) {
                msg += '<b>- Destinatarios.</b> Debe seleccionar a lo menos un destinatario.<br />';
            }
            crearVentana(5, msg);
            btn.setDisabled(false);
        }
    },
    update: function(btn) {
        btn.setDisabled(true);
        var form = btn.up('window').down('form').getForm();
        var directedContactPointCom = [];
        var contactpointcommunicationStore = btn.up('window').down('#contactpointcommunicationgrid').getSelectionModel().getSelection();
        for (var i = 0; i < contactpointcommunicationStore.length; i++) {
            if (contactpointcommunicationStore[i].data.preferredContactPar !== null && contactpointcommunicationStore[i].data.preferredContactPar.length > 0) {
                directedContactPointCom.push(contactpointcommunicationStore[i].data.preferredContactPar[0].preferredContactPointCop);
            }
        }
        var objeto = form.getValues(false, false, false);
        var unspecifiedContentV1 = form.getRecord();
        //objeto = this.application.getConvertion().convert (objeto, unspecifiedContentV1);
        unspecifiedContentV1.set(objeto);
        unspecifiedContentV1.set({
            directedContactPointCom: directedContactPointCom,
            updateUserImo: usuario.get('userName'),
            updateDateTimeImo: new Date()
        });

        var unspecifiedContentV1Validation = Ext.create('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1Validation', {});
        var validations = unspecifiedContentV1Validation.createValidations(unspecifiedContentV1);
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
        btn.up('window').mask("Guardando", "x-mask-loading");
        unspecifiedContentV1.save({
            callback: function(record, operation) {
                var respuesta = Ext.decode(operation._response.responseText);
                if (respuesta.valido === true) {
                    btn.up('window').close();
                    var storeUnspecifiedContentGrid = Ext.ComponentQuery.query('unspecifiedcontentgrid')[0].getStore();
                    storeUnspecifiedContentGrid.removeAll();
                    storeUnspecifiedContentGrid.reload();
                    var storeUnspecifiedContent = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1', {});
                    storeUnspecifiedContent.filters.clear();
                    delete storeUnspecifiedContent.getProxy().extraParams['filters'];
                    var filtroUnspecifiedContent = filterCreation('UnspecifiedContent');
                    var referencedSubjectIdentifierCoc = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'referencedSubjectIdentifierCoc',
                        valor: record.get('referencedSubjectIdentifierCoc'),
                        operacion: '=',
                        tipoValor: 'int'
                    });

                    filtroUnspecifiedContent.push(referencedSubjectIdentifierCoc.data);


                    storeUnspecifiedContent.getProxy().setExtraParam('filters', Ext.encode(filtroUnspecifiedContent));
                    storeUnspecifiedContent.currentPage = 1;
                    storeUnspecifiedContent.load({
                        callback: function(records, operation, success) {
                            if (records.length > 0 && success === true) {

                                storeUnspecifiedContentGrid.loadRawData(records, true);
                                storeUnspecifiedContentGrid.reload();
                            }
                        }
                    });
                    crearVentana(respuesta.codigo, respuesta.mensaje);
                } else {
                    if (operation.error) {
                        crearVentana(operation.error.status, "Error de conexión");
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
    },
    editRol: function(btn) {
        btn.setDisabled(true);
        var seleccion = btn.up('grid').getSelectionModel().getSelection();
        if (seleccion.length == 1) {
            AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.UtilContactPreference');
            AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.UtilControllerV1');
            var window = null;
            if (seleccion[0].get('typeNameImo') === 'Person') {
                window = Ext.widget('personyv1principalwindow_ext');
                window.down('dataperson').down('fieldset').setTitle('Datos de la Persona');
                var fields = window.down('dataperson').query('field');
                for (var i = 0; i < fields.length; i++) {
                    fields[i].setReadOnly(true);
                }
                var combo = window.down('dataperson').query('combo')
                for (var i = 0; i < combo.length; i++) {
                    combo[i].setReadOnly(true);
                }
                window.setTitle('Datos de la Persona');
            } else if (seleccion[0].get('typeNameImo') === 'Company') {
                window = Ext.widget('companyv1principalwindow_ext');
                window.down('datacompany').down('fieldset').setTitle('Datos de la Empresa');
                var fields = window.down('datacompany').query('field');
                for (var i = 0; i < fields.length; i++) {
                    fields[i].setReadOnly(true);
                }
                var combo = window.down('datacompany').query('combo')
                for (var i = 0; i < combo.length; i++) {
                    combo[i].setReadOnly(true);
                }
                window.setTitle('Datos de la Empresa');
            }
            var partyRoleInAgreement = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
            partyRoleInAgreement.set({
                playerPartyPar: seleccion[0].data
            });
            window.down('form').getForm().loadRecord(partyRoleInAgreement);
            AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.UtilControllerV1')._loadPartyData(window, partyRoleInAgreement);
            window.show();
            btn.setDisabled(false);
        } else {
            crearVentana(5, "Debe seleccionar un elemento");
            btn.setDisabled(false);
        }
    },
    updateParty: function(btn) {
        btn.setDisabled(true);
        var me = this;
        var form = btn.up('window').down('form').getForm();
        var namePar = null;
        var ownedCapabilityPar = null;
        var playerPartyPar = null;
        var preferredContactPreferencePar = [];
        var preferredContactPar = [];
        var window = btn.up('window');
        if (form.isValid()) {
            var partyRoleInAgreement = form.getRecord();
            var objeto = form.getValues(false, false, false);
            playerPartyPar = partyRoleInAgreement.get('playerPartyPar');
            Ext.Ajax.request({
                url: urlService + 'partyService/findById',
                async: false,
                method: 'POST',
                params: {
                    id: partyRoleInAgreement.get('playerPartyPar').partyIdentifierPar
                },
                callback: function(options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    if (respuesta.valido) {
                        partyRoleInAgreement.get('playerPartyPar').ownedGeneralOwnershipPar = respuesta.data.ownedGeneralOwnershipPar;
                    }
                }
            });
            if (playerPartyPar.preferredContactPar === null || playerPartyPar.preferredContactPar === undefined) {
                playerPartyPar.preferredContactPar = [];
            }
            AFW_FND_Xjs.getApplication().getController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.roleAndRelationship.UtilControllerV1').setDataContactPreference(window, playerPartyPar, objeto);
            var party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', partyRoleInAgreement.get('playerPartyPar'));
            party.save({
                callback: function(record, operation) {
                    if (operation.success === true) {
                        var respuesta = Ext.decode(operation._response.responseText);
                        if (respuesta.valido === true) {
                            btn.up('window').close();
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                            var grid = Ext.ComponentQuery.query('#contactpointcommunicationgrid')[Ext.ComponentQuery.query('#contactpointcommunicationgrid').length - 1];
                            var typeContactPoint = grid.typeContactPoint;
                            grid.mask('Cargando');
                            var me = this;
                            var quotationRequestSt = Ext.getStore('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1');
                            quotationRequestSt.removeAll();
                            quotationRequestSt.filters.clear();
                            delete quotationRequestSt.getProxy().extraParams['filters'];
                            var filtro = [Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                    nombreCampo: 'activityIdentifierAct',
                                    valor: grid.up('window').down('hiddenfield[name="referencedSubjectIdentifierCoc"]').getValue(),
                                    valores: null,
                                    operacion: '=',
                                    tipoValor: 'long'
                                }).data];
                            quotationRequestSt.getProxy().setExtraParam('filters', Ext.encode(filtro));
                            me.typeContactPoint = typeContactPoint;
                            quotationRequestSt.load({
                                scope: me,
                                callback: function(records, operation, success) {
                                    var me = this;
                                    var typeContactPoint = me.typeContactPoint;
                                    if (success) {
                                        var respuesta = Ext.decode(operation._response.responseText);
                                        if (respuesta.valido) {
                                            if (respuesta.datos != null && respuesta.datos != undefined && respuesta.datos.length > 0) {
                                                var record = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.agreementRequest.QuotationRequestV1', respuesta.datos[0]);
                                                var isContextForAgr = record.data.isContextForAgr;
                                                referencedSubjectIdentifierCoc = record.data.activityIdentifierAct;
                                                typeNameImo = record.data.typeNameImo;
                                                var storeParty = Ext.ComponentQuery.query('#contactpointcommunicationgrid')[Ext.ComponentQuery.query('#contactpointcommunicationgrid').length - 1].getStore();
                                                storeParty.removeAll();
                                                storeParty.filters.clear();
                                                var filtro = [];
                                                var partys = [];
                                                for (var i = 0; i < isContextForAgr.length; ++i) {
                                                    if (isContextForAgr[i].roleIdentifierRol != null && isContextForAgr[i].roleIdentifierRol != undefined) {
                                                        partys.push(isContextForAgr[i].roleIdentifierRol);
                                                    }
                                                }
                                                var store = Ext.create('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInAgreementV1', {});
                                                var filtro = [];
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'roleIdentifierRol',
                                                    valor: null,
                                                    valores: partys,
                                                    operacion: 'in',
                                                    tipoValor: 'long'
                                                }).data);
                                                filtro.push(Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                    nombreCampo: 'rolePlayerPeriodEndDateTimeRol',
                                                    valor: Ext.util.Format.date(new Date(), 'Y-m-d H:d:s'),
                                                    operacion: 'isnull',
                                                    tipoValor: 'date'
                                                }).data);
                                                store.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                                store.load({
                                                    callback: function(records, operation, success) {
                                                        if (success && records.length > 0) {
                                                            var party = null;
                                                            var data = [];
                                                            for (var i = 0; i < records.length; ++i) {
                                                                var playerPartyPar = records[i].data.playerPartyPar;
                                                                if (playerPartyPar == null || playerPartyPar == undefined)
                                                                    continue;
                                                                party = Ext.create('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1', {});
                                                                party.data = playerPartyPar;
                                                                var partyPointContact = party.copy(null);
                                                                var index = partyRoleInAgreementStoreKind.findExact('enumerationLiteralEnu', records[i].data.typeNameImo);
                                                                var rol = records[i].data.typeNameImo;
                                                                if (index >= 0) {
                                                                    rol = partyRoleInAgreementStoreKind.getAt(index).get('descriptionEnu');
                                                                }
                                                                partyPointContact.data.rol = rol;
                                                                partyPointContact.data.preferredContactPar2 = [];
                                                                if (playerPartyPar.preferredContactPar != null && playerPartyPar.preferredContactPar != undefined && playerPartyPar.preferredContactPar.length > 0) {
                                                                    for (var j = 0; j < playerPartyPar.preferredContactPar.length; ++j) {
                                                                        if (playerPartyPar.preferredContactPar[j].preferredContactPointCop.typeNameImo === typeContactPoint) {
                                                                            partyPointContact.data.preferredContactPar2.push(playerPartyPar.preferredContactPar[j]);
                                                                        }
                                                                    }
                                                                }
                                                                data.push(partyPointContact.data);
                                                            }
                                                            storeParty.getProxy().setData(data);
                                                            storeParty.reload();
                                                            Ext.ComponentQuery.query('#contactpointcommunicationgrid')[Ext.ComponentQuery.query('#contactpointcommunicationgrid').length - 1].unmask();
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            });
                        } else {
                            crearVentana(respuesta.codigo, respuesta.mensaje);
                            btn.setDisabled(false);
                        }
                    } else {
                        if (operation.error) {
                            crearVentana(operation.error.status, "Error de conexión");
                            btn.setDisabled(false);
                        }
                    }
                }
            });
        } else {
            invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i < invalidFields.length; i++) {
                msg += '<b>- ' + invalidFields[i].fieldLabel + '</b>. ';
                for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
                    msg += invalidFields[i].getErrors()[j] + '. ';
                }
                if (invalidFields[i].up('fieldset').getItemId() == 'direccion_postal' || invalidFields[i].up('fieldset').getItemId() == 'direccion_visita') {
                    invalidFields[i].setReadOnly(false);
                    invalidFields[i].setHideTrigger(false);
                    ;
                }
                msg += '<br />';
            }
            crearVentana(5, msg);
            btn.setDisabled(false);
        }
    }
});
