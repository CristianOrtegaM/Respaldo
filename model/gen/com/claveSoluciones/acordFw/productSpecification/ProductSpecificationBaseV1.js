Ext.define('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductSpecificationBaseV1', {
    extend: 'Ext.data.Model',
    models:
        [
        'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'
        ],

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'ProductSpecificationBase'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'keyImo', type: 'string'},
        {name: 'kindOfElementNameSpe', type: 'string'},
        {name: 'versionSpe', type: 'string'},
        {name: 'nameSpe', type: 'string'},
        {name: 'shortNameSpe', type: 'string'},
        {name: 'descriptionSpe', type: 'string'},
        {name: 'specificationKindSpe', type: 'string', useNull: true, defaultValue: 'ProductSpecificationBase'},
        {name: 'designerSpe', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1'},
        {name: 'productSpecificationBaseKindPsb', type: 'string', useNull: true, defaultValue: null},
        {name: 'originatingProductAssociationPsb', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductAssociationV1'}],

        clientIdProperty: 'specificationIdentifierSpe',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'productSpecificationBaseService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
