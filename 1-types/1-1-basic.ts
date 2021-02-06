// module을 사용하지 않으면 global scope가 적용된다
// 즉 다른파일에 이름이 같은 변수가 있는 경우 충돌 할 수 있다
// 따라서 block {} 써서 local scope를 가지도록 한다

{ 
  /**
    * JavaScript
    * Primitive : number. string, boolean, bigint, symbole, null, undefined
    * Object: function, array...
    */


  // number
  const num:number = 3

  // string
  const str:string = 'hello'

  // boolean
  const boal:boolean = true

  // undefined
  // 값이 있는지 없는지 정해지지 않은 상태
  // undefined는 undefined로 타입을 정하지 않는데 
  // 그 이유는 타입을 undefined로 정하면 undefined만 할당할 수 있기 때문이다 

  // let name:undefined;
  // name='hello', error 발생

  // 그래서 아래와 같이 사용한다
  let age:number|undefined
  age = undefined
  age = 10

  // null
  // 값이 없다고 명확하게 정해놓은 상태
  let person:null;
  person=null;
  // person=1 , error 발생, null 만 할당가능

  let person2:string|null;


  // 보편적으로는 undefined or null 중에서 
  // let age:number|undefined 이렇게 optional 변수를 선언해준다

  // 숫자를 찾는 함수에서 숫자를 찾으면 number, 못찾으면 undefined 리턴하도록
  function find():number | undefined{
    return undefined
  }

  // unknown❌
  // 무슨 타입인지 알 수 없을 때 사용하는데 가능하면 사용하지 않는 것이 좋다
  // 사용하는 것은 ts에서 js 라이브러리를 사용할 때, 리턴하는 값이 모를 때 사용한다 
  let notSure:unknown = 0;
  notSure = 'he'

  // any ❌
  // 어떤 것이던지 담을 수 있다, 따라서 가능하면 쓰지 않는 것 좋다
  let anything: any = 0
  anything = 'hello'

  // void
  function print():void{
    // 아무 것도 리턴하지 않으면 void 
    console.log("hello")
    // 사실은 return 이 생략되어 있는 것
  }

  // 변수에 void 잘 사용하지 않는다. undefined 만 할당할 수 있기 때문에 
  let unusable:void = undefined // ❌

  // never

  // throwError 함수는 어플리케이션에서 처리할 수 없거나 예상치 못한 에러가 발생했을 때 호출하는 함수
  function throwError(message:string):never{

    // never가 반환 타입으로 사용되는 경우
    // 1. 에러 발생
    // message -> server (log), 발생한 에러메세지를 서버로 전달해서 로그를 남기고 
    throw new Error(message)
    // 어플리케이션에서 에러를 던지니까 어플리케이션이 죽게된다
    // never를 사용하면 이 함수에서 절대 리턴하는 값이 없다는 것을 알려주는 것

    // 2. while true 반복문
    // 또 다른 예시는 while true인 반복문 
    // while(true){}

    // return, 아무것도 리턴하지 않는 것도 에러가 발생한다
  }
  let neverEnding:never ; // 이렇게 사용하지 않는다 ❌

  // object
  // 원시타입을 제외한 모든 타입 가능하다 
  // 너무 광범위 하기 때문에 사용하지 않는 것이 좋다 
  let obj:object = [1,2,3]

  // 어떠한 오브젝트라도 전달받을 수 있다 
  function acceptSomeObject(obj:object){}

  acceptSomeObject({name:'kid'})
  acceptSomeObject({animal:'dog'})


}

