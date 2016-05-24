Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.AttributeRulesGrid', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.attributerulesgrid',
    defaults: {
        border: false
    },
    loadMask: true,
    autoScroll: true,
    disabled: true,
    border: false,
    fieldDefaults: {
        labelAlign: 'top',
        style: 'font-size: 14px'
    },
    padding: 10,
    listeners: {
        enable: function() {
            this.down('tabpanel').setDisabled(false);
        },
        checkTabs: function() {
            var t1 = Ext.ComponentQuery.query('#attributeRange')[Ext.ComponentQuery.query('#attributeRange').length-1];
            var t2 = Ext.ComponentQuery.query('#attributeEnumeration')[Ext.ComponentQuery.query('#attributeEnumeration').length-1];
            var t3 = Ext.ComponentQuery.query('#attributeCalculation')[Ext.ComponentQuery.query('#attributeCalculation').length-1];
            var t4 = Ext.ComponentQuery.query('#attributeProduct')[Ext.ComponentQuery.query('#attributeProduct').length-1];
            
            var title1 = parseInt(t1.getTitle().split('(')[1].split(')')[0]);
            var title2 = parseInt(t2.getTitle().split('(')[1].split(')')[0]);
            var title3 = parseInt(t3.getTitle().split('(')[1].split(')')[0]);
            var title4 = parseInt(t4.getTitle().split('(')[1].split(')')[0]);

            if (title1 > title2 && title1 > title3 && title1 > title4 && !t1.tab.active) {
                this.down('tabpanel').setActive(t1.tab);
            } else if (title2 > title1 && title2 > title3 && title2 > title4 && !t2.tab.active) {
                this.down('tabpanel').setActive(t2.tab);
            } else if (title3 > title1 && title3 > title2 && title3 > title4 && !t3.tab.active) {
                this.down('tabpanel').setActive(t3.tab);
            } else if (title4 > title1 && title4 > title2 && title4 > title3 && !t4.tab.active) {
                this.down('tabpanel').setActive(t4.tab);
            }
        }
    },
    initComponent: function() {
        this.items = [{
                xtype: 'tabpanel',
                itemId: 'tabPanelAttributeRule',
                columnWidth: 1,
                listeners: {
                    afterrender: function(t) {
                        if(t.down('#attributeCalculation')){
                            var window = t.up('window');
                            if (window.getXType() == 'productattributespecificationv2principalwindow') {
                                window.down('#attributeEnumeration').tab.setVisible(true);
                                window.down('#attributeRange').fireEvent('loadTitle', window.down('#attributeRange'));
                                window.down('#attributeEnumeration').fireEvent('loadTitle', window.down('#attributeEnumeration'));
                                window.down('#attributeCalculation').fireEvent('loadTitle', window.down('#attributeCalculation'));
                                window.down('#attributeCalculation').tab.setVisible(true);
                                window.down('#attributeRange').tab.setVisible(true);
                                window.down('#attributeProduct').tab.setVisible(false);
                            } else if(window.getXType() == 'limitspecificationv2principalwindow'
                                    || window.getXType() == 'reinstatementlimitspecificationv2principalwindow'
                                    || window.getXType() == 'deductiblespecificationv2principalwindow'
                                    || window.getXType() == 'financialscheduleroptionspecificationv2principalwindow'
                                    || window.getXType() == 'financialprovisionspecificationv2principalwindow'
                                    || window.getXType() == 'feespecificationv2principalwindow'
                                    || window.getXType() == 'premiumfactorspecificationv2principalwindow'
                                    || window.getXType() == 'waitingperiodspecificationv2principalwindow'
                                    || window.getXType() == 'taxdeductionspecificationv2principalwindow'
                                    || window.getXType() == 'ratingspecificationv2principalwindow'
                                    || window.getXType() == 'driverratingspecificationv2principalwindow'
                                    || window.getXType() == 'insuredratingspecificationv2principalwindow'
                                    || window.getXType() == 'structureratingspecificationv2principalwindow'
                                    || window.getXType() == 'vehicleratingspecificationv2principalwindow') {
                                window.down('#attributeEnumeration').tab.setVisible(false);
                                window.down('#attributeRange').tab.setVisible(false);
                                window.down('#attributeCalculation').tab.setVisible(false);
                                window.down('#attributeProduct').fireEvent('loadTitle', window.down('#attributeProduct'));
                                window.down('#attributeProduct').tab.setVisible(true);
                                var tpanel = window.down('#tabPanelAttributeRule'),
                                    attrRuleGrid = tpanel.up('attributerulesgrid'),
                                    isDisabled = attrRuleGrid.isDisabled();
                                if(isDisabled){
                                    attrRuleGrid.setDisabled(false);
                                }
                                window.down('#tabPanelAttributeRule').setActiveTab(window.down('#attributeProduct'));
                                attrRuleGrid.setDisabled(isDisabled);
                            } else {
                                window.down('#attributeEnumeration').tab.setVisible(false);
                                window.down('#attributeRange').tab.setVisible(false);
                                window.down('#attributeCalculation').tab.setVisible(true);
                                window.down('#attributeCalculation').fireEvent('loadTitle', window.down('#attributeCalculation'));
                                window.down('#attributeProduct').fireEvent('loadTitle', window.down('#attributeProduct'));
                                window.down('#attributeProduct').tab.setVisible(true);
                                var tpanel = window.down('#tabPanelAttributeRule'),
                                    attrRuleGrid = tpanel.up('attributerulesgrid'),
                                    isDisabled = attrRuleGrid.isDisabled();
                                if(isDisabled){
                                    attrRuleGrid.setDisabled(false);
                                }
                                window.down('#tabPanelAttributeRule').setActiveTab(window.down('#attributeProduct'));
                                attrRuleGrid.setDisabled(isDisabled);
                            }
                        }
//	 				},
//	 				enable: function(){
//	 					if(this.up('window').getXType()=='productattributespecificationv1principalwindow'){
//		 					this.setActiveTab(Ext.ComponentQuery.query('#attributeRange')[0]);
//		 					this.setActiveTab(Ext.ComponentQuery.query('#attributeEnumeration')[0]);
//	 					} else {
//	 						this.setActiveTab(Ext.ComponentQuery.query('#attributeCalculation')[0]);
//	 						this.setActiveTab(Ext.ComponentQuery.query('#attributeProduct')[0]);
//	 					}
                    }
                },
                items: [{
                        title: 'De Atributo Enumerado (0)',
                        itemId: 'attributeEnumeration',
                        border: false,
                        items: [{
                                xtype: 'attributeenumerationrulev1grid',
                                listeners: {
                                    afterrender: function() {
                                        var permisos = ['c', 'u', 'd'];
                                        this.down('pagingtoolbar').fireEvent('buttonsAccess', permisos);
                                    }
                                }
                            }],
                        listeners: {
                            loadTitle: function(t) {
                                var record = this.up('window').down('form').getForm().getRecord();
                                if (record != null && record != undefined) {
                                    var filtro = [];
                                    var specificationIdentifierSpe = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'controlledProductSpecificationPrs.specificationIdentifierSpe',
                                        valor: record.data.specificationIdentifierSpe,
                                        operacion: '=',
                                        tipoValor: 'long'
                                    });
                                    filtro.push(specificationIdentifierSpe.data);
                                    var attributeStore_1 = Ext.ComponentQuery.query('attributeenumerationrulev1grid')[Ext.ComponentQuery.query('attributeenumerationrulev1grid').length-1].getStore();
                                    attributeStore_1.removeAll ();
                                    attributeStore_1.filters.clear();
                                    delete attributeStore_1.getProxy().extraParams['filters'];
                                    attributeStore_1.pageSize = 50;
                                    attributeStore_1.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    attributeStore_1.currentPage = 1;
                                    attributeStore_1.load({
                                        scope: this,
                                        callback: function(records, operation) {
                                            var tab = operation.getScope(),
                                                tabpanel = tab.up('tabpanel'),
                                                tabActive = tabpanel.getActiveTab();
                                            tabpanel.setActiveTab(tab);
                                            if (tab != null) {
                                                tab.setTitle(tab.title.split('(')[0] + '(' + Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeEnumerationRuleV1').count() + ')');
                                            }
                                            tab.up('attributerulesgrid').fireEvent('checkTabs');
                                            tabpanel.setActiveTab(tabActive);
                                        }
                                    });
                                }
                            },
                            beforedestroy: function() {
                                this.down('grid').getStore().removeAll();
                            }
                        }
                    }, {
                        title: 'De Atributo de Rango (0)',
                        border: false,
                        itemId: 'attributeRange',
                        items: [{
                                xtype: 'attributerangerulev1grid',
                                listeners: {
                                    afterrender: function() {
                                        var permisos = ['c', 'u', 'd'];
                                        this.down('pagingtoolbar').fireEvent('buttonsAccess', permisos);
                                    }
                                }
                            }],
                        listeners: {
                            loadTitle: function(t) {
                                var record = t.up('window').down('form').getForm().getRecord();
                                if (record != null && record != undefined) {
                                    var filtro = [];
                                    var specificationIdentifierSpe = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'controlledProductSpecificationPrs.specificationIdentifierSpe',
                                        valor: record.data.specificationIdentifierSpe,
                                        operacion: '=',
                                        tipoValor: 'long'
                                    });
                                    filtro.push(specificationIdentifierSpe.data);
                                    var attributeStore_2 = t.down('attributerangerulev1grid').getStore();
                                    attributeStore_2.removeAll ();
                                    attributeStore_2.filters.clear();
                                    delete attributeStore_2.getProxy().extraParams['filters'];
                                    attributeStore_2.pageSize = 50;
                                    attributeStore_2.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    attributeStore_2.currentPage = 1;
                                    attributeStore_2.load({
                                        scope: t,
                                        callback: function(records, operation) {
                                            var tab = this,
                                                tabpanel = tab.up('tabpanel'),
                                                tabActive = tabpanel.getActiveTab();
                                            tabpanel.setActiveTab(tab);
                                            if (tab != null) {
                                                tab.setTitle(tab.title.split('(')[0] + '(' + Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeRangeRuleV1').count() + ')');
                                            }
                                            tab.up('attributerulesgrid').fireEvent('checkTabs');
                                            tabpanel.setActiveTab(tabActive);
                                        }
                                    });
                                }
                            },
                            beforedestroy: function() {
                                this.down('grid').getStore().removeAll();
                            }
                        }
                    }, {
                        title: 'De Producto (0)',
                        border: false,
                        itemId: 'attributeProduct',
                        items: [{
                                xtype: 'productrulev1grid',
                                listeners: {
                                    afterrender: function() {
                                        var permisos = ['c', 'u', 'd'];
                                        this.down('pagingtoolbar').fireEvent('buttonsAccess', permisos);
                                    }
                                }
                            }],
                        listeners: {
                            loadTitle: function(t) {
                                var record = t.up('window').down('form').getForm().getRecord();
                                if (record != null && record != undefined) {
                                    var filtro = [];
                                    var specificationIdentifierSpe = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'controlledProductSpecificationPrs.specificationIdentifierSpe',
                                        valor: record.data.specificationIdentifierSpe,
                                        operacion: '=',
                                        tipoValor: 'long'
                                    });
                                    filtro.push(specificationIdentifierSpe.data);
                                    var attributeStore_3 = t.down('productrulev1grid').getStore();
                                    attributeStore_3.removeAll ();
                                    attributeStore_3.filters.clear();
                                    delete attributeStore_3.getProxy().extraParams['filters'];
                                    attributeStore_3.pageSize = 50;
                                    attributeStore_3.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    attributeStore_3.currentPage = 1;
                                    attributeStore_3.load({
                                        scope: t,
                                        callback: function(records, operation) {
                                            var respuesta = Ext.decode(operation._response.responseText);
                                            if (respuesta.valido === true) {
                                                var tab = this,
                                                    tabpanel = tab.up('tabpanel'),
                                                    tabActive = tabpanel.getActiveTab();
                                                tabpanel.setActiveTab(tab);
                                                if (tab != null) {
                                                    tab.setTitle(tab.title.split('(')[0] + '(' + respuesta.totalRegistros + ')');
                                                }
                                                tab.up('attributerulesgrid').fireEvent('checkTabs');
                                                tabpanel.setActiveTab(tabActive);
                                            }
                                        }
                                    });
                                }
                            },
                            beforedestroy: function() {
                                this.down('grid').getStore().removeAll();
                            }
                        }
                    }, {
                        title: 'De Cálculo (0)',
                        border: false,
                        itemId: 'attributeCalculation',
                        items: [{
                                xtype: 'calculationrulev1grid',
                                listeners: {
                                    afterrender: function() {
                                        var permisos = ['c', 'u', 'd'];
                                        this.down('pagingtoolbar').fireEvent('buttonsAccess', permisos);
                                    }
                                }
                            }],
                        listeners: {
                            loadTitle: function(t) {
                                var record = t.up('window').down('form').getForm().getRecord();
                                if (record != null && record != undefined) {
                                    var filtro = [];
                                    var specificationIdentifierSpe = Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                        nombreCampo: 'controlledProductSpecificationPrs.specificationIdentifierSpe',
                                        valor: record.data.specificationIdentifierSpe,
                                        operacion: '=',
                                        tipoValor: 'long'
                                    });
                                    filtro.push(specificationIdentifierSpe.data);
                                    var attributeStore_4 = t.down('calculationrulev1grid').getStore();
                                    attributeStore_4.removeAll ();
                                    attributeStore_4.filters.clear();
                                    delete attributeStore_4.getProxy().extraParams['filters'];
                                    attributeStore_4.pageSize = 50;
                                    attributeStore_4.getProxy().setExtraParam('filters', Ext.encode(filtro));
                                    attributeStore_4.currentPage = 1;
                                    attributeStore_4.load({
                                        scope: t,
                                        callback: function(records, operation) {
                                            var tab = this,
                                                tabpanel = tab.up('tabpanel'),
                                                tabActive = tabpanel.getActiveTab();
                                            tabpanel.setActiveTab(tab);
                                            if (tab != null) {
                                                tab.setTitle(tab.title.split('(')[0] + '(' + Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.CalculationRuleV1').count() + ')');
                                            }
                                            tab.up('attributerulesgrid').fireEvent('checkTabs');
                                            tabpanel.setActiveTab(tabActive);
                                        }
                                    });
                                }
                            },
                            beforedestroy: function() {
                                this.down('grid').getStore().removeAll();
                            }
                        }
                    }]
            }];
        this.callParent(arguments);
    }
});