Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.PremiumFactorSpecificationV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(premiumFactorSpecificationV1) {
        var validations = new Array();

        if (premiumFactorSpecificationV1.data.marketableIndicatorPrs !== null && premiumFactorSpecificationV1.data.marketableIndicatorPrs === true) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketablePeriodStartDateTimePrs,
                campo1: 'marketablePeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Comercialización debe ser requerido.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Comercializable debe ser Sí.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                operacion: 'required',
                mensaje: 'El campo Comercializable debe ser requerido.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketablePeriodStartDateTimePrs,
                campo1: 'marketablePeriodStartDateTime',
                operacion: 'required',
                mensaje: 'El campo Inicio de Comercialización debe ser requerido.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodEndDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketablePeriodEndDateTimePrs,
                campo1: 'marketablePeriodEndDateTime',
                campo2: 'marketablePeriodStartDateTimePrs',
                valor2: premiumFactorSpecificationV1.data.marketablePeriodStartDateTimePrs,
                operacion: '>=',
                mensaje: 'El campo Término de Comercialización debe ser mayor o igual al campo Inicio de Comercialización.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodStartDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                valor2: true,
                operacion: '==',
                mensaje: 'El campo Comercializable debe ser Sí.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketablePeriodStartDateTimePrs !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketableIndicatorPrs,
                campo1: 'marketableIndicator',
                operacion: 'required',
                mensaje: 'El campo Comercializable debe ser requerido.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.shortNameSpe !== null && premiumFactorSpecificationV1.data.shortNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.shortNameSpe,
                campo1: 'shortName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Corto no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.nameSpe !== null && premiumFactorSpecificationV1.data.nameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.nameSpe,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.descriptionSpe !== null && premiumFactorSpecificationV1.data.descriptionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.descriptionSpe,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.versionSpe !== null && premiumFactorSpecificationV1.data.versionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.versionSpe,
                campo1: 'version',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Versión no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.kindOfElementNameSpe !== null && premiumFactorSpecificationV1.data.kindOfElementNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.kindOfElementNameSpe,
                campo1: 'kindOfElementName',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código del Factor de Prima no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.productExternalCodePrs !== null && premiumFactorSpecificationV1.data.productExternalCodePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.productExternalCodePrs,
                campo1: 'productExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Externo no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.marketingNamePrs !== null && premiumFactorSpecificationV1.data.marketingNamePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.marketingNamePrs,
                campo1: 'marketingName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Comercial no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (premiumFactorSpecificationV1.data.filedFormNumberPrs !== null && premiumFactorSpecificationV1.data.filedFormNumberPrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: premiumFactorSpecificationV1.data.filedFormNumberPrs,
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