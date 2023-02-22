sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
],

    function (Controller,
        formatters,
        Filter,
        FilterOperator,
        Fragment,
        Sorter,
        JSONModel) {
        "use strict";
        var SelectedNum;
        var where;
        return Controller.extend("project4.controller.RequestDetail", {
            formatters: formatters,
            
            
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RequestDetail").attachPatternMatched(this.onMyRoutePatternMatched, this);
                this.getOwnerComponent().getRouter().getRoute("RequestDetailexpand").attachPatternMatched(this.onMyRoutePatternMatched2, this);
                const myRoute = this.getOwnerComponent().getRouter().getRoute("RequestDetail");
                myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
                var odata={layout:false,
                layout2:"hello"};
                let layoutModel=new JSONModel(odata);
                this.getView().setModel(layoutModel,"layout");
            },
                        

            onfull: function(){
                this.getOwnerComponent().getRouter().navTo("RequestDetailexpand", {num:SelectedNum, where: "RequestDetail"})
            },
            onexitfull: function(){
                where = null;
                this.getOwnerComponent().getRouter().navTo("RequestDetail",{num: SelectedNum})

            },

            
            onMyRoutePatternMatched: async function (oEvent) {
                SelectedNum = oEvent.getParameter("arguments").num
                let url = "/request/Request/" + SelectedNum
                console.log(url);
                const Request = await $.ajax({
                    type: "get",
                    url: url
                });
                console.log(Request);
                let RequestModel = new JSONModel(Request);
                this.getView().setModel(RequestModel, "RequestModel");
              

                var visible = {
                    footer: false
                }
                let visibleMode = new JSONModel(visible);

                if (RequestModel.oData.request_state == 'B') {
                    visibleMode.oData.footer = true;
                }

                this.getView().setModel(visibleMode, "visibleMode");
                this.getView().getModel("layout").setProperty("/layout",false);
                this.getView().getModel("layout").setProperty("/layout2","bye");
                console.log(this.getView().getModel("layout"));
            },
            onMyRoutePatternMatched2: async function (oEvent) {
                SelectedNum = oEvent.getParameter("arguments").num
                where=oEvent.getParameter("arguments").where
                let url = "/request/Request/" + SelectedNum
                console.log(url);
                const Request = await $.ajax({
                    type: "get",
                    url: url
                });
                console.log(Request);
                let RequestModel = new JSONModel(Request);
                this.getView().setModel(RequestModel, "RequestModel");
                console.log(this.getView().getModel("RequestModel"));

                var visible = {
                    footer: false
                }
                let visibleMode = new JSONModel(visible);

                if (RequestModel.oData.request_state == 'B') {
                    visibleMode.oData.footer = true;
                }

                this.getView().setModel(visibleMode, "visibleMode");
                console.log(visibleMode); //oData에 footer : true로 되어있음
                this.getView().getModel("layout").setProperty("/layout",true);
            },
            onApprove: async function () {
                //승인눌렀을때 데이터가 승인으로 바뀜
                var temp = new JSONModel().oData;
                temp.request_number = String(this.byId("ReqNum").getText())
                temp.request_state = "A"
                //var temp = {
                //   request_number : String(this.byId("ReqNum").getText()),
                //  request_state : "A"
                //}
                let url = "/request/Request/" + temp.request_number;
                await $.ajax({
                    type: "patch",
                    url: url,
                    contentType: "application/json;IEEE754Compatible=true",
                    data: JSON.stringify(temp)
                });
                this.onBack();
            },
           

            onReject:
                //반려 눌렀을때 데이터가 반려로 바뀜
                function () {

                    if (!this.byId("OrderRejectDialog")) {
                        Fragment.load({
                            id: this.getView().getId(), 
                            name: "project4.view.fragment.Reject", 
                            controller: this           
                        }).then(function (oDialog) {     
                            this.getView().addDependent(oDialog); 
                            oDialog.open();  
                        }.bind(this)); 
                    } else {//기존에 열어둔 dialog가 있으면 그대로 오픈
                        this.byId("OrderRejectDialog").open(); 
                    }
                    //승인눌렀을때 데이터가 승인으로 바뀜
                    /*var temp = {
                        request_number: String(this.byId("ReqNum").getText()),
                        request_state: "C"
                    }
                    let url = "/request/Request/" + temp.request_number;
                    await $.ajax({
                        type: "patch",
                        url: url,
                        contentType: "application/json;IEEE754Compatible=true",
                        data: JSON.stringify(temp)  //temp에 저장된 내용으로 기존 data를 바꿈
                    })                        
                    this.onBack();*/
                    
                    

                },
            onBack: function () {
                if(where=="Request_Home"){
                    this.getOwnerComponent().getRouter().navTo("Request_Home")
                }else {
                    this.getOwnerComponent().getRouter().navTo("Request")
                }
                
            },

            onInputRejectReason: async function(){
                
                var temp = {
                    request_number: String(this.byId("ReqNum").getText()),
                    request_state: "C",
                    request_reason: this.byId("RejectReason").getValue()
                    
                }
                console.log(temp.request_reason)
                let url = "/request/Request/" + temp.request_number;
                await $.ajax({
                    type: "patch",
                    url: url,
                    contentType: "application/json;IEEE754Compatible=true",
                    data: JSON.stringify(temp)  //temp에 저장된 내용으로 기존 data를 바꿈
                })                        
                this.onBack();
                this.onCancelRejectReason();
                
            },
            onCancelRejectReason: function(){

           this.byId("OrderRejectDialog").destroy()
                
          

            },
            onEdit :  async function (){
                
            }
        });
    });