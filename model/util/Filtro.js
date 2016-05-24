Ext.define('AFW_FND_Xjs.model.util.Filtro', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nombreCampo',   type: 'string'},
        {name: 'valor',     	type: 'string'},
        {name: 'operacion',  	type: 'string'},
        {name: 'tipoValor',  	type: 'string'},
        {name: 'enumName',  	type: 'string'}
       ], 
       idProperty: 'nombreCampo'
});
