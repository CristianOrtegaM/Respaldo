Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.ProductRuleV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(productRuleV1) {
        var validations = new Array();

        if (productRuleV1.data.shortNameSpe !== null && productRuleV1.data.shortNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.shortNameSpe,
                campo1: 'shortName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Corto no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRuleV1.data.nameSpe !== null && productRuleV1.data.nameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.nameSpe,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRuleV1.data.descriptionSpe !== null && productRuleV1.data.descriptionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.descriptionSpe,
                campo1: 'description',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRuleV1.data.versionSpe !== null && productRuleV1.data.versionSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.versionSpe,
                campo1: 'version',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Versión no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRuleV1.data.kindOfElementNameSpe !== null && productRuleV1.data.kindOfElementNameSpe.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.kindOfElementNameSpe,
                campo1: 'kindOfElementName',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de la Regla no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (productRuleV1.data.formalDefinitionPrr !== null && productRuleV1.data.formalDefinitionPrr.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productRuleV1.data.formalDefinitionPrr,
                campo1: 'formalDefinition',
                valor2: "^[\=\<\>\;\?\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Definición Formal no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
