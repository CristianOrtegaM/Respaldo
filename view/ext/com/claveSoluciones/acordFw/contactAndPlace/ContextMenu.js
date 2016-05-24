Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.contactAndPlace.ContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.listsContextMenu',
    xtype: 'listsContextMenu',
    items: [
        {
            text: 'Asociar País',
            itemId: 'asociar_pais',
            action: 'asociar_pais'
        },		
		{
            text: 'Asociar Región',
            itemId: 'asociar_region',
            action: 'asociar_region'
        },
        {
            text: 'Asociar Provincia',
            itemId: 'asociar_provincia',
            action: 'asociar_provincia'
        },
        {
            text: 'Asociar Ciudad',
            itemId: 'asociar_ciudad',
            action: 'asociar_ciudad'
        },
        {
            text: 'Asociar Comuna',
            itemId: 'asociar_comuna',
            action: 'asociar_comuna'
        },
        {
            text: 'Asociar Código Postal',
            itemId: 'asociar_codigopostal',
            action: 'asociar_codigopostal'
        },
        
		'-',
        {
            text: 'Desasociar',
            itemId: 'desasociar',
            action: 'desasociar'
        },
        '-'
    ],

    /**
     * Associates this menu with a specific list.
     * @param {SimpleTasks.model.List} list
     */
    setCountry: function(country) {
        this.country = country;
    },
    
    /**
     * Gets the list associated with this menu
     * @return {Task.model.List}
     */
    getCountry: function() {
        return this.country;
    }

});