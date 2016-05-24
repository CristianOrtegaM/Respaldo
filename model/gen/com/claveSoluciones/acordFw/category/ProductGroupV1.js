Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.ProductGroupV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ProductGroup'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'categoryNameCat', type: 'string'},
        {name: 'categoryDescriptionCat', type: 'string'},
        {name: 'availablePeriodStartDateTimeCat', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimeCat', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'categoryKindCat', type: 'string', useNull: true, defaultValue: 'ProductGroup'},
        {name: 'isParentCategoryOfCat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'},
        {name: 'isSubcategoryOfCat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'},
        {name: 'lineOfBusinessPrg', type: 'string'},
        {name: 'maximumCountCat', type: 'float'},
        {name: 'refreshDateCat', type: 'date', dateFormat: 'd-m-Y H:i:s'}],

        clientIdProperty: 'categoryIdentifierCat',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'productGroupService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
