Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.HeterogeneousTreeOutputVariables', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.heterogeneoustreeoutputvariables',
    xtype: 'heterogeneoustreeoutputvariables',
    rootVisible: false,
    animate: false,
    frame: true,
    containerScroll: true,
    autoSize: true,
    width: '100%',
    height: 350,
    reserveScrollbar: true,
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: true,
        pruneRemoved: false,
        mode: 'SIMPLE',
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
            var html = '';
            if (record.data.type==='category') {
                html = '<div class="' + Ext.baseCSSPrefix + 'grid-row-checker"> </div>';
            } else {
                html = '';
            }

            return html;
        },
        listeners: {
            
            beforeselect : function(grid, record, index, eOpts) {
            	grid.view.up('window').fireEvent('selectChildren',grid, record,false);
                grid.view.up('window').fireEvent('selectChildren',grid, record,true);
            },
            beforedeselect : function(grid, record, index, eOpts) {
                grid.view.up('window').fireEvent('selectChildren',grid, record,false);
            }
            
        }
    },
    columns: [{
        xtype: 'treecolumn',
        text: 'Nombre',
        dataIndex: 'name',
        flex: 1,
        sortable: true
        
    }, {
        text: 'Tipo',
        dataIndex: 'tipo'
    } 
    ]

    
});
