Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNodeZ', {
    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNode',
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
    autoLoad: false,
//    sorters: [{
//        property: 'id',
//        direction: 'DESC'
//    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'placeNodeService/findPlaceNodesZ',
        actionMethods:  {
            read: 'GET'
        },
//        extraParams:{
//            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
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