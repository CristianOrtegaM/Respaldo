Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.TaxDeductionSpecificationV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductComponentSpecificationV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'
        ],

    fields: [
        {name: 'statusPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'TaxDeductionSpecification'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'productComponentSpecificationKindCom', type: 'string', useNull: true, defaultValue: 'TaxDeductionSpecification'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: 'ProductSpecification'},
        {name: 'productSpecificationKindPrs', type: 'string', useNull: true, defaultValue: 'ProductComponentSpecification'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'versionSpe', type: 'string'},
        {name: 'productExternalCodePrs', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'marketingNamePrs', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'marketableIndicatorPrs', type: 'boolean'},
        {name: 'marketablePeriodStartDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'marketablePeriodEndDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'broadLineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null},
        {name: 'lineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'filedFormNumberPrs', type: 'string'},
        {name: 'internalNamePrs', type: 'string'},
        {name: 'newProductSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'taxDeductionSpecificationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
