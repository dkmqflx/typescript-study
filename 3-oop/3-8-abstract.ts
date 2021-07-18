{
  // 3-6-polymorphism과 비교

  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // abstract는 상속과 관련해서 조금 더 추상화를 활용할 수 있는 문법

  // 어떤 상속클래스를 이용할 때, 아래처럼 무언가 반복되는 클래스에서
  // 절차적으로 진행되는 것이 있고, 어떤 특정한 기능만 자식 클래스에서
  // 행동이 달라진다면 abstract 클래스를 만들어볼 수 있다

  // const machines2: CoffeeMaker[] = [
  //   new CaffeLatteMachine(16, "1"),
  //   new SweetCoffeeMaker(16),
  //   new CaffeLatteMachine(16, "1"),
  //   new SweetCoffeeMaker(16),
  // ];

  // abstract 키워드 있으면 CoffeeMachine그 자체로는 오브젝트를 만들 수 없는 추상적인 클래스이다
  // 공통적으로 사용되는 부분 있으면 구현해 놓고
  // 달라져야 하는 부분 있으면 abstrat 메소드로 선언해놓고 상속하는 클래스에서 구현한다

  // abstract vs interface

  /* 
  인터페이스에는 구현사항이 들어갈 수 없어요 :)
  속성과 행동의 타입만 정의해 놓는거죠.
  반대로 추상 클래스는 이번 영상에서 보시는것처럼 공통적으로 필요한 로직을 구현해놓을 수 있어요

  차이점

  인터페이스 === 규격사항
  추상 클래스 === 규격사항 + 필수 기능 구현

  공통점

  인터페이스, 추상클래스는 new 키워드를 이용해서 객체를 만들 수 없다!

  abstract 클래스를 사용하면, 꼭 super를 호출해야 한다! 이런 걱정 없이,
  abstract 으로 지정된 함수만 재정의해서 사용하면 되죠 :)

  abstract 클래스를 상속할때는 abstract 클래스에서 의도한 대로 
  최대한 abstract으로 지정된 함수들만 오버라이딩 해야 한답니다.

  오버라이딩은 부모 클래스에서 정의된 함수의 내용을 나에게 맞게 변경 할 수 있는

  너무나 유용한 방법이지만, 자칫 부모 클래스에서 의도적으로 작성된 코드를 그냥 잘못 덮어 씌워서

  의도치 않은, 일을 하게 되어버리는 수가 있어요 :)

  그래서! CoffeeMachine 처럼, 클래스 내부에서 수행되어야 하는 함수의 절차가 중요하거나,

  자식 클래스에서 달라져야 하는 행동이 명확한 경우에 abstract 클래스를 쓸 수 있어요

  4.19 Q&A 참고
  

  */

  // 3-6의 CoffeeMachine 클래스를 보면
  // 아래처럼 extract 부분에서, 설탕을 넣거나 또는 우유를 넣을 수 있다

  // makeCoffee(shots: number): CoffeeCup {
  //   this.grindBeans(shots); // 커피를 갈고
  //   this.preheat(); // 데운 다음
  //   return this.extract(shots); //내려준다
  // }

  // 3-6의 CaffeLatteMachine 클래스의 makeCoffee 함수는 다음과 같다

  // makeCoffee(shots: number): CoffeeCup {
  //  const coffee = super.makeCoffee(shots)
  //  this.steamMilk();
  //  return {...coffee, hasMilk:true};
  // }

  // 하지만 이 때, 아래처럼 부모생성자를 호출하지 않는 실수를 하거나
  // 자기마음대로 return 값을 설정해서 커피를 만들 수 있다

  // makeCoffee(shots: number): CoffeeCup {
  //  this.steamMilk();
  //  return {...coffee, hasMilk:true};
  // }

  // 이처럼 부모 클래스의super.makeCoffee가 호출 되지 않으면
  // CoffeeMachine에서 예상했던 절차들 grindBeans, preheat, extract 이 실수로 지켜지지 않을 수 있다

  // 이런 것들을 안전하게 하고 싶다면 abstract 클래스를 만들 수 있다
  // abstract 키워드 있으면 그 자체로는 오브젝트 만들수 없다.
  // abstract는 추상적인 클래스로, 공통의 기능들이 있다면 그러한 기능들을 구현할 수 있다
  // 그걸 구현하는 클래스마다 달라져야 하는 내용이 있다면 그 부분만 abstract 메소드로 정의할 수 있다

  // 인터페이스에서 함수의 규격을 정의한 것처럼 abstract 메소드에서는 함수 이름은 무엇인지
  // 어떤 인자를 받아서, 어떤 것을 리턴하는지에 관한 것들만 정의할 수 있다
  // 공통적으로 쓰이는 기능등은 내부에서만 필요한 것은 private으로,
  // 외부에서 호출할 수 있는 것은 public으로 한다

  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // abstract 때문에 오브젝트 만들수 없다. 따라서 에러 발생
    // static makeMachine(coffeeBeans:number):CoffeeMachine{
    //   return new CoffeeMachine(coffeeBeans)
    // }
    // abstract 클래스 그 자체는 만들어지는 것을 목적으로 하지 않는다

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

    // 자식 클래스마다 달라질 수 있는 행동있으면 앞에 abstract 붙여준다
    // 외부에서 접근할 수 없고 자식 클래스에서만 접근할 수 있게 protected 키워드 사용한다
    // 추상적인 메소드이기 때문에 구현사항을 작성하면 안된다
    // 즉, 추상 메소드는 구현사항 없다
    // 따라서 이 클래스를 상속하는 클래스에서 구현해야 한다
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피를 갈고
      this.preheat(); // 데운 다음
      return this.extract(shots); //내려준다
    }
  }

  // 우유가 들어가는 라떼를 만드는 커피머신
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      // 자식 클래스에서 생성자 구현할 대는 부모의 생성자를 호출해주어야 한다
      super(beans); // 부모 클래스에서 필요한 변수도 전달해준다
    }
    // 자식 클래스에서만 내부적으로 사용되는 함수
    private steamMilk(): void {
      console.log("Steaming soem Milk");
    }

    // 자식 클래스에서 abstract 함수 구현한다
    // 자식 클래스에서 protected 사용하는 이유는 ?

    /*
    abstract 클래스인 (최고 부모) CoffeeMachine에서 extract 함수가 protected이므로 
    이 abstract 클래스를 상속하는 자식 클래스에서는 extract함수는 public 
    아니면 protected으로 설정해야 해요. 
    private으로 설정하면 문법 에러가 발생하는것을 볼 수 있을거예요 :) 
    
    부모 클래스에서 이 함수는 모든 자식들이 볼 수 있는 함수다! 라고 정의하면 
    그것을 상속하는 클래스도 그 규칙을 따르거나 그것을 감쌀 수 있는 
    더 개방 (public) 적인 접근자를 써야 해요

    */
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  // 설탕이 들어가는 커피머신
  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  // 어떤 상속클래스를 이용할 때, 아래처럼 무언가 반복되는 클래스에서
  // 절차적으로 진행되는 것이 있고, 어떤 특정한 기능만 자식 클래스에서
  // 행동이 달라진다면 abstract 클래스를 만들어볼 수 있다
  const machines2: CoffeeMaker[] = [
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
  ];

  machines2.forEach((machine) => {
    console.log("--------------");
    machine.makeCoffee(1);
  });
}

