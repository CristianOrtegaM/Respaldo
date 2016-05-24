Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.productSpecification.ProductCompositionV2Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.productcompositionv2grid',
    loadMask: true,
    autoScroll: true,
    cls: 'fondo-paginador',
    initComponent: function() {
        this.columns = [
            {
                header: 'Nº',
                dataIndex: 'productAssociationIdentifierPra',
                sortable: true,
                align: 'right',
                hidden: false,
                width: 60,
                renderer: function(val,meta,record){
                	return record.data.associatedProductSpecificationBasePra.specificationIdentifierSpe;
                }
            },
            {
                header: 'Tipo',
                dataIndex: 'associatedProductSpecificationBasePra',
                sortable: true,
                align: 'left',
                width: 150,
                hidden: false,
                renderer: function(val,meta,rec){
                	var index = '';
    				var tipo='';
    				if(val.typeNameImo==='ProductSpecification' || val.typeNameImo==='PartyRoleInAgreementSpecification' || val.typeNameImo==='PartyRoleInRelationshipSpecification'
        				|| val.typeNameImo==='ProductAttributeSpecification'){
    					index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.'+val.typeNameImo);
    				} else {
    					index = typeNameImoStoreComponent.findExact('enumerationLiteralEnu', 'AFW_FND_Xjs.controller.com.claveSoluciones.acordFw.productSpecification.productComponentSpecificationSubtypes.'+val.typeNameImo);
    				}
    				if(index!=-1) {
        				tipo = typeNameImoStoreComponent.getAt(index).get('descriptionEnu');
	    				return tipo;
    				}else{
    					tipo=val.typeNameImo;
    					return tipo;
    				}
                }
                
            },
            {
                header: 'Nombre',
                dataIndex: 'typeNameImo',
                sortable: true,
                align: 'left',
                hidden: false,
                flex: 1,
                renderer: function(val,meta,record){
                	return record.data.associatedProductSpecificationBasePra.nameSpe;
                }
            },
            //{
            //    width: 65,
            //    sortable: false,
            //  align: 'right',
            //   header: 'Mín.',
            //    dataIndex: 'minimumComponentCountPrc'
            // },
            //{
            //    width: 65,
            //    sortable: false,
            //    align: 'right',
            //    header: 'Máx.',
            //    dataIndex: 'maximumComponentCountPrc'
            //},
            {
                width: 80,
                sortable: true,
                align: 'right',
                header: 'Cálculo',
                dataIndex: 'calculationOrderPrc'
            },
            {
                width: 100,
                sortable: true,
                align: 'right',
                header: 'Despliegue',
                dataIndex: 'displayOrderPrc'
            }
        ];
        this.callParent(arguments);
    }
});
