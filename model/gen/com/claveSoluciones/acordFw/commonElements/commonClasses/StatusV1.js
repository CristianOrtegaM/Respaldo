Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.StatusV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Status'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'statusKindSta', type: 'string', useNull: true, defaultValue: null},
        {name: 'effectiveDateTimeSta', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'nameSta', type: 'string'},
        {name: 'reasonSta', type: 'string'}],

        clientIdProperty: 'statusIdentifierSta',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'statusService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
