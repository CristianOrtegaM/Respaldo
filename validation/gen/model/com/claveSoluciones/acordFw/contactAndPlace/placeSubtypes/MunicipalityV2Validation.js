Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(municipalityV2) {
        var validations = new Array();

        if (municipalityV2.data.keyImo !== null && municipalityV2.data.keyImo.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV2.data.keyImo,
                campo1: 'key',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Postal no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV2.data.descriptionPla !== null && municipalityV2.data.descriptionPla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV2.data.descriptionPla,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\r\n\\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV2.data.availablePeriodEndDateTimePla !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV2.data.availablePeriodEndDateTimePla,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimePla',
                valor2: municipalityV2.data.availablePeriodStartDateTimePla,
                operacion: '>=',
                mensaje: 'El campo Habilitado Hasta no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV2.data.namePla !== null && municipalityV2.data.namePla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV2.data.namePla,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (municipalityV2.data.assignedExternalCodeMun !== null && municipalityV2.data.assignedExternalCodeMun.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: municipalityV2.data.assignedExternalCodeMun,
                campo1: 'assignedExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Comuna no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
