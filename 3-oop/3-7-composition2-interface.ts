{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
  };

  // 인터페이스를 통해서 클래스 간에 상호작용 하도록 한다
  // 이것이 decoupling의 원칙

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

  // 즉, 우유와 설탕 만드는 인터페이스를 정의하고 난 다음
  // 해당 인터페이스를 구현한 클래스를 기능별로 만들어준다
  // 각각의 정해진 인터페이스, 즉, 계약서 규격 상황에 맞는 함수를 구현한 클래스이다

  // 우유 만들기 위한 인터페이스
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  // 앞의 3-7처럼 그냥 클래스가 아닌, 인터페이스를 구현하는 클래스
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Steaming soem Milk");
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk;
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 비싼 우유 거품기
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Fancy teaming soem Milk");
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk;
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 차가운  우유 거품기
  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Cold teaming soem Milk");
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk;
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 만들기 위한 인터페이스
  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 사탕에서 설탕 받아오는 슈가 믹서
  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      console.log("Getting some suger from jar");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar(); // 설탕을 받아온다
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // 제대로된 슈가 믹서
  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log("Getting some suger from jar!!!!");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar(); // 설탕을 받아온다
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // 우유 들어간 라떼만든다
  class CaffeLatteMachine extends CoffeeMachine {
    // 필요한 것을 외부에서 주입받아서 가져온다 -> Dependency Injection
    // 클래스를 맏아오는 것이 아니라 *인터페이스*를 받아온다
    // 클래스 간에 coupling 되어 있는 것이 아니라 인터페이스를 통해서 decoupling 해서 의사소통한다
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: MilkFrother
    ) {
      super(beans);
    }

    // 오버라이딩
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // 우유를 추가해서 새로운 CoffeeCup을 리턴한다
      return this.milkFrother.makeMilk(coffee);
    }
  }

  // 설탕 커피만든다
  class SweetCoffeeMaker extends CoffeeMachine {
    // 클래스를 맏아오는 것이 아니라 인터페이스를 받아온다
    constructor(private beans: number, private sugar: SugarProvider) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 우유와 설탕 모두 들어간 커피 만든다
  class SweetCaffeLatteMachine extends CoffeeMachine {
    // 필요한 기능을 외부에서 가져온다
    // 클래스를 맏아오는 것이 아니라 인터페이스를 받아온다
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();

  // 인터페이스를 구현한 클래스를 Dependency injection으로 전달해주고
  // 그 클래스는 인터페이스 타입으로 전달받는다
  // 내가 원하는 방식으로 서로다른 객체를 만들 수 있다

  // 3-7의 SweetCoffeeMaker와 달리, 다양한 클래스를 전달받을 수 있다
  // 생성자를 보면 인터페이스를 전달받도록 했기 때문에
  // 어떠한 우유 제조기와 설탕 메이커가 전달되는지 알 필요가 없이 사용할 수 있다
  const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  const sweetMachine = new SweetCoffeeMaker(12, sugar);

  const latteMachine = new CaffeLatteMachine(12, "SS", cheapMilkMaker);
  const ColdLatteMachine = new CaffeLatteMachine(12, "SS", fancyMilkMaker);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    coldMilkMaker,
    candySugar
  );
}
