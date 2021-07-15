/**
 * Let's make a calculator 🧮
 */

// command를 string  타입으로 지정하지 않는 것은, 임의의 문자열이 아니라 지정된 command가 있기 때문이다
type Command = "add" | "substract" | "multiply" | "divide" | "remainder";

function calculate(command: Command, num1: number, num2: number): number {
  switch (command) {
    case "add":
      return num1 + num2;
    case "substract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    case "remainder":
      return num1 % num2;
    default:
      throw new Error("unknown command");
  }
}

console.log(calculate("add", 1, 3)); // 4
console.log(calculate("substract", 3, 1)); // 2
console.log(calculate("multiply", 4, 2)); // 8
console.log(calculate("divide", 4, 2)); // 2
console.log(calculate("remainder", 5, 2)); // 1
