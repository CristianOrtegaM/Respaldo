Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
        //'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'CommunicationContent'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'priorityCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'directedContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'nameCoc', type: 'string'},
        {name: 'descriptionCom', type: 'string'},
        {name: 'actualEndDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'actualStartDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'communicationContentKindCoc', type: 'string', useNull: true, defaultValue: null},
        {name: 'communicationKindCom', type: 'string', useNull: true, defaultValue: 'CommunicationContent'},
        {name: 'declarerCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'describedProductSpecificationCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'directionTypeCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'followsUpCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1'},
        {name: 'hasForContentCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'},
        {name: 'includesCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'},
        {name: 'isCorrectedByCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'},
        {name: 'isStoredAsCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.DocumentV1'},
        {name: 'originatingContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'ownerCoc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'plannedEndDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'plannedStartDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'purposeCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'receiverCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'referencedSubjectIdentifierCoc', type: 'int'},
        {name: 'referencedSubjectTypeNameCoc', type: 'string'},
        {name: 'repliedToContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'respondsToCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1'},
        {name: 'senderCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'sendingContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'}],

        clientIdProperty: 'communicationIdentifierCom',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'communicationContentService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
