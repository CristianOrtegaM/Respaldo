Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Role'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'roleKindRol', type: 'string', useNull: true, defaultValue: null},
        {name: 'rolePlayerPeriodStartDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'rolePlayerPeriodEndDateTimeRol', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'descriptionRol', type: 'string'},
        {name: 'playerRoleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'},
        {name: 'roleRol', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1'}],

        clientIdProperty: 'roleIdentifierRol',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'roleService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
