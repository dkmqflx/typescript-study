
{

  // 3-6-polymorphism과 비교

  type CoffeeCup = {
    shots:number;
    hasMilk?:boolean;
    hasSugar?:boolean
  }

  interface CoffeeMaker{
    makeCoffee(shots:number):CoffeeCup
  }

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
  abstract class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAMM_PER_SHOT :number = 7 
    private coffeeBeans:number = 0; 

    constructor(coffeeBeans:number){
      this.coffeeBeans = coffeeBeans
    }

    // abstract 때문에 오브젝트 만들수 없다. 따라서 에러 발생
    // static makeMachine(coffeeBeans:number):CoffeeMachine{
    //   return new CoffeeMachine(coffeeBeans)
    // }

    fillCoffeeBeans(beans:number){
      if(beans < 0){
        throw new Error('value for beans should be greater than 0')
      }
      this.coffeeBeans = beans
    }

    clean(){
      console.log('cleaning th machine...')
    }

    private grindBeans(shots:number){
      console.log(`grinding beans for ${shots}`)
      
      if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
        throw new Error('Not enough coffee beans!')
      }

      this.coffeeBeans =- shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;

    }

    private preheat():void{
      console.log('heating up ... ')
    }

    // 외부에서 접근할 수 없고 자식 클래스에서만 접근할 수 있게 protected 키워드 사용한다
    // 자식 클래스마다 달라질 수 있는 행동있으면 앞에 abstract 붙여준다
    // 추상 메소드는 구현사항 없다
    // 따라서 이 클래스를 상속하는 클래스에서 구현해야 한다 
    protected abstract extract(shots:number):CoffeeCup;

    makeCoffee(shots:number):CoffeeCup{
      this.grindBeans(shots) // 커피를 갈고
      this.preheat(); // 데운 다음
      return this.extract(shots) //내려준다

    }

  }

  // 우유가 들어가는 라떼를 만드는 커피머신
  class CaffeLatteMachine extends CoffeeMachine{
    
    constructor(beans:number, public readonly serialNumber:string){
      // 자식 클래스에서 생성자 구현할 대는 부모의 생성자를 호출해주어야 한다 
      super(beans) // 부모 클래스에서 필요한 변수도 전달해준다 
    }
    // 자식 클래스에서만 내부적으로 사용되는 함수 
    private steamMilk():void{
      console.log('Steaming soem Milk')
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
    protected extract(shots:number):CoffeeCup{
      this.steamMilk()
      return{
        shots,
        hasMilk:true
      }

    }


  }

  // 설탕이 들어가는 커피머신
  class SweetCoffeeMaker extends CoffeeMachine{

    
    protected extract(shots:number):CoffeeCup{

      return{
        shots,
        hasSugar:true
      }

    }

  }
  

    const machines2:CoffeeMaker[] = [
      new CaffeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16),
      new CaffeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16)
    ]
  
    machines2.forEach(machine => {
      console.log('--------------')
      machine.makeCoffee(1)
    })


}