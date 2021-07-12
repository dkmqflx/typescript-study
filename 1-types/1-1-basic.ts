// module을 사용하지 않으면 global scope가 적용된다
// 즉 다른파일에 이름이 같은 변수가 있는 경우 충돌 할 수 있다
// 따라서 block {} 써서 local scope를 가지도록 한다

{
  /**
   * JavaScript
   * Primitive : number. string, boolean, bigint, symbole, null, undefined
   * Object: function, array...
   */

  // TS에서는 타입을 더 엄격하게 적용하고, 한번 정의된 타입에는 다른 타입의 값을 할당할 수 없다

  // number
  const num: number = 3;

  // string
  const str: string = "hello";

  // boolean
  const boal: boolean = true;

  // undefined
  // 값이 있는지 없는지 정해지지 않은 상태
  // undefined는 undefined로 타입을 정하지 않는데
  // 그 이유는 타입을 undefined로 정하면 undefined만 할당할 수 있기 때문이다

  // let name:undefined;
  // name='hello', error 발생

  // 그래서 아래와 같이 사용한다
  let age: number | undefined;
  age = undefined;
  age = 10;

  // null
  // 값이 없다고 명확하게 정해놓은 상태
  let person: null;
  person = null;
  // person=1 , error 발생, null 만 할당가능

  let person2: string | null;

  // 보편적으로는 undefined or null 중에서 undefined를 많이 사용한다

  // let age:number|undefined
  // 이렇게 데이터 타입이 있거나 혹은 아직 결정되지 않았거나
  // 이렇게 optional 변수를 선언해준다
  // 다만 데이터가 있거나 없거나 나타낼 때는 null을 이용하는 것이 문맥상으로 더 맞다

  // 숫자를 찾는 함수에서 숫자를 찾으면 number, 못찾으면 undefined 리턴하도록
  function find(): number | undefined {
    // 숫자를 못찾았으면 undefined 리턴
    return undefined;
  }

  let optionalValue: number | undefined;
  // 이런 옵셔널 변수의 경우, 보통 undefined인지 확인하기 보다는 대게는 이렇게 확인해요:
  if (optionalValue == null) {
  }

  //값이 null인 경우, 아직 확정되지 않은 undefined 이 두가지 모두다
  //여기 if 조건문에 부합하기 때문에 두가지 케이스에 대해서 공통적으로 해줘야 하는 로직들을 처리 할 수 있어요 :)
  let variable: null | undefined;
  if (variable == null) {
  }

  // null과 undefined 둘다 동일하게 처리 해야 하는 경우라면 통상적으로
  if (variable == null) {
  }
  //  이렇게 많이 쓰는 것 같아요.
  // null과 undefined을 명확하게 구분해서 개별적으로 처리 해야 하는 케이스라면 이렇게 하구요

  if (variable === undefined) {
  }

  // 즉, 보통 undefined 또는 null 인지 확인할 때는 undefined == null이 true인 것을 활용해서
  // optionalValue == null로 값을 체크해준다

  // unknown❌
  // 무슨 타입인지 알 수 없을 때 사용하는데 가능하면 사용하지 않는 것이 좋다
  // 이러한 unknown 타입이 있는 경우는, TS가 타입이 없는 JS와 연동해서 사용할 수 있기 때문
  // 사용하는 것은 ts에서 js 라이브러리를 사용할 때, 리턴하는 값이 모를 때 사용한다
  // 그래도 가능하면 구체적으로 타입 명시하는 것이 좋고 웬만하면 사용하지 않는 것이 좋다
  let notSure: unknown = 0;
  notSure = "he"; // 문자열도 할당가능

  // any ❌
  // 어떤 것이던지 담을 수 있다, 따라서 가능하면 쓰지 않는 것 좋다
  let anything: any = 0;
  anything = "hello";

  // unknwon과 any는 가능한 쓰지 않는 것이 좋다

  // void
  function print(): void {
    // 출력만하고 아무 것도 리턴하지 않으면 void
    console.log("hello");
    // 사실은 아래처럼 아무것도 반환하지 않는 return 문 이 생략되어 있는 것
    // return;
  }

  // void는 생략할 수 있는데 이는 회사나 프로젝트 마다 스타일 가이드를 정해서 거기에 맞게 작성하는 것이 좋다

  // 변수에 void 잘 사용하지 않는다. undefined 만 할당할 수 있기 때문에 활용성이 떨어진다
  let unusable: void = undefined; // ❌

  // never -> 리턴하지 않는다는 뜻

  // throwError 함수는 어플리케이션에서 처리할 수 없거나 예상치 못한 에러가 발생했을 때 호출하는 함수
  function throwError(message: string): never {
    // never가 반환 타입으로 사용되는 경우
    // 1. 에러 발생
    // message -> server (log), 발생한 에러메세지를 서버로 전달해서 로그를 남기고

    throw new Error(message);
    // 로그를 남긴 다음에 어플리케이션에서 에러를 던지니까 어플리케이션이 죽게된다
    // never를 사용하면 이 함수에서 절대 리턴하는 값이 없다는 것을 알려주는 것

    // 2. while true 반복문
    // 또 다른 예시는 while true인 반복문
    // while(true){}

    // 아래처럼 선언해주어도 에러가 발생하는데, never는 아무것도 리턴하지 않기 때문이다
    // return

    // 따라서 never를 쓰면, 에러를 던지거나 while 문을 사용해서 계속 반복되도록 한다
  }
  let neverEnding: never; // 이렇게 사용하지 않는다 ❌

  // object 타입
  // 원시타입을 제외한 모든 타입 가능하다
  // 너무 광범위 하기 때문에 사용하지 않는 것이 좋다
  let obj: object = [1, 2, 3];

  // 어떠한 오브젝트라도 전달받을 수 있다
  function acceptSomeObject(obj: object) {}

  acceptSomeObject({ name: "kid" });
  acceptSomeObject({ animal: "dog" });
}
