Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'codeGep', type: 'string'},
        {name: 'nameGep', type: 'string'},
        {name: 'dataTypeGep', type: 'string', useNull: true, defaultValue: null},
        {name: 'stringValueGep', type: 'string'},
        {name: 'numberValueGep', type: 'float'},
        {name: 'dateValueGep', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'GeneralParameter'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'}],

        clientIdProperty: 'generalParameterIdentifierGep',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'generalParameterService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
