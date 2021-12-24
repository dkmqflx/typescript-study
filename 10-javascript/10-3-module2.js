// 모듈화 하지 않은 상태에서 10-3-module1.js , 10-3-module2.js에 아래와 같은 함수 정의되어 있는 경우

// function add(a, b){
//   return a+b
// }

// console.log(add(1,2))
// 3 출력된다
// 모듈화히지 않으면 기본적으로 글로벌 스코프에 해당하기 때문에
// 문제점은 어디서 정의한 함수를 호출했는지 알 수 없고
// 동일한 함수를 2번 선언하게 되는 문제가 발생한다

// 그리고 아래처럼 이름은 같지만 곱하는 역할을 하는 add라는 이름의 함수가 정의되어 있으면
// 어떤 게 먼저 호출될지 알 수 없는 문제가 발생한다
// function add(a, b){
//   return a*b
// }

// 하지만 모듈화 한 다음에 두 파일에 동일한 add 함수 정의되어 있는 경우
// add 함수 호출하면 에러가 발생한다
// 따라서 export 라는 키워드를 통해서 이 모듈을 import해서 사용할 것이라는 것을 명시해주어야 한다

// default 경우 괄호 없이 사용할 수 있지만, default 인경우 {}와 함께 함수이름 적어준다
// 다른이름으로 변경하고 싶은 경우 아래처럼 as 사용한다
import add, { print as printMessage } from './10-3-module1.js';

// import sum from './10-3-module1.js'
// default로 export 한 경우에는 아래처럼 sum 처럼 아무 이름으로 받아올 수 있다
// default로 add를 받아오는데 이 add를 sum으로 사용한다
import sum from './10-3-module1.js';

console.log(add(1, 2));
printMessage();

// 또한 10-3-module.js에서 export 인 함수 여러개 있는 경우
// import * as cal from './10-3-module1.js'
// import 하는 모든 함수를 cal이란른 이름으로 받아오겠다

// 다음과 같이 받아오면 cal을 사용해서 함수를 호출 할 수 있다
// cal.print()
// cal.print1()
