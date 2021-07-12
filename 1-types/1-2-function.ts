{
  // JS
  // 두 숫자를 더해서 리턴하는 것을 의도한 함수이지만
  // 만약 문자열 두개를 전달하면, 의도와 달리 문자열 두개를 이은 값을 반환하게 된다
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TS
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JS
  // 어떤 작업하다 프로미스를 리턴하는 함수
  function jsFetchNum(id) {
    // code ... 굉장히 많은 작업한다
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // TS
  // id는 함수 안에 정해지지 않았기 때문에 어떤 타입인지 모르지만 보통 string 타입으로 많이 쓴다
  // 프로미스를 리턴하고, 프로미스 중에서도 숫자를 promise 한다
  // 함수의 타입을 보고서도 무엇인가 fetch한 다음 프로미스를 리턴하는데, 숫자의 데이터에 관한 값을 리턴하는 것을 알 수 있다
  function tsFetchNum(id: string): Promise<number> {
    // code ... 굉장히 많은 작업한다
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // Optional parameter

  // 항상 이름과 성을 전달하는 것이 아니라, 이름만 출력하는 함수로도 사용하고 싶을 때
  // lastName은 전달받을 수도 있고 전달받지 않을 수도 있다
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName("steve", "jobs");
  printName("bill"); // 값 전달되지 않으면 lastName으로 undefined 출력된다

  printName("bill", undefined); // undefined로 명시해주어도 lastName으로 undefined 출력된다

  // printName('bill', null) // 왜 되는지 ??

  // 여러분들이 보신 영상에서 ...(..lastName?: string),
  // 즉 lastName은 string 또는 undefined 값만 가질 수 있는 인자에 null이 할당 가능한 이유는 바로,
  // 원래는 null과 undefined을 따로 구분 할 수 있는 방법이 없어요. 고로, null == undefined 이므로,
  // let something: undefined 인 변수에 null도 할당 할 수 있어요 :)

  // 개발 콘솔툴에서 아래와 같이 검사해 보시면 재밌는걸 볼 수 있죠.
  // console.log(undefined == null) // true
  // console.log(undefined === null) // false

  // 하지만 TypeScript 2.0 부터는 Strict Null Checks 옵션을 따로 설정해 주면
  // null과 undefined을 각각의 개별적인 타입으로 검사를 받을 수 있어요 :)
  // 이 옵션을 켜두시면 undefined으로 타입이 설정된 변수에는 더이상 null을 할당할 수 없어요

  // Optional parameter와 비슷한 방법이지만, lastName으로 타입을 정해놓으면 항상 해당 타입에 맞게 값이 전달되어야 한다

  function printName2(firstName: string, lastName: string | undefined) {
    console.log(firstName);
    console.log(lastName);
  }

  // printName2('bill') //error
  printName2("bill", undefined); // undefined로 명시해서 전달

  // Default parameter
  // 아무것도 전달하지 않을 때 기본 메시지 전달하고 싶을 때
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage(); // 'default message'

  // Rest parameter

  // rest parameter로 인자를 받아온다
  // 모든 인자를 숫자로 전달받기 때문에 숫자타입의 배열로 전달받는다
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr);
  }

  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 6));
  // console.log(addNumbers(1, 2, 3, 4, 5, '6')); // 인자로 전달되는 값 중에 숫자 이외의 타입 있으면 error
  // console.log(addNumbers([1,2,3,4,5,6)) // error, 배열은 인자로 numbers:number[] 이렇게 그냥 사용

  // 개수 상관없이 동일한 타입의 데이터를 함수 인자로 전달할 때 rest parameter를 사용할 수 있다
}
