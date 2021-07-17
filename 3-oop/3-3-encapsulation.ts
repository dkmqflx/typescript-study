{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 정보은닉 방법
  // public
  // private
  // protected

  class CoffeeMaker {
    // 따로 선언안하면 public
    // 내가 몇개의 BEAN으로 커피를 만드는지 보여주고 싶지 않기 때문에 private 선언
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 아래처럼 static을 사용해서 오브젝트를 만드는 함수를 제공하는 경우
    // 생성자를 사용해서 오브젝트를 사용하지 않도록 private 키워드를 붙여서
    // static 메소드를 사용하도록 권장한다
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 커피 메이커를 만든느 static 메소드
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // public이라 명시하지 않아도 public이다

    // 커피를 채워준다
    // 외부에서 직접적으로 커피를 채워주는 것이 아니라, 설정한 함수를 통해서 커피를 채워줄 수 있다
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        // 에러 메시지 친절하게 작성할수록 좋다
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans = beans;
    }

    // 커피를 만드는 메소드
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans = -shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  // const maker = new CoffeeMaker(10), 생성자 함수 private이므로 에러 발생

  // 머피머신 만들고
  const maker = CoffeeMaker.makeMachine(32);

  // 커피 원두를 채워준다
  maker.fillCoffeeBeans(40);
  console.log(maker);

  const maker2 = CoffeeMaker.makeMachine(10);
  console.log(maker2);

  // -----------------

  class User {
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = `${firstName} ${lastName}`;
    }
  }

  const user = new User("steve", "Jobs");
  console.log(user.fullName);

  // firstName 값을 수정한 다음 fullName을 출력해보면 firstName 값이 변경되지 않고 steve Jobs 출력된다
  user.firstName = "kim";
  console.log(user.fullName);
  // 값을 설정하는 부분이 생성자에만 있기 때문이다
  // 이러한 경우에 getter가 유용하게 사용될 수 있다

  class UserGetter {
    firstName: string;
    lastName: string;
    // fullName에 접근할 때 마다 세로운 데이터를 만들고 계산할 수 있다
    // 즉, 호출한 시점에 firstName과 lastName을 결합할 수 있다
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  const userGetter = new UserGetter("steve", "Jobs");
  console.log(userGetter.fullName);

  // firstName 값이 변경되어 kim jobs가 출력된다
  userGetter.firstName = "kim";
  console.log(userGetter.fullName);
  // 이처럼 getter와 setter는 일반 멤버 변수처럼 사용할 수 있지만
  // 어떠한 계산을 할 때 조금 더 유용하게 사용할 수 있다

  // 또한 private으로 값을 선언해서 외부에서 값을 바꿀 수 없도록 할 수도 있다
  class UserGetter2 {
    private firstName: string;
    private lastName: string;

    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  const userGetter2 = new UserGetter2("steve", "Jobs");
  console.log(userGetter2.fullName);
  // private 선언으로 외부에서 값을 바꿀 수 없다
  // userGetter2.firstName = "kim";
  console.log(userGetter2.fullName);

  // 위에서  private 선언하고 생성자에서 전달하고 굉장히 번거롭다
  // 하지만 아래처럼 생성자에 접근 제어자 설정하면 바로 멤버 변수로 선언이 된다

  class User2 {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    // 생성자에 접근제어자 설정하면 바로 멤버 변수로 선언된다
    // public으로도 선언 가능
    // firstName이 private this.firstName이 된다
    constructor(private firstName: string, private lastName: string) {}

    private internalAge = 4;

    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      // getter와 setter 사용하면 다양한 연산을 할 수 있고
      // 아래처럼 전달된 숫자에 대한 유효성 검사할 수도 있다
      if (num < 0) {
      }
      this.internalAge = num;
    }
  }

  const user2 = new User2("steve", "Jobs");

  // getter와 setter가 이름이 같지만, age 를 통해서  6을 전달하면 setter가 호출되면서 값이 전달된다
  user2.age = 6;
  console.log(user2.age); // 6

  // getter는 읽기 전용
  // setter는 쓰기 전용
}

// 캡슐화는 클래스 내부의 로직들이 외부에서 보이지 않도록,
// 꼭 필요한 것만 노출하는 의미예요. 이때 클래스의 프로퍼티와 함수뿐 아니라,
// 생성자 (어떻게 클래스를 오브젝트로 만들 수 있는지에 필요한 함수)
// 그리고 상속의 구조를 외부에서 신경쓰지 않도록 static 함수를 이용해서 인스턴스(오브제긑)를
// 만드는것도 캡슐화의 하나라고 볼 수 있어요 :)

// 이런 생성자 대신에 static을 이용해서 필요한 인스턴스(객체)를 만드는 경우를
// factory method 패턴이라고 해요 :)

// 어떤 클래스를 이용해서 인스턴스를 만드는지,
// 이런 복잡한 상속 구조와 만드는데 필요한 데이터관련된 정보를 숨길 수 있죠.

// new BlueCar();

// new YellowFancyCar();

// 이렇게 사용하는 사람이 모든 클래스 타입에 대해 알필요 없도록

// const car = Car.make('blue');

// const car = Car.make('yellow');

// 이렇게 해볼수도 있겠죵 :)
// https://en.wikipedia.org/wiki/Factory_method_pattern

// static은 상속 개념과는 연관이 없고,

// 클래스 레벨에서 접근이 가능한지, 아니면 클래스를 이용해서 만들어진 오브젝트로만 접근이 가능한지를 결정한답니다.
// static이라고 키워드를 붙인 변수나 함수는 오브젝트를 따로 생성하지 않고도,
//  클래스 이름 만으로 접근이 가능해요 :)
