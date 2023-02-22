sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
	"../model/formatters"
], function(
	Controller, MessageToast,JSONModel,formatters
) {
	"use strict";
	
	return Controller.extend("project4.controller.Request_Home", {
		formatters: formatters,
		onInit: function(){
			this.getOwnerComponent().getRouter().getRoute("Request_Home").attachPatternMatched(this.onMyRoutePatternMatched, this);
		},
        pressOnTileOne : function(evt) {
			MessageToast.show("The generic tile one pressed.");
		},
		pressOnTileTwo : function(evt) {
			MessageToast.show("The generic tile two pressed.");
		},
        onRequest_list: function(){
            this.getOwnerComponent().getRouter().navTo("Request")
        },
		
			onMyRoutePatternMatched: async function (oEvent) {
                
                let url = "/request/Request?$filter=request_state%20eq%20%27B%27&$orderby=request_number%20desc&$top=3" 
                console.log(url);
                const RequestWait = await $.ajax({
                    type: "get",
                    url: url
                });
                //console.log(RequestWait);
                let RequestWaitModel = new JSONModel(RequestWait.value); //RequestWait.value 값을 JSONModel의 odata에 담는다.
                this.getView().setModel(RequestWaitModel, "RequestWaitModel");
              
				//console.log(RequestWaitModel)
                
            },
			onNavToDetail: function(oEvent){
				
				var sPath=oEvent.getSource().oBindingContexts.RequestWaitModel.sPath;
				console.log(oEvent.getSource())
                //var SelectedNum = oEvent.getParameters().row.mAggregations.cells[1].mProperties.text;
             	var SelectedNum = this.getView().getModel("RequestWaitModel").getProperty(sPath).request_number
				 this.getOwnerComponent().getRouter().navTo("RequestDetailexpand", {num:SelectedNum, where: "Request_Home"})
                //this.getOwnerComponent().getRouter().navTo("RequestDetail", { num: SelectedNum }); 
			},
			onRequest_chart: function(){
				this.getOwnerComponent().getRouter().navTo("Request_Chart")
			}
		
		
	});
});