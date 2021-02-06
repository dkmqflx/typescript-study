
{

  // 상속의 관계가 깊어질 수록 서로간의 관계가 복잡해진다

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
    hasSugar?:boolean
  }

  // CaffeLatteMachine은 CoffeeMachine을 상속하고 우유를 추가할 수 있다
  // CaffeLatteMachine은 CoffeeMachine을 상속하고 설탕을 추가할 수 있다
  // 우유와 설탕이 모두 들어간 커피를 만들기 위해서는 ?
  // 상속은 수직적 관계를 갖는다
  // 따라서 내가 상속하는 부모를 수정하면, 해당 부모를 상속하는 모든 자식 클래스에 영향을 미친다
  // TS에는 한가지 이상의 부모클래스를 상속할 수 없다
  // class SweetCaffeLatteMachine extends SweetCoffeeMaker, CaffeLatteMachine{} 이런식 불가능
  // 따라서 TS에서는 composition  사용한다

  // Favor COMPOSITION over inheritance, 상속보다 컴포지션을 선호하라 
  // 컴포지션을 필요한 것을 가져와서 조립해나가는 것


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

  // 싸구려 우유 거품기 
  class CheapMilkSteamer{

    private steamMilk():void{
      console.log('Steaming soem Milk')
    }

    // CoffeeCup을 받으면 우유를 추가해서 다시 리턴해준다
    makeMilk(cup:CoffeeCup):CoffeeCup{
      // CaffeLatteMachine와 달리 super 없다.
      this.steamMilk;
      return{
        ...cup,
        hasMilk:true
      }
    }
  }

  // 설탕 제조기 
  class CandySugarMixer{
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

  // 설탕을 넣고 우유를 추가하는 것을 각각의 클래스에 구현하는 것이 아니라 
  // 기능별로 별도의 클래스로 구현한 다음 필요한 곳에서 가져다가 사용한다 -> composition


  // 우유 들어간 라떼만든다
  // 3-7-composition의 CaffeLatteMachine와 비교해본다
  class CaffeLatteMachine extends CoffeeMachine{
    
    // 필요한 것을 외부에서 주입받아서 가져온다 -> Dependency Injection
    constructor(beans:number, public readonly serialNumber:string, private milkFrother:CheapMilkSteamer){
      super(beans) 
    }

    // 오버라이딩
    makeCoffee(shots:number):CoffeeCup{
  
      const coffee = super.makeCoffee(shots)
      // 우유를 추가해서 새로운 CoffeeCup을 리턴한다
      // 이 때, 3-7-composition의 CaffeLatteMachine와 달리
      // 내부적으로 구현되어있는 것이 아니라 Dependency Injection을 통해 외부에서 가져온다
      return this.milkFrother.makeMilk(coffee)

    }

  }

  // 설탕 커피만든다
  class SweetCoffeeMaker extends CoffeeMachine{

    constructor(private beans:number, private sugar:CandySugarMixer) {
      super(beans)
      
    }
    
    makeCoffee(shots:number):CoffeeCup{
      const coffee = super.makeCoffee(shots)
      return this.sugar.addSugar(coffee)

    }

  }

  // 우유와 설탕 모두 들어간 커피 만든다
  class SweetCaffeLatteMachine extends CoffeeMachine{
    // 필요한 기능을 외부에서 가져온다 
    // 그리고 milk와 sugar가 내부적으로 어떻게 작동하는지는 알지 못해도 사용할 수 있다
    // 이러한 compositoin은 코드의 재사용성을 굉장히 높혀준다
    constructor(private beans:number, private milk:CheapMilkSteamer, private sugar:CandySugarMixer){
      super(beans)
    }

    makeCoffee(shots:number):CoffeeCup{
      const coffee = super.makeCoffee(shots)
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded)
    }
  }


  // 이러한 compositio 의 단점으로는 CaffeLatteMachine, SweetCoffeeMaker, SweetCaffeLatteMachine 세 클래스는
  // CheapMilkSteamer, CandySugarMixer 와 밀접하게 연결되어 있다
  // 즉, 밀접하게 coupling되어 있다
  // 그 말은 세 클래스는 CheapMilkSteamer, AutomaticSugarMixer 을 사용해야 하고 
  // 다른 우유 제조기나 슈가믹서 사용하려면 업데이트 해주어야 한다 
  // 클래스와 클래스 사이를 관계짓는 것, 잘 알게하는 것은 좋지 않다


  const cheapMilkMaker = new CheapMilkSteamer();
  const candySugar =  new CandySugarMixer();

  
  // 아래보면 재사용성이 굉장히 떨어진다
  // 다른 설탕, 다른 우유 메이커를 사용할 수 없다 
  const sweetMachine = new SweetCoffeeMaker(12, candySugar);
  const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker)
  const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySugar)

  // 클래스 사이에 상호작용하는, 대화하는 경우에는 계약서에 의거해서 의사소통을 해야한다
  // 계약서는 인터페이스이다
  // 즉, 인터페이스를 통해 서로간에 상호작용을 하도록 한다
  // 이것이 바로 decoupling


}