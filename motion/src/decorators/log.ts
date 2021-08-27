function Log(_: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);
      const result = descriptor.value.apply(this, args);
      console.log(`Result:`);
      console.dir(result);
      return result;
    },
  };

  return newDescriptor;
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2));

/*
데코레이터 아직  표준 아니다
자바스크립트의 Mixin과 비슷
Mixin 보다는 화려하고 우아하게 사용할 수 있는 문법으로 
기존의 함수나 클래스를 조금 더 다양한 형태로 재활용할 수 있는 방법
그리고 다이나믹 composition이 가능하다 

데코레이터를 사용하면 기존의 함수나 클래스를 한단계 감싸는 wrapper 클래스를 만들 수 있다
그리고 사용하는 곳에서는 어노테이션(@) 을 사용해서 간편하게 사용할 수 있다 

*/
