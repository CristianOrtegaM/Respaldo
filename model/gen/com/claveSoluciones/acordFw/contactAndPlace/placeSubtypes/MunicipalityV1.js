Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Municipality'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'namePla', type: 'string'},
        {name: 'availablePeriodStartDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionPla', type: 'string'},
        {name: 'abbreviationPla', type: 'string'},
        {name: 'surfaceAreaValuePla', type: 'float'},
        {name: 'surfaceAreaUnitCodePla', type: 'string'},
        {name: 'assignedExternalCodeMun', type: 'string'},
        {name: 'administrativeSubDivisionCodeMun', type: 'string', useNull: true, defaultValue: null},
        {name: 'identifyingAddressPla', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'},
        {name: 'placeKindPla', type: 'string', useNull: true, defaultValue: 'Municipality'},
        {name: 'typeCodeMun', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'placeIdentifierPla',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'municipalityService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});