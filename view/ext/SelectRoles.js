//junior
Ext.define('AFW_FND_Xjs.view.ext.SelectRoles', {
    extend: 'Ext.window.Window',
    requires: ['AFW_FND_Xjs.view.ext.Viewport'],
    alias: 'widget.selectroles',
    width: 350,
    height: 220,
    modal: true,
    autoScroll: true,
    border: false,
    resizable: false,
    closable: false,
    draggable: false,
    title: 'Seleccione Rol',
    initComponent: function() {
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent(arguments);
    },
    buildItems: function() {
        return [{
                xtype: 'form',
                cls: 'margen-ventana',
                layout: 'column',
                border: true,
                height: 130,
                defaults: {
                    columnWidth: 1,
                    padding: 10,
                    labelAlign: 'top'
                },
                items: [{
                        xtype: 'combo',
                        fieldLabel: 'Rol',
                        allowBlank: false,
                        editable: true,
                        itemId: 'roleSelection',
                        forceSelection: true,
                        minChars: 0,
                        typeAhead: true,
                        mode: 'local',
                        valueField: 'rolName',
                        displayField: 'rolName',
                        store: new Ext.data.Store({
                            fields: ['permisos', 'id', 'rolName'],
                            autoLoad: true,
                            data: rolesServ
                        }),
                        listeners: {
                            select: function() {
                                rolActivo = this.getValue();
                                var btn = Ext.ComponentQuery.query('#enterSelectRole')[0];
                                btn.setDisabled(false);
                            }
                        }
                    }]
            }];
    },
    buildButtons: function() {
        return [{
                text: 'Aceptar',
                scope: this,
                disabled: true,
                itemId: 'enterSelectRole',
                bodyPadding: 5,
                width: 80,
                action: 'selectRole',
                margins: '0 0 0 0',
                handler: function() {

                    var ventana = this;
                    ventana.mask("Cargando Rol", "x-mask-loading");
                    usuario.set({
                        rolActivo: rolActivo
                    });
                    if (rolActivo != null && rolActivo != "") {
                        rolesServ = Ext.ComponentQuery.query('#roleSelection')[0].getStore().getRange();
                        for (key in rolesServ) {
                            if (rolesServ[key].get('rolName') == rolActivo) {
                                permisos = rolesServ[key].get('permisos');
                            }
                        }
                        mainmenu = mainmenuadmin;
                        itemsCapabilities = new Ext.data.Store({
                            fields: ['typeComponent', {name: 'text', convert: function(v) {
                                        return v.toLowerCase();
                                    }}, 'belongsTo', 'capabilitiesScreen', 'path'],
                            autoLoad: true,
                            data: permisos
                        });
                        var view = Ext.create('AFW_FND_Xjs.view.ext.Viewport');
                        view.show();
                        view.doLayout();
                        ventana.unmask();
                        ventana.close();
                    }
                }
            }];
    }
});
