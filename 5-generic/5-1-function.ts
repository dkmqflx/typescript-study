// 프로그래밍의 꽃, 객체지향의 꽃 generic은 재사용성이 굉장히 높다
// 앞서 만든 stack을 string 이외에 다른 type도 사용할 수 있도록 할 때 제네릭을 이용하면 된다 
// 제네릭 사용하면 flexible, 유연하고, type safe, 타입을 보존해주고, reusable 재사용성도 굉장히 높힐 수 있다 


// 함수에서 제네릭을 사용하는 방법

{

  // item이 null인지 아닌지 확인
  function checkNotNullBad(arg:number | null):number{
    if(arg == null){
      throw new Error('not valid number')
    }
    return arg;
  }
  // 이 함수의 문제점은 숫자 타입만 확인할 수 있다는 것
  // 다른 타입 확인하려면 타입 별로 함수를 만들어야 한다 

  const result = checkNotNullBad(123)
  console.log(result)
  checkNotNullBad(null) //error 발생

  // 아래처럼 any를 사용하게되면 타입이 보장되지 않는 문제가 생긴다 
  function checkNotNullAnyBad(arg: any | null):any{
    if(arg == null){
      throw new Error('not valid number')
    }
    return arg;
  }

  // result는 타입이 any가 되므로 타입에 대한 정보가 없어진다
  // any 쓰는 것 좋지 않다 
  const result2 = checkNotNullAnyBad(123) 
  
  // 이러한 경우에 제네릭을 쓴다
  // 제네릭 어떤 타입이든지 받을 수 있고 코딩할 때 타입 결정되므로 타입 보장된다 

  // generic은 통상적인, 일반적인 이런뜻

  // GENERIC타입이고 인자는 GENERIC, 리턴하는 것도 GENERIC
  // 보통 GENERIC 그대로 쓰기보다 T라고 쓴다 

  // 이 함수는 제네릭함수 T를 받고 T를 리턴한다
  function checkNotNull<T>(arg:T | null):T{
    // 이 함수는 null이 아닐 때만 똑같은 타입을 리턴하는 함수
    if(arg == null){
      throw new Error('not valid number')
    }
    return arg;
  }

  const number = checkNotNull(123); // 숫자를 리턴하기 때문에 number는 number 타입이다
  const boal= checkNotNull(true)
  const boal2:boolean = checkNotNull(true) // 명시적으로 해줄 수도 있다
  // const boal2:string = checkNotNull(true) // 에러 발생


}