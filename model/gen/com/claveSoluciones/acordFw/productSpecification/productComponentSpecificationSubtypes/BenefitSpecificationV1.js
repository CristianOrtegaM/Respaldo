Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.BenefitSpecificationV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductComponentSpecificationV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'BenefitSpecification'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'versionSpe', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: 'ProductSpecification'},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'},
        {name: 'statusPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'},
        {name: 'productExternalCodePrs', type: 'string'},
        {name: 'productSpecificationKindPrs', type: 'string', useNull: true, defaultValue: 'ProductComponentSpecification'},
        {name: 'broadLineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null},
        {name: 'filedFormNumberPrs', type: 'string'},
        {name: 'internalNamePrs', type: 'string'},
        {name: 'lineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null},
        {name: 'marketableIndicatorPrs', type: 'boolean'},
        {name: 'marketablePeriodEndDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'marketablePeriodStartDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'marketingNamePrs', type: 'string'},
        {name: 'newProductSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'productComponentSpecificationKindCom', type: 'string', useNull: true, defaultValue: 'BenefitSpecification'},
        {name: 'benefitSpecificationKindBes', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'benefitSpecificationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
