sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatters",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
	"sap/ui/model/json/JSONModel",
],

	function (Controller,
		formatters,
		Filter,
		FilterOperator,
		Fragment,
		Sorter,
		JSONModel) {
		"use strict";
		let table;
		var SelectedNum;
		return Controller.extend("project5.controller.Snack_Detail", {
			formatters: formatters,

			onInit: function () {
				this.getOwnerComponent().getRouter().getRoute("Snack_Detail").attachPatternMatched(this.onMyRoutePatternMatched, this);

				var odata = {
					layout: false,
					layout2: "hello"
				};
				let layoutModel = new JSONModel(odata);
				this.getView().setModel(layoutModel, "layout");
			},
			onfull: function () {
				this.getOwnerComponent().getRouter().navTo("SnackDetailexpand", { num: SelectedNum, table: table })
			},
			onexitfull: function () {
				this.getOwnerComponent().getRouter().navTo("SnackDetail", { num: SelectedNum, table: table })
			},


			onMyRoutePatternMatched: async function (oEvent) {
				SelectedNum = oEvent.getParameter("arguments").num
				table = oEvent.getParameter("arguments").table
				let url = "/snack/Snack/" + SelectedNum

				const Snack = await $.ajax({
					type: "get",
					url: url
				});

				let SnackModel = new JSONModel(Snack);
				this.getView().setModel(SnackModel, "SnackModel");
				// console.log(this.getView().getModel("SnackModel"));



				var visible = {
					footer: false
				}
				let visibleMode = new JSONModel(visible);

				if (SnackModel.oData.snack_status == 'A') {
					visibleMode.oData.footer = true;
				}

				this.getView().setModel(visibleMode, "visibleMode");
				console.log(visibleMode); //oData에 footer : true로 되어있음

				var visible2 = {
					edit: false
				}
				let editModel = new JSONModel(visible2);
				this.getView().setModel(editModel, "editModel");
				this.getView().getModel("layout").setProperty("/layout", false);

			},




			onNavToDetail: function () {




				this.getOwnerComponent().getRouter().navTo("Snack_List");

			},










		});
	});