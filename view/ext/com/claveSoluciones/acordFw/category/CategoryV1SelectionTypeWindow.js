Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.CategoryV1SelectionTypeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.categoryv1selectiontype',
    addMode: false,
    title: 'Seleccione el Tipo de Categoría',
    height: 150,
    width: 350,
    modal: true,
    autoScroll: true,
    draggable: false,
    resizable: false,
    initComponent: function() {
        this.buttons = this.buildButtons();
        this.callParent(arguments);
    },
    items: [
        {
            border: false,
            padding: 10,
            layout: 'column',
            defaults: {
                columnWidth: 1
            },
            items: [{
                    xtype: 'combo',
                    fieldLabel: 'Tipo de Categoría',
                    labelWidth: 130,
                    name: 'categorytype',
                    editable: false,
                    allowBlank: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                    ],
                    padding: '0 0 0 10',
                    valueField: 'externalCodeExc',
                    displayField: 'descriptionExc',
                    store: new Ext.data.Store({
                        model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.ExternalCodeV1',
                        remoteSort: true,
                        autoLoad: false,
                        pageSize: 9999,
                        proxy: {
                            type: 'rest',
                            url: urlService + 'externalCodeService/findByExternalCodeType',
                            actionMethods: {
                                read: 'POST'
                            },
                            extraParams: {
                                code: 'CategoryClass'
                            },
                            reader: {
                                rootProperty: 'datos',
                                successProperty: 'valido',
                                totalProperty: 'totalRegistros'
                            }
                        }
                    }),
                }]

        }
    ],
    buildButtons: function() {
        return [{
                text: 'Aceptar',
                scope: this,
                margins: '0 17 0 0',
                action: 'aceptar'
            }, {
                text: 'Cancelar',
                scope: this,
                margins: '0 17 0 0',
                handler: this.close
            }];
    }

})