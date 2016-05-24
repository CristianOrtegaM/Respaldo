Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(municipalityV1) {
        var validations = new Array();

        if (municipalityV1.data.descriptionPla !== null && municipalityV1.data.descriptionPla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV1.data.descriptionPla,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\r\n\\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV1.data.availablePeriodEndDateTimePla !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV1.data.availablePeriodEndDateTimePla,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimePla',
                valor2: municipalityV1.data.availablePeriodStartDateTimePla,
                operacion: '>=',
                mensaje: 'El campo Habilitado Hasta debe ser mayor o igual al campo Habilitado Desde.'
            });
            validations.push(validation);
        }

        if (municipalityV1.data.namePla !== null && municipalityV1.data.namePla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV1.data.namePla,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV1.data.assignedExternalCodeMun !== null && municipalityV1.data.assignedExternalCodeMun.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV1.data.assignedExternalCodeMun,
                campo1: 'assignedExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Ciudad no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
