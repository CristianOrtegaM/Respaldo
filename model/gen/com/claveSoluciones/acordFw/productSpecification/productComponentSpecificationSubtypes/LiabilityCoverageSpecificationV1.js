Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.LiabilityCoverageSpecificationV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.CoverageSpecificationV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'
        ],

    fields: [
        {name: 'statusPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'},
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
        {name: 'coveredRiskOccurrenceCountCos', type: 'float'},
        {name: 'includedPerilCos', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1'},
        {name: 'excludedPerilCos', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1'},
        {name: 'ageDateUseCodeCos', type: 'string', useNull: true, defaultValue: null},
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'benefitSpecificationKindBes', type: 'string', useNull: true, defaultValue: 'CoverageSpecification'},
        {name: 'coverageSpecificationKindCos', type: 'string', useNull: true, defaultValue: 'LiabilityCoverageSpecification'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'filedFormNumberPrs', type: 'string'},
        {name: 'internalNamePrs', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'newProductSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'},
        {name: 'productComponentSpecificationKindCom', type: 'string', useNull: true, defaultValue: 'BenefitSpecification'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: 'ProductSpecification'},
        {name: 'productSpecificationKindPrs', type: 'string', useNull: true, defaultValue: 'ProductComponentSpecification'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'LiabilityCoverageSpecification'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'liabilityCoverageSpecificationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
