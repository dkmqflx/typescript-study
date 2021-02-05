const x = {}
const y = {}
console.log(x)
console.log(y)
console.log(x.toString())
console.log(x.__proto__ === y.__proto__)

const array = []
console.log(array)

console.clear()


function CoffeeMachine(beans){
  // instance memeber Level
  // 모든 인스턴스가 가지고 있다
  this.beans = beans;
  // this.makeCoffee = (shots) => {
  //   console.log('making...')
  // }

}

// Prototype member level
// console에서 __proto__에서 함수를 확인할 수 있다
CoffeeMachine.prototype.makeCoffee = (shots)=>{
  console.log('making2...')

}
const machine1 = new CoffeeMachine(10) //__proto__ 확인하면 Object 상속하는 것 알 수 있다
const machine2 = new CoffeeMachine(20)
console.log(machine1)
console.log(machine2)

function LatteMachine(milk){
  this.milk = milk
}


// LatteMachine은 CoffeeMachine을 상속하고 CoffeeMachin은 Object를 상속한다
LatteMachine.prototype = Object.create(CoffeeMachine.prototype)

const latteMachine = new LatteMachine(123)
console.log(latteMachine)
// 따라서 CoffeeMachin의 makeCoffee을 사용할 수 있다
latteMachine.makeCoffee()