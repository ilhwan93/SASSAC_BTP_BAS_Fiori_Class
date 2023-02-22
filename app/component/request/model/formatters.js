sap.ui.define([], function () {
        "use strict";

        return {
            statusText: function (sStatus){
                switch (sStatus){
                    case "A":
                        return "많음"
                    case "B":
                        return "적음";
                    
                    default:
                        return sStatus;
                 }
            }
          
        
    };
});
//하나의 모듈처럼 사용가능함-> controller에서 사용