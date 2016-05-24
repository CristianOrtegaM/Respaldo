Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(xtbmlValueV1) {
        var validations = new Array();

        if (xtbmlValueV1.data.capAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.capAmountXtv,
                campo1: 'capAmount',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Tope debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.capAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.capAmountXtv,
                campo1: 'capAmount',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Tope debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.discountAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.discountAmountXtv,
                campo1: 'discountAmount',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Descuento debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.discountAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.discountAmountXtv,
                campo1: 'discountAmount',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Descuento debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.fixedAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.fixedAmountXtv,
                campo1: 'fixedAmount',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Monto Fijo debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.fixedAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.fixedAmountXtv,
                campo1: 'fixedAmount',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Monto Fijo debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.percentageXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.percentageXtv,
                campo1: 'percentage',
                valor2: 0,
                operacion: '>=',
                mensaje: 'El campo Porcentaje debe ser mayor o igual a 0.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.percentageXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.percentageXtv,
                campo1: 'percentage',
                valor2: 1,
                operacion: '<=',
                mensaje: 'El campo Porcentaje debe ser menor o igual a 1.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.floorAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.floorAmountXtv,
                campo1: 'floorAmount',
                valor2: -999999999,
                operacion: '>=',
                mensaje: 'El campo Piso debe ser mayor o igual a -999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlValueV1.data.floorAmountXtv !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlValueV1.data.floorAmountXtv,
                campo1: 'floorAmount',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Piso debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
