sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatterProduct",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel"
], function(Controller, formatterPrd, Filter, FilterOperator, Fragment, Sorter, JSONModel) {   //위의 정의에서 설정한 경로의 모듈에 대해 이 컨트롤러에서 어떤 별칭으로 사용할지 정함
    'use strict';
    return Controller.extend("project3.controller.ProductM",{
        
        formatter: formatterPrd,    //좌항은 xml에서 사용할 이름, 우항은 controlloer에서 사용할 이름 , 이 포맷터의 경로는 컨트롤러 상단의 define에 정의됨.
        // onBank: function(){
        //     this.getOwnerComponent().getRouter().navTo("CompanyGrid")
        // },
        onProductUiTable: function(){
            
            this.getOwnerComponent().getRouter().navTo("ProductUi");
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        onInit: function () {
			var oData = {
				"ProduceCollection": [
                    {
						"key": "",
						"Produce": "전체"
					},
					{
						"key": "A",
						"Produce": "생산"
					},
					{
						"key": "B",
						"Produce": "미사용"
					},
					{
						"key": "C",
						"Produce": "단종 예정"
					},
					{
						"key": "D",
						"Produce": "단종"
					}
					
				],
				
			};

			// set explored app's demo model on this sample
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "select");
		},
       
        onSearch: function () {
            let prdCategory = this.byId("Category").getValue();
            let prdCode = this.byId("Code").getValue();            
            let prdName = this.byId("Name").getValue();            
            let prdDate = this.byId("Date").getValue();
            let prdProduce = this.byId("Produce").getSelectedKey();

            
            if (prdDate) {
                let PrdYear = prdDate.split(".")[0];
                let PrdMonth = prdDate.split(".")[1];
                let PrdDay = prdDate.split(".")[2];   //앞에 적힌 값을 2자리로 만들어줌. 2자리가 아닐경우 0을 앞에 추가하여 두자리로 만듬
                prdDate = PrdYear + "-" + PrdMonth + "-" + PrdDay
            }



            var aFilter = [];

            if (prdCategory) {
                aFilter.push(new Filter("category", FilterOperator.Contains, prdCategory))
            }
            if (prdCode) {
                aFilter.push(new Filter("code", FilterOperator.Contains, prdCode))
            }
            
            if (prdName) {
                aFilter.push(new Filter("name", FilterOperator.Contains, prdName))
            }

            if (prdDate) {
                aFilter.push(new Filter("date", FilterOperator.Contains, prdDate))
            }
            if (prdProduce) {
                aFilter.push(new Filter("produce", FilterOperator.Contains, prdProduce))
            }
            let oTable = this.byId("ProductMTable").getBinding("items");
            oTable.filter(aFilter);
            
        },

        onReset: function () {
            this.byId("Category").setValue("");
            this.byId("Code").setValue("");
            this.byId("Name").setValue("");
            this.byId("Date").setValue("");
            this.byId("Produce").setSelectedKey("");
        

            this.onSearch();
           
        },
        onSort: function () {
            if (!this.byId("SortDialogProduct")) { //기존에 열어둔 dialog가 없으면 새롭게 dialog를 생성
                Fragment.load({
                    id: this.getView().getId(), //Fragment의 id를 글로벌id로 확장시켜 view에 상속
                    name: "project3.view.fragment.SortDialogProduct", //로드할 파일 경로
                    controller: this            //이 다이얼로그의 동작이벤트를 할때에는 이 컨트롤러 파일에 있는 함수나 메소드를 사용하겠다는 의미
                }).then(function (oDialog) {     //동기:여러코드들이 동시에 진행, 비동기:코드들이 순차적으로 진행, then은 비동기를 의미
                    this.getView().addDependent(oDialog); //adddependent oininit,onbeforerendering,onafterrendenring,프래그먼트의 생명주기를 따르겠다는 의미
                    oDialog.open("filter");  //로드한 파일을 실제로 화면에 띄우겠다는 의미
                }.bind(this)); //bind(this)를 통해 위의 fx 안에 있는 this를 fx를 가르키는 것이 아닌 controller를 가르키게 할 수 있음. fx안에 존재하는 또다른 fx에대한 this는 기본적으로 fx을 가르킴
            } else {//기존에 열어둔 dialog가 있으면 그대로 오픈
                this.byId("SortDialogProduct").open("filter"); 
            }
            this.onSearch();
        },

        onConfirmSortDialogProduct: function (oEvent) { //팝업창에서 확인을 눌렀을때의 동작
            let mParams = oEvent.getParameters(); //사용자가 선택한 column
            let sPath = mParams.sortItem.getKey(); //사용자가 선택한 column과 매칭되는 key값을 fragment에서 가져옴
            let bDescending = mParams.sortDescending; //오름차순 내림차순에 따라 클릭한 값에 따라서 true or false값을 가져옴
            let aSorters = [];
            aSorters.push(new Sorter(sPath, bDescending)); //오름차순 내림차순에 대한 true,false 값과 이를 적용할 키 값에 대한 정보를 sorter에 담는다.
            let oBinding = this.byId("ProductMTable").getBinding("items");  //oBinding이라는 변수에 productMTable의 item값을 바인딩하여 저장
            oBinding.sort(aSorters);   //aSorter에 저장된 key값의 정렬에 따라 관련 item을 바인딩하고 이를 화면에 띄움.
        }
        //getownercomponent : 컴포넌트나 메니페스트에 있는 정보를 가져옴
        
    });
    
});