Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRuleV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'AttributeRule'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'attributeRuleKindAtr', type: 'string', useNull: true, defaultValue: null},
        {name: 'productRuleSpecificationKindPrs', type: 'string', useNull: true, defaultValue: 'AttributeRule'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'versionSpe', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'isConstantIndicatorAtr', type: 'boolean'},
        {name: 'controlledProductRuleSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1'},
        {name: 'controlledProductSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: 'ProductRuleSpecification'},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'},
        {name: 'ruleApplicabilityPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1'}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'attributeRuleService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
