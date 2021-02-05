// ts에서는 타입을 변환하는 것이 가능하다 
// 별모양의타입을 별모양의 일부의 타입으로 변환하는 것
// 한가지의 타입을 기본으로 해서 다른 종류의 타입으로 변환하는 것도 가능하다

{
  const obj = {
    name:'kim'
  }
  obj.name; // kim
  obj['name'] // kim

  // 이처럼 타입도 인덱스를 기반으로 해서 결정할 수 있다
  type Animal = {
    name:string;
    age:number
    gender:'male' | 'female'
  }

  type Name = Animal['name'] // Name의 타입은 string
  const text:Name = 'hello' // 문자열만 할당가능

  type Gender = Animal['gender'] // 'male' | 'female'

  type Keys = keyof Animal ; // Animal에 있는 모든 key의 타입이 가능, name | age | gender
  const keys: Keys = 'gender'

  type Person = {
    name:string,
    gender:Animal['gender']
  }

  const person:Person = {
    name:'kim',
    gender:'male'
  }
}