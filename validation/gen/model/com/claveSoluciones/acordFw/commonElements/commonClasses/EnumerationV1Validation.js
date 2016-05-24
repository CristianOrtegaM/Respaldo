Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(enumerationV1) {
        var validations = new Array();

        if (enumerationV1.data.enumerationLiteralEnu !== null && enumerationV1.data.enumerationLiteralEnu.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: enumerationV1.data.enumerationLiteralEnu,
                campo1: 'enumerationLiteral',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (enumerationV1.data.descriptionEnu !== null && enumerationV1.data.descriptionEnu.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: enumerationV1.data.descriptionEnu,
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
