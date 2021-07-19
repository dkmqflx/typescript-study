// 프로그래밍의 꽃, 객체지향의 꽃 generic은 재사용성이 굉장히 높다
// 앞서 만든 stack을 string 이외에 다른 type도 사용할 수 있도록 할 때 제네릭을 이용하면 된다
// 제네릭 사용하면 flexible, 유연하고, type safe, 타입을 보존해주고, reusable 재사용성도 굉장히 높힐 수 있다

// 함수에서 제네릭을 사용하는 방법

{
  // item이 null인지 아닌지 확인
  function checkNotNullBad(arg: number | null): number {
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }
  // 이 함수의 문제점은 숫자 타입만 확인할 수 있다는 것
  // 다른 타입 확인하려면 타입 별로 함수를 만들어야 한다

  const result = checkNotNullBad(123);
  console.log(result);
  checkNotNullBad(null); //error 발생

  // 아래처럼 any를 사용하게되면 타입이 보장되지 않는 문제가 생긴다
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }

  // result는 타입이 any가 되므로 타입에 대한 정보가 없어진다
  // any 쓰는 것 좋지 않다
  const result2 = checkNotNullAnyBad(123);

  // 이러한 경우에 제네릭을 쓴다
  // 제네릭 어떤 타입이든지 받을 수 있고 코딩할 때 타입 결정되므로 타입 보장된다

  // generic은 통상적인, 일반적인 이런뜻

  // GENERIC타입이고 인자는 GENERIC, 리턴하는 것도 GENERIC
  // 보통 GENERIC 그대로 쓰기보다 T라고 쓴다

  // 이 함수는 제네릭함수 T를 받고 T를 리턴한다
  function checkNotNull<T>(arg: T | null): T {
    // 이 함수는 null이 아닐 때만 똑같은 타입을 리턴하는 함수
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }

  const number = checkNotNull(123); // 숫자를 리턴하기 때문에 number는 number 타입이다
  const boal = checkNotNull(true);
  const boal2: boolean = checkNotNull(true); // 명시적으로 해줄 수도 있다
  // const boal2:string = checkNotNull(true) // 에러 발생
}

/*
뒷 부분 강의까지 다 듣고 나서 제 나름대로 정의한 건
제네릭은 인터페이스, 클래스, 함수, 리턴값들에 대해 코드 작성자가 기본 타입 외에 
조금 더 일반적인 타입으로 정의내린 의존성이라고 이해해도 맞을까요?



function pay<E extends Employee>(employee: E): E {

    employee.pay();

    return employee;

  }

위 코드처럼 함수에 전달하는 인자나 함수의 리턴값에 :E 가 붙는 경우는 명확하게 E 타입의 값을 전달해야한다, 
리턴해야 한다 라고 이해가 되는데 클래스, 인터페이스, 함수 등 함수, 클래스, 인터페이스 명 뒤에 붙는
<> 부분이 조금 모호해서요 ㅠ

function pay<E extends Employee>

interface Either<L, R> 


위와 같은 경우는 pay function은 제네릭 E와 의존성을 갖는다, 
Either interface는 제네릭 L, R 과 의존성을 갖는다 
(= 연관이 있다) 라고 코드를 읽어나갈 때 이해하면 되는게 맞는지 궁금합니다.

바쁘실텐데도 양질의 강의, 유툽 영상 등 늘 감사합니다!
항상 건강 잘 챙기시고 행복하시길 바라요 엘리님!

 */

/*


타입이 있는 프로그래밍에서는 변수를 선언할때, 우리가 데이터 타입을 정해야 합니다. 
함수를 정의할때 전달받는 인자와 리턴되는 값에 대해서도 타입을 정의해야 하죠.
이때 한가지 특정한 타입이 아니라, 일반적인 타입을 받고 싶을때 제네릭을 이용할 수 있어요 :) 



function pay<E>(employee: E) {}

이 함수의 정의를 보면, 아 pay라는 함수는 employee라는 인자를 받는데, 
그 인자의 타입은 제네릭, 일반적인 타입이구나! 어떤 타입이든 호출하는 사람이 정의하면 되겠어!
이렇게 감이 오죠 :)



function pay<E extends Employee>(employee: E) {}

이제는 pay라는 함수는 employee라는 인자를 받는데, 그 인자의 타입은 제네릭, 
일반적인 타입이구나! 하지만, 어떤 불특정 타입을 다 말하는것이 아니라, 
Employee라는 클래스를 상속하는 클래스들만 되는거군! 



이렇게 정의만 보고도 이해할 수 있죠 :)*/
