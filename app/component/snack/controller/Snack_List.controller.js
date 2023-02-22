sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    "../model/formatters"
],

    function (Controller,	
	Filter,
	FilterOperator,
	Fragment,
	Sorter,
	JSONModel,
	Spreadsheet,
	exportLibrary,
    formatters) {
        "use strict";
       
        let totalNumber;
        const EdmType = exportLibrary.EdmType;
        return Controller.extend("project5.controller.Snack_List", {
            formatters: formatters,
             //앞부분은 view에서 적힐 함수 메소드이름, 뒷부분은 파일이름formatter에서 가져온 메소드나 함수는 formatter에서 가져온것 그대로 xml에 뿌리는데 쓴다는 의미






            onInit: async function () {
                // const Snack = await $.ajax({
                //     type: "get",
                //     url: "/snack/Snack"
                // });

                // let RequestModel = new JSONModel(Snack.value);
                // this.getView().setModel(RequestModel, "RequestModel");
                const myRoute = this.getOwnerComponent().getRouter().getRoute("Snack_List");
                myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
                this.getOwnerComponent().getRouter().getRoute("Snack_List").attachPatternMatched(this.onMyRoutePatternMatched, this);
                //requestdetail route로 라우팅 됐을때 snack 페이지의 데이터를 자동으로 업로딩.
            },
            onMyRoutePatternMatched: function () {
                // this.onClearField();
                this.onDataView();

            },
            onNavToHome: function (oEvent) {




                this.getOwnerComponent().getRouter().navTo("Snack_Home"); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.



            },
            onNavToDetail: function (oEvent) {



                var SelectedNum = oEvent.getParameters().row.mAggregations.cells[1].mProperties.text;
                console.log(oEvent.getParameters())
                this.getOwnerComponent().getRouter().navTo("Snack_Detail", { num: SelectedNum, where: "Snack_Detail" }); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.



            },
            onDataView: async function () {
                const Snack = await $.ajax({
                    type: "get",
                    url: "/snack/Snack"
                });
                let SnackModel = new JSONModel(Snack.value);
                this.getView().setModel(SnackModel, "SnackModel");
                totalNumber = this.getView().getModel("SnackModel").oData.length;
                let TableIndex = "간식 목록 (" + totalNumber + ")";
                this.getView().byId("TableName").setText(TableIndex);

            },

            onSearch: function () {
                let Name = this.byId("Name").getValue();
                let Category = this.byId("Category").getSelectedKey();
                let Status = this.byId("Status").getSelectedKey();
                let Date = this.byId("Date").getValue();
                let Prefer = String(this.byId("Prefer").getValue());
               


                if (Date) {
                    let Year = Date.split(". ")[0];
                    let Month = Date.split(". ")[1].padStart(2, '0'); //앞에 적힌 값을 2자리로 만들어줌. 2자리가 아닐경우 0을 앞에 추가하여 두자리로 만듬
                    Date = Year + "-" + Month;
                }



                var aFilter = [];

                if (Name) {
                    aFilter.push(new Filter("snack_name", FilterOperator.Contains, Name))
                }
                if (Category) {
                    aFilter.push(new Filter("snack_category", FilterOperator.Contains, Category))
                }
                if (Status) {
                    aFilter.push(new Filter("snack_status", FilterOperator.Contains, Status))
                }
                if (Date) {
                    aFilter.push(new Filter("snack_date", FilterOperator.Contains, Date))
                }
                if (Prefer) {
                    aFilter.push(new Filter("snack_prefer", FilterOperator.EQ, Prefer))
                }
                let oTable = this.byId("RequestTable").getBinding("rows");
                oTable.filter(aFilter);
                

            },

            onReset2: function () {
                this.byId("Name").setValue("");
                this.byId("Category").setSelectedKey("");
                this.byId("Status").setSelectedKey("");
                this.byId("Date").setValue("");
                this.byId("Prefer").setValue("");

                this.onSearch();
             
            },

            onSort: function () {
                if (!this.byId("SortDialog")) { //기존에 열어둔 dialog가 없으면 새롭게 dialog를 생성
                    Fragment.load({
                        id: this.getView().getId(), //Fragment의 id를 글로벌id로 확장시켜 view에 상속
                        name: "project5.view.fragment.SortDialog", //로드할 파일 경로
                        controller: this            //이 다이얼로그의 동작이벤트를 할때에는 이 컨트롤러 파일에 있는 함수나 메소드를 사용하겠다는 의미
                    }).then(function (oDialog) {     //동기:여러코드들이 동시에 진행, 비동기:코드들이 순차적으로 진행, then은 비동기를 의미
                        this.getView().addDependent(oDialog); //adddependent oininit,onbeforerendering,onafterrendenring,프래그먼트의 생명주기를 따르겠다는 의미
                        oDialog.open("filter");  //로드한 파일을 실제로 화면에 띄우겠다는 의미
                    }.bind(this)); //bind(this)를 통해 위의 fx 안에 있는 this를 fx를 가르키는 것이 아닌 controller를 가르키게 할 수 있음. fx안에 존재하는 또다른 fx에대한 this는 기본적으로 fx을 가르킴
                } else {//기존에 열어둔 dialog가 있으면 그대로 오픈
                    this.byId("SortDialog").open("filter");
                }
                this.onSearch();
            },

            onConfirmSortDialog: function (oEvent) { //팝업창에서 확인을 눌렀을때의 동작
                let mParams = oEvent.getParameters(); //사용자가 선택한 사항(ex물품번호)
                let sPath = mParams.sortItem.getKey(); //sortdialog.fragment.view에서 key값을 가져옴, column에 대한 key값
                let bDescending = mParams.sortDescending; //오름차순 내림차순에 따라 클릭한 값에 따라서 true or false값을 가져옴
                let aSorters = [];
                aSorters.push(new Sorter(sPath, bDescending)); //column에 대한 key값들을 bdecenging이 트루일경우 내림차순, false일경우 오름차순정리
                let oBinding = this.byId("RequestTable").getBinding("rows");
                oBinding.sort(aSorters);   //위에서 만든 Sorter를 실제로 적용하겠다는 의미
            },
            //getownercomponent : 컴포넌트나 메니페스트에 있는 정보를 가져옴
            onCreateOrder: function () {
                let CreateOrder = this.getView().getModel("SnackModel").oData;
                let CreateOrderIndex = CreateOrder.length;
                let CreateNum = parseInt(CreateOrder[CreateOrderIndex - 1].snack_code) + 1
                this.getOwnerComponent().getRouter().navTo("Snack_Create", { num: CreateNum }); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.
            },
            onClearField: function () {
                this.getView().byId("Name").setValue("");
                //this.getView().byId("ReqQty").setValue("");
                this.getView().byId("Category").setSelectedKey("");
                this.getView().byId("Date").setValue("");
                //this.getView().byId("ReqReason").setValue("");
                this.getView().byId("Status").setSelectedKey("");                
               this.getView().byId("Prefer").setValue("");
            },
            onReset: function () {
                this.onClearField();
                this.onSearch();
            },          
                       
            onDataExport: function () {
                let aCols, oRowBinding, oSettings, oSheet, oTable;
                oTable = this.byId('RequestTable');
                oRowBinding = oTable.getBinding('rows');
                aCols = this.createColumnConfig();
                let oList = [];
                for (let j = 0; j < oRowBinding.oList.length; j++){
                    if(oRowBinding.aIndices.indexOf(j)> -1){
                        oList.push(oRowBinding.oList[j]);
                    }
                }
                for (let i = 0; i < oList.length; i++){
                    if(oList[i].snack_status === "A"){
                        oList[i].snack_status = '많음';
                    }
                    if(oList[i].snack_status === "B"){
                        oList[i].snack_status = '적음';
                    }
                    if(oList[i].snack_category === "A"){
                        oList[i].snack_category = '기타';
                    }
                    if(oList[i].snack_category === "B"){
                        oList[i].snack_category = '음료';
                    }
                    if(oList[i].snack_category === "C"){
                        oList[i].snack_category = '과자';
                    }
                    if(oList[i].snack_category === "D"){
                        oList[i].snack_category = '젤리';
                    }
                    

                }

                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oList,
                    fileName: 'RequestTable.xlsx',
                    worker: false
                };
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
                console.log(oTable)
            },

            createColumnConfig : function(){
                const aCols = [];
                aCols.push({
                    label : "간식 번호",
                    property : "snack_code",
                    type : EdmType.String
                });
                aCols.push({
                    label : "간식 카테고리",
                    property : "snack_category",
                    type : EdmType.String
                });
                aCols.push({
                    label : "간식 이름",
                    property : "snack_name",
                    type : EdmType.Int32
                });
                aCols.push({
                    label : "간식 가격",
                    property : "snack_price",
                    type : EdmType.String
                });
                aCols.push({
                    label : "재고",
                    property : "snack_stock",
                    type : EdmType.String
                });
                aCols.push({
                    label : "재고 상태",
                    property : "snack_status",
                    type : EdmType.String
                });
                aCols.push({
                    label : "재고 신청일",
                    property : "snack_date",
                    type : EdmType.String
                });
                aCols.push({
                    label : "선호도",
                    property : "snack_prefer",
                    type : EdmType.String
                });
                return aCols;
            },
        });

    });
