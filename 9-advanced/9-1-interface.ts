// 타입과 인터페이스는 성격도, 특징도 다르다




// 인터페이스는 어떤 것의 규격사항
// 객체와 객체간의 의사소통할 때 인터페이스를 통해 상호작용 한다
// 예를 들어 CoffeeMaker라는 인터페이스에 makeCoffee()라는 함수 있으면
// 이 함수를 각각 다른 클래스에서 정의해서 사용하는 것이다

// 따라서 이러한 경우에는 타입 대신 인터페이스를 쓴다 
// 즉 규격을 통해서 어떤 것이 구현된다면 타입 대신 인터페이스를 쓴다

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
  x:number;
  y:number;
}

interface positionInterface{
  x:number;
  y:number;
}



// object
// 타입과 인터페이스 둘다 오브젝트를 정의하고 타입을 할당할 수 있다
const obj1: PositionType = {
  x:1,
  y:1
}

const obj2: positionInterface = {
  x:1,
  y:1
}

// class
// 타입과 인터페이스 둘 다 클래스에서 구현할 수 있다
class Pos1 implements PositionType {
  x:number;
  y:number;
}

class Pos2 implements positionInterface {
  x:number;
  y:number;
}

// Extends

// 기존의 인터페이스에 z 추가
interface ZpositionInterface extends positionInterface{
  z:number
}

type ZpositionType = PositionType & {z:number}

// Only interfaces can be merged

// 아래처럼 z라는 변수 있는 동일한 이름의 인터페이스를 추가적으로 선언하면 z가 추가된다.
//  즉 x, y, z, 를 값으로 가지고 있다
// interface positionInterface{
//   z:number;
// }


// 타입은 불가능하다 
// tyoe PositionType {z : number} // error

// Type aliases can be computed properties
type Person = {
  name:string,
  age:number
}

type Name = Person['name'] // name이 가지고 있는 type을 쓴다

type NumberType = number;
type Direction = 'left' | 'right' // 이런 unition type은 인터페이스로 구현할 수 없다