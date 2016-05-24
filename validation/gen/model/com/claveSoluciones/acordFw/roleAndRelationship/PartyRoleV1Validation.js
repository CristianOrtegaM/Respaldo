Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(partyRoleV1) {
        var validations = new Array();

        if (partyRoleV1.data.descriptionRol !== null && partyRoleV1.data.descriptionRol.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: partyRoleV1.data.descriptionRol,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (partyRoleV1.data.rolePlayerPeriodEndDateTimeRol !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: partyRoleV1.data.rolePlayerPeriodEndDateTimeRol,
                campo1: 'rolePlayerPeriodEndDateTime',
                campo2: 'rolePlayerPeriodStartDateTimeRol',
                valor2: partyRoleV1.data.rolePlayerPeriodStartDateTimeRol,
                operacion: '>=',
                mensaje: 'El campo Fin de Vigencia debe ser mayor o igual al campo Inicio de Vigencia.'
            });
            validations.push(validation);
        }

        if (partyRoleV1.data.rolePlayerPeriodEndDateTimeRol !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: partyRoleV1.data.rolePlayerPeriodStartDateTimeRol,
                campo1: 'rolePlayerPeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Vigencia debe ser requerido.'
            });
            validations.push(validation);
        }

        if (partyRoleV1.data.rolePlayerPeriodStartDateTimeRol !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: partyRoleV1.data.rolePlayerPeriodStartDateTimeRol,
                campo1: 'rolePlayerPeriodStartDateTime',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Inicio de Vigencia debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
