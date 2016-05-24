Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'externalCodeListExc', type: 'string'},
        {name: 'externalCodeExc', type: 'string'},
        {name: 'descriptionExc', type: 'string'},
        {name: 'languageExternalCodeExc', type: 'string'},
        {name: 'usableIndicatorExc', type: 'boolean'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ExternalCode'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'}],

        clientIdProperty: 'externalCodeIdentifierExc',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'externalCodeService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
