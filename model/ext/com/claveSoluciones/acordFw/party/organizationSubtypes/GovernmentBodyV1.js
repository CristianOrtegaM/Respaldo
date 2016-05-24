Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1',
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyDetailSubtypes.OrganizationDetailV1',
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1',
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyDetailSubtypes.GeneralOwnershipInformationV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1',
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.partyRegistrationSubtypes.TaxRegistrationV1',
//        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationStatusV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'GovernmentBody'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'statusOrg', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.OrganizationStatusV1'},
        {name: 'organizationKindOrg', type: 'string', useNull: true, defaultValue: 'GovernmentBody'},
        {name: 'partyKindPar', type: 'string', useNull: true, defaultValue: 'Organization'},
        {name: 'nameOrg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1'},
        {name: 'foundationDateOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'involvingCriminalIncidentPar', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyDetailSubtypes.CriminalIncidentV1'},
        {name: 'dissolutionDateOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'preferredContactPar', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1'},
        {name: 'memberCountOrg', type: 'float'},
        {name: 'accountingPeriodStartDateTimeOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'accountingPeriodEndDateTimeOrg', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'registeringTaxRegistrationPar', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.partyRegistrationSubtypes.TaxRegistrationV1'},
        {name: 'ownedGeneralOwnershipPar', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyDetailSubtypes.GeneralOwnershipInformationV1'},
        {name: 'detailOrg', type: 'auto'},//reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyDetailSubtypes.OrganizationDetailV1'},
        {name: 'playingRegistryAuthorityOrg', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.registration.RegistryAuthorityV1'}],

        clientIdProperty: 'partyIdentifierPar',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'governmentBodyService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
