Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.PerilV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(perilV1) {
        var validations = new Array();

        if (perilV1.data.perilDescriptionPer !== null && perilV1.data.perilDescriptionPer.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: perilV1.data.perilDescriptionPer,
                campo1: 'perilDescription',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Descripción no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (perilV1.data.perilNamePer !== null && perilV1.data.perilNamePer.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: perilV1.data.perilNamePer,
                campo1: 'perilName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre del Riesgo no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
