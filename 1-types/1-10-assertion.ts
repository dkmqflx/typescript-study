{

  // Type Assertion
  // 그렇게 좋은 방법은 아니다 


  function jsStrFunc():any{
    return 'hello'
  }

  const resultStr =jsStrFunc()
  // result.length , ts에서는 return 타입이 any이기 때문에 string 타입에서 사용할 수 있는 api 사용불가능하다

  console.log((resultStr as string).length) // 이렇게 type casting을 할 수 있다
  console.log((<string>resultStr).length)


  // 하지만 숫자가 출력되는 함수라면
  function jsNumFunc():any{
    return 2
  }
  
  console.log((resultStr as string).length) //error가 발생하지 않지만 undefined가 출력 

  // Type Assertion은 정말 타입을 확신할 때만 사용한다 


  const wrong:any = 5
  console.log((wrong as Array<number>).push(1)) // error 발생, ❌


  function findNumbers():number[] | undefined {
    return undefined
  }

  const numbers = findNumbers();
  // numbers.push(2) // error 발생, nubers가 undefined일 수도 있으므로 
  numbers!.push(2) // 절대적으로 확신하는 경우 사용한다 
  const numbers2 = findNumbers()!; //또는 함수호출한 다음에 ! 호출한다
  // optional이 ? 인것과는 반대로 무조건 undefined이 아니라고 정의하는 것
  // ❌ 지양한다 

  // class 이름으로 요소 가져올 수 있는데
 
  const button = document.querySelector('className')
  
  /*
  // 요소는 Element 또는 null이 될 수 있으므로 
  if(button){
    button.nodeValue
  }
  */

  // 그리고 정말 class이름인 요소 있는 것 확신하는 경우 느낌표 쓴다
 const button2 = document.querySelector('className')!


}