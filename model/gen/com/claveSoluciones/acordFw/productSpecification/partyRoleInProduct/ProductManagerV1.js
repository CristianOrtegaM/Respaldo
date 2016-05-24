Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.partyRoleInProduct.ProductManagerV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.partyRoleSubtypes.PartyRoleInProductV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ProductManager'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'roleKindRol', type: 'string', useNull: true, defaultValue: 'PartyRole'},
        {name: 'rolePlayerPeriodStartDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'rolePlayerPeriodEndDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionRol', type: 'string'},
        {name: 'playerRoleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'},
        {name: 'roleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'},
        {name: 'partyRoleKindPar', type: 'string', useNull: true, defaultValue: 'PartyRoleInProduct'},
        {name: 'playerPartyPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1'},
        {name: 'namePar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1'},
        {name: 'designedSpecificationPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1'},
        {name: 'ownedCapabilityPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'},
        {name: 'partyRoleInProductKindRpr', type: 'string', useNull: true, defaultValue: 'ProductManager'},
        {name: 'involvingProductSpecificationRpr', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationV1'}],

        clientIdProperty: 'roleIdentifierRol',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'productManagerService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
