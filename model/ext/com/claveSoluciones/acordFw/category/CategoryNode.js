Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryNode', {
    extend: 'Ext.data.TreeModel',
    entityName: 'CategoryNode',
    //idProperty: 'id',
    //clientIdProperty: 'id',
    fields: [
        {name: "name", convert: undefined},
        {name: "jerarquia", convert: undefined},
        {name: "idPlace", convert: undefined},
        {name: "idTree", convert: undefined},
        {name: "type", convert: undefined},
        {name: "tipo", convert: undefined},
        {name: "categoria", convert: undefined},
        {name: "categoriaEsquema", convert: undefined},
        {name: "leaf", type: 'boolean', convert: undefined, defaultValue: false}
        //{ name: 'expanded', defaultValue: true },
        //{ name: 'loaded', type: 'boolean', mapping: 'loaded', defaultValue: false },
    ]
});