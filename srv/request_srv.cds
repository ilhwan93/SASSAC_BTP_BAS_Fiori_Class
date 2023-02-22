using demo.request as request from '../db/request';

service RequestService {

    entity Request       as projection on request.Request;
    entity Request_State as projection on request.Request_State;


}

//using 에 as request는 별칭
//srv는 oData를 담는 폴더
