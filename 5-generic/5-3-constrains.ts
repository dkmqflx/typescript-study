  // 제네릭에 제한을 두는 방법

  interface Employee{
    pay():void;
  }

  class FullTimeEmployee implements Employee{
    pay(){
      console.log(`full time!`)
    }

    workFullTime(){

    }
  }

  class PartTimeEmployee implements Employee{
    pay(){
      console.log(`part time!`)
    }

    workPartTime(){

    }
  }


  // 이렇게 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 리턴하는 함수는 좋지 않다❌

  // 직원을 인자로 받아 월급을 지불하고 직원을 리턴한다 
  function payBad(employee: Employee):Employee{
    employee.pay()
    return employee;
  }

  const ellie = new FullTimeEmployee()
  const bob = new PartTimeEmployee()

  ellie.workFullTime()
  bob.workPartTime()

  const ellieAfterPay = payBad(ellie);
  const bobAfterPay = payBad(bob);

  // ellieAfterPay. -> . 눌러보면 payBad 함수밖에 사용할 수 없다
  // 인자로 Employee 인터페이스로 제한하는데 인터페이스 안에는 pay 함수만 선어되어 있으니까
  // 정말 확실한 경우 아래처럼 사용할 수 있지만 가능한 as 사용하는 것 좋지 않다 
  // const ellieAfterPay = payBad(ellie) as FullTimeEmployee 
  // 이러한 경우 제네릭 사용한다


  interface Employee2{
    pay():void;
  }



  function payNoType<T>(employee: T):T{
    // employee.pay  제네릭은 너무 일반적이라 Type에 대한 정보가 없기 때문에 사용할 수 없다
    return employee
  }

  // Employ를 확장한 것만 가능하다 
  function pay<T extends Employee>(employee: T):T{
    employee.pay()
    return employee
  }



  const ellie2 = new FullTimeEmployee()
  const bob2 = new PartTimeEmployee()

  // 우선 풀타임으로 일한다
  ellie.workFullTime()
  bob.workPartTime()

  // 일한 후 페이지급
  const ellieAfterPay2 = pay(ellie);
  const bobAfterPay2 = pay(bob);
  // const bobAfterPay3 = pay('df'); //error, employee 확장한 것 아니면 에러 발생


  const obj = {
    name:'kim',
    age:20
  }

  const obj2 = {
    animal:'dog',

  }
  
  // T라는 어떠한 오브젝트도 받을 수 있고
  // K는 오브젝트 T에 있는 key 중에 하나이다
  
  // 이처럼 조건부를 사용하면 조금 더 세밀하게 타입을 제한할 수 있다
  function getValue<T, K extends keyof T>(obj:T, key:K):T[K]{
    return obj[key]
  }


  console.log(getValue(obj, 'name'))
  console.log(getValue(obj, 'age'))
  console.log(getValue(obj2, 'animal'))

  // console.log(getValue(obj, 'score')), error 발생