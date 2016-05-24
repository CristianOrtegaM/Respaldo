Ext.define('AFW_FND_Xjs.view.ext.SelectFileToLoad', {
    extend: 'Ext.window.Window',
    alias: 'widget.selectfiletoload',
    modal: true,
    constrain: true,
    title: 'Cargador de Valores',
    autoScroll: true,
    width: '60%',
    bodyPadding: 15,
    layout: 'fit',


    items: [{
            xtype: 'form',
            fieldDefaults: {
                labelAlign: 'top',
                style: 'font-size: 14px'
            },
            border: false,
            layout: 'column',
            defaults: {
                columnWidth: 1
            },
            items: [{
                            xtype: 'form',
                            itemId: 'docForm',
                            columnWidth: 1,
                            border: false,
                            layout: 'column',
                            items: [{
                                    xtype: 'filefield',
                                    fieldLabel: 'Ubicación',
                                    name: 'file',
                                    allowBlank: false,
                                    afterLabelTextTpl: [
                                        '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                    ],
                                    hidden: false,
                                    columnWidth: 1,
                                    padding: '0 10 10 0',
                                    buttonText: 'Seleccionar...',
                                    listeners: {
                                        blur: function(tf) {
                                            if (tf.getValue != "")
                                                this.setValue(tf.getValue().trim());
                                        	}
                                    	}
                                	}]
                    }]
                }],

    buttons: [{
            text: 'Cargar',
            action: 'upload'
        }, {
            text: 'Cancelar',
            handler: function() {
                this.up('window').close();
            }
        }]
});