/*
해당 강의영상에서 1:58 부분 설명에 대해서 여쭤보고 싶은게 있습니다!
Q: 
최상위 부모에서 만들어놓은  makeCoffee 메소드를 자식 클래스에서 super를 통해서 호출하지 않고, 
임의로 결과를 리턴하여  -> 부모 클래스에서 makeCoffee를 통해 하고자 했던 
예정된 절차( grindBeans, preHeat...) 를 자식 클래스에서는 실수로 놓칠 수도 있는
문제가 있다고 하셨습니다.
이를  abstract 클래스를 만들어서  해결하고자 하셨는데요!


강의를 통해서 완성된 코드를 보니까 제가 보았을 때는 
abstract를 사용하기는 했지만 결국에는 부모 클래스에서 커피를 추출( extract( ) )하기 
전에 하고자 했던 절차들( grindBeans, preHeat...)이 수행되지 않은 것 같더라구요!

✅ grindBeans, preHeat, extract등의 부모 클래스를 정의할 때 
자식 클래스에서 반드시 진행되기를 예상했던 메소드들은 
모두 abstract 처리를 해주어야하는 것 인가요??

(abstract를 통해서 하고자 한 것이 무엇인지는 잘 이해하였지만, 
뭔가 예시를 완벽하게 구현하지는 못한 것 같아서 이렇게 질물을 드립니다...!! 감사합니다^^)



A. 좋은 질문 주셨어요 👍

여기 토론창에 설명 드리면 너무 길어 져서 제가 코드 파일에다가 예제와 함께 설명해보았어요
abstract_explanation.ts.zip
위 첨부된 압축파일 푸시면, 제 설명 파일이 하나 나올거예요 :)
아래는 동일한 내용을 복사/붙여넣기한 내용입니다.



---------------------------------------------------------

// 자 이렇게 CoffeeMachine 클래스가 정의되어져 있어요.
// 그리고 CoffeeMachine를 상속 하는 LatteeMachine 있다고 해볼께요

class CoffeeMachine {

  grindBeans() {}

  preheat() {}

  extract() {}

  makeCoffee() {

    this.grindBeans();

    this.preheat();

    this.extract();

  }

}



// 이렇게 상속만 해놓고, 부모 클래스의 함수를 재정의(오버라이딩) 하지 않으면
// 그냥 부모 클래스에서 구현된 함수 그대로를 사용하게 되요.

class LatteMachine extends CoffeeMachine {}


// 이렇게 호출하면 CoffeeMachine 클래스의 makeCoffee 함수가 구현되어져 있는대로
// makeCoffee 함수가 호출되면
// 함수 내부에서 순차적으로 grindBeans → preheat → extract 함수를 호출하게 되죠.

const machine = new LatteMachine();

machine.makeCoffee();


// 이제, 아래와 같이 LatteMachine에서 makeCoffee 함수를 오버라이딩 해주면
// 자식 클래스에서 부모클래스에 있는 함수를 재정의 하는 순간! 그 함수를 호출하면
// 자식 클래스에서 구현한 함수의 코드가 실행이 되어져요.
// 지금 구현된 대로는, makeCoffee() 함수를 호출하면 아무것도 일어 나지 않아요. (빈코드죠?)
// 더이상 grindBeans → preheat → extract 함수가 호출되지 않아요.

class LatteMachine extends CoffeeMachine {

  makeCoffee() {} // 부모 클래스에 정의되어져 있는 함수를 여기서 다시 재정의 함.

}


// 부모 클래스에서 정의된 함수에서 무언가 수정을 조금 하면서,
// 여전히! 부모 클래스에서 정의된 함수의 행동을 그대로 가져 가고 싶다면
// 항상 super를 이용해서 부모 클래스의 함수를 호출해줘야 해요. 아래처럼요 :)
// 그럼 super.makeCoffee() 함수를 호출하는 순간! 부모, CoffeeMachine 클래스에 정의된
// makeCoffee 함수의 코드 내용들이 수행되어 지죠 (grindBeans → preheat → extract)

class LatteMachine extends CoffeeMachine {

  makeCoffee() {

    super.makeCoffee();

  }

}


// 🚨 이처럼, 오버라이딩은 부모 클래스에서 정의된 함수의 내용을 나에게 맞게 변경 할 수 있는
// 너무나 유용한 방법이지만, 자칫 부모 클래스에서 의도적으로 작성된 코드를 그냥 잘못 덮어 씌워서
// 의도치 않은, 일을 하게 되어버리는 수가 있어요 :)
// 그래서! CoffeeMachine 처럼, 클래스 내부에서 수행되어야 하는 함수의 절차가 중요하거나,
// 자식 클래스에서 달라져야 하는 행동이 명확한 경우에 abstract 클래스를 쓸 수 있어요



// 예를 들면

abstract class GoogleDoc {

  private header() {

    console.log('header');

  }

  protected abstract body(): void;

  private footer() {

    console.log('footer');

  }

  public write() {

    this.header();

    this.body();

    this.footer();

  }

}로

// 위 Document 클래스를 보면 무엇이 보이시나요?
// 아, 이 클래스는 꼭 상속을 해서 클래스를 정의 해야 하는거군
// header와 footer는 정해져 있고

// body 함수만 자식 클래스들이 원하는대로 작성하면 되는구나 :)
// 그리고 write이라는 유일한 public 함수는 header  → body  → footer 순으로 호출해주는군 :)

// 그럼 이제 아래와 같은 클래스를 만들 수 있겠죠?

class SimpleDocument extends GoogleDoc {

  protected body(): void {

    console.log('body');

  }

}

const doc = new SimpleDocument();
doc.write(); // header, body, footer 를 출력할거예요.



// 이런 클래스도 만들 수 있겠죠?

class FancyDocument extends GoogleDoc {

  protected body(): void {

    console.log('✨body✨');

  }

}

const fancyDoc = new FancyDocument();
fancyDoc.write(); // header, ✨body✨, footer 를 출력할거예요.



// 이처럼 abstract 클래스를 사용하면, 꼭 super를 호출해야 한다! 이런 걱정 없이,
// abstract 으로 지정된 함수만 재정의해서 사용하면 되죠 :)


*/
