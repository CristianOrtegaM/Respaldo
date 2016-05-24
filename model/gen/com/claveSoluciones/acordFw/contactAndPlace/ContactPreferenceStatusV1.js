Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceStatusV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.StatusV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ContactPreferenceStatus'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'codePst', type: 'string', useNull: true, defaultValue: null},
        {name: 'effectiveDateTimeSta', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'nameSta', type: 'string'},
        {name: 'reasonSta', type: 'string'},
        {name: 'statusKindSta', type: 'string', useNull: true, defaultValue: 'ContactPreferenceStatus'}],

        clientIdProperty: 'statusIdentifierSta',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'contactPreferenceStatusService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
