namespace demo.request;

entity Request {
    key request_number          : String @title : '요청번호';
        request_product         : String  @title : '요청물품';
        request_quantity        : Integer @title : '요청수량';
        requestor               : String  @title : '요청자';
        request_date            : String  @title : '요청날짜';
        request_state           : String  @title : '요청상태';
        request_reason          : String  @title : '요청사유';
        request_estimated_price : Integer @title : '요청예상가격';
        request_reject_reason   : String  @title : '요청거절사유';
};

entity Request_State {
    key request_state_key : String @title : '요청상태 키워드';
        request_state_kor : String @title : '요청상태 한국어';

};

//@부터는 기능은 없지만 다른 사람들이 코드를 볼때 이해를 돕기위함
//key값은 중복불가
//db는 데이터베이스에 저장된 데이터를 담는 폴더
//cds 파일의 내용을 바꾸면 터미널에서 cds build 하고 cds deploy를 해야 Database explorer에 반영됨