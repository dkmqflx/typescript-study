/*
JS도 엄밀히 말하면 객체지향 프로그래밍 언어 
프로토타입을 기반으로 해서 객체지향 프로그래밍을 할 수 있기 때문
그리고 ES6의 클래스도 이 프로토타입을 기밤으로 한다 

TS에서 작성하는 클래스나 인터페이스도 컴파일러를 이용해서 자바스크립트로 변환하면
결국 다 프로토타입으로 변환이 된다

프로토타입은 상속을 위해 쓰인다
클래스에서 속성과 함수를 정의한 것 처럼 
마찬가지로 동일하게 반복적으로 쓸 수 있도록 속성과 함수들을 정의하는 것 

Prototype-based Programming이란 

a style of OOP
객체지향 프로그래밍을 할 수 있는 한 가지의 방식으로서 

behavior reuse (inheritance)

by reusing existing objects

프로토타입을 기반으로한 프로그래밍언어라는 것은 
바로 행동들을 재사용할 수 있고, 기존에 있는 오브젝트를 재사용할 수 있는 것인데 

that serve as prototype
그것을 바로 프로토타입을 이용해서 하는 것이다
*/

const x = {};
const y = {};
console.log(x);
console.log(y);
// 두 객체를 출력해보면 __proto__라는 것이 있다
// 그리고 __proto__는 Object
// 이를 통해서 자바스크립트의 모든 오브젝트는 __proto__라는 오브젝트를 상속하는 것을 알 수 있다

// x 안에 아무것도 없지만 아래 toString 사용할 수 있다
// 그 이유는 __proto__ 안에 오브젝트에서 사용할 수 있는 기본적인 함수가 있기 때문
console.log(x.toString());

// 둘다 동일한 Object의 프로토타입을 상속하고 있기 때문
console.log(x.__proto__ === y.__proto__); // true

const array = [];
console.log(array);
// 배열안에도 __proto__있고 __proto__:Array(0) 으로
// 배열의 프로토타입을 가리키고 있는 것을 알 수 있다
// 따라서 배열의 다양한 함수, pop, push 등을 사용할 수 있다
// 그리고 Array 프로토타입 안에는 __proto__;Object를 확인할 수 있는데
// 이를 통해서 자바스크립트의 모든 오브젝트는 Object 프로토타입을 상속하는 것을 알 수 있다

console.clear();

function CoffeeMachine1(beans) {
  this.beans = beans;
  // instance memeber Level
  // 아래처럼 함수를 정의하면 만들어지는 모든 인스턴스마다 포함된다

  this.makeCoffee = (shots) => {
    console.log('making...');
  };
}

const machine1 = new CoffeeMachine1(10);
console.log(machine1);

// 위 함수처럼 정의하고 console.log()로 출력해보면 아래처럼 출력된다
// beans:10
// makeCoffee:shots =>
// __proto__:Object

// Prototype member level
// makeCoffee를 한번만 정의하고 싶은 경우
// console에서 __proto__에서 함수를 확인할 수 있다

function CoffeeMachine(beans) {
  this.beans = beans;
}

CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making2...');
};
const machine = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine2);
// 만들어진 object안에는 makeCoffee가 더 이상 없다
//__proto__ 확인하면 Object 상속하는 것 알 수 있다
/*
beans:20
// CoffeeMachine 의 프로토타입에 makeCoffee 함수가 정의되었다
[Prototype]]: Object
  makeCoffee: (shots) => { console.log("making2..."); }
  constructor: ƒ CoffeeMachine(beans)
  // 그리고 이 프로토타입은 Object 프로토타입을 상속한다
  [[Prototype]]: Object
*/

function LatteMachine(milk) {
  this.milk = milk;
}

// LatteMachine은 CoffeeMachine을 상속하고 CoffeeMachin은 Object를 상속한다
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

const latteMachine = new LatteMachine(123);
console.log(latteMachine);
// 따라서 CoffeeMachin의 makeCoffee을 사용할 수 있다
latteMachine.makeCoffee();

/*
Q.constructor 질문

mdn에서 object.create를 찾아보니 이렇게 작성하는 것 같아 조금 찾아봤습니다. 

LatteMachine.prototype.constructor = LatteMachine; 
이 로직이 없으면 LatteMachine.prototype에서 constructor가 증발해버리고 
CoffeeMachine의 constructor가 적용되는것 같은데 이 부분은 자바스크립트 오류인건가요? 

아니면 LatteMachine.prototype에 값을 넘겨주면서 안에 있던 값들이 넘겨주는 값들로
 대체하면서 constructor가 사라진거고 그냥 그 값을 다시 정의해줘야 되는 것일까요


 A. 아, 너무 좋은 질문이예요 👍

실제로 prototype을 이용해서 상속을 구현할 일이 없기 때문에, 
컨셉 설명을 위해서 대략적인 내용만 다루었구요. 
실제로 prototype을 이용해서 상속/객체지향을 구현하려면 
훨씬 더 깊이 있게 자바스크립트에 대해 알아두어야 해요 :)

(안그러면 나도 모르게 여기 저기서 🐛 버그들이....)



다행히 es6이후에 class 문법을 이용할 수 있고, 또 타입스크립트에서는 더 막강하게 
class +interface를 이용하기 떄문에 prototype은 쓸일이 영원히~ 없었으면 좋겠어요.


질문주신 constructor 설정하는 부분은 필수 사항은 아닌데, 
실제 제품 개발용으로 작성하는 코드라면 써주는게 좋다고 생각해요.
쓴것과 쓰지 않는 것의 차이점은 여기 채택된 답변의 예제 코드를 한번 보시면 
이해가 잘 되실거예요 :)

https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor


*/
