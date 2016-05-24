Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryNodeExt', {
    extend: 'Ext.data.TreeModel',
    entityName: 'CategoryNodeExt',
    fields: [
        {name: "name", convert: undefined},
        {name: "jerarquia", convert: undefined},
        {name: "idCategory", convert: undefined},
        {name: "type", convert: undefined},
        {name: "tipo", convert: undefined},
        {name: "categoria", convert: undefined},
        {name: "categoriaEsquema", convert: undefined},
        {name: "leaf", type: 'boolean', convert: undefined, defaultValue: false}
    ]
});