{
  // Type Assertion
  // 타입을 강요할 때 써야 하지만
  // 그렇게 좋은 방법은 아니다
  // 따라서 코딩하면서  Type Assertion 많이 사용하고 있다면 피할 수 있는 방법을 고민하는 것이 좋다

  // 하지만 TS는 타입이 없는 JS와 연동되어 있는 경우가 있기 때문에 불가피하게 써야할 경우가 있다

  // 예를들어 string 관련된 아래와 같은 함수가 있다
  // js 는 타입이 없기 때문에 시스템적으로 컴파일을 잘 모른다. any 타입을 리턴하는 것과 같다
  // 분명히 string을 반환하는 JS 함수이지만 JS는 타입이 없기 때문에 TS는 타입을 알 수 없다
  function jsStrFunc(): any {
    return "hello";
  }

  const resultStr = jsStrFunc();
  // result.length 같은 것 사용불가 , ts에서는 return 타입이 any이기 때문에 string 타입에서 사용할 수 있는 api 사용불가능하다

  // 내가 jsStrFunc 함수가 문자열을 반환하는 것을 확신할 때 type assertion을 사용한다
  console.log((resultStr as string).length); // 이렇게 type casting을 할 수 있다, 5가 출력된다
  console.log((<string>resultStr).length);

  // 하지만 숫자가 리턴된다면
  function jsNumFunc(): any {
    return 2;
  }

  console.log((resultStr as string).length); //error가 발생하지 않지만 undefined가 출력

  // Type Assertion은 정말 타입을 확신할 때만 사용한다

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // error 발생, ❌

  function findNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = findNumbers();
  // numbers.push(2) // error 발생, nubers가 undefined일 수도 있으므로
  numbers!.push(2); // 절대적으로 확신하는 경우 사용한다
  const numbers2 = findNumbers()!; //또는 함수호출한 다음에 ! 호출한다
  // optional이 ? 인것과는 반대로 무조건 undefined이 아니라고 정의하는 것
  // ❌ 지양한다

  // class 이름으로 요소 가져올 수 있는데

  const button = document.querySelector("className");
  // 요소가 있으면 Element를, 없으면 null을 리턴한다

  // 요소는 Element 또는 null이 될 수 있으므로
  // 아래처럼 코드 작성하면 경고 메세지가 나온다
  //  button.nodeValue

  /*
  // 따라서 아래처럼 코드 작성한다
  // button이 true라는 것은 버튼이 있다는 뜻이므로
  if(button){
    button.nodeValue
  }
  */

  // 그리고 정말 class이름인 요소 있는 것 확신하는 경우 느낌표 쓴다
  const button2 = document.querySelector("className")!;
}
