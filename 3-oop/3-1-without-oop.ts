{

  // 절차지향 방식으로 코딩


  // 커피 객체
  type CoffeeCup = {
    shots:number;
    hasMilk:boolean;
  }
  
  // primitive에 바로 값 할당할 때는 타입 추론으로 타입 적어주지 않는다
  const BEANS_GRAMM_PER_SHOT = 7 
  let coffeeBeans:number = 0;

  function makeCoffee(shots:number):CoffeeCup{
    if(coffeeBeans < shots * BEANS_GRAMM_PER_SHOT){
      throw new Error('Not enough coffee beans!')
    }

    coffeeBeans =- shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots, // key - value 이름 동일하면 생략가능
      hasMilk:false
    }

  }
  coffeeBeans += 3*BEANS_GRAMM_PER_SHOT // 커피 3잔 만들 coffeeBeans추가 
  const coffee = makeCoffee(2)
  console.log(coffee)
}

// 코드보면 필요한 변수, 함수등이 모두 전역에 선언되어 있다