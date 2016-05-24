Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ContactPreference'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'statusCop', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1'},
        {name: 'purposeCop', type: 'string'},
        {name: 'availablePeriodStartDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'redListIndicatorCop', type: 'boolean'},
        {name: 'preferredContactPointCop', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1'},
        {name: 'lastValidatedDateCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'contactInstructionsCop', type: 'string'},
        {name: 'priorityLevelCop', type: 'int'},
        {name: 'validationResultCodeCop', type: 'string', useNull: true, defaultValue: null},
        {name: 'purposeCodeCop', type: 'string', useNull: true, defaultValue: null},
        {name: 'usageCodeCop', type: 'string', useNull: true, defaultValue: null},
        {name: 'solicitableIndicatorCop', type: 'boolean'}],

        clientIdProperty: 'contactPreferenceIdentifierCop',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'contactPreferenceService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
