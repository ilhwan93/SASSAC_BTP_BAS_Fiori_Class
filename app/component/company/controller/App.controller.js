sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project2.controller.App", {



        onRequest: function(){
          this.getOwnerComponent().getRouter().navTo("Request");
        },
        onCompany: function(){
          this.getOwnerComponent().getRouter().navTo("CompanyGrid");
        },
        onProduct: function(){
          this.getOwnerComponent().getRouter().navTo("ProductUi");
        }
       
      });
    }
  );
  