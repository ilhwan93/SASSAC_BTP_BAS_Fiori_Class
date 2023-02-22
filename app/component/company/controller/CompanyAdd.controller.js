sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	
], function (Controller, JSONModel) {
    'use strict';
    let Today, CreateNum;
    return Controller.extend("project2.controller.CompanyAdd", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("CompanyAdd");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);

        },
        onMyRoutePatternMatched: async function () {
            // this.onClearField();
            
            CreateNum = window.location.href.slice(-10);
            let now = new Date();
            Today = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-"
            + now.getDate().toString().padStart(2, 0);
            this.getView().byId("comcode").setText(CreateNum);
            this.getView().byId("comdate").setText(Today);

            const Company_State = await $.ajax({
                type: "get",
                url: "/company/Company_State"
            });
          
                let Company_State_Model = new JSONModel(Company_State);
                 this.getView().setModel(Company_State_Model, "Company_State_Model");
                    console.log(Company_State_Model)

        },
        



        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("CompanyGrid");
        },
        onCreate: async function () {
            
            let temp = new JSONModel(this.temp).oData;
            temp.comcode = String(CreateNum)
            temp.comname = this.byId("comname").getValue();
            temp.comperson = this.byId("comperson").getValue();
            temp.comdate = Today;
            temp.comcontact = this.byId("comcontact").getValue();            
            temp.comstate = this.getView().byId("comstate").mProperties.selectedKey
            temp.comgood = this.byId("comgood").getValue()
            temp.comaddress = this.byId("comaddress").getValue()
          

            await fetch("/company/Company", {
                method: "POST",
                body: JSON.stringify(temp),
                headers: {
                    "Content-Type": "application/json;IEEE754Compatible=true",

                }
            });
            this.onReset();
            this.onBack();

            
           
    
    },
    onReset: function () {
        
        
        this.byId("comname").setValue("");
        this.byId("comperson").setValue("");
        this.byId("comcontact").setValue("");
        this.getView().byId("comstate").mProperties.selectedKey=""
        this.byId("comgood").setValue("");
        this.byId("comaddress").setValue("");
        this.onBack();




    }
})
})