Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.roleAndRelationship.PartyRoleV1FormInput',{
    extend: 'Ext.form.FormPanel',
    alias: 'widget.partyrolev1forminput',
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
                    xtype:'fieldset',
                    title: 'Rol',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Inicio de Vigencia',
                        emptyText: 'Ingrese Inicio de Vigencia',
                        name: 'rolePlayerPeriodStartDateTimeRol',
                        allowBlank: false,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        hidden: false,
                        columnWidth: .25,
                        padding: '0 10 10 0',
                        format: 'd/m/Y',
                        submitFormat: 'd-m-Y H:i:s',
                        editable: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Fin de Vigencia',
                        emptyText: 'Ingrese Fin de Vigencia',
                        name: 'rolePlayerPeriodEndDateTimeRol',
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
                        maxLength: 5000,
                        grow: true,
                        name: 'descriptionRol',
                        allowBlank: true,
                        hidden: false,
                        columnWidth: 1,
                        padding: '0 10 10 0',
                        fieldLabel: 'Descripción',
                        anchor: '100%'
                    },
                    {
                        xtype: 'label',
                        text : 'Usuario',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'rolev1grid',
                                itemId: 'playerRoleRolGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'playerRoleRolPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#playerRoleRolPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'playerRoleRolPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'rolev1formsearch'
                                }]
                            },{
                                xtype: 'rolev1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#playerRoleRolPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="playerRoleRolPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#playerRoleRolGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('roleIdentifierRol', rec.get('roleIdentifierRol'))==-1)
                                                store.loadRawData(rec.data,false);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                                this.up('#playerPartyParPanelGrid').setVisible(false);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'label',
                        text : 'Roles',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'rolev1grid',
                                itemId: 'roleRolGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.RoleV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'roleRolPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#roleRolPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'roleRolPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'rolev1formsearch'
                                }]
                            },{
                                xtype: 'rolev1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#roleRolPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="roleRolPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#roleRolGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('roleIdentifierRol', rec.get('roleIdentifierRol'))==-1)
                                                store.loadRawData(rec.data,true);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    }]
                },{
                    xtype:'fieldset',  
                    title: 'Rol de Parte',
                    collapsible: true,
                    hidden: false,
                    columnWidth: 1,
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        columnWidth: .25
                    },
                    items:[
                    {
                        xtype: 'label',
                        text : 'Parte',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'partyv1grid',
                                itemId: 'playerPartyParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'playerPartyParPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#playerPartyParPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'playerPartyParPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'partyv1formsearch'
                                }]
                            },{
                                xtype: 'partyv1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#playerPartyParPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="playerPartyParPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#playerPartyParGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('partyIdentifierPar', rec.get('partyIdentifierPar'))==-1)
                                                store.loadRawData(rec.data,false);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                                this.up('#playerPartyParPanelGrid').setVisible(false);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'label',
                        text : 'Nombre del Rol',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'partynamev1grid',
                                itemId: 'nameParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.partyName.PartyNameV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'nameParPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#nameParPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'nameParPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'partynamev1formsearch'
                                }]
                            },{
                                xtype: 'partynamev1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#nameParPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="nameParPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#nameParGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('partyNameIdentifierPan', rec.get('partyNameIdentifierPan'))==-1)
                                                store.loadRawData(rec.data,false);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                                this.up('#playerPartyParPanelGrid').setVisible(false);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'label',
                        text : 'Especificaciones Diseñadas',
                        cls: 'x-label-req',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                        ],
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'specificationv1grid',
                                itemId: 'designedSpecificationParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.SpecificationV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'designedSpecificationParPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#designedSpecificationParPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'designedSpecificationParPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'specificationv1formsearch'
                                }]
                            },{
                                xtype: 'specificationv1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#designedSpecificationParPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="designedSpecificationParPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#designedSpecificationParGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('specificationIdentifierSpe', rec.get('specificationIdentifierSpe'))==-1)
                                                store.loadRawData(rec.data,true);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'label',
                        text : 'Capacidades',
                        padding : '5 5 5 5',
                        columnWidth : 1
                    },
                    {
                        columnWidth: 1,
                        padding: '5 5 5 5',
                        hidden: false,
                        border: false,
                        defaults: {
                            anchor: '100%',
                            columnWidth : .5
                        },
                        width: '100%',
                        layout: 'column',
                        items: [{
                            border: false,
                            columnWidth: 1,
                            items:[{
                                xtype: 'capabilityv1grid',
                                itemId: 'ownedCapabilityParGrid',
                                autoScroll: true,
                                height: '',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.roleAndRelationship.CapabilityV1',
                                    proxy: {
                                        type: 'pagingmemoryb',
                                    data: []
                                    }
                                }),
                                listeners: {
                                    beforerender: function(){
                                        this.getStore().load();
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'delete-grid',
                                            tooltip: 'Borrar',
                                            handler: function(grid, rowIndex,colIndex){
                                                var store = grid.getStore();
                                                store.removeAt(rowIndex);
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                        this.removeDocked(this.down('pagingtoolbar'));
                                    }
                                }
                            },{
                                xtype: 'button',
                                itemId: 'ownedCapabilityParPanelGridButton',
                                cls: 'boton-objeto',
                                style: {
                                    'float': 'right',
                                    'margin': '10px'
                                },
                                handler: function(){
                                    this.toggle();
                                    var grid = this.up('fieldset').down('#ownedCapabilityParPanelGrid');
                                    if(grid.isHidden()){
                                        grid.setVisible(true);
                                        grid.on('afterlayout', function(){
                                            this.center();
                                        });
                                    }
                                    else
                                        grid.setVisible(false);
                                }
                            }]
                        },{
                            border: false,
                            padding: 10,
                            itemId: 'ownedCapabilityParPanelGrid',
                            hidden: true,
                            floating: true,
                            draggable: true, 
                            width: '85%',
                            items: [{
                                title: 'Búsqueda',
                                cls: 'panelheader',
                                title: 'Búsqueda',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                listeners:{
                                    collapse: function(){
                                        this.updateLayout();
                                    },
                                    expand: function(){
                                        this.updateLayout();
                                    },
                                },
                                items: [{
                                    xtype: 'capabilityv1formsearch'
                                }]
                            },{
                                xtype: 'capabilityv1grid',
                                enableColumnResize: false,
                                listeners: {
                                    afterrender: function(){
                                        this.getStore().load();
                                        var toolbar = this.down('pagingtoolbar');
                                        this.down('toolbar').fireEvent('buttonsAccess', ['c']);
                                        toolbar.add({
                                            xtype : 'button',
                                            text : 'Cerrar',
                                            handler : function(){
                                                var screen = Ext.ComponentQuery.query('#ownedCapabilityParPanelGrid');
                                                var win = screen[screen.length-1];
                                                win.setVisible(false);
                                                var button = Ext.ComponentQuery.query('button[itemId="ownedCapabilityParPanelGridButton"]');
                                                button[button.length-1].toggle();
                                            }
                                        });
                                        var column = Ext.create('Ext.grid.column.Action',{
                                            flex: 0.3,
                                            sortable: false,
                                            align: 'center',
                                            iconCls: 'add-grid',
                                            tooltip: 'Agregar',
                                            handler: function(grid, rowIndex,colIndex, item, e, rec){
                                                var screen = Ext.ComponentQuery.query('#ownedCapabilityParGrid');
                                                var store = screen[screen.length-1].getStore();
                                                if(store.findExact('capabilityIdentifierCap', rec.get('capabilityIdentifierCap'))==-1)
                                                store.loadRawData(rec.data,true);
                                                Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                                            }
                                        });
                                        this.headerCt.insert(0,column);
                                        this.getView().refresh();
                                    }
                                }
                            }],
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav',this.el, {
                                        esc: function(){
                                            this.setVisible(false);
                                            this.up('fieldset').down('button[pressed=true]').toggle();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }]
                    }]
                }
                ]
            }]
        }];
        this.callParent(arguments);
    }
});
