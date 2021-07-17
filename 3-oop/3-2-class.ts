{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 클래스는 관련있는 변수나 함수를 하나로 묶어주는 역할을 한다
  class CoffeeMaker {
    // BEANS_GRAMM_PER_SHOT는 한번만 정의되어
    // 만들어진 클래스들 사이에서 공유할 수 있는 변수
    // 따라서 메모리 낭비 막기위해 static으로 선언해준다
    static BEANS_GRAMM_PER_SHOT: number = 7; //class level
    // class level은 class와 연결되어 있기  때문에
    // object마다 생성되지 않는다
    // 즉 static 변수는 class에서 만들어지는 인스턴스가 모두 공유하는 변수

    // object마다 만들어져야 하는 변수는 멤버변수로 선언
    coffeeBeans: number = 0; //instance (object) level

    // CoffeeMaker 인스턴스 만들면서 초기화한다
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
      // this는 클래스 안에 있는 것을 가르킨다
    }

    // static 키워드는 함수에서도 적용된다
    // constructor 호출하지 않고 새로운 coffeeMachine 만들고 싶은 경우
    // CoffeeMaker가 리턴 타입인 것을 통해 클래스도 하나의 타입이 될 수 있다는 것을 알 수 있다
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      // 따라서 static 변수는 class 이름으로 접근한다
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans = -shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots, // key - value 이름 동일하면 생략가능
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32);
  console.log(maker);

  const maker2 = CoffeeMaker.makeMachine(10);
  console.log(maker2);

  Math.abs(1); // 이렇게 abs 함수 사용할 수 있는 것도 Math 안의 함수가 class level 함수이기 때문이다

  //이 커피머신의 문제점
  // maker.coffeBeans = 3
  // 이처럼 외부에서 coffeBeans의 값을 바꿀 수 있다
  // maker.coffeBeans = -1 // invalid
  // 이렇게 마이너스로 값을 설정할 수 도 있다.
  // 따라서 캡슐화를 통해서 외부에서 보여지면 안되는 값을 설정할 수 있다

  // 1. static 값은 언제 초기화되는가?
  // ECMAScript, 엔진에서는 정확하게 어떻게 구현되어져 있는지 잘 모르겠으나,
  // 대게 Java와 같은 다른 프로그래밍 언어에서는 static 변수나 함수는 클래스가 로드 되고 링크가 완료 되는 시점에 초기값이 설정되어 져요,
  // 즉, 통상적으로 어플이 실행되고 끝날때까지 유지 된다고 볼 수 있겠네요

  // 2. static 값은 실무에서 어떻게 사용되는가?

  // 방문수, 글 작성 횟수등 다양한 상태값은 static으로 사용하지 않아요 :)
  // 제가 강의에서 설명해 드린 정말 변하지 않는 상수 값, 그리고 여러 오브제트(인스턴스)에 걸쳐서 사용될 수 있는
  // (즉, 오브젝트의 상태 데이터에 접근할 필요가 없는) 함수들이 있다면 그런것들은 static으로 사용한답니다.
}
