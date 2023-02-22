sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "../model/formatterCom",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel"
], function(Controller, formatterCom, Filter, FilterOperator, Fragment, Sorter,JSONModel) {
	"use strict";
   let totalNumber;
	return Controller.extend("project2.controller.CompanyM", {

		formatterCom: formatterCom,
        // onBank: function(){
        //     this.getOwnerComponent().getRouter().navTo("CompanyGrid")
        // },
        onInit: async function () {           
            const myRoute = this.getOwnerComponent().getRouter().getRoute("CompanyM");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
            this.getOwnerComponent().getRouter().getRoute("CompanyDetail").attachPatternMatched(this.onMyRoutePatternMatched, this);
            this.getOwnerComponent().getRouter().getRoute("CompanyDetailexpand").attachPatternMatched(this.onMyRoutePatternMatched, this);
           
        },
        onDeleteCompany:async function(){
            
            
            var aIndices = this.byId("CompanyMTable").getSelectedItems();
            
            console.log(aIndices);
            if(aIndices.length === 0){
                alert("삭제될 항목이 선택되지 않았습니다.");
                return;
            } else {
                for(let i = 0; i<aIndices.length; i++){
                    var comcode = aIndices[i].mAggregations.cells[i].mProperties.text;
                    await this.onDelete(comcode);
                }          
                    
                 this.onDataView();
    
            }

        },

         onDelete: async function(key){
             let url = "/company/Company/"+ key;
             await fetch(url, {
                method: "DELETE",
                headers: {
                     "Content-Type": "application/json;IEEE754Compatible=true"}
            })
        },

        onMyRoutePatternMatched: function () {
           
            this.onDataView();
            
        },
      
        onDataView: async function(){
            const Company= await $.ajax({
                type: "get",
                url: "/company/Company"
            });
            let CompanyModel = new JSONModel(Company.value);
            this.getView().setModel(CompanyModel, "CompanyModel");
            console.log(CompanyModel);
            totalNumber = this.getView().getModel("CompanyModel").oData.length;
            let TableIndex = "협력 업체 목록 ("+ totalNumber + ")"; 
                        this.getView().byId("TableName").setText(TableIndex);
            
        },

        onNavigation : function(oEvent){
            var SelectedNum = oEvent.getSource().mAggregations.cells[0].mProperties.text;
            this.getOwnerComponent().getRouter().navTo("CompanyDetail", { num: SelectedNum, table: "ResponsiveTable" }); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.

        },
        onCompanyGridTable: function(){
            
            this.getOwnerComponent().getRouter().navTo("CompanyGrid");
        },
        
        
        onSearch: function () {
            let ComNum = this.byId("ComNum").getValue();
            let ComName = this.byId("ComName").getValue();            
            let ComPerson = this.byId("ComPerson").getValue();            
            let Date = this.byId("Date").getValue();
            let Status = this.byId("Status").getSelectedKey();

            
            if (Date) {
                let ComYear = Date.split(".")[0];
                let ComMonth = Date.split(".")[1];
                let ComDay = Date.split(".")[2];   //앞에 적힌 값을 2자리로 만들어줌. 2자리가 아닐경우 0을 앞에 추가하여 두자리로 만듬
                Date = ComYear + "-" + ComMonth + "-" + ComDay
            }



            var aFilter = [];

            if (ComNum) {
                aFilter.push(new Filter("ComNum", FilterOperator.Contains, ComNum))
            }
            if (ComName) {
                aFilter.push(new Filter("ComName", FilterOperator.Contains, ComName))
            }
            
            if (ComPerson) {
                aFilter.push(new Filter("ComPerson", FilterOperator.Contains, ComPerson))
            }

            if (Date) {
                aFilter.push(new Filter("Date", FilterOperator.Contains, Date))
            }
            if (Status) {
                aFilter.push(new Filter("Status", FilterOperator.Contains, Status))
            }
            let oTable = this.byId("CompanyMTable").getBinding("items");
            oTable.filter(aFilter);
            
        },

        onReset: function () {
            this.byId("ComNum").setValue("");
            this.byId("ComName").setValue("");
            this.byId("ComPerson").setValue("");
            this.byId("Date").setValue("");
            this.byId("Status").setSelectedKey("");
        

            this.onSearch();
        },
           
        
        onSort: function () {
            if (!this.byId("SortCompanyDialog")) { //기존에 열어둔 dialog가 없으면 새롭게 dialog를 생성
                Fragment.load({
                    id: this.getView().getId(), //Fragment의 id를 글로벌id로 확장시켜 view에 상속
                    name: "project2.view.fragment.SortDialogCompany", //로드할 파일 경로
                    controller: this            //이 다이얼로그의 동작이벤트를 할때에는 이 컨트롤러 파일에 있는 함수나 메소드를 사용하겠다는 의미
                }).then(function (oDialog) {     //동기:여러코드들이 동시에 진행, 비동기:코드들이 순차적으로 진행, then은 비동기를 의미
                    this.getView().addDependent(oDialog); //adddependent oininit,onbeforerendering,onafterrendenring,프래그먼트의 생명주기를 따르겠다는 의미
                    oDialog.open("filter");  //로드한 파일을 실제로 화면에 띄우겠다는 의미
                }.bind(this)); //bind(this)를 통해 위의 fx 안에 있는 this를 fx를 가르키는 것이 아닌 controller를 가르키게 할 수 있음. fx안에 존재하는 또다른 fx에대한 this는 기본적으로 fx을 가르킴
            } else {//기존에 열어둔 dialog가 있으면 그대로 오픈
                this.byId("SortCompanyDialog").open("filter"); 
            }
            this.onSearch();
        },

        onConfirmSortCompanyDialog: function (oEvent) { //팝업창에서 확인을 눌렀을때의 동작
            let mParams = oEvent.getParameters(); //사용자가 선택한 사항(ex물품번호)
            let sPath = mParams.sortItem.getKey(); //sortdialog.fragment.view에서 key값을 가져옴, column에 대한 key값
            let bDescending = mParams.sortDescending; //오름차순 내림차순에 따라 클릭한 값에 따라서 true or false값을 가져옴
            let aSorters = [];
            aSorters.push(new Sorter(sPath, bDescending)); //column에 대한 key값들을 bdecenging이 트루일경우 내림차순, false일경우 오름차순정리
            let oBinding = this.byId("CompanyMTable").getBinding("items"); 
            oBinding.sort(aSorters);   //위에서 만든 Sorter를 실제로 적용하겠다는 의미
        }
        //getownercomponent : 컴포넌트나 메니페스트에 있는 정보를 가져옴
        

		

	});

});