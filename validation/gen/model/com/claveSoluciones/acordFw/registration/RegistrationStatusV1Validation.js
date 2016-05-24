Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.registration.RegistrationStatusV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(registrationStatusV1) {
        var validations = new Array();

        if (registrationStatusV1.data.nameSta !== null && registrationStatusV1.data.nameSta.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: registrationStatusV1.data.nameSta,
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
