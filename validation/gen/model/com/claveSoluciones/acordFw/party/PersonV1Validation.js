Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.PersonV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(personV1) {
        var validations = new Array();

        if (personV1.data.missingIndicatorPer !== null && personV1.data.missingIndicatorPer === true) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.missingDatePer,
                campo1: 'missingDate',
                operacion: 'required',
                mensaje: 'El campo Fecha Desaparición debe ser requerido.'
            });
            validations.push(validation);
        }

        if (personV1.data.missingDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.missingIndicatorPer,
                campo1: 'missingIndicator',
                operacion: 'required',
                mensaje: 'El campo Desaparecido debe ser requerido.'
            });
            validations.push(validation);
        }

        if (personV1.data.missingDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.missingIndicatorPer,
                campo1: 'missingIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Desaparecido debe ser, Sí.'
            });
            validations.push(validation);
        }

        if (personV1.data.missingDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.missingDatePer,
                campo1: 'missingDate',
                campo2: 'birthDatePer',
                valor2: personV1.data.birthDatePer,
                operacion: '>=',
                mensaje: 'El campo Fecha Desaparición debe ser mayor o igual al campo Fecha de Nacimiento .'
            });
            validations.push(validation);
        }

        if (personV1.data.missingDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.missingDatePer,
                campo1: 'missingDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Fecha Desaparición debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (personV1.data.missingDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.birthDatePer,
                campo1: 'birthDate',
                operacion: 'required',
                mensaje: 'El campo Fecha de Nacimiento es requerido.'
            });
            validations.push(validation);
        }

        if (personV1.data.birthDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.birthDatePer,
                campo1: 'birthDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Fecha de Nacimiento debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.deathIndicatorPer,
                campo1: 'deathIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Fallecido debe estar en Sí.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.deathIndicatorPer,
                campo1: 'deathIndicator',
                operacion: 'required',
                mensaje: 'El campo Fallecido debe ser requerido.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.deathDatePer,
                campo1: 'deathDate',
                campo2: 'birthDatePer',
                valor2: personV1.data.birthDatePer,
                operacion: '>=',
                mensaje: 'El campo Fecha de Fallecimiento debe ser mayor o igual al campo Fecha de Nacimiento.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.deathDatePer,
                campo1: 'deathDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Fecha de Fallecimiento debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathDatePer !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.birthDatePer,
                campo1: 'birthDate',
                operacion: 'required',
                mensaje: 'El campo Fecha de Nacimiento debe ser requerido.'
            });
            validations.push(validation);
        }

        if (personV1.data.deathIndicatorPer !== null && personV1.data.deathIndicatorPer === true) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: personV1.data.deathDatePer,
                campo1: 'deathDate',
                operacion: 'required',
                mensaje: 'El campo Fecha de Fallecimiento debe ser requerido.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
