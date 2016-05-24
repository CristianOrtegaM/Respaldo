Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.documentSubtypes.AgreementDocumentV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'AgreementDocument'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'documentKindDoc', type: 'string', useNull: true, defaultValue: 'AgreementDocument'},
        {name: 'effectivePeriodEndDateTimeDoc', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodStartDateTimeDoc', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'emissionDateDoc', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'fileOfDocumentsDoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1'},
        {name: 'freeContentIndicatorDoc', type: 'boolean'},
        {name: 'identifierDoc', type: 'string'},
        {name: 'includedDocumentDoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1'},
        {name: 'languageExternalCodeDoc', type: 'string'},
        {name: 'modifiableIndicatorDoc', type: 'boolean'},
        {name: 'nameDoc', type: 'string'},
        {name: 'receptionDateDoc', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'replacesDoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1'},
        {name: 'signatureRequiredIndicatorDoc', type: 'boolean'},
        {name: 'signedIndicatorDoc', type: 'boolean'},
        {name: 'storageLocationDoc', type: 'string'},
        {name: 'typeCodeDoc', type: 'string', useNull: true, defaultValue: null},
        {name: 'versionIdentifierDoc', type: 'string'},
        {name: 'agreementDocumentKindAgd', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'documentIdentifierDoc',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'agreementDocumentService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
