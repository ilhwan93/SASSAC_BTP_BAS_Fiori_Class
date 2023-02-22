sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function (
    Controller, JSONModel
) {
    "use strict";

    return Controller.extend("project2.controller.Chart", {

        onInit: async function () {

            var oData =
            {
                trust: 0,
                trustpercent: '',
                wait: 0,
                waitpercent: '',
                caution: 0,
                cautionpercent: '',
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "CreditStatus");
            this.onDataView();
        },

        onRequestHome: function () {
            this.getOwnerComponent().getRouter().navTo("RequestHome");
        },

        onDataView: async function () {
            const BpCreditstatus = await $.ajax({
                type: "get",
                url: "/bp/BP"
            });
            let statusModel = new JSONModel(BpCreditstatus.value);
            this.getView().setModel(statusModel, "statusModel");


            let data = this.getView().getModel("statusModel");
            let a = 0.00, b = 0.00, c = 0.00;
            for (let i = 0; i < data.oData.length; i++) {
                let state = '/' + i + '/bp_credit_status'
                if (data.getProperty(state) === '신뢰') {
                    a++;
                }
                if (data.getProperty(state) === '보류') {
                    b++;
                }
                if (data.getProperty(state) === '주의') {
                    c++;
                }
            }
            view.getModel("CreditStatus").setProperty("/trust", a / data.oData.length * 100);
            view.getModel("CreditStatus").setProperty("/wait", b / data.oData.length * 100);
            view.getModel("CreditStatus").setProperty("/caution", c / data.oData.length * 100);
            view.getModel("CreditStatus").setProperty("/trustpercent", (a / data.oData.length * 100) + '%');
            view.getModel("CreditStatus").setProperty("/waitpercent", (b / data.oData.length * 100) + '%');
            view.getModel("CreditStatus").setProperty("/cautionpercent", (c / data.oData.length * 100) + '%');


        }
    });
});
	