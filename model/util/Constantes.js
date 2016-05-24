Ext.define('AFW_FND_Xjs.model.util.Constantes', {
	 extend: 'Ext.data.Model',
	 statics:{
			url:'',
			usuario:'',
			mostrar:true,
			webName : '',
	        getUrl:function () {
	            return this.url;
	        },
	        setUrl:function (url) {
	            this.url = url;
	        }, 
	        getUsuario:function () {
	        	var userInfo = Ext.create('AFW_FND_Xjs.model.util.UserInfo',user);
	            return  userInfo.get('userName');
	        },
	        setUsuario:function (usuario) {
	            this.usuario = usuario;
	        },
	        getMostrar:function (valor) {
	        	for (var i=0; i<permisos.length; i++) {
	        		if (permisos[i] == valor)
	        			return  false;
	        	}  
	        	return true;
	        }, 
	        setMostrar:function (mostrar) {
	            this.mostrar = mostrar;
	        },
	        getWebName:function(){
	        	return this.webName;
	        },
	        setWebName:function(webName){
	        	this.webName = webName;
	        }
	    }  
});
