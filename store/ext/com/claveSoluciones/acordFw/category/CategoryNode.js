Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryNode', {
    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryNode',
//    remoteSort: true,
//    remoteFilter: true,
//    simpleSortMode: true,
//    simpleGroupMode: true,
//    pageSize: 15,
//    root: {
//        expanded: true,
//        name: 'root',
//        id: -1,
//        idTree:'root',
//        loaded:false
//    },
    autoLoad: true,
//    sorters: [{
//        property: 'id',
//        direction: 'DESC'
//    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'categoryNodeService/findCategoryNodes',
        actionMethods:  {
            read: 'POST'
        },
//        extraParams:{
//            filters : Ext.encode([Ext.create ('AFW_AGC_Xjs.model.util.Filtro', {
//                nombreCampo: 'class',
//                valor: 'PlaceProximity',
//                valores: null,
//                operacion: '=',
//                tipoValor: 'string'
//            }).data])
//        },
        reader: {
            type: 'json',
            rootProperty: 'datos',
            successProperty: 'valido',
            totalProperty: 'totalRegistros'
        }
    }
});