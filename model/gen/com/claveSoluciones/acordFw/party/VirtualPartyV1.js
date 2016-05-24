Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.VirtualPartyV1', {
    extend: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'VirtualParty'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'partyKindPar', type: 'string', useNull: true, defaultValue: 'VirtualParty'},
        {name: 'nameVip', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.VirtualPartyNameV1'}],

        clientIdProperty: 'partyIdentifierPar',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'virtualPartyService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
