namespace demo.company;

entity Company {
    key comcode    : String;
        comname    : String;
        comaddress : String;
        comperson  : String;
        comcontact : String;
        comgood    : String;
        comdate    : String;
        comstate   : String;

};

entity Company_State {
    key Company_state_key : String; 
        Company_state_name : String; 

};

entity BP {
    key bp_name                        :   String	 @title : 'BP명';
        bp_number                      :   String	 @title : 'BP번호==고객정보의 고객';
        bp_grouping                    :   String	 @title : '그룹화';
        bp_category                    :   String	 @title : 'BP범주';
        bp_person_title                :   String	 @title : '개인칭호';
        bp_organization_title          :   String	 @title : '조직명칭';
        bp_first_name	               :   String	 @title : '개인칭호';
        bp_last_name	               :   String	 @title : '조직명칭';
        bp_corp_name1	               :   String	 @title : '기업 이름1';
        bp_corp_name2	               :   String	 @title : '기업 이름2';
        bp_gender	                   :   String	 @title : '성별';
        bp_degree                      :   String	 @title : '학위';
        bp_birthday	                   :   String	 @title : '생년월일';
        bp_birthplace	               :   String	 @title : '출생지';
        bp_search1	                   :   String	 @title : '검색어1';
        bp_search2	                   :   String	 @title : '검색어2';
        bp_corp_type	               :   String	 @title : '법적 형태';
        bp_corp_est_date	           :   String	 @title : '설립일';
        bp_cal_date	                   :   String	 @title : '청산일';
        bp_external_number	           :   String	 @title : '외부BP번호';
        bp_created_date	               :   String	 @title : '생성일';
        bp_constructor	               :   String	 @title : '생성자';
        bp_changer	                   :   String	 @title : '최종변경자';
        bp_changed_date	               :   String	 @title : '최종 변경일';
        bp_cutomer_acct_group          :   String	 @title : '고객계정그룹';
        bp_delivery_rule	           :   String	 @title : '납품일 규칙';
        bp_group_key	               :   String	 @title : '그룹 키';
        bp_vendor	                   :   String	 @title : '공급업체';
        bp_provision_reason	           :   String	 @title : '지급사유';
        bp_order_hold			       :   Boolean 	 @title : '오더보류';
        bp_billing_hold		           :   Boolean	 @title : '청구보류';
        bp_delivery_hold	           :   Boolean	 @title : '납품보류';
        bp_posting_hold	               :   Boolean	 @title : '전기보류';
        bp_customer_classification	   :   String	 @title : '고객분류';
        bp_vat_pay_duty	               :   Boolean	 @title : 'VAT납세의무';
        bp_road_address	               :   String	 @title : '도로 주소';
        bp_street_address              :   String	 @title : '번지';
        bp_postal_code	               :   String	 @title : '우편번호';
        bp_city	    	               :   String	 @title : '도시';
        bp_nation	                   :   String	 @title : '국가/지역';
        bp_region	                   :   String	 @title : '지역';
        bp_nation_code	               :   String	 @title : '국가 코드';
        bp_company_code		           :   String	 @title : '회사 코드';
        bp_credit_status			   :   String    @title : '신용상태';
        bp_report_submission           :   Boolean	 @title : '서류 제출';
};
