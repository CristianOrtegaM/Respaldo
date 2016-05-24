Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', {
    extend: 'Ext.data.Model',
    models:
        [
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PostCode'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'namePla', type: 'string'},
        {name: 'assignedCodeExtensionPoc', type: 'string'},
        {name: 'assignedExternalCodePoc', type: 'string'},
        {name: 'availablePeriodStartDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimePla', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'abbreviationPla', type: 'string'},
        {name: 'descriptionPla', type: 'string'},
        {name: 'subSystemTypeCodePoc', type: 'string', useNull: true, defaultValue: null},
        {name: 'surfaceAreaValuePla', type: 'float'},
        {name: 'surfaceAreaUnitCodePla', type: 'string'},
        {name: 'identifyingAddressPla', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PlaceAddressV1'},
        {name: 'placeKindPla', type: 'string', useNull: true, defaultValue: 'PostCode'}],

        clientIdProperty: 'placeIdentifierPla',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'postCodeService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
