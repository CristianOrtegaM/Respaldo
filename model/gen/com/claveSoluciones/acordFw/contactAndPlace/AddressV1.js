Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.AddressV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Address'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'addressKindAdd', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'addressIdentifierAdd',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'addressService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
