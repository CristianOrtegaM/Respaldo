Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'VirtualPartyName'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyNameKindPan', type: 'string', useNull: true, defaultValue: 'VirtualPartyName'},
        {name: 'fullNamePan', type: 'string'},
        {name: 'languageExternalCodePan', type: 'string'},
        {name: 'defaultIndicatorPan', type: 'boolean'},
        {name: 'effectivePeriodStartDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodEndDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionPan', type: 'string'},
        {name: 'usageCodeVpn', type: 'string', useNull: true, defaultValue: null}],

        clientIdProperty: 'partyNameIdentifierPan',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'virtualPartyNameService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
