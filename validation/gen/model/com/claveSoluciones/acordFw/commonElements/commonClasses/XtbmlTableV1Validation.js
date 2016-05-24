Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(xtbmlTableV1) {
        var validations = new Array();

        if (xtbmlTableV1.data.dimensionQtyXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.dimensionQtyXtt,
                campo1: 'dimensionQty',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Cantidad de Dimensiones debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.dimensionQtyXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.dimensionQtyXtt,
                campo1: 'dimensionQty',
                valor2: 10,
                operacion: '<=',
                mensaje: 'El campo Cantidad de Dimensiones debe ser menor o igual a 10.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.tableNameXtt !== null && xtbmlTableV1.data.tableNameXtt.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.tableNameXtt,
                campo1: 'tableName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre Tabla no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.capTableXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.capTableXtt,
                campo1: 'capTable',
                valor2: 0,
                operacion: '>=',
                mensaje: 'El campo Tope debe ser mayor o igual a 0.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.capTableXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.capTableXtt,
                campo1: 'capTable',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Tope debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.floorTableXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.floorTableXtt,
                campo1: 'floorTable',
                valor2: 0,
                operacion: '>=',
                mensaje: 'El campo Piso debe ser mayor o igual a 0.'
            });
            validations.push(validation);
        }

        if (xtbmlTableV1.data.floorTableXtt !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: xtbmlTableV1.data.floorTableXtt,
                campo1: 'floorTable',
                valor2: 999999999,
                operacion: '<=',
                mensaje: 'El campo Piso debe ser menor o igual a 999999999.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
