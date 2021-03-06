Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PropertyCoverageSpecificationV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(propertyCoverageSpecificationV1) {
        var validations = new Array();

        if (propertyCoverageSpecificationV1.data.marketableIndicatorPrs !== null && propertyCoverageSpecificationV1.data.marketableIndicatorPrs === true) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketablePeriodStartDateTimePrs,
                campo1: 'marketablePeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Comercialización debe ser requerido.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Comercializable debe ser Sí.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                operacion: 'required',
                mensaje: 'El campo Comercializable debe ser requerido.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketablePeriodStartDateTimePrs,
                campo1: 'marketablePeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Comercialización debe ser requerido.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketablePeriodEndDateTimePrs,
                campo1: 'marketablePeriodEndDateTime',
                campo2: 'marketablePeriodStartDateTimePrs',
                valor2: propertyCoverageSpecificationV1.data.marketablePeriodStartDateTimePrs,
                operacion: '>=',
                mensaje: 'El campo Término de Comercialización debe ser mayor o igual al campo Inicio de Comercialización.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodStartDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Comercializable debe ser Sí.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketablePeriodStartDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                operacion: 'required',
                mensaje: 'El campo Comercializable debe ser requerido.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.shortNameSpe !== null && propertyCoverageSpecificationV1.data.shortNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.shortNameSpe,
                campo1: 'shortName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Corto no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.coveredRiskOccurrenceCountCos !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.coveredRiskOccurrenceCountCos,
                campo1: 'coveredRiskOccurrenceCount',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Cantidad de Ocurrencias Cubiertas debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.coveredRiskOccurrenceCountCos !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.coveredRiskOccurrenceCountCos,
                campo1: 'coveredRiskOccurrenceCount',
                valor2: 1000,
                operacion: '<=',
                mensaje: 'El campo Cantidad de Ocurrencias Cubiertas debe ser menor o igual a 1000.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.nameSpe !== null && propertyCoverageSpecificationV1.data.nameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.nameSpe,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.descriptionSpe !== null && propertyCoverageSpecificationV1.data.descriptionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.descriptionSpe,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.versionSpe !== null && propertyCoverageSpecificationV1.data.versionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.versionSpe,
                campo1: 'version',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Versión no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.kindOfElementNameSpe !== null && propertyCoverageSpecificationV1.data.kindOfElementNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.kindOfElementNameSpe,
                campo1: 'kindOfElementName',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de la Cobertura no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.productExternalCodePrs !== null && propertyCoverageSpecificationV1.data.productExternalCodePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.productExternalCodePrs,
                campo1: 'productExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Externo no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.marketingNamePrs !== null && propertyCoverageSpecificationV1.data.marketingNamePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.marketingNamePrs,
                campo1: 'marketingName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Comercial no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (propertyCoverageSpecificationV1.data.filedFormNumberPrs !== null && propertyCoverageSpecificationV1.data.filedFormNumberPrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: propertyCoverageSpecificationV1.data.filedFormNumberPrs,
                campo1: 'filedFormNumber',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código del Formulario no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
