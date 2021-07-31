console.log(this); // this -> window

function simpleFunc() {
  console.log(this);
}

simpleFunc(); // this는 window객체

console.clear();

class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase(); // this -> Counter

const caller0 = counter.increase;
caller0(); // this -> undefined,
// this의 정보를 잃어버리게 된다
// const나 let으로 선언한 변수는 window에 등록되지 않기 때문에
// this가 window 가 되지 않는다

// 이렇게 this 정보를 잃지 않기 위해서 bind 사용한다
const caller = counter.increase.bind(counter); // this -> counter
caller();

// 또 다른 방법으로는 아래처럼 함수를 선언할 때 화살표 함수를 사용한다
class Counter2 {
  count = 0;
  increase = () => {
    console.log(this);
  };
}

const counter2 = new Counter2();
const caller2 = counter2.increase;
console.log("caller2()");
// arrow function은 scope를 기억하기 때문에 Counter2가 출력된다
caller2();

const a = "a";
let b = "b";

// window.a 호출 불가
// window.b 호출 불가

var c = "c";
// window.c 호출 가능

class Bob {}

const bob = new Bob();
bob.run = counter.increase;
bob.run(); // this -> bob

/*
Q. arrow function 기능이 생긴 이후 bind call apply는

arrow function 기능이 생긴 이후 bind call apply는 거의 안쓰이나요?


A. 네, arrow function자체에서 scope를 기억하기 때문에 this의 컨텍스를 
유지 하기 위해서 쓰이는 함수들은 arrow function 문법으로 대체할 수 있어요 :) 



*/
