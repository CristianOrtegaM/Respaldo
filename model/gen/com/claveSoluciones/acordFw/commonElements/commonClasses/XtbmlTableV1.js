Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlTableV1', {
    extend: 'Ext.data.Model',
    requires:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'XtbmlTable'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'tableNameXtt', type: 'string'},
        {name: 'dimensionQtyXtt', type: 'int'},
        {name: 'variableIndicatorXtt', type: 'boolean'},
        {name: 'transactionCodeXtt', type: 'string'},
        {name: 'marginalRateIndicatorXtt', type: 'boolean'},
        {name: 'floorTableXtt', type: 'float'},
        {name: 'capTableXtt', type: 'float'},
        {name: 'completeIndicatorXtt', type: 'boolean'},
        {name: 'dimensionsXtt', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlDimensionV1'},
        {name: 'valuesXtt', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV1'}],

        clientIdProperty: 'tableIdentifierXtt',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'xtbmlTableService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
