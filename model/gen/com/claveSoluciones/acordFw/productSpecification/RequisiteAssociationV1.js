Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.RequisiteAssociationV1', {
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
        {name: 'typeNameImo', type: 'string', defaultValue: 'RequisiteAssociation'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'productAssociationKindPra', type: 'string', useNull: true, defaultValue: 'RequisiteAssociation'},
        {name: 'effectivePeriodStartDateTimePra', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodEndDateTimePra', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'associatedProductSpecificationBasePra', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1'}],

        clientIdProperty: 'productAssociationIdentifierPra',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'requisiteAssociationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
