sap.ui.define([

], function () {
    "use strict";

    for (var i = 5; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            document.write("*");
        }
        document.write("<br/>");
    }


    /* for(var i = 1; i <6; i++){
        for(var j = 0; j < i; j++){
            document.write("*");
        }
        document.write(`<br/>`);
    
        
    } */
    /* 
    var num = prompt("숫자입력");
    var temp = num;
    var cycle = 0;
    while(1){
        var ten = parseInt(temp/10);
        var one = temp%10;
        temp = (ten + one)%10 +one*10;
        cycle++;
        if(temp == num){
            break;
        }
    }
    document.write(cycle, "<br/>")
      */
});







/*

// document.write("안녕하세요. 반갑습니다.");
    //var a;
//a = 10;
//document.write(a);
//var fruits = ['apple', 'banana'];
//document.write(fruits);
//document.write(typeof fruits); //object
//document.write(typeof a); //number
//변수명 사용시 대소문자 구문.
//변수명 첫글자는 숫자 안됨. 영문 _ $ 만 가능
//변수명에 - 는 사용금지(마이너스 연산으로 보기 떄문) _ 는 가능
//변수명으로 예약어 사용금지
    var num1 = 15;
var num2 = 2;
var result;
result = num1 + num2;
document.write(result, "<br />");
result = num1 - num2;
document.write(result, "<br />");
result = num1 * num2;
document.write(result, "<br />"); 
 
var t1 = "학교종이";
var t2 = "떙땡땡";
var t3 = 8282;
var t4 = "어서 모이자";
var result;
result = t1 + t2 + t3 + t4;
document.write(result);
document.write(typeof result); 
var num1 = 10;
var num2 = 3;
num1 += num2;
document.write(num1, "<br/>");
num1 -= num2;
document.write(num1, "<br/>");
num1 *= num2;
document.write(num1, "<br/>");
document.write(num1, "<br/>"); 
    var num1=10;
var num2=20;
var result;

num1--;
document.write(num1,"<br/>"); // 9

num1++;
document.write(num1,"<br/>"); // 10

result=num2++;
document.write(result,"<br/>"); // 

result=++num2;
document.write(result,"<br/>")); //
 
var result;
result = a>b || b >= m || m>n ;
console.log(result)*/
/* i = 1
j =i++
k = ++i +1
i = 3
j = 1
k = 4
 


 
[자료형]
문자형
var tag = "<h1>Tag!!!</h1>" -> 태그를 포함하여 출력하면 태그로 인식되어 출력
숫자형
var Num = Number("7")
논리형(boolean)
var isSmall=150>100; //true
null
-> 값이 없음
undefined
-> 값이 초기화(선언)되지 않았거나 선언만 되고 할당되지 않음.
배열
객체

[연산자]
A/B 나눈결과의 목 
 
A%B 나눈결과의 나머지
대입연산자(=)
a-=b a=a-b
a+=b a=a+b
a*=b a=a*b
증감연산자
후행          선행
변수 --; 또는 --변수
변수 ++; 또는 ++변수;
변수 앞에쓰면 선행처리
변수 뒤에쓰면 후행처리

비교연산자
a===b 값과 데이터 타입까지 동일
a!==b 
a==b  값만 동일
a!=b
||(or) &&(and) !(not)

삼항조건연산자
조건식값이 true면 실행문 1을 실행, false면 실행문2실행

var a = 10;
var b=3;

var result = a>b ? "thanks" : "hello";
cosnsole.log(result);
 
 
//이중삼항연산자
https://harrislim.tistory.com/26
 
var a = 10
var b = 12;
var result;
result = b++
var num = a == result ? b == result ? "hello" : "hi" : "HELLO" //a(==result) ? (b == result)? hello는 모두 참 hi는 a == result는 참 b == result는 거짓 HELLO는 a==result 가 거짓
document.write(num, "<br/>"); 

조건문 if문
var walkAmount = prompt("당신의 하루 걷는 양은 몇 보인가요?")
if(walkAmount >= 10000){
document.write("매우 좋은 습관을 지니고 계시는 군요")else{
    document.write("안좋은습관을가지고계시는군욧")
}
var three = prompt("숫자를입력하세요")
if(three%3 == 0 ){
document.write(three + "는 3의배수입니다.")
}else{
document.write(three + "는 3의 배수가 아닙니다. ")
}
var b = 12
result = b++
var num = b == 12? console.log("같습니다") : console.log("다릅니다.")

 
//else if 문
var month = prompt("현재는 몇월입니까? ");

if(month >= 9 && month <= 11){
document.write("가을이네요");
 
}else if(month >=6 && month <= 8 ){
document.write("여름이네요");
 
}else if(month >= 3 && month  <=5 ){
document.write("봄이네요");
}else{
document.write("겨울이네요");
}

var x = prompt("숫자를 입력하세요");
if(x%2 == 0 && x%6 !== 0){
document.write("2의배수입니다.")
}else if(x%3 == 0 && x%6 !== 0){
document.write("3의 배수입니다.")
}else if (x%6 == 0){
document.write("6의 배수입니다.")
}else{
document.write("셋 다 아닙니다.")
}

var x = prompt("시간을 입력하세요");
x = Number(x);
var y = prompt("분을 입력하세요");
y = Number(y);

if(y-45 >= 0 ){
document.write(`${x}시 ${y}분`);

}else {
if (x == 0){
    document.write(`${x-1+24}시 ${y -45+60}분`);
    
}else{
    document.write(${x-1}시 ${y -45+60}분`);
}
 
}
//선택문 switch문
var site = prompt("네이버, 다음, 네이트, 구글 중 즐겨 사용하는 포털 검색 사이트는?","");
var url;
switch (site){
case "네이버":url = "www.naver.com"; 
    break;
case "다음":url = "www.daum.net";
    break;
case "네이트":url = "www.nate.com";
    break;
case "구글": url="wwww.google.com";
    break;

default: alert("보기중에 없는 사이트입니다."); //디폴트는 맨아래 넣는게 좋음 위에있으면 디폴트가 먼저 실행됨
}
if (url){
location.href = "http://" + url;
}

var month = prompt("월을 입력해주세요.");
month = Number(month);
switch(month){
case 1 : document.write("31일")
case 3 : document.write("31일")
case 5 : document.write("31일") 
case 7 : document.write("31일")
case 8 : document.write("31일")   
case 10 : document.write("31일")  
case 12 :document.write("31일")  
    break;
case 4 : document.write("30일")   
case 6 :document.write("30일")  
case 9 : document.write("30일")   
case 11 : document.write("30일")
    break; 
case 2 : document.write("28일")
    break;
default : alert("월이 아닙니다.")
}

//while 문

var a = 1
while(a<= 10){
//참일때 실행할 식
document.write(a);
a++; // a를 후행으로 반복 1부터....10까지, 선행이면 2부터 10까지
 
}

var i = 10;
do {
document.write(i);
i--;
} while(i >3);


for(var a =1; a<=10; a++){
document.write(a);
}

/*     var num = prompt("몇 단을 출력하시겠습니까?")
num = Number(num);
var i = 1;
while(i < 10 ){
    document.write(`${num}*${i}=${num*i}`,"<br/>");
    i++;
} */

