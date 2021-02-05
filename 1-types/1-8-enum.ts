{
  // Enum
  // 여러가지 관련된 상수 값들을 한 곳에 모아서 정의할 수 있도록 도와주는 타입 
  // JS는 Enum 타입 존재하지 않고 TS에서 자체적으로 제공하는 타입

  // JS에서는 변하지 않는 값 선언할 때 대문자로 선언한다 
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10

  // 이렇게 연관 있는 값들을 정의하는 경우에 이러한 값들을 묶을 수 있는 방법은 없다 
  const MONDDAY = 0
  const TUESDAY = 1
  const WEDNESDAY = 2

  // 그래석 freeze를 사용했다
  const DAYS_ENUM = Object.freeze({"MONDDAY":0, "TUESDAY":1, "WEDNESDAY":2})
  const dayOfToday = DAYS_ENUM.MONDDAY; // 이런식으로 사용
  // DAYS_ENUM[THURSDAY] = 3, error 발생


  // TS
  enum Days{
    Monday, //0
    Tuesday, //1
    wednesday //2
  }

  const day = Days.Monday
  console.log(day)


  enum Days2{
    Monday =1 , // 1부터 시작
    Tuesday, //1
    wednesday //2
  }

  enum DaysStr{
    Monday = 'monday',
    Tuesday ='TuesDay' ,
    wednesday = 'Wednesday'
  }

  // TS에서 enum은 가능한 쓰지 않는 것이 좋다
  // 앞의 day는 아래 days2처럼 Day타입이 생략된 것
  let day2:Days = Days.Monday;

  // TS의 문제는 Enum으로 타입이 지정된 변수에 어떠한 Enum의 숫자를 할당할 수 있다는 것
  day2 = Days.Tuesday
  day2 = 10 //error 발생하지 않는다

  // 상수를 묶을 수 있는 방법이 enum 말고 union 타입을 사용할 수 있따

  type DaysOfWeek = 'Monday' | 'TuesDay' | 'Wednesday'

  let dayOfWeek: DaysOfWeek = 'Monday' // 
  // dayOfWeek = 'df' // 에러 발생
  // union type 안에 있는 값만 사용할 수 있다 

  // enum은 union type으로 대체될 수 있기 때문에 enum 대신 union type을 쓴다 
}