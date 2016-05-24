Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(countryV1) {
        var validations = new Array();

        if (countryV1.data.descriptionPla !== null && countryV1.data.descriptionPla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.descriptionPla,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\r\n\\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countryV1.data.availablePeriodEndDateTimePla !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.availablePeriodEndDateTimePla,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimePla',
                valor2: countryV1.data.availablePeriodStartDateTimePla,
                operacion: '>=',
                mensaje: 'El campo Habilitado Hasta debe ser mayor o igual al campo Habilitado Desde.'
            });
            validations.push(validation);
        }

        if (countryV1.data.alphaISOExternalCodeCou !== null && countryV1.data.alphaISOExternalCodeCou.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.alphaISOExternalCodeCou,
                campo1: 'alphaISOExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código País no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countryV1.data.extendedISOExternalCodeCou !== null && countryV1.data.extendedISOExternalCodeCou.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.extendedISOExternalCodeCou,
                campo1: 'extendedISOExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código País Extendido no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countryV1.data.telephonePrefixExternalCodeCou !== null && countryV1.data.telephonePrefixExternalCodeCou.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.telephonePrefixExternalCodeCou,
                campo1: 'telephonePrefixExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de Area de Teléfono no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countryV1.data.namePla !== null && countryV1.data.namePla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countryV1.data.namePla,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
