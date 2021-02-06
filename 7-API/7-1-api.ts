// 공식 문서를 볼 수 있지만 API를 사용해서 어떤 스펙으로 작성되어 있는지 확인할 수 있다

Array;

type Student ={
  passed:boolean
}

const students: Student[] = [{passed:true}, {passed:true}, {passed:false}]

// 모든 요소가 true 여아지 결과가 true가 된다 
const result =  students.every(student => student.passed)
console.log("result: ", result) // false

class Animal{}

class Cat extends Animal{
  isCat:boolean = true
}

class Dog extends Animal{
  isDog:boolean = true
}

const animals: Animal[] = [new Cat(), new Cat(), new Dog()]

function isCat(animal: Animal) : animal is Cat{
  return (animal as Cat).isCat !== undefined;
}

console.log(animals.every<Cat>(isCat))