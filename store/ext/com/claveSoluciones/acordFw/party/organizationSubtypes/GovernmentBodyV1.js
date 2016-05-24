Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.party.organizationSubtypes.GovernmentBodyV1',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 15,
    autoLoad: false,
    sorters: [{
        property: 'partyIdentifierPar',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'governmentBodyService/findByFilter',
        actionMethods:  {
            read: 'POST'
        },
        extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'GovernmentBody',
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
