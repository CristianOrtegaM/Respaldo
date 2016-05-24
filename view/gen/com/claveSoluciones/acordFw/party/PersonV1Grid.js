Ext.define('AFW_FND_Xjs.view.gen.com.claveSoluciones.acordFw.party.PersonV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.personv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.party.PersonV1',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº de Parte',
                dataIndex: 'partyIdentifierPar',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Rut',
                dataIndex: 'keyImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Tipo Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 240
            },
            {
                header: 'Género',
                dataIndex: 'genderCodePer',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'GenderCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Raza',
                dataIndex: 'ethnicityCodePer',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'EthnicityCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Tipo de Sangre',
                dataIndex: 'bloodTypeCodePer',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'BloodTypeCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Estado Civil',
                dataIndex: 'maritalStatusCodePer',
                sortable: true,
                align: 'left',
                hidden: false,
                renderer: function (val) {
                    var index = enumerationRenderStore.findExact('enumerationLiteralEnu', 'MaritalStatusCodeList::'+val);
                    return index != -1 ? enumerationRenderStore.getAt(index).get('descriptionEnu') : val;
                },
                width: 120
            },
            {
                header: 'Idioma Primario',
                dataIndex: 'primaryLanguageExternalCodePer',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 120
            },
            {
                header: 'Nombres Registrados',
                menuText: 'Nombres Registrados',
                dataIndex: 'namePer',
                xtype: 'actioncolumn',
                sortable: false,
                align: 'center',
                hidden: false,
                width: 120,
                align: 'center',
                iconCls: 'look-grid',
                tooltip: 'Ver',
                action: 'showNamePer'
            }
        ];
        this.bbar = Ext.create('Ext.PagingToolbar',{
            store: this.store,
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
            listeners:{
                beforerender: function(tb){
                    tb.add(['->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->',
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            action: 'mostrarWindows',
                            hidden: true
                        },{
                            xtype: 'button',
                            text: 'Editar',
                            action: 'edit',
                            hidden: true
                        },{
                            xtype: 'button',
                            text: 'Borrar',
                            action: 'delete',
                            hidden: true
                        }
                    ]);
                },
                buttonsAccess: function(permisos){
                    for (var i = 0; i<permisos.length; i++){
                        if(permisos[i]==='c'){
                            this.down('button[text="Nuevo"]').setVisible(true);
                        } else if(permisos[i]==='u'){
                            this.down('button[text="Editar"]').setVisible(true);
                        } else if(permisos[i]==='d'){
                            this.down('button[text="Borrar"]').setVisible(true);
                        } 
                    } 
                }
            }
        });
        this.callParent(arguments);
    }
});
