Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ActivityPlaceV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.activity.ActivityV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ActivityPlace'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'placeAcp', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'activityAcp', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.activity.ActivityV1'},
        {name: 'itineraryCodeAcp', type: 'string', useNull: true, defaultValue: null},
        {name: 'frequencyCodeAcp', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'activityPlaceIdentifierAcp',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'activityPlaceService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
