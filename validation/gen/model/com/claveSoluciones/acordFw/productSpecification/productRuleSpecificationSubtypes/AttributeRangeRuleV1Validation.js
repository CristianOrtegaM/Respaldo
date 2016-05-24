Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(attributeRangeRuleV1) {
        var validations = new Array();

        if (attributeRangeRuleV1.data.shortNameSpe !== null && attributeRangeRuleV1.data.shortNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.shortNameSpe,
                campo1: 'shortName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Corto no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.nameSpe !== null && attributeRangeRuleV1.data.nameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.nameSpe,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.descriptionSpe !== null && attributeRangeRuleV1.data.descriptionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.descriptionSpe,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.versionSpe !== null && attributeRangeRuleV1.data.versionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.versionSpe,
                campo1: 'version',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Versión no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.kindOfElementNameSpe !== null && attributeRangeRuleV1.data.kindOfElementNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.kindOfElementNameSpe,
                campo1: 'kindOfElementName',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de la Regla no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.incrementArr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.incrementArr,
                campo1: 'increment',
                valor2: 0,
                operacion: '>=',
                mensaje: 'El campo Incremento debe ser mayor o igual a 0.'
            });
            validations.push(validation);
        }

        if (attributeRangeRuleV1.data.incrementArr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: attributeRangeRuleV1.data.incrementArr,
                campo1: 'increment',
                valor2: 999999,
                operacion: '<=',
                mensaje: 'El campo Incremento debe ser menor o igual a 999999.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
