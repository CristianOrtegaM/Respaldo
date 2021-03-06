Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.PlaceProximityV1',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 15,
    autoLoad: false,
    sorters: [{
        property: 'placeProximityIdentifierPlp',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'placeProximityService/findByFilter',
        actionMethods:  {
            read: 'POST'
        },
        extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'PlaceProximity',
                valores: null,
                operacion: '=',
                tipoValor: 'string'
            }).data,
            Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'toPlacePlp<>class',
                valor: 'PostCode',
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
