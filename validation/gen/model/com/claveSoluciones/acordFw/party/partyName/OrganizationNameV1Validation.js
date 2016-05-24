Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.partyName.OrganizationNameV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(organizationNameV1) {
        var validations = new Array();

        if (organizationNameV1.data.fullNamePan !== null && organizationNameV1.data.fullNamePan.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: organizationNameV1.data.fullNamePan,
                campo1: 'fullName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Completo no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (organizationNameV1.data.effectivePeriodEndDateTimePan !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: organizationNameV1.data.effectivePeriodEndDateTimePan,
                campo1: 'effectivePeriodEndDateTime',
                campo2: 'effectivePeriodStartDateTimePan',
                valor2: organizationNameV1.data.effectivePeriodStartDateTimePan,
                operacion: '>=',
                mensaje: 'El campo Fin de Vigencia debe ser mayor o igual al campo Inicio de Vigencia.'
            });
            validations.push(validation);
        }

        if (organizationNameV1.data.effectivePeriodEndDateTimePan !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: organizationNameV1.data.effectivePeriodStartDateTimePan,
                campo1: 'effectivePeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Vigencia debe ser requerido.'
            });
            validations.push(validation);
        }

        if (organizationNameV1.data.effectivePeriodStartDateTimePan !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: organizationNameV1.data.effectivePeriodStartDateTimePan,
                campo1: 'effectivePeriodStartDateTime',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Inicio de Vigencia debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (organizationNameV1.data.descriptionPan !== null && organizationNameV1.data.descriptionPan.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: organizationNameV1.data.descriptionPan,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
