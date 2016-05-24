Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ExchangeRate'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'fromCurrencyTypeExternalCodeExr', type: 'string'},
        {name: 'toCurrencyTypeExternalCodeExr', type: 'string'},
        {name: 'asOfDateExr', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'conversionFactorExr', type: 'float'}],

        clientIdProperty: 'exchangeRateIdentifierExr',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'exchangeRateService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
