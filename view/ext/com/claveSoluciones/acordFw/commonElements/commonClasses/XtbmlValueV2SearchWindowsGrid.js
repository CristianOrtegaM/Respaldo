Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2SearchWindowsGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.xtbmlvaluev2searchwindowsgrid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    store:'AFW_FND_Xjs.store.gen.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlRangeV1',
    selectedRecords: {},
    initComponent: function() {
        this.columns = [
		    {
                header: 'Secuencia',
                dataIndex: 'rangeSequenceXtr',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 120
            },
            {
                header: 'Código',
                dataIndex: 'varcharValueXtr',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 340
            },
            {
                header: 'Nombre',
                dataIndex: 'rangeNameXtr',
                sortable: true,
                align: 'left',
                hidden: false,
                width: 340
            }
        ];
        this.bbar = Ext.create('Ext.PagingToolbar',{
            store: this.store,
        	displayInfo: true,
            cls: 'x-pagingtoolbar-bottom',
            plugins: new Ext.ux.ProgressBarPager({
                width: 250
            }),
            pageSize: 10,
            refreshText: 'Actualizar',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando resultados {0} - {1} de {2}',
            listeners:{
                beforerender: function(tb){
                    tb.add(['->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->', '->']);
                },
                
            }
        });
        this.selectedRecords={};
        this.callParent(arguments);
        this.getView().on('refresh', this.refreshSelection, this);
    },
    listeners: {
            deselect: function(cmp,record){
            	if(this.selectedRecords[record.data.rangeIdentifierXtr]!==undefined){
            	delete this.selectedRecords[record.data.rangeIdentifierXtr]
            	}
            },
            select: function(cmp,record){
            	if(this.selectedRecords[record.data.rangeIdentifierXtr]===undefined){
            	this.selectedRecords[record.data.rangeIdentifierXtr]=record;
            	}
            }
    },
    refreshSelection: function () {
       if (0 >= Object.keys(this.selectedRecords).length) {
            return;
        }

        var newRecordsToSelect = [];
         for (key in this.selectedRecords) {
            var record = this.getStore().findRecord('rangeIdentifierXtr',this.selectedRecords[key].data.rangeIdentifierXtr);
            if (!Ext.isEmpty(record)) {
                newRecordsToSelect.push(record);
            }
        }

        this.getSelectionModel().select(newRecordsToSelect);
    }
});