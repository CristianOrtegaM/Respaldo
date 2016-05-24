Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Organization'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyKindPar', type: 'string', useNull: true, defaultValue: 'Organization'},
        {name: 'organizationKindOrg', type: 'string', useNull: true, defaultValue: null},
        {name: 'nameOrg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1'},
        {name: 'foundationDateOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'dissolutionDateOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'memberCountOrg', type: 'float'},
        {name: 'accountingPeriodStartDateTimeOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'accountingPeriodEndDateTimeOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'playingRegistryAuthorityOrg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1'}],

        clientIdProperty: 'partyIdentifierPar',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'organizationService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
