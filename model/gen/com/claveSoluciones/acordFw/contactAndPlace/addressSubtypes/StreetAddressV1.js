Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.StreetAddressV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'StreetAddress'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'typeExternalCodeSta', type: 'string'},
        {name: 'nameSta', type: 'string'},
        {name: 'numberSta', type: 'string'},
        {name: 'preDirectionCodeSta', type: 'string', useNull: true, defaultValue: null},
        {name: 'postDirectionCodeSta', type: 'string', useNull: true, defaultValue: null},
        {name: 'unstructuredAddressPla', type: 'string'},
        {name: 'addressKindAdd', type: 'string', useNull: true, defaultValue: 'PlaceAddress'},
        {name: 'identifiedPlacePla', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'placeAddressKindPla', type: 'string', useNull: true, defaultValue: 'StreetAddress'}],

        clientIdProperty: 'addressIdentifierAdd',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'streetAddressService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
