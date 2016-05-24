Ext.define('AFW_FND_Xjs.model.util.Validation', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'campo1',                    type: 'string'}, //deathdate
        {name: 'valor1',                       type: 'auto'}, // 05-04-1983
        {name: 'campo2',                    type: 'string'}, // birthdate 
        {name: 'valor2',     	type: 'auto'}, // 
        {name: 'operacion',  	type: 'string'}, // >=
        {name: 'mensaje',  	type: 'string'} // La fecha de muerte debe ser mayor o igual a la fecha de nacimiento        
       ]
});