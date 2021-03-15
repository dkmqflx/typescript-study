
{

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
  }

  // 클래스는 관련있는 변수나 함수를 하나로 묶어주는 역할을 한다
  class CoffeeMaker{

    // BEANS_GRAMM_PER_SHOT는 한번만 정의되어
    // 만들어진 클래스들 사이에서 공유할 수 있는 변수
    // 따라서 메모리 낭비 막기위해 static으로 선언해준다
    static BEANS_GRAMM_PER_SHOT :number = 7 //class level
    // class level은 class와 연결되어 있기  때문에 
    // object마다 생성되지 않는다
    // 즉 static 변수는 class에서 만들어지는 인스턴스가 모두 공유하는 변수

    // object마다 만들어져야 하는 변수는 멤버변수로 선언
    coffeeBeans:number = 0; //instance (object) level

    // CoffeeMaker 인스턴스 만들면서 초기화한다
    constructor(coffeeBeans:number){
      this.coffeeBeans = coffeeBeans
    }

    // static 키워드는 함수에서도 적용된다
    // constructor 호출하지 않고 새로운 coffeeMachine 만들고 싶은 경우
    static makeMachine(coffeeBeans:number):CoffeeMaker{
      return new CoffeeMaker(coffeeBeans)
    }


    makeCoffee(shots:number):CoffeeCup{
      // 따라서 static 변수는 class 이름으로 접근한다
      if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT){
        throw new Error('Not enough coffee beans!')
      }
  
      this.coffeeBeans =- shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots, // key - value 이름 동일하면 생략가능
        hasMilk:false
      }

    }
  }

  const maker = new CoffeeMaker(32)
  console.log(maker)

  const maker2 = CoffeeMaker.makeMachine(10)
  console.log(maker2)

  Math.abs(1) // 이렇게 abs 함수 사용할 수 있는 것도 Math 안의 함수가 class level 함수이기 때문이다
}