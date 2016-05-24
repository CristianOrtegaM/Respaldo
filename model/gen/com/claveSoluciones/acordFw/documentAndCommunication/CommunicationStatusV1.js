Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationStatusV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.StatusV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'CommunicationStatus'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'statusKindSta', type: 'string', useNull: true, defaultValue: 'CommunicationStatus'},
        {name: 'effectiveDateTimeSta', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'nameSta', type: 'string'},
        {name: 'reasonSta', type: 'string'},
        {name: 'communicationStatusKindCms', type: 'string', useNull: true, defaultValue: null},
        {name: 'codeCms', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'statusIdentifierSta',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'communicationStatusService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
