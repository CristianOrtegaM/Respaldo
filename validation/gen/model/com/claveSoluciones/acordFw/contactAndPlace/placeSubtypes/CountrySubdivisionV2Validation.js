Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(countrySubdivisionV2) {
        var validations = new Array();

        if (countrySubdivisionV2.data.descriptionPla !== null && countrySubdivisionV2.data.descriptionPla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countrySubdivisionV2.data.descriptionPla,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\r\n\\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countrySubdivisionV2.data.availablePeriodEndDateTimePla !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countrySubdivisionV2.data.availablePeriodEndDateTimePla,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimePla',
                valor2: countrySubdivisionV2.data.availablePeriodStartDateTimePla,
                operacion: '>=',
                mensaje: 'El campo Habilitado Hasta no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countrySubdivisionV2.data.namePla !== null && countrySubdivisionV2.data.namePla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countrySubdivisionV2.data.namePla,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (countrySubdivisionV2.data.alphaISOExternalCodeCos !== null && countrySubdivisionV2.data.alphaISOExternalCodeCos.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: countrySubdivisionV2.data.alphaISOExternalCodeCos,
                campo1: 'alphaISOExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Provincia no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
