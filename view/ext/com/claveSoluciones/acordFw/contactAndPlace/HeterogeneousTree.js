Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.HeterogeneousTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.heterogeneoustree',
    xtype: 'heterogeneoustree',
    
    //store: 'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.contactAndPlace.PlaceNode',
    rootVisible: false,
    animate: false,
    frame: true,
    containerScroll: true,
    autoSize: true,
    //title: 'Asociación de Lugares',
    width: 650,
    height: 400,
    reserveScrollbar: true,
    columns: [{
        xtype: 'treecolumn',
        text: 'Nombre',
        dataIndex: 'name',
        flex: 1,
        sortable: true
    }, {
        text: 'Tipo',
        dataIndex: 'tipo'
        //renderer: function(v, cellValues, record) {
        //    return record.entityName;
        //}
    }, {
        xtype: 'actioncolumn',
        width: 25,
        items: [{
             icon: 'extjs/resources/themes/images/default/page_white_edit.png',
             tooltip: 'Editar',
        }],
        getTip: function(value, meta, rec, rowIdx, colIdx, store, view) {
            // Go up from the view to the owning TreePanel
            var panel = view.up('');
            return panel.getActionTip.apply(panel, arguments);
        },
        handler: function(view) {
            // Go up from the view to the owning TreePanel
            var panel = view.up('');
            panel.onDrillAction.apply(panel, arguments);
        }
    }],

    selModel: {
        allowDeselect: true,
        listeners: {
            selectionchange: function(selModel, selection) {
                // Go up from the view to the owning TreePanel
                var panel = selModel.view.up('');
                panel.onSelectionChange.apply(panel, arguments);
            }
        },
        onKeyEnter: function() {
            // Go up from the view to the owning TreePanel
            var panel = this.view.up('');
            panel.down('#new-name').focus();
        }
    },
//
//    bbar: [{
//        xtype: 'textfield',
//        itemId: 'new-name',
//        enableKeyEvents: true,
//        listeners: {
//            keydown: function(inputField, e) {
//                // Go up from the view to the owning TreePanel
//                var panel = inputField.up('treepanel');
//                if (e.keyCode === Ext.EventObject.ENTER) {
//                    panel.addClick();
//                } else if (e.keyCode === Ext.EventObject.TAB && e.shiftKey) {
//                    e.stopEvent();
//                    panel.view.focusRow(panel.selModel.getSelection()[0] || 0);
//                }
//            }
//        }
//    }, {
//        itemId: 'add-button',
//        text: 'Add Territory',
//        handler: function(button) {
//            // Go up from the view to the owning TreePanel
//            var panel = button.up('treepanel');
//            panel.addClick();
//        }
//    }],

    addClick: function() {
        var target = this.selModel.getSelection()[0] || this.getRootNode(),
            inputField = this.down('#new-name'),
            node,
            value = inputField && inputField.getValue();

        if (value) {
            node = {
                name: value
            };
            
            if (target.isRoot() ) {
                //Nothing selected -- adding new Territory
                node.children = [];
                node.mtype = 'Territory';
            } else if (target instanceof KitchenSink.model.tree.Territory) {
                // Programatically added - must not try to load over Ajax
                node.children = [];
                node.mtype = 'Country';
            } else if (target instanceof KitchenSink.model.tree.Country) {
            // Adding to the Country level - that is our leaf level
                node.leaf = true;
                node.mtype = 'City';
            }
            
            node = target.appendChild(node);

            // User might want to see what they've just added!
            if (!target.isExpanded()) {
                target.expand(false, function() {
                });
            }
            this.selModel.select(node);
            inputField.reset();
        }
    },

    onSelectionChange: function(selModel, selection) {
        var button = this.down('#add-button'),
            selectedNode;

        if (selection.length) {
            selectedNode = selection[0];
//            if (selectedNode instanceof KitchenSink.model.tree.Territory) {
//                this.addClass = KitchenSink.model.tree.Country;
//                button.setText('Add Country');
//                button.enable();
//            } else if (selectedNode instanceof KitchenSink.model.tree.Country) {
//                this.addClass = KitchenSink.model.tree.City;
//                button.setText('Add City');
//                button.enable();
//            } else {
//                button.disable();
//            }
        } else {
//            this.addClass = KitchenSink.model.tree.Territory;
//            button.setText('Add Territory');
//            button.enable();
        }
    },

    getActionTip: function(value, meta, rec, rowIdx, colIdx, store, view) {
        //console.log (rec);
        var dataType;
        switch (Ext.ClassManager.getName(rec)) {
            case "KitchenSink.model.tree.Territory":
                dataType = 'territory';
                break;
            case "KitchenSink.model.tree.Country":
                dataType = 'country';
                break;
            case "KitchenSink.model.tree.City":
                dataType = 'city';
        }
        return 'Click for info on ' + dataType;
    },

    onDrillAction: function(view, rowIndex, colIndex, row, event, rec) {
        var windowType = null;
        var record = null;
        var store=null;
        switch (rec.data.type) {
            case 'Country':
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1', rec.get('place'));
                windowType = 'countryv1principalwindow';
                break;
            case 'CountrySubdivision.Province':
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2', rec.get('place'));
                windowType = 'countrysubdivisionv2principalwindow';
                break;            
            case 'CountrySubdivision.State':                
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1', rec.get('place'));
                windowType = 'countrysubdivisionv1principalwindow';
                break;
            case 'Municipality.City':
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1', rec.get('place'));
                windowType = 'municipalityv1principalwindow';
                break;            
            case 'Municipality.Township':                
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2', rec.get('place'));
                windowType = 'municipalityv2principalwindow';
                break; 
            case 'PostCode':                
                record = Ext.create ('AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1', rec.get('place'));
                windowType = 'postcodev1principalwindow';
                break;  
        }
        
        if (windowType !== null) {
            var window = Ext.widget(windowType);
            //window.setTitle('País Nº ' + seleccion[0].get('placeIdentifierPla'));
            window.down('form').getForm().loadRecord(record);
            window.show();
        }
    }
});
