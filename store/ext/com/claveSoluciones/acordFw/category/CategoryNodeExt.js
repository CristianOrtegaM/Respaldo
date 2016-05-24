Ext
		.define(
				'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryNodeExt',
				{
					extend : 'Ext.data.Store',
					model : 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryNodeExt',
					autoLoad : true,
					proxy : {
						type : 'rest',
						url : urlService
								+ 'categoryNodeService/findCategoryNodes',
						actionMethods : {
							read : 'GET'
						},
						reader : {
							type : 'json',
							rootProperty : 'datos',
							successProperty : 'valido',
							totalProperty : 'totalRegistros'
						}
					}
				});