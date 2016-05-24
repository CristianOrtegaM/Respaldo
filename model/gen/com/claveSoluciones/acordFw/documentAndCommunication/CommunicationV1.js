Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1',
        //'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Communication'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'priorityCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'directedContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'descriptionCom', type: 'string'},
        {name: 'actualEndDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'actualStartDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'communicationKindCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'directionTypeCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'followsUpCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationV1'},
        {name: 'hasForContentCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationContentV1'},
        {name: 'originatingContactPointCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'plannedEndDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'plannedStartDateTimeCom', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'purposeCodeCom', type: 'string', useNull: true, defaultValue: null},
        {name: 'receiverCom', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
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
            url: urlService + 'communicationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
