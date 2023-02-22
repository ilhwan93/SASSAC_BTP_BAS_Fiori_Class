sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project4.controller.App", {



        onRequest: function(){
          this.getOwnerComponent().getRouter().navTo("Request");
        },
        onCompany: function(){
          this.getOwnerComponent().getRouter().navTo("Company");
        },
        onProduct: function(){
          this.getOwnerComponent().getRouter().navTo("Product");
        }
       
      });
    }
  );
  