console.log(this) // this -> window


function simpleFunc(){
  console.log(this)
}

simpleFunc() // this는 window객체

console.clear()


class Counter {
  count = 0
  increase = function(){
    console.log(this)
  }
}

const counter = new Counter()
counter.increase() // this -> Counter

// const caller = counter.increase;
// caller() // this -> undefined, this의 정보를 잃어버리게 된다 
// const나 let으로 선언한 변수는 window에 등록되지 않기 때문이다

// 이렇게 this 정보를 잃지 않기 위해서 bind 사용한다 
const caller = counter.increase.bind(counter) // this -> counter
caller()

// 또 다른 방법으로는 아래처럼 함수를 선언할 때 화살표 함수를 사용한다 
// class Counter {
//   count = 0
//   increase = ()=>{
//     console.log(this)
//   }
// }



const a = 'a'
let b = 'b'

// window.a 호출 불가
// window.b 호출 불가

var c = 'c'
// window.c 호출 가능

class Bob{

}

const bob = new Bob()
bob.run = counter.increase
bob.run() // this -> bob