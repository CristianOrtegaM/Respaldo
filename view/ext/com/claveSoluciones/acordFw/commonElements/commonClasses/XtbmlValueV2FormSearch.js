Ext.define('AFW_FND_Xjs.view.ext.com.claveSoluciones.acordFw.commonElements.commonClasses.XtbmlValueV2FormSearch',
  {
        extend : 'Ext.form.FormPanel',
        alias : 'widget.xtbmlvaluev2formsearch',
        renderTo : Ext.getBody(),
        layout : 'column',
        height : '100%',
        border : false,
        items : [
                        {
                                xtype : 'textfield',
                                fieldLabel : 'Dim 01',
                                name : 'dim01Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim01Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim01Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim01Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim01Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt01',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true
                            //iconCls: 'search-icon'		                        
                        },
                        {
                                xtype : 'textfield',
                                autoLoadOnValue : true,
                                fieldLabel : 'Dim 02',
                                //emptyText : 'Seleccione ...',
                                name : 'dim02Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                //queryMode : 'local',
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim02Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim02Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim02Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim02Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },
                        {
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt02',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },
                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 03',
                                name : 'dim03Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim03Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim03Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim03Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim03Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt03',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },
                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 04',
                                //emptyText : 'Seleccione ...',
                                name : 'dim04Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim04Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim04Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim04Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim04Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt04',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },
                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 05',
                                //emptyText : 'Seleccione ...',
                                name : 'dim05Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim05Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim05Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim05Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim05Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt05',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },
                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 06',
                                //emptyText : 'Seleccione ...',
                                name : 'dim06Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim06Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim06Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim06Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim06Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt06',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                           // iconCls: 'search-icon'	
                        },
                         {   
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 07',
                                //emptyText : 'Seleccione ...',
                                name : 'dim07Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim07Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim07Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim07Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim07Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt07',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },

                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 08',
                                //emptyText : 'Seleccione ...',
                                name : 'dim08Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim08Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim08Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim08Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim08Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt08',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        },

                        {
                                xtype : 'textfield',
                                //autoLoadOnValue : true,
                                fieldLabel : 'Dim 09',
                                //emptyText : 'Seleccione ...',
                                name : 'dim09Xtv',
                                columnWidth : .4,
                                padding : '0 10 10 0',
                                /**queryMode : 'local',
                                typeAhead : true,**/
                                hidden: true,
                                editable: false,
                                listeners : {
                               change: function(p) {
                                    var theElem = p.getEl();
                                    if(Ext.ComponentQuery.query('#tooltip_dim09Xtv')[0]===undefined || Ext.ComponentQuery.query('#tooltip_dim09Xtv')[0]===null){
                                    var theTip = Ext.create('Ext.tip.Tip', {
                                        html: p.getValue(),
                                        margin: '0 0 0 200',
                                        itemId: 'tooltip_dim09Xtv',
                                        shadow: false
                                    });
                                    }else{
                                     var theTip= Ext.ComponentQuery.query('#tooltip_dim09Xtv')[0];
                                     theTip.setHtml(p.getValue());                      
                                    }            
                                    p.getEl().on('mouseover', function(){
                                        theTip.showAt(theElem.getX(), theElem.getY());
                                    });

                                    p.getEl().on('mouseleave', function(){
                                        theTip.hide();
                                    });
                                }
                            }

                        },{
                            xtype: 'button',
                            text: 'Buscar',
                            itemId: 'dimbutt09',
                            action: 'buscaRango',
                            columnWidth: 0.10,
                            width: '32px !important',
                            height: '26px !important',
                            margin: '30 0 0 0',
                            hidden: true,
                            //iconCls: 'search-icon'	
                        }

                        ],
        buttons : [ {
                id : 'xtbmlvaluebuttonlimpiar',
                text : 'Limpiar',
                handler : function() {
                        this.up('form').getForm().reset();
                }
        }, {
                text : 'Buscar',
                formBind : true,
                disabled : true,
                action : 'buscar'
        } ]
});
