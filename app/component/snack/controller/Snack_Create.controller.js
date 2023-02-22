sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

], function (Controller, JSONModel) {
    'use strict';
    let Today, CreateNum;
    return Controller.extend("project5.controller.Snack_Create", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("Snack_Create");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);

        },
        onMyRoutePatternMatched: function () {
            // this.onClearField();

            CreateNum = window.location.href.slice(-9);

            let now = new Date();
            Today = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-"
                + now.getDate().toString().padStart(2, 0);

            this.getView().byId("Date").setText(Today);
            
        },





        onCancel: function () {


            this.byId("Name").setValue("");
            this.byId("Category").setSelectedKey("");
            this.byId("Qty").setValue("");
            this.byId("Price").setValue("");
            this.byId("Date").setText("");
            this.getOwnerComponent().getRouter().navTo("Snack_List")




        },

        onCreate: async function () {

            let temp = new JSONModel(this.temp).oData;

            temp.snack_name = this.byId("Name").getValue();
            temp.snack_date = Today
            temp.snack_price = parseInt(this.byId("Price").getValue());
            temp.snack_code = String(CreateNum);
            temp.snack_category = this.byId("Category").getSelectedKey()
            temp.snack_stock = parseInt(this.byId("Qty").getValue())
            temp.snack_prefer = 0

            await fetch("/snack/Snack", {
                method: "POST",
                body: JSON.stringify(temp),
                headers: {
                    "Content-Type": "application/json;IEEE754Compatible=true",

                }
            });
            this.onCancel();







        }

    })
})