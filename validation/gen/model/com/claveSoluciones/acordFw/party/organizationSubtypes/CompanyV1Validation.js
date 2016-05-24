Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.party.organizationSubtypes.CompanyV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(companyV1) {
        var validations = new Array();

        if (companyV1.data.foundationDateOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.foundationDateOrg,
                campo1: 'foundationDate',
                valor2: new Date(),
                operacion: '<=',
                mensaje: 'El campo Fecha de Inicio debe ser menor o igual a la fecha actual.'
            });
            validations.push(validation);
        }

        if (companyV1.data.memberCountOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.memberCountOrg,
                campo1: 'memberCount',
                valor2: 0,
                operacion: '>=',
                mensaje: 'El campo Cantidad de Miembros debe ser mayor o igual a 0.'
            });
            validations.push(validation);
        }

        if (companyV1.data.memberCountOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.memberCountOrg,
                campo1: 'memberCount',
                valor2: 50000,
                operacion: '<=',
                mensaje: 'El campo Cantidad de Miembros debe ser menor o igual a 50000.'
            });
            validations.push(validation);
        }

        if (companyV1.data.accountingPeriodEndDateTimeOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.accountingPeriodEndDateTimeOrg,
                campo1: 'accountingPeriodEndDateTime',
                campo2: 'accountingPeriodStartDateTimeOrg',
                valor2: companyV1.data.accountingPeriodStartDateTimeOrg,
                operacion: '>=',
                mensaje: 'El campo Fin Período Contable debe ser mayor o igual al campo Inicio Período Contable.'
            });
            validations.push(validation);
        }

        if (companyV1.data.accountingPeriodEndDateTimeOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.accountingPeriodStartDateTimeOrg,
                campo1: 'accountingPeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio Período Contable debe ser requerido.'
            });
            validations.push(validation);
        }

        if (companyV1.data.accountingPeriodStartDateTimeOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.accountingPeriodStartDateTimeOrg,
                campo1: 'accountingPeriodStartDateTime',
                campo2: 'foundationDateOrg',
                valor2: companyV1.data.foundationDateOrg,
                operacion: '<=',
                mensaje: 'El campo Inicio Período Contable no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (companyV1.data.dissolutionDateOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.dissolutionDateOrg,
                campo1: 'dissolutionDate',
                campo2: 'foundationDateOrg',
                valor2: companyV1.data.foundationDateOrg,
                operacion: '>=',
                mensaje: 'El campo Fecha de Disolución debe ser mayor o igual al campo Fecha de Inicio.'
            });
            validations.push(validation);
        }

        if (companyV1.data.dissolutionDateOrg !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: companyV1.data.foundationDateOrg,
                campo1: 'foundationDate',
                operacion: 'required',
                mensaje: 'El campo Fecha de Inicio debe ser requerido.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
