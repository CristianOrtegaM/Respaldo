Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'PartyName'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyNameKindPan', type: 'string', useNull: true, defaultValue: null},
        {name: 'fullNamePan', type: 'string'},
        {name: 'languageExternalCodePan', type: 'string'},
        {name: 'defaultIndicatorPan', type: 'boolean'},
        {name: 'effectivePeriodStartDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'effectivePeriodEndDateTimePan', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionPan', type: 'string'}],

        clientIdProperty: 'partyNameIdentifierPan',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'partyNameService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
