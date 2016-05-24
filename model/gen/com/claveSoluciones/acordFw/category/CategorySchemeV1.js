Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'CategoryScheme'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'categorySchemeNameCas', type: 'string'},
        {name: 'categoryDescriptionCas', type: 'string'},
        {name: 'overlappingIndicatorCas', type: 'boolean'},
        {name: 'exhaustiveIndicatorCas', type: 'boolean'},
        {name: 'isParentSchemeOfCas', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1'},
        {name: 'isSubschemeOfCas', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1'}],

        clientIdProperty: 'categorySchemeIdentifierCas',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'categorySchemeService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
