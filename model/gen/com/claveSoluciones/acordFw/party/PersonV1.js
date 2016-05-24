Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PersonV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Person'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyKindPar', type: 'string', useNull: true, defaultValue: 'Person'},
        {name: 'birthDatePer', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'genderCodePer', type: 'string', useNull: true, defaultValue: null},
        {name: 'deathIndicatorPer', type: 'boolean'},
        {name: 'deathDatePer', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'ethnicityCodePer', type: 'string', useNull: true, defaultValue: null},
        {name: 'bloodTypeCodePer', type: 'string', useNull: true, defaultValue: null},
        {name: 'maritalStatusCodePer', type: 'string', useNull: true, defaultValue: null},
        {name: 'primaryLanguageExternalCodePer', type: 'string'},
        {name: 'missingIndicatorPer', type: 'boolean'},
        {name: 'missingDatePer', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'namePer', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1'}],

        clientIdProperty: 'partyIdentifierPar',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'personService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
