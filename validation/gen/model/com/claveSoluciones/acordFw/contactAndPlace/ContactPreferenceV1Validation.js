Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(contactPreferenceV1) {
        var validations = new Array();

        if (contactPreferenceV1.data.availablePeriodEndDateTimeCop !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: contactPreferenceV1.data.availablePeriodEndDateTimeCop,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimeCop',
                valor2: contactPreferenceV1.data.availablePeriodStartDateTimeCop,
                operacion: '>=',
                mensaje: 'El campo Disponible Hasta debe ser mayor o igual al campo Disponible Desde.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
