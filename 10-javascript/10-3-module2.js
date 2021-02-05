
// 모듈화 하지 않은 상태에서 10-3-module1.js에 아래와 같은 함수 정의되어 있는 경우

// function add(a, b){
//   return a+b
// }

// console.log(add(1,2))
// 3 출력된다
// 모듈화히지 않으면 기본적으로 글로벌 스코프에 해당하기 때문에
// 하지만 모듈화 한 다음에 add 함수 호출하면 에러발생

// 따라서 이렇게 사용하면 충돌발생
// function multiply(a, b){
//   return a*b
// }

// default 경우 괄호 없이 사용할 수 있지만, default 인경우 {}와 함께 함수이름 적어준다
// 다른이름으로 변경하고 싶은 경우 아래처럼 as 사용한다 
import add, {print as printMessage} from './10-3-module1.js'
// import sum from './10-3-module1.js'
// default로 export 한 경우에는 sum 처럼 아무 이름으로 받아올 수 있다
console.log(add(1,2))
printMessage()

// 또한 10-3-module.js에서 export 인 함수 여러개 있는 경우
// import * as cal from './10-3-module1.js'
// 다음과 같이 받아오면 cal을 사용해서 함수를 호출 할 수 있다
// cal.print()
// cal.print1()