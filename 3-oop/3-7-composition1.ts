{
  // 상속의 관계가 깊어질 수록 서로간의 관계가 복잡해진다

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
  };

  // CaffeLatteMachine은 CoffeeMachine을 상속하고 우유를 추가할 수 있다
  // SweetCoffeeMaker은 CoffeeMachine을 상속하고 설탕을 추가할 수 있다
  // 우유와 설탕이 모두 들어간 커피를 만들기 위해서는 ?

  // 상속을 이용하게 되면 구조를 어떻게 잡아야 할지 고민해야 한다
  // 우유와 설탕을 동시에 상속할 수 있는 클래스를 만들면 된다 라고 생각할 수 있지만
  // 이러한 케이스 이외에도
  // 그냥 우유가 아닌 차가운 우유, 설탕도 흑설탕이 들어가고 싶은 것을 만들고 싶은 경우에는?
  // 새로운 차가운 우유를 위한 클래스, 흑설탕을 위한 클래스도 만들고 이를 상속해야 하나 ?

  // 상속은 수직적 관계를 갖는다
  // 따라서 상속의 치명적 문제는  내가 상속하는 부모를 수정하면, 해당 부모를 상속하는 모든 자식 클래스에 영향을 미친다
  // 또한 위에서 언급한 것 처럼 새로운 기능을 도입하려고 할 때 어떻게 상속의 구조를 가져와야 하는지 고민해야 하고
  // 구조가 복잡해 질 수 있는 단점있다
  // 또한 TS에는 한가지 이상의 부모클래스를 상속할 수 없다
  // class SweetCaffeLatteMachine extends SweetCoffeeMaker, CaffeLatteMachine{} 이런식 불가능
  // 따라서 TS에서는 composition  사용한다

  // Favor COMPOSITION over inheritance, 상속보다 컴포지션을 선호하라
  // 여기서 COMPOSITION은 구성요소를 의미한다.
  // 컴포지션을 필요한 것을 가져와서 조립해나가는 것

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 생성자가 private이면 해당 클래스를 상속할 수 없다
    // 따라서 public이나 protected로 사용한다
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans = beans;
    }

    clean() {
      console.log("cleaning th machine...");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans = -shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up ... ");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots`);
      return { shots, hasMilk: false };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피를 갈고
      this.preheat(); // 데운 다음
      return this.extract(shots); //내려준다
    }
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log("Steaming soem Milk");
    }

    // 외부에서는 이 함수를 사용한다
    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup: CoffeeCup): CoffeeCup {
      // CaffeLatteMachine와 달리 super 없다.
      this.steamMilk; // 우유 거품을 낸다
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  class CandySugarMixer {
    private getSugar() {
      console.log("Getting some suger from jar");
      return true;
    }

    // CoffeeCup을 받아서 설탕을 추가해서 다시 리턴해준다
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar(); // 설탕을 받아온다
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // 설탕을 넣고 우유를 추가하는 것을 각각의 클래스에 구현하는 것이 아니라
  // 기능별로 별도의 클래스로 구현한 다음 필요한 곳에서 가져다가 사용한다 -> composition

  // 우유 들어간 라떼만든다
  // 3-7-composition의 CaffeLatteMachine와 비교해본다
  class CaffeLatteMachine extends CoffeeMachine {
    // 필요한 것을 외부에서 주입받아서 가져온다 -> Dependency Injection
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer // private 때문에클래스 멤버변수가 된다
    ) {
      super(beans);
    }

    // 오버라이딩
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // 우유를 추가해서 새로운 CoffeeCup을 리턴한다
      // 이 때, 3-7-composition의 CaffeLatteMachine와 달리
      // 내부적으로 구현되어있는 것이 아니라 Dependency Injection을 통해 외부에서 가져온다
      return this.milkFrother.makeMilk(coffee);
    }
  }

  // 설탕 커피만든다
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(beans: number, private sugar: CandySugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 이처럼 각각의 클래스에서 필요한 것을 매번 구현하는 것이 아니라
  // 외부에서 만들어진, 우유와 설탕을 넣는 클래스를 구현한 것을 따로 클래스를 만들어둠으로써
  // 필요한 곳에서 사용한느 컴포지션으로 구현했다
  // 컴포지션은 코드의 재사용성을 굉장히 높혀준다

  // 우유와 설탕 모두 들어간 커피 만드는 것도 쉽게할 수 있다
  class SweetCaffeLatteMachine extends CoffeeMachine {
    // 필요한 기능을 외부에서 가져온다
    // 그리고 milk와 sugar가 내부적으로 어떻게 작동하는지는 알지 못해도 사용할 수 있다
    // 이러한 compositoin은 코드의 재사용성을 굉장히 높혀준다
    constructor(
      beans: number,
      private milk: CheapMilkSteamer,
      private sugar: CandySugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee); // 설탕 추가
      return this.milk.makeMilk(sugarAdded); // 우유 추가
    }
  }

  // 이러한 composition 의 단점으로는 CaffeLatteMachine, SweetCoffeeMaker, SweetCaffeLatteMachine
  // 세 클래스는 CheapMilkSteamer, CandySugarMixer 와 밀접하게 연결되어 있다
  // 즉, 밀접하게 coupling되어 있다
  // CaffeLatteMachine, SweetCoffeeMaker, SweetCaffeLatteMachine 의 생성자롤 브면
  // 각각 Dependency Injection으로 전달받을 수 있는 클래스가 한정되어 있다.
  // 그 말은 세 클래스는 CheapMilkSteamer, CandySugarMixer 을 사용해야 한다.

  // 즉, 내가 다른 우유 제조기나 슈가믹서를 만들어서 사용하는 경우에는
  // 이 클래스들에 있는 우유 제조기, 슈가 믹서를 업데이트 해주어야 한다
  // 클래스와 클래스 사이를 관계짓는 것, 잘 알게하는 것은 좋지 않다
  // 즉, SweetCaffeLatteMachine 입장에서는 우유가 어떻게 만들어지고 설탕이 어디서 오는지 알 필요 없이
  // 우유 거품기와 설탕을 사용할 수 있도록 해야 한다

  const cheapMilkMaker = new CheapMilkSteamer();
  const candySugar = new CandySugarMixer();

  // 아래보면 재사용성이 굉장히 떨어진다
  // 다른 설탕, 다른 우유 메이커를 사용할 수 없다
  const sweetMachine = new SweetCoffeeMaker(12, candySugar);
  const latteMachine = new CaffeLatteMachine(12, "SS", cheapMilkMaker);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar
  );

  // 클래스 사이에 상호작용하는, 대화하는 경우에는 클래스 자신을 노출하는 것이 아니라
  // 계약서에 의거해서 의사소통을 해야한다
  // 계약서는 인터페이스이다
  // 즉, 인터페이스를 통해 서로간에 상호작용을 하도록 한다
  // 이것이 바로 decoupling의 원칙
}

// overload: 동일한 이름으로 여러개의 함수 정의가 있을때 (보통 인자들이 다름)

// concat(item: T);
// concat(items: T[]);

// override: 자식 클래스에서 부모 클래스의 함수를 재정의/구현 할때

// class Parent {
//    add() { ..... }
// }

// class Child extends Parent {
//    add() { ..... }. // overriding
// }

// composition 과 dependancy injection
// 이 둘은 외부에서 의존성을 주입받는 같은 개념인가요? 같은말? 인가요?

// 함께 쓰이는 기술 이긴 하지만, 같은 개념은 아니예요 :)

// class CoffeeMachine {

//   private sugar: Sugar;
//   constructor() {
//       this.sugar = new Sugar();
//   }
// }

// 여기 CoffeeMachine도 컴포지션을 사용해서 설탕을 함께 조립해서 사용하지만,
// 외부에서 설탕을 주입 받은것이 아니라, 내부에서 만들어서 사용하죠? :)
