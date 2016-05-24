Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.GlobalPositionAddressV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'GlobalPositionAddress'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'addressKindAdd', type: 'string', useNull: true, defaultValue: 'PlaceAddress'},
        {name: 'unstructuredAddressPla', type: 'string'},
        {name: 'identifiedPlacePla', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'placeAddressKindPla', type: 'string', useNull: true, defaultValue: 'GlobalPositionAddress'},
        {name: 'coordinateSystemCodeGpa', type: 'string', useNull: true, defaultValue: null},
        {name: 'latitudeGpa', type: 'string'},
        {name: 'longitudeGpa', type: 'string'}],

        clientIdProperty: 'addressIdentifierAdd',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'globalPositionAddressService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
