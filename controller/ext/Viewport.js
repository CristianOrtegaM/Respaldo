//erick
Ext.define('AFW_FND_Xjs.controller.ext.Viewport', {
    extend: 'Ext.app.Controller',
    models: ['AFW_FND_Xjs.model.util.Constantes',
        'AFW_FND_Xjs.model.util.MenuNode'],
    init: function() {
        this.control({
            '#west-panel button': {
                click: this.selectScreen
            },
            '#west-panel treepanel': {
                itemclick: this.selectNode
            },
            'loginscreen button[action=login]': {
                click: this.loginFromScreen
            }
        });
    },
    selectScreen: function(btn) {
        usuario = Ext.create('AFW_FND_Xjs.model.util.UserInfo', user);
        AFW_FND_Xjs.getApplication().loadController(btn.action);
        var permisos = [];
        var panel = Ext.ComponentQuery.query('#panelprincipal')[0];
        panel.removeAll();
        if (btn.buttonsCapability != null && btn.buttonsCapability !== undefined) {
            permisos = btn.buttonsCapability.split("");
        }
        var principalpanel = Ext.widget(btn.baseParams + 'principalform');
        var toolbar = principalpanel.down('grid').down('toolbar');
//		for (var i = 0; i<permisos.length; i++){
//			if(permisos[i]==='c'){
//				toolbar.down('button[text="Nuevo"]').setVisible(true);
//			} else if(permisos[i]==='u'){
//				toolbar.down('button[text="Editar"]').setVisible(true);
//			} else if(permisos[i]==='d'){
//				toolbar.down('button[text="Borrar"]').setVisible(true);
//			} 
//		}
        panel.add(principalpanel);
        var store = principalpanel.down('grid').getStore();
        store.pageSize = 10;
        store.currentPage = 1;
        store.load();
        var oldBtn = Ext.ComponentQuery.query('button[iconCls="x-btn-current-menu"]');
        if (oldBtn.length > 0) {
            oldBtn[0].setIconCls('');
        }
        btn.setIconCls('x-btn-current-menu');

    },
    selectNode: function(s, btn) {
        usuario = Ext.create('AFW_FND_Xjs.model.util.UserInfo', user);
        if (btn.isLeaf()) {
            AFW_FND_Xjs.getApplication().loadController(btn.get('action'));
            var permisos = [];
            var panel = Ext.ComponentQuery.query('#panelprincipal')[0];
            panel.removeAll();
            if (btn.get('buttonsCapability') != null && btn.get('buttonsCapability') !== undefined) {
                permisos = btn.get('buttonsCapability').split("");
            }
            if (btn.get('baseParams') == 'enumerationv1' || btn.get('baseParams') == 'generalparameterv1' || btn.get('baseParams') == 'externalcodev1') {
                var principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var searchButton = principalpanel.down(btn.get('baseParams') + 'formsearch_ext').down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);
            } else if (btn.get('baseParams') === 'registryv1') {
                var principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var searchButton = principalpanel.down(btn.get('baseParams') + 'formsearch_ext').down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);
            } else if (btn.get('baseParams') === 'attributedatavaluev1') {
                var principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var store = Ext.StoreMgr.lookup('AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.AttributeDataValueV1');
                delete store.getProxy().extraParams['filters'];
                var searchButton = principalpanel.down(btn.get('baseParams') + 'formsearch').down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);
            } else if (btn.get('baseParams') === 'accountingcategoryv1') {
                AFW_FND_Xjs.getApplication().loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.category.CategorySchemeV1');
                principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
                panel.add(principalpanel);
                var toolbar;
                var store;
                if (principalpanel.down('grid') !== undefined && principalpanel.down('grid') !== null) {
                    toolbar = principalpanel.down('grid').down('toolbar');
                    toolbar.fireEvent('buttonsAccess', permisos);
                    store = principalpanel.down('grid').getStore();
                    store.pageSize = 15;
                    store.currentPage = 1;
                    store.load();
                }
                if (principalpanel.down('button[text="Buscar"]') != null && principalpanel.down('button[text="Buscar"]') != undefined)
                    principalpanel.down('button[text="Buscar"]').fireEvent('click', principalpanel.down('button[text="Buscar"]'));

            } else if (btn.get('baseParams') == 'periodv1') {
                var principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var searchButton = principalpanel.down(btn.get('baseParams') + 'formsearch_ext').down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);

            } else if (btn.get('baseParams') === 'hierarchyv1') {
                var principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var searchButton = principalpanel.down(btn.get('baseParams') + 'formsearch_ext').down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);
            } else if(btn.get('baseParams') === 'placeproximityv1'){
                principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
                    panel.add(principalpanel);
                    principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
            }else if(btn.get('baseParams') === 'placeproximityv2'){
                 principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.GeographicRegionV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountrySubdivisionV2');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.CountryV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV1');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.MunicipalityV2');
                    this.application.loadController('AFW_FND_Xjs.controller.ext.com.claveSoluciones.acordFw.contactAndPlace.placeSubtypes.PostCodeV1');
                    panel.add(principalpanel);
                    principalpanel.down('treepanel').fireEvent('loadTree', principalpanel.down('treepanel'));
            }else {
                var principalpanel = null;
                try {
                    principalpanel = Ext.widget(btn.get('baseParams') + 'principalform_ext');
                } catch (err) {
                    principalpanel = Ext.widget(btn.get('baseParams') + 'principalform');
                }
                var toolbar = principalpanel.down('grid').down('toolbar');
                panel.add(principalpanel);
                toolbar.fireEvent('buttonsAccess', permisos);
                var searchButton = principalpanel.down('button[action=buscar]');
                searchButton.fireEvent('click', searchButton);
                
               
            }
