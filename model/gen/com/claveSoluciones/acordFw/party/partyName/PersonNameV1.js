Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PersonNameV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PersonName'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyNameKindPan', type: 'string', useNull: true, defaultValue: 'PersonName'},
        {name: 'fullNamePan', type: 'string'},
        {name: 'languageExternalCodePan', type: 'string'},
        {name: 'defaultIndicatorPan', type: 'boolean'},
        {name: 'effectivePeriodStartDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodEndDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionPan', type: 'string'},
        {name: 'prefixTitleCodePen', type: 'string', useNull: true, defaultValue: null},
        {name: 'givenNamePen', type: 'string'},
        {name: 'middleNamePen', type: 'string'},
        {name: 'surnamePen', type: 'string'},
        {name: 'suffixPen', type: 'string'},
        {name: 'usageCodePen', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'partyNameIdentifierPan',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'personNameService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
