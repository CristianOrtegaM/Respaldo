Ext
		.define(
				'AFW_FND_Xjs.store.ext.com.claveSoluciones.acordFw.category.CategoryParentExt',
				{
					extend : 'Ext.data.Store',
					model : 'AFW_FND_Xjs.model.ext.com.claveSoluciones.acordFw.category.CategoryParentExt',
					autoLoad : true,
					proxy : {
						type : 'rest',
						url : urlService
								+ 'categoryNodeService/findCategoryParents',
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