//			var store = principalpanel.down('grid').getStore();
//			store.pageSize=15;
//	        store.currentPage=1;
//			store.load();

        }
    },
    loginFromScreen: function(btn) {
        var form = btn.up('window').down('form').getForm(),
                userName = form.findField('usuario').getValue(),
                password = form.findField('password').getValue();
        btn.up('window').mask("Validando", "x-mask-loading");
        btn.setDisabled(true);
        if (form.isValid()) {

            Ext.Ajax.request({
                url: urlService + 'loginService/login',
                params: {
                    userName: userName,
                    password: password,
                    module: 'AGC'
                },
                scope: this,
                success: function(response) {
                    btn.setDisabled(false);
                    var respuesta = Ext.decode(response.responseText);
                    if (respuesta.valido) {
                        Ext.Ajax.request({
                            url: urlService + 'loginService/loadCapabilities',
                            params: {
                                userName: userName,
                                password: password,
                                module: 'AGC'
                            },
                            scope: this,
                            success: function(response) {
                                btn.setDisabled(false);
                                var respuesta = Ext.decode(response.responseText);
                                if (respuesta.valido) {
                                    user = respuesta.accessInfo.userInfo;
                                    usuario = Ext.create('AFW_FND_Xjs.model.util.UserInfo', user);

                                    rolesServ = usuario.get('roles') != undefined ? usuario.get('roles') : null;
                                    /*
                                     if (rolesServ != null && rolesServ.length == 0) {
                                     crearVentana(5, "Usuario no posee permisos.");
                                     }
                                     */
                                    rolActivo = usuario.get('rolActivo');
                                    if (rolActivo != null && rolActivo != "") {
                                        for (key in rolesServ) {
                                            if (rolesServ[key].rolName == rolActivo) {
                                                permisos = rolesServ[key].permisos;
                                            }
                                        }
                                        mainmenu = mainmenuadmin;
                                        itemsCapabilities = new Ext.data.Store({
                                            fields: ['typeComponent', {name: 'text', convert: function(v) {
                                                        return v.toLowerCase();
                                                    }}, 'belongsTo', 'capabilitiesScreen', 'path', 'state'],
                                            autoLoad: true,
                                            data: permisos
                                        });
                                        view = Ext.create('AFW_FND_Xjs.view.ext.Viewport');
                                        view.show();
                                        view.doLayout();
                                        btn.up('window').unmask();
                                        btn.up('window').close();
                                    } else if (rolesServ != null && rolesServ.length > 1) {
                                        view = Ext.create('AFW_FND_Xjs.view.ext.SelectRoles');
                                        view.show();
                                        btn.up('window').unmask();
                                        btn.up('window').close();
                                        //}else{
                                        //  crearVentana(5, "Usuario no posee permisos.");
                                    }
                                } else {
                                    btn.up('window').unmask();
                                    crearVentana(5, respuesta.mensaje);
                                    btn.setDisabled(false);
                                }
                            },
                            failure: function(response) {
                                btn.up('window').unmask();
                                crearVentana(5, "Problemas desde el servidor");
                                btn.setDisabled(false);
                            }
                        });


                    } else {
                        btn.up('window').unmask();
                        crearVentana(5, respuesta.mensaje);
                        btn.setDisabled(false);
                    }
                },
                failure: function(response) {
                    btn.up('window').unmask();
                    crearVentana(5, "Problemas desde el servidor");
                    btn.setDisabled(false);
                }
            });
        } else {
            btn.up('window').unmask();
            var invalidFields = btn.up('window').down('form').query("field{isValid()==false}");
            var msg = "Formulario no válido. Complete los campos requeridos:<br />";
            for (var i = 0; i < invalidFields.length; i++) {
                msg += '<b>- ' + invalidFields[i].fieldLabel + '.</b>';
                for (var j = 0; j < invalidFields[i].getErrors().length; j++) {
                    msg += invalidFields[i].getErrors()[j] + '. ';
                }
                msg += '<br />';
            }
            crearVentana(5, msg);
            btn.setDisabled(false);
        }
    }

});
