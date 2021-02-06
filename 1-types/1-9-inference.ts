{
  // Type Inference

  let text = 'hello' // 선언과 동시에 문자열 할당했기 때문에 타입을 string으로 정해준다
  text = 'hi'
  // text = 1 , error 발생

  // 인풋 타입 명시하지 않으면 any 타입이 된다
  function print(message){
    console.log(message)
  }
  print('hello')
  print(5)

  // 따라서 이렇게 명시해준다
  function printStr(message:string):void{
    console.log(message)
  }

  // 또는 default type을 사용하면 자동으로 message가 string 타입인 것으로 추론된다
  function printStrDefault(message = 'hello'):void{
    console.log(message)
  }

  function addTwo(x:number, y:number):number{
    return x+y;
    //숫자 두개더해지니까 리턴도 숫자라고 추론한다
  }

  const result = addTwo(1,2) // result는 자동으로 숫자로 결정된다 


  // TS가 알아서 자동으로 타입을 명시해주지만 
  // 왠만하면 타입을 정확하게 명시하는 것이 좋다 
  // 다만  간단한 원시 타입 같은 경우에는 생략할 수도 있다

}