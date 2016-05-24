Ext.define('AFW_FND_Xjs.validation.ext.model.com.claveSoluciones.acordFw.contactAndPlace.ContactPreferenceValidation', {
    extend: 'Ext.data.Model',
    createValidations: function(obj) {
    	console.log(obj);

        var validations = new Array();
        if (obj.data.telephoneNumberRawValue && obj.data.telephoneNumberRawValue !== '' && obj.data.telephoneNumberRawValue !== '') {
        	if(obj.data.areaExternalCodeTnu===''){
            var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: null,
                campo1: 'externalCodeArea',
                operacion: 'required',
                mensaje: 'El código de área es requerido'
            });
            validations.push(validation);
			}
			
        }
		if (obj.data.telephoneNumberRawValue && obj.data.telephoneNumberRawValue !== '' && obj.data.areaExternalCodeTnu!==null
			&& obj.data.telephoneNumberRawValue !==''
			&& obj.data.areaExternalCodeTnu !== '' ) {
			var valor2 = 8;
			if(obj.data.areaExternalCodeTnu.length == 2){
				valor2 = 7;
			}
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.telephoneNumberRawValue,
                campo1: 'telephoneNumber',
                valor2: valor2,
                operacion: 'length',
                mensaje: 'Número de dígitos de teléfono fijo y código de área debén sumar 9 dígitos'
            });
             validations.push(validation);
        }
		if (obj.data.areaExternalCodeTnu && obj.data.areaExternalCodeTnu !== '' && obj.data.areaExternalCodeTnu !== null && 
		obj.data.telephoneNumberRawValue && obj.data.telephoneNumberRawValue !== '' && obj.data.telephoneNumberRawValue !=='' ) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.telephoneNumberRawValue.concat(obj.data.areaExternalCodeTnu),
                campo1: 'telephoneNumber',
                valor2: 9,
                operacion: 'length',
                mensaje: 'Número de dígitos de teléfono fijo y código de área debén sumar 9 dígitos'
            });
             validations.push(validation);
        }
        
        if (obj.data.telephoneMobileRawValue && obj.data.telephoneMobileRawValue !== '' && obj.data.telephoneMobileRawValue !=='') {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.telephoneMobileRawValue,
                campo1: 'telephoneMobileNumber',
                valor2: 8,
                operacion: 'length',
                mensaje: 'Número de dígitos de teléfono móvil inválido'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountry &&
        	obj.data.placeNameCountrySubdivision &&
        	obj.data.placeNameMunicipality1 &&
        	obj.data.placeNameMunicipality2
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.streetAdressName,
                campo1: 'streetAdressName',
                operacion: 'required',
                mensaje: 'Debe seleccionar el valor de la Calle en Dirección Postal'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountry) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameCountry,
                campo1: 'placeNameCountry',
                operacion: 'required',
                mensaje: 'Debe seleccionar un País en Dirección Postal'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountry &&
        	obj.data.placeNameCountrySubdivision=="" &&
        	obj.data.placeNameMunicipality1=="" &&
        	obj.data.placeNameMunicipality2==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameCountrySubdivision,
                campo1: 'placeNameCountrySubdivision',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Región en Dirección Postal'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountry &&
        	obj.data.placeNameCountrySubdivision &&
        	obj.data.placeNameMunicipality1=="" &&
        	obj.data.placeNameMunicipality2==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameMunicipality1,
                campo1: 'placeNameMunicipality1',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Ciudad en Dirección Postal'
            });
             validations.push(validation);
        }
        
         if (obj.data.placeNameCountry &&
        	obj.data.placeNameCountrySubdivision &&
        	obj.data.placeNameMunicipality1 &&
        	obj.data.placeNameMunicipality2==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameMunicipality2,
                campo1: 'placeNameMunicipality2',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Comuna en Dirección Postal'
            });
             validations.push(validation);
        }
        
         if (obj.data.placeNameCountryVisit &&
        	 obj.data.placeNameCountrySubdivisionVisit &&
        	 obj.data.placeNameMunicipality1Visit &&
        	 obj.data.placeNameMunicipality2Visit
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.streetAdressNameVisit,
                campo1: 'streetAdressNameVisit',
                operacion: 'required',
                mensaje: 'Debe ingresar el valor de la Calle en Dirección Visita'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountryVisit &&
        	obj.data.placeNameCountrySubdivisionVisit=="" &&
        	obj.data.placeNameMunicipality1Visit=="" &&
        	obj.data.placeNameMunicipality2Visit==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameCountrySubdivisionVisit,
                campo1: 'placeNameCountrySubdivisionVisit',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Región en Dirección Visita'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountryVisit &&
        	obj.data.placeNameCountrySubdivisionVisit &&
        	obj.data.placeNameMunicipality1Visit=="" &&
        	obj.data.placeNameMunicipality2Visit==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameMunicipality1Visit,
                campo1: 'placeNameMunicipality1Visit',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Ciudad en Dirección Visita'
            });
             validations.push(validation);
        }
        
         if (obj.data.placeNameCountryVisit &&
        	obj.data.placeNameCountrySubdivisionVisit &&
        	obj.data.placeNameMunicipality1Visit &&
        	obj.data.placeNameMunicipality2Visit==""
        	) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameMunicipality2Visit,
                campo1: 'placeNameMunicipality2Visit',
                operacion: 'required',
                mensaje: 'Debe seleccionar una Comuna en Dirección Visita'
            });
             validations.push(validation);
        }
        
        if (obj.data.placeNameCountryVisit) {
             var validation = Ext.create('AFW_FND_Xjs.model.util.Validation', {
                valor1: obj.data.placeNameCountryVisit,
                campo1: 'placeNameCountryVisit',
                operacion: 'required',
                mensaje: 'Debe seleccionar un País en Dirección Visita'
            });
             validations.push(validation);
        }
        
        return validations;
    }
});

