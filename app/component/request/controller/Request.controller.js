sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
],

    function (Controller,
	formatters,
	Filter,
	FilterOperator,
	Fragment,
	Sorter,
	JSONModel,
	Spreadsheet,
	exportLibrary) {
        "use strict";
        let totalNumber;
        const EdmType = exportLibrary.EdmType;
        return Controller.extend("project4.controller.Request", {
            formatters: formatters, //앞부분은 view에서 적힐 함수 메소드이름, 뒷부분은 파일이름formatter에서 가져온 메소드나 함수는 formatter에서 가져온것 그대로 xml에 뿌리는데 쓴다는 의미






            onInit: async function () {
                // const Request = await $.ajax({
                //     type: "get",
                //     url: "/request/Request"
                // });

                // let RequestModel = new JSONModel(Request.value);
                // this.getView().setModel(RequestModel, "RequestModel");
                const myRoute = this.getOwnerComponent().getRouter().getRoute("Request");
                myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
                this.getOwnerComponent().getRouter().getRoute("RequestDetail").attachPatternMatched(this.onMyRoutePatternMatched, this);
                //requestdetail route로 라우팅 됐을때 request 페이지의 데이터를 자동으로 업로딩.
            },
            onMyRoutePatternMatched: function () {
                // this.onClearField();
                this.onDataView();

            },
            onNavToHome: function (oEvent) {




                this.getOwnerComponent().getRouter().navTo("_Home"); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.



            },
            onNavToDetail: function (oEvent) {



                var SelectedNum = oEvent.getParameters().row.mAggregations.cells[1].mProperties.text;
                console.log(oEvent.getParameters())
                this.getOwnerComponent().getRouter().navTo("RequestDetail", { num: SelectedNum, where: "RequestDetail" }); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.



            },
            onDataView: async function () {
                const Request = await $.ajax({
                    type: "get",
                    url: "/request/Request"
                });
                let RequestModel = new JSONModel(Request.value);
                this.getView().setModel(RequestModel, "RequestModel");
                totalNumber = this.getView().getModel("RequestModel").oData.length;
                let TableIndex = "물품 요청 목록 (" + totalNumber + ")";
                this.getView().byId("TableName").setText(TableIndex);

            },

            onSearch: function () {
                let ReqNum = this.byId("ReqNum").getValue();
                let ReqGood = this.byId("ReqGood").getValue();
                let Requester = this.byId("Requester").getValue();
                let ReqDate = this.byId("ReqDate").getValue();
                let ReqStatus = this.byId("ReqStatus").getSelectedKey();


                if (ReqDate) {
                    let ReqYear = ReqDate.split(". ")[0];
                    let ReqMonth = ReqDate.split(". ")[1].padStart(2, '0'); //앞에 적힌 값을 2자리로 만들어줌. 2자리가 아닐경우 0을 앞에 추가하여 두자리로 만듬
                    ReqDate = ReqYear + "-" + ReqMonth;
                }



                var aFilter = [];

                if (ReqNum) {
                    aFilter.push(new Filter("request_number", FilterOperator.Contains, ReqNum))
                }
                if (Requester) {
                    aFilter.push(new Filter("requestor", FilterOperator.Contains, Requester))
                }
                if (ReqGood) {
                    aFilter.push(new Filter("request_product", FilterOperator.Contains, ReqGood))
                }
                if (ReqDate) {
                    aFilter.push(new Filter("request_date", FilterOperator.Contains, ReqDate))
                }
                if (ReqStatus) {
                    aFilter.push(new Filter("request_state", FilterOperator.Contains, ReqStatus))
                }
                let oTable = this.byId("RequestTable").getBinding("rows");
                oTable.filter(aFilter);
                console.log(oTable)

            },

            onReset2: function () {
                this.byId("ReqNum").setValue("");
                this.byId("Requester").setValue("");
                this.byId("ReqGood").setValue("");
                this.byId("ReqDate").setValue("");
                this.byId("ReqStatus").setSelectedKey("");

                this.onSearch();
                //console.log(this.byId("ReqNum"));
            },

            onSort: function () {
                if (!this.byId("SortDialog")) { //기존에 열어둔 dialog가 없으면 새롭게 dialog를 생성
                    Fragment.load({
                        id: this.getView().getId(), //Fragment의 id를 글로벌id로 확장시켜 view에 상속
                        name: "project4.view.fragment.SortDialog", //로드할 파일 경로
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
                let CreateOrder = this.getView().getModel("RequestModel").oData;
                let CreateOrderIndex = CreateOrder.length;
                let CreateNum = parseInt(CreateOrder[CreateOrderIndex - 1].request_number) + 1
                this.getOwnerComponent().getRouter().navTo("CreateOrder", { num: CreateNum }); //컴포넌트나 메니페스트에 저장된 roter정보를 가져옴 그중에서도 viewname:CreatOrder에 기반한 정보를 가져오고 해당 정보를 가지고 페이지를 전환함.
            },
            /*onClearField: function () {
                this.getView().byId("ReqGood").setValue("");
                //this.getView().byId("ReqQty").setValue("");
                this.getView().byId("Requestor").setValue("");
                this.getView().byId("ReqDate").setValue("");
                //this.getView().byId("ReqReason").setValue("");
                this.getView().byId("ReqNum").setValue("");
                this.getView().byId("ReqStatus").setSelectedKey("");
               // this.getView().byId("ReqPrice").setValue("");
            },*/
            onReset: function () {
                this.onClearField();
                this.onSearch();
            },

            onDeleteOrder: async function () {

                let model = this.getView().getModel("RequestModel");
                let i;
                for (i = 0; i < totalNumber; i++) {
                    let chk = '/' + i + '/CHK'
                    if (model.getProperty(chk) === true) {
                        let key = '/' + i + '/request_number'
                        let request_number = model.getProperty(key);
                        await this.onDelete(request_number);
                    }
                }
                this.onDataView();

            },

            onDelete: async function (key) {
                let url = "/request/Request/" + key;
                await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json;IEEE754Compatible=true"
                    }
                })
            },
            /*
            oncheckselect: function () {
                console.log(this.getView().getModel("RequestModel"))
            },*/
           /* oncheckCHKtest: async function () {
                var checked = this.getView().byId("totalchk").getSelected();

                if (checked) {
                    await this.checkmode(true);
                }
                else {
                    await this.checkmode(false);
                }

            },*/
            /*
            checkmode: async function (data) {
                let model = this.getView().getModel("RequestModel");
                for (let i = 0; i < totalNumber; i++) {
                    let request_state = '/' + i + '/request_state'
                    if (model.getProperty(request_state) === 'B') {
                        let key = '/' + i + '/CHK'
                        let request_number = model.setProperty(key, data);

                    }
                }
            },*/
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
                    if(oList[i].request_state === "A"){
                        oList[i].request_state = '승인';
                    }
                    if(oList[i].request_state === "B"){
                        oList[i].request_state = '처리 대기';
                    }
                    if(oList[i].request_state === "C"){
                        oList[i].request_state = '반려';
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
                    label : "요청 번호",
                    property : "request_number",
                    type : EdmType.String
                });
                aCols.push({
                    label : "요청 물품",
                    property : "request_product",
                    type : EdmType.String
                });
                aCols.push({
                    label : "물품 개수",
                    property : "request_quantity",
                    type : EdmType.Int32
                });
                aCols.push({
                    label : "요청자",
                    property : "requestor",
                    type : EdmType.String
                });
                aCols.push({
                    label : "요청 일자",
                    property : "request_date",
                    type : EdmType.String
                });
                aCols.push({
                    label : "처리 상태",
                    property : "request_state",
                    type : EdmType.String
                });
                return aCols;
            },
        });

    });
