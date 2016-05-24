Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistryV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(registryV1) {
        var validations = new Array();

        if (registryV1.data.nameReg !== null && registryV1.data.nameReg.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: registryV1.data.nameReg,
                campo1: 'name',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
