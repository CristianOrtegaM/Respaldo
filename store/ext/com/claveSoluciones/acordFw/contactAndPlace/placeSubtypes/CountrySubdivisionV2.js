Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 15,
    autoLoad: false,
    sorters: [{
        property: 'placeIdentifierPla',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'countrySubdivisionService/findByFilter',
        actionMethods:  {
            read: 'POST'
        },
        extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'CountrySubdivision',
                valores: null,
                operacion: '=',
                tipoValor: 'string'
            }).data,
            Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                        nombreCampo: 'typeCodeCos',
                        valor: 'Province',
                        valores: null,
                        operacion: '=',
                        tipoValor: 'enum',
                        enumName: 'main.java.com.claveSoluciones.acordFw.entity.contactAndPlace.contactCodeLists.CountrySubdivisionTypeCodeList'
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
