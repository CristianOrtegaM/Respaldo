Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInAgreementSpecificationV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'statusPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationStatusV1'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PartyRoleInAgreementSpecification'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'controlledPartyRoleInRelationshipSpecificationPri', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.PartyRoleInRelationshipSpecificationV1'},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'internalNamePrs', type: 'string'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'marketableIndicatorPrs', type: 'boolean'},
        {name: 'marketablePeriodEndDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'marketablePeriodStartDateTimePrs', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'marketingNamePrs', type: 'string'},
        {name: 'newProductSpecificationPrs', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'},
        {name: 'productExternalCodePrs', type: 'string'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: 'ProductSpecification'},
        {name: 'productSpecificationKindPrs', type: 'string', useNull: true, defaultValue: 'RoleSpecification'},
        {name: 'roleSpecificationKindRos', type: 'string', useNull: true, defaultValue: 'PartyRoleInAgreementSpecification'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'versionSpe', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'broadLineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null},
        {name: 'filedFormNumberPrs', type: 'string'},
        {name: 'lineOfBusinessCodePrs', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'partyRoleInAgreementSpecificationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
