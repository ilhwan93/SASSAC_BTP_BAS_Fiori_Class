sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project1.controller.App", {



        onSnack_List: function(){
          this.getOwnerComponent().getRouter().navTo("Snack_List");
        },        
        
        onSnack: function(){
          this.getOwnerComponent().getRouter().navTo("Snack");
        }
       
      });
    }
  );
  