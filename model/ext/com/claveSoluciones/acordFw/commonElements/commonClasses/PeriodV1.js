Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1', {
    extend: 'Ext.data.Model',
    requires:['AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1'],

    fields: [

        {name: 'basicDataCompleteCodeImo', type: 'string'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'periodCodePer', type: 'int'},
        {name: 'periodEndDatePer', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'periodStartDatePer', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'periodStatusPer', reference: 'AFW_FND_Xjs.model.ext.claveSoluciones.acordFw.commonElements.commonClasses.PeriodStatusV1'},
        {name: 'periodTypeCodePer', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Period'},
        {name: 'monthYearName',type: 'string'}],

        clientIdProperty: 'periodIdentifierPer',
        
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'periodService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
