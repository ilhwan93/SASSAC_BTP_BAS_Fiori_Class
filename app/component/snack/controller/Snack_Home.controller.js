sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
	"../model/formatters"
], function(
	Controller, MessageToast,JSONModel,formatters
) {
	"use strict";
	
	return Controller.extend("project5.controller.Snack_Home", {
		formatters : formatters,
		onInit: function(){
			this.getOwnerComponent().getRouter().getRoute("Snack_Home").attachPatternMatched(this.onMyRoutePatternMatched, this);
		},
        pressOnTileOne : function(evt) {
			MessageToast.show("The generic tile one pressed.");
		},
		pressOnTileTwo : function(evt) {
			MessageToast.show("The generic tile two pressed.");
		},
        onSnack_list: function(){
            this.getOwnerComponent().getRouter().navTo("Snack_List")
        },
		
			onMyRoutePatternMatched: async function (oEvent) {
                
                let url = "/snack/Snack?$filter=snack_status%20eq%20%27B%27&$orderby=snack_code%20desc&$top=3" 
                console.log(url);
                const SnackWait = await $.ajax({
                    type: "get",
                    url: url
                });
                //console.log(SnackWait);
                let SnackWaitModel = new JSONModel(SnackWait.value); //SnackWait.value 값을 JSONModel의 odata에 담는다.
                this.getView().setModel(SnackWaitModel, "SnackWaitModel");
              
				//console.log(SnackWaitModel)
                
            },
			onNavToDetail: function(oEvent){
				
				var sPath=oEvent.getSource().oBindingContexts.SnackWaitModel.sPath;
				console.log(oEvent.getSource())
                //var SelectedNum = oEvent.getParameters().row.mAggregations.cells[1].mProperties.text;
             	var SelectedNum = this.getView().getModel("SnackWaitModel").getProperty(sPath).request_number
				 this.getOwnerComponent().getRouter().navTo("RequestDetailexpand", {num:SelectedNum, where: "Snack_Home"})
                //this.getOwnerComponent().getRouter().navTo("RequestDetail", { num: SelectedNum }); 
			},
			
			
			onSnack_chart: function(){
				this.getOwnerComponent().getRouter().navTo("Snack_chart")
			}
		
		
	});
});