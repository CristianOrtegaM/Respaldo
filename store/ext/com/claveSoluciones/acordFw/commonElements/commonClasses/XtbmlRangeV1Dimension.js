Ext.define('AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1Dimension', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 10,
    autoLoad: false,
    sorters: [{
        property: 'rangeIdentifierXtr',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'xtbmlRangeService/findXtbmlRangeByXtbmlDimension',
        actionMethods:  {
            read: 'POST'
        },
        /**extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'XtbmlRange',
                valores: null,
                operacion: '=',
                tipoValor: 'string'
            }).data])
        },**/
        reader: {
            type: 'json',
            rootProperty: 'datos',
            successProperty: 'valido',
            totalProperty: 'totalRegistros'
        }
    }
});
