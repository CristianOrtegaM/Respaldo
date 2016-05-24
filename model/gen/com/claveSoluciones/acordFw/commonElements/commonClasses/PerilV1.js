Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'perilNamePer', type: 'string'},
        {name: 'perilDescriptionPer', type: 'string'},
        {name: 'includedPerilPer', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Peril'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'}],

        clientIdProperty: 'perilIdentifierPer',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'perilService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
