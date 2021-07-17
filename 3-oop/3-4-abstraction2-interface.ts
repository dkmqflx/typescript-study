{
  // 인터페이스를 사용해서 추상화하는 방법

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 인터페이스는 나랑 의사소통하려면 이러한 규칙을 가지고 있다는 것을 명시해놓는 계약서 같은 것
  // 인터페이스를 사용함녀 추상화를 극대화 할 수 있다

  // 인터페이스와 클래스 이름을 만들 때,
  // 인터페이스라면 무조건 앞에 I라는 prefix를 붙이거나
  // 또는 인터페이스에는 I를 붙이지 않고 구현하는 클래스에서 그에 맞는 이름을 지정하거나
  // 맨 뒤에 Implement라고 붙이는 경우가 있다 (ex.CoffeeMakerImpl)

  // 인터페이스는 외부적으로 사용하는 이름이기 때문에 최대한 간단하게 하고
  // 구현하는 클래스에서 다른 이름을 가져가는 것이 좋다고 생각한다
  // 일반 커피메이커
  // 이 인터페이스를 사용하면 makeCoffee 라는 함수를 이용할 수 있다
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 상업용 커피메이커
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void; // 커피 콩을 채우는 함수
    clean(): void; // 기계를 청소하는 함수
  }

  // CoffeeMachine 클래스는 CoffeeMaker 인터페이스를 구현하는 클래스이다
  // 여러가지 인터페이스를 구현할 수 있다
  // 따라서 인터페이스에 정의된 메소드를 구현해야한다
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    // CommercialCoffeeMaker의 메소드 구현
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans = beans;
    }

    // CommercialCoffeeMaker의 메소드 구현
    clean() {
      console.log("cleaning th machine...");
    }

    // 클래스 내부적으로 구현한 메소드
    // 커피를 갈아준다
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans = -shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    // 클래스 내부적으로 구현한 메소드
    private preheat(): void {
      console.log("heating up ... ");
    }

    // 클래스 내부적으로 구현한 메소드
    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots`);
      return { shots, hasMilk: false };
    }

    // CoffeeMaker, CommercialCoffeeMaker 동시에 정의되어 있는 메소드
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피를 갈고
      this.preheat(); // 데운 다음
      return this.extract(shots); //내려준다
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  // CoffeeMachine은 CoffeeMaker를 구현했기 때문에 CoffeeMachine은 CoffeeMaker와 동일하다
  // 인터페이스로 타입을 제한해서 받게 되면 인터페이스에 정의된 메소드만 사용할 수 있다 -> 추상화 극대화 할 수 있다
  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  maker2.makeCoffee(2);
  // maker2.fillCoffeeBeans(32), error 하지만 인터페이스에 정의되어 있지 않은 함수 사용할 수 없다

  // CommercialCoffeeMaker에 정의된 함수 사용할 수 있다
  const maker3: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker3.fillCoffeeBeans(32);
  maker3.makeCoffee(2);
  maker3.clean();

  class AmatuerUser {
    // CoffeeMaker를 생성자의 인자로 받아 커피를 만드는 것 밖에 할 수 없다.
    // CoffeeMaker 인스턴스를 인자로 받는다
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      // CoffeeMaker에 정의된 함수 밖에 사용할 수 없다
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    // CommercialCoffeeMaker의 메소드를 사용해서 여러가지 할 수 있다
    constructor(private machine: CommercialCoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  // 같은 CoffeeMachine를 생성자의 인자로 받아오더라도
  // 생성자의 타입이 제한되기 때문에
  // 서로 인터페이스에 규약된 함수만 사용할 수 있다
  const amatuer = new AmatuerUser(maker);
  const pro = new ProBarista(maker);

  //동일한 함수 호출하더라도 서로 다른 결과가 출력된다
  amatuer.makeCoffee();
  pro.makeCoffee();

  // 이렇게 인터페이스 사용하면 동일한 함수 호출하더라도 다른 내용 출력할 수 있다
  // 복잡한 함수 말고 필요한 함수만 제공되며
  // 그리고 함수를 사용할 때  그 함수가 어떻게 내부적으로 구현되었는지는 알 필요가 없다
}
