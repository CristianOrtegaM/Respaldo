Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.registration.component.DataRegisterBook', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataregisterbook',
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    border: false,
    layout: 'column',
    initComponent: function() {
        this.items = [{
	                   xtype: 'fieldset',
	                   title: 'Datos de Libro de Registro',
	                   collapsible: true,
	                   hidden: false,
	                   columnWidth: 1,
	                   layout: 'column',
	                   defaults: {
	                      anchor: '100%',
	                      columnWidth: .333
	                    },
                        items: [
						{
							xtype : 'textfield',
							fieldLabel : 'Nombre del Libro de Registro',
							emptyText: 'Ingrese Nombre del Libro de Registro',
							name : 'nameReg',
							columnWidth : 1,
							padding : '0 10 10 0',
							allowBlank: false,
            				afterLabelTextTpl: [
                				'<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
            				]
					    }
						],

                    }];
        this.callParent(arguments);
    }
});