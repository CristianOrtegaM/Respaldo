Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(xtbmlDimensionV1) {
        var validations = new Array();

        if (xtbmlDimensionV1.data.dimSequenceXtd !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlDimensionV1.data.dimSequenceXtd,
                campo1: 'dimSequence',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Secuencia debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (xtbmlDimensionV1.data.dimSequenceXtd !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlDimensionV1.data.dimSequenceXtd,
                campo1: 'dimSequence',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Secuencia debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlDimensionV1.data.transactionCodeXtd !== null && xtbmlDimensionV1.data.transactionCodeXtd.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlDimensionV1.data.transactionCodeXtd,
                campo1: 'transactionCode',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
