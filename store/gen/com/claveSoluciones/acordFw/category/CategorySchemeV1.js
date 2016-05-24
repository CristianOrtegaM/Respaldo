Ext.define('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.category.CategorySchemeV1',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 15,
    autoLoad: false,
    sorters: [{
        property: 'categorySchemeIdentifierCas',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'categorySchemeService/findByFilter',
        actionMethods:  {
            read: 'POST'
        },
        extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'CategoryScheme',
                valores: null,
                operacion: '=',
                tipoValor: 'string'
            }).data])
        },
        reader: {
            type: 'json',
            rootProperty: 'datos',
            successProperty: 'valido',
            totalProperty: 'totalRegistros'
        }
    }
});
