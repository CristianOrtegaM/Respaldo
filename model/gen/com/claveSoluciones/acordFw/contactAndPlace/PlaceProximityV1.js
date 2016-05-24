Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PlaceProximity'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'toPlacePlp', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'fromPlacePlp', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'descriptionPlp', type: 'string'},
        {name: 'typeCodePlp', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'placeProximityIdentifierPlp',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'placeProximityService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
