Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.AccountingCategoryV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'AccountingCategory'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'categoryNameCat', type: 'string'},
        {name: 'categoryDescriptionCat', type: 'string'},
        {name: 'maximumCountCat', type: 'float'},
        {name: 'sequenceCat', type: 'int'},
        {name: 'availablePeriodStartDateTimeCat', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodEndDateTimeCat', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'categoryKindCat', type: 'string', useNull: true, defaultValue: 'AccountingCategory'},
        {name: 'isParentCategoryOfCat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'},
        {name: 'isSubcategoryOfCat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1'},
        {name: 'refreshDateCat', type: 'date', dateFormat: 'd-m-Y H:i:s'}],

        clientIdProperty: 'categoryIdentifierCat',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'accountingCategoryService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
