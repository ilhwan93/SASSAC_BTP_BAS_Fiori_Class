sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function(
	Controller,JSONModel
) {
	"use strict";

	return Controller.extend("project4.controller.Request_Chart", {
		
		onInit: function() {
			
				
			var oModel=new JSONModel({
				wait: 0,
				waitpercent:'',
				approve: 0,
				approvepercent:'',
				reject: 0,
				rejectpercent:'',
			});
			this.getView().setModel(oModel,"state")
			this.onDataView();
			
		
		},
		onRequesthome: function(){
			this.getOwnerComponent().getRouter().navTo("Request")

		},
		onDataView: async function(){
			var view = this.getView()
			var oMonth = new Date().getFullYear()+"-"+(new Date().getMonth()+1);
			const Request = await $.ajax({
				type: "get",
				// url: "/request/Request?$filter=contains(request_date,'"+oMonth+"')"
				url: `/request/Request?$filter=contains(request_date,'${oMonth}')`
		
			})			
			
			let RequestModel = new JSONModel(Request.value);
			console.log(RequestModel);
			
			view.setModel(RequestModel, "RequestModel");
			let data = view.getModel("RequestModel");
			let a = 0.00, b = 0.00, c=0.00;
			for (let i = 0; i<data.oData.length;i++){
				let state = '/' + i + '/request_state'
				if(data.getProperty(state) === 'A'){
					a++
				}
				if(data.getProperty(state) === 'B'){
					b++
				}
				if(data.getProperty(state) === 'C'){
					c++
				}
			}
			view.getModel("state").setProperty("/approve", (a / data.oData.length *100))
			view.getModel("state").setProperty("/wait", (b / data.oData.length *100))
			view.getModel("state").setProperty("/reject", (c / data.oData.length *100))
			view.getModel("state").setProperty("/approvepercent", (a / data.oData.length *100).toFixed(2)+ '%');
			view.getModel("state").setProperty("/waitpercent", (b / data.oData.length *100).toFixed(2) + '%');
			view.getModel("state").setProperty("/rejectpercent", (c / data.oData.length *100).toFixed(2) + '%');
			
		}

	});
});