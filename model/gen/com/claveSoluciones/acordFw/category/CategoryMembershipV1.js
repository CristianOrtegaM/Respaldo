Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryMembershipV1', {
    extend: 'Ext.data.Model',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'CategoryMembership'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'categorizedIdentifierCam', type: 'int'},
        {name: 'categorizedTypeNameCam', type: 'string'},
        {name: 'categorizingCategoryCam', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategoryV1'},
        {name: 'effectivePeriodEndDateTimeCam', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodStartDateTimeCam', type: 'date', dateFormat: 'd-m-Y H:i:s'}],

        clientIdProperty: 'categoryMembershipIdentifierCam',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'categoryMembershipService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
