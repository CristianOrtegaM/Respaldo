Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.ProductRegistrationV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1'
        ],

    fields: [
        {name: 'statusReg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistrationStatusV1'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ProductRegistration'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'registrationKindReg', type: 'string', useNull: true, defaultValue: 'ProductRegistration'},
        {name: 'identifierReg', type: 'string'},
        {name: 'effectivePeriodStartDateTimeReg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodEndDateTimeReg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionReg', type: 'string'},
        {name: 'disqualificationDateReg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'disqualificationReasonCodeReg', type: 'string', useNull: true, defaultValue: null},
        {name: 'lastUsedDateReg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'lastVerifiedDateReg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'includedInRegistryReg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1'},
        {name: 'registeredProductSpecificationPrr', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'}],

        clientIdProperty: 'registrationIdentifierReg',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'productRegistrationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
