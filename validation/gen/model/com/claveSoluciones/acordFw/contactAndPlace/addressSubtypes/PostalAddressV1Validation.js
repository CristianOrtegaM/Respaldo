Ext.define('AFW_FND_Xjs.validation.gen.model.com.claveSoluciones.acordFw.contactAndPlace.addressSubtypes.PostalAddressV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(postalAddressV1) {
        var validations = new Array();

        if (postalAddressV1.data.buildingNamePoa !== null && postalAddressV1.data.buildingNamePoa.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postalAddressV1.data.buildingNamePoa,
                campo1: 'buildingName',
                valor2: "^[áéíóúÁÉÍÓÚüÜñÑ\ \(\,\)\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Nombre del Edificio no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (postalAddressV1.data.postalBarcodePoa !== null && postalAddressV1.data.postalBarcodePoa.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postalAddressV1.data.postalBarcodePoa,
                campo1: 'postalBarcode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código de Barra no esta bien escrito.'
            });
            validations.push(validation);
        }

        if (postalAddressV1.data.postalPostCodePoa !== null && postalAddressV1.data.postalPostCodePoa.length>0) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: postalAddressV1.data.postalPostCodePoa,
                campo1: 'postalPostCode',
                valor2: "^[\.\:0-9A-Za-z_-]+$",
                operacion: 'regexp',
                mensaje: 'El campo Código Postal no esta bien escrito.'
            });
            validations.push(validation);
        }

        return validations;
    }
});
