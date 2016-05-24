Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(xtbmlRangeV1) {
        var validations = new Array();

        if (xtbmlRangeV1.data.rangeSequenceXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.rangeSequenceXtr,
                campo1: 'rangeSequence',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Secuencia debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (xtbmlRangeV1.data.rangeSequenceXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.rangeSequenceXtr,
                campo1: 'rangeSequence',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Secuencia debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlRangeV1.data.rangeNameXtr !== null && xtbmlRangeV1.data.rangeNameXtr.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.rangeNameXtr,
                campo1: 'rangeName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Rango no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (xtbmlRangeV1.data.numberValueFromXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.numberValueFromXtr,
                campo1: 'numberValueFrom',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Valor Número Desde debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlRangeV1.data.numberValueFromXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.numberValueFromXtr,
                campo1: 'numberValueFrom',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Valor Número Desde debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlRangeV1.data.numberValueToXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.numberValueToXtr,
                campo1: 'numberValueTo',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Valor Número Hasta debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }
        if (xtbmlRangeV1.data.numberValueToXtr !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlRangeV1.data.numberValueToXtr,
                campo1: 'numberValueTo',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Valor Número Hasta debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }
        if (xtbmlRangeV1.data.numberValueFromXtr !== null && xtbmlRangeV1.data.numberValueToXtr !== null){
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation',{
                valor1: xtbmlRangeV1.data.numberValueFromXtr,
                campo1: 'numberValueFrom',
                valor2: xtbmlRangeV1.data.numberValueToXtr,
                operacion: '<=',
                mensaje: 'El campo Valor Número Hasta debe ser mayor o igual al campo Valor Número Desde.'
            });
            validations.push(validation);
        }
        /*if (xtbmlRangeV1.data.numberValueFromXtr >= xtbmlRangeV1.data.numberValueToXtr){
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation',{
                valor1: xtbmlRangeV1.data.numberValueFromXtr,
                campo1: 'numberValueFrom',
                valor2: xtbmlRangeV1.data.numberValueToXtr,
                operacion: '>=',
                mensaje: 'El campo Valor Número Hasta debe ser mayor o igual al campo Valor Número Desde.'
            });
            validations.push(validation);
        }*/

        return validations;
    }
});
