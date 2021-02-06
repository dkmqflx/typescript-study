
{

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
  }

  // 외부에서 클래스를 바라봤을 때 너무 인터페이스가 복잡해서
  // 너무 사용할 수 있는 함수가 많아서 어떤 것을 사용해야할 지 모를 때
  // 이 때 추상화를 통해 핖요한 인터페이스만 제공함으로써 클래스를 사용하기 쉽게 해준다 

  // 여기는 접근제어자를 사용해서 추상화한다

  class CoffeeMaker{

    private static BEANS_GRAMM_PER_SHOT :number = 7 
    private coffeeBeans:number = 0; 


    private constructor(coffeeBeans:number){
      this.coffeeBeans = coffeeBeans
    }

    static makeMachine(coffeeBeans:number):CoffeeMaker{
      return new CoffeeMaker(coffeeBeans)
    }

    fillCoffeeBeans(beans:number){
      if(beans < 0){
        throw new Error('value for beans should be greater than 0')
      }
      this.coffeeBeans = beans
    }

    private grindBeans(shots:number){
      console.log(`grinding beans for ${shots}`)
      
      if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT){
        throw new Error('Not enough coffee beans!')
      }

      this.coffeeBeans =- shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;

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

  const maker =  CoffeeMaker.makeMachine(32)
  // maker. -> maker 다음 . 누르면 
  // 너무 많은 함수가 제공되어서 어떤 것 부터 호출해서 커피를 만들 수 있는지 헷갈린다 
  // 이 때 추상화를 사용해서 인터페이스를 간편하게 만들어준다
  // 접근제어자를 사용해서 추상화할 수 도 있고
  // 인ㅌ퍼ㅔ이스를 사용해서 추상화를 할 수도 있다
  maker.fillCoffeeBeans(32)
  maker.makeCoffee(2)


}