Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.contactPointSubtypes.WebPageContactV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'WebPageContact'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'statusCop', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPointStatusV1'},
        {name: 'availablePeriodEndDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodStartDateTimeCop', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'contactPointKindCop', type: 'string', useNull: true, defaultValue: 'WebPageContact'},
        {name: 'uniformResourceLocationWpc', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.UniformResourceLocationV1'}],

        clientIdProperty: 'contactPointIdentifierCop',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'webPageContactService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
