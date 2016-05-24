Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.ElectronicContactV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ElectronicContact'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'availablePeriodEndDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodStartDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'statusCop', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1'},
        {name: 'contactPointKindCop', type: 'string', useNull: true, defaultValue: 'ElectronicContact'},
        {name: 'electronicContactKindElc', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'contactPointIdentifierCop',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'electronicContactService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
