Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(postCodeV1) {
        var validations = new Array();

        if (postCodeV1.data.descriptionPla !== null && postCodeV1.data.descriptionPla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postCodeV1.data.descriptionPla,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\r\n\\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (postCodeV1.data.availablePeriodEndDateTimePla !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postCodeV1.data.availablePeriodEndDateTimePla,
                campo1: 'availablePeriodEndDateTime',
                campo2: 'availablePeriodStartDateTimePla',
                valor2: postCodeV1.data.availablePeriodStartDateTimePla,
                operacion: '>=',
                mensaje: 'El campo Habilitado Hasta debe ser mayor o igual al campo Habilitado Desde.'
            });
            validations.push(validation);
        }

        if (postCodeV1.data.assignedExternalCodePoc !== null && postCodeV1.data.assignedExternalCodePoc.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postCodeV1.data.assignedExternalCodePoc,
                campo1: 'assignedExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Postal no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (postCodeV1.data.namePla !== null && postCodeV1.data.namePla.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postCodeV1.data.namePla,
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
