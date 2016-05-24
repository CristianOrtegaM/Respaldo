Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentSpecificationV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'CommunicationContentTemplate'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'titleCcs', type: 'string'},
        {name: 'versionNumberCcs', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'communicationContentSpecificationKindCcs', type: 'string', useNull: true, defaultValue: 'CommunicationContentTemplate'},
        {name: 'communicationContentTemplateKindCct', type: 'string', useNull: true, defaultValue: null},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'languageExternalCodeCcs', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'CommunicationContentSpecification'},
        {name: 'versionSpe', type: 'string'}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'communicationContentTemplateService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
