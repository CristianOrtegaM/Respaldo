Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(capabilityV1) {
        var validations = new Array();

        if (capabilityV1.data.availablePeriodEndDateTimeCap !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: capabilityV1.data.effectivePeriodStartDateTimeCap,
                campo1: 'effectivePeriodStartDateTime',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Vigencia Inicial debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

		if (capabilityV1.data.availablePeriodEndDateTimeCap !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: capabilityV1.data.availablePeriodEndDateTimeCap,
                campo1: 'availablePeriodEndDateTimeCap',
                campo2: 'availablePeriodStartDateTimeCap',
                valor2: capabilityV1.data.availablePeriodStartDateTimeCap,
                operacion: '>=',
                mensaje: 'El campo Fin de Vigencia debe ser mayor o igual al campo Inicio de Vigencia.'
            });
            validations.push(validation);
        }


        if (capabilityV1.data.nameCap !== null && capabilityV1.data.nameCap.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: capabilityV1.data.nameCap,
                campo1: 'nameCap',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (capabilityV1.data.descriptionCap !== null && capabilityV1.data.descriptionCap.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: capabilityV1.data.descriptionCap,
                campo1: 'descriptionCap',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
