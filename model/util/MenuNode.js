Ext.define('AFW_FND_Xjs.model.util.MenuNode', {
    extend: 'Ext.data.Model',
    fields: [
		        { name: 'id', type: 'int', mapping: 'Id' },
		        { name: 'text', type: 'string', mapping: 'text' },
		        { name: 'leaf', type: 'boolean', mapping: 'leaf' },
		        { name: 'loaded', type: 'boolean', mapping: 'loaded', defaultValue: false },
		        { name: 'action'},
		        { name: 'baseParams'},
		        { name: 'buttonsCapability'},
		        { name: 'expanded', defaultValue: true }
		    ]
});