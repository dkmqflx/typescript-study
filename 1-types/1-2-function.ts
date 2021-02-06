{
  // JS
  function jsAdd(num1, num2){
    return num1+num2
  }

  // TS
  function add(num1:number, num2:number):number{
    return num1+num2
  }

    // JS
    // function jsFetchNum(id){
    //   // code ... 굉장히 많은 작업한다 
    //   // code ...
    //   return new Promise((resolve, reject)=>{
    //     resolve(100)
    //   })
    // }

    // TS
    // id는 함수 안에 정해지지 않았기 때문에 어떤 타입인지 모르지만 보통 string 타입으로 많이 쓴다
    // function tsFetchNum(id:string):Promise<number>{
    //   // code ... 굉장히 많은 작업한다 
    //   // code ...
    //   return new Promise((resolve, reject)=>{
    //     resolve(100)
    //   })
    // }


    // Optional parameter

    function printName(firstName:string, lastName?:string){
      console.log(firstName)
      console.log(lastName)
    }

    printName('steve', 'jobs')
    printName('bill') // 값 전달되지 않으면 undefined
    // printName('bill', null) 
    printName('bill', undefined) 


    function printName2(firstName:string, lastName:string | undefined){
      console.log(firstName)
      console.log(lastName) 
    }
    printName2('bill', undefined) 
    // printName2('bill') //error
    

    // Default parameter
    // 아무것도 전달하지 않을 때 기본 메시지 전달하고 싶을 때 
    function printMessage(message:string = 'default message'){
      console.log(message)
    }
    printMessage() // 'default message'



    // Rest parameter

    // 모든 인자를 numbers라는 배열로 받아온다
    function addNumbers(...numbers:number[]):number{

      return numbers.reduce((acc, curr)=>acc+curr)

    }

    console.log(addNumbers(1,2))
    console.log(addNumbers(1,2,3,4))
    console.log(addNumbers(1,2,3,4,5,6))
    // console.log(addNumbers([1,2,3,4,5,6)) // error, 배열은 인자로 numbers:number[] 이렇게 그냥 사용

}