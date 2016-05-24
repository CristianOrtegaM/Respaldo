Ext.define('AFW_FND_Xjs.model.util.UserInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'userName',      type: 'string'},
        {name: 'ip',      		type: 'string'},
        {name: 'token',     	type: 'string'},
        {name: 'roles',			type: 'auto'},
        {name: 'rolActivo',		type: 'string'},
        {name: 'displayName',	type: 'string'},
        {name: 'dv',			type: 'string'},
        {name: 'givenName',		type: 'string'},
        {name: 'sn',			type: 'string'},
        {name: 'mail',			type: 'string'},
        {name: 'rut',			type: 'string'}]
});