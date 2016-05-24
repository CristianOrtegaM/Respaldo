Ext.define('AFW_FND_Xjs.model.util.UtilValidation', {
    extend: 'Ext.data.Model',
    //statics:{
        validation : function (validations) {

            for (var i=0; i<validations.length; i++) {
                if (validations[i].data.operacion === '>') {
                    if (validations[i].data.valor1 <= validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === 'required') {
                    if (validations[i].data.valor1 === null) {
                        return validations[i].data.mensaje; 
                    } else if (validations[i].data.valor1 === "") {
                        return validations[i].data.mensaje; 
                    } else if (validations[i].data.valor1 === undefined) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === '==') {
                    if (validations[i].data.valor1 !== validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === '>=') {
                    if (validations[i].data.valor1 < validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === '<=') {   
                    if (validations[i].data.valor1 > validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === '<') {
                    if (validations[i].data.valor1 > validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === '<') {
                    if (validations[i].data.valor1 > validations[i].data.valor2) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === 'regexp') {
                	var str = validations[i].data.valor1;
                	var patt = new RegExp(validations[i].data.valor2); 
                    if (!patt.test(str)) {
                        return validations[i].data.mensaje; 
                    }
                } else if (validations[i].data.operacion === 'rut') {
                	var str = validations[i].data.valor1;
                    if (!this.validateRut(str)) {
                        return validations[i].data.mensaje; 
                    }
                }   else if (validations[i].data.operacion === 'length_telephone') {
                    
                    if (validations[i].data.valor2 === '02' || validations[i].data.valor2 === '2') {
                        if(validations[i].data.valor1.length>8)
                        	return validations[i].data.mensaje;
                    }else{
                    	if(validations[i].data.valor1.length>7)
                        	return validations[i].data.mensaje;
                    }
                }   else if (validations[i].data.operacion === 'length') {

                        if(validations[i].data.valor1.length!=validations[i].data.valor2)
                        	return validations[i].data.mensaje;
                    
                }   else if (validations[i].data.operacion === 'principal_customer') {

                        if (!this.existsPrincipalCustomer(validations[i].data.valor1)) {
                        return validations[i].data.mensaje; 
                    	}
                    
                }   else if (validations[i].data.operacion === 'number_principal_customer') {

                        if (this.numberPrincipalCustomer(validations[i].data.valor1)!==1) {
                        return validations[i].data.mensaje; 
                    	}
                    
                }  else if (validations[i].data.operacion === 'vehicleaverage') {

                       /* if (this.vehicleaverage(validations[i].data.valor1)===false) {
                        return validations[i].data.mensaje; 
                    	}*/
                    
                } else if (validations[i].data.operacion === 'vehiclecount') {

                        if (this.vehiclecount(validations[i].data.valor1)===false) {
                        return validations[i].data.mensaje; 
                    }
                }
            }
       // }
    },
    
    vehicleaverage: function(generalOwnershipInformationV1){
    	var ownershipAmountGoi=generalOwnershipInformationV1.data.ownershipAmountGoi;
    	var ownershipCountGoi=generalOwnershipInformationV1.data.ownershipCountGoi;
    	var average=parseFloat((ownershipAmountGoi/ownershipCountGoi).toFixed(2));
    	
    	var averageFleetValueAmountFle=generalOwnershipInformationV1.data.ownedPhysicalObjectGoi[0].averageFleetValueAmountFle;
    	if(average===averageFleetValueAmountFle){
    		return true;
    	}else{
    		return false;
    	}
    	
    },
    
     vehiclecount: function(generalOwnershipInformationV1){
    	var lightWeightVehicleCountFle=generalOwnershipInformationV1.data.ownedPhysicalObjectGoi[0].lightWeightVehicleCountFle;
    	var heavyWeightVehicleCountFle=generalOwnershipInformationV1.data.ownedPhysicalObjectGoi[0].heavyWeightVehicleCountFle;
    	var sum=lightWeightVehicleCountFle+heavyWeightVehicleCountFle;
    	if(sum===generalOwnershipInformationV1.data.ownershipCountGoi){
    		return true;
    	}else{
    		return false;
    	}
    	
    },
    
    validateRut : function(rut){
		var rexp = new RegExp(/^[0-9]{6,9}[-]{1}[0-9kK]{1}$/);
	   	 if(rut.match(rexp)){
	   	     var RUT = rut.split("-");
	   	     var elRut = RUT[0].split('');
	   	     var factor = 2;
	   	     var suma = 0;
	   	     var dv;
	   	     for(var i=(elRut.length-1); i>=0; i--){
	   	         factor = factor > 7 ? 2 : factor;
	   	         suma += parseInt(elRut[i])*parseInt(factor++);
    }
	   	     dv = 11 -(suma % 11);
	   	     if(dv == 11){
	   	         dv = 0;
	   	     }else if (dv == 10){
	   	         dv = "k";
	   	     }
	
	   	     if(dv == RUT[1].toLowerCase()){	   	    	 
	   	         return true;
	   	     }else{
	   	    	 //field.markInvalid("RUT no vÃ¡lido.");
	   	         return false;
	   	     }
	   	 }else{
	   		// field.markInvalid("El formato del RUT debe ser del tipo 12345678-9.");
	   	     return false;
	   	 }
	},
	
	existsPrincipalCustomer: function(customers){
		var respuesta=false;
		for (var i=0; i<customers.length; ++i){
			if(customers[i].primaryIndicatorCus==true) {respuesta=true; break;}}	
	
		return respuesta;
	},
	
	numberPrincipalCustomer:  function(customers){
		var customersPrincipal=0;
		for (var i=0; i<customers.length; ++i){
			if(customers[i].primaryIndicatorCus==true) {customersPrincipal++;}
			}	
	
		return customersPrincipal;
	},

});
