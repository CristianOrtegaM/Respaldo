Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'RegistryAuthority'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'roleKindRol', type: 'string', useNull: true, defaultValue: 'PartyRole'},
        {name: 'rolePlayerPeriodStartDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'rolePlayerPeriodEndDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionRol', type: 'string'},
        {name: 'playerRoleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'},
        {name: 'roleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'},
        {name: 'partyRoleKindPar', type: 'string', useNull: true, defaultValue: 'PartyRoleInRegistration'},
        {name: 'playerPartyPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1'},
        {name: 'namePar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1'},
        {name: 'designedSpecificationPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1'},
        {name: 'ownedCapabilityPar', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'},
        {name: 'partyRoleInRegistrationKindPri', type: 'string', useNull: true, defaultValue: 'RegistryAuthority'},
        {name: 'authorizingOrganizationRea', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1'},
        {name: 'administeredRegistryRea', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryV1'}],

        clientIdProperty: 'roleIdentifierRol',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'registryAuthorityService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
