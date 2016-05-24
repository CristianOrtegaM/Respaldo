Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ProductComposition'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'effectivePeriodEndDateTimePra', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'associatedProductSpecificationBasePra', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1'},
        {name: 'effectivePeriodStartDateTimePra', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'productAssociationKindPra', type: 'string', useNull: true, defaultValue: 'ProductComposition'},
        {name: 'minimumComponentCountPrc', type: 'float'},
        {name: 'maximumComponentCountPrc', type: 'float'},
        {name: 'calculationOrderPrc', type: 'int'},
        {name: 'displayOrderPrc', type: 'int'}],

        clientIdProperty: 'productAssociationIdentifierPra',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'productCompositionService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
