Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'Capability'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'nameCap', type: 'string'},
        {name: 'descriptionCap', type: 'string'},
        {name: 'proficiencyLevelCodeCap', type: 'string', useNull: true, defaultValue: null},
        {name: 'authorizationLevelCap', type: 'string'},
        {name: 'availablePeriodEndDateTimeCap', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'availablePeriodStartDateTimeCap', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'owningCapabilityCap', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'},
        {name: 'ownedCapabilityCap', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1'}],

        clientIdProperty: 'capabilityIdentifierCap',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'capabilityService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
