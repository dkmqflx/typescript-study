
{

  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
  }

  // 정보은닉 방법
  // public
  // private
  // protected
  
  class CoffeeMaker{

    // 따로 선언안하면 public
    // 내가 몇개의 BEAN으로 커피를 만드는지 보여주고 싶지 않기 때문에 private 선언
    private static BEANS_GRAMM_PER_SHOT :number = 7 
    private coffeeBeans:number = 0; 


    // 아래처럼 static을 사용해서 오브젝트를 만드는 함수를 제공하는 경우
    // 생성자를 사용해서 오브젝트를 사용하지 않도록 private 키워드를 붙여서
    // static 메소드를 사용하도록 권장한다
    private constructor(coffeeBeans:number){
      this.coffeeBeans = coffeeBeans
    }

    // 커피 메이커를 만든느 static 메소드
    static makeMachine(coffeeBeans:number):CoffeeMaker{
      return new CoffeeMaker(coffeeBeans)
    }

    // public이라 명시하지 않아도 public이다

    // 커피를 채워준다
    fillCoffeeBeans(beans:number){
      if(beans < 0){
        throw new Error('value for beans should be greater than 0')
      }
      this.coffeeBeans = beans
    }

    
    // 커피를 만드는 메소드
    makeCoffee(shots:number):CoffeeCup{
      if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT){
        throw new Error('Not enough coffee beans!')
      }

      this.coffeeBeans =- shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots, 
        hasMilk:false
      }

    }
  }



  // const maker = new CoffeeMaker(10), 생성자 함수 private이므로 에러 발생

  // 머피머신 만들고
  const maker =  CoffeeMaker.makeMachine(32)
  
  // 커피 원두를 채워준다
  maker.fillCoffeeBeans(40)
  console.log(maker)

  const maker2 = CoffeeMaker.makeMachine(10)
  console.log(maker2)

  class User{
    firstName:string;
    lastName:string;
    fullName:string;
    constructor(firstName:string, lastName:string){
      this.firstName = firstName;
      this.lastName = lastName
      this.fullName = `${firstName} ${lastName}`
    }

  }

  const user = new User('steve', 'Jobs')
  console.log(user.fullName)
  user.firstName = 'kim'
  console.log(user.fullName) // 수정해도 steve Jobs 출력된다

  class User2{

    get fullName():string{
      return `${this.firstName} ${this.lastName}`
    }

    private internalAge = 4

    get age():number{
      return this.internalAge
    }
    set age(num:number){
      // 전달된 숫자에 대한 유효성 검사
      if(num<0){

      }
      this.internalAge = num
    }
    // 생성자에 접근제어자 설정하면 바로 멤버 변수로 선언된다
    // public으로도 선언 가능
    constructor(private firstName:string, private lastName:string){
    }


  }

  const user2 = new User2('steve', 'Jobs')

  // get 써도 멤버 변수에 접근하는 것 처럼 사용한다 
  console.log(user2.fullName) 
  user2.age = 6
  console.log(user2.fullName) 
}