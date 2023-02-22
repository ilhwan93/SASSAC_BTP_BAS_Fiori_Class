sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatterCom",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
],

    function (Controller,
        formatterCom,
        Filter,
        FilterOperator,
        Fragment,
        Sorter,
        JSONModel) {
        "use strict";
            let table;
            var SelectedNum;
        return Controller.extend("project2.controller.CompanyDetail", {
            formatterCom: formatterCom,

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("CompanyDetail").attachPatternMatched(this.onMyRoutePatternMatched, this);
                this.getOwnerComponent().getRouter().getRoute("CompanyDetailexpand").attachPatternMatched(this.onMyRoutePatternMatched2, this);                            
                var odata={layout:false,
                layout2:"hello"};
                let layoutModel=new JSONModel(odata);
                this.getView().setModel(layoutModel,"layout");
            },
            onfull: function(){
                this.getOwnerComponent().getRouter().navTo("CompanyDetailexpand",{num: SelectedNum,table:table})
            },
            onexitfull: function(){
                this.getOwnerComponent().getRouter().navTo("CompanyDetail",{num: SelectedNum,table:table})
            },

                    
            onMyRoutePatternMatched: async function (oEvent) {
                 SelectedNum = oEvent.getParameter("arguments").num
                table = oEvent.getParameter("arguments").table
                let url = "/company/Company/" + SelectedNum
               
                const Company = await $.ajax({
                    type: "get",
                    url: url
                });
              
                let CompanyModel = new JSONModel(Company);
                this.getView().setModel(CompanyModel, "CompanyModel");
               // console.log(this.getView().getModel("CompanyModel"));

               const Company_State = await $.ajax({
                type: "get",
                url: "/company/Company_State"
                 });
          
                let Company_State_Model = new JSONModel(Company_State);
                 this.getView().setModel(Company_State_Model, "Company_State_Model");
                    

                var visible = {
                    footer: false
                }
                let visibleMode = new JSONModel(visible);

                if (CompanyModel.oData.comstate == 'hold') {
                    visibleMode.oData.footer = true;
                }

                this.getView().setModel(visibleMode, "visibleMode");
                console.log(visibleMode); //oData에 footer : true로 되어있음

                var visible2 = {
                    edit: false
                }
                let editModel = new JSONModel(visible2);
                this.getView().setModel(editModel, "editModel");
                this.getView().getModel("layout").setProperty("/layout",false);              
                
            },
            onMyRoutePatternMatched2: async function (oEvent) {
                let SelectedNum = oEvent.getParameter("arguments").num
                table = oEvent.getParameter("arguments").table
                let url = "/company/Company/" + SelectedNum
               
                const Company = await $.ajax({
                    type: "get",
                    url: url
                });
              
                let CompanyModel = new JSONModel(Company);
                this.getView().setModel(CompanyModel, "CompanyModel");
               // console.log(this.getView().getModel("CompanyModel"));

               const Company_State = await $.ajax({
                type: "get",
                url: "/company/Company_State"
                 });
          
                let Company_State_Model = new JSONModel(Company_State);
                 this.getView().setModel(Company_State_Model, "Company_State_Model");
                    

                var visible = {
                    footer: false
                }
                let visibleMode = new JSONModel(visible);

                if (CompanyModel.oData.comstate == 'hold') {
                    visibleMode.oData.footer = true;
                }

                this.getView().setModel(visibleMode, "visibleMode");
                console.log(visibleMode); //oData에 footer : true로 되어있음

                var visible2 = {
                    edit: false
                }
                let editModel = new JSONModel(visible2);
                this.getView().setModel(editModel, "editModel");
                this.getView().getModel("layout").setProperty("/layout",true);              
                
            },



            onNavToDetail: function () {
                
              
                
                if(table === "ResponsiveTable"){
                    this.getOwnerComponent().getRouter().navTo("CompanyM"); 
            }else if(table === "GridTable"){
                this.getOwnerComponent().getRouter().navTo("CompanyGrid"); 

            } 
            
        },
        onEdit: function(){
            this.getView().getModel("editModel").setProperty("/edit", true)
          var oldcomname=this.byId("ComName").getText();
          this.byId("comname").setValue(oldcomname);
          var oldcomadd=this.byId("ComAddress").getText();
          this.byId("comaddress").setValue(oldcomadd);
          var oldcomperson=this.byId("ComPerson").getText();
          this.byId("comperson").setValue(oldcomperson);
          var oldcomcontact=this.byId("ComContact").getText();
          this.byId("comcontact").setValue(oldcomcontact);
          var oldgood=this.byId("Good").getText();
          this.byId("comgood").setValue(oldgood);
          var oldstate=this.byId("oldstate").getText();
          if(oldstate==="보류"){
            this.byId("Comstate").setSelectedKey("hold");
          }else if(oldstate==="신뢰"){
            this.byId("Comstate").setSelectedKey("trust");
          }else if(oldstate==="주의"){
            this.byId("Comstate").setSelectedKey("caution");
          }else{
            this.byId("Comstate").setSelectedKey("hold");
          }
          
          
            
        },
        onConfirm: async function(){
            var temp = {
                comcode: String(this.byId("ReqNum").getText()),
                comname : this.byId("comname").getValue(),
                comaddress : this.byId("comaddress").getValue(),
                comperson : this.byId("comperson").getValue(),
                comcontact : this.byId("comcontact").getValue(),                         
                comgood : this.byId("comgood").getValue(),
                
                comstate : this.getView().byId("comstate").mProperties.selectedKey

               
            }
            
           
            let url = "/company/Company/" + temp.comcode;
            await $.ajax({
                type: "patch",
                url: url,
                contentType: "application/json;IEEE754Compatible=true",
                data: JSON.stringify(temp)  //temp에 저장된 내용으로 기존 data를 바꿈
            });
            
            this.onNavToDetail();
            this.onReset();
        },
        onCancel: function(){
            this.onReset();
            this.getView().getModel("editModel").setProperty("/edit", false);
         
            


        },
        onReset: function () {
        
        
            this.byId("comname").setValue("");
            this.byId("comperson").setValue("");
            this.byId("comcontact").setValue("");
            this.getView().byId("comstate").mProperties.selectedKey = "";
            this.byId("comgood").setValue("");
            this.byId("comaddress").setValue("");
            
        }
            

        });
    });