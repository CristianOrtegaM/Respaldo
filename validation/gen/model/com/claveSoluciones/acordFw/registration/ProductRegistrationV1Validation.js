Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.ProductRegistrationV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(productRegistrationV1) {
        var validations = new Array();

        if (productRegistrationV1.data.disqualificationDateReg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRegistrationV1.data.disqualificationDateReg,
                campo1: 'disqualificationDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Descalificación debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (productRegistrationV1.data.effectivePeriodStartDateTimeReg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRegistrationV1.data.effectivePeriodStartDateTimeReg,
                campo1: 'effectivePeriodStartDateTime',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Vigencia Inicial debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (productRegistrationV1.data.descriptionReg !== null && productRegistrationV1.data.descriptionReg.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRegistrationV1.data.descriptionReg,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRegistrationV1.data.lastVerifiedDateReg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRegistrationV1.data.lastVerifiedDateReg,
                campo1: 'lastVerifiedDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Última Verificación debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (productRegistrationV1.data.lastUsedDateReg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRegistrationV1.data.lastUsedDateReg,
                campo1: 'lastUsedDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Último Uso debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
