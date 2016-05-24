Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(externalCodeV1) {
        var validations = new Array();

        if (externalCodeV1.data.externalCodeListExc !== null && externalCodeV1.data.externalCodeListExc.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: externalCodeV1.data.externalCodeListExc,
                campo1: 'externalCodeList',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Tipo de Código Externo no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (externalCodeV1.data.externalCodeExc !== null && externalCodeV1.data.externalCodeExc.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: externalCodeV1.data.externalCodeExc,
                campo1: 'externalCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (externalCodeV1.data.descriptionExc !== null && externalCodeV1.data.descriptionExc.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: externalCodeV1.data.descriptionExc,
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
