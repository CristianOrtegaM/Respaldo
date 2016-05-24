Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.category.ContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.listsContextMenu',
    xtype: 'listsContextMenu',
    items: [
        {
            text: 'Agregar Categoría',
            itemId: 'agrega_categoria',
            action: 'agrega_categoria'
        },		
		{
            text: 'Agregar Esquema',
            itemId: 'agrega_esquema',
            action: 'agrega_esquema'
        },
        
		'-',
        {
            text: 'Eliminar',
            itemId: 'eliminar',
            action: 'eliminar'
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