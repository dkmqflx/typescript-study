
{

  // 상속을 사용하는 방법

  type CoffeeCup = {
    shots:number;
    hasMilk?:boolean; // optional
    hasSugar?:boolean // optional
  }

  interface CoffeeMaker{
    makeCoffee(shots:number):CoffeeCup
  }

  class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAMM_PER_SHOT :number = 7 
    private coffeeBeans:number = 0; 

    // 생성자가 private이면 해당 클래스를 상속할 수 없다
    // 따라서 public이나 protected로 사용한다  
    constructor(coffeeBeans:number){
      this.coffeeBeans = coffeeBeans
    }

    static makeMachine(coffeeBeans:number):CoffeeMachine{
      return new CoffeeMachine(coffeeBeans)
    }

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

    private extract(shots:number):CoffeeCup{
      console.log(`Pulling ${shots} shots`)
      return {shots, hasMilk:false}

    }

    makeCoffee(shots:number):CoffeeCup{
      this.grindBeans(shots) // 커피를 갈고
      this.preheat(); // 데운 다음
      return this.extract(shots) //내려준다

    }

  }

  class CaffeLatteMachine extends CoffeeMachine{
    
    constructor(beans:number, public readonly serialNumber:string){
      // 자식 클래스에서 생성자 구현할 대는 부모의 생성자를 호출해주어야 한다 
      super(beans) // 부모 클래스에서 필요한 변수도 전달해준다 
    }
    // 자식 클래스에서만 내부적으로 사용되는 함수 
    private steamMilk():void{
      console.log('Steaming soem Milk')
    }
    // 오버라이딩
    makeCoffee(shots:number):CoffeeCup{
      const coffee = super.makeCoffee(shots)
      this.steamMilk()
      return{
        ...coffee,
        hasMilk:true
      }

    }

  }

  // 설탕이 들어가는 커피머신
  class SweetCoffeeMaker extends CoffeeMachine{

    makeCoffee(shots:number):CoffeeCup{
      // 부모 클래스 메소드 호출
      const coffee = super.makeCoffee(shots)

      return{
        ...coffee,
        hasSugar:true
      }
    }

  }
  
  // 배열의 타입은 CoffeeMachine 배열
  // CaffeLatteMachine, SweetCoffeeMaker 모두 CoffeeMachine을 상속하기 때문이다 
  const machines:CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16)
  ]

  // 배열을 돌면서 커피를 만든다
  machines.forEach(machine => {
    console.log('--------------')
    machine.makeCoffee(1)
    // makeCoffee이외에도 공통적인 메소드 사용할 수 있다 
  })

    // 또한 CoffeeMaker 인터페이스를 세 클래스가 모두 구현하므로 아래와 같이 선언할 수도 있다
    const machines2:CoffeeMaker[] = [
      new CoffeeMachine(16),
      new CaffeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16),
      new CoffeeMachine(16),
      new CaffeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16)
    ]
  
    machines2.forEach(machine => {
      console.log('--------------')
      machine.makeCoffee(1)
      // 이 경우엔은 인터페이스에 구현된 makeCoffee 메소드 하나만 사용가능하다 
    })


}