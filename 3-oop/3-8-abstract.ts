
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