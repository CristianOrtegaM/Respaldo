Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV1Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.ruleapplicabilityv1grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.productSpecification.productRuleSpecificationSubtypes.RuleApplicabilityV2',
    viewConfig: {
        listeners: {
            resize: function (view){
                view.updateLayout();
            },
            afterrender: function(p){
                if(this.up('window').getXType() == 'ruleapplicabilityv1principalform'){
                    var column = Ext.create('Ext.grid.column.Action',{
                        width: 30,
                        sortable: false,
                        align: 'center',
                        iconCls: 'add-grid',
                        tooltip: 'Agregar',
                        handler: function(grid, rowIndex,colIndex, item, e, rec){
                        	rec.set('applicabilityTypeCodeRua', 'Included');
                            var screen = Ext.ComponentQuery.query('#ruleApplicabilityPrsAerGrid');
                            var store = screen[screen.length-1].getStore();
                            if(store.findExact('componentPathCodeRua', rec.get('componentPathCodeRua'))==-1)
                            	store.loadRawData(rec.data,true);
                            Ext.toast({html: 'Se agregó el registro seleccionado.', title: 'Registro Agregado', closable: false, align: 't', slideInDuration: 400,  minWidth: 400});
                        }
                    });
                    this.headerCt.insert(0,column);
                    this.headerCt.remove(p.down('column[dataIndex="applicabilityTypeCodeRuaBool"]'));
                    this.getView().refresh();
                }
            }
        }
    },
    initComponent: function() {
        this.columns = [
                {
                    text: 'Aplica',
                    xtype: 'checkcolumn',
                    dataIndex: 'applicabilityTypeCodeRuaBool',
                    sortable: false,
                    hidden: false,
                    width: 60,
                	listeners: {
                    	checkchange: function(cc, ri, checked){
                            if(checked){
                                    cc.up('grid').getStore().getAt(ri).set('applicabilityTypeCodeRua', 'Included');
                            } else {
                                    cc.up('grid').getStore().getAt(ri).set('applicabilityTypeCodeRua', 'Excluded');
                            } 
                            cc.up('window').down('button[action=create]').fireEvent('click', cc.up('window').down('button[action=create]'), false);
                    	}
                    }
            },
            {
                header: 'Ruta',
                dataIndex: 'componentPathCodeRua',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 1300
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
                        },
                        {
                        	xtype : 'button',
                            text : 'Cerrar',
                            handler : function(){
                            	this.up('window').close();
                            }}
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
