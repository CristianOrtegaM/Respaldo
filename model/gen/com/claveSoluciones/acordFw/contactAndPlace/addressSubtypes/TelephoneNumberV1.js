Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelephoneNumberV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.TelecommunicationAddressV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'TelephoneNumber'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'addressKindAdd', type: 'string', useNull: true, defaultValue: 'NetworkAddress'},
        {name: 'areaExternalCodeTnu', type: 'string'},
        {name: 'countryExternalCodeTnu', type: 'string'},
        {name: 'extensionTnu', type: 'string'},
        {name: 'fullNumberTnu', type: 'string'},
        {name: 'identifierNea', type: 'string'},
        {name: 'localNumberTea', type: 'string'},
        {name: 'networkAddressKindNea', type: 'string', useNull: true, defaultValue: 'TelecommunicationAddress'},
        {name: 'telecommunicationAddressKindTea', type: 'string', useNull: true, defaultValue: 'TelephoneNumber'},
        {name: 'trunkPrefixTnu', type: 'string'}],

        clientIdProperty: 'addressIdentifierAdd',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'telephoneNumberService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
