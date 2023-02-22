namespace demo.snack;
using{
cuid,
managed,
Currency,
Country
} from '@sap/cds/common';
entity Snack {
key snack_code : String @title : '간식코드';
snack_category : String @title : '간식카테고리';
snack_name : String @title : '간식이름';
snack_price : Integer @title : '간식가격';
snack_stock : Integer @title : '재고';
snack_status : String @title : '재고상태';
snack_date : String @title : '재고신청일';
snack_prefer : Integer @title : '선호점수';
};

entity Snack_Status {
    key snack_status_key : String; 
        snack_status_name : String; 

};
entity Snack_Category {
    key snack_category_key : String; 
        snack_category_name : String; 

};


//@부터는 기능은 없지만 다른 사람들이 코드를 볼때 이해를 돕기위함
//key값은 중복불가
//db는 데이터베이스에 저장된 데이터를 담는 폴더
//cds 파일의 내용을 바꾸면 터미널에서 cds build 하고 cds deploy를 해야 Database explorer에 반영됨