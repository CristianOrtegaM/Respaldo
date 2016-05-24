Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.documentAndCommunication.UnspecifiedContentV1Validation', {
    extend: 'Ext.data.Model',
    createValidations: function(unspecifiedContentV1) {
        var validations = new Array();

		if (unspecifiedContentV1.data.directedContactPointCom !== null) {
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: unspecifiedContentV1.data.directedContactPointCom[0],
                campo1: 'directedContactPointCom',
                operacion: 'required',
                mensaje: 'Debe seleccionar al menos un Destinatario.'
            });
            validations.push(validation);
        }
        return validations;
    }
});