/*     var num = prompt("몇 단을 출력하시겠습니까?")
    num = Number(num);
    var i = 1;
    do{
        document.write(`${num}*${i}=${num*i}`,"<br/>");
        i++;
    }while(i<10) */
/* 
    var num = prompt("몇 단을 출력하시겠습니까?")
    num = Number(num);
    for(var i = 1; i < 10; i++){
         document.write(`${num}*${i}=${num*i}`,"<br/>") //i =1 -> i의 조건 확인 -> 함수실행 -> i++ 실행 -> i = 2 -> i의 조건 확인 -> 함수실행 -> i ++ 실행
    } 
//break문
/* 
for(var i = 1; i<=10; i++){
    if(i==6){
        break;
    }
    document.write(i,"<br/>"); //6에서 중단.
} 
/*
for(var i = 1; i<=10;i++){
    if(i%2 == 0){
        continue;
    }
    document.write(i,"<br/>"); //홀수만 찍힘, 짝수일경우 구문을 빠져나감
}

여러줄의 표시
console.log("hello, \neveryone"); //hello
                                    everyone

                                    var num = prompt("1보다 크고 99보다 낮은 숫자를 입력하세요");
var temp = num;
var cycle = 0;


do{ var ten = parseInt(temp/10);
    var one = (temp%10);
    temp = one*10+ (ten + one)%10;
    cycle++;   
    document.write(cycle,"<br/>");
}while(temp != num )

*/