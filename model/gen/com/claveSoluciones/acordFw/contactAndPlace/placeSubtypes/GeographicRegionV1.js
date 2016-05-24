Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.GeographicRegionV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'
        ],

    fields: [
        {name: 'keyImo', type: 'string'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'GeographicRegion'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'namePla', type: 'string'},
        {name: 'availablePeriodStartDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionPla', type: 'string'},
        {name: 'abbreviationPla', type: 'string'},
        {name: 'surfaceAreaValuePla', type: 'float'},
        {name: 'surfaceAreaUnitCodePla', type: 'string'},
        {name: 'identifyingAddressPla', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'},
        {name: 'placeKindPla', type: 'string', useNull: true, defaultValue: 'GeographicRegion'}],

        clientIdProperty: 'placeIdentifierPla',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'geographicRegionService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
