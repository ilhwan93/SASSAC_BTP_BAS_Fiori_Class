sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
], function(
	Controller, MessageToast
) {
	"use strict";
 		   
	return Controller.extend("project2.controller.Company_Home", {

        pressOnTileOne : function(evt) {
			MessageToast.show("The generic tile one pressed.");
		},
		pressOnTileTwo : function(evt) {
			MessageToast.show("The generic tile two pressed.");
		},
        onRequest_list: function(){
            this.getOwnerComponent().getRouter().navTo("CompanyGrid")
        }
	});
});