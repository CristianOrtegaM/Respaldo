Ext.define('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', {

    extend: 'Ext.data.Store',
    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1',
    remoteSort: true,
    remoteFilter: true,
    simpleSortMode: true,
    simpleGroupMode: true,
    pageSize: 15,
    autoLoad: false,
    sorters: [{
        property: 'tableIdentifierXtt',
        direction: 'DESC'
    }],
    proxy:  {
        type: 'rest',
        url: urlService + 'xtbmlTableService/findByFilterLevel1',
        actionMethods:  {
            read: 'POST'
        },
        extraParams:{
            filters : Ext.encode([Ext.create ('AFW_FND_Xjs.model.util.Filtro', {
                nombreCampo: 'class',
                valor: 'XtbmlTable',
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
