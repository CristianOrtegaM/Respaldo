Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1', {
    extend: 'Ext.data.Model',

    fields: [

        {name: 'basicDataCompleteCodeImo', type: 'string'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'effectiveDateTimeSta', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'nameSta', type: 'string'},
        {name: 'reasonSta', type: 'string'},
        {name: 'statusKindSta', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PeriodStatus'},
        {name: 'codePes', type: 'string'}],

        clientIdProperty: 'statusIdentifierSta',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'periodStatusService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
