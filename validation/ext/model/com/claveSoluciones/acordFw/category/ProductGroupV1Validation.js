Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.category.ProductGroupV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(productGroupV1) {
        var validations = new Array();
        
         if (productGroupV1.data.availablePeriodEndDateTimeCat !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productGroupV1.data.availablePeriodEndDateTimeCat,
                campo1: 'availablePeriodEndDateTimeCat',
                campo2: 'availablePeriodStartDateTimeCat',
                valor2: productGroupV1.data.availablePeriodStartDateTimeCat,
                operacion: '>=',
                mensaje: 'El campo Vigencia Final debe ser mayor o igual al campo Vigencia Inicial.'
            });
            validations.push(validation);
            
            validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productGroupV1.data.availablePeriodStartDateTimeCat,
                campo1: 'availablePeriodStartDateTimeCat',
                operacion: 'required',
                mensaje: 'El campo Inicio PerÃ­odo Contable debe ser requerido.'
            });
            
            validations.push(validation);
        }

        

        return validations;
    }
});
