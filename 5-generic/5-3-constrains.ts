{
  // 제네릭에 제한을 두는 방법
  // 제네릭에 조건을 줄 수 있는 constraints

  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log(`full time!`);
    }

    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log(`part time!`);
    }

    workPartTime() {}
  }

  // 직원을 인자로 받아 월급을 지불하고 직원을 리턴한다
  // 이렇게 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 리턴하는 함수는 좋지 않다❌
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  const ellie = new FullTimeEmployee();
  const bob = new PartTimeEmployee();

  ellie.workFullTime();
  bob.workPartTime();

  const ellieAfterPay = payBad(ellie);
  const bobAfterPay = payBad(bob);

  // ellieAfterPay. -> . 눌러보면 payBad 함수밖에 사용할 수 없다
  // 인자로 Employee 인터페이스로 제한하는데 인터페이스 안에는 pay 함수만 선언되어 있으니까
  // 정말 확실한 경우 아래처럼 사용할 수 있지만 가능한 as 사용하는 것 좋지 않다
  // const ellieAfterPay = payBad(ellie) as FullTimeEmployee
  // 이러한 경우 제네릭 사용한다

  interface Employee2 {
    pay(): void;
  }

  function payNoType<T>(employee: T): T {
    // employee.pay  제네릭은 너무 일반적이라 Type에 대한 정보가 없기 때문에 사용할 수 없다
    return employee;
  }

  // Employee2를 확장한 것만 가능하다
  function pay<T extends Employee2>(employee: T): T {
    employee.pay();
    return employee;
  }

  const ellie2 = new FullTimeEmployee();
  const bob2 = new PartTimeEmployee();

  // 우선 풀타임으로 일한다
  ellie.workFullTime();
  bob.workPartTime();

  // 일한 후 페이지급
  const ellieAfterPay2 = pay(ellie);
  const bobAfterPay2 = pay(bob);
  // const bobAfterPay3 = pay('df'); //error, employee 확장한 것 아니면 에러 발생
  // ellieAfterPay. -> . 눌러보면 pay, workFullTime 두 함수 모두 사용 가능하다

  const obj = {
    name: "kim",
    age: 20,
  };

  const obj2 = {
    animal: "dog",
  };

  // T라는 어떠한 오브젝트도 받을 수 있고
  // K는 오브젝트 T에 있는 key 중에 하나이다

  // 이처럼 조건부를 사용하면 조금 더 세밀하게 타입을 제한할 수 있다
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  console.log(getValue(obj, "name"));
  console.log(getValue(obj, "age"));
  console.log(getValue(obj2, "animal"));

  // console.log(getValue(obj, 'score')), error 발생
}

/*
좋은 질문이예요 🙌 함수 표현식에서 어떻게 해야 하는지 안알려 드렸군요 :)
제네릭을 함수에서 쓸때는 항상 인자를 전달하는 괄호 () 앞에다가 제네릭을 정의한다
이렇게 외워두시면 좋아요 히히
그래서 함수 정의든 표현식이든 무조건 괄호 앞에다가!

const pay = <T extends Employee>(employee: T): T => {}

*/

/*

자바스크립트는 다수의 결과값을 리턴할 수 없어요 :) 
배열이나 튜플 또는 오브젝트 형태로 묶어서 리턴하셔야 해요.

function getValue<T, N extends keyof T>(obj: T, key: N, key2: N): [T[N], T[N]] {

  return [obj[key], obj[key2]];

}



const obj = {
  name: 'test',
  age: 20,

};



console.log(getValue(obj, 'name', 'age'));



이렇게 하시면 되겠죠? :)

 */
