Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.capabilityv1forminput_ext',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    initComponent: function() {
        this.items = [{
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
                    xtype:'fieldset',
                    title: 'Capacidad',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .333
                    },
                    items:[
                    	{
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        emptyText: 'Ingrese Nombre',
                        name: 'nameCap',
                        allowBlank: true,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        regex: /^([a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+(::))+[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                        regexText: 'Campo inválido',
                        maxLength: 255,
                        enforceMaxLength: true,
                        listeners: {
                            blur: function(tf){
                                if(tf.getValue!="")
                                    this.setValue(tf.getValue().trim());
                            },
                            render: function(p) {
					            var theElem = p.getEl();
					            var theTip = Ext.create('Ext.tip.Tip', {
					                html: "formato 'Tipo::Objeto::Ruta' ej. 'incluye::menu::configuracion'",
					                margin: '0 0 0 200',
					                shadow: false
					            });
					           
					            p.getEl().on('mouseover', function(){
					                theTip.showAt(theElem.getX(), theElem.getY());
					            });
					           
					            p.getEl().on('mouseleave', function(){
					                theTip.hide();
					            });
                            }
                        }	
                    	},
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Vigencia Inicial',
                        emptyText: 'Ingrese Vigencia Inicial',
                        name: 'availablePeriodStartDateTimeCap',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        listeners : {
                        	render : function(datefield) {
                        		/// code to convert GMT String to date object
                        		if(datefield.getValue() == null)
                        			datefield.setValue(new Date());
                            }
                        },
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Vigencia Final',
                        emptyText: 'Ingrese Vigencia Final',
                        name: 'availablePeriodEndDateTimeCap',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'textareafield',
                        grow: false,
                        name: 'descriptionCap',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        fieldLabel: 'Descripción',
                        anchor: '100%'
                    }
                    
					]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
