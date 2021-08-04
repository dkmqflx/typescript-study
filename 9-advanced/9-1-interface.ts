/*

Type alias vs interface

타입과 인터페이스는 성격도, 특징도 다르다

인터페이스는 어떤 것의 규격사항
객체와 객체간의 의사소통할 때 인터페이스를 통해 상호작용 한다
즉 서로간의 계약서와 같다
예를 들어 CoffeeMaker라는 인터페이스에 makeCoffee()라는 함수 있으면
이 함수를 각각 다른 클래스에서 정의해서 사용하는 것이다

따라서 이러한 경우에는 타입 대신 인터페이스를 쓴다 
즉 규격을 통해서 어떤 것이 구현된다면 타입 대신 인터페이스를 쓴다

*/

// wrong
// type CoffeeMaker = {
//   coffeeBeans:number
//   makeCoffee:(shots:number) => Coffee;
// }

// right
// interface CoffeeMaker {
//   coffeeBeans:number
//   makeCoffee:(shots:number) => Coffee;
// }

// class CoffeeMachine implements CoffeeMaker {
//   coffeeBeans:number
//   makeCoffee:(shots:number) {
//     return {}
//   }
// }

// 타입은 어떠한 데이터를 담을 수 있을지 결정할 때 사용한다
// 따라서 아래와 같은 경우,
// position을 구현할 것이 있는 것이 아니라 데이터를 담을 목적으로 만들어졌기 때문이다

// 이전에는 type alias가 강력하지 않았지만 이제는 강력하므로 타입 사용한다

// wrong
// interface Position{
//   x:number;
//   y:number;
// }

// right
// type Position = {
//   x:number;
//   y:number;
// }

// const pos:Position{x:0, y:0}

type PositionType = {
  x: number;
  y: number;
};

interface positionInterface {
  x: number;
  y: number;
}

// object
// 타입과 인터페이스 둘다 오브젝트를 정의하고 타입을 할당할 수 있다
const obj1: PositionType = {
  x: 1,
  y: 1,
};

const obj2: positionInterface = {
  x: 1,
  y: 1,
};

// class
// 타입과 인터페이스 둘 다 클래스에서 구현할 수 있다
class Pos1 implements PositionType {
  x: number;
  y: number;
}

class Pos2 implements positionInterface {
  x: number;
  y: number;
}

// Extends
// 타입과 인터페이스 둘다 extesnds, 확장도 가능하다
// 기존의 인터페이스에 z 추가
// 기존의 인터페이스를 확장할 수 있다
interface ZpositionInterface extends positionInterface {
  z: number;
}

// intersection을 사용해서 두가지를 묶은 타입을 만들 수 있다
type ZpositionType = PositionType & { z: number };

// Only interfaces can be merged
// 오직 인터페이스만 결합될 수 있다

// 아래처럼 z라는 변수 있는 동일한 이름의 인터페이스를 추가적으로 선언하면 z가 추가된다.
//  즉 x, y, z, 를 값으로 가지고 있다
// interface positionInterface{
//   z:number;
// }

// 타입은 불가능하다
// type PositionType {z : number} // error

// Type aliases can be computed properties
// 대신 타입은 조금 더 유틸리티나, 맵 타입 또는 인덱스타입도 가능하다
type Person = {
  name: string;
  age: number;
};

type Name = Person["name"]; // name이 가지고 있는 type을 쓴다, string 타입이 된다

type NumberType = number; // NumberType이라는 새로운 타입
type Direction = "left" | "right"; // 이런 unition type은 인터페이스로 구현할 수 없다

/*
Q. react의 prop과 state의 타입 선언시에는 어떤 것을 써야할까요?


A. 
Props과 State를 interface를 쓰느냐 type을 쓰느냐, 많은 분들이 다르게 사용하고 계시는것 같더라구요 :)

강의에서 제가 언급한 타입과 인터페이스의 차이점과 같은 이유로,

저는 타입(type)이 더 Props과 State에 사용하기게 적합하다고 생각해요.


강의에서 언급한 내용 외에도, 그냥 문장으로만 놓고 봐도:

이 컴포넌트에 전달할 수 있는 Props 타입으로는 이 타입이다. (🙆‍♀️)

이 컴포넌트에 전달할 수 있는 Props 타입으로는 이 인터페이스이다. (❓)


이 클래스는 이 인터페이스를 구현한다 (🙆‍♀️)

이 클래스는 이 타입을 구현한다 (❓)



제 어감이 잘 전달 되었으면 좋겠어요 하하
*/
