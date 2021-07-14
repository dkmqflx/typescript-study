{
  // Enum
  // 여러가지 관련된 상수 값들을 한 곳에 모아서 정의할 수 있도록 도와주는 타입
  // JS는 Enum 타입 존재하지 않고 TS에서 자체적으로 제공하는 타입

  // JS에서는 변하지 않는 값 선언할 때 대문자로 선언한다
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;

  // 이렇게 연관 있는 값들을 정의하는 경우에 이러한 값들을 묶을 수 있는 방법은 없다
  const MONDDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;

  // 그래서 최대한 enum에 가깝게 사용하기 위해 freeze를 사용했다
  const DAYS_ENUM = Object.freeze({ MONDDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDDAY; // 이런식으로 사용
  // DAYS_ENUM[THURSDAY] = 3, error 발생

  // TS
  // enum은 맨 앞글자를 대문자로 적는다
  enum Days {
    Monday, //0
    Tuesday, //1
    wednesday, //2
  }

  const day = Days.Monday;
  console.log(day); // 0

  // enum에 따로 값 지정하지 않으면, 맨 앞의 값이 0부터 증가한다
  //만약 1부터 증가시키고 싶으면 다음처럼 맨 처음 값에 값을 할당해준다

  enum Days2 {
    Monday = 1, // 1부터 시작
    Tuesday, //1
    wednesday, //2
  }

  // 문자열도 할당할 수 있다
  // 문자열은 그 다음 값이 무엇이 와야 하는지 자동으로 알기 어렵기 때문에 수동으로 값을 입력해준다
  enum DaysStr {
    Monday = "monday",
    Tuesday = "TuesDay",
    wednesday = "Wednesday",
  }

  // 다른 언어에서는 enum이 유옹하지만 TS에서 enum은 가능한 쓰지 않는 것이 좋다
  // 앞의 day는 아래 days2처럼 Day타입이 생략된 것
  let day2: Days = Days.Monday;

  // Days에 있는 어떠한 값이든 할다할 수 있다
  // TS의 문제는 Enum으로 타입이 지정된 변수에 다른 어떠한 숫자도 할당할 수 있다는 것
  day2 = Days.Tuesday;
  day2 = 10; // enum에 없는 10을 할당헤도 컴파일 error 발생하지 않는다
  // 즉, enum을 사용하면 타입이 보장되지 않는다

  // 상수를 묶을 수 있는 방법이 enum 말고 union 타입을 사용할 수 있따

  type DaysOfWeek = "Monday" | "TuesDay" | "Wednesday";

  let dayOfWeek: DaysOfWeek = "Monday"; //
  // dayOfWeek = 'df' // 에러 발생
  // union type 안에 있는 값만 사용할 수 있다

  // enum은 union type으로 대체될 수 있기 때문에 enum 대신 union type을 쓴다

  // 질문 1.

  // enum을 타입을 정의하는 개념으로 사용하지 않고 관련된 상수를 정의하는 용도로 사용하는건 괜찮을까요??
  // 아니면 Object.freeze를 사용하여서 상수를 선언하는 것이 더 좋은 방식일까요?

  const MAX_LIMIT = 5;
  // 개별적 상수는 위와 같이 정의하실 수 있어요.
  // 만약 비슷한 데이터를 묶어줄 필요가 있는 경우에는 상수를 위해 enum을 사용하는 케이스는 일반적이지 않고, 보통 아래와 같이 많이 사용해요 :)

  // class AppConfig {
  //   static readonly SERVER_HOST = '...';

  //   static readonly MAX_RETRY = 5;

  // }

  // AppConfig.SERVER_HOST // 값을 읽어옴

  // AppConfig 클래스에 상수값들을 묶어서 정의해 줄 수 있어요.
  // 그런데, 이렇게 클래스로 하게 되면 인스턴스를 생성할 수 있겠죠?
  // const app = new AppConfig();

  // 우리는 이 클래스를 이용해서 어떤 인스턴스를 생성하는것이 목적이 아니므로,
  // abstract 클래스로 만들어 줄 수도 있어요.

  // abstract class AppConfig {
  //   static readonly SERVER_HOST = '...';

  //   static readonly MAX_RETRY = 5;

  // }
}
