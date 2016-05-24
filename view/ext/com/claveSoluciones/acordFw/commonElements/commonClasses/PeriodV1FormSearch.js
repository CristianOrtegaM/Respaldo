Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.PeriodV1FormSearch',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.periodv1formsearch_ext',
    renderTo: Ext.getBody(),
    layout: 'column',
    height: '100%',
    border: false,
    items: [
        {
        	xtype: 'numericfield',
	        maxLength: 10,
            fieldLabel: 'Nº',
            emptyText: 'Ingrese Nº',
            name: 'periodIdentifierPer',
            columnWidth: .25,
            padding: '0 10 10 0',
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            hidden: false
        },  
		{
			fieldLabel : 'Código',
			name: 'periodCodePer',
			xtype : 'numberfield',
			emptyText : 'Ingrese Código',
			maxLength : 6,
			columnWidth : 0.25,
			padding : '0 10 0 0',
			hideTrigger: true,
		    keyNavEnabled: false,
		    mouseWheelEnabled: false
		}, {
			fieldLabel : 'Estado',
			name: 'estadoperiododeproceso',
			name: 'codePer',
			xtype : 'combo',
			emptyText : 'Seleccione',
			editable : false,
			forceSelection : true,
			minChars : 0,
			queryMode: 'local',
			columnWidth : 0.25,
			padding : '0 10 0 0',
			valueField: 'enumerationLiteralEnu',
            displayField: 'descriptionEnu',
            forceSelection: true,
            listeners: {
                focus: function(combo){
                    combo.getStore().load({
                        callback: function(){
                            combo.expand();
                        }
                    });
                }
            },
            store: new Ext.data.Store({
                model:'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
                remoteSort: true,
                autoLoad: false,
                pageSize: 9999,
                proxy: {
                    type: 'rest',
                    url: urlService + 'enumerationService/findByEnumerationType',
                    actionMethods: {
                        read: 'POST'
                    },
                    extraParams: {
                        enumName: 'PeriodStatusTypeCodeList'
                    },
                    reader: {
                        rootProperty: 'datos',
                        successProperty: 'valido',
                        totalProperty: 'totalRegistros'
                    }
                }
            })
		}
        
    ],
    buttons:[{
        text: 'Limpiar',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Buscar',
        formBind: true,
        disabled: true,
        action: 'buscar'
    }]
});
