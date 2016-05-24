Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.RegistryV2FormInput',{
    extend: 'Ext.form.FormPanel',
    requires: [
    		   'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataInsuranceCompany',
               'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.component.DataRegisterBook',
    		   'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.ContactPreference',     		  
    		   'AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.component.DataCompany'
    ],
    alias: 'widget.registryv2forminput_ext',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    initComponent: function() {
        this.items = [
        {
                layout: 'column',
                xtype: 'panel',
                border: false,
                items: [{
                        layout: 'column',
                        xtype: 'panel',
                        height: '100%',
                        border: false,
                        columnWidth: 1,
                        defaults: {
                            anchor: '100%',
                            columnWidth: 1
                        },
                        padding: '10 10 0 10',
                        items: [
                        {
                        	columnWidth: 1,
                 			xtype: 'dataregisterbook',
	                                
	                    },
	                    {
                 			columnWidth: 1,
                 			xtype: 'datacompany',
	                 	 },
	                     {
	                         columnWidth: 1,
	                    	 xtype: 'contactpreference',
	                    
	                	},	                		
                    	{
                            columnWidth: 1,
                    	    xtype: 'datainsurancecompany',
                    
                		}
                        
                        ]
                       }]
        }
        ];
        this.callParent(arguments);
    }
});
