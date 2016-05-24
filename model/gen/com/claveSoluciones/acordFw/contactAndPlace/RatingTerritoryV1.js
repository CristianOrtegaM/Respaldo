Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.RatingTerritoryV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1',
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.AgreementComponentV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'RatingTerritory'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeCodeRat', type: 'string', useNull: true, defaultValue: null},
        {name: 'territoryExternalCodeRat', type: 'string'},
        {name: 'identifiedPlaceRat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceV1'},
        {name: 'supplementedAgreementComponentRat', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.agreement.AgreementComponentV1'}],

        clientIdProperty: 'ratingTerritoryIdentifierRat',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'ratingTerritoryService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
