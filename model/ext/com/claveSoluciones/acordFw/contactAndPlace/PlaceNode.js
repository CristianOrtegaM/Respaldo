Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNode', {
    extend: 'Ext.data.TreeModel',
    entityName: 'PlaceNode',
    //idProperty: 'id',
    //clientIdProperty: 'id',
    fields: [
        {name: "name", convert: undefined},
        {name: "idPlace", convert: undefined},
        {name: "idTree", convert: undefined},
        {name: "type", convert: undefined},
        {name: "tipo", convert: undefined},
        {name: "place", convert: undefined},
        {name: "leaf", type: 'boolean', convert: undefined, defaultValue: false}
        //{ name: 'expanded', defaultValue: true },
        //{ name: 'loaded', type: 'boolean', mapping: 'loaded', defaultValue: false },
    ]/*, 
     proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'placeNodeService/findPlaceNodes',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }*/
});