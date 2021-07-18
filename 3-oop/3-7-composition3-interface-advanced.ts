{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
  };

  // 3-7-composition-interface 보면 너무 많은 커피머신 만드는데 이렇게 할 필요 없다
  // 즉, MilkFrother, SugarProvider 인터페이스 정의 후에는 아래처럼

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // CaffeLatteMachine, SweetCoffeeMaker, SweetCaffeLatteMachine 다 필요 없이
  // 이 커피머신 하나만 있으면 된다
  // CoffeeMachine에서 MilkFrother, SugarProvider를 전달받는다
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 여기서 전달받은 MilkFrother와 SugarProvider에 따라 기능이 결정된다
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = beans;
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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee); // 설탕 추가
      return this.milk.makeMilk(sugarAdded); // 우유추가
    }
  }

  // 우유 만들기 위한 인터페이스
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
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

  // 우유를 만들지 않고 아무것도 하지 않고 리턴
  class NoMilk implements MilkFrother {
    // hasMilk를 true로 하지 않고, 전달받은 CoffeeCup을 그대로 리턴
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
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

  // 설탕 없다
  class NoSugar implements SugarProvider {
    // 아무것도 하지 않고 리턴한다
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  // 내가 원하는 방식으로 서로다른 객체를 만들 수 있다

  // 우유만 들어간 커피
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  // 설탕만 들어간 커피
  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const ColdLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);

  // 우유와 설탕 모두 들어간 커피
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);

  // 상속도 필요한 경우도 있다
  // 다만 상속으로인해 너무 수직적인 관계를 가지고 있지는 않은지 , 상속이 너무 깊지는 않는지
  // 컴포지션으로 해결할 수 없을지 고민한다

  // 여기서 주의할 점은 오버엔지니어링 하지 말 것
  //  타이트 한 일정 내에 어떤 기능을 구현해야 되면 그 기능을 구현하는데 초점을 두어야 하는데
  // 이 코드를 어떻게 하면 조금 더 개선할 수 있을까, 여기에 너무 시간을 투자 하거나
  // 아픙로 발생하지 않을 상황에 대비해서 이 확장성만 고려해서 코드를 복잡하게 디자인 할 필요느 없다
  // 어느 정도의 중간점을 잘 지키면서 코딩해나가는 거도 개발자의 센스
}

// 그리고 제가 궁금한 점은 인터페이스 대신 타입으로 하면 굳이 인터페이스를 써야하는지 입니다..!

// type what=CheapMilkSteamer|FancyMilkSteamer;

//  class CheapMilkSteamer{
//        makemilk(cup:CoffeCup):CoffeCup{...//},
//       private steamMilk(){.../}

// class FancyMilkSteamer{
//        makemilk(cup:CoffeCup):CoffeCup{...//},
//        private steamMilk(){.../}
// }

// class CaffeLatteMachine extends CoffeeMachine{
//   constructor(beans:number ,public readonly  serialNumber:string, private milkFrother:what)
//  makemilk(cup:CoffeCup):CoffeCup{...
//}

// ....//

// }

// 이렇게 하면 최악의 코드인가요...?

// 자, 이렇게 정의해 놓았어요. 그리고 프로젝트 곳곳에서 What에 FancyMilkSteamer를 전달했다고 가정해 볼께요.
// 그리고 시간이 흘러서 FancyMilkSteamer의 큰 결함으로 프로젝트에서 제거 하기로 가정했어요. 그러면 우리가 해줘야 하는 일들이 뭐가 있을까요? 코드가 수정되어야 하는 영역을 검토해 보면:

// 1. FancyMilkSteamer 삭제
// 2. What type에서 FancyMilkSteamer 삭제
// 3. What 타입을 인자로 쓰는 모든 곳을 찾아 다니면서 (또는 컴파일 에러가 발생한 곳을 찾아 다니면서) FancyMilkSteamer 이 전달되는 부분을 다른것으로 수정

// 케이스별로 타입이 유용한 경우도 있겠지만,
// 다형성과 확장성을 위해서 인터페이스가 더 좋다고 생각해요 :)

// 인터페이스를 알겠으나 모르겠는 느낌이네요..큐ㅠㅠ

// 비유를 해보면..
// 전원 클러그를 구현하기 위해서, 너가 전원 플러그라고 주장하기 위해서는
// 우리가 규격한 (사회에서 가정집에서 사용할 수 있도록 마련된 내용) 사항들을

// 즉, 220v 지원하고 플러그를 꼽고, 빼고 이런 동작들이 될 수 있게,
// 이 인터페이스, 규격을 따라야 해! 라고 정의할 수 있어요

// 그리고 이런 인터페이스(규격)을 따른 어떤 전원 플러그 제품도 사용하는 사람들이
// 어떤 제조사가 만들었냐에 상관없이 사용할 수 있죠 :)

// 타입이라고 하는것은
// USB-A 타입; 특징들
// USB-C 타입: 특징들
