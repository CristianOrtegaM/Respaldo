Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(productCompositionV1) {
        var validations = new Array();

        if (productCompositionV1.data.maximumComponentCountPrc !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productCompositionV1.data.maximumComponentCountPrc,
                campo1: 'maximumComponentCount',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Cantidad de Componentes Máxima debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (productCompositionV1.data.maximumComponentCountPrc !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productCompositionV1.data.maximumComponentCountPrc,
                campo1: 'maximumComponentCount',
                valor2: 1000,
                operacion: '<=',
                mensaje: 'El campo Cantidad de Componentes Máxima debe ser menor o igual a 1000.'
            });
            validations.push(validation);
        }

        if (productCompositionV1.data.minimumComponentCountPrc !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productCompositionV1.data.minimumComponentCountPrc,
                campo1: 'minimumComponentCount',
                valor2: 1,
                operacion: '>=',
                mensaje: 'El campo Cantidad de Componentes Mínima debe ser mayor o igual a 1.'
            });
            validations.push(validation);
        }

        if (productCompositionV1.data.minimumComponentCountPrc !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: productCompositionV1.data.minimumComponentCountPrc,
                campo1: 'minimumComponentCount',
                valor2: 1000,
                operacion: '<=',
                mensaje: 'El campo Cantidad de Componentes Mínima debe ser menor o igual a 1000.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
