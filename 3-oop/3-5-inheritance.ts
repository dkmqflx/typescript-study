
{

  // 상속을 사용하는 방법

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
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

  // 라떼를 만들기위한 클래스, CoffeMachine 클래스 상속한다
  class CaffeLatteMachine extends CoffeeMachine{
    
    constructor(beans:number, public readonly serialNumber:string){
      // 자식 클래스에서 생성자 구현할 때는 부모의 생성자를 호출해주어야 한다 
      super(beans) // 부모 클래스에서 필요한 변수도 전달해준다 
    }

    // 자식 클래스에서만 내부적으로 사용되는 함수 
    private steamMilk():void{
      console.log('Steaming soem Milk')
    }
    // 오버라이딩
    makeCoffee(shots:number):CoffeeCup{
      // 부모클래스의 메소드 호출
      const coffee = super.makeCoffee(shots)
      this.steamMilk()
      return{
        ...coffee,
        hasMilk:true
      }

    }

  }

  
  const machine = new CoffeeMachine(23)
  const latteMachine = new CaffeLatteMachine(23, 'SSS')
  const coffee = latteMachine.makeCoffee(1)
  // 부모클래스 메소드 호출했기 때문에 
  // 자식 클래스의 메소드도 출력된다
  // grinding beans for 1
  // heating up ... 
  // Pulling 1 shots
  // Steaming soem Milk
  
  console.log('coffee: ', coffee) 

  console.log(latteMachine.serialNumber)



}