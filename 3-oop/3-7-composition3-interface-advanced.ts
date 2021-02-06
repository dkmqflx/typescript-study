
{

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
    hasSugar?:boolean
  }

  // 3-7-composition-interface 보면 너무 많은 커피머신 만드는데 이렇게 할 필요 없다

  interface CoffeeMaker{
    makeCoffee(shots:number):CoffeeCup
  }


  // 이 커피머신 하나만 있으면 된다
  class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAMM_PER_SHOT :number = 7 
    private coffeeBeans:number = 0; 

    // 여기서 전달받은 MilkFrother와 SugarProvider에 따라 기능이 결정된다
    constructor(private beans:number, private milk:MilkFrother, private sugar:SugarProvider){
      this.coffeeBeans = beans
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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee); // 설탕 추가 
      return this.milk.makeMilk(sugarAdded) // 우유추가
    }

  }


  // 우유 만들기 위한 인터페이스
  interface MilkFrother{
    makeMilk(cup:CoffeeCup):CoffeeCup;
  }

  // 싸구려 우유 거품기 
  class CheapMilkSteamer implements MilkFrother{

    private steamMilk():void{
      console.log('Steaming soem Milk')
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup:CoffeeCup):CoffeeCup{
      this.steamMilk;
      return{
        ...cup,
        hasMilk:true
      }
    }
  }

  // 비싼 우유 거품기 
  class FancyMilkSteamer implements MilkFrother{

    private steamMilk():void{
      console.log('Fancy teaming soem Milk')
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup:CoffeeCup):CoffeeCup{
      this.steamMilk;
      return{
        ...cup,
        hasMilk:true
      }
    }
  }

  // 차가운  우유 거품기 
  class ColdMilkSteamer implements MilkFrother{

    private steamMilk():void{
      console.log('Cold teaming soem Milk')
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup:CoffeeCup):CoffeeCup{
      this.steamMilk;
      return{
        ...cup,
        hasMilk:true
      }
    }
  }

  // 우유를 만들지 않고 아무것도 하지 않고 리턴
  class NoMilk implements MilkFrother{

    makeMilk(cup:CoffeeCup):CoffeeCup{
      return cup;
    }

  }


  // 설탕 만들기 위한 인터페이스
  interface SugarProvider{
    addSugar(cup:CoffeeCup):CoffeeCup
  }
  
  
  // 사탕에서 설탕 받아오는 슈가 믹서
  class CandySugarMixer implements SugarProvider{
    private getSugar(){
      console.log('Getting some suger from jar')
      return true;
    }

    addSugar(cup:CoffeeCup):CoffeeCup{
      const sugar = this.getSugar() // 설탕을 받아온다
      return{
        ...cup,
        hasSugar:sugar
      }
      
    }

  }

  // 제대로된 슈가 믹서
  class SugarMixer implements SugarProvider{
    private getSugar(){
      console.log('Getting some suger from jar!!!!')
      return true;
    }

    addSugar(cup:CoffeeCup):CoffeeCup{
      const sugar = this.getSugar() // 설탕을 받아온다
      return{
        ...cup,
        hasSugar:sugar
      }
      
    }

  }

  // 설탕 없다
  class NoSugar implements SugarProvider{
    // 아무것도 하지 않고 리턴한다 
    addSugar(cup:CoffeeCup):CoffeeCup{
      return cup
    }
  }

  // milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer()
  const coldMilkMaker = new ColdMilkSteamer()
  const noMilk = new NoMilk()

  // sugar
  const candySugar =  new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar()

  
  // 내가 원하는 방식으로 서로다른 객체를 만들 수 있다
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar)
  const ColdLatteMachine = new CoffeeMachine(12,  coldMilkMaker, noSugar)
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar)


  // 상속도 필요한 경우도 있다
  // 다만 상속으로인해 너무 수직적인 관계를 가지고 있지는 않은지 , 상속이 너무 깊지는 않는지
  // 컴포지션으로 해결할 수 없을지 고민한다
}