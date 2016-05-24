Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.RatingSpecificationV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(ratingSpecificationV1) {
        var validations = new Array();

        if (ratingSpecificationV1.data.shortNameSpe !== null && ratingSpecificationV1.data.shortNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.shortNameSpe,
                campo1: 'shortName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Corto no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.nameSpe !== null && ratingSpecificationV1.data.nameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.nameSpe,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.descriptionSpe !== null && ratingSpecificationV1.data.descriptionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.descriptionSpe,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.versionSpe !== null && ratingSpecificationV1.data.versionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.versionSpe,
                campo1: 'version',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Versión no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.kindOfElementNameSpe !== null && ratingSpecificationV1.data.kindOfElementNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.kindOfElementNameSpe,
                campo1: 'kindOfElementName',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de Tasa no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.productExternalCodePrs !== null && ratingSpecificationV1.data.productExternalCodePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.productExternalCodePrs,
                campo1: 'productExternalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Externo no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.marketingNamePrs !== null && ratingSpecificationV1.data.marketingNamePrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.marketingNamePrs,
                campo1: 'marketingName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Comercial no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (ratingSpecificationV1.data.filedFormNumberPrs !== null && ratingSpecificationV1.data.filedFormNumberPrs.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: ratingSpecificationV1.data.filedFormNumberPrs,
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
