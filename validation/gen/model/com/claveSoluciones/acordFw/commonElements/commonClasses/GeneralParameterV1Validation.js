Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.GeneralParameterV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(generalParameterV1) {
        var validations = new Array();

        if (generalParameterV1.data.nameGep !== null && generalParameterV1.data.nameGep.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: generalParameterV1.data.nameGep,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (generalParameterV1.data.codeGep !== null && generalParameterV1.data.codeGep.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: generalParameterV1.data.codeGep,
                campo1: 'code',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (generalParameterV1.data.numberValueGep !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: generalParameterV1.data.numberValueGep,
                campo1: 'numberValue',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Valor Numérico debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (generalParameterV1.data.numberValueGep !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: generalParameterV1.data.numberValueGep,
                campo1: 'numberValue',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Valor Numérico debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
