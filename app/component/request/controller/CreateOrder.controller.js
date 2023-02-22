sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	
], function (Controller, JSONModel) {
    'use strict';
    let Today, CreateNum;
    return Controller.extend("project4.controller.CreateOrder", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("CreateOrder");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);

        },
        onMyRoutePatternMatched: function () {
            // this.onClearField();
            
            CreateNum = window.location.href.slice(-1);
            let now = new Date();
            Today = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-"
            + now.getDate().toString().padStart(2, 0);
            this.getView().byId("ReqNum").setText(CreateNum);
            this.getView().byId("ReqDate").setText(Today);
        },
        



        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("Request")
        },
        onCreate: async function () {
            
            let temp = new JSONModel(this.temp).oData;

            // var temp2 = new JSONModel();
            // var temp3= new JSONModel();
            // var temp4=new JSONModel();
            // var temp5=new JSONModel();
            // console.log(temp);
            // console.log(temp2);
            // temp = {
            //     request_product: this.byId("ReqGood").getValue(),
            //     request_quantity: parseInt(this.byId("ReqQty").getValue()),
            //     requestor: this.byId("Requestor").getValue(),
            //     request_date: this.byId("ReqDate").getValue(),
            //     request_reason: this.byId("ReqReason").getValue(),
            //     request_number: this.byId("ReqNum").getValue(),
            //     request_state: this.byId("ReqState").getValue(),
            //     request_estimated_price: parseInt(this.byId("ReqPrice").getValue())

            // };
            temp.request_product = this.byId("ReqGood").getValue();
            temp.request_quantity = parseInt(this.byId("ReqQty").getValue());
            temp.requestor = this.byId("Requestor").getValue();
            temp.request_date = Today;
            temp.request_reason = this.byId("ReqReason").getValue();
            temp.request_number = String(CreateNum);
            temp.request_state = "B"
            temp.request_estimated_price = parseInt(this.byId("ReqPrice").getValue());

            await fetch("/request/Request", {
                method: "POST",
                body: JSON.stringify(temp),
                headers: {
                    "Content-Type": "application/json;IEEE754Compatible=true",

                }
            });
           this.onReset();
             this.onBack();

            console.log(temp);
            // await $.ajax({
            //     type: "post",
            //     url: "/request/Request",
            //     contentType: "application/json;IEEE754Compatible=true",
            //     data: JSON.stringify(temp)
            // });
           


        // //},
        // onClearField: function () {
        //     this.getView().byId("ReqGood").setValue("");
        //     this.getView().byId("ReqQty").setValue("");
        //     this.getView().byId("Requestor").setValue("");
        //     // this.getView().byId("ReqDate").setValue("");
        //     this.getView().byId("ReqReason").setValue("");
        //     // this.getView().byId("ReqNum").setValue("");
        //     // this.getView().byId("ReqStatus").setSelectedKey("");
        //      this.getView().byId("ReqPrice").setValue("");
        
    
    },
    onReset: function () {
        
        
        this.byId("ReqGood").setValue("");
        this.byId("ReqQty").setValue("");
        this.byId("Requestor").setValue("");
        this.byId("ReqPrice").setValue("");
        this.byId("ReqReason").setValue("");
       




    }
})
})