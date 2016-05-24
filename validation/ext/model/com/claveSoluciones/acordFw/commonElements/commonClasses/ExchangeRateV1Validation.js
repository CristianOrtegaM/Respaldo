Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExchangeRateV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(exchangeRateV1) {
        var validations = new Array();
        
         if (exchangeRateV1.data.fromCurrencyTypeExternalCodeExr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: exchangeRateV1.data.fromCurrencyTypeExternalCodeExr,
                campo1: 'fromCurrencyTypeExternalCodeExr',
                valor2: exchangeRateV1.data.toCurrencyTypeExternalCodeExr,
                operacion: '!==',
                mensaje: 'El campo Moneda Desde no debe ser igual al campo Moneda Hasta.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
