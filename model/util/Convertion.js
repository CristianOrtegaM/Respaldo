Ext.define('AFW_FND_Xjs.model.util.Convertion', {
	 extend: 'Ext.data.Model',

	 convert: function(objeto, record){
		if(Ext.isObject(objeto)){
			Ext.Object.each(objeto, function(key, value, obj){
				if(record.superclass.clientIdProperty == key ){
					objeto[key] = this.toFloat( objeto[key] );
				}else if (record.getField(key) !== undefined && record.getField(key) !== null && record.getField(key).type) {
					switch( record.getField(key).type.toLowerCase() ){
						case 'float':
							objeto[key] = this.toFloat( objeto[key] );
							break;
//						case 'string':
//							if(typeof record.getField(key).enu != 'undefined' && !record.getField(key).enu)
//								objeto[key] = objeto[key].toString().toUpperCase();
//							break;
					}
				}
			}, this);
		}
		return objeto;
	},
	
	toFloat: function(valor){
		return parseFloat(valor.toString().replace(Ext.util.Format.decimalSeparator, '.'));
	}

});
