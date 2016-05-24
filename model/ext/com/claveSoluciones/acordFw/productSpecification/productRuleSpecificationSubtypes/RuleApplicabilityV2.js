Ext.define('AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV2', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'basicDataCompleteCodeImo', type: 'string', useNull: true, defaultValue: 'Full'},
        {name: 'creationDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'creationUserImo', type: 'string'},
        {name: 'typeNameImo', type: 'string', defaultValue: 'RuleApplicability'},
        {name: 'updateDateTimeImo', type: 'date', dateFormat: 'd-m-Y H:i:s'},
        {name: 'updateUserImo', type: 'string'},
        {name: 'productRuleRua', reference: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.productSpecification.ProductRuleSpecificationV1'},
        {name: 'componentPathCodeRua', type: 'string'},
        {name: 'applicabilityTypeCodeRua', type: 'string', useNull: true, defaultValue: null},
        {name: 'applicabilityTypeCodeRuaBool', type: 'bool', allowNull: true, defaultValue: false, 
        	convert: function(value, record){
        		if(record!=null  && record!=undefined){
	        		if(record.get('applicabilityTypeCodeRua')=='Included'){
	        			return true;
	        		} else {
	        			return false;
	        		}
        		}
        	},
            depends: [ 'applicabilityTypeCodeRua' ]},
        {name: 'keyImo', type: 'string'}],
     
        clientIdProperty: 'ruleApplicabilityIdentifierRua',
        proxy: {
            type: 'rest',
            writer: {
                type: 'json',
                writeAllFields: true
            },
            url: urlService + 'ruleApplicabilityService',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE',
                erase: 'DELETE'
            }
        }
});
