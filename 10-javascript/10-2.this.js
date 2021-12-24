// js 에서 this는 호출한 사람의 문맥을 나타낸다
// 누가 호출하느냐에 따라 this가 동적으로 결정된다

console.log(this); // this -> window

function simpleFunc() {
  console.log(this);
}

// 우리가 선언한 함수는 Window 객체에 등록이 된다
// 따라서 window.simpleFunc() 처럼 호출이 가능

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

// const a = 'a'
// window.a // error

// var b = 'b'
// window.b // 'b'

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

// 화살표함수를 사용하면 선언될 당시에 그 당시의 문맥 ,
// 그 당시 스코프의 this context를 유지한다
// 따라서 클래스 내부에 바인딩을 하고 싶은 함수가 있거나,
// 또는 this에 접근하는 함수가 있다면 화살표 함수를 쓰는 것이 더 좋을 수 있다

const counter2 = new Counter2();
const caller2 = counter2.increase;
console.log('caller2()');
// arrow function은 scope를 기억하기 때문에 Counter2가 출력된다
caller2();

const a = 'a';
let b = 'b';

// window.a 호출 불가
// window.b 호출 불가

var c = 'c';
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
