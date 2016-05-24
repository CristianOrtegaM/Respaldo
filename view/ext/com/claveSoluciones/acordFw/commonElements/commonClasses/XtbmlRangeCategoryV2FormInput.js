Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeCategoryV2FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.xtbmlrangecategoryv2forminput',
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
                padding: '10',
                items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Categoría',
                    autoLoadOnValue: true,
                    emptyText: 'Seleccione ...',
                    name: 'categoryType',
                    allowBlank: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                    ],
                    columnWidth: 0.75,
                    padding: '0 10 10 0',
                    queryMode: 'local',
                    typeAhead: true,
                    minChars: 0,
                    listeners: {
                        focus: function(combo){
                            combo.getStore().load({
                                callback: function(){
                                    combo.expand();
                                }
                            });
                        }
                    },
                    hidden: false,
                    valueField: 'idCategory',
                    displayField: 'name',
                    forceSelection: true,
                    store: new Ext.data.Store({
                        model:'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryParentExt',
                        remoteSort: true,
                        autoLoad: false,
                        pageSize: 9999,
                        proxy: {
                            type: 'rest',
                            url: urlService + 'categoryNodeService/findCategoryParents',
                            actionMethods: {
                                read: 'POST'
                            },
                            extraParams: {
                            	codeGeneralParameter: 'ValorCategoriaProceso'
                            },
                            reader: {
                                rootProperty: 'datos',
                                successProperty: 'valido',
                                totalProperty: 'totalRegistros'
                            }
                        }
                    })
                }]
            }]
        }];
        this.callParent(arguments);
    }
});
