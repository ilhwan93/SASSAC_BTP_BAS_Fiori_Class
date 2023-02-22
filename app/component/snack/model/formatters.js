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
            },
            statusText2: function (sStatus){
                switch (sStatus){
                    case "A":
                        return "기타";
                    case "B":
                        return "음료";
                    case "C":
                        return "과자";
                    case "D":
                        return "젤리";

                    default:
                        return sStatus;
                 }
            }
          
        
    };
});
//하나의 모듈처럼 사용가능함-> controller에서 사용