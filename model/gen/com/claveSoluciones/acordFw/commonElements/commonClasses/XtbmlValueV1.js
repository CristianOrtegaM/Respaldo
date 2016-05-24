Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'XtbmlValue'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'tableXtv', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1'},
        {name: 'dim01Xtv', type: 'int'},
        {name: 'dim02Xtv', type: 'int'},
        {name: 'dim03Xtv', type: 'int'},
        {name: 'dim04Xtv', type: 'int'},
        {name: 'dim05Xtv', type: 'int'},
        {name: 'dim06Xtv', type: 'int'},
        {name: 'dim07Xtv', type: 'int'},
        {name: 'dim08Xtv', type: 'int'},
        {name: 'dim09Xtv', type: 'int'},
        {name: 'dim10Xtv', type: 'int'},
        {name: 'fixedAmountXtv', type: 'float'},
        {name: 'percentageXtv', type: 'float'},
        {name: 'floorAmountXtv', type: 'float'},
        {name: 'capAmountXtv', type: 'float'},
        {name: 'discountAmountXtv', type: 'float'}],

        clientIdProperty: 'valueIdentifierXtv',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'xtbmlValueService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
