Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.documentAndCommunication.CommunicationFormWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.communicationformwindow',
    itemId: 'communicationformwindow_id',
    loadMask: true,
    width: '80%',
    height: '90%',
    bodyPadding: 15,
    title: 'Comunicación de Contenido Libre',
    draggable: false,
    resizable: false,
    overflowY: 'scroll',
    modal: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                itemId: 'communicationformwindow_formitem',
                border: false,
                fieldDefaults: {
                    labelAlign: 'top',
                    style: 'font-size: 14px'
                },
                items: [{
                        xtype: 'fieldset',
                        collapsible: true,
                        collapsed: false,
                        title: 'Estado de la Comunicación',
                        layout: 'column',
                        defaults: {
                            columnWidth: .25
                        },
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Estado',
                                name: 'status',
                                readOnly: true,
                                padding: '0 10 10 0'
                            }, {
                                border: false,
                                columnWidth: .75,
                                padding: '25 0 0 0',
                                items: [{
                                        xtype: 'toolbar',
                                        itemId: 'toolbar_status_communication',
                                        listeners: {
                                            beforerender: function() {
                                                var rec = this.up('window').down('form').getForm().getRecord();
                                                if (rec == null || rec.data.statusCom == null) {
                                                    this.down('button[action=completeCommunication]').setDisabled(true);
                                                    this.down('button[action=editCommunication]').setDisabled(true);
                                                    this.down('button[action=sendCommunication]').setDisabled(true);
                                                } else if (rec.data.statusCom.codeCms == 'Draft') {
                                                    this.down('button[action=completeCommunication]').setDisabled(false);
                                                    this.down('button[action=editCommunication]').setDisabled(true);
                                                    this.down('button[action=sendCommunication]').setDisabled(true);
                                                } else if (rec.data.statusCom.codeCms == 'Ready') {
                                                    this.down('button[action=completeCommunication]').setDisabled(true);
                                                    this.down('button[action=editCommunication]').setDisabled(false);
                                                    this.down('button[action=sendCommunication]').setDisabled(false);
                                                } else if (rec.data.statusCom.codeCms == 'Sent') {
                                                    this.down('button[action=completeCommunication]').setDisabled(false);
                                                    this.down('button[action=editCommunication]').setDisabled(true);
                                                    this.down('button[action=sendCommunication]').setDisabled(true);
                                                }
                                            }
                                        },
                                        border: false,
                                        bodyStyle: {
                                            background: 'transparent'
                                        },
                                        style: {
                                            background: 'transparent'
                                        },
                                        items: [{
                                                xtype: 'segmentedbutton',
                                                items: [{
                                                        text: 'Completar',
                                                        action: 'completeCommunication'
                                                    }, {
                                                        text: 'Modificar',
                                                        action: 'editCommunication'
                                                    }, {
                                                        text: 'Enviar',
                                                        action: 'sendCommunication'
                                                    }]
                                            }]

                                    }]
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Datos de la Comunicación',
                        collapsible: true,
                        collapsed: false,
                        layout: 'column',
                        defaults: {
                            columnWidth: 1,
                            padding: '10 0 0 0'
                        },
                        items: [{
                                xtype: 'combo',
                                fieldLabel: 'Prioridad',
                                columnWidth: .25,
                                padding: '0 10 10 0',
                                name: 'priorityCodeCom',
                                allowBlank: false,
                                afterLabelTextTpl: [
                                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                ],
                                hidden: false,
                                enforceMaxLength: true,
                                queryMode: 'local',
                                valueField: 'enumerationLiteralEnu',
                                displayField: 'descriptionEnu',
                                forceSelection: true,
                                queryMode: 'local',
                                        editable: false,
                                minChars: 0,
                                listeners: {
                                    focus: function(combo) {
                                        combo.getStore().load({
                                            callback: function() {
                                                combo.expand();
                                            }
                                        });
                                    }
                                },
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.EnumerationV1',
                                    remoteSort: true,
                                    autoLoad: true,
                                    pageSize: 9999,
                                    proxy: {
                                        type: 'rest',
                                        url: urlService + 'enumerationService/findByEnumerationType',
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        extraParams: {
                                            enumName: 'PriorityCodeList'
                                        },
                                        reader: {
                                            rootProperty: 'datos',
                                            sFuccessProperty: 'valido',
                                            totalProperty: 'totalRegistros'
                                        }
                                    }
                                })
                            },
                            {
                                xtype: 'label',
                                padding: 0,
                                html: 'Destinatarios:<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                            }, {
                                xtype: 'grid',
                                itemId: 'contactpointcommunicationgrid',
                                store: new Ext.data.Store({
                                    model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.party.PartyV1',
                                    autoLoad: true,
                                    pageSize: 15,
                                    proxy: {
                                        type: 'memory',
                                        data: [],
                                        enablePaging: true
                                    }
                                }),
                                //directedContactPointCom
                                columns: [{
                                        text: 'Rut',
                                        dataIndex: 'keyImo',
                                        width: 120,
                                    }, {
                                        text: 'Nombre',
                                        width: 240,
                                        renderer: function(value, metadata, record) {
                                            try {
                                                var val = record.data;
                                                if (val.nameOrg !== null && val.nameOrg !== undefined && val.nameOrg.length > 0) {
                                                    for (var i = 0; i < val.nameOrg.length; i++) {
                                                        if (val.nameOrg[i].usageCodeOrn == "LegalName") {
                                                            return val.nameOrg[i].fullNamePan;
                                                        }
                                                    }

                                                } else if (val.namePer !== null && val.namePer !== undefined && val.namePer.length > 0)
                                                    return val.namePer[0].givenNamePen + ' ' + val.namePer[0].surnamePen.split('::')[0];
                                            } catch (err) {
                                                console.log(err);
                                            }
                                            return '';
                                        }
                                    }, {
                                        text: 'Rol',
                                        dataIndex: 'rol',
                                        width: 120
                                    }, {
                                        text: 'Tipo de Punto de Contacto',
                                        width: 180,
                                        dataIndex: 'preferredContactPar2',
                                        renderer: function(val) {
                                            try {
                                                if (val !== null && val !== undefined && val.length > 0) {
                                                    if (val[val.length-1].preferredContactPointCop.typeNameImo === 'PostalMailContact') {
                                                        return 'Dirección Postal';
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'WebPageContact') {
                                                        return 'Página Web';
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'InPersonContact') {
                                                        return 'Dirección Visita';
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'TelephoneCallContact') {
                                                        if (val[val.length-1].preferredContactPointCop.networkTypeCodeTcc === 'Land_Line') {
                                                            return 'Teléfono Fijo';
                                                        } else if (val[val.length-1].preferredContactPointCop.networkTypeCodeTcc === 'Cell') {
                                                            return 'Teléfono Móvil';
                                                        }
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'EmailContact') {
                                                        return 'Correo Electrónico';
                                                    }

                                                }
                                            } catch (err) {
                                                console.log(err);
                                            }
                                            return '';
                                        }
                                    }, {
                                        text: 'Punto de Contacto',
                                        width: 240,
                                        dataIndex: 'preferredContactPar2',
                                        renderer: function(val) {
                                            try {
                                                if (val !== null && val !== undefined && val.length > 0) {
                                                    if (val[val.length-1].preferredContactPointCop.typeNameImo === 'PostalMailContact') {
                                                        var resAdress = val[val.length-1].preferredContactPointCop.deliveryAddressPmc.unstructuredAddressPla.split("::");
                                                        return resAdress[0] + ' ' + resAdress[1];
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'WebPageContact') {
                                                        return val[val.length-1].preferredContactPointCop.uniformResourceLocationWpc.identifierNea;
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'InPersonContact') {
                                                        var resAdress = val[val.length-1].preferredContactPointCop.meetingAddressIpc.unstructuredAddressPla.split("::");
                                                        return resAdress[0] + ' ' + resAdress[1];
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'TelephoneCallContact') {
                                                        if (val[val.length-1].preferredContactPointCop.networkTypeCodeTcc === 'Land_Line') {
                                                            var area = val[val.length-1].preferredContactPointCop.telephoneNumberTcc.areaExternalCodeTnu;
                                                            return area + '-' + val[val.length-1].preferredContactPointCop.telephoneNumberTcc.fullNumberTnu;
                                                        } else if (val[val.length-1].preferredContactPointCop.networkTypeCodeTcc === 'Cell') {
                                                            return '09-' + val[val.length-1].preferredContactPointCop.telephoneNumberTcc.fullNumberTnu;
                                                        }
                                                    } else if (val[val.length-1].preferredContactPointCop.typeNameImo === 'EmailContact') {
                                                        return val[val.length-1].preferredContactPointCop.uniformResourceLocationMec.identifierNea;
                                                    }

                                                }
                                            } catch (err) {
                                                console.log(err);
                                            }
                                            return '';
                                        }
                                    }],
                                selType: 'checkboxmodel',
                                selModel: {
                                    checkOnly: false,
                                    injectCheckbox: 0,
                                    mode: 'SIMPLE',
                                    allowDeselect: true,
                                    showHeaderCheckbox: false
                                },
                                bbar: Ext.create('Ext.PagingToolbar', {
//				            store: this.store,
                                    displayInfo: true,
                                    cls: 'x-pagingtoolbar-bottom',
                                    plugins: new Ext.ux.ProgressBarPager({
                                        width: 300
                                    }),
                                    pageSize: 15,
                                    refreshText: 'Actualizar',
                                    beforePageText: 'Página',
                                    afterPageText: 'de {0}',
                                    displayMsg: 'Mostrando resultados {0} - {1} de {2}',
                                    listeners: {
                                        afterrender: function(tb) {
                                            tb.bindStore(Ext.ComponentQuery.query('#contactpointcommunicationgrid')[0].getStore());
                                        },
                                        beforerender: function(tb) {
                                            tb.add(['->', '->', '->', '->', '->', '->', '->', '->', '->', '->',
                                                {
                                                    xtype: 'button',
                                                    text: 'Editar',
                                                    action: 'editContact'
                                                }]);
                                        }
                                    }
                                })
                            }, {
                                border: false,
                                layout: 'column',
                                items: [{
                                        xtype: 'textfield',
                                        columnWidth: .75,
                                        fieldLabel: 'Asunto',
                                        name: 'nameCoc',
                                        allowBlank: false,
                                        afterLabelTextTpl: [
                                            '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                        ],
                                        hidden: false,
                                        regex: nameReg1,
                                        regexText: 'Campo inválido',
                                        maxLength: 255,
                                        enforceMaxLength: true
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Plantilla',
                                        columnWidth: .25,
                                        padding: '0 10 10 0',
                                        hidden: false,
                                        queryMode: 'local',
                                        valueField: 'specificationIdentifierSpe',
                                        displayField: 'titleCcs',
                                        forceSelection: true,
                                        queryMode: 'local',
                                                minChars: 0,
                                        listeners: {
                                            focus: function(combo) {
                                                combo.getStore().load({
                                                    callback: function() {
                                                        combo.expand();
                                                    }
                                                });
                                            }
                                        },
                                        store: new Ext.data.Store({
                                            model: 'AFW_FND_Xjs.model.gen.com.claveSoluciones.acordFw.documentAndCommunication.communicationContentSpecificationSubtypes.CommunicationContentTemplateV1',
                                            remoteSort: true,
                                            autoLoad: true,
                                            pageSize: 50,
                                            sorters: [{
                                                    property: 'specificationIdentifierSpe',
                                                    direction: 'DESC'
                                                }],
                                            proxy: {
                                                type: 'rest',
                                                url: urlService + 'communicationContentTemplateService/findByFilter',
                                                actionMethods: {
                                                    read: 'POST'
                                                },
                                                extraParams: {
                                                    filters: Ext.encode([Ext.create('AFW_FND_Xjs.model.util.Filtro', {
                                                            nombreCampo: 'class',
                                                            valor: 'CommunicationContentTemplate',
                                                            valores: null,
                                                            operacion: '=',
                                                            tipoValor: 'string'
                                                        }).data])
                                                },
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: 'datos',
                                                    successProperty: 'valido',
                                                    totalProperty: 'totalRegistros'
                                                }
                                            }
                                        }),
                                        listeners: {
                                            change: function(cb, nv, ov) {
                                                if (nv != ov) {
                                                    var index = cb.getStore().findExact('specificationIdentifierSpe', nv);
                                                    var rec = index != -1 ? cb.getStore().getAt(index) : null;
                                                    if (rec != null) {
                                                        cb.up('window').down('textarea[name="descriptionCom"]').setValue(rec.get('descriptionSpe'));

                                                        /**
                                                         * En caso de Plantilla:
                                                         * var tpl = new Ext.Template(
                                                         *      'Hola {0}' // Mensaje rec.get('descriptionSpe')
                                                         *   );
                                                         *   
                                                         *   Luego,
                                                         *   var mensaje = tpl.apply([valores predeterminados]); 
                                                         *   cb.up('window').down('textarea[name="descriptionCom"]').setValue(mensaje);
                                                         */
                                                    }
                                                }
                                            }
                                        }
                                    }]
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Contenido',
                                padding: '10 0 10 0',
                                name: 'descriptionCom',
                                allowBlank: false,
                                afterLabelTextTpl: [
                                    '<span style="color:red;font-weight:bold" data-qtip="Campo requerido">*</span>'
                                ],
                                hidden: false,
                                maxLength: 255,
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'referencedSubjectTypeNameCoc',
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'referencedSubjectIdentifierCoc',
                            },
                        ]
                    }]
            }
        ];
        this.buttons = [{
                text: 'Imprimir',
                id: 'imprimir_communication',
                action: 'printCommunication'
//        			handler: function(){
//        				
//        			
//				        var pnl=this.up('window').down('form');
//				        // instantiate hidden iframe
//				 
//				        var iFrameId = "printerFrame";
//				        var printFrame = Ext.get(iFrameId);
//				 
//				        if (printFrame == null) {
//				            printFrame = Ext.getBody().appendChild({
//				                id: iFrameId,
//				                tag: 'iframe',
//				                cls: 'x-hidden',
//				                style: {
//				                    display: "none"
//				                }
//				            });
//				        }
//				 
//				        var cw = printFrame.dom.contentWindow;
//				 
//				        // instantiate application stylesheets in the hidden iframe
//				 
//				        var stylesheets = "";
//				        for (var i = 0; i < document.styleSheets.length; i++) {
//				            stylesheets += Ext.String.format('<link rel="stylesheet" type="text/css" href="extjs/build/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css">', document.styleSheets[i].href);
//				        }
//				 
//				        // various style overrides
//				        stylesheets += ''.concat(
//				          "<style>", 
//				            ".x-panel-body {overflow: visible !important;}",
//				            // experimental - page break after embedded panels
//				            // .x-panel {page-break-after: always; margin-top: 10px}",
//				          "</style>"
//				         );
//				 
//				        // get the contents of the panel and remove hardcoded overflow properties
//				        var markup = pnl.getEl().dom.innerHTML;
//				        while (markup.indexOf('overflow: auto;') >= 0) {
//				            markup = markup.replace('overflow: auto;', '');
//				        }
//				 
//				        var str = Ext.String.format('<html><head>{0}</head><body>{1}</body></html>',stylesheets,markup);
//				 
//				        // output to the iframe
//				        cw.document.open();
//				        cw.document.write(str);
//				        cw.document.close();
//				 
//				        // remove style attrib that has hardcoded height property
//				        cw.document.getElementsByTagName('DIV')[0].removeAttribute('style');
//				 
//				        // print the iframe
//				        cw.print();
//				 
//				        // destroy the iframe
//				        Ext.fly(iFrameId).destroy();
// 
// 
//		        	}
            }, {
                text: 'Guardar',
                action: 'guardarCommunication'
            }, {
                text: 'Cancelar',
                handler: function() {
                    this.up('window').close();
                }
            }];
        this.callParent(arguments);
    }
});
