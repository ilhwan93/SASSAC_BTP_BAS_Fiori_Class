sap.ui.define([], function () {
    "use strict";

    return {
        produceText: function (PproduceText){
           
            switch (PproduceText){
                case "A":
                    return "생산";
                case "B":
                    return "미사용";
                case "C":
                    return "단종예정";
                case "D":
                    return "단종";
                default :
                    return PproduceText;
             }
        }
      
    
};